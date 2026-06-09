import { describe, it, expect, beforeAll, beforeEach, afterEach } from 'vitest';
import initSqlJs from 'sql.js';
import { initializeSchema } from '../../src/db/schema.js';
import { createAlbum, getAllAlbums, getAlbumById } from '../../src/db/albums.js';
import { groupAlbumsByDate, getDateGroup } from '../../src/utils/date-groups.js';

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

describe('Album Creation Flow', () => {
  it('creates an album and it appears grouped by date on the "main page"', () => {
    const album = createAlbum(db, { name: 'Integration Test Album' });
    const allAlbums = getAllAlbums(db);

    expect(allAlbums).toHaveLength(1);
    expect(allAlbums[0].name).toBe('Integration Test Album');

    const groups = groupAlbumsByDate(allAlbums);
    expect(groups).toHaveLength(1);
    expect(groups[0].label).toBe('Today');
    expect(groups[0].albums[0].name).toBe('Integration Test Album');
    expect(groups[0].albums[0].photo_count).toBe(0);
  });

  it('creates multiple albums and groups them by date', () => {
    createAlbum(db, { name: 'First Album' });
    createAlbum(db, { name: 'Second Album' });
    createAlbum(db, { name: 'Third Album' });

    const allAlbums = getAllAlbums(db);
    expect(allAlbums).toHaveLength(3);

    const groups = groupAlbumsByDate(allAlbums);
    expect(groups).toHaveLength(1); // All created today
    expect(groups[0].label).toBe('Today');
    expect(groups[0].albums).toHaveLength(3);
  });

  it('returns empty state (no groups) when no albums exist', () => {
    const allAlbums = getAllAlbums(db);
    expect(allAlbums).toEqual([]);

    const groups = groupAlbumsByDate(allAlbums);
    expect(groups).toEqual([]);
  });

  it('album card data includes name, cover, and photo count', () => {
    const album = createAlbum(db, { name: 'Card Data Test' });
    const fetched = getAlbumById(db, album.id);

    expect(fetched.name).toBe('Card Data Test');
    expect(fetched.cover_photo_id).toBeNull();
    expect(fetched.photo_count).toBe(0);
    expect(fetched.sort_order).toBe(0);
    expect(fetched.created_at).toBeTruthy();
  });
});
