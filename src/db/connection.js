import initSqlJs from 'sql.js';

let db = null;

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

export async function initDatabase() {
  const SQL = await initSqlJs({
    locateFile: (file) => `https://sql.js.org/dist/${file}`,
  });

  const savedData = await loadFromOPFS();

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
  const buffer = data.buffer;
  await saveToOPFS(new Uint8Array(buffer));
}

export function generateId() {
  return crypto.randomUUID();
}

export function getDatabase() {
  return db;
}
