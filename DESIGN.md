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

- A full-bleed photograph fills the Home Hero beneath the navigation. On desktop, the Songti title and outlined archive action sit on the left. The quotation and its author sit lower on the right, with the photo caption at the bottom edge. Mobile stacks the same content over the image.
- Each page load independently picks a random Hero photograph from the real `风光` archive and a random quotation from `src/config/quotes.ts`. Both stay fixed during the current browse, including filter changes and route navigation. The fog-forest frame `DSC04146.jpg` remains one of the available photographs.
- The archive pairs its title with the view switcher and groups filters directly above the photographs. It uses generous gutters, restrained image corners, and metadata revealed through hover, focus, or opening the viewer.
- Projects is a quiet secondary archive, not a competing hero.
- Notes keeps the existing external document experience inside a titled, full-height frame and exposes a direct-link fallback.
- Footer is a quiet index of the four public routes, identity, contact, and the existing GitHub/email links; no continuous marquee is used.

## Interaction and Motion

Use one authored scroll/hero reveal, subtle page transitions, deliberate image hover states, and the lightbox's intentional image/toolbar transitions. Content remains visible by default and all non-essential motion turns off for reduced-motion users.

Historical initial split-layout references are stored at `.impeccable/mocks/decision/home-desktop.png` (1440×900) and `.impeccable/mocks/decision/home-mobile.png` (390×844). The current user-approved Hero uses the full-background composition described above. These images remain historical decision artifacts only; generated imagery is never shipped as photography content.

## Anti-patterns to Avoid

No automatic Hero changes during the current browse, gradient text, glassmorphism cards, excessive pills, continuous marquee decoration, low-contrast gray copy, fake photography, or template-like metric/card scaffolding.
