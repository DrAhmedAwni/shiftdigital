export function initializeSchema(db) {
  db.run('PRAGMA foreign_keys = ON');

  db.run(`
    CREATE TABLE IF NOT EXISTS albums (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      cover_photo_id TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      photo_count INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (cover_photo_id) REFERENCES photos(id) ON DELETE SET NULL
    );
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS photos (
      id TEXT PRIMARY KEY,
      album_id TEXT NOT NULL,
      name TEXT NOT NULL,
      local_path TEXT NOT NULL,
      file_type TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE,
      UNIQUE(album_id, local_path)
    );
  `);

  db.run(`CREATE INDEX IF NOT EXISTS idx_photos_album_id ON photos(album_id);`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_albums_created_at ON albums(created_at);`);
}
