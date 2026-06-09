import { initDatabase } from './db/connection.js';
import { initializeSchema } from './db/schema.js';
import { renderMainPage } from './ui/main-page.js';
import { renderAlbumView } from './ui/album-view.js';

let db = null;

function getRoute() {
  const hash = window.location.hash.slice(1);
  if (hash.startsWith('/album/')) {
    return { page: 'album', albumId: hash.slice(8) };
  }
  return { page: 'home' };
}

async function render() {
  const container = document.getElementById('app');
  if (!container) return;

  const route = getRoute();

  if (route.page === 'album' && route.albumId) {
    await renderAlbumView(db, route.albumId, container);
  } else {
    await renderMainPage(db, container);
  }
}

window.addEventListener('hashchange', render);

async function bootstrap() {
  try {
    db = await initDatabase();
    initializeSchema(db);
    await render();
  } catch (err) {
    console.error('Failed to initialize application:', err);
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = '<div class="container"><p style="padding: 2rem; color: var(--color-danger);">Failed to start the application. Please ensure your browser supports OPFS and WebAssembly.</p></div>';
    }
  }
}

bootstrap();
