import '../css/states.css';

let toastContainer = null;

function ensureToastContainer() {
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

function createToast(message, type) {
  const container = ensureToastContainer();
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  const close = document.createElement('button');
  close.className = 'toast-close';
  close.textContent = '\u00d7';
  close.addEventListener('click', () => toast.remove());
  toast.appendChild(close);

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

export function showLoading(element) {
  element.classList.add('loading');
  element.disabled = true;
  const original = element.textContent;
  element.dataset.originalText = original;
  element.innerHTML = '<span class="spinner"></span>';
}

export function hideLoading(element) {
  element.classList.remove('loading');
  element.disabled = false;
  if (element.dataset.originalText) {
    element.textContent = element.dataset.originalText;
  }
}

export function showSuccess(message) {
  createToast(message, 'success');
}

export function showError(message) {
  createToast(message, 'error');
}

export function showConfirm(message) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
      <div class="dialog">
        <p class="dialog-message">${message}</p>
        <div class="dialog-actions">
          <button class="btn btn-secondary" data-action="cancel">Cancel</button>
          <button class="btn btn-danger" data-action="confirm">Delete</button>
        </div>
      </div>
    `;

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
        resolve(false);
      }
    });

    overlay.querySelector('[data-action="cancel"]').addEventListener('click', () => {
      overlay.remove();
      resolve(false);
    });

    overlay.querySelector('[data-action="confirm"]').addEventListener('click', () => {
      overlay.remove();
      resolve(true);
    });

    document.body.appendChild(overlay);
  });
}
