# Element 22 Homepage — Technical & Design Overview

Complete reference for architecture, styling, animations, homepage sections, critique, and scalability.

---

## 1. Folder and file structure

### Tree (project-owned files)

```
element-22-homepage/
├── app/
│   ├── globals.css         # Design tokens, Tailwind @theme, base styles
│   ├── layout.tsx          # Root HTML, fonts, metadata, Analytics
│   └── page.tsx            # Single homepage — composes all sections
├── components/
│   ├── contact.tsx
│   ├── featured-services.tsx
│   ├── gallery.tsx
│   ├── hero.tsx
│   ├── reveal.tsx          # Shared animation primitive
│   ├── service-showcase.tsx
│   ├── site-footer.tsx
│   ├── site-nav.tsx
│   ├── testimonials.tsx
│   ├── theme-provider.tsx  # Unused in layout
│   ├── welcome.tsx
│   ├── why-choose.tsx
│   └── ui/                 # 50+ shadcn/ui components (scaffold)
├── docs/
│   └── TECHNICAL_OVERVIEW.md
├── hooks/
│   ├── use-mobile.ts
│   └── use-toast.ts
├── lib/
│   └── utils.ts            # cn() helper
├── public/
│   ├── hero-car.png, ppf.png, ceramic.png, detailing.png
│   ├── before.png, after.png, restoration.png, workshop.png
│   └── icons, placeholders
├── styles/
│   └── globals.css         # ⚠ Duplicate light theme — NOT imported
├── components.json         # shadcn configuration
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── PROJECT_CONTEXT.md
└── tsconfig.json
```

### Purpose of important folders

| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router entry: layout, sole page, global CSS |
| `components/` | All homepage UI — one file per vertical section |
| `components/ui/` | shadcn/ui design system primitives for future features |
| `lib/` | Shared utilities (`cn` for class merging) |
| `hooks/` | Shared React hooks (from shadcn scaffold) |
| `public/` | Static assets served at `/filename` |
| `styles/` | Legacy/duplicate globals — **should be removed or merged** |

### Reusable components

| Component | Location | Reuse |
|-----------|----------|-------|
| `Reveal` | `components/reveal.tsx` | Any scroll-animated block |
| `SiteNav` | `components/site-nav.tsx` | All pages (future layout) |
| `SiteFooter` | `components/site-footer.tsx` | All pages |
| `Field` | `contact.tsx` (local) | Extract to `components/field.tsx` if forms multiply |
| `BeforeAfter` | `gallery.tsx` (local) | Extract to `components/before-after.tsx` for case studies |
| shadcn `Button`, `Input`, `Form` | `components/ui/*` | Admin, booking, validated forms |

### Page structure

There is **one page** (`app/page.tsx`). Structure is a vertical stack:

```
SiteNav (fixed)
Hero
Welcome
ServiceShowcase
FeaturedServices
WhyChoose
Gallery
Testimonials
Contact
SiteFooter
```

No nested layouts, no route groups, no parallel routes.

---

## 2. Frontend architecture

### How the app is structured

- **Next.js App Router** with a minimal surface area: one layout, one page.
- **Composition over abstraction:** `page.tsx` imports and orders section components; no page-level state.
- **Client/server split:** Interactive sections use `"use client"` because of Framer Motion, scroll listeners, form state, and gallery drag logic.
- **No global state:** No Redux, Zustand, or React Context on the homepage (except unused `ThemeProvider`).
- **No data layer:** All copy, services, testimonials are **hard-coded arrays** inside components.

### Component hierarchy

```
RootLayout
└── Page (main.bg-background)
    ├── SiteNav [client]
    ├── Hero [client]
    ├── Welcome [client] → Reveal
    ├── ServiceShowcase [client] → Reveal, motion.button grid
    ├── FeaturedServices [client] → Reveal, motion.a
    ├── WhyChoose [client] → Reveal
    ├── Gallery [client] → Reveal, BeforeAfter
    ├── Testimonials [client] → Reveal
    ├── Contact [client] → Reveal, Field, motion.button
    └── SiteFooter [server]
```

### Rendering flow

1. **Request** `/` → Next.js renders `layout.tsx` (server).
2. **Layout** loads Google fonts (Inter, Cormorant Garamond, Geist Mono), applies CSS variables, wraps `children`.
3. **Page** renders `<main>` with section components.
4. **Hydration:** Client components hydrate; Hero runs mount animations; `Reveal` attaches `whileInView` observers.
5. **Scroll:** `SiteNav` toggles `scrolled` state after 24px; hash links use native smooth scroll (`html { scroll-behavior: smooth }`).

### Routing structure

| Route | File | Type |
|-------|------|------|
| `/` | `app/page.tsx` | Static marketing page |

**In-page navigation** via fragment IDs. Footer links currently use `href="#"` (non-functional).

**Not present:** `loading.tsx`, `error.tsx`, `middleware.ts`, API routes, i18n.

---

## 3. Styling system analysis

### Tailwind usage

- **Tailwind CSS v4** via `@import 'tailwindcss'` in `app/globals.css`.
- **No `tailwind.config.js`** — configuration is CSS-first (`@theme inline` block).
- **shadcn pattern:** Semantic color utilities mapped to CSS variables.
- **Utility-heavy JSX:** Almost all styling is inline Tailwind classes in components.
- **`cn()`** from `lib/utils.ts` used in shadcn components; homepage sections rarely need it.

### Color palette (active — `app/globals.css`)

| Token | Approximate role | Value (OKLCH) |
|-------|------------------|---------------|
| `background` | Page canvas | `oklch(0.13 0 0)` near black |
| `foreground` | Primary text | `oklch(0.97 0 0)` off-white |
| `card` / `secondary` | Elevated surfaces | `oklch(0.17–0.22 0 0)` |
| `muted-foreground` | Body secondary | `oklch(0.62 0 0)` |
| `accent` | Highlights, lines, selection | `oklch(0.78 0.01 250)` cool silver |
| `border` | Dividers, grids | `oklch(0.27 0 0)` |
| `destructive` | Errors (unused on page) | red OKLCH |

**Note:** `.dark` class variables exist but the site does not toggle themes; default `:root` is already dark.

### Spacing system

| Pattern | Classes | Usage |
|---------|---------|--------|
| Section padding | `py-28 lg:py-40` | Consistent vertical rhythm |
| Container padding | `px-6 lg:px-10` | Horizontal gutters |
| Max width | `max-w-[1400px]` | All major sections |
| Grid gaps | `gap-6`, `gap-16`, `gap-24 lg:gap-32` | Content blocks |
| Component padding | `p-5`–`p-10` | Cards, forms, tiles |
| Micro gaps | `gap-3`, `gap-4` | Eyebrows, buttons |

Tailwind default spacing scale is used; no custom spacing tokens defined.

### Typography system

| Element | Classes |
|---------|---------|
| Hero H1 | `font-serif text-5xl sm:text-7xl lg:text-8xl font-light leading-[0.95]` |
| Section H2 | `font-serif text-4xl sm:text-5xl font-light` |
| Section H3 | `font-serif text-2xl–3xl font-light` |
| Eyebrow | `text-xs uppercase tracking-[0.4em] text-muted-foreground` |
| Body | `text-base sm:text-lg leading-relaxed text-muted-foreground` |
| CTAs | `text-xs uppercase tracking-[0.2em]` |
| Indices | `font-mono text-[10px] tracking-widest` |

### Responsive design patterns

- **Breakpoints:** `sm` (640px), `lg` (1024px) dominate; `md` rarely used.
- **Navigation:** Hamburger + full-screen overlay below `lg`.
- **Typography:** Step up headline sizes at `sm` and `lg`.
- **Grids:** `grid-cols-2` → `sm:grid-cols-3` → `lg:grid-cols-5` (services).
- **Featured services:** Stacked mobile; `lg:grid-cols-2` with alternating image order via `lg:[&>div:first-child]:order-2`.
- **Images:** `object-cover`, aspect ratios `aspect-square`, `aspect-[4/3]`, `aspect-[16/10]`.

---

## 4. Animation system analysis

### Libraries

| Library | Role on homepage |
|---------|------------------|
| **framer-motion** | Primary — hero, nav overlay, Reveal, hovers, form tap |
| **tw-animate-css** | Imported globally; minimal/no direct use in sections |
| **CSS transitions** | `transition-colors`, `transition-transform duration-700` on images/tiles |

**Not used on homepage:** Embla carousel, Recharts, Vaul drawer (deps present for shadcn/future).

### Motion patterns

1. **Page load (Hero):** Staggered `initial` → `animate` on eyebrow, H1, body, CTAs, scroll indicator.
2. **Scroll reveal (`Reveal`):** `whileInView`, `once: true`, `margin: "-80px"`, 0.9s, custom ease.
3. **Scroll indicator:** Infinite `y` bounce on chevron.
4. **Mobile menu:** `AnimatePresence` fade; staggered link `x` slide-in.
5. **Micro-interactions:** `group-hover:translate-x-1` on arrows; `whileHover={{ x: 4 }}` on enquire links; `whileTap={{ scale: 0.98 }}` on submit.

### Hover / interactions

- Service grid: hover/focus sets `active` tile → inverted `bg-foreground text-background`.
- Why-choose cards: `hover:bg-secondary`.
- Images: `group-hover:scale-105` (700ms).
- Nav links: `hover:text-foreground`.
- Primary buttons: `hover:bg-accent` (foreground CTA) or border fill (secondary).

### Cinematic / luxury UI patterns

- Full-viewport hero with **dual gradients** over photography.
- **text-shadow-luxury** on hero headline.
- **1px grid mosaic** with inverted active cell (editorial / fashion layout).
- **Mono service indices** (`01`, `02`…).
- **Backdrop blur** on nav, contact cards, labels.
- **Custom slim scrollbar** matching dark theme.
- **Alternating section backgrounds** (`bg-card/40`) for rhythm.

---

## 5. Design language analysis

### Visual direction

**Dark automotive luxury:** Think high-end detailing studio or watchmaker — not racing neon or dealership loud. Photography-led, typography-forward, minimal chrome.

### Luxury characteristics present

- Serif display type with generous tracking and light weights
- Restrained palette (monochrome + single cool accent)
- Wide letterspacing on labels (`tracking-[0.2em]`–`[0.4em]`)
- High whitespace in sections (`py-28`+)
- Full-bleed imagery with gradient vignettes
- Concierge language (“Make an Appointment”, “private consultation”)

### UX hierarchy

1. **Primary:** Hero CTA → Contact / Appointment
2. **Secondary:** Explore Services → Service grid
3. **Consideration:** Featured services (depth), Gallery (proof), Testimonials (trust)
4. **Support:** Why Choose (rational), Welcome (brand story)

F-pattern on desktop: nav CTA right, hero left-aligned copy, grids scan left-to-right.

### Premium vs generic sections

| Section | Premium feel | Generic / weak spots |
|---------|--------------|----------------------|
| Hero | Strong imagery, typography, motion | Stock-style copy could be more specific to Kerala studio |
| ServiceShowcase | Distinctive grid interaction | Lucide icon grid is common in AI templates |
| FeaturedServices | Editorial layout, strong copy | Three-block pattern is familiar |
| Gallery | Before/after slider is standout | Only one slider + 2 static images |
| Contact | Layered workshop BG, glass cards | Form is standard; fake submit |
| Testimonials | Clean cards | Obviously placeholder Indian names + luxury cars |
| WhyChoose | Solid grid | Six-icon feature grid is template-adjacent |
| Footer | On-brand | `href="#"` links feel unfinished |

---

## 6. Homepage section breakdown

### SiteNav (`components/site-nav.tsx`)

- Fixed header; transparent → blurred `bg-background/80` after 24px scroll.
- Logo: boxed `22` + “Element” wordmark.
- Desktop: hash links + bordered CTA.
- Mobile: full-screen overlay with large serif links.

### Hero (`#top`)

- `min-h-screen`, `/hero-car.png` cover, left + bottom gradients.
- Eyebrow: “Kerala · South India” with accent rule.
- H1: “Crafting Automotive Perfection”
- Dual CTAs: appointment (filled) + explore services (outline).
- Animated scroll hint at bottom.

### Welcome

- Two-column: headline left, story right.
- Stats row: `10+` services, `5000+` vehicles, `100%` precision.
- No anchor ID (not in nav).

### ServiceShowcase (`#services`)

- 10 interactive square tiles in responsive grid.
- Hover/focus selects active service; inverts colors.
- Icons from Lucide; mono index per tile.
- Data: static `services` array.

### FeaturedServices (`#featured`)

- Three alternating image + copy blocks (PPF, Ceramic, Detailing).
- Bullet points with accent dots; “Enquire” links to `#contact`.
- Images: `/ppf.png`, `/ceramic.png`, `/detailing.png`.

### WhyChoose (`#why`)

- 6 cards in 2×3 grid: craftsmanship, technicians, solutions, products, experience, equipment.
- Icon + serif title + muted description.

### Gallery (`#gallery`)

- **BeforeAfter:** drag/touch slider on `/before.png` vs `/after.png`.
- Two hover-scale cards: Heritage Restoration, The Studio.

### Testimonials

- Three quote cards; serif blockquote; no carousel.
- Placeholder clients (Porsche, Mercedes, Range Rover).

### Contact (`#contact`)

- Workshop background at 20% opacity.
- Left: headline + WhatsApp, Instagram, phone, location.
- Right: appointment form (name, phone, vehicle, service select, message).
- Submit sets local `submitted` state only — **no network**.

### SiteFooter

- Brand blurb, social icons, two link columns (non-functional `#` links).
- Copyright + location line.

---

## 7. Improvement opportunities

### Generic / AI-generated patterns

- Six-item “why choose us” icon grid
- Placeholder testimonials with luxury car name-dropping
- `10+ / 5000+ / 100%` stats without substantiation
- v0/shadcn package bloat (50+ unused UI files)
- `metadata.generator: "v0.app"` in layout

### Weak spacing / typography

- Testimonials section lacks `id` and nav link — orphaned in IA
- Some sections could use tighter mobile headline scale consistency
- Body text sometimes `text-sm` where `text-base` would improve readability (why-choose cards)
- Duplicate `hooks/` and `components/ui/use-*` files

### Clutter / unnecessary effects

- `tw-animate-css` import if unused — remove or document
- `ThemeProvider` + `.dark` tokens without theme toggle — simplify
- `styles/globals.css` duplicate creates confusion
- Full Radix/shadcn dependency tree for a static page — tree-shake or defer until admin

### Areas needing refinement

| Area | Issue | Recommendation |
|------|--------|----------------|
| Forms | Mock submit | API route + validation (zod + RHF) |
| Images | `<img>` + unoptimized | `next/image`, real widths, WebP |
| Footer links | `#` | Real routes or hash targets |
| Contact data | Fake phone/WhatsApp | Production values in env |
| SEO | Basic metadata only | OG, JSON-LD, canonical |
| A11y | Custom slider, mobile menu | ARIA, focus trap in menu, keyboard slider |
| TypeScript | `ignoreBuildErrors: true` | Fix and enforce in CI |
| Package name | `"my-project"` | Rename to `element-22-homepage` |

---

## 8. Scalability roadmap

### Full production website

- Environment-based config (`NEXT_PUBLIC_*` for contact links)
- Legal pages (privacy, terms)
- Performance: image CDN, font subsetting, Lighthouse budget
- Error monitoring (Sentry), uptime checks

### Multi-page architecture

```
app/(marketing)/layout.tsx    # Shared nav/footer
app/(marketing)/page.tsx
app/(marketing)/services/[slug]/page.tsx
app/(marketing)/studio/page.tsx
app/(marketing)/work/page.tsx
```

- Extract `content/` or headless CMS for services and gallery
- Shared `Reveal` and section header components

### CRM integration

- Form POST → HubSpot/Zoho/Pipedrive lead
- Tag leads by `Service of interest` field
- WhatsApp click tracking as conversion event

### Booking system

- Embed Cal.com or build slot picker with staff calendar
- Service duration + vehicle type in booking metadata
- Confirmation email/SMS

### Admin dashboard

- `app/(admin)/` protected route
- shadcn `Sidebar`, `Table`, `Form` for leads and gallery CRUD
- Image upload to S3/Cloudinary

### Authentication

- NextAuth.js or Clerk for staff-only admin
- No public auth required for marketing site initially

### Backend APIs

```
POST /api/contact
GET  /api/services
POST /api/appointments
CRUD /api/gallery (admin)
```

- Postgres + Prisma or Supabase
- Rate limiting, honeypot, CAPTCHA on public forms
- Webhook to WhatsApp Business API for instant lead alert

---

*See [`PROJECT_CONTEXT.md`](../PROJECT_CONTEXT.md) for the condensed AI/developer handoff.*  
*See [`DEVELOPMENT_ROADMAP.md`](./DEVELOPMENT_ROADMAP.md) for the phased production plan.*
