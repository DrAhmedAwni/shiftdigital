# Data Model: Photo Album Organizer

## Entity: Album

Stored in `albums` table in SQLite.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | TEXT | PRIMARY KEY | UUID v4 |
| `name` | TEXT | NOT NULL, length 1–100 | Album display name |
| `cover_photo_id` | TEXT | NULLABLE, FK → photos.id | ID of cover photo, NULL if no photos |
| `sort_order` | INTEGER | NOT NULL, DEFAULT 0 | Manual position within date group |
| `photo_count` | INTEGER | NOT NULL, DEFAULT 0 | Denormalized count for fast display |
| `created_at` | TEXT | NOT NULL, ISO 8601 | Album creation timestamp |
| `updated_at` | TEXT | NOT NULL, ISO 8601 | Last modification timestamp |

### Derived: Date Group

Not stored — computed from `created_at` at query time:

| Group | Rule |
|-------|------|
| Today | `created_at` is on the current calendar date |
| Yesterday | `created_at` is on the previous calendar date |
| This Week | `created_at` is within the last 7 days (excluding Today/Yesterday) |
| This Month | `created_at` is within the last 30 days (excluding above) |
| Older | All other albums |

### Validation Rules

- `name`: Required, trimmed, 1–100 characters, no leading/trailing whitespace stored
- `sort_order`: Non-negative integer, unique per date group
- `cover_photo_id`: Must reference an existing photo in `photos` table, or be NULL
- `photo_count`: Must equal `SELECT COUNT(*) FROM photos WHERE album_id = albums.id`

### State Transitions

```
[Created] ──rename──> [Renamed] ──rename──> [Renamed again]
    │                     │
    └──delete──> [Deleted: row removed, all child photos cascade-deleted]
```

## Entity: Photo

Stored in `photos` table in SQLite.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | TEXT | PRIMARY KEY | UUID v4 |
| `album_id` | TEXT | NOT NULL, FK → albums.id ON DELETE CASCADE | Parent album |
| `name` | TEXT | NOT NULL | Original file name |
| `local_path` | TEXT | NOT NULL | File reference (name + lastModified for stability) |
| `file_type` | TEXT | NOT NULL | MIME type (image/jpeg, image/png, image/webp, image/gif) |
| `file_size` | INTEGER | NOT NULL, > 0 | File size in bytes |
| `sort_order` | INTEGER | NOT NULL | Derived: insertion order (newest first by `created_at`) |
| `created_at` | TEXT | NOT NULL, ISO 8601 | Photo added timestamp |
| `updated_at` | TEXT | NOT NULL, ISO 8601 | Last modification timestamp |

### Uniqueness Constraint

- `UNIQUE(album_id, local_path)` — prevents duplicate photos in the same album

### Validation Rules

- `name`: Required, non-empty
- `file_type`: Must be one of `image/jpeg`, `image/png`, `image/webp`, `image/gif`
- `file_size`: Must be > 0
- `album_id`: Must reference an existing album

### State Transitions

```
[Added] ──remove──> [Removed: row deleted]
   │
   └──(album deleted)──> [Cascade deleted]
```

### Sort Order

Photos are sorted by `created_at` DESC (newest first). The `sort_order` column is
computed at query time via `ROW_NUMBER() OVER (ORDER BY created_at DESC)` and stored
for display consistency. When multiple photos share the same `created_at` (batch
upload), tie-breaking uses insertion order.

## SQLite Schema (DDL)

```sql
CREATE TABLE IF NOT EXISTS albums (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    cover_photo_id TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    photo_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (cover_photo_id) REFERENCES photos(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS photos (
    id TEXT PRIMARY KEY,
    album_id TEXT NOT NULL,
    name TEXT NOT NULL,
    local_path TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE,
    UNIQUE(album_id, local_path)
);

CREATE INDEX IF NOT EXISTS idx_photos_album_id ON photos(album_id);
CREATE INDEX IF NOT EXISTS idx_albums_created_at ON albums(created_at);
```
