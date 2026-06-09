import { showLoading, hideLoading } from './feedback.js';

export function showCreateAlbumDialog(db) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    overlay.innerHTML = `
      <div class="dialog">
        <h2 class="dialog-title">Create Album</h2>
        <div class="dialog-field">
          <label for="album-name">Album Name</label>
          <input type="text" id="album-name" placeholder="e.g. Vacation 2026" maxlength="100" autofocus />
          <div class="field-error" style="display: none;"></div>
        </div>
        <div class="dialog-actions">
          <button class="btn btn-secondary" data-action="cancel">Cancel</button>
          <button class="btn btn-primary" data-action="create">Create</button>
        </div>
      </div>
    `;

    const input = overlay.querySelector('#album-name');
    const error = overlay.querySelector('.field-error');
    const createBtn = overlay.querySelector('[data-action="create"]');

    function validate() {
      const value = input.value.trim();
      if (!value) {
        error.textContent = 'Album name is required';
        error.style.display = 'block';
        return false;
      }
      if (value.length > 100) {
        error.textContent = 'Album name must be 100 characters or fewer';
        error.style.display = 'block';
        return false;
      }
      error.style.display = 'none';
      return true;
    }

    input.addEventListener('input', () => {
      if (error.style.display !== 'none') validate();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && validate()) {
        submit();
      }
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
        resolve(null);
      }
    });

    overlay.querySelector('[data-action="cancel"]').addEventListener('click', () => {
      overlay.remove();
      resolve(null);
    });

    async function submit() {
      if (!validate()) return;
      showLoading(createBtn);
      try {
        const { createAlbum } = await import('../db/albums.js');
        const album = createAlbum(db, { name: input.value });
        overlay.remove();
        resolve(album);
      } catch (err) {
        error.textContent = err.message;
        error.style.display = 'block';
        hideLoading(createBtn);
      }
    }

    createBtn.addEventListener('click', submit);
    document.body.appendChild(overlay);
    input.focus();
  });
}

export function showRenameAlbumDialog(db, album) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'dialog-overlay';
    overlay.innerHTML = `
      <div class="dialog">
        <h2 class="dialog-title">Rename Album</h2>
        <div class="dialog-field">
          <label for="album-name">Album Name</label>
          <input type="text" id="album-name" value="${escapeHtml(album.name)}" maxlength="100" autofocus />
          <div class="field-error" style="display: none;"></div>
        </div>
        <div class="dialog-actions">
          <button class="btn btn-secondary" data-action="cancel">Cancel</button>
          <button class="btn btn-primary" data-action="rename">Save</button>
        </div>
      </div>
    `;

    const input = overlay.querySelector('#album-name');
    const error = overlay.querySelector('.field-error');
    const renameBtn = overlay.querySelector('[data-action="rename"]');

    function validate() {
      const value = input.value.trim();
      if (!value) { error.textContent = 'Album name is required'; error.style.display = 'block'; return false; }
      if (value.length > 100) { error.textContent = 'Album name must be 100 characters or fewer'; error.style.display = 'block'; return false; }
      error.style.display = 'none';
      return true;
    }

    input.addEventListener('input', () => { if (error.style.display !== 'none') validate(); });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && validate()) submit(); });

    overlay.addEventListener('click', (e) => { if (e.target === overlay) { overlay.remove(); resolve(null); } });
    overlay.querySelector('[data-action="cancel"]').addEventListener('click', () => { overlay.remove(); resolve(null); });

    async function submit() {
      if (!validate()) return;
      showLoading(renameBtn);
      try {
        const { renameAlbum } = await import('../db/albums.js');
        const updated = renameAlbum(db, album.id, input.value);
        overlay.remove();
        resolve(updated);
      } catch (err) {
        error.textContent = err.message;
        error.style.display = 'block';
        hideLoading(renameBtn);
      }
    }

    renameBtn.addEventListener('click', submit);
    document.body.appendChild(overlay);
    input.focus();
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
