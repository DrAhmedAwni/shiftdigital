import { describe, it, expect } from 'vitest';
import { getDateGroup, groupAlbumsByDate } from '../../src/utils/date-groups.js';

describe('getDateGroup', () => {
  it('returns "Today" for current date', () => {
    const now = new Date().toISOString();
    expect(getDateGroup(now)).toBe('Today');
  });

  it('returns "Today" for start of current calendar day', () => {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 1);
    expect(getDateGroup(startOfDay.toISOString())).toBe('Today');
  });

  it('returns "Yesterday" for one day ago', () => {
    const now = new Date();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 12, 0, 0);
    expect(getDateGroup(yesterday.toISOString())).toBe('Yesterday');
  });

  it('returns "This Week" for 3 days ago', () => {
    const now = new Date();
    const threeDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3, 12, 0, 0);
    expect(getDateGroup(threeDaysAgo.toISOString())).toBe('This Week');
  });

  it('returns "This Month" for 10 days ago', () => {
    const now = new Date();
    const tenDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10, 12, 0, 0);
    expect(getDateGroup(tenDaysAgo.toISOString())).toBe('This Month');
  });

  it('returns "Older" for 35 days ago', () => {
    const now = new Date();
    const thirtyFiveDaysAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 35, 12, 0, 0);
    expect(getDateGroup(thirtyFiveDaysAgo.toISOString())).toBe('Older');
  });
});

describe('groupAlbumsByDate', () => {
  it('returns empty array when no albums provided', () => {
    expect(groupAlbumsByDate([])).toEqual([]);
  });

  it('groups a single album as Today', () => {
    const album = { id: '1', name: 'Test', created_at: new Date().toISOString() };
    const result = groupAlbumsByDate([album]);
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('Today');
    expect(result[0].albums).toHaveLength(1);
  });

  it('groups albums into multiple date groups', () => {
    const now = new Date();
    const albums = [
      { id: '1', name: 'Today Album', created_at: now.toISOString() },
      { id: '2', name: 'Yesterday Album', created_at: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1).toISOString() },
      { id: '3', name: 'Old Album', created_at: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 40).toISOString() },
    ];
    const result = groupAlbumsByDate(albums);
    expect(result.length).toBeGreaterThanOrEqual(2);
    const todayGroup = result.find((g) => g.label === 'Today');
    expect(todayGroup).toBeDefined();
    expect(todayGroup.albums[0].name).toBe('Today Album');
  });

  it('omits empty groups', () => {
    const now = new Date();
    const albums = [
      { id: '1', name: 'Only Today', created_at: now.toISOString() },
    ];
    const result = groupAlbumsByDate(albums);
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe('Today');
  });

  it('preserves album sort_order within groups', () => {
    const now = new Date();
    const albums = [
      { id: '3', name: 'Third', created_at: now.toISOString(), sort_order: 2 },
      { id: '1', name: 'First', created_at: now.toISOString(), sort_order: 0 },
      { id: '2', name: 'Second', created_at: now.toISOString(), sort_order: 1 },
    ];
    const result = groupAlbumsByDate(albums);
    const todayGroup = result.find((g) => g.label === 'Today');
    expect(todayGroup.albums.map((a) => a.sort_order)).toEqual([2, 0, 1]);
  });
});
