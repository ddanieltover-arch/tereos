
'use client';

import { useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('pages.system');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center px-4">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <RefreshCw className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-h2 font-bold text-neutral-900 mb-4">{t('errorTitle')}</h2>
        <p className="text-neutral-500 max-w-md mx-auto mb-8">
          {t('errorDescription')}
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          {t('tryAgain')}
        </button>
      </div>
    </div>
  );
}
