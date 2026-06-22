import { divisionExtras, fallbackProducts } from '@/lib/content/pages';
import { markets, productLines } from '@/lib/content/taxonomy';
import { fallbackNewsArticles } from '@/lib/content/sprint4';
import { getSitemapSlugs } from '@/lib/sanity/fetch';

export interface HtmlSitemapLink {
  href: string;
  label: string;
}

export interface HtmlSitemapSection {
  id: string;
  title: string;
  links: HtmlSitemapLink[];
}

export interface HtmlSitemapLabels {
  home: string;
  contact: string;
  search: string;
  about: string;
  governance: string;
  businesses: string;
  sugar: string;
  bioenergy: string;
  agriculture: string;
  food: string;
  renewable: string;
  products: string;
  marketsOverview: string;
  productLinesOverview: string;
  consumerBrands: string;
  sustainability: string;
  investors: string;
  annualResults: string;
  regulatedInfo: string;
  financialCalendar: string;
  irPresentations: string;
  news: string;
  pressContact: string;
  careers: string;
  global: string;
  innovation: string;
  downloads: string;
  privacy: string;
  cookies: string;
  terms: string;
  accessibility: string;
  sectionMain: string;
  sectionAbout: string;
  sectionBusinesses: string;
  sectionProducts: string;
  sectionNews: string;
  sectionResources: string;
  sectionLegal: string;
}

const DIVISION_LABEL_KEYS: Record<string, keyof HtmlSitemapLabels> = {
  sugar: 'sugar',
  bioenergy: 'bioenergy',
  agriculture: 'agriculture',
  'food-ingredients': 'food',
  'renewable-solutions': 'renewable',
};

export async function buildHtmlSitemapSections(
  locale: string,
  labels: HtmlSitemapLabels
): Promise<HtmlSitemapSection[]> {
  const prefix = `/${locale}`;
  const cmsSlugs = await getSitemapSlugs();

  const divisionSlugs = cmsSlugs?.divisions?.length
    ? cmsSlugs.divisions
    : Object.keys(divisionExtras);

  const productSlugs = cmsSlugs?.products?.length
    ? cmsSlugs.products
    : fallbackProducts.map((p) => p.slug);

  const newsArticles = cmsSlugs?.news?.length
    ? cmsSlugs.news.map((a) => ({ slug: a.slug, title: a.slug.replace(/-/g, ' ') }))
    : fallbackNewsArticles.map((a) => ({ slug: a.slug, title: a.title }));

  const productNameBySlug = new Map(fallbackProducts.map((p) => [p.slug, p.name]));

  const main: HtmlSitemapLink[] = [
    { href: prefix, label: labels.home },
    { href: `${prefix}/contact`, label: labels.contact },
    { href: `${prefix}/search`, label: labels.search },
  ];

  const about: HtmlSitemapLink[] = [
    { href: `${prefix}/about`, label: labels.about },
    { href: `${prefix}/about/governance`, label: labels.governance },
  ];

  const businesses: HtmlSitemapLink[] = [
    { href: `${prefix}/our-businesses`, label: labels.businesses },
    ...divisionSlugs.map((slug) => ({
      href: `${prefix}/our-businesses/${slug}`,
      label: labels[DIVISION_LABEL_KEYS[slug] ?? 'businesses'],
    })),
  ];

  const products: HtmlSitemapLink[] = [
    { href: `${prefix}/products`, label: labels.products },
    { href: `${prefix}/products/markets`, label: labels.marketsOverview },
    { href: `${prefix}/products/product-lines`, label: labels.productLinesOverview },
    { href: `${prefix}/consumer-brands`, label: labels.consumerBrands },
    ...markets.map((market) => ({
      href: `${prefix}/products/markets/${market.slug}`,
      label: market.title,
    })),
    ...productLines.map((line) => ({
      href: `${prefix}/products/product-lines/${line.slug}`,
      label: line.title,
    })),
    ...productSlugs.map((slug) => ({
      href: `${prefix}/products/${slug}`,
      label: productNameBySlug.get(slug) ?? slug.replace(/-/g, ' '),
    })),
  ];

  const news: HtmlSitemapLink[] = [
    { href: `${prefix}/news-media`, label: labels.news },
    { href: `${prefix}/press-contact`, label: labels.pressContact },
    ...newsArticles.map((article) => ({
      href: `${prefix}/news-media/${article.slug}`,
      label: article.title,
    })),
  ];

  const resources: HtmlSitemapLink[] = [
    { href: `${prefix}/sustainability`, label: labels.sustainability },
    { href: `${prefix}/investor-relations`, label: labels.investors },
    { href: `${prefix}/investor-relations/annual-results`, label: labels.annualResults },
    { href: `${prefix}/investor-relations/regulated-information`, label: labels.regulatedInfo },
    { href: `${prefix}/investor-relations/financial-calendar`, label: labels.financialCalendar },
    { href: `${prefix}/investor-relations/presentations`, label: labels.irPresentations },
    { href: `${prefix}/careers`, label: labels.careers },
    { href: `${prefix}/global-presence`, label: labels.global },
    { href: `${prefix}/innovation`, label: labels.innovation },
    { href: `${prefix}/download-center`, label: labels.downloads },
  ];

  const legal: HtmlSitemapLink[] = [
    { href: `${prefix}/legal/privacy`, label: labels.privacy },
    { href: `${prefix}/legal/cookies`, label: labels.cookies },
    { href: `${prefix}/legal/terms`, label: labels.terms },
    { href: `${prefix}/legal/accessibility`, label: labels.accessibility },
  ];

  return [
    { id: 'main', title: labels.sectionMain, links: main },
    { id: 'about', title: labels.sectionAbout, links: about },
    { id: 'businesses', title: labels.sectionBusinesses, links: businesses },
    { id: 'products', title: labels.sectionProducts, links: products },
    { id: 'news', title: labels.sectionNews, links: news },
    { id: 'resources', title: labels.sectionResources, links: resources },
    { id: 'legal', title: labels.sectionLegal, links: legal },
  ];
}
