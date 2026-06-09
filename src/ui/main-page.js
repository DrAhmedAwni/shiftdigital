import { getAllAlbums, updateAlbumOrder } from '../db/albums.js';
import { saveDatabase } from '../db/connection.js';
import { groupAlbumsByDate } from '../utils/date-groups.js';
import { initDragDrop, initTouchSupport } from '../utils/drag-drop.js';
import { showCreateAlbumDialog, showRenameAlbumDialog } from './album-form.js';
import { renderNoAlbumsState } from './empty-states.js';
import { showError, showSuccess, showConfirm } from './feedback.js';

export async function renderMainPage(db, container) {
  container.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'container';
  header.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">My Albums</h1>
      <button class="btn btn-primary" id="create-album-btn">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="8" y1="2" x2="8" y2="14" />
          <line x1="2" y1="8" x2="14" y2="8" />
        </svg>
        New Album
      </button>
    </div>
  `;
  container.appendChild(header);

  const content = document.createElement('div');
  content.className = 'container';
  container.appendChild(content);

  try {
    const albums = getAllAlbums(db);

    if (albums.length === 0) {
      renderNoAlbumsState(content);
    } else {
      const groups = groupAlbumsByDate(albums);

      for (const group of groups) {
        const groupSection = document.createElement('div');
        groupSection.className = 'date-group';

        const groupHeader = document.createElement('h2');
        groupHeader.className = 'date-group-header';
        groupHeader.textContent = group.label;
        groupSection.appendChild(groupHeader);

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-2';

        for (const album of group.albums) {
          const card = createAlbumCard(album);
          grid.appendChild(card);
        }

        groupSection.appendChild(grid);
        content.appendChild(groupSection);

        // Wire drag-and-drop on this date group's grid
        initDragDrop(grid, {
          onReorder: async (orderedIds) => {
            const orders = orderedIds.map((id, index) => ({ id, sort_order: index }));
            updateAlbumOrder(db, orders);
            await saveDatabase();
            showSuccess('Albums reordered');
            await renderMainPage(db, container);
          },
        });
        initTouchSupport(grid);

        // Listen for touch reorder events
        grid.addEventListener('album-reorder', async (event) => {
          const orderedIds = event.detail.orderedIds;
          const orders = orderedIds.map((id, index) => ({ id, sort_order: index }));
          updateAlbumOrder(db, orders);
          await saveDatabase();
          showSuccess('Albums reordered');
          await renderMainPage(db, container);
        });
      }
    }
  } catch (err) {
    console.error('Failed to render main page:', err);
    showError('Failed to load albums');
  }

  const createBtn = container.querySelector('#create-album-btn');
  if (createBtn) {
    createBtn.addEventListener('click', async () => {
      const album = await showCreateAlbumDialog(db);
      if (album) {
        await saveDatabase();
        await renderMainPage(db, container);
      }
    });
  }
}

export async function refreshMainPage(db, container) {
  await renderMainPage(db, container);
}

function createAlbumCard(album) {
  const card = document.createElement('div');
  card.className = 'album-card';
  card.setAttribute('tabindex', '0');
  card.draggable = true;
  card.dataset.albumId = album.id;

  const cover = document.createElement('div');
  cover.className = 'album-card-cover';
  cover.innerHTML = `
    <svg class="album-card-cover-placeholder" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
  `;
  card.appendChild(cover);

  const info = document.createElement('div');
  info.className = 'album-card-info';

  const name = document.createElement('span');
  name.className = 'album-card-name';
  name.textContent = album.name;
  info.appendChild(name);

  const meta = document.createElement('span');
  meta.className = 'album-card-meta';
  meta.innerHTML = `
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <path d="M21 15l-5-5L5 21" />
    </svg>
    ${album.photo_count} photo${album.photo_count !== 1 ? 's' : ''}
  `;
  info.appendChild(meta);

  const actions = document.createElement('div');
  actions.className = 'album-card-actions';

  const renameBtn = document.createElement('button');
  renameBtn.className = 'btn btn-sm btn-secondary';
  renameBtn.textContent = 'Rename';
  renameBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const { getAlbumById } = await import('../db/albums.js');
    const current = getAlbumById(db, album.id);
    const updated = await showRenameAlbumDialog(db, current);
    if (updated) {
      await saveDatabase();
      showSuccess('Album renamed');
      await renderMainPage(db, container);
    }
  });
  actions.appendChild(renameBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'btn btn-sm btn-danger';
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const confirmed = await showConfirm('Delete this album and all its photos? This cannot be undone.');
    if (confirmed) {
      const { deleteAlbum } = await import('../db/albums.js');
      deleteAlbum(db, album.id);
      await saveDatabase();
      showSuccess('Album deleted');
      await renderMainPage(db, container);
    }
  });
  actions.appendChild(deleteBtn);

  card.appendChild(info);
  card.appendChild(actions);

  card.addEventListener('click', () => {
    window.location.hash = `#/album/${album.id}`;
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.location.hash = `#/album/${album.id}`;
    }
  });

  return card;
}
