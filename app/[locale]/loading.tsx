
'use client';

import { useTranslations } from 'next-intl';

export default function Loading() {
  const t = useTranslations('common');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-neutral-500">{t('loading')}</p>
      </div>
    </div>
  );
}
