/** Key public routes audited in CI (English locale). */
export const A11Y_PAGES = [
  '/en',
  '/en/about',
  '/en/about/governance',
  '/en/legal/accessibility',
  '/en/contact',
  '/en/download-center',
  '/en/global-presence',
  '/en/news-media',
  '/en/search',
];

/** Minimum Lighthouse accessibility score (0–100) when using audit:a11y:lighthouse */
export const A11Y_LIGHTHOUSE_MIN_SCORE = Number(process.env.A11Y_LIGHTHOUSE_MIN_SCORE ?? 90);
