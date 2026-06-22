import { markets, productLines } from '@/lib/content/taxonomy';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export interface NavLink {
  labelKey: string;
  href: string;
  descriptionKey?: string;
}

export interface NavFeatured {
  titleKey: string;
  descriptionKey: string;
  href: string;
  image: string;
}

export interface MegaMenuItem {
  labelKey: string;
  href: string;
  columns?: NavLink[][];
  featured?: NavFeatured;
}

export const primaryNav: MegaMenuItem[] = [
  {
    labelKey: 'about',
    href: '/about',
    columns: [
      [
        { labelKey: 'about', href: '/about', descriptionKey: 'navDesc.about' },
        { labelKey: 'strategy', href: '/about/strategy', descriptionKey: 'navDesc.strategy' },
        { labelKey: 'purpose', href: '/about/our-purpose', descriptionKey: 'navDesc.purpose' },
        { labelKey: 'history', href: '/about/history', descriptionKey: 'navDesc.history' },
      ],
      [
        { labelKey: 'governance', href: '/about/governance', descriptionKey: 'navDesc.governance' },
        { labelKey: 'global', href: '/global-presence', descriptionKey: 'navDesc.global' },
        { labelKey: 'innovation', href: '/innovation', descriptionKey: 'navDesc.innovation' },
      ],
    ],
    featured: {
      titleKey: 'navFeatured.about.title',
      descriptionKey: 'navFeatured.about.description',
      href: '/about',
      image: TEREOS_PHOTOS.field,
    },
  },
  {
    labelKey: 'businesses',
    href: '/our-businesses',
    columns: [
      [
        { labelKey: 'navBusiness.sugar', href: '/our-businesses/sugar' },
        { labelKey: 'navBusiness.bioenergy', href: '/our-businesses/bioenergy' },
        { labelKey: 'navBusiness.agriculture', href: '/our-businesses/agriculture' },
      ],
      [
        { labelKey: 'navBusiness.food', href: '/our-businesses/food-ingredients' },
        { labelKey: 'navBusiness.renewable', href: '/our-businesses/renewable-solutions' },
        { labelKey: 'businesses', href: '/our-businesses', descriptionKey: 'navDesc.businessesOverview' },
      ],
    ],
    featured: {
      titleKey: 'navFeatured.businesses.title',
      descriptionKey: 'navFeatured.businesses.description',
      href: '/our-businesses',
      image: TEREOS_PHOTOS.agriculture,
    },
  },
  {
    labelKey: 'products',
    href: '/products',
    columns: [
      [
        { labelKey: 'products', href: '/products', descriptionKey: 'navDesc.products' },
        { labelKey: 'rawMaterials', href: '/products/raw-materials', descriptionKey: 'navDesc.rawMaterials' },
        { labelKey: 'navDesc.marketsOverview', href: '/products/markets' },
        ...markets.slice(0, 3).map((market) => ({
          labelKey: market.labelKey,
          href: `/products/markets/${market.slug}`,
        })),
      ],
      [
        { labelKey: 'navDesc.productLinesOverview', href: '/products/product-lines' },
        { labelKey: 'consumerBrands', href: '/consumer-brands', descriptionKey: 'navDesc.consumerBrands' },
        ...productLines.slice(0, 3).map((line) => ({
          labelKey: line.labelKey,
          href: `/products/product-lines/${line.slug}`,
        })),
        { labelKey: 'downloads', href: '/download-center' },
        { labelKey: 'quality', href: '/products/quality', descriptionKey: 'navDesc.quality' },
      ],
    ],
    featured: {
      titleKey: 'navFeatured.products.title',
      descriptionKey: 'navFeatured.products.description',
      href: '/products',
      image: TEREOS_PHOTOS.food,
    },
  },
  {
    labelKey: 'sustainability',
    href: '/sustainability',
    columns: [
      [
        { labelKey: 'sustainability', href: '/sustainability' },
        { labelKey: 'cultivateNetZero', href: '/cultivate-net-zero', descriptionKey: 'navDesc.cultivateNetZero' },
      ]
    ],
    featured: {
      titleKey: 'navFeatured.sustainability.title',
      descriptionKey: 'navFeatured.sustainability.description',
      href: '/sustainability',
      image: TEREOS_PHOTOS.sustainability,
    },
  },
  {
    labelKey: 'investors',
    href: '/investor-relations',
    columns: [
      [
        { labelKey: 'investors', href: '/investor-relations' },
        {
          labelKey: 'navDesc.annualResults',
          href: '/investor-relations/annual-results',
        },
        {
          labelKey: 'navDesc.regulatedInfo',
          href: '/investor-relations/regulated-information',
        },
        {
          labelKey: 'navDesc.financialCalendar',
          href: '/investor-relations/financial-calendar',
        },
      ],
      [
        {
          labelKey: 'navDesc.irPresentations',
          href: '/investor-relations/presentations',
        },
        { labelKey: 'governance', href: '/about/governance' },
        { labelKey: 'downloads', href: '/download-center' },
      ],
    ],
  },
  {
    labelKey: 'news',
    href: '/news-media',
    columns: [
      [
        { labelKey: 'news', href: '/news-media', descriptionKey: 'navDesc.news' },
        { labelKey: 'pressContact', href: '/press-contact', descriptionKey: 'navDesc.pressContact' },
        { labelKey: 'downloads', href: '/download-center' },
      ],
    ],
  },
  {
    labelKey: 'careers',
    href: '/careers',
  },
];

export const utilityNav: NavLink[] = [
  { labelKey: 'contact', href: '/contact' },
  { labelKey: 'search', href: '/search' },
];
