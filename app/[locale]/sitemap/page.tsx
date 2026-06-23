
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/shared/page-hero';
import { HtmlSitemapView } from '@/components/sitemap/html-sitemap-view';
import { buildHtmlSitemapSections } from '@/lib/seo/html-sitemap';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.sitemap' });
  return { title: t('title'), description: t('description') };
}

export default async function SitemapPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.sitemap' });
  const navT = await getTranslations({ locale, namespace: 'navigation' });
  const legalT = await getTranslations({ locale, namespace: 'pages.legal' });
  const irT = await getTranslations({ locale, namespace: 'pages.ir' });

  const sections = await buildHtmlSitemapSections(locale, {
    home: navT('home'),
    contact: navT('contact'),
    search: navT('search'),
    about: navT('about'),
    governance: navT('governance'),
    businesses: navT('businesses'),
    sugar: navT('navBusiness.sugar'),
    bioenergy: navT('navBusiness.bioenergy'),
    agriculture: navT('navBusiness.agriculture'),
    food: navT('navBusiness.food'),
    renewable: navT('navBusiness.renewable'),
    products: navT('products'),
    marketsOverview: navT('navDesc.marketsOverview'),
    productLinesOverview: navT('navDesc.productLinesOverview'),
    consumerBrands: navT('consumerBrands'),
    sustainability: navT('sustainability'),
    investors: navT('investors'),
    annualResults: irT('sections.annual-results.title'),
    regulatedInfo: irT('sections.regulated-information.title'),
    financialCalendar: irT('sections.financial-calendar.title'),
    irPresentations: irT('sections.presentations.title'),
    news: navT('news'),
    pressContact: navT('pressContact'),
    careers: navT('careers'),
    global: navT('global'),
    innovation: navT('innovation'),
    downloads: navT('downloads'),
    privacy: legalT('privacy'),
    cookies: legalT('cookies'),
    terms: legalT('terms'),
    accessibility: legalT('accessibility'),
    sectionMain: t('sectionMain'),
    sectionAbout: t('sectionAbout'),
    sectionBusinesses: t('sectionBusinesses'),
    sectionProducts: t('sectionProducts'),
    sectionNews: t('sectionNews'),
    sectionResources: t('sectionResources'),
    sectionLegal: t('sectionLegal'),
  });

  return (
    <>
      <PageHero
        eyebrow="Tereos"
        title={t('title')}
        description={t('description')}
      />
      <section className="py-section bg-neutral-50">
        <div className="container-custom">
          <HtmlSitemapView
            sections={sections}
            xmlLabel={t('xmlLink')}
            browseLabel={t('browseLabel')}
            openXmlLabel={t('openXml')}
          />
        </div>
      </section>
    </>
  );
}
