import initSqlJs from 'sql.js';

let db = null;
let persistenceMode = 'memory';
const LOCAL_STORAGE_KEY = 'photo-album-organizer:db';

function getWasmUrl(file) {
  const asset = file === 'sql-wasm-browser.wasm' ? 'sql-wasm.wasm' : file;
  return `${import.meta.env.BASE_URL}${asset}`;
}

function supportsOPFS() {
  return typeof navigator !== 'undefined'
    && navigator.storage
    && typeof navigator.storage.getDirectory === 'function';
}

function supportsLocalStorage() {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function uint8ToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;

  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function base64ToUint8(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return bytes;
}

async function getOPFSFile() {
  const root = await navigator.storage.getDirectory();
  return root.getFileHandle('photoalbums.db', { create: true });
}

async function loadFromOPFS() {
  try {
    const fileHandle = await getOPFSFile();
    const file = await fileHandle.getFile();
    if (file.size > 0) {
      const buffer = await file.arrayBuffer();
      return new Uint8Array(buffer);
    }
  } catch {
    // File doesn't exist yet or OPFS unavailable
  }
  return null;
}

async function saveToOPFS(data) {
  try {
    const fileHandle = await getOPFSFile();
    const writable = await fileHandle.createWritable();
    await writable.write(data);
    await writable.close();
  } catch (e) {
    console.error('Failed to save database to OPFS:', e);
  }
}

async function loadFromLocalStorage() {
  if (!supportsLocalStorage()) return null;

  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? base64ToUint8(raw) : null;
  } catch (e) {
    console.error('Failed to load database from localStorage:', e);
    return null;
  }
}

async function saveToLocalStorage(data) {
  if (!supportsLocalStorage()) return false;

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, uint8ToBase64(data));
    return true;
  } catch (e) {
    console.error('Failed to save database to localStorage:', e);
    return false;
  }
}

export async function initDatabase() {
  const SQL = await initSqlJs({
    locateFile: (file) => getWasmUrl(file),
  });

  let savedData = null;

  if (supportsOPFS()) {
    savedData = await loadFromOPFS();
    persistenceMode = 'opfs';
  }

  if (!savedData) {
    savedData = await loadFromLocalStorage();
    if (savedData) {
      persistenceMode = 'localStorage';
    } else if (persistenceMode !== 'opfs') {
      persistenceMode = supportsLocalStorage() ? 'localStorage' : 'memory';
    }
  }

  if (savedData) {
    db = new SQL.Database(savedData);
  } else {
    db = new SQL.Database();
  }

  return db;
}

export async function saveDatabase() {
  if (!db) return;
  const data = db.export();
  const bytes = new Uint8Array(data);

  if (persistenceMode === 'opfs') {
    await saveToOPFS(bytes);
    if (supportsLocalStorage()) {
      // Keep a secondary copy so the app can recover if OPFS becomes unavailable later.
      await saveToLocalStorage(bytes);
    }
    return;
  }

  if (persistenceMode === 'localStorage') {
    const saved = await saveToLocalStorage(bytes);
    if (!saved) {
      persistenceMode = 'memory';
    }
    return;
  }

  if (supportsLocalStorage()) {
    const saved = await saveToLocalStorage(bytes);
    if (saved) {
      persistenceMode = 'localStorage';
    }
  }
}

export function generateId() {
  return crypto.randomUUID();
}

export function getDatabase() {
  return db;
}
