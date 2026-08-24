const BASE = import.meta.env.BASE_URL;

/** Prefix an internal path with the configured base (for GitHub Pages project sites). */
export function url(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('#')) {
    return path;
  }
  return `${BASE.replace(/\/$/, '')}/${path.replace(/^\//, '')}`.replace(/\/$/, '') || '/';
}
