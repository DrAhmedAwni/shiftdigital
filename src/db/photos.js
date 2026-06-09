import { generateId } from './connection.js';

export function addPhoto(db, { album_id, name, local_path, file_type, file_size }) {
  const id = generateId();
  const now = new Date().toISOString();

  db.run(
    `INSERT INTO photos (id, album_id, name, local_path, file_type, file_size, sort_order, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?)`,
    [id, album_id, name, local_path, file_type, file_size, now, now]
  );

  db.run('UPDATE albums SET photo_count = photo_count + 1, updated_at = ? WHERE id = ?', [now, album_id]);

  // Set cover_photo_id on first photo
  const count = db.exec('SELECT COUNT(*) as cnt FROM photos WHERE album_id = ?', [album_id]);
  if (count.length > 0 && count[0].values[0][0] === 1) {
    db.run('UPDATE albums SET cover_photo_id = ?, updated_at = ? WHERE id = ?', [id, now, album_id]);
  }

  return { id, album_id, name, local_path, file_type, file_size, created_at: now };
}

export function removePhoto(db, id) {
  const result = db.exec('SELECT album_id FROM photos WHERE id = ?', [id]);
  if (result.length === 0 || result[0].values.length === 0) return;

  const albumId = result[0].values[0][0];
  const now = new Date().toISOString();

  db.run('DELETE FROM photos WHERE id = ?', [id]);
  db.run('UPDATE albums SET photo_count = MAX(0, photo_count - 1), updated_at = ? WHERE id = ?', [now, albumId]);

  // Update cover_photo_id
  const remaining = db.exec('SELECT id FROM photos WHERE album_id = ? ORDER BY created_at DESC LIMIT 1', [albumId]);
  if (remaining.length > 0 && remaining[0].values.length > 0) {
    db.run('UPDATE albums SET cover_photo_id = ?, updated_at = ? WHERE id = ?', [remaining[0].values[0][0], now, albumId]);
  } else {
    db.run('UPDATE albums SET cover_photo_id = NULL, updated_at = ? WHERE id = ?', [now, albumId]);
  }
}

export function getPhotosByAlbum(db, album_id) {
  const stmt = db.prepare('SELECT * FROM photos WHERE album_id = ? ORDER BY created_at DESC, rowid DESC');
  stmt.bind([album_id]);
  const photos = [];
  while (stmt.step()) {
    photos.push(stmt.getAsObject());
  }
  stmt.free();
  return photos;
}

export function getPhotoCount(db, album_id) {
  const result = db.exec('SELECT COUNT(*) as cnt FROM photos WHERE album_id = ?', [album_id]);
  if (result.length === 0 || result[0].values.length === 0) return 0;
  return result[0].values[0][0];
}
