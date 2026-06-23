
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { BusinessCardsSection } from '@/components/sections/business-cards-section';
import { ProductsShowcase } from '@/components/sections/products-showcase';
import { GlobalReachSection } from '@/components/sections/global-reach-section';
import { SustainabilityHighlights } from '@/components/sections/sustainability-highlights';
import { InnovationSpotlight } from '@/components/sections/innovation-spotlight';
import { LatestNews } from '@/components/sections/latest-news';
import { InvestorSnapshot } from '@/components/sections/investor-snapshot';
import { CareersCTA } from '@/components/sections/careers-cta';
import { ContactCTA } from '@/components/sections/contact-cta';
import { getHomePageContent } from '@/lib/sanity/fetch';
import { getNewsArchive } from '@/lib/content/news-archive';
import { globalLocations } from '@/lib/content/sprint4';
import { DIVISION_PHOTOS } from '@/lib/content/photography';
import { getAlternateLanguages, getCanonicalUrl } from '@/lib/seo/metadata';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: getCanonicalUrl(locale),
      languages: getAlternateLanguages(),
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const globalT = await getTranslations({ locale, namespace: 'pages.global' });
  const cms = await getHomePageContent(locale);
  const fallbackNews = getNewsArchive().slice(0, 3);

  const fallbackBusinesses = [
    {
      title: t('businesses.sugar.title'),
      description: t('businesses.sugar.description'),
      image: DIVISION_PHOTOS.sugar,
      href: `/${locale}/our-businesses/sugar`,
    },
    {
      title: t('businesses.bioenergy.title'),
      description: t('businesses.bioenergy.description'),
      image: DIVISION_PHOTOS.bioenergy,
      href: `/${locale}/our-businesses/bioenergy`,
    },
    {
      title: t('businesses.agriculture.title'),
      description: t('businesses.agriculture.description'),
      image: DIVISION_PHOTOS.agriculture,
      href: `/${locale}/our-businesses/agriculture`,
    },
    {
      title: t('businesses.food.title'),
      description: t('businesses.food.description'),
      image: DIVISION_PHOTOS['food-ingredients'],
      href: `/${locale}/our-businesses/food-ingredients`,
    },
    {
      title: t('businesses.renewable.title'),
      description: t('businesses.renewable.description'),
      image: DIVISION_PHOTOS['renewable-solutions'],
      href: `/${locale}/our-businesses/renewable-solutions`,
    },
  ];

  return (
    <>
      <HeroSection />

      <StatsSection
        title={t('overview.title')}
        description={t('overview.description')}
        stats={[
          { display: t('overview.stats.sugarValue'), label: t('overview.stats.sugar') },
          { display: t('overview.stats.countriesValue'), label: t('overview.stats.countries') },
          { display: t('overview.stats.employeesValue'), label: t('overview.stats.employees') },
          { display: t('overview.stats.revenueValue'), label: t('overview.stats.revenue') },
        ]}
      />

      <BusinessCardsSection
        title={t('businesses.title')}
        description={t('businesses.description')}
        businesses={cms.businesses ?? fallbackBusinesses}
      />

      <ProductsShowcase locale={locale} products={cms.products ?? undefined} />

      <GlobalReachSection
        locale={locale}
        locations={globalLocations}
        labels={{
          eyebrow: t('global.eyebrow'),
          title: t('global.title'),
          description: t('global.description'),
          cta: t('global.cta'),
          offices: globalT('offices'),
          facilities: globalT('facilities'),
          partners: globalT('partners'),
          countries: globalT('countries'),
          selectLocation: globalT('selectLocation'),
          filterAll: globalT('filterAll'),
          typeOffice: globalT('typeOffice'),
          typeFacility: globalT('typeFacility'),
          typePartner: globalT('typePartner'),
        }}
      />

      <SustainabilityHighlights
        title={t('sustainability.title')}
        description={t('sustainability.description')}
        metrics={[
          { label: t('sustainability.metrics.carbon'), value: 35, suffix: '%', target: 50 },
          { label: t('sustainability.metrics.water'), value: 28, suffix: '%', target: 40 },
          { label: t('sustainability.metrics.energy'), value: 65, suffix: '%', target: 80 },
          { label: t('sustainability.metrics.community'), value: 12, prefix: '$', suffix: 'M', target: 20 },
        ]}
        cta={{ label: t('sustainability.cta'), href: `/${locale}/sustainability` }}
      />

      <InnovationSpotlight locale={locale} />

      <LatestNews
        title={t('news.title')}
        articles={cms.news ?? fallbackNews}
        cta={{ label: t('news.cta'), href: `/${locale}/news-media` }}
        locale={locale}
      />

      <InvestorSnapshot
        title={t('investors.title')}
        description={t('investors.description')}
        cta={{ label: t('investors.cta'), href: `/${locale}/investor-relations` }}
        reports={[
          {
            title: 'Annual results 2025/26',
            year: 2026,
            url: `/${locale}/news-media/annual-results-2025-26`,
          },
          {
            title: 'Half-year accounts 2025/26',
            year: 2025,
            url: `/${locale}/news-media/half-year-results-2025-26`,
          },
          {
            title: 'Regulated information',
            year: 2026,
            url: `/${locale}/investor-relations/regulated-information`,
          },
        ]}
      />

      <CareersCTA
        title={t('careers.title')}
        description={t('careers.description')}
        cta={{ label: t('careers.cta'), href: `/${locale}/careers` }}
      />

      <ContactCTA locale={locale} />
    </>
  );
}
