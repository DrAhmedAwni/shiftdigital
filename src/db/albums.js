import { generateId } from './connection.js';

export function createAlbum(db, { name }) {
  const trimmed = name.trim();
  if (!trimmed || trimmed.length === 0 || trimmed.length > 100) {
    throw new Error('Album name must be between 1 and 100 characters');
  }

  const id = generateId();
  const now = new Date().toISOString();

  db.run(
    `INSERT INTO albums (id, name, cover_photo_id, sort_order, photo_count, created_at, updated_at)
     VALUES (?, ?, NULL, 0, 0, ?, ?)`,
    [id, trimmed, now, now]
  );

  return { id, name: trimmed, cover_photo_id: null, sort_order: 0, photo_count: 0, created_at: now, updated_at: now };
}

export function getAllAlbums(db) {
  const stmt = db.prepare('SELECT * FROM albums ORDER BY created_at DESC');
  const albums = [];
  while (stmt.step()) {
    albums.push(stmt.getAsObject());
  }
  stmt.free();
  return albums;
}

export function getAlbumById(db, id) {
  const stmt = db.prepare('SELECT * FROM albums WHERE id = ?');
  stmt.bind([id]);
  let album = null;
  if (stmt.step()) {
    album = stmt.getAsObject();
  }
  stmt.free();
  return album;
}

export function updateAlbumOrder(db, orders) {
  const stmt = db.prepare('UPDATE albums SET sort_order = ?, updated_at = ? WHERE id = ?');
  const now = new Date().toISOString();
  for (const { id, sort_order } of orders) {
    stmt.bind([sort_order, now, id]);
    stmt.step();
    stmt.reset();
  }
  stmt.free();
}

export function renameAlbum(db, id, name) {
  const trimmed = name.trim();
  if (!trimmed || trimmed.length === 0 || trimmed.length > 100) {
    throw new Error('Album name must be between 1 and 100 characters');
  }
  const now = new Date().toISOString();
  db.run('UPDATE albums SET name = ?, updated_at = ? WHERE id = ?', [trimmed, now, id]);
  return getAlbumById(db, id);
}

export function deleteAlbum(db, id) {
  // Enable FK enforcement for cascade
  db.run('PRAGMA foreign_keys = ON');
  // Also manually delete photos to be safe across all SQLite environments
  db.run('DELETE FROM photos WHERE album_id = ?', [id]);
  db.run('DELETE FROM albums WHERE id = ?', [id]);
}
