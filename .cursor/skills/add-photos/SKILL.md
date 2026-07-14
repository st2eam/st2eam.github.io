---
name: add-photos
description: >-
  Add new photos to the STREAM photography site: place originals in the sibling
  discover repo, compress thumbnails, sync src/config/photos.ts, edit alt/tags,
  then verify and ship. Use when the user asks to add photos, upload images,
  sync the gallery, run npm run photos, or update the photo config / thumbnails.
---

# Add Photos

Add images to this site without putting originals in the website repo.

## What information is needed

### From the user (ask if missing)

| Field | Required? | What to collect |
|-------|-----------|-----------------|
| **Image file(s)** | **Yes** | Path(s) to originals, or confirmation they are already in `discover/photos/` |
| **`alt`** | **Yes** | Chinese caption/title for the photo (e.g. `武汉 · 江城风光`, or a short poetic line). Never ship bare `DSC#####` / `IMG_####` |
| **`tags`** | Recommended | Content categories for gallery filters, e.g. `风光` `人文` `建筑` `夜景` `花草` `动物`. Prefer existing tags when possible |
| **`location`** | Recommended | `{ country, province, city }` if EXIF/geo did not fill it (e.g. 中国 / 湖北 / 武汉) |

### Filled automatically (do not ask)

| Field | Source |
|-------|--------|
| `src` / `thumbnail` / `width` / `height` | compress + sync scripts |
| `exif` (camera, lens, exposure, date, lat/lng) | EXIF on the file |
| `id` | sync script |
| `location` (when possible) | reverse-geocode from EXIF GPS |

If the user only drops files and says “加图”, still run the pipeline, then **prompt for any missing fields below before committing**.

### Remind user when incomplete

After `npm run photos`, inspect each **new** entry in `src/config/photos.ts`. Treat as incomplete and **ask the user** (list the filename + what’s missing) when any of these hold:

1. **`alt` missing or placeholder** — empty, equals filename stem, matches `/^DSC\d+/i` or `/^IMG[_-]?\d+/i`, or is clearly auto-garbage.
2. **`tags` empty** — no content tags (location-like tags alone do not count).
3. **`location` empty** — no `country` / `province` / `city` after sync/geo.

Prompt template (adapt to Chinese):

```text
这几张图还缺信息，补一下我再提交：

- DSC01234.jpg
  - alt：（必填）中文标题/说明
  - tags：（建议）如 风光 / 人文 / 建筑…
  - location：（建议）省·市，如 湖北 · 武汉
```

Rules:

- **Do not commit/push** until required **`alt`** is filled for every new photo (unless the user explicitly says ship with placeholders).
- **`tags` / `location`**: remind once; if user says skip or “先这样”, proceed.
- Batch one reminder for all incomplete new photos — do not nag per field in separate turns unless the user only answered partially.

## Architecture (do not skip)

| Role | Location |
|------|----------|
| Originals | Sibling repo `../discover/photos/` → [st2eam/discover](https://github.com/st2eam/discover) |
| Thumbnails | This repo: `public/photos/thumbnails/` (committed) |
| Config | This repo: `src/config/photos.ts` |
| Lightbox `src` | `https://raw.githubusercontent.com/st2eam/discover/main/photos/<path>` |

Override originals path with `DISCOVER_PHOTOS_DIR` if the discover clone is not at `../discover`.

**Never** commit full-size originals into `st2eam.github.io`.

## Checklist

```
Add photos:
- [ ] 0. Collect from user (or note gaps): image files, alt (required), tags, location
- [ ] 1. Drop originals into discover/photos
- [ ] 2. Commit & push discover (so raw GitHub URLs resolve)
- [ ] 3. In website repo: npm run photos
- [ ] 4. Edit alt / tags / location in photos.ts
- [ ] 4b. If alt/tags/location still incomplete → remind user; wait for alt before ship
- [ ] 5. Re-run npm run photos if needed (manual fields preserved)
- [ ] 6. npm run build → commit website changes → push
```

## Step 1 — Place originals

1. Ensure `D:\projects\discover` (or `../discover` relative to this repo) exists and is up to date.
2. Copy new files into `discover/photos/` (subfolders OK; mirrored in thumbnails).
3. Supported: `.jpg` `.jpeg` `.png` `.webp` `.avif` (sync also accepts `.gif`).
4. Prefer stable filenames (e.g. `DSC01234.jpg`). Avoid renaming files already in `photos.ts` — rename breaks the merge key.

## Step 2 — Publish originals

In the **discover** repo:

```bash
git add photos/
git commit -m "Add photos: <short description>"
git push origin main
```

Until this push succeeds, lightbox originals 404 even if thumbnails look fine locally.

## Step 3 — Compress + sync (website repo)

```bash
npm run photos
# same as: npm run photos:compress && npm run photos:sync
```

What it does:

- **compress**: long edge → 1200px, JPEG quality 82, incremental (skips newer thumbs)
- **sync**: merges into `src/config/photos.ts`
  - **Preserves** manual `alt`, `tags`, `location`
  - **Always updates** `thumbnail`, `exif`, `width`/`height`, remote `src`
  - **Removes** entries whose files disappeared from discover
  - New entries get guessed `alt`/`tags` from path/filename + EXIF

Optional:

```bash
npm run photos:compress   # thumbs only
npm run photos:sync       # config only
node scripts/sync-photos.cjs --geo-debug   # debug reverse-geocode
```

Geo (Nominatim) may fail behind GFW; set `HTTPS_PROXY` / `NOMINATIM_BASE_URL` in `.env` if needed. Missing `location` is OK — fill manually.

## Step 4 — Edit metadata (+ remind if missing)

Open `src/config/photos.ts`. For each new photo, apply user-provided `alt` / `tags` / `location`.

If anything in **Remind user when incomplete** still fails → stop and ask using the prompt template. Do not invent poetic `alt` at shipping quality without asking, unless the user already gave wording.

Do **not** hand-edit `src`, `thumbnail`, `exif`, `width`, `height`, or `id` unless fixing a sync bug — the next `npm run photos` will overwrite machine fields.

After edits, running `npm run photos` again is safe: manual `alt` / `tags` / `location` stay.

## Step 5 — Verify & ship

1. Spot-check: new thumbnails under `public/photos/thumbnails/`, new rows in `photos.ts`, remote `src` URLs open in browser.
2. `npm run build` (or `npm run dev` for visual check).
3. Commit **website** changes (thumbs + `photos.ts`). Follow repo verify-then-push rules unless the user said not to push.

Typical commit message:

```text
Add gallery photos: <place or shoot date>.
```

## Delete or replace a photo

| Goal | Action |
|------|--------|
| Remove from site | Delete file in discover → push discover → `npm run photos` (sync drops the entry) → commit website |
| Replace image, same name | Overwrite in discover → push → `npm run photos` (thumb regenerates if mtime newer) |
| Rename file | Treat as delete + add; update any hardcoded references (there should be none outside `photos.ts`) |

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `PHOTOS_DIR` missing / 0 files | Clone/sync discover; or set `DISCOVER_PHOTOS_DIR` |
| Thumb OK, lightbox broken | Push discover; confirm `raw.githubusercontent.com/.../photos/...` |
| Manual alt wiped | Only happens if entry key changed (path/filename). Restore from git |
| Compress skipped unexpectedly | Touch/replace original so mtime is newer than thumb, or delete that thumb |
| Geo 0/N | Proxy / Nominatim env; or set `location` by hand |

## Related

Broader site scaffolding and design system: [photography-portfolio-toolkit](../photography-portfolio-toolkit/SKILL.md).
