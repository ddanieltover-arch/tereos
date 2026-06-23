
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  const locale = useLocale();
  const t = useTranslations('pages.system');

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <div className="text-center px-4">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
          <Search className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-display-l font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-h3 font-semibold text-neutral-700 mb-4">{t('notFoundTitle')}</h2>
        <p className="text-neutral-500 max-w-md mx-auto mb-8">
          {t('notFoundDescription')}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backHome')}
          </Link>
          <Link
            href={`/${locale}/search`}
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neutral-200 text-neutral-700 font-semibold rounded-full hover:border-primary hover:text-primary transition-colors"
          >
            <Search className="w-4 h-4" />
            {t('search')}
          </Link>
        </div>
      </div>
    </div>
  );
}
