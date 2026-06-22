'use client';

import { ReactNode, useCallback, useState } from 'react';
import { useLocale } from 'next-intl';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from '@/components/analytics/google-tag-manager';
import { PageViewTracker } from '@/components/analytics/page-view-tracker';
import { CookieConsent } from '@/components/analytics/cookie-consent';

interface ProvidersProps {
  children: ReactNode;
  cookieLabels: {
    message: string;
    accept: string;
    decline: string;
    privacy: string;
  };
}

export function Providers({ children, cookieLabels }: ProvidersProps) {
  const locale = useLocale();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  const handleConsentChange = useCallback((accepted: boolean) => {
    setAnalyticsEnabled(accepted);
  }, []);

  const hasAnalytics =
    !!process.env.NEXT_PUBLIC_GA_ID || !!process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      <GoogleTagManagerNoScript enabled={analyticsEnabled} />
      {analyticsEnabled && (
        <>
          <GoogleAnalytics enabled={analyticsEnabled} />
          <GoogleTagManager enabled={analyticsEnabled} />
          <PageViewTracker enabled={analyticsEnabled} />
        </>
      )}
      {children}
      {hasAnalytics && (
        <CookieConsent
          labels={cookieLabels}
          privacyHref={`/${locale}/legal/privacy`}
          onConsentChange={handleConsentChange}
        />
      )}
    </>
  );
}
