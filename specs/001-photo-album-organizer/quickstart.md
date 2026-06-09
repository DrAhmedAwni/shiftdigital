# Quickstart: Photo Album Organizer

Validation guide for verifying the application works end-to-end before launch.

## Prerequisites

- Node.js 20+ installed
- npm 10+ installed
- Modern browser (Chrome 100+, Firefox 100+, Safari 15+, or Edge 100+)

## Setup

```bash
# From repository root
npm install
npm run dev
# Opens http://localhost:5173 in browser
```

## Validation Scenarios

### 1. Application Starts and Shows Empty State

**Action**: Open http://localhost:5173

**Expected**:
- Page loads without errors in browser console
- "No albums yet" empty state is displayed
- "Create Album" button is visible and clickable

### 2. Create an Album

**Action**: Click "Create Album" → Enter "Vacation 2026" → Confirm

**Expected**:
- Album card appears with name "Vacation 2026"
- Card shows default cover placeholder
- Photo count shows "0"
- Album appears under "Today" date group header
- Loading indicator shows during creation

### 3. Date Grouping Behavior

**Action**: Create 2 more albums with different names, then modify their
`created_at` values in SQLite to be 2 days ago and 10 days ago (or wait naturally
if testing over multiple days)

**Expected**:
- Albums appear under correct date group headers: Today, Yesterday, This Week
- Groups with no albums are not displayed
- Albums within each group maintain their sort order

### 4. Open Album and Add Photos

**Action**: Click "Vacation 2026" album card → Click "Add Photos" → Select 3 image
files (JPEG/PNG) from device

**Expected**:
- File picker opens (native dialog where supported)
- Loading indicator shows during file processing
- 3 photo tiles appear in the album view
- Thumbnails are generated and displayed
- Photo count on album card updates to "3" when returning to main page
- Supported image formats accepted; unsupported formats rejected with message

### 5. Photo Tile Preview

**Action**: Click a photo tile in the album view

**Expected**:
- Photo opens in full-screen/overlay preview
- On-screen arrow buttons navigate between photos
- Keyboard left/right arrows navigate between photos
- Swipe left/right navigates on touch devices
- Close button (X) or Escape key closes preview
- Preview does not navigate away from album page

### 6. Remove a Photo

**Action**: Inside an album, click remove/delete on a photo tile

**Expected**:
- Photo tile disappears from grid
- Remaining tiles reflow to fill gaps
- Photo count on main page updates to "2"
- If removed photo was the cover, cover updates to next available photo

### 7. Drag-and-Drop Album Reorder

**Action**: On main page, drag the third album and drop it before the first album
within the same date group

**Expected**:
- Album card follows cursor/finger during drag
- Drop zone indicator appears between album cards
- Album snaps to new position on drop (smooth animation)
- New order persists after browser refresh (Ctrl+R)
- Albums remain in their original date groups — no cross-group moves

### 8. No Nesting

**Action**: Drag an album card and attempt to drop it directly on top of another
album card

**Expected**:
- Drop target shows invalid indicator (e.g., red highlight)
- Album snaps back to original position
- No album is placed inside another
- No error in console

### 9. Rename an Album

**Action**: Click rename on an album → Enter "Summer Trip 2026" → Confirm

**Expected**:
- Album name updates on main page card
- Album name updates in album view header
- Empty name submission is rejected with validation message

### 10. Delete an Album

**Action**: Click delete on an album → Confirm deletion

**Expected**:
- Confirmation dialog appears warning about permanent deletion
- On confirm: album and all its photos are removed
- On cancel: album remains unchanged
- Main page updates immediately after deletion

### 11. Empty States

**Action**: Delete all albums → View the main page; Create an empty album → Open it

**Expected**:
- Main page: "No albums yet" empty state with "Create Album" button
- Empty album: "No photos in this album" empty state with "Add Photos" button

### 12. Broken Image Handling

**Action**: Add a photo to an album, then manually delete or move the original file
on disk → Refresh the page → Open the album

**Expected**:
- Broken image tile shows placeholder/error icon
- Other photo tiles remain unaffected
- Layout does not break (no overflow, no misalignment)
- Photo preview shows error state for broken image

### 13. No Network Activity (Local-First)

**Action**: Open browser DevTools → Network tab → Perform all actions above
(create, rename, delete albums; add/remove photos; drag-and-drop)

**Expected**:
- Zero outbound network requests (no API calls, no image uploads)
- Only initial page load fetches local Vite dev server resources
- Photos are read via File API, never POSTed anywhere

### 14. SQLite Metadata Accuracy

**Action**: After performing all actions above, inspect SQLite data via browser
console or IndexedDB/OPFS inspector

**Expected**:
- `albums` table contains correct rows with matching `photo_count`
- `photos` table contains correct rows with FK to albums
- `cover_photo_id` references a valid photo or is NULL for empty albums
- `sort_order` values are sequential within each date group after reorder
- `created_at` and `updated_at` timestamps are ISO 8601 and correct

### 15. Responsive Layout

**Action**: Resize browser window to:
- Desktop (>1024px) — multiple photo tiles per row, horizontal album cards
- Tablet (768px–1023px) — fewer tiles per row, adapted layout
- Mobile (<768px) — single-column, stacked layout, mobile menu if applicable
Also test on an actual mobile device or emulator.

**Expected**:
- No horizontal scrolling at any breakpoint
- Touch targets ≥ 44×44px on mobile
- Text remains readable without zooming
- All actions (create, rename, delete, add photos, reorder) work at every size
