import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import initSqlJs from 'sql.js';
import { initializeSchema } from '../../src/db/schema.js';
import { createAlbum, getAlbumById } from '../../src/db/albums.js';
import { addPhoto, removePhoto, getPhotosByAlbum, getPhotoCount } from '../../src/db/photos.js';

let SQL;
let db;
let albumId;

beforeAll(async () => {
  SQL = await initSqlJs();
});

beforeEach(() => {
  db = new SQL.Database();
  initializeSchema(db);
  albumId = createAlbum(db, { name: 'Photo Test Album' }).id;
});

afterEach(() => {
  db.close();
});

describe('Photo Management Flow', () => {
  it('adds photos and verifies tile display order (newest first)', () => {
    const p1 = addPhoto(db, { album_id: albumId, name: 'aaa.jpg', local_path: 'aaa.jpg::1', file_type: 'image/jpeg', file_size: 100 });
    const p2 = addPhoto(db, { album_id: albumId, name: 'zzz.jpg', local_path: 'zzz.jpg::1', file_type: 'image/jpeg', file_size: 200 });
    const p3 = addPhoto(db, { album_id: albumId, name: 'mmm.jpg', local_path: 'mmm.jpg::1', file_type: 'image/png', file_size: 300 });

    const photos = getPhotosByAlbum(db, albumId);
    expect(photos).toHaveLength(3);
    // Newest first: mmm, then zzz, then aaa (by insertion order with rowid tiebreak)
    expect(photos[0].name).toBe('mmm.jpg');
  });

  it('removes a photo and updates album count/cover', () => {
    const p1 = addPhoto(db, { album_id: albumId, name: 'first.jpg', local_path: 'first.jpg::1', file_type: 'image/jpeg', file_size: 100 });
    const p2 = addPhoto(db, { album_id: albumId, name: 'second.jpg', local_path: 'second.jpg::1', file_type: 'image/jpeg', file_size: 200 });

    expect(getPhotoCount(db, albumId)).toBe(2);

    removePhoto(db, p2.id);
    expect(getPhotoCount(db, albumId)).toBe(1);
    expect(getPhotosByAlbum(db, albumId)).toHaveLength(1);

    // Cover should be p1 (first added, still present)
    const album = getAlbumById(db, albumId);
    expect(album.cover_photo_id).toBe(p1.id);

    // Remove last photo
    removePhoto(db, p1.id);
    expect(getPhotoCount(db, albumId)).toBe(0);
    const albumAfter = getAlbumById(db, albumId);
    expect(albumAfter.cover_photo_id).toBeNull();
    expect(albumAfter.photo_count).toBe(0);
  });

  it('prevents duplicate photos in the same album', () => {
    addPhoto(db, { album_id: albumId, name: 'dup.jpg', local_path: 'dup.jpg::1', file_type: 'image/jpeg', file_size: 100 });
    expect(() =>
      addPhoto(db, { album_id: albumId, name: 'dup.jpg', local_path: 'dup.jpg::1', file_type: 'image/jpeg', file_size: 100 })
    ).toThrow();
    expect(getPhotoCount(db, albumId)).toBe(1);
  });
});
