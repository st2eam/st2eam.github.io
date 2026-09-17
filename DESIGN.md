# ST2EAM · 东方山野诗集

## Direction

An editorial photography book shaped by mist, mountain paths, and quiet observation. The interface recedes so the real image, its caption, and its context carry the story.

## Palette

- Paper: `#F2EFE7`
- Paper deep: `#E8E1D4`
- Ink: `#1D1C18`
- Ink muted: `#625F57`
- Pine: `#31463B`
- Copper: `#9B7952`
- Hairline: `rgba(29, 28, 24, 0.14)`
- Night surface: `#111512`

## Typography

- Chinese display: `Songti SC`, `STSong`, `Noto Serif CJK SC`, serif.
- Latin display mark: `Playfair Display`, Georgia, serif.
- Interface/body: `DM Sans`, `PingFang SC`, `Microsoft YaHei`, sans-serif.
- Measurement metadata: `Space Mono`, Consolas, monospace.

Large titles are compact but never overflow. Body measure stays around 65–75ch. Copper is an accent and index color, never the main text color on paper.

## Composition

- Home first viewport: desktop 40/60 text-to-photo split; mobile photo-first vertical composition.
- Hero photography is the fixed fog-forest frame `DSC04146.jpg`.
- Archive uses generous gutters, restrained image corners, compact filters, and metadata revealed through hover, focus, or opening the viewer.
- Projects is a quiet secondary archive, not a competing hero.
- Notes keeps the existing external document experience inside a titled, full-height frame and exposes a direct-link fallback.
- Footer is a quiet index of the four public routes, identity, contact, and the existing GitHub/email links; no continuous marquee is used.

## Interaction and Motion

Use one authored scroll/hero reveal, subtle page transitions, deliberate image hover states, and the lightbox's intentional image/toolbar transitions. Content remains visible by default and all non-essential motion turns off for reduced-motion users.

The approved visual references are stored at `.impeccable/mocks/decision/home-desktop.png` (1440×900) and `.impeccable/mocks/decision/home-mobile.png` (390×844). They are decision artifacts only; generated imagery is never shipped as photography content.

## Anti-patterns to Avoid

No random hero selection, gradient text, glassmorphism cards, excessive pills, continuous marquee decoration, low-contrast gray copy, fake photography, or template-like metric/card scaffolding.
