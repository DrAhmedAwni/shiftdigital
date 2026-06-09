import { revokeImageUrl } from '../utils/image.js';

let currentOverlay = null;
let currentPhotos = [];
let currentIndex = 0;

export function openPreview(photos, startIndex) {
  currentPhotos = photos;
  currentIndex = startIndex;

  closePreview();

  const overlay = document.createElement('div');
  overlay.className = 'preview-overlay';
  overlay.id = 'photo-preview';

  const img = document.createElement('img');
  img.id = 'preview-image';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'preview-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.title = 'Close preview';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'preview-nav preview-prev';
  prevBtn.innerHTML = '&#8249;';
  prevBtn.title = 'Previous photo';

  const nextBtn = document.createElement('button');
  nextBtn.className = 'preview-nav preview-next';
  nextBtn.innerHTML = '&#8250;';
  nextBtn.title = 'Next photo';

  const counter = document.createElement('div');
  counter.className = 'preview-counter';

  overlay.appendChild(img);
  overlay.appendChild(closeBtn);
  overlay.appendChild(prevBtn);
  overlay.appendChild(nextBtn);
  overlay.appendChild(counter);

  function update() {
    const photo = currentPhotos[currentIndex];
    if (photo) {
      img.alt = photo.name;
      // Try to display from local file if available
      img.src = '';
    }
    counter.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
    prevBtn.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
    nextBtn.style.visibility = currentIndex < currentPhotos.length - 1 ? 'visible' : 'hidden';
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      update();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < currentPhotos.length - 1) {
      currentIndex++;
      update();
    }
  });

  closeBtn.addEventListener('click', closePreview);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePreview();
  });

  // Touch swipe support
  let touchStartX = 0;
  overlay.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  overlay.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex > 0) {
        currentIndex--;
        update();
      } else if (diff < 0 && currentIndex < currentPhotos.length - 1) {
        currentIndex++;
        update();
      }
    }
  });

  document.body.appendChild(overlay);
  currentOverlay = overlay;

  update();
}

export function closePreview() {
  if (currentOverlay) {
    currentOverlay.remove();
    currentOverlay = null;
  }
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!currentOverlay) return;

  if (e.key === 'Escape') {
    closePreview();
  } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
    currentIndex--;
    updatePreviewImage();
  } else if (e.key === 'ArrowRight' && currentIndex < currentPhotos.length - 1) {
    currentIndex++;
    updatePreviewImage();
  }
});

function updatePreviewImage() {
  const img = document.getElementById('preview-image');
  const counter = document.querySelector('.preview-counter');
  const prevBtn = document.querySelector('.preview-prev');
  const nextBtn = document.querySelector('.preview-next');

  if (img) {
    const photo = currentPhotos[currentIndex];
    if (photo) {
      img.alt = photo.name;
    }
  }
  if (counter) counter.textContent = `${currentIndex + 1} / ${currentPhotos.length}`;
  if (prevBtn) prevBtn.style.visibility = currentIndex > 0 ? 'visible' : 'hidden';
  if (nextBtn) nextBtn.style.visibility = currentIndex < currentPhotos.length - 1 ? 'visible' : 'hidden';
}
