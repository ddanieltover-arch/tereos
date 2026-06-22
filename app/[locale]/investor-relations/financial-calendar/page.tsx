
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { FinancialCalendarView } from '@/components/investor/financial-calendar-view';
import { financialCalendarEvents } from '@/lib/content/investor';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.ir.financialCalendar' });
  return { title: t('title'), description: t('description') };
}

export default async function FinancialCalendarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.ir' });
  const tPage = await getTranslations({ locale, namespace: 'pages.ir.financialCalendar' });

  return (
    <>
      <PageHero
        eyebrow={t('title')}
        title={tPage('title')}
        description={tPage('description')}
        dark
      />

      <FinancialCalendarView
        locale={locale}
        events={financialCalendarEvents}
        labels={{
          backLabel: t('backToIr'),
          backHref: `/${locale}/investor-relations`,
          typeResults: tPage('typeResults'),
          typeAgm: tPage('typeAgm'),
          typeDividend: tPage('typeDividend'),
          typePublication: tPage('typePublication'),
          upcoming: tPage('upcoming'),
          past: tPage('past'),
          learnMore: tPage('learnMore'),
        }}
      />
    </>
  );
}
