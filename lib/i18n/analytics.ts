import type { Locale } from '@/lib/i18n/config';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

/** Track language switch (skill step 12 — GA4 / Plausible). */
export function trackLanguageSwitch(from: Locale, to: Locale): void {
  if (typeof window === 'undefined' || from === to) return;

  try {
    window.gtag?.('event', 'language_switch', {
      from_language: from,
      to_language: to,
    });
  } catch {
    /* ignore */
  }

  try {
    window.plausible?.('Language Switch', {
      props: { from, to },
    });
  } catch {
    /* ignore */
  }
}
