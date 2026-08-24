# HANDOFF — Studio Portfolio

Context document for an AI assistant or developer picking this project up cold.
Written 2026-08-24. Read this before changing anything.

---

## 1. What this is

A static studio-portfolio website. One full-bleed hero holding an oversized wordmark and a
centred cloud of project names; **hovering a name fades that project's image in behind the
word** while the other names dim. Plus an about/contact page, generated case-study pages,
and a 404.

Location: `/Users/geno.popescu/test-website` (macOS, Node 24, npm 11).

**Status: complete and working.** Builds clean (0 errors, 0 warnings, 13 pages). Not yet in
git, not yet pushed to GitHub. See §8.

**This is a self-showcase portfolio.** Every project is a page on this site. There is no
mechanism for a project to link out to a third-party URL, and the owner explicitly does not
want one — don't add it back.

### Origin of the design

The user pointed at `https://www.ofjulystudio.com/select-projects` and asked to recreate
it. The **layout, typography and interaction** were reverse-engineered from that site by
measuring the live DOM. The **content was not copied** — project names, body copy and
imagery here are all invented placeholders. Keep it that way: the reference is a real
studio and those were real client names.

The reference is a Squarespace 7.1 site (Fluid Engine, 26-column grid) loading ~25 vendor
scripts. This rebuild is hand-written and ships **zero JavaScript**.

---

## 2. Stack, and why

| Choice | Reason |
| --- | --- |
| **Astro 7** | Static-first, zero JS by default, ideal for a design-led portfolio. Pinned to 7 deliberately — the Astro 5 line has 8 unpatched XSS advisories. |
| **TypeScript (strict)** | `astro check` runs as part of `npm run build`, so type errors fail the build. |
| **Plain CSS, scoped per component** | No Tailwind/CSS-in-JS. Design tokens are CSS custom properties in `src/styles/global.css`. |
| **GitHub Pages + Actions** | User's requirement: free hosting. |

`npm audit` reports **0 vulnerabilities** (required an `npm audit fix` for a `sharp`/libvips
issue after the Astro 7 upgrade). Keep it that way.

### Commands

```bash
npm install
npm run dev      # localhost:4321, hot reload
npm run build    # astro check && astro build → dist/
npm run preview  # serve dist/ locally
node scripts/make-placeholders.mjs   # regenerate placeholder imagery
```

---

## 3. File map

```
src/
  data/
    site.ts              ← wordmark/studio name, hero image, email, booking link,
                           socials, nav + footer links
    projects.ts          ← THE project list + Project type + helpers
  lib/
    url.ts               ← url() — prefixes internal links with BASE_URL
  layouts/
    Base.astro           ← <head>, fonts, header/footer, skip link
  components/
    SiteHeader.astro     ← oversized wordmark + nav; `overlay` prop flips to light type
    SiteFooter.astro     ← stacked link list + colophon
    ProjectCloud.astro   ← THE hero interaction (see §5)
  pages/
    index.astro          ← hero + ProjectCloud
    about.astro          ← intro, CTA, services table
    projects/[slug].astro← generated case study, one per project
    404.astro
  styles/
    global.css           ← design tokens + reset + a11y helpers
public/images/
  hero.svg               ← full-bleed hero
  projects/<slug>.svg    ← one thumbnail per project
scripts/
  make-placeholders.mjs  ← generates the SVG placeholders
.github/workflows/
  deploy.yml             ← build + deploy to GitHub Pages on push to main
```

Also: `.claude/launch.json` (dev-server config for the Claude Code browser pane) —
harmless, safe to delete.

---

## 4. Design spec (measured off the reference)

These numbers were read from the live reference DOM and matched deliberately. Don't
"tidy" them without reason.

| Token | Value | Note |
| --- | --- | --- |
| Page ground | `#faf9f6` | warm off-white, `--paper` |
| Ink | `#000` | `--ink` |
| Type over imagery | `#faf9f6` | `--overlay` |
| Wordmark | Helvetica/Arial **bold**, `clamp(2rem, 8.6vw, 8.5rem)`, `-0.03em` | renders 110.08px @1280 (reference: 109.7px) |
| Project names | **BIZ UDMincho**, `clamp(1.6rem, 4.85vw, 4rem)`, line-height 1.3 | renders 62.08px @1280 (reference: 62.08px) |
| Nav / footer | BIZ UDMincho, ~16px / ~13px uppercase, wide tracking | |
| Header | `position: absolute`, transparent, overlays hero | |

Fonts: **BIZ UDMincho** (Google Fonts, loaded in `Base.astro`) for everything except the
wordmark, which uses a system grotesque stack. Both are freely usable.

---

## 5. The hero interaction — read this before touching `ProjectCloud.astro`

Each project name is an `<a class="cloud-link">` containing **both** its thumbnail
(`<img class="reveal">`) and its text (`<span class="label">`). On hover the image fades
from `opacity: 0` to `1`, centred on that word, painted underneath the label.

It is **pure CSS**. There is no JavaScript anywhere on this site.

### Three non-obvious things that will bite you

1. **`.cloud-link` must stay `display: inline-block`.**
   As plain `inline`, the link fragments across line breaks and its absolutely-positioned
   child resolves `left: 50%` against the whole `<h1>` — every thumbnail lands at the same
   x instead of centring on its word. This was a real bug, found and fixed. `inline-block`
   also keeps multi-word names from splitting mid-name.

2. **Layering uses positive z-index only.**
   `.label` is `position: relative; z-index: 1`; `.reveal` is `position: absolute;
   z-index: 0`. An earlier draft used `z-index: -1`, which breaks the moment any ancestor
   forms a stacking context. Don't reintroduce it.

3. **An earlier version generated per-project `:has()` rules** to link a name to a
   thumbnail positioned elsewhere in the hero. That is gone — putting the image inside the
   link made it unnecessary. Don't restore it.

Also present: `.cloud:has(.cloud-link:hover) .cloud-link:not(:hover) { opacity: .45 }` dims
the unhovered names, and `@media (hover: none)` sets `.reveal { display: none }` so touch
devices don't download thumbnails they can never show.

---

## 6. Data model

Everything editable lives in `src/data/`. Components read from it; they hold no content.

```ts
type Project = {
  title: string;    // shown in the hero
  slug: string;     // URL: /projects/<slug>
  image?: string;   // filename in public/images/projects/, default `<slug>.svg`
  reveal?: { w?: number; rotate?: number; dx?: number; dy?: number };
  year: string; role: string; summary: string;  // case-study copy
}
```

- `reveal` defaults: `w: 320` (px, `min(var(--w), 42vw)` so it shrinks), `rotate: 0`,
  `dx/dy: 0` (px nudge from the word's centre).
- Helpers exported alongside: `projectHref(p)`, `projectImage(p)`.
- `getStaticPaths` in `projects/[slug].astro` builds one page per entry in `projects`.
  All 10 are internal; adding an entry to the array generates its page automatically.

An earlier revision had an optional `externalUrl` field that made a name link out to a
client site instead of generating a page. **It was removed on the owner's instruction** —
this site showcases their own work. Every hero link is same-tab and internal; there are no
`target="_blank"` project links.

**Images:** any format works — drop the file in `public/images/projects/` and set `image`.
The extension is no longer hardcoded.

---

## 7. Accessibility

Deliberately better than the reference. Preserve these:

- Skip link to `#main`.
- `:focus-visible` outlines, and **`.cloud-link:focus-visible` triggers the reveal**, so
  the interaction works on keyboard (the reference is mouse-only).
- Visually-hidden `<h1>` text ("Select projects") since the visible h1 is a list of names.
- Decorative images have `alt=""` + `aria-hidden`.
- `prefers-reduced-motion` kills transitions globally.
- Hero has a top-down scrim so white type keeps contrast over any photo.

---

## 8. Deployment — what's done, what's left

**Done:** `.github/workflows/deploy.yml` builds on push to `main` and publishes to Pages.
It reads `origin` and `base_path` from `actions/configure-pages`, injecting them as `SITE`
and `BASE` env vars, which `astro.config.mjs` consumes. So it works unchanged for both
`user.github.io` **and** `user.github.io/repo-name` — no manual base-path editing.

**Left for the user (they said they'd do it later):**

```bash
git init -b main && git add -A && git commit -m "Studio portfolio site"
# create repo, push, then: Settings → Pages → Source → GitHub Actions
```

Not done deliberately: no repo created, nothing pushed. `gh` is not authenticated on this
machine, and publishing is the user's call.

Custom domain: add it in Settings → Pages **and** commit `public/CNAME` containing the
bare domain.

**Base-path gotcha:** every internal link must go through `url()` from `src/lib/url.ts`.
A raw `href="/about"` will 404 on a project-site deploy. This is the single easiest way to
break the site.

---

## 9. Verified state

Checked in-browser at 1280px against the running dev server:

- Wordmark 110.08px, project names 62.08px, BIZ UDMincho — matches the reference.
- All 10 names present; all 10 link internally to `/projects/*`, same tab, zero
  `target="_blank"` in the hero.
- Every thumbnail centres on its own word; `dx/dy` offsets apply exactly as configured.
- No fragmented links (all 81px tall).
- Hero + all 10 thumbnails load; hover reveal and dimming confirmed visually.
- About page renders with dark (non-overlay) wordmark; case-study page + next-project
  wrap-around work.
- Build output: 13 pages, 200K, **0 `.js` files, 0 `<script>` tags**, index.html 13K.

---

## 10. Open items / suggested next steps

1. **Replace placeholder content** — all copy and imagery is invented. Real photography
   is the main upgrade.
2. **Swap the placeholder contact details** in `site.ts` — `hello@example.com`, the
   `cal.com` booking link, and the Instagram/Behance URLs are all still generic.
3. **Add real image optimisation** once real photos land: switch `public/images/` to
   `src/assets/` and use Astro's `<Image>` component for automatic resizing/WebP. Worth
   doing before shipping heavy JPGs; unnecessary while placeholders are SVG.
4. **Mobile reveal** — currently hidden on touch. If the user wants project imagery on
   mobile, it needs a different treatment (a grid below the hero, not a hover).
5. Consider `@astrojs/sitemap` if SEO matters.

### Working notes

- The Claude Code browser pane intermittently times out on `screenshot` and renders at a
  small viewport; DOM measurement via `javascript_tool` is the reliable verification path.
- After renaming slugs, **hard-reload the dev server page**. HMR swaps image `src` values
  before regenerated files exist on disk, and the browser caches the 404s — images then
  report `complete: true` with `naturalWidth: 0`.
