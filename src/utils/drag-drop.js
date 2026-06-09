let dragState = null;

export function initDragDrop(container, { onReorder }) {
  let draggedElement = null;
  let draggedId = null;

  container.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.album-card');
    if (!card) return;

    draggedElement = card;
    draggedId = card.dataset.albumId;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', draggedId);
    card.classList.add('dragging');

    dragState = { fromId: draggedId };
  });

  container.addEventListener('dragend', (e) => {
    const card = e.target.closest('.album-card');
    if (card) {
      card.classList.remove('dragging');
    }
    // Remove all drop indicators
    container.querySelectorAll('.drop-indicator').forEach(el => el.remove());
    container.querySelectorAll('.album-card').forEach(el => el.classList.remove('drag-over'));
    draggedElement = null;
  });

  container.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';

    const target = e.target.closest('.album-card');
    if (!target || target === draggedElement) return;

    // Remove previous indicators
    container.querySelectorAll('.drop-indicator').forEach(el => el.remove());
    container.querySelectorAll('.album-card').forEach(el => el.classList.remove('drag-over'));

    const rect = target.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;

    if (e.clientY < midpoint) {
      // Drop before
      const indicator = document.createElement('div');
      indicator.className = 'drop-indicator drop-before';
      target.parentNode.insertBefore(indicator, target);
    } else {
      // Drop after
      const indicator = document.createElement('div');
      indicator.className = 'drop-indicator drop-after';
      target.parentNode.insertBefore(indicator, target.nextSibling);
    }
  });

  container.addEventListener('dragleave', (e) => {
    const target = e.target.closest('.album-card');
    if (target) {
      target.classList.remove('drag-over');
    }
  });

  container.addEventListener('drop', (e) => {
    e.preventDefault();
    const target = e.target.closest('.album-card');

    // Nesting prevention: dropping ON an album (not between) = invalid
    if (target && draggedElement && target === draggedElement) return;

    // If dropping directly on a card (not between), treat as invalid nesting attempt
    // The drop should only succeed between cards
    const dropIndicator = container.querySelector('.drop-indicator');
    if (!dropIndicator || !draggedElement) {
      // Attempted nesting — snap back
      container.querySelectorAll('.drop-indicator').forEach(el => el.remove());
      container.querySelectorAll('.album-card').forEach(el => el.classList.remove('drag-over', 'drag-invalid'));
      if (target) {
        target.classList.add('drag-invalid');
        setTimeout(() => target.classList.remove('drag-invalid'), 600);
      }
      return;
    }

    // Valid drop: collect new order
    container.querySelectorAll('.drop-indicator').forEach(el => el.remove());
    container.querySelectorAll('.album-card').forEach(el => el.classList.remove('drag-over'));

    // Reorder by collecting all album IDs within this date group grid
    const grid = dropIndicator.closest('.grid, .photo-grid');
    if (!grid) return;

    const cards = grid.querySelectorAll('.album-card');
    const orderedIds = Array.from(cards).map(c => c.dataset.albumId);

    if (onReorder && orderedIds.length > 0) {
      onReorder(orderedIds);
    }
  });
}

export function initTouchSupport(container) {
  let touchDragElement = null;
  let touchStartY = 0;
  let touchStartX = 0;
  let clone = null;

  container.addEventListener('touchstart', (e) => {
    const card = e.target.closest('.album-card');
    if (!card) return;
    touchDragElement = card;
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchmove', (e) => {
    if (!touchDragElement) return;
    const diffY = Math.abs(e.touches[0].clientY - touchStartY);
    const diffX = Math.abs(e.touches[0].clientX - touchStartX);

    if (diffY > 5 || diffX > 5) {
      e.preventDefault();
      if (!clone) {
        clone = touchDragElement.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.zIndex = '1000';
        clone.style.opacity = '0.8';
        clone.style.pointerEvents = 'none';
        clone.style.width = touchDragElement.offsetWidth + 'px';
        document.body.appendChild(clone);
        touchDragElement.style.opacity = '0.3';
      }
      clone.style.left = e.touches[0].clientX - clone.offsetWidth / 2 + 'px';
      clone.style.top = e.touches[0].clientY - clone.offsetHeight / 2 + 'px';
    }
  }, { passive: false });

  container.addEventListener('touchend', (e) => {
    if (!touchDragElement) return;

    if (clone) {
      const target = document.elementFromPoint(
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      );
      const targetCard = target ? target.closest('.album-card') : null;

      // Nesting prevention for touch
      if (targetCard && targetCard !== touchDragElement) {
        const grid = targetCard.closest('.grid, .photo-grid');
        if (grid) {
          // Insert the dragged card before/after the target
          const rect = targetCard.getBoundingClientRect();
          const midpoint = rect.top + rect.height / 2;
          if (e.changedTouches[0].clientY < midpoint) {
            grid.insertBefore(touchDragElement, targetCard);
          } else {
            grid.insertBefore(touchDragElement, targetCard.nextSibling);
          }

          const cards = grid.querySelectorAll('.album-card');
          const orderedIds = Array.from(cards).map(c => c.dataset.albumId);
          // Trigger same reorder logic via a custom event
          const event = new CustomEvent('album-reorder', { detail: { orderedIds } });
          grid.dispatchEvent(event);
        }
      }

      clone.remove();
      clone = null;
    }

    touchDragElement.style.opacity = '1';
    touchDragElement = null;
  });
}
