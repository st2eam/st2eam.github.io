---
name: photography-portfolio-toolkit
description: >-
  Build and manage photography portfolio websites: project scaffolding with
  React + TypeScript + MUI + CRACO + Less, Dribbble-tier design system
  (glassmorphism, warm neutrals, scroll animations), image compression with
  sharp, EXIF metadata extraction, auto-sync photo config, gallery UIs
  (masonry, timeline), and GitHub Pages deployment. Use when building
  photography websites, portfolio sites, image galleries, or managing photo
  asset pipelines.
---

# Photography Portfolio Toolkit

Build a complete Dribbble-tier photography portfolio site from scratch, or maintain an existing one.

## Project Scaffolding

### Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript (strict) |
| UI Library | Material UI v5 |
| Styling | Less + CSS Modules |
| Routing | React Router v6 |
| Gallery | react-masonry-css |
| Image Processing | sharp (compression) + exifr (EXIF) |
| Build | Create React App + CRACO |
| Deploy | GitHub Pages (output to `docs/`) |

### CRACO Configuration

```javascript
// craco.config.js — key settings
module.exports = {
  plugins: [{ plugin: CracoLessPlugin }],
  webpack: {
    alias: { '@': path.resolve(__dirname, 'src') },
    configure: config => {
      config.output.path = path.resolve(__dirname, 'docs');
      return config;
    },
  },
};
```

- `@/` alias maps to `src/` for clean imports
- Build output goes to `docs/` for GitHub Pages
- Less enabled with `javascriptEnabled: true`

### TypeScript Paths

```json
{
  "baseUrl": "src",
  "paths": { "@/*": ["*"] }
}
```

Both `craco.config.js` and `tsconfig.json` must define the same aliases.

## Design System

### Color Palette — Warm Neutrals + Muted Gold

```less
@bg:              #f8f6f2;       // Page background
@surface:         rgba(255,255,255,0.55); // Glass surface
@text:            #1a1a1a;       // Primary text
@text-secondary:  #6e6e73;       // Secondary text
@text-muted:      #a1a1a6;       // Muted text
@accent:          #b09472;       // Muted gold accent
@accent-light:    #c8ae8e;
@accent-dark:     #8a7458;
```

### Typography

| Role | Font | Usage |
|------|------|-------|
| Display | Playfair Display | Headings, hero titles |
| Body | DM Sans | UI text, navigation |
| Mono | Space Mono | EXIF data, labels, metadata |

Load via Google Fonts in `public/index.html`.

### Glassmorphism Mixins

```less
.glass() {
  background: rgba(255,255,255,0.55);
  backdrop-filter: blur(20px) saturate(1.4);
  border: 1px solid rgba(255,255,255,0.35);
}

.glass-strong() {
  background: rgba(255,255,255,0.72);
  backdrop-filter: blur(32px) saturate(1.6);
  border: 1px solid rgba(255,255,255,0.45);
}
```

### Design Tokens

```less
@radius:      20px;
@radius-sm:   12px;
@radius-full: 9999px;
@shadow-xs:   0 1px 2px rgba(0,0,0,0.04);
@shadow-lg:   0 16px 48px rgba(0,0,0,0.08);
@ease-out-expo:  cubic-bezier(0.16, 1, 0.3, 1);
@ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
```

### Responsive Breakpoints

```less
@mobile:  ~'(max-width: 768px)';
@tablet:  ~'(max-width: 1024px)';
@desktop: ~'(min-width: 1025px)';
```

## Component Architecture

```
src/components/
├── Navbar/           # Fixed, transparent → glass on scroll
├── Footer/           # Minimal brand + links
├── MasonryGallery/   # Masonry grid with AutoImage
├── TimelineGallery/  # Date-grouped horizontal scroll
├── PhotoLightbox/    # Shared lightbox + EXIF bar
└── ScrollReveal/     # IntersectionObserver fade-in wrapper
```

### Navbar
- Initially transparent, applies `glass-strong()` on scroll via `useState` + scroll listener
- Must override MUI AppBar default: `sx={{ backgroundColor: 'transparent', backgroundImage: 'none' }}`
- Font weight 700 for logo, 600 for nav links, with opacity-based active states

### ScrollReveal
- Wraps children with `IntersectionObserver`
- Props: `delay`, `direction` (up/down/left/right), `distance`, `duration`
- Triggers once, then unobserves

### MasonryGallery
- `react-masonry-css` breakpoints: 4 → 3 → 2 → 1 columns
- `AutoImage`: detects aspect ratio via `new Image().naturalWidth/naturalHeight`
- Uses `thumbnail` for preview, `src` for lightbox
- Skeleton loading with opacity transition

### TimelineGallery
- Groups by `exif.date`, sorted newest-first
- Left timeline line with gold dot markers
- Horizontal scroll row per date group with `scroll-snap-type: x mandatory`

### PhotoLightbox (shared by both galleries)
- `max-height: 85vh` + `object-fit: contain` for portrait image support
- "查看原图" link opens original in new tab
- ExifBar with icons: CameraAlt, Camera, ShutterSpeed, Iso, CalendarToday

## Photo Config

```typescript
export interface ExifData {
  make?: string; model?: string; lens?: string;
  focalLength?: string; aperture?: string;
  shutterSpeed?: string; iso?: number; date?: string;
}

export interface PhotoConfig {
  id: string; src: string; alt: string;
  tags?: string[]; thumbnail?: string;
  exif?: ExifData; width?: number; height?: number;
}
```

Categories dynamically derived: `['全部', ...unique tags from photos]`

## Scripts

### Compress (`scripts/compress-photos.js`)

- **sharp**: long edge → 1200px, JPEG quality 82 (mozjpeg), incremental
- Output mirrors source structure in `public/photos/thumbnails/`
- Skips files where thumbnail is newer than source

### Sync (`scripts/sync-photos.js`)

- **Incremental merge**: preserves manual `alt`/`tags`, auto-updates `thumbnail`/`exif`
- Reads EXIF via `exifr` (Make, Model, LensModel, FocalLength, FNumber, ExposureTime, ISO, DateTimeOriginal)
- Auto-guesses tags from subdirectory names and filename keywords
- Shutter speed < 1s formatted as fraction (e.g. `1/30`)

### Commands

```bash
npm run photos           # compress + sync (one command)
npm run photos:compress  # only compress
npm run photos:sync      # only sync config
```

## Workflow

1. Drop photos into `public/photos/`
2. Run `npm run photos`
3. Edit `src/config/photos.ts` — customize `alt` and `tags`
4. Run `npm run photos` again — manual edits preserved

## Build & Deploy

```bash
npm install          # install dependencies
npm start            # dev server at localhost:3000
npm run build:docs   # production build → docs/
```

Deploy `docs/` to GitHub Pages. Set Pages source to `master` branch, `/docs` folder.

The `homepage` field in `package.json` should match the GitHub Pages URL pattern.
