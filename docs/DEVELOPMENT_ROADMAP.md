# Element 22 — Development Roadmap

**Version:** 1.0  
**Last updated:** June 2026  
**Status:** Active engineering plan  
**Baseline:** Single-page Next.js 16 marketing prototype (mock form, placeholder content, unused shadcn scaffold)

**Companion docs:** [`PROJECT_CONTEXT.md`](../PROJECT_CONTEXT.md) · [`docs/TECHNICAL_OVERVIEW.md`](./TECHNICAL_OVERVIEW.md)

---

## Executive summary

Element 22 is a high-fidelity **luxury automotive landing page** that must evolve into a **production platform**: real leads, optimized media, accessible UX, service depth, backend + CRM, staff admin, and scalable content. This roadmap sequences work by **business value**, **dependencies**, and **risk reduction**—not by feature count.

**North-star outcomes (12 months):**

- Public site converts visitors into qualified leads with <2.5s LCP on mobile
- Operations team manages leads, appointments, and gallery without developer intervention
- Architecture supports multi-page services, CMS, and optional customer portal

---

## How to use this document

| Column | Meaning |
|--------|---------|
| **Priority** | P0 = ship blocker · P1 = high · P2 = medium · P3 = nice-to-have |
| **Complexity** | S (<1 day) · M (1–3 days) · L (1–2 weeks) · XL (2+ weeks) |
| **Depends on** | Prerequisites |
| **Order** | Sequence within phase |

**For AI assistants:** Do not skip P0 items when implementing adjacent features. Update this doc when a phase gate is met.

---

## Phase map

| Phase | Name | Duration (est.) | Exit criteria |
|-------|------|-----------------|---------------|
| **0** | Refinement & brand credibility | 1–2 weeks | No prototype smell; a11y basics |
| **1** | Production launch | 2–3 weeks | Live domain, real leads, SEO baseline |
| **2** | Interactive UX | 2–4 weeks | Service depth + expanded gallery |
| **3** | Backend & operations data | 3–5 weeks | DB, API, CRM, booking v1 |
| **4** | Admin platform | 4–6 weeks | Staff dashboard MVP |
| **5** | Deploy & observability | Parallel from Phase 1 | CI/CD, monitoring, env discipline |
| **6** | Scale & ecosystem | Ongoing | CMS, multi-page, automation, portal |

Phases **overlap**: deploy and contact API can ship before admin exists.

---

## Critical path

```
Phase 0 (polish + real copy)
    → Phase 1 (images, SEO, contact API, TS strict)
        → Vercel production
            → Phase 2 (services + gallery UX)
                → Phase 3 (DB + CRM + booking)
                    → Phase 4 (admin)
                        → Phase 6 (CMS, multi-page, portal)
```

---

# Phase 0 — Immediate refinement

**Goal:** Elevate perceived luxury and trust without new infrastructure.  
**Why first:** Cheap wins; stakeholders can approve launch creative while backend is built.

### 0.1 Typography polish

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 0.1.1 | Add type scale tokens in `app/globals.css` (`--text-hero`, `--text-section`, `--text-body`) | P1 | S | — | Prevents drift across new pages |
| 0.1.2 | Normalize section H2 scale (all sections use same steps `sm:` / `lg:`) | P1 | S | 0.1.1 | Visual rhythm = premium |
| 0.1.3 | Bump Why Choose / card body from `text-sm` to `text-base` where dense | P1 | S | — | Readability on mobile |
| 0.1.4 | Enforce `max-w-prose` / `max-w-xl` on long paragraphs | P2 | S | — | Editorial line length |
| 0.1.5 | Reserve `font-mono` for indices only; avoid mono in body | P2 | S | — | Reduces “template” feel |

### 0.2 Spacing refinement

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 0.2.1 | Create `SectionShell` (`py-28 lg:py-40`, `max-w-[1400px]`, borders) | P1 | M | — | DRY; 10 sections duplicate layout |
| 0.2.2 | Standardize header block `mb-16` before grids | P1 | S | 0.2.1 | Consistent vertical cadence |
| 0.2.3 | Add `id="testimonials"` + nav link (section missing from `site-nav.tsx`) | P1 | S | — | IA completeness |
| 0.2.4 | Reduce mobile `gap-24`/`gap-32` in Featured Services | P2 | S | — | Less scroll fatigue |

### 0.3 Luxury UX improvements

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 0.3.1 | Scroll-spy active state on nav hash sections | P1 | M | — | Precision navigation |
| 0.3.2 | Mobile menu: focus trap, `Escape` close, return focus to trigger | P0 | S | — | WCAG; luxury = inclusive |
| 0.3.3 | `prefers-reduced-motion` in `Reveal` + Hero | P0 | S | — | Legal/ethical baseline |
| 0.3.4 | Replace footer `href="#"` with anchors or routes | P1 | S | — | Trust signal |
| 0.3.5 | Optional sticky mobile “Book” CTA | P2 | M | Real `#contact` | Conversion on long page |

### 0.4 Animation cleanup

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 0.4.1 | `lib/motion.ts` — shared ease `[0.22, 1, 0.36, 1]`, durations, viewport | P1 | S | — | Single motion contract |
| 0.4.2 | Audit `tw-animate-css` — remove import if unused | P2 | S | — | Smaller CSS payload |
| 0.4.3 | Limit staggered `Reveal` delays on large grids | P2 | S | — | Main-thread / perceived lag |
| 0.4.4 | Document when to use `motion` vs CSS `transition` only | P3 | S | 0.4.1 | Team consistency |

### 0.5 Removing AI-generated feel

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 0.5.1 | Replace or remove unverifiable stats (`5000+`, `100%`) | P0 | S | Client sign-off | Credibility |
| 0.5.2 | Real testimonials (name, vehicle, photo, consent) | P0 | M | Client | Social proof |
| 0.5.3 | Kerala-specific copy (location, marques served, years) | P1 | M | Brand workshop | Differentiation |
| 0.5.4 | Custom photography replaces stock hero/workshop | P0 | L | Shoot | #1 visual upgrade |
| 0.5.5 | Service grid: photo tiles or brand marks vs generic Lucide-only | P1 | L | Assets | Less “v0 template” |
| 0.5.6 | Remove `metadata.generator: "v0.app"` from `app/layout.tsx` | P1 | S | — | Professional metadata |

**Phase 0 gate:** Stakeholder approves copy/visuals; a11y P0 items done; no placeholder stats in production.

---

# Phase 1 — Productionization

**Goal:** Deployable marketing site that captures and delivers real leads.

### 1.1 Placeholder content & media

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 1.1.1 | `.env.example` + `NEXT_PUBLIC_WHATSAPP`, phone, Instagram, address | P0 | S | — | No hardcoded `90000 00000` |
| 1.1.2 | Wire `contact.tsx` + footer to env vars | P0 | S | 1.1.1 | Single source of truth |
| 1.1.3 | Replace `public/placeholder*` usage | P1 | S | Assets | Clean public folder |
| 1.1.4 | Image brief: hero 2400px wide, services 1600px, gallery 1920px WebP | P0 | M | Design | Sharp retina display |

### 1.2 Asset optimization

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 1.2.1 | Migrate `<img>` → `next/image` with `sizes` | P0 | M | — | LCP on image-heavy page |
| 1.2.2 | Remove `images.unoptimized: true` in `next.config.mjs` | P0 | S | 1.2.1 | Enable Vercel optimization |
| 1.2.3 | `priority` on hero; lazy below fold | P0 | S | 1.2.1 | Core Web Vitals |
| 1.2.4 | Font subsetting (drop unused Cormorant weights) | P2 | S | — | Smaller CSS |

### 1.3 SEO implementation

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 1.3.1 | `metadataBase`, canonical, OG title/description/image | P0 | S | Domain, OG asset | Share cards |
| 1.3.2 | `app/sitemap.ts`, `app/robots.ts` | P1 | S | Production URL | Crawlability |
| 1.3.3 | JSON-LD `AutomotiveBusiness` + address/geo | P1 | M | Real NAP | Local SEO Kerala |
| 1.3.4 | Semantic sections + `aria-labelledby` on headings | P2 | S | — | SEO + a11y |

### 1.4 Accessibility

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 1.4.1 | Before/after slider: keyboard, `aria-valuenow`, focusable handle | P0 | M | — | Custom control risk |
| 1.4.2 | Form: `htmlFor`/`id`, error announcements | P0 | S | Form rebuild | Screen readers |
| 1.4.3 | Contrast audit `muted-foreground` on `background` | P1 | S | — | WCAG AA |
| 1.4.4 | Skip to main content link | P2 | S | — | Keyboard users |

### 1.5 TypeScript cleanup

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 1.5.1 | Fix all TS errors; remove `ignoreBuildErrors: true` | P0 | M | — | Production safety |
| 1.5.2 | `npm run typecheck` script: `tsc --noEmit` | P1 | S | 1.5.1 | CI gate |
| 1.5.3 | Rename `package.json` `name` from `my-project` | P2 | S | — | Ops clarity |

### 1.6 Performance optimization

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 1.6.1 | Lighthouse mobile ≥ 85 Performance | P1 | M | 1.2.x | Measurable gate |
| 1.6.2 | LCP < 2.5s, CLS < 0.1 | P1 | M | 1.2.x | Google ranking signal |
| 1.6.3 | Consider RSC for `Welcome`, `Testimonials` (static) | P3 | M | — | Smaller client JS |

### 1.7 Contact form backend (minimum viable)

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 1.7.1 | `lib/validations/contact.ts` (Zod schema) | P0 | S | — | Shared client/server |
| 1.7.2 | `POST /api/contact` — validate, rate limit, persist or email | P0 | M | 1.7.1 | Replace mock submit |
| 1.7.3 | react-hook-form + shadcn `Form` in `contact.tsx` | P0 | M | 1.7.2 | Already in `package.json` |
| 1.7.4 | Resend (or SendGrid) email to concierge | P0 | M | 1.7.2 | Immediate ops value |
| 1.7.5 | Honeypot field + Upstash rate limit | P1 | M | 1.7.2 | Spam protection |
| 1.7.6 | `sonner` success/error toasts | P1 | S | 1.7.3 | UX feedback |

**Phase 1 gate:** Production URL live; form delivers to inbox/DB; TS strict build; Lighthouse targets met.

---

# Phase 2 — Interactive UX upgrades

**Goal:** Depth and engagement without visual clutter.

### 2.1 Service detail modals / pages

| Approach | Complexity | When |
|----------|------------|------|
| **Modal + hash** (`#services/ppf`) | M | Stay single-page; fastest |
| **Route** `/services/[slug]` | L | SEO per service; Phase 6 |

| # | Task | Priority | Complexity | Depends on | Order | Reasoning |
|---|------|----------|------------|------------|-------|-----------|
| 2.1.1 | `lib/content/services.ts` — single data source for 10 services | P0 | S | — | 1 | DRY with showcase + featured |
| 2.1.2 | shadcn `Dialog` detail: images, bullets, duration, CTA | P1 | L | 2.1.1 | 2 | Reuse installed UI |
| 2.1.3 | Click tile opens detail (not hover-only on mobile) | P1 | M | 2.1.2 | 3 | Mobile parity |
| 2.1.4 | Optional `/services/[slug]` + ISR | P2 | L | Phase 6 | 4 | Long-term SEO |

### 2.2 Gallery expansion

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 2.2.1 | Extract `BeforeAfter` → `components/shared/before-after.tsx` | P1 | S | — | Reuse case studies |
| 2.2.2 | Case study model: title, category, before/after, description | P1 | M | CMS or JSON | Scalable gallery |
| 2.2.3 | Grid 6–12 projects; filter chips (PPF, Restore, Detail) | P1 | L | 2.2.2 | Proof of work |
| 2.2.4 | Embla carousel on mobile (dep installed) | P2 | M | — | Touch-friendly browse |
| 2.2.5 | Lightbox `Dialog` for full-screen | P2 | M | — | Premium viewing |

### 2.3 Transitions, animations, microinteractions

| # | Task | Priority | Complexity | Depends on | Reasoning |
|---|------|----------|------------|------------|-----------|
| 2.3.1 | `AnimatePresence` on service tile content swap | P2 | M | `lib/motion.ts` | Polished grid |
| 2.3.2 | `app/template.tsx` page transitions (if multi-route) | P2 | M | Phase 6 | Cinematic nav |
| 2.3.3 | Subtle CTA arrow `translateX` — standardize across sections | P2 | S | — | Consistent micro |
| 2.3.4 | Nav scroll progress bar | P3 | S | Scroll spy | Optional delight |
| 2.3.5 | **Avoid** parallax, particles, cursor trails | — | — | Conflicts with luxury restraint |

**Phase 2 gate:** All services explorable; gallery ≥6 real projects; no regression on LCP.

---

# Phase 3 — Backend architecture

**Goal:** Persistent data, booking, CRM—foundation for admin.

### 3.1 Database recommendations

| Option | Pros | Cons | Fit |
|--------|------|------|-----|
| **Supabase** (Postgres) | Auth, storage, RLS, fast MVP | Vendor tie-in | **Recommended MVP** |
| **Neon + Prisma** | Serverless Postgres, portable | More setup | Strong if team knows Prisma |
| **PlanetScale** | MySQL scale | Less ideal for JSON gallery | Secondary |

**ORM:** Prisma — types align with Next.js App Router.

### 3.2 Core schema (initial)

```
User         id, email, role, createdAt
Lead         id, name, phone, vehicle, service, message, status, source, createdAt
Appointment  id, leadId?, startsAt, endsAt, serviceSlug, status, notes
Service      slug, title, description, features[], images[], sortOrder, published
GalleryItem  id, slug, title, category, beforeUrl, afterUrl, published, sortOrder
ActivityLog  id, entityType, entityId, action, userId, createdAt
```

### 3.3 API structure

```
app/api/
  contact/route.ts              POST   → create Lead + notify
  appointments/route.ts         GET/POST (public slots)
  services/route.ts             GET
  gallery/route.ts              GET
  webhooks/crm/route.ts         POST
  admin/
    leads/route.ts              GET, PATCH
    leads/[id]/route.ts         GET, PATCH, DELETE
    appointments/route.ts       CRUD
    gallery/route.ts            CRUD
    services/route.ts           CRUD
```

**Rules:**

- Public routes: Zod validation, rate limiting, no PII in logs
- Admin routes: middleware auth + role check
- Idempotent webhooks with signature verification

### 3.4 Contact form backend (full)

| # | Task | Priority | Complexity | Depends on |
|---|------|----------|------------|------------|
| 3.4.1 | Persist `Lead` in DB on submit | P0 | M | DB, Phase 1 API |
| 3.4.2 | Status enum: `new`, `contacted`, `qualified`, `lost` | P1 | S | 3.4.1 |
| 3.4.3 | Duplicate detection by phone (soft merge) | P2 | M | 3.4.1 |

### 3.5 Booking system

| Stage | Scope | Complexity |
|-------|--------|------------|
| **v1** | Cal.com / Calendly embed + webhook → `Appointment` | S |
| **v2** | Native slots: business hours, service duration, buffer | XL |
| **v3** | Staff assignment, SMS/WhatsApp reminders | L |

| # | Task | Priority | Complexity | Depends on |
|---|------|----------|------------|------------|
| 3.5.1 | Cal.com embed on contact + webhook handler | P1 | M | DB |
| 3.5.2 | Admin calendar view (week grid) | P1 | L | Phase 4 |
| 3.5.3 | WhatsApp template: appointment confirmed | P2 | M | Business API |

### 3.6 CRM architecture

```
[Website Form] → POST /api/contact → [DB: Lead]
                         ├→ [Resend: email staff]
                         ├→ [Webhook: HubSpot / Zoho]
                         └→ [Optional: WhatsApp notify staff]

[CRM status change] → webhook → update Lead.status in DB
```

| # | Task | Priority | Complexity | Depends on |
|---|------|----------|------------|------------|
| 3.6.1 | HubSpot or Zoho field mapping | P1 | M | API keys |
| 3.6.2 | Lead source attribution (`utm_*`, referrer) | P1 | M | 3.4.1 |
| 3.6.3 | Bi-directional sync (optional) | P3 | XL | Admin stable |

### 3.7 Authentication strategy

| Audience | Solution | Notes |
|----------|----------|-------|
| Public | None | — |
| Staff admin | **Clerk** (fast) or **NextAuth** (flexible) | Email allowlist `@element22...` |
| Customer portal (later) | Phone OTP via Supabase Auth or Clerk | Phase 6 |

```
middleware.ts → protect /admin/* and /api/admin/*
```

**Phase 3 gate:** Leads in DB; CRM receives new leads; booking v1 books slots; auth protects admin APIs.

---

# Phase 4 — Admin system roadmap

**Goal:** Non-developers run day-to-day operations.

### 4.1 Dashboard structure

```
app/(admin)/
  layout.tsx                 # Sidebar, auth, Toaster
  page.tsx                   # KPIs: new leads, today's appointments
  leads/
    page.tsx                 # Table + filters
    [id]/page.tsx            # Detail + notes + status
  appointments/
    page.tsx                 # Calendar / list
  gallery/
    page.tsx                 # Upload, reorder, publish
  services/
    page.tsx                 # Edit copy (until CMS)
  settings/
    page.tsx                 # Contact info, integrations
```

**UI:** Existing shadcn `sidebar`, `table`, `form`, `dialog`, `tabs`, `chart` (recharts in deps).

### 4.2 Feature modules

| Module | Priority | Complexity | Depends on | Implementation order |
|--------|----------|------------|------------|----------------------|
| Lead inbox (list, filter, search) | P0 | L | Phase 3 | 1 |
| Lead detail + status + internal notes | P0 | M | 1 | 2 |
| Appointment list/calendar | P1 | L | Booking v1/v2 | 3 |
| Gallery CRUD + image upload | P1 | L | Storage | 4 |
| Service content editor | P2 | L | `services` table | 5 |
| Settings (env display read-only, webhook test) | P2 | M | — | 6 |
| Export leads CSV | P2 | S | Lead inbox | 7 |

### 4.3 Role permissions

| Role | Leads | Appointments | Gallery | Services | Settings |
|------|-------|--------------|---------|----------|----------|
| **admin** | CRUD | CRUD | CRUD | CRUD | CRUD |
| **staff** | RU | CRUD | RU | R | — |
| **viewer** | R | R | R | R | — |

Enforce in **server actions / API handlers**, not UI-only.

**Phase 4 gate:** Staff can process a lead end-to-end without database access.

---

# Phase 5 — Deployment roadmap

### 5.1 Git workflow

| Practice | Detail |
|----------|--------|
| Branches | `main` (protected), `feat/*`, `fix/*` |
| PRs | Required review + green CI |
| Commits | Conventional Commits (`feat:`, `fix:`, `docs:`) |
| Tags | `v1.0.0` on production milestones |

### 5.2 Vercel deployment

| # | Task | Priority | Complexity | Order |
|---|------|----------|------------|-------|
| 5.2.1 | Connect GitHub → Vercel project | P0 | S | 1 |
| 5.2.2 | Preview deployments per PR | P0 | S | 2 |
| 5.2.3 | Production custom domain + SSL | P0 | S | 3 |
| 5.2.4 | Build must pass without `ignoreBuildErrors` | P0 | M | Phase 1 |

### 5.3 Environment variables

```bash
# .env.example (commit this only)

# Site
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_PHONE=
NEXT_PUBLIC_INSTAGRAM=
NEXT_PUBLIC_ADDRESS=

# Server
DATABASE_URL=
DIRECT_URL=
RESEND_API_KEY=
CRM_API_KEY=
CRM_WEBHOOK_SECRET=
CLERK_SECRET_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

| # | Task | Priority | Complexity |
|---|------|----------|------------|
| 5.3.1 | Document all vars in README | P0 | S |
| 5.3.2 | Separate Preview vs Production values in Vercel | P0 | S |

### 5.4 Monitoring

| Tool | Purpose | When |
|------|---------|------|
| **Vercel Analytics** | Traffic (already in layout) | Now |
| **Vercel Speed Insights** | CWV | Phase 1 |
| **Sentry** | Errors (RSC + client) | Phase 1 prod |
| **Better Stack / Checkly** | Uptime | Phase 1 prod |

### 5.5 Analytics

| Tool | Use |
|------|-----|
| Vercel Analytics | Page views |
| Plausible or GA4 | Campaign UTM, conversions |
| Custom event | `form_submit`, `whatsapp_click`, `service_modal_open` |

### 5.6 CI/CD

```yaml
# .github/workflows/ci.yml (recommended)
on: [pull_request, push]
jobs:
  lint:
    run: npm run lint
  typecheck:
    run: npx tsc --noEmit
  build:
    run: npm run build
```

| # | Task | Priority | Complexity |
|---|------|----------|------------|
| 5.6.1 | CI workflow above | P1 | S |
| 5.6.2 | Block merge if build fails | P1 | S |
| 5.6.3 | Playwright: home loads + form validation | P2 | L |

**Phase 5 gate:** Zero-downtime deploys; errors alert within 5 minutes; env documented.

---

# Phase 6 — Future scalability

### 6.1 Multi-page architecture

```
app/(marketing)/
  layout.tsx              # SiteNav + SiteFooter
  page.tsx
  services/[slug]/page.tsx
  studio/page.tsx
  work/page.tsx
  contact/page.tsx
  legal/privacy/page.tsx
```

**Reasoning:** Route groups keep marketing shell; admin stays `app/(admin)/`.

### 6.2 CMS integration

| CMS | Best for |
|-----|----------|
| **Sanity** | Rich media, gallery, localized copy |
| **Contentful** | Larger teams |
| **MDX + Git** | Dev-owned, lowest cost |

Flow: CMS webhook → `revalidatePath` / `revalidateTag` for ISR.

### 6.3 WhatsApp automation

| Stage | Capability |
|-------|------------|
| 1 | `wa.me` links with prefilled message |
| 2 | Business API: instant lead ack template |
| 3 | Appointment reminders + status updates |
| 4 | Human handoff when bot confidence low |

### 6.4 AI integrations (optional, guarded)

| Use case | Approach | Guardrail |
|----------|----------|-----------|
| FAQ chatbot on site | Vercel AI SDK + RAG on service docs | No pricing without human |
| Lead summarization in admin | LLM on lead message | PII policy |
| Image tagging for gallery | Vision API on upload | Admin review before publish |

### 6.5 Customer portal

- Login: phone OTP
- View: upcoming appointments, service history, warranty PDFs (PPF/ceramic)
- Request: re-book, upload vehicle photos

### 6.6 Mobile app

| Path | When |
|------|------|
| **PWA** (manifest, install prompt) | Phase 6 early — low cost |
| **React Native** | Only if push notifications + loyalty justify cost |

---

# Phase 7 — Technical debt & cleanup

| Item | Location / issue | Action | Priority | Complexity |
|------|------------------|--------|----------|------------|
| Duplicate globals | `styles/globals.css` vs `app/globals.css` | Delete unused | P1 | S |
| Duplicate hooks | `hooks/` vs `components/ui/use-*` | Consolidate | P2 | S |
| Unused shadcn (~50 files) | `components/ui/` | Remove unused OR document approved set | P2 | M |
| `ThemeProvider` unused | `theme-provider.tsx` | Wire or remove | P2 | S |
| `ignoreBuildErrors` | `next.config.mjs` | Remove after TS fix | P0 | S |
| `images.unoptimized` | `next.config.mjs` | Remove after next/image | P0 | S |
| Unused deps | `recharts`, `cmdk`, `vaul`, `input-otp`, etc. | Audit post-admin | P3 | S |
| `tw-animate-css` | `globals.css` | Remove if unused | P3 | S |
| Client-only sections | Most of `page.tsx` tree | Split static to RSC | P3 | L |
| Placeholder package name | `my-project` | Rename | P2 | S |

### Target folder structure

```
components/
  marketing/       # hero, welcome, ...
  shared/          # Reveal, SectionShell, BeforeAfter
  admin/           # dashboard widgets
  ui/              # shadcn only
lib/
  content/services.ts
  validations/
  motion.ts
  db/
```

---

# Phase 8 — Recommended libraries & tools

| Category | Use now (in repo) | Add when needed |
|----------|-------------------|-----------------|
| **Animation** | `framer-motion` | Avoid second library (GSAP) unless required |
| **Forms** | `react-hook-form`, `@hookform/resolvers` | — |
| **Validation** | `zod` | Share schemas in `lib/validations/` |
| **Backend** | Next.js Route Handlers | `prisma`, `@supabase/supabase-js` |
| **Auth** | — | `@clerk/nextjs` or `next-auth` |
| **Email** | — | `resend` |
| **Rate limit** | — | `@upstash/ratelimit` |
| **Media** | `next/image` | `@vercel/blob` or Cloudinary |
| **Analytics** | `@vercel/analytics` | Speed Insights, Plausible |
| **CMS** | — | `sanity` + `next-sanity` |
| **Testing** | — | Playwright, Vitest |
| **Dates** | `date-fns` | Booking UI |
| **Carousel** | `embla-carousel-react` | Gallery mobile |
| **Toasts** | `sonner` | Form feedback |

---

# Phase 9 — Engineering standards

### Component structure

- **marketing/** — public sections; one export per file
- **shared/** — `Reveal`, `SectionShell`, layout primitives
- **ui/** — shadcn only; no business copy
- Data fetching in **Server Components**; interactivity in small **Client** children
- Single source: `lib/content/services.ts`, `lib/content/site.ts` (nav, contact)

### Naming conventions

| Asset | Convention |
|-------|------------|
| React components | `PascalCase` |
| Files (sections) | `kebab-case.tsx` (`service-showcase.tsx`) |
| Routes | kebab-case slugs (`paint-protection-film`) |
| Hooks | `use-*.ts` |
| API | plural nouns (`/api/leads`) |
| Env (public) | `NEXT_PUBLIC_*` only for safe values |

### Commit strategy

- Conventional Commits: `feat(contact): add Zod API route`
- PR scope: < ~400 lines when possible
- PR body: roadmap ref e.g. `[P1-1.7.2]`
- No direct commits to `main` without CI

### Documentation standards

| File | Update trigger |
|------|----------------|
| `PROJECT_CONTEXT.md` | Stack or architecture change |
| `docs/TECHNICAL_OVERVIEW.md` | New sections or major UI change |
| `docs/DEVELOPMENT_ROADMAP.md` | Phase complete / reprioritize |
| `README.md` | Setup, scripts, env |
| `.env.example` | New secret or public var |

### Scalability principles

1. **Server validates all writes** — client Zod mirrors server
2. **Design tokens** over magic numbers in Tailwind
3. **ISR + CMS** for content-heavy pages; keep homepage fast
4. **Feature flags** for incomplete admin modules
5. **Luxury = restraint** — fewer effects, more proof (real photos, real names)
6. **India compliance** — privacy policy, form consent, WhatsApp opt-in language

---

## 90-day suggested timeline

| Weeks | Focus | Ship |
|-------|--------|------|
| 1–2 | Phase 0 + real assets/copy | Client-ready preview |
| 3–4 | Phase 1 + Phase 5 deploy | **Production v1** — live leads |
| 5–6 | Phase 2 | Service modals + gallery |
| 7–9 | Phase 3 | DB + CRM + booking embed |
| 10–12 | Phase 4 | Admin MVP |
| 13+ | Phase 6 | CMS, multi-page, automation |

---

## Success metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance (mobile) | ≥ 85 |
| LCP | < 2.5s |
| Form submission reliability | 100% server-confirmed |
| Lead notification latency | < 60s to staff email/WhatsApp |
| Admin: lead → contacted | Track median time in dashboard |

---

## Phase gates checklist

- [ ] **Gate 0:** Real copy, no fake stats, a11y P0, testimonials approved
- [ ] **Gate 1:** Strict TS build, contact API, OG/SEO, production domain
- [ ] **Gate 2:** Services explorable, gallery ≥ 6 projects
- [ ] **Gate 3:** DB leads, CRM sync, booking v1
- [ ] **Gate 4:** Staff uses admin daily without dev support
- [ ] **Gate 5:** CI green on every PR, Sentry monitoring active

---

## Document maintenance

| Review | Owner | Action |
|--------|-------|--------|
| After each phase | Tech lead | Check gates, reprioritize P2/P3 |
| Quarterly | Product + eng | Adjust Phase 6 scope |
| Per major dependency | Eng | Update Phase 8 library table |

---

*This roadmap transforms the Element 22 prototype into a production-ready premium automotive platform. For implementation context, start with [`PROJECT_CONTEXT.md`](../PROJECT_CONTEXT.md).*
