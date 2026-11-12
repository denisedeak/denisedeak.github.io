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
    title: 'Billion Dollar Boy',
    slug: 'billion-dollar-boy',
    image: 'velvet-hour.svg',
    year: '2025',
    role: 'Visual identity / Web design',
    summary:
      'A quiet, high-contrast identity for a minimalist homeware label. Built around a single geometric mark that survives being stamped, embossed or shrunk to a favicon.',
    reveal: { w: 320, rotate: -3 },
  },
  {
    title: 'FiveTwoNine',
    slug: 'fivetwonine',
    image: 'northwind.svg',
    year: '2025',
    role: 'Branding / Art direction',
    summary:
      'Full brand system for a coastal guesthouse — wordmark, stationery, signage and a booking site that loads in under a second on hotel wifi.',
    reveal: { w: 340, rotate: 4, dy: 10 },
  },
  {
    title: 'The Impact List',
    slug: 'the-impact-list',
    image: 'paper-moon.svg',
    year: '2024',
    role: 'Art direction / Campaign',
    summary:
      'A campaign system for a photography collective. Twelve layout templates that stay recognisable whether the image is a studio portrait or a phone snapshot.',
    reveal: { w: 300, rotate: -5, dx: -20 },
  },
  {
    title: 'Spotify Africa',
    slug: 'spotify-africa',
    image: 'spotify-africa/cover.webp',
    year: '2024',
    role: 'Social / Visual Identity / Art Direction / Video Editing / Graphic & Motion Design',
    summary:
      'Served as Brand Guardian and visual developer for Spotify Africa, ensuring consistency and evolution of the brand across markets.',
    reveal: { w: 330, rotate: 2 },
  },
  {
    title: 'OGX',
    slug: 'ogx',
    image: 'cassia.svg',
    year: '2024',
    role: 'Identity / Print',
    summary:
      'Identity for a neighbourhood plant studio, drawn from the shapes of the plants themselves. The mark works cut into vinyl at door height or printed at thumbnail size on a care card.',
    reveal: { w: 300, rotate: -4, dy: -12 },
  },
  {
    title: 'Snapchat',
    slug: 'snapchat',
    image: 'snapchat/cover.webp',
    year: '2024',
    role: 'AR / 3D Animation / 2D Animation / Art Direction',
    summary:
      'A series of Snapchat lenses and animations, moving between the phone screen and out-of-home campaign artwork.',
    reveal: { w: 360, rotate: 3 },
  },
  {
    title: 'Roblox',
    slug: 'roblox',
    image: 'roblox/cover.webp',
    year: '2023',
    role: 'Motion Design / Art Direction / Video Editing',
    summary:
      'A series of films exploring the worlds of Roblox, from widescreen sequences to vertical edits for mobile.',
    reveal: { w: 330, rotate: -2, dx: 15 },
  },
  {
    title: 'Hotel Chocolat',
    slug: 'hotel-chocolat',
    image: 'hotel-chocolat/Image_07.webp',
    year: '2023',
    role: 'Social Visual Identity / Art Direction / Graphic & Motion Design',
    summary:
      'A social identity for Hotel Chocolat, pairing product photography with playful typography and motion.',
    reveal: { w: 310, rotate: 5 },
  },
  {
    title: 'Muse Vol.2',
    slug: 'muse-vol-2',
    image: 'muse-vol-2/Image_01.webp',
    year: '2023',
    role: 'Branding / Report / Digital Magazine / AI',
    summary:
      'Muse Vol.2 explores the impact of artificial intelligence on the creator economy.',
    reveal: { w: 320, rotate: -3, dy: 8 },
  },
  {
    title: 'MARIE',
    slug: 'marie',
    image: 'blue-hour.svg',
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
