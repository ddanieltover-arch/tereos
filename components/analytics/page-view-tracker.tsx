'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pushDataLayerEvent } from '@/components/analytics/google-tag-manager';
import { trackPageView } from '@/components/analytics/google-analytics';

function PageViewTrackerInner({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!enabled) return;

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    trackPageView(url);
    pushDataLayerEvent('page_view', { page_path: url });
  }, [pathname, searchParams, enabled]);

  return null;
}

export function PageViewTracker({ enabled = true }: { enabled?: boolean }) {
  if (!enabled) return null;

  return (
    <Suspense fallback={null}>
      <PageViewTrackerInner enabled={enabled} />
    </Suspense>
  );
}
