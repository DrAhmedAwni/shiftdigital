export function renderNoAlbumsState(container) {
  container.innerHTML = `
    <div class="empty-state">
      <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <p class="empty-state-title">No albums yet</p>
      <p class="empty-state-description">Create your first album to start organizing your photos</p>
    </div>
  `;
}

export function renderEmptyAlbumState(container) {
  container.innerHTML = `
    <div class="empty-state">
      <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <p class="empty-state-title">No photos in this album</p>
      <p class="empty-state-description">Add photos to get started</p>
    </div>
  `;
}

export function renderBrokenImageTile(container) {
  const tile = document.createElement('div');
  tile.className = 'photo-tile photo-tile-error';
  tile.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 32px; height: 32px;">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
    <span style="font-size: var(--font-size-xs);">Unavailable</span>
  `;
  return tile;
}
