import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import initSqlJs from 'sql.js';
import { initializeSchema } from '../../src/db/schema.js';
import { createAlbum } from '../../src/db/albums.js';
import { addPhoto, removePhoto, getPhotosByAlbum, getPhotoCount } from '../../src/db/photos.js';

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

function makeAlbumId() {
  return createAlbum(db, { name: 'Test Album' }).id;
}

describe('Photo DB Operations', () => {
  describe('addPhoto', () => {
    it('adds a photo to an album', () => {
      const albumId = makeAlbumId();
      const photo = addPhoto(db, {
        album_id: albumId,
        name: 'sunset.jpg',
        local_path: 'sunset.jpg::1749500000000',
        file_type: 'image/jpeg',
        file_size: 102400,
      });
      expect(photo.id).toBeTruthy();
      expect(photo.name).toBe('sunset.jpg');
      expect(photo.album_id).toBe(albumId);
    });

    it('rejects duplicate photo (same album + local_path)', () => {
      const albumId = makeAlbumId();
      addPhoto(db, {
        album_id: albumId,
        name: 'photo.jpg',
        local_path: 'photo.jpg::1749500000000',
        file_type: 'image/jpeg',
        file_size: 50000,
      });
      expect(() =>
        addPhoto(db, {
          album_id: albumId,
          name: 'photo.jpg',
          local_path: 'photo.jpg::1749500000000',
          file_type: 'image/jpeg',
          file_size: 50000,
        })
      ).toThrow();
    });

    it('updates album photo_count after add', () => {
      const albumId = makeAlbumId();
      addPhoto(db, { album_id: albumId, name: 'a.jpg', local_path: 'a.jpg::1', file_type: 'image/jpeg', file_size: 100 });
      addPhoto(db, { album_id: albumId, name: 'b.jpg', local_path: 'b.jpg::1', file_type: 'image/jpeg', file_size: 100 });
      expect(getPhotoCount(db, albumId)).toBe(2);
    });

    it('sets cover_photo_id on first photo added', () => {
      const albumId = makeAlbumId();
      const photo = addPhoto(db, { album_id: albumId, name: 'cover.jpg', local_path: 'cover.jpg::1', file_type: 'image/jpeg', file_size: 100 });
      const album = db.exec('SELECT cover_photo_id FROM albums WHERE id = ?', [albumId]);
      expect(album[0].values[0][0]).toBe(photo.id);
    });
  });

  describe('removePhoto', () => {
    it('removes a photo from an album', () => {
      const albumId = makeAlbumId();
      const photo = addPhoto(db, { album_id: albumId, name: 'remove-me.jpg', local_path: 'remove-me.jpg::1', file_type: 'image/jpeg', file_size: 100 });
      removePhoto(db, photo.id);
      expect(getPhotoCount(db, albumId)).toBe(0);
      expect(getPhotosByAlbum(db, albumId)).toEqual([]);
    });

    it('updates cover when cover photo is removed', () => {
      const albumId = makeAlbumId();
      const first = addPhoto(db, { album_id: albumId, name: 'first.jpg', local_path: 'first.jpg::1', file_type: 'image/jpeg', file_size: 100 });
      const second = addPhoto(db, { album_id: albumId, name: 'second.jpg', local_path: 'second.jpg::1', file_type: 'image/jpeg', file_size: 100 });
      removePhoto(db, second.id);
      const album = db.exec('SELECT cover_photo_id FROM albums WHERE id = ?', [albumId]);
      expect(album[0].values[0][0]).toBe(first.id);
    });

    it('sets cover_photo_id to NULL when last photo removed', () => {
      const albumId = makeAlbumId();
      const photo = addPhoto(db, { album_id: albumId, name: 'only.jpg', local_path: 'only.jpg::1', file_type: 'image/jpeg', file_size: 100 });
      removePhoto(db, photo.id);
      const album = db.exec('SELECT cover_photo_id FROM albums WHERE id = ?', [albumId]);
      expect(album[0].values[0][0]).toBeNull();
    });
  });

  describe('getPhotosByAlbum', () => {
    it('returns photos sorted by created_at DESC (newest first)', () => {
      const albumId = makeAlbumId();
      addPhoto(db, { album_id: albumId, name: 'old.jpg', local_path: 'old.jpg::1', file_type: 'image/jpeg', file_size: 100 });
      const newerPhoto = addPhoto(db, { album_id: albumId, name: 'new.jpg', local_path: 'new.jpg::1', file_type: 'image/jpeg', file_size: 100 });
      const photos = getPhotosByAlbum(db, albumId);
      expect(photos).toHaveLength(2);
      expect(photos[0].name).toBe('new.jpg');
    });

    it('returns empty array for album with no photos', () => {
      const albumId = makeAlbumId();
      expect(getPhotosByAlbum(db, albumId)).toEqual([]);
    });
  });
});
