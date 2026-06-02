# Element 22 Homepage — Project Context

> **Purpose:** Single source of truth for developers and AI assistants continuing work on this codebase. Read this before making architectural or design changes.

---

## Project summary

**Element 22** is a marketing homepage for a premium automotive studio in Kerala, India (PPF, ceramic coating, detailing, restoration, etc.). The site is a **single-page, scroll-based landing experience** built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, and **Framer Motion**.

**Current maturity:** High-fidelity visual prototype / marketing shell. No backend, no real form submission, no multi-page routing. Most contact data is placeholder.

**Origin:** Scaffolded via v0/shadcn (`metadata.generator: "v0.app"`). Custom section components carry the brand; the large `components/ui/` tree is mostly unused on the homepage.

---

## Architecture summary

| Layer | Technology | Notes |
|--------|------------|--------|
| Framework | Next.js 16.2.6 App Router | `app/layout.tsx`, `app/page.tsx` only |
| UI | React 19 | Section components are `"use client"` |
| Styling | Tailwind CSS 4 + CSS variables (OKLCH) | `app/globals.css` is active; `styles/globals.css` is duplicate/unused |
| Motion | Framer Motion 12 | `Reveal` + per-section `motion.*` |
| Component kit | shadcn/ui (New York) + Radix | Present under `components/ui/`; **not used** by homepage sections |
| Icons | lucide-react | Used throughout sections |
| Analytics | `@vercel/analytics` | Production only in `layout.tsx` |
| Forms | Local React state only | No API, no react-hook-form on contact |

### Rendering flow

```
app/layout.tsx (Server)
  └── fonts, metadata, globals.css, Analytics
  └── app/page.tsx (Server)
        └── <main>
              SiteNav → Hero → Welcome → ServiceShowcase → FeaturedServices
              → WhyChoose → Gallery → Testimonials → Contact → SiteFooter
```

- **Server components:** `app/page.tsx`, `app/layout.tsx`, `site-footer.tsx` (no `"use client"`).
- **Client components:** All other section components + `reveal.tsx` (Framer Motion, scroll state, forms, gallery slider).

### Routing

- **Only route:** `/` (`app/page.tsx`).
- **Navigation:** Hash anchors (`#services`, `#featured`, `#why`, `#gallery`, `#contact`, `#top`).
- **No** `app/api/`, dynamic routes, or middleware.

### Path aliases (`tsconfig.json`)

- `@/components` → `./components`
- `@/lib` → `./lib`
- `@/hooks` → `./hooks`

---

## Folder structure (essential)

```
element-22-homepage/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata, Analytics
│   ├── page.tsx            # Homepage composition (section order)
│   └── globals.css         # ACTIVE design tokens + Tailwind theme
├── components/
│   ├── hero.tsx            # Full-viewport hero
│   ├── site-nav.tsx        # Fixed nav + mobile overlay
│   ├── welcome.tsx         # Brand story + stats
│   ├── service-showcase.tsx# Interactive 10-service grid
│   ├── featured-services.tsx # 3 deep-dive service blocks
│   ├── why-choose.tsx      # 6 value props grid
│   ├── gallery.tsx         # Before/after slider + 2 images
│   ├── testimonials.tsx    # 3 quote cards
│   ├── contact.tsx         # Contact + appointment form (mock submit)
│   ├── site-footer.tsx     # Footer links (placeholder hrefs)
│   ├── reveal.tsx          # Shared scroll-reveal animation wrapper
│   ├── theme-provider.tsx  # next-themes wrapper (NOT mounted in layout)
│   └── ui/                 # shadcn primitives (~50 files, unused on homepage)
├── hooks/                  # shadcn hooks (duplicate of components/ui hooks)
├── lib/utils.ts            # cn() — clsx + tailwind-merge
├── public/                 # Static images (hero, services, gallery)
├── styles/globals.css      # UNUSED light-theme duplicate — do not import
├── components.json         # shadcn config
├── next.config.mjs         # ignoreBuildErrors, images.unoptimized
└── package.json
```

---

## Component system

### Reusable patterns (homepage)

| Component | Role |
|-----------|------|
| `Reveal` | Standard scroll-into-view fade + translate (Framer Motion) |
| `Field` (in `contact.tsx`) | Form label wrapper — extract if forms grow |
| `BeforeAfter` (in `gallery.tsx`) | Drag slider — extract for reuse |
| Section eyebrow | `accent line + uppercase tracking-[0.4em]` — copy-paste pattern |
| Container | `mx-auto max-w-[1400px] px-6 lg:px-10` |

### Section IDs (for nav / deep links)

| ID | Section |
|----|---------|
| `#top` | Hero |
| `#services` | ServiceShowcase |
| `#featured` | FeaturedServices |
| `#why` | WhyChoose |
| `#gallery` | Gallery |
| `#contact` | Contact |

### shadcn/ui

- Installed for future dashboards/forms.
- Homepage uses **custom** buttons, inputs, and cards (Tailwind only).
- When adding admin or complex forms, prefer `components/ui/form`, `input`, `button` + `react-hook-form` + `zod` (already in `package.json`).

---

## Styling system

### Tokens (`app/globals.css`)

- **Color space:** OKLCH CSS variables (`--background`, `--foreground`, `--accent`, etc.).
- **Default theme:** Dark luxury (background ~`oklch(0.13 0 0)`).
- **Accent:** Cool silver `oklch(0.78 0.01 250)` — used for lines, selection, hovers.
- **Radius:** `--radius: 0.25rem` (sharp, architectural).
- **Semantic Tailwind:** `bg-background`, `text-muted-foreground`, `border-border`, etc.

### Typography (`app/layout.tsx`)

| Role | Font | CSS |
|------|------|-----|
| Body / UI | Inter | `--font-sans-custom` → `font-sans` |
| Headlines | Cormorant Garamond (300–600) | `font-serif` |
| Labels / indices | Geist Mono | `font-mono` |

**Patterns:** Large serif headlines (`text-4xl`–`text-8xl`, `font-light`), micro-labels (`text-xs uppercase tracking-[0.2em]`–`[0.4em]`).

### Spacing & layout

- Section vertical rhythm: `py-28 lg:py-40`
- Section separators: `border-t border-border/60`
- Alternating surfaces: `bg-card/40` on some sections
- Content max width: **1400px**

### Responsive

- Mobile-first; breakpoints `sm`, `lg` primary
- Nav: desktop links + CTA; mobile full-screen overlay (`lg:hidden` / `hidden lg:flex`)
- Grids collapse: 2→3→5 cols (services), 1→2→3 (why/testimonials)

### Custom utilities

- `.text-shadow-luxury` — hero headline depth
- Custom scrollbar styling (webkit)

---

## Animation system

- **Library:** Framer Motion (`motion`, `AnimatePresence`).
- **Easing:** `[0.22, 1, 0.36, 1]` (luxury ease-out) on most transitions.
- **`Reveal`:** `opacity 0→1`, `y: 30→0`, `viewport once`, ~0.9s duration.
- **Hero:** Staggered load animations (not scroll-triggered).
- **Interactions:** Hover invert on service tiles, image `scale-105` on hover, nav backdrop on scroll, mobile menu fade, form button `whileTap`.
- **`tw-animate-css`:** Imported in globals; homepage sections do not rely on animate-* utilities.

---

## Design philosophy

1. **Dark, restrained luxury** — near-black canvas, high contrast type, minimal color except silver accent.
2. **Editorial hierarchy** — serif display + mono indices + uppercase microcopy.
3. **Grid-as-interface** — 1px gap grids (`gap-px`, `bg-border/60`) for services and value props.
4. **Cinematic hero** — full-bleed imagery, dual gradients, full viewport height.
5. **Proof over claims** — before/after slider, transformation imagery, featured service depth.

**Brand voice:** Confident, craft-focused, “marque-level” language. Kerala / South India positioning.

---

## Project goals (inferred)

1. Present Element 22 as South India’s premium automotive destination.
2. Convert visitors via **appointment / WhatsApp / form** (form not wired yet).
3. Showcase breadth (10 services) and depth (3 signature offerings).
4. Establish trust (testimonials, gallery, why-choose grid).

---

## Development standards

### Do

- Keep **section components** as the primary unit of work (`components/*.tsx`).
- Reuse `Reveal` for new sections; match eyebrow + container + padding patterns.
- Use semantic tokens (`bg-background`, `text-accent`) not hard-coded hex.
- Prefer `next/image` when enabling image optimization.
- Wire forms to API routes or third-party (Formspree, Resend, CRM) before production.
- Replace placeholder phone, WhatsApp, Instagram, testimonials, and footer `href="#"`.

### Avoid

- Importing `styles/globals.css` (conflicts with dark theme).
- Adding unused shadcn components without need (bundle size).
- Light theme toggle until brand system supports it (`ThemeProvider` exists but unused).
- Generic stock patterns (gradient orbs, purple AI slop) — conflicts with current aesthetic.

### Build config notes

- `next.config.mjs`: `typescript.ignoreBuildErrors: true` — **fix types before production**.
- `images.unoptimized: true` — enable optimization when deploying.

### Commands

```bash
npm run dev    # Development server
npm run build  # Production build
npm run start  # Production server
npm run lint   # ESLint
```

---

## Future roadmap (recommended phases)

### Phase 1 — Production-ready marketing site

- [ ] Real contact data + `next/image` for all assets
- [ ] Form backend (API route → email/CRM/WhatsApp webhook)
- [ ] SEO: Open Graph images, structured data (LocalBusiness), sitemap
- [ ] Remove `ignoreBuildErrors`; add ESLint CI
- [ ] Dedicated service detail pages or expandable modals
- [ ] Delete or merge duplicate `styles/globals.css`

### Phase 2 — Multi-page architecture

```
app/
  page.tsx                 # Home
  services/[slug]/page.tsx
  studio/page.tsx
  gallery/page.tsx
  contact/page.tsx
```

- Shared `SiteNav` / `SiteFooter` in layout or template
- CMS (Sanity, Contentful) or MDX for copy and gallery

### Phase 3 — Booking & CRM

- Calendar integration (Cal.com, Calendly embed or native booking)
- CRM: HubSpot, Zoho, or custom lead pipeline
- WhatsApp Business API for automated acknowledgements

### Phase 4 — Admin & auth

- `app/(admin)/` with NextAuth or Clerk
- Dashboard: leads, appointments, gallery uploads
- Use existing shadcn `table`, `form`, `sidebar` components

### Phase 5 — Backend APIs

```
app/api/
  contact/route.ts
  appointments/route.ts
  gallery/route.ts
```

- Database (Postgres + Prisma or Supabase)
- File storage for gallery (S3 / Cloudinary)
- Role-based access for staff

---

## Key files to read first

1. `app/page.tsx` — section order
2. `app/globals.css` — design tokens
3. `components/reveal.tsx` — animation contract
4. `components/hero.tsx` — brand tone reference
5. `components/site-nav.tsx` — navigation contract

---

## Related documentation

- Full analysis (structure, design critique, improvement list): [`docs/TECHNICAL_OVERVIEW.md`](./docs/TECHNICAL_OVERVIEW.md)
- Engineering roadmap (phases, priorities, production plan): [`docs/DEVELOPMENT_ROADMAP.md`](./docs/DEVELOPMENT_ROADMAP.md)

---

*Last updated: June 2026 — reflects codebase as single-page marketing site.*
