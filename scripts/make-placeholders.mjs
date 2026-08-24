/**
 * Generates the placeholder imagery the site ships with, so a fresh clone
 * renders correctly with no binary assets in the repo.
 *
 * Replace anything in public/images/ with your own photography — the filenames
 * are all that matter: public/images/hero.* and public/images/projects/<slug>.*
 * (update the extension in ProjectCloud.astro / [slug].astro if you switch to jpg).
 *
 *   node scripts/make-placeholders.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/data/projects.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'public/images');
mkdirSync(resolve(outDir, 'projects'), { recursive: true });

/** Warm, low-saturation duotones in the spirit of the reference palette. */
const palettes = [
  ['#e8ded2', '#b9a894'],
  ['#dcd6cd', '#9a8f83'],
  ['#efe4d8', '#c8a98c'],
  ['#d9d9d4', '#8e948c'],
  ['#f0e6dc', '#c2a08b'],
  ['#e2dad0', '#a99c8c'],
  ['#eee7dd', '#bfae9a'],
  ['#ded7cf', '#948b80'],
  ['#f2e8de', '#cbb098'],
  ['#e5ddd3', '#a2968a'],
];

// feTurbulence generates its own output, so the rect this is applied to needs
// no fill — but it must NOT blend with SourceGraphic, or it picks up the
// default black fill and paints the whole card near-black.
const grain = (id) => `
  <filter id="grain-${id}" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>`;

function card({ w, h, from, to, label, id }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="g-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    ${grain(id)}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g-${id})"/>
  <g opacity="0.28" stroke="${to}" stroke-width="1" fill="none">
    <circle cx="${w * 0.5}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.26}"/>
    <circle cx="${w * 0.5}" cy="${h * 0.42}" r="${Math.min(w, h) * 0.38}"/>
  </g>
  <rect width="${w}" height="${h}" filter="url(#grain-${id})" opacity="0.11"
        style="mix-blend-mode:overlay"/>
  <text x="50%" y="${h - 26}" text-anchor="middle"
        font-family="Times New Roman, Times, serif" font-size="${Math.round(w * 0.055)}"
        letter-spacing="3" fill="#3a332c" opacity="0.65">${label}</text>
</svg>`;
}

// Hero
writeFileSync(
  resolve(outDir, 'hero.svg'),
  card({ w: 1600, h: 1000, from: '#e9dfd4', to: '#a08b74', label: '', id: 'hero' })
);

projects.forEach((p, i) => {
  const [from, to] = palettes[i % palettes.length];
  writeFileSync(
    resolve(outDir, 'projects', `${p.slug}.svg`),
    card({ w: 344, h: 430, from, to, label: p.title, id: p.slug })
  );
});

console.log(`Wrote hero + ${projects.length} project placeholders to public/images/`);
