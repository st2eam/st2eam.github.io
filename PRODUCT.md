# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React + TypeScript + MUI + Less, deployed as a Vite build to GitHub Pages.

## Users

Visitors discovering and browsing ST2EAM's photography on desktop or mobile, with secondary audiences interested in the maker's notes, projects, and contact details.

## Product Purpose

An immersive Chinese-first photography portfolio that lets visitors move from a calm first impression into a browsable archive of real photographs, locations, dates, and camera metadata.

## Positioning

The archive is authored from the photographer's own travel, nature, and human-documentary images, pairing each frame with truthful context and poetic captions rather than generic stock imagery.

## Operating Context

The site is a static GitHub Pages experience. Thumbnails are kept in this repository, originals remain in the `st2eam/discover` repository, and the Notes page embeds the existing external notes site.

The public information architecture is fixed as `作品 /` (the archive), `项目 /projects`, `笔记 /notes`, and `关于 /about`. The Projects and Notes sections are intentionally secondary to the photographic archive.

## Capabilities and Constraints

- Browse 58 photographs in masonry or timeline views.
- Filter by content tags and province/city, then open a full-screen viewer with optional original-image loading, EXIF, keyboard navigation, and touch swipes.
- Use a fixed fog-forest photograph (`DSC04146.jpg`) as the semantic home hero; the image is preloaded for the first paint and is never selected randomly.
- On mobile, browse categories in a horizontal strip and choose a location from a compact selector; an empty result state always provides a clear reset action.
- Read the external Notes site inside a titled iframe, with a visible direct-link fallback when embedding is unavailable.
- Keep the existing `PhotoConfig` shape, photo sync scripts, remote originals, and external Notes URL compatible.
- Keep project information factual and do not invent testimonials, metrics, or experiences.

## Brand Commitments

The identity is `ST2EAM`. Existing language and assets include “雨涧听溪，山野春行”, Chinese-first copy, real photography, and a warm natural atmosphere.

## Evidence on Hand

- 58 configured photographs with local thumbnails and real EXIF/location data in `src/config/photos.ts`.
- Public routes for works (`/`), projects (`/projects`), notes (`/notes`), and about (`/about`), with the same order in the primary and footer navigation.
- Existing GitHub, email, board-game site, and notes links in the repository.

## Product Principles

1. Let the photograph lead the experience.
2. Make calm, poetic browsing feel effortless on touch and keyboard.
3. Use only supplied facts, images, and links.
4. Prefer clear editorial structure over decorative UI chrome.

## Accessibility & Inclusion

Target WCAG AA contrast for text and controls, preserve visible keyboard focus, provide meaningful labels and fallbacks, support touch targets, and respect `prefers-reduced-motion`.
