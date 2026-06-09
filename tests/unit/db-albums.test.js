import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import initSqlJs from 'sql.js';
import { initializeSchema } from '../../src/db/schema.js';
import { createAlbum, getAllAlbums, getAlbumById, updateAlbumOrder, renameAlbum, deleteAlbum } from '../../src/db/albums.js';
import { addPhoto, getPhotosByAlbum } from '../../src/db/photos.js';
import { groupAlbumsByDate } from '../../src/utils/date-groups.js';

let SQL;
let db;

beforeAll(async () => {
  SQL = await initSqlJs();
});

beforeEach(() => {
  db = new SQL.Database();
  initializeSchema(db);
});

afterEach(() => {
  db.close();
});

describe('Album CRUD Operations', () => {
  describe('createAlbum', () => {
    it('creates an album with a valid name', () => {
      const album = createAlbum(db, { name: 'Vacation 2026' });
      expect(album.id).toBeTruthy();
      expect(album.name).toBe('Vacation 2026');
      expect(album.photo_count).toBe(0);
      expect(album.sort_order).toBe(0);
      expect(album.created_at).toBeTruthy();
    });
    it('trims whitespace from the album name', () => {
      const album = createAlbum(db, { name: '  My Album  ' });
      expect(album.name).toBe('My Album');
    });
    it('throws when name is empty', () => {
      expect(() => createAlbum(db, { name: '' })).toThrow();
      expect(() => createAlbum(db, { name: '   ' })).toThrow();
    });
    it('throws when name exceeds 100 characters', () => {
      expect(() => createAlbum(db, { name: 'a'.repeat(101) })).toThrow();
    });
    it('allows a name of exactly 100 characters', () => {
      const album = createAlbum(db, { name: 'a'.repeat(100) });
      expect(album.name).toHaveLength(100);
    });
    it('persists the album in the database', () => {
      const album = createAlbum(db, { name: 'Persist Test' });
      expect(getAlbumById(db, album.id).name).toBe('Persist Test');
    });
  });

  describe('getAllAlbums', () => {
    it('returns empty array when no albums exist', () => {
      expect(getAllAlbums(db)).toEqual([]);
    });
    it('returns all created albums', () => {
      createAlbum(db, { name: 'A' });
      createAlbum(db, { name: 'B' });
      expect(getAllAlbums(db)).toHaveLength(2);
    });
    it('returns albums ordered by created_at DESC', () => {
      createAlbum(db, { name: 'First' });
      createAlbum(db, { name: 'Second' });
      expect(getAllAlbums(db)[0].name).toBe('Second');
    });
  });

  describe('getAlbumById', () => {
    it('returns album when exists', () => {
      const a = createAlbum(db, { name: 'Find' });
      expect(getAlbumById(db, a.id).name).toBe('Find');
    });
    it('returns null when not exists', () => {
      expect(getAlbumById(db, 'none')).toBeNull();
    });
  });
});

describe('updateAlbumOrder', () => {
  it('updates sort_order for multiple albums', () => {
    const a1 = createAlbum(db, { name: 'A' });
    const a2 = createAlbum(db, { name: 'B' });
    const a3 = createAlbum(db, { name: 'C' });
    updateAlbumOrder(db, [{ id: a3.id, sort_order: 0 }, { id: a1.id, sort_order: 1 }, { id: a2.id, sort_order: 2 }]);
    const sorted = [...getAllAlbums(db)].sort((a, b) => a.sort_order - b.sort_order);
    expect(sorted.map(a => a.name)).toEqual(['C', 'A', 'B']);
  });
  it('handles empty order array', () => {
    createAlbum(db, { name: 'A' });
    expect(() => updateAlbumOrder(db, [])).not.toThrow();
  });
});

describe('renameAlbum', () => {
  it('renames an album successfully', () => {
    const album = createAlbum(db, { name: 'Old Name' });
    const updated = renameAlbum(db, album.id, 'New Name');
    expect(updated.name).toBe('New Name');
    expect(getAlbumById(db, album.id).name).toBe('New Name');
  });

  it('trims whitespace from new name', () => {
    const album = createAlbum(db, { name: 'Original' });
    const updated = renameAlbum(db, album.id, '  Trimmed  ');
    expect(updated.name).toBe('Trimmed');
  });

  it('throws on empty name', () => {
    const album = createAlbum(db, { name: 'Original' });
    expect(() => renameAlbum(db, album.id, '')).toThrow('Album name must be between 1 and 100 characters');
    expect(() => renameAlbum(db, album.id, '   ')).toThrow();
  });

  it('throws when name exceeds 100 characters', () => {
    const album = createAlbum(db, { name: 'Original' });
    expect(() => renameAlbum(db, album.id, 'a'.repeat(101))).toThrow();
  });

  it('maintains album metadata after rename', () => {
    const album = createAlbum(db, { name: 'Original' });
    addPhoto(db, { album_id: album.id, name: 'p.jpg', local_path: 'p.jpg::1', file_type: 'image/jpeg', file_size: 100 });
    const updated = renameAlbum(db, album.id, 'Renamed');
    expect(updated.photo_count).toBe(1);
    expect(getAllAlbums(db).find(a => a.id === album.id).name).toBe('Renamed');
  });
});

describe('deleteAlbum', () => {
  it('deletes an empty album', () => {
    const album = createAlbum(db, { name: 'Delete Me' });
    deleteAlbum(db, album.id);
    expect(getAlbumById(db, album.id)).toBeNull();
    expect(getAllAlbums(db)).toHaveLength(0);
  });

  it('cascade-deletes all photos when album is deleted', () => {
    const album = createAlbum(db, { name: 'With Photos' });
    addPhoto(db, { album_id: album.id, name: 'a.jpg', local_path: 'a.jpg::1', file_type: 'image/jpeg', file_size: 100 });
    addPhoto(db, { album_id: album.id, name: 'b.jpg', local_path: 'b.jpg::1', file_type: 'image/png', file_size: 200 });
    expect(getPhotosByAlbum(db, album.id)).toHaveLength(2);

    deleteAlbum(db, album.id);
    expect(getAlbumById(db, album.id)).toBeNull();
    // Photos should be cascade-deleted
    const photos = db.exec('SELECT COUNT(*) as cnt FROM photos');
    expect(photos[0].values[0][0]).toBe(0);
  });

  it('does not affect other albums when deleting', () => {
    const a1 = createAlbum(db, { name: 'Keep' });
    const a2 = createAlbum(db, { name: 'Delete' });
    addPhoto(db, { album_id: a1.id, name: 'p.jpg', local_path: 'p.jpg::1', file_type: 'image/jpeg', file_size: 100 });
    deleteAlbum(db, a2.id);
    expect(getAllAlbums(db)).toHaveLength(1);
    expect(getAllAlbums(db)[0].name).toBe('Keep');
    expect(getPhotosByAlbum(db, a1.id)).toHaveLength(1);
  });
});

describe('Drag-and-Drop Order Flow', () => {
  it('reordering preserves date groups', () => {
    const a1 = createAlbum(db, { name: 'Album 1' });
    const a2 = createAlbum(db, { name: 'Album 2' });
    updateAlbumOrder(db, [{ id: a2.id, sort_order: 0 }, { id: a1.id, sort_order: 1 }]);
    const groups = groupAlbumsByDate(getAllAlbums(db));
    const today = groups.find(g => g.label === 'Today');
    expect(today).toBeDefined();
    expect(today.albums).toHaveLength(2);
    const sorted = [...getAllAlbums(db)].sort((a, b) => a.sort_order - b.sort_order);
    expect(sorted[0].name).toBe('Album 2');
  });
  it('reorder persists in database', () => {
    const a1 = createAlbum(db, { name: 'First' });
    const a2 = createAlbum(db, { name: 'Second' });
    updateAlbumOrder(db, [{ id: a2.id, sort_order: 0 }, { id: a1.id, sort_order: 1 }]);
    expect(getAllAlbums(db).find(a => a.id === a2.id).sort_order).toBe(0);
  });
});
