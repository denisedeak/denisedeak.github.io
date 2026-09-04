export const site = {
  /** Shown as the oversized wordmark in the header. */
  name: 'NISE STUDIO',
  tagline: 'Brand & web design studio',
  description:
    'Independent brand and web design studio working across lifestyle, fashion and beauty.',
  /** Filename inside public/images/ — swap for your own photo (.jpg/.webp/.png). */
  heroImage: 'denise-website-main-background.png',
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
  { label: 'about', href: '/about' },
  { label: 'play', href: '/#projects' },
  { label: 'contact', href: '/about#contact' },
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
