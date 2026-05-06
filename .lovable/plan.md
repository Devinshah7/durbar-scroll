
# Cinematic Loader + Three Gates + Route Restructure

## Overview
Three major changes: (1) 3D globe loader at `/`, (2) new Gates selection screen at `/gates`, (3) move existing site content to `/events`. All Three.js code will use `ClientOnly` wrappers and dynamic imports to avoid SSR crashes in the Cloudflare Worker environment.

**Routing**: Will use TanStack Router (the project's native router) instead of react-router-dom, creating route files under `src/routes/`.

## Technical Approach — SSR Safety
All Three.js components will be in `*.client.tsx` files and loaded via `React.lazy()` inside `ClientOnly` wrappers. No Three.js imports at module level in any route file.

## Changes

### 1. Install Dependencies
- `three`, `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`
- Google Fonts: Cinzel, Cormorant Garamond (via CSS import)

### 2. Route Structure
- `src/routes/index.tsx` → Loader (3D globe → auto-navigates to `/gates`)
- `src/routes/gates.tsx` → Three Gates selection screen
- `src/routes/events.tsx` → Existing homepage content (moved from index)

### 3. Loader (`src/components/LoaderScene.client.tsx`)
- 5-phase GSAP-driven animation sequence (~6.5s)
- Three.js globe with Earth textures, cloud layer, atmosphere Fresnel shader
- Phases: top-left entry → spin decay → dive into India → logo reveal → dissolve to `/gates`
- Post-processing: Bloom, Vignette, ChromaticAberration

### 4. Gates Page (`src/routes/gates.tsx` + `src/components/Gates.tsx`)
- Three Mughal archways: Events (active), Celebrity (coming soon), Tourism (coming soon)
- CSS clip-path for arch shapes, hover 3D lift/glow effects
- Events gate click → gate-opening transition → navigate to `/events`
- Background: gradient + floating particles + jali pattern overlay

### 5. Events Route (`src/routes/events.tsx`)
- Move all existing index content (Hero, Philosophy, Pillars, Stats, etc.)
- Add gold fade-in transition on mount

### Files Created/Modified
- Install packages
- `src/routes/index.tsx` — Loader route
- `src/routes/gates.tsx` — Gates route  
- `src/routes/events.tsx` — Existing site content
- `src/components/LoaderScene.client.tsx` — 3D globe scene
- `src/components/Gates.tsx` — Gates UI component
- `src/styles.css` — Add fonts, gate styles, animations
