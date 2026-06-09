# Research: Photo Album Organizer

## Decision 1: SQLite in the Browser

**Decision**: Use sql.js (SQLite compiled to WebAssembly) with Origin Private File
System (OPFS) for persistence.

**Rationale**: sql.js provides a full SQLite engine running entirely in the browser
via WebAssembly. Combined with OPFS (available in Chrome 102+, Firefox 111+, Safari
15.2+), it enables persistent local storage of structured data without any server.
This satisfies the requirement for SQLite metadata storage with zero backend
complexity.

**Alternatives considered**:
- **Web SQL**: Deprecated and removed from modern browsers. Rejected.
- **IndexedDB with a shim**: Adds complexity and doesn't provide real SQL. Rejected.
- **Node.js backend with better-sqlite3**: Requires a server process, violating the
  "no unnecessary backend" constraint. Rejected.
- **SQLite WASM (official)**: Similar to sql.js but newer. sql.js has more community
  examples and OPFS integration patterns. sql.js chosen for maturity.

## Decision 2: OPFS Sync Strategy

**Decision**: Load the entire SQLite database into memory on app start, write
changes to OPFS on every mutation (synchronous persistence), and reload from OPFS on
page refresh.

**Rationale**: For a single-user local app with modest data volume (100 albums × 500
photos = 50K rows max), an in-memory-first approach with write-through persistence
keeps reads instant. sql.js loads the full WASM binary once (~600KB), then SQL
operations are sub-millisecond.

**Alternatives considered**:
- **Lazy-load / paginated queries**: Overkill for local SQLite at this scale.
  Adds complexity without measurable benefit.
- **Manual save button**: Poor UX — users expect data to persist automatically.

## Decision 3: Image File Handling

**Decision**: Use the File System Access API (`showOpenFilePicker`) for photo
selection on supported browsers, with a fallback to `<input type="file">` for
broader compatibility. Images are read as `File` objects, thumbnails are generated
via Canvas, and `Object URL`s (`URL.createObjectURL`) are used for display. File
references (name + lastModified timestamp as a stability key) are stored in SQLite.

**Rationale**: This keeps images entirely local. The File System Access API provides
a native file picker experience. The `<input>` fallback ensures compatibility with
all target browsers. Object URLs avoid copying file data and are revoked when no
longer needed.

**Alternatives considered**:
- **Base64 encoding in SQLite**: Would bloat the database and degrade performance
  with large photos. Rejected.
- **IndexedDB for binary blobs**: Adds a second storage mechanism. Storing references
  only is simpler and faster. Rejected.
- **Canvas-only thumbnails**: Requires reading full images anyway. Object URLs for
  preview + Canvas for thumbnails gives best UX. Accepted.

## Decision 4: Drag-and-Drop Implementation

**Decision**: Implement custom drag-and-drop using the HTML5 Drag and Drop API with
touch event polyfill for mobile. No external library required.

**Rationale**: The HTML5 DnD API covers desktop browsers. Touch support requires a
small polyfill (~2KB) that translates touch events to drag events. The
implementation is straightforward for a flat list reorder (no nesting, no cross-list
drops). Avoiding a library keeps the bundle small.

**Alternatives considered**:
- **SortableJS**: Popular but adds ~25KB. The use case is simple enough that custom
  implementation is justified. Rejected.
- **Interact.js**: Larger (~40KB), more features than needed. Rejected.

## Decision 5: Testing Framework

**Decision**: Use Vitest for unit and integration tests.

**Rationale**: Vitest shares Vite's config and transform pipeline, providing native
ESM support, fast HMR in test mode, and zero additional configuration. It runs in
Node.js with jsdom for DOM testing. For sql.js tests, the WASM binary can be loaded
in the test environment.

**Alternatives considered**:
- **Jest**: Requires additional config for ESM and Vite integration. Vitest is
  simpler. Rejected.
- **Playwright/Cypress**: Full E2E tools, overkill for a client-only app at this
  stage. Can be added later. Rejected for now.

## Decision 6: CSS Approach

**Decision**: Use vanilla CSS with CSS custom properties (variables) for theming,
organized into 4 files: base, layout, components, states. No preprocessor or
framework.

**Rationale**: Vite supports CSS imports natively. CSS custom properties provide
design tokens (colors, spacing, typography) without a preprocessor. Four focused
files keep styles organized. No PostCSS, Sass, or Tailwind needed — reducing
dependencies.

**Alternatives considered**:
- **Tailwind CSS**: Adds build step and utility-class learning curve. Overkill for a
  single-app project. Rejected.
- **Sass/SCSS**: Requires a preprocessor dependency. CSS custom properties cover the
  same needs. Rejected.

## Decision 7: Module Pattern

**Decision**: Use ES modules with explicit imports/exports. Each file exports a
single responsibility object or function set. No classes unless state encapsulation
is needed.

**Rationale**: ES modules are natively supported by Vite and modern browsers. A
functional/procedural style with module-scoped state keeps the code simple and
testable. Classes add boilerplate without benefit for this app's complexity level.

**Alternatives considered**:
- **Class-based architecture**: Adds `this` binding complexity and ceremony. Not
  needed for modules that are essentially function collections. Rejected.
- **Global namespace**: Brittle and hard to test. Rejected.
