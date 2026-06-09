import { getAlbumById } from '../db/albums.js';
import { getPhotosByAlbum, addPhoto, removePhoto } from '../db/photos.js';
import { saveDatabase } from '../db/connection.js';
import { selectImageFiles, isSupportedImageType, fileReference, createThumbnail, revokeImageUrl } from '../utils/image.js';
import { openPreview } from './photo-preview.js';
import { showRenameAlbumDialog } from './album-form.js';
import { renderEmptyAlbumState, renderBrokenImageTile } from './empty-states.js';
import { showLoading, hideLoading, showError, showSuccess } from './feedback.js';

export async function renderAlbumView(db, album_id, container) {
  const album = getAlbumById(db, album_id);

  if (!album) {
    container.innerHTML = '<div class="container" style="padding: 2rem;"><p>Album not found.</p></div>';
    return;
  }

  const photos = getPhotosByAlbum(db, album_id);

  container.innerHTML = `
    <div class="container">
      <div class="album-view-header">
        <div>
          <button class="back-btn" id="back-to-main">&larr; Back</button>
        </div>
        <div style="text-align: right;">
          <h1 class="album-view-title">${escapeHtml(album.name)}</h1>
          <span class="album-view-count">${photos.length} photo${photos.length !== 1 ? 's' : ''}</span>
          <button class="btn btn-sm btn-secondary" id="rename-album-btn" style="margin-top: var(--space-xs);">Rename</button>
        </div>
      </div>
    </div>
  `;

  const backBtn = container.querySelector('#back-to-main');
  backBtn.addEventListener('click', () => {
    window.location.hash = '';
  });

  const renameBtn = container.querySelector('#rename-album-btn');
  if (renameBtn) {
    renameBtn.addEventListener('click', async () => {
      const updated = await showRenameAlbumDialog(db, album);
      if (updated) {
        await saveDatabase();
        showSuccess('Album renamed');
        await renderAlbumView(db, album_id, container);
      }
    });
  }

  const content = document.createElement('div');
  content.className = 'container';
  container.appendChild(content);

  if (photos.length === 0) {
    renderEmptyAlbumState(content);
  } else {
    const grid = document.createElement('div');
    grid.className = 'photo-grid';
    renderTileGrid(grid, photos, db, album_id, container);
    content.appendChild(grid);
  }

  const addTile = document.createElement('div');
  addTile.className = 'add-photo-tile';
  addTile.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
    <span style="font-size: var(--font-size-sm);">Add Photos</span>
  `;

  addTile.addEventListener('click', async () => {
    try {
      const files = await selectImageFiles();
      if (!files || files.length === 0) return;

      const addBtn = document.getElementById('add-photo-btn');
      if (addBtn) showLoading(addBtn);

      let added = 0;
      for (const file of files) {
        if (!isSupportedImageType(file)) continue;

        try {
          const ref = fileReference(file);
          // Check for duplicates before adding
          const existing = getPhotosByAlbum(db, album_id).filter(p => p.local_path === ref);
          if (existing.length > 0) continue;

          const thumbUrl = await createThumbnail(file);
          addPhoto(db, {
            album_id,
            name: file.name,
            local_path: ref,
            file_type: file.type,
            file_size: file.size,
          });

          // Store thumbnail URL for display
          if (!file._thumbUrl) file._thumbUrl = thumbUrl;
          added++;
        } catch {
          // Skip files that fail to process
        }
      }

      if (addBtn) hideLoading(addBtn);

      if (added > 0) {
        await saveDatabase();
        showSuccess(`${added} photo${added !== 1 ? 's' : ''} added`);
        await renderAlbumView(db, album_id, container);
      } else if (files.length > 0) {
        showError('No valid photos were added. Supported formats: JPEG, PNG, WebP, GIF.');
      }
    } catch (err) {
      console.error('Failed to add photos:', err);
      showError('Failed to add photos');
    }
  });

  content.appendChild(addTile);
}

export async function refreshAlbumView(db, album_id, container) {
  await renderAlbumView(db, album_id, container);
}

function renderTileGrid(grid, photos, db, album_id, container) {
  const thumbnails = new Map();

  for (let i = 0; i < photos.length; i++) {
    const photo = photos[i];
    const tile = document.createElement('div');
    tile.className = 'photo-tile';

    const img = document.createElement('img');
    img.alt = photo.name;
    img.loading = 'lazy';

    // Use cached thumbnail if available, otherwise try local file
    if (thumbnails.has(photo.id)) {
      img.src = thumbnails.get(photo.id);
    }

    img.addEventListener('error', () => {
      const errorTile = renderBrokenImageTile();
      tile.innerHTML = '';
      while (errorTile.firstChild) {
        tile.appendChild(errorTile.firstChild);
      }
    });

    tile.appendChild(img);

    const overlay = document.createElement('div');
    overlay.className = 'photo-tile-overlay';

    const removeBtn = document.createElement('button');
    removeBtn.className = 'photo-tile-remove';
    removeBtn.innerHTML = '&times;';
    removeBtn.title = 'Remove photo';
    removeBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        removePhoto(db, photo.id);
        await saveDatabase();
        showSuccess('Photo removed');
        await renderAlbumView(db, album_id, container);
      } catch (err) {
        showError('Failed to remove photo');
      }
    });

    overlay.appendChild(removeBtn);
    tile.appendChild(overlay);

    tile.addEventListener('click', () => {
      openPreview(photos, i);
    });

    grid.appendChild(tile);
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
