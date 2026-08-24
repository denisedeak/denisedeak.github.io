# Studio Portfolio

A single-page studio portfolio: a full-bleed hero, an oversized wordmark, and a centred
cloud of project names where hovering a name fades in that project's image behind the type.

Built with [Astro](https://astro.build) — static output, **zero JavaScript shipped**. The
hover reveal is pure CSS (`:has()`), not a script.

## Run it

```bash
npm install
npm run dev
```

`npm run build` type-checks and writes static files to `dist/`. `npm run preview` serves
that build locally.

## Making it yours

**All the text lives in two files. All the images live in one folder.** You never need to
touch a component.

| Where | What's in it |
| --- | --- |
| `src/data/site.ts` | Studio name (the wordmark), hero image, email, booking link, socials, nav + footer links |
| `src/data/projects.ts` | Every project: name, link, case-study copy, and its hover thumbnail |
| `public/images/` | The hero image and all project thumbnails |

### Changing text

Open `src/data/site.ts` for anything site-wide — the big wordmark is just `name`.

Open `src/data/projects.ts` for the project list. Each entry looks like this:

```ts
{
  title: 'VELVET HOUR',                // shown in the hero
  slug: 'velvet-hour',                 // the URL: /projects/velvet-hour
  image: 'velvet-hour.jpg',            // optional — defaults to velvet-hour.svg
  year: '2025',
  role: 'Visual identity / Web design',
  summary: 'A quiet, high-contrast identity for…',
  reveal: { w: 320, rotate: -3 },
}
```

Reorder the array and the hero reflows. Delete an entry and it disappears everywhere.

**Every project gets its own page** at `/projects/<slug>`, built from `year`, `role` and
`summary`. Add a project to the array and its page is generated automatically — there is
nothing else to register.

### Changing images

Drop files into `public/images/` — **any format works** (`.jpg`, `.png`, `.webp`, `.svg`):

- **Hero:** save it as `public/images/hero.jpg`, then set `heroImage: 'hero.jpg'` in
  `site.ts`.
- **Project thumbnail:** save it as `public/images/projects/velvet-hour.jpg`, then set
  `image: 'velvet-hour.jpg'` on that project.

If you name a file exactly `<slug>.svg` you can omit the `image` line entirely — that's
the default. Portrait crops around 700×880 look best; they're displayed ~320px wide.

### Tuning a hover thumbnail

Each thumbnail appears centred **behind the name you're hovering**. The optional `reveal`
block adjusts it — every field has a sensible default, so you can omit the whole thing:

```ts
reveal: { w: 320, rotate: -3, dx: 15, dy: -10 }
```

| Field | Default | Does |
| --- | --- | --- |
| `w` | `320` | Width in px at desktop (auto-shrinks on small screens) |
| `rotate` | `0` | Tilt in degrees |
| `dx` / `dy` | `0` | Nudge left/right, up/down from the name's centre, in px |

Use small `dx`/`dy` values on a few projects so the reveals don't all land identically.

### Placeholders

The repo ships generated SVG placeholders so a fresh clone renders immediately. Once
you've added real photography you can delete them. Regenerate any time with:

```bash
node scripts/make-placeholders.mjs
```

### Seeing your changes

Run `npm run dev` and leave it running — every save reloads the page instantly.

### Fonts

The serif is [BIZ UDMincho](https://fonts.google.com/specimen/BIZ+UDMincho) via Google
Fonts; the wordmark uses a system grotesque stack (Helvetica/Arial). Both are set in
`src/styles/global.css`.

## Deploying to GitHub Pages (free)

1. Create a repo and push this directory to the `main` branch.
2. In the repo: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. Push. `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

The workflow reads the site origin and subpath from GitHub, so it works unchanged whether
the repo publishes to `username.github.io` or `username.github.io/repo-name`.

**Custom domain:** add it under Settings → Pages, and commit a `public/CNAME` file
containing just the domain.
