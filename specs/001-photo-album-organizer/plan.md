# Implementation Plan: Photo Album Organizer

**Branch**: `master` | **Date**: 2026-06-09 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-photo-album-organizer/spec.md`

**Note**: This plan covers a standalone client-side application using Vite + vanilla JS + SQLite (sql.js) with zero server dependencies.

## Summary

Build a local-first photo album organizer as a single-page web application using Vite
for build tooling, vanilla HTML/CSS/JavaScript for the UI layer, and sql.js (SQLite
compiled to WebAssembly) for client-side metadata storage. Photos remain on the
user's device — only file references and metadata are stored in SQLite. The app
supports album CRUD with date-grouped display, drag-and-drop reordering, photo tile
previews, and full empty/error/loading state coverage. All data persists locally via
Origin Private File System (OPFS).

## Technical Context

**Language/Version**: JavaScript ES2022+ (vanilla, no framework) / HTML5 / CSS3

**Primary Dependencies**:
- Vite 6.x (dev server, bundler, HMR)
- sql.js (SQLite compiled to WebAssembly — client-side DB)
- No CSS framework, no JS framework, no state library

**Storage**: SQLite via sql.js with OPFS persistence (albums + photos metadata only).
Photo files referenced by local file path/URL, never uploaded.

**Testing**: Vitest (native Vite integration, minimal config) for unit/integration
tests; manual verification for browser-specific behaviors (drag-and-drop, touch).

**Target Platform**: Modern browsers — Chrome 100+, Firefox 100+, Safari 15+,
Edge 100+. Desktop, tablet, and mobile.

**Project Type**: Single-page web application (client-side only, no backend server).

**Performance Goals**:
- Initial load under 1s on broadband (Vite dev mode)
- UI interactions under 50ms perceived latency
- Tile grid renders 50 photos without jank
- Bundle size under 200KB gzipped (excluding sql.js WASM ~600KB)

**Constraints**:
- Zero server dependencies — fully client-side
- No cloud uploads, no telemetry, no analytics
- All image processing must be client-side only
- Must work offline after initial page load
- sql.js WASM binary (~600KB) is the only significant payload

**Scale/Scope**: Single user, single device. Up to 100 albums, up to 500 photos per
album. ~6 main views/states.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

All gates evaluated against the Shift Digital Website Platform Constitution (v1.0.0).
Where a principle is specific to the marketing website, applicability to this
standalone app is noted.

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Code Quality & Maintainability | ✅ PASS | Modular vanilla JS with clear separation of concerns (UI / data / db layers). No frameworks needed. |
| II. Mobile-First Responsive Design | ✅ PASS | CSS breakpoints planned for desktop/tablet/mobile. Tile grid responsive by design. |
| III. Performance & Optimization | ✅ PASS | Vite tree-shakes, sql.js lazy-loaded, images displayed via Object URLs (zero network). |
| IV. Testing & Quality Assurance | ✅ PASS | Vitest for unit/integration. All core flows from spec covered by test plan. |
| V. Security & Data Protection | ✅ PASS | No network calls, no secrets, data stays on device. sql.js runs in-memory with OPFS persistence. |
| Design & UX Standards (subset) | ✅ PASS | Consistent class-based CSS, empty/loading/error states spec'd for every action. |
| Scope & Constraints | ✅ PASS | v1 scope matches exactly — no auth, no sync, no sharing, no AI, no nesting. |

**Gate result**: All pass. No violations to justify.

## Project Structure

### Documentation (this feature)

```text
specs/001-photo-album-organizer/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output (internal module contracts)
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

### Source Code (repository root)

```text
src/
├── db/
│   ├── connection.js      # sql.js initialization, OPFS persistence
│   ├── schema.js          # CREATE TABLE statements, migrations
│   ├── albums.js          # Album CRUD operations
│   └── photos.js          # Photo CRUD operations
├── ui/
│   ├── main-page.js       # Album list, date groups, drag-drop
│   ├── album-view.js      # Photo tile grid, add/remove
│   ├── photo-preview.js   # Overlay preview with nav
│   ├── album-form.js      # Create/rename album dialogs
│   ├── empty-states.js    # Empty state rendering
│   └── feedback.js        # Loading, success, error toasts
├── utils/
│   ├── image.js           # Local file reading, thumbnail gen, Object URLs
│   ├── drag-drop.js       # Reusable drag-and-drop logic
│   └── date-groups.js     # Date grouping helpers (Today, Yesterday, etc.)
├── css/
│   ├── base.css           # Reset, variables, typography, spacing scale
│   ├── layout.css         # Grid, flex, responsive breakpoints
│   ├── components.css     # Cards, buttons, forms, tiles, dialogs
│   └── states.css         # Empty, loading, error states
└── app.js                 # Entry point: init DB, mount UI, router
index.html                 # Vite entry HTML (project root, per Vite convention)
public/
└── (static assets if any)
tests/
├── unit/
│   ├── db-albums.test.js
│   ├── db-photos.test.js
│   ├── date-groups.test.js
│   └── image-utils.test.js
└── integration/
    ├── album-flow.test.js
    ├── photo-flow.test.js
    └── drag-drop.test.js
```

**Structure Decision**: Single project with no backend. Layers are: `db/` (data
access), `ui/` (rendering), `utils/` (shared logic), `css/` (styles). Tests mirror
the source structure. Vanilla JS ES modules used throughout — Vite handles bundling.

## Complexity Tracking

No constitution violations. No complexity to justify.
