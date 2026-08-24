export const site = {
  /** Shown as the oversized wordmark in the header. */
  name: 'STUDIO NORTH',
  tagline: 'Brand & web design studio',
  description:
    'Independent brand and web design studio working across lifestyle, fashion and beauty.',
  /** Filename inside public/images/ — swap for your own photo (.jpg/.webp/.png). */
  heroImage: 'hero.svg',
  email: 'hello@example.com',
  /** Swap for your own scheduling link (Cal.com, Google Calendar appointments, etc.). */
  bookingUrl: 'https://cal.com/',
  social: {
    instagram: 'https://instagram.com/',
    behance: 'https://www.behance.net/',
  },
} as const;

export type NavItem = { label: string; href: string; external?: boolean };

export const nav: NavItem[] = [
  { label: 'select projects', href: '/' },
  { label: 'about / contact', href: '/about' },
  { label: 'book call', href: site.bookingUrl, external: true },
];

export const footerLinks: NavItem[] = [
  { label: 'PROJECTS', href: '/' },
  { label: 'ABOUT / CONTACT', href: '/about' },
  { label: 'BEHANCE', href: site.social.behance, external: true },
  { label: 'INSTAGRAM', href: site.social.instagram, external: true },
  {
    label: site.email.toUpperCase(),
    href: `mailto:${site.email}?subject=Project%20Discussion`,
    external: true,
  },
];
