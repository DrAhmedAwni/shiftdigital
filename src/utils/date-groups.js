export function getDateGroup(createdAt) {
  const date = new Date(createdAt);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 86400000);
  const weekAgo = new Date(today.getTime() - 7 * 86400000);
  const monthAgo = new Date(today.getTime() - 30 * 86400000);

  if (date >= today) return 'Today';
  if (date >= yesterday) return 'Yesterday';
  if (date >= weekAgo) return 'This Week';
  if (date >= monthAgo) return 'This Month';
  return 'Older';
}

export function groupAlbumsByDate(albums) {
  const groups = [
    { label: 'Today', albums: [] },
    { label: 'Yesterday', albums: [] },
    { label: 'This Week', albums: [] },
    { label: 'This Month', albums: [] },
    { label: 'Older', albums: [] },
  ];

  for (const album of albums) {
    const group = getDateGroup(album.created_at);
    const target = groups.find((g) => g.label === group);
    if (target) target.albums.push(album);
  }

  return groups.filter((g) => g.albums.length > 0);
}
