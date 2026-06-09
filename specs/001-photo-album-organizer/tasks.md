# Tasks: Photo Album Organizer

**Input**: Design documents from `specs/001-photo-album-organizer/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/

**Tests**: Included — testing requirements were specified in the implementation plan. All test tasks use Vitest.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Source**: `src/` at repository root (single project, client-side only)
- **Tests**: `tests/unit/` and `tests/integration/` at repository root
- All paths shown below assume Vite single-project structure from plan.md



## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and build tooling configuration

- [ ] T001 Create project structure per plan.md: `src/`, `src/db/`, `src/ui/`, `src/utils/`, `src/css/`, `tests/unit/`, `tests/integration/`, `public/`
- [ ] T002 Initialize npm project with Vite in `package.json` and create `vite.config.js` with vanilla JS config
- [ ] T003 [P] Install dependencies: `sql.js` (SQLite WASM), `vitest` (testing), `jsdom` (DOM test environment), and configure `vitest.config.js`
- [ ] T004 [P] Create `index.html` in project root with Vite entry point reference to `src/app.js`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T005 Implement `src/db/connection.js` — sql.js initialization, OPFS load/save (`initDatabase`, `saveDatabase`, `generateId`)
- [ ] T006 Implement `src/db/schema.js` — `initializeSchema` with CREATE TABLE for albums and photos per data-model.md DDL
- [ ] T007 [P] Create `src/css/base.css` — CSS reset, custom properties (colors, spacing, typography, shadows, border-radius)
- [ ] T008 [P] Create `src/css/layout.css` — responsive grid system, flex utilities, max-width container, breakpoint classes (desktop ≥1024px, tablet 768–1023px, mobile <768px)
- [ ] T009 [P] Implement `src/ui/feedback.js` — `showLoading`, `hideLoading`, `showSuccess`, `showError`, `showConfirm` using toasts and modal dialogs
- [ ] T010 Create `src/app.js` — entry point: call initDatabase, initializeSchema, mount main page render, basic hash-based router for main/album views

**Checkpoint**: Foundation ready — database initialized, CSS design tokens available, feedback system working, app entry point wired. User story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Create and Browse Albums (Priority: P1) 🎯 MVP

**Goal**: Users can create albums and browse them grouped by date on the main page. Each album card shows name, cover preview, and photo count.

**Independent Test**: Create 3 albums with different names, verify they appear grouped by date under correct headers (Today, Yesterday, This Week, This Month, Older), and confirm each card shows name, cover placeholder, and photo count of 0.

### Tests for User Story 1

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] [US1] Unit test for date group computation in `tests/unit/date-groups.test.js` — test all 5 group labels with various dates
- [ ] T012 [P] [US1] Unit test for album CRUD operations in `tests/unit/db-albums.test.js` — test create, getAll, getById, empty result
- [ ] T013 [US1] Integration test for album creation flow in `tests/integration/album-flow.test.js` — create album, verify it appears on main page

### Implementation for User Story 1

- [ ] T014 [P] [US1] Implement `src/utils/date-groups.js` — `groupAlbumsByDate(albums)` and `getDateGroup(createdAt)` per contracts/modules.md
- [ ] T015 [P] [US1] Implement `src/db/albums.js` — `createAlbum(db, { name })` with UUID generation and validation (name 1–100 chars)
- [ ] T016 [US1] Implement `src/db/albums.js` — `getAllAlbums(db)` returning albums ordered by sort_order within date groups
- [ ] T017 [US1] Create `src/css/components.css` — album card styles (name, cover preview placeholder, photo count badge, hover state, click cursor)
- [ ] T018 [P] [US1] Implement `src/ui/album-form.js` — `showCreateAlbumDialog(db)` with inline name validation, cancel, and loading state
- [ ] T019 [US1] Implement `src/ui/main-page.js` — `renderMainPage(db, container)` rendering date-group headers and album cards, calling `refreshMainPage` after create
- [ ] T020 [US1] Implement `src/ui/main-page.js` — `refreshMainPage(db, container)` to re-render after mutations

**Checkpoint**: User Story 1 complete — albums can be created and displayed grouped by date with cover previews and photo counts. Independently testable and deployable as MVP.

---

## Phase 4: User Story 2 - Manage Photos Inside an Album (Priority: P1)

**Goal**: Users can open an album, add photos from their device, see them in a tile grid (newest first), preview photos in an overlay, and remove photos.

**Independent Test**: Open an album, add 3 photos, verify tiles appear with correct sort order (newest first), click a tile to preview with navigation (arrows/keyboard/swipe), remove one photo, and confirm tile disappears with count updating to 2.

### Tests for User Story 2

- [ ] T021 [P] [US2] Unit test for photo DB operations in `tests/unit/db-photos.test.js` — test addPhoto (success, duplicate rejection), removePhoto, getPhotosByAlbum (sort order), getPhotoCount
- [ ] T022 [P] [US2] Unit test for image utilities in `tests/unit/image-utils.test.js` — test `isSupportedImageType` (valid/invalid formats), `fileReference` stability
- [ ] T023 [US2] Integration test for photo management flow in `tests/integration/photo-flow.test.js` — add photos, verify tile display, preview a photo, remove a photo, verify count and cover update

### Implementation for User Story 2

- [ ] T024 [P] [US2] Implement `src/db/photos.js` — `addPhoto(db, { album_id, name, local_path, file_type, file_size })` with unique constraint and FK validation, auto-updates album photo_count and cover_photo_id
- [ ] T025 [P] [US2] Implement `src/db/photos.js` — `removePhoto(db, id)` with cascade album metadata update (cover_photo_id, photo_count)
- [ ] T026 [P] [US2] Implement `src/db/photos.js` — `getPhotosByAlbum(db, album_id)` sorted by created_at DESC (newest first per clarification)
- [ ] T027 [P] [US2] Implement `src/utils/image.js` — `selectImageFiles()` with File System Access API + `<input type="file">` fallback, `isSupportedImageType(file)`, `fileReference(file)`, `createThumbnail(file)`, `revokeImageUrl(url)`
- [ ] T028 [US2] Create photo tile grid styles in `src/css/components.css` — tile sizing, aspect ratio, hover overlay, remove button, add-photo button styling
- [ ] T029 [US2] Implement `src/ui/album-view.js` — `renderAlbumView(db, album_id, container)` with tile grid, add-photo button (calls selectImageFiles), remove button per tile, photo count header
- [ ] T030 [US2] Implement `src/ui/album-view.js` — `refreshAlbumView(db, album_id, container)` to re-render after add/remove
- [ ] T031 [US2] Implement `src/ui/photo-preview.js` — `openPreview(photos, startIndex)` with full-size overlay, arrow buttons, keyboard left/right navigation, swipe support, Escape/close button
- [ ] T032 [US2] Implement `src/ui/photo-preview.js` — `closePreview()` with Object URL cleanup
- [ ] T033 [US2] Add album view route to `src/app.js` — hash-based routing for `#/album/:id` → `renderAlbumView`

**Checkpoint**: User Stories 1 AND 2 complete — full photo management within albums, tile preview grid, photo preview overlay with navigation, photo count and cover auto-update.

---

## Phase 5: User Story 3 - Reorganize Albums with Drag and Drop (Priority: P2)

**Goal**: Users can drag and drop album cards on the main page to reorder them. Order persists in SQLite. No nesting allowed — dropping on another album snaps back.

**Independent Test**: Create 3 albums, drag third to first position, verify order changes with smooth animation, refresh page and confirm order persists, attempt to drop an album onto another and confirm it snaps back.

### Tests for User Story 3

- [ ] T034 [P] [US3] Unit test for `updateAlbumOrder` in `tests/unit/db-albums.test.js` — batch update sort_order values, verify ordering after update, verify albums remain within their date group (cross-group reorder prevented)
- [ ] T035 [US3] Integration test for drag-and-drop in `tests/integration/drag-drop.test.js` — verify reorder persists after refresh, verify nesting prevention

### Implementation for User Story 3

- [ ] T036 [P] [US3] Implement `src/db/albums.js` — `updateAlbumOrder(db, orders)` accepting array of `{ id, sort_order }` for batch reorder
- [ ] T037 [P] [US3] Implement `src/utils/drag-drop.js` — `initDragDrop(container, { onReorder })` using HTML5 Drag and Drop API, with visual drag feedback and drop zone indicators
- [ ] T038 [US3] Implement `src/utils/drag-drop.js` — `initTouchSupport(container)` polyfill for mobile touch drag-and-drop
- [ ] T039 [US3] Implement nesting prevention in `src/utils/drag-drop.js` — detect drop-on-album vs drop-between-albums, show invalid indicator, snap back on invalid drop
- [ ] T040 [US3] Integrate drag-and-drop into `src/ui/main-page.js` — call `initDragDrop` and `initTouchSupport` after render, wire `onReorder` to `updateAlbumOrder` and refresh

**Checkpoint**: User Stories 1, 2, AND 3 complete — albums are reorderable via drag-and-drop on desktop and touch, order persists, no nesting.

---

## Phase 6: User Story 4 - Rename and Delete Albums (Priority: P2)

**Goal**: Users can rename albums inline and delete albums (with confirmation). Deleted albums cascade-remove all their photos.

**Independent Test**: Create an album, rename it, verify new name appears on main page and album view. Delete the album, confirm deletion, and verify it disappears from main page along with all its photos.

### Tests for User Story 4

- [ ] T041 [US4] Unit test for rename and delete in `tests/unit/db-albums.test.js` — test renameAlbum validation, deleteAlbum cascade (verify photos are removed)

### Implementation for User Story 4

- [ ] T042 [P] [US4] Implement `src/db/albums.js` — `renameAlbum(db, id, name)` with same validation as create (1–100 chars, non-empty)
- [ ] T043 [P] [US4] Implement `src/db/albums.js` — `deleteAlbum(db, id)` with ON DELETE CASCADE for child photos, also revoke any cached Object URLs
- [ ] T044 [US4] Implement `src/ui/album-form.js` — `showRenameAlbumDialog(db, album)` with current name pre-filled, inline validation
- [ ] T045 [US4] Add rename and delete action buttons to album cards in `src/ui/main-page.js` — inline rename trigger, delete with confirmation via `showConfirm`
- [ ] T046 [US4] Add album name in header to `src/ui/album-view.js` — display album name, add rename trigger

**Checkpoint**: User Stories 1–4 complete — full album lifecycle management (create, browse, reorder, rename, delete).

---

## Phase 7: User Story 5 - Empty States and Action Feedback (Priority: P3)

**Goal**: All empty states and action feedback are polished. No albums state, empty album state, broken image placeholders, loading/success/error states for every action.

**Independent Test**: Delete all albums and verify "No albums yet" empty state. Open empty album and verify "No photos" state. Corrupt an image reference and verify placeholder tile. Trigger a failure and verify error message.

### Implementation for User Story 5

- [ ] T047 [P] [US5] Create `src/css/states.css` — empty state styles (centered layout, icon, message, CTA button), loading skeleton styles, error toast styles
- [ ] T048 [P] [US5] Implement `src/ui/empty-states.js` — `renderNoAlbumsState(container)` with illustration placeholder and "Create Album" CTA
- [ ] T049 [P] [US5] Implement `src/ui/empty-states.js` — `renderEmptyAlbumState(container)` with "Add Photos" CTA
- [ ] T050 [US5] Implement `src/ui/empty-states.js` — `renderBrokenImageTile(container)` with error icon placeholder that preserves grid layout
- [ ] T051 [US5] Integrate empty states into `src/ui/main-page.js` — show `renderNoAlbumsState` when `getAllAlbums` returns empty array
- [ ] T052 [US5] Integrate empty states into `src/ui/album-view.js` — show `renderEmptyAlbumState` when `getPhotosByAlbum` returns empty array, use `renderBrokenImageTile` for failed image loads
- [ ] T053 [US5] Wire up `showLoading`/`hideLoading` in `src/ui/album-form.js` for create and rename submit buttons
- [ ] T054 [US5] Wire up `showLoading`/`hideLoading` in `src/ui/album-view.js` for add/remove photo operations
- [ ] T055 [US5] Wire up `showSuccess`/`showError` feedback across all UI modules — create, rename, delete, add photos, remove photos, reorder

**Checkpoint**: All user stories complete with polished empty states, loading indicators, success toasts, and error messages.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and production readiness

- [ ] T056 [P] Responsive design audit — test and fix layout on desktop (≥1024px), tablet (768–1023px), mobile (<768px) per quickstart.md scenario 15
- [ ] T057 [P] Test broken image handling — manually remove image file, refresh, verify placeholder renders, verify preview shows error state
- [ ] T058 [P] Test that no network requests occur — verify zero outbound calls in DevTools Network tab during all operations
- [ ] T059 [P] Test SQLite metadata accuracy — verify album photo_count matches actual photo rows, cover_photo_id validity, sort_order consistency after all operations
- [ ] T060 Performance check — verify album with 50 photos renders without jank, drag-and-drop responds under 100ms, initial load under 1s
- [ ] T061 Bundle analysis — run `npm run build`, verify bundle size under 200KB gzipped (excluding sql.js WASM)
- [ ] T062 Run all quickstart.md validation scenarios end-to-end and confirm all 15 pass
- [ ] T063 [P] Final CSS polish — consistent spacing, typography, hover/focus states, mobile touch targets ≥44px
- [ ] T064 Code cleanup — remove console.logs, ensure consistent naming, verify no dead code

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational — No dependencies on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational — May use US1 album data for testing but independently testable
- **User Story 3 (Phase 5)**: Depends on Foundational + US1 (main page must exist) — Tests independently with any albums
- **User Story 4 (Phase 6)**: Depends on Foundational + US1 (albums must exist) — May use US2 photo data for cascade testing
- **User Story 5 (Phase 7)**: Depends on US1 + US2 (empty states for both main page and album view)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) — No dependencies on other stories. Standalone album CRUD + date grouping.
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) — Depends on US1 for album navigation entry point but photo operations are independently testable within a test album.
- **User Story 3 (P2)**: Can start after Foundational + US1 (main page rendered) — Drag-drop modifies album sort order, independent of photo management.
- **User Story 4 (P2)**: Can start after Foundational + US1 — Rename/delete operate on albums. Delete cascade uses US2 photo data model for FK.
- **User Story 5 (P3)**: Can start after US1 + US2 — Integrates empty states into both main page and album view.

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- DB operations before UI components
- Utilities before UI modules
- UI rendering before integration refinements
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T003, T004)
- All Foundational tasks marked [P] can run in parallel (T007, T008, T009)
- US1: T011, T012, T014, T015, T018 can all run in parallel (different files)
- US2: T021, T022, T024, T025, T026, T027 can all run in parallel
- US3: T034, T036, T037 can run in parallel
- US4: T042, T043 can run in parallel
- US5: T047, T048, T049 can run in parallel
- Polish: T056, T057, T058, T059, T063 can run in parallel
- Different user stories can be worked on in parallel by different team members after Foundational phase

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for date group computation in tests/unit/date-groups.test.js"
Task: "Unit test for album CRUD operations in tests/unit/db-albums.test.js"

# Launch all parallel implementation tasks together:
Task: "Implement src/utils/date-groups.js"
Task: "Implement src/db/albums.js — createAlbum"
Task: "Implement src/ui/album-form.js — showCreateAlbumDialog"

# Then sequential:
Task: "Implement src/db/albums.js — getAllAlbums"
Task: "Implement src/ui/main-page.js — renderMainPage"
Task: "Implement src/ui/main-page.js — refreshMainPage"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Verify album creation and date-grouped display
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Albums with date groups → Deploy/Demo (MVP!)
3. Add User Story 2 → Photo management + preview → Deploy/Demo
4. Add User Story 3 → Drag-and-drop reorder → Deploy/Demo
5. Add User Story 4 → Rename/delete albums → Deploy/Demo
6. Add User Story 5 → Polished states + feedback → Deploy/Demo
7. Phase 8 Polish → Production-ready

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (album creation, main page, date groups)
   - Developer B: User Story 2 (photo management, preview — can test in a hardcoded album until US1 done)
3. After US1 + US2:
   - Developer A: User Story 3 (drag-drop)
   - Developer B: User Story 4 (rename/delete)
4. After US3 + US4:
   - Developer A: User Story 5 (empty states, feedback)
   - Developer B: Phase 8 (responsive, performance, bundle)

---

## Notes

- [P] tasks = different files, no dependencies on incomplete tasks in same phase
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
