// @ts-check
import { defineConfig } from 'astro/config';

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/.
// The deploy workflow injects SITE + BASE so the same config works for both
// a project site (base = "/<repo>/") and a user/custom-domain site (base = "/").
const SITE = process.env.SITE ?? 'https://example.github.io';
const BASE = process.env.BASE ?? '/';

export default defineConfig({
  site: SITE,
  base: BASE,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  image: {
    // Thumbnails are decorative and already sized; keep the build fast.
    responsiveStyles: true,
  },
});
