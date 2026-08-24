export type Project = {
  /** Display name in the hero word-cloud. */
  title: string;
  /** Used for the case-study URL: /projects/<slug>. */
  slug: string;
  /**
   * Filename inside public/images/projects/ — any format works
   * (.jpg, .png, .webp, .svg). Defaults to `<slug>.svg`.
   */
  image?: string;
  /** How the hover thumbnail appears behind this name. All optional. */
  reveal?: {
    /** Width in px at desktop. Default 320. */
    w?: number;
    /** Tilt in degrees. Default 0. */
    rotate?: number;
    /** Nudge from the name's centre, in px. Default 0. */
    dx?: number;
    dy?: number;
  };
  /** Case-study copy. */
  year: string;
  role: string;
  summary: string;
};

/**
 * Every project gets its own case-study page at /projects/<slug>.
 *
 * The hero renders these in order as one centred, wrapping line of names
 * separated by bullets. Reorder freely — the layout reflows.
 *
 * These are placeholder projects. Replace them with your own.
 */
export const projects: Project[] = [
  {
    title: 'VELVET HOUR',
    slug: 'velvet-hour',
    year: '2025',
    role: 'Visual identity / Web design',
    summary:
      'A quiet, high-contrast identity for a minimalist homeware label. Built around a single geometric mark that survives being stamped, embossed or shrunk to a favicon.',
    reveal: { w: 320, rotate: -3 },
  },
  {
    title: 'NORTHWIND',
    slug: 'northwind',
    year: '2025',
    role: 'Branding / Art direction',
    summary:
      'Full brand system for a coastal guesthouse — wordmark, stationery, signage and a booking site that loads in under a second on hotel wifi.',
    reveal: { w: 340, rotate: 4, dy: 10 },
  },
  {
    title: 'PAPER MOON',
    slug: 'paper-moon',
    year: '2024',
    role: 'Art direction / Campaign',
    summary:
      'A campaign system for a photography collective. Twelve layout templates that stay recognisable whether the image is a studio portrait or a phone snapshot.',
    reveal: { w: 300, rotate: -5, dx: -20 },
  },
  {
    title: 'QUARRY',
    slug: 'quarry',
    year: '2024',
    role: 'Visual identity / Packaging',
    summary:
      'Packaging and identity for a small-batch skincare range. The system is one typeface, two inks and a lot of restraint.',
    reveal: { w: 330, rotate: 2 },
  },
  {
    title: 'CASSIA',
    slug: 'cassia',
    year: '2024',
    role: 'Identity / Print',
    summary:
      'Identity for a neighbourhood plant studio, drawn from the shapes of the plants themselves. The mark works cut into vinyl at door height or printed at thumbnail size on a care card.',
    reveal: { w: 300, rotate: -4, dy: -12 },
  },
  {
    title: 'THE TRAVELOGUE',
    slug: 'the-travelogue',
    year: '2024',
    role: 'Web design / Editorial',
    summary:
      'An editorial site for a travel journal. Long-form pieces set in a single column, with full-bleed photography that never pushes the text off the screen.',
    reveal: { w: 360, rotate: 3 },
  },
  {
    title: 'LANTERN',
    slug: 'lantern',
    year: '2023',
    role: 'Brand system / Social',
    summary:
      'An ongoing visual system for an outdoor apparel brand. Built so their in-house team can produce a month of work in an afternoon without the grid drifting.',
    reveal: { w: 330, rotate: -2, dx: 15 },
  },
  {
    title: 'DRIFTWOOD',
    slug: 'driftwood',
    year: '2023',
    role: 'Visual identity',
    summary:
      'A wordmark and type system for an architecture practice. Everything is set in one family at three sizes — the restraint is the identity.',
    reveal: { w: 310, rotate: 5 },
  },
  {
    title: 'SEPTEMBER',
    slug: 'september',
    year: '2023',
    role: 'Branding / Packaging',
    summary:
      'Branding for a coastal swim label. A palette pulled from the water at four times of day, applied across swing tags, packaging and a small storefront.',
    reveal: { w: 320, rotate: -3, dy: 8 },
  },
  {
    title: 'BLUE HOUR',
    slug: 'blue-hour',
    year: '2023',
    role: 'Visual identity / Web design',
    summary:
      'An archive-led identity for a vintage seller. Every template is a grid of one image and one line of type, so new drops take minutes to publish.',
    reveal: { w: 320, rotate: 3 },
  },
];

export const projectHref = (p: Project) => `/projects/${p.slug}`;

/** Resolve a project's image path, defaulting to `<slug>.svg`. */
export const projectImage = (p: Project) => `/images/projects/${p.image ?? `${p.slug}.svg`}`;
