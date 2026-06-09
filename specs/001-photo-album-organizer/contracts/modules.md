# Module Contracts: Photo Album Organizer

Internal module contracts defining the public API surface of each layer. These
contracts guide implementation and testing — they are the interfaces modules expose
to each other.

---

## db/connection.js

```js
// Initialize SQLite, load from OPFS, return db instance
// Returns: Promise<Database>
export async function initDatabase();

// Persist current in-memory DB to OPFS
// Returns: Promise<void>
export async function saveDatabase(db);

// Generate a UUID v4 string
// Returns: string
export function generateId();
```

---

## db/albums.js

```js
// Create a new album. Returns the created album object.
// Throws if name is empty or >100 chars.
export async function createAlbum(db, { name });

// Get all albums ordered by sort_order within date groups.
// Returns: Array<Album>
export async function getAllAlbums(db);

// Get a single album by ID. Returns null if not found.
export async function getAlbumById(db, id);

// Rename an album. Throws if name invalid.
export async function renameAlbum(db, id, name);

// Delete an album and all its photos (CASCADE). Returns void.
export async function deleteAlbum(db, id);

// Update album sort_order (batch update for reorder).
// Accepts array of { id, sort_order }.
export async function updateAlbumOrder(db, orders);

// Update album cover_photo_id and photo_count.
// Called after photo add/remove.
export async function updateAlbumMeta(db, id, { cover_photo_id, photo_count });
```

---

## db/photos.js

```js
// Add a photo to an album. Returns the created photo object.
// Throws if duplicate (same album_id + local_path).
export async function addPhoto(db, { album_id, name, local_path, file_type, file_size });

// Remove a photo by ID. Updates parent album metadata. Returns void.
export async function removePhoto(db, id);

// Get all photos for an album, sorted by created_at DESC.
// Returns: Array<Photo>
export async function getPhotosByAlbum(db, album_id);

// Get count of photos in an album.
// Returns: number
export async function getPhotoCount(db, album_id);
```

---

## db/schema.js

```js
// Run CREATE TABLE statements. Idempotent (IF NOT EXISTS).
// Returns: Promise<void>
export async function initializeSchema(db);
```

---

## utils/image.js

```js
// Open file picker (native or fallback), return selected File objects.
// Returns: Promise<File[]>
export async function selectImageFiles();

// Read image file and create a thumbnail via Canvas (max 300px).
// Returns: Promise<string> (Object URL for thumbnail display)
export async function createThumbnail(file);

// Generate a local file reference string for stable identification.
// Uses file name + lastModified timestamp.
// Returns: string
export function fileReference(file);

// Check if a file type is supported (JPEG, PNG, WebP, GIF).
// Returns: boolean
export function isSupportedImageType(file);

// Revoke an Object URL to free memory.
export function revokeImageUrl(url);
```

---

## utils/drag-drop.js

```js
// Initialize drag-and-drop on a container element.
// Calls onReorder(orderedIds) when order changes.
// Returns: cleanup function
export function initDragDrop(container, { onReorder });

// Enable touch support on a drag-and-drop container.
export function initTouchSupport(container);
```

---

## utils/date-groups.js

```js
// Group albums by date category.
// Returns: Array<{ label: string, albums: Album[] }>
// Groups: Today, Yesterday, This Week, This Month, Older
// Groups with no albums are omitted.
export function groupAlbumsByDate(albums);

// Get date group label for an album's created_at.
// Returns: string ("Today", "Yesterday", "This Week", "This Month", "Older")
export function getDateGroup(createdAt);
```

---

## ui/main-page.js

```js
// Render the main album list page with date groups.
export async function renderMainPage(db, container);

// Refresh the main page after data changes.
export async function refreshMainPage(db, container);
```

---

## ui/album-view.js

```js
// Render the album detail view with photo tile grid.
export async function renderAlbumView(db, album_id, container);

// Refresh album view after photo changes.
export async function refreshAlbumView(db, album_id, container);
```

---

## ui/photo-preview.js

```js
// Open photo preview overlay.
// Supports arrow keys, swipe, and button navigation.
export function openPreview(photos, startIndex);

// Close the preview overlay.
export function closePreview();
```

---

## ui/album-form.js

```js
// Show create album dialog. Returns created album or null if cancelled.
export async function showCreateAlbumDialog(db);

// Show rename album dialog. Returns updated album or null if cancelled.
export async function showRenameAlbumDialog(db, album);
```

---

## ui/empty-states.js

```js
// Render empty state for no albums on main page.
export function renderNoAlbumsState(container);

// Render empty state for empty album (no photos).
export function renderEmptyAlbumState(container);

// Render placeholder for broken/missing image tile.
export function renderBrokenImageTile(container);
```

---

## ui/feedback.js

```js
// Show a loading indicator on an element.
export function showLoading(element);

// Hide loading indicator.
export function hideLoading(element);

// Show a success message (toast or inline).
export function showSuccess(message);

// Show an error message (toast or inline).
export function showError(message);

// Show a confirmation dialog. Returns boolean.
export async function showConfirm(message);
```
