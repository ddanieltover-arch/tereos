import { DOCUMENT_ASSETS, type DocumentAsset } from '@/lib/content/documents';
import { TEREOS_PHOTOS } from '@/lib/content/photography';
import { resolveNewsroomType } from '@/lib/content/newsroom';
import type { NewsArticle, NewsroomType } from '@/types';

const IR_IMAGE = TEREOS_PHOTOS.newsInvestor;
const SUSTAINABILITY_IMAGE = TEREOS_PHOTOS.newsSustainability;
const COMMUNITY_IMAGE = TEREOS_PHOTOS.field;
const INNOVATION_IMAGE = TEREOS_PHOTOS.innovation;
const ENERGY_IMAGE = TEREOS_PHOTOS.factory;

const CATEGORY_LABELS: Record<string, string> = {
  'press-release': 'Press Release',
  announcement: 'Announcement',
  news: 'News',
  media: 'Media',
  sustainability: 'Sustainability',
  investor: 'Investor',
  community: 'Community',
};

const MONTH_NAMES: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
};

/** Editorial articles with full body copy — take precedence over registry-derived entries. */
export const CURATED_NEWS_ARTICLES: (NewsArticle & { content: string })[] = [
  {
    id: 'curated-saf-france-2026',
    slug: 'saf-france-technip-airbus-safran',
    title: 'Technip Energies, Airbus, Safran and Tereos join forces to develop a Sustainable Aviation Fuel production project in France',
    excerpt:
      'The partners are working on a Sustainable Aviation Fuel project in France leveraging Tereos industrial and ethanol expertise.',
    content: `Technip Energies, Airbus, Safran and Tereos have joined forces to develop a Sustainable Aviation Fuel (SAF) production project in France.

The initiative aims to scale low-carbon aviation fuel production by combining Tereos expertise in plant-based ethanol and industrial operations with the engineering and aerospace capabilities of its partners.

"Sustainable aviation fuel is a key lever for decarbonising air transport," said Olivier Leducq, Managing Director of Tereos. "This project reflects our ambition to create value from agricultural resources while meeting society's essential needs for renewable energy."

Further details are available in the official press release.`,
    image: ENERGY_IMAGE,
    category: 'Press Release',
    newsroomType: 'press-release',
    publishedAt: '2026-06-09',
    author: 'Corporate Communications',
    pdfUrl: 'https://www.tereos.com/app/uploads/2026/06/pr-tereos-rebound-.pdf',
  },
  {
    id: 'curated-annual-results-2025-26',
    slug: 'annual-results-2025-26',
    title: '2025/26 Annual results',
    excerpt: 'Tereos publishes its annual financial results for the 2025/26 campaign.',
    content: `Tereos has published its 2025/26 annual results, reporting consolidated performance for the full campaign year.

The release covers revenue, EBITDA and net debt, alongside commentary on market conditions across sugar, starch and ethanol activities in Europe, Brazil and other geographies where the cooperative group operates.

Investors and analysts can download the full press release and access related regulated disclosures on the Investor Relations section of tereos.com.`,
    image: IR_IMAGE,
    category: 'Press Release',
    newsroomType: 'press-release',
    publishedAt: '2026-05-28',
    author: 'Investor Relations',
    pdfUrl: 'https://www.tereos.com/app/uploads/2026/05/tereos-2025-26-financial-results-press-release.pdf',
  },
  {
    id: 'curated-tsoi-sale-2026',
    slug: 'tereos-ocean-indien-mascareignes-sale',
    title: 'Tereos Océan Indien announces the sale of its 40% minority stake in La Sucrière des Mascareignes Ltd',
    excerpt:
      'Tereos Océan Indien is divesting its minority stake in La Sucrière des Mascareignes Ltd as part of portfolio optimisation.',
    content: `Tereos Océan Indien has announced the sale of its 40% minority stake in La Sucrière des Mascareignes Ltd.

The transaction forms part of the Group's ongoing review of its international footprint and focus on core cooperative activities.`,
    image: COMMUNITY_IMAGE,
    category: 'Press Release',
    newsroomType: 'press-release',
    publishedAt: '2026-03-26',
    author: 'Corporate Communications',
    pdfUrl: 'https://www.tereos.com/app/uploads/2026/03/pr-tereos-tsoi-operation.pdf',
  },
  {
    id: 'curated-brazil-footprint-2026',
    slug: 'brazil-industrial-footprint-optimisation',
    title: 'Tereos optimises its industrial footprint in Brazil by divesting one of its six production sites',
    excerpt:
      'Portfolio adjustment in Brazil to strengthen the competitiveness of remaining industrial assets.',
    content: `Tereos is optimising its industrial footprint in Brazil through the divestment of one of its six production sites.

The move is intended to improve the efficiency and competitiveness of the Group's Brazilian operations while maintaining its commitment to grower partners and local markets.`,
    image: ENERGY_IMAGE,
    category: 'Press Release',
    newsroomType: 'press-release',
    publishedAt: '2026-01-30',
    author: 'Corporate Communications',
    pdfUrl: 'https://www.tereos.com/app/uploads/2026/01/pr-tereos-brazil-operation.pdf',
  },
  {
    id: 'curated-cdp-rating-2026',
    slug: 'cdp-climate-water-rating-2026',
    title: 'Tereos is awarded an A- rating for climate change and a B rating for water management as part of its CDP assessment',
    excerpt:
      'CDP recognises Tereos progress on climate action and water stewardship in its latest assessment.',
    content: `Tereos has been awarded an A- rating for climate change and a B rating for water management in the latest CDP assessment.

The ratings reflect the Group's commitments under its CSR roadmap, including decarbonisation, water efficiency and sustainable agriculture programmes across its cooperative operations.`,
    image: SUSTAINABILITY_IMAGE,
    category: 'Press Release',
    newsroomType: 'press-release',
    publishedAt: '2026-01-20',
    author: 'ESG Team',
    pdfUrl: 'https://www.tereos.com/app/uploads/2026/01/cp-tereos-cdp-rating.pdf',
  },
  {
    id: 'curated-half-year-2025-26',
    slug: 'half-year-results-2025-26',
    title: '2025/26 half-year accounts: results in line with forecasts in a market with prices falling sharply',
    excerpt: 'Interim results published for the first half of the 2025/26 campaign.',
    content: `Tereos has published its 2025/26 half-year accounts, with results in line with forecasts against a backdrop of sharply falling market prices.

The interim release provides updated revenue, EBITDA and net debt figures for the first six months of the campaign.`,
    image: IR_IMAGE,
    category: 'Press Release',
    newsroomType: 'press-release',
    publishedAt: '2025-11-21',
    author: 'Investor Relations',
    pdfUrl: 'https://www.tereos.com/app/uploads/2025/11/20251121-pr-tereos-half-year-financial-results.pdf',
  },
  {
    id: 'curated-cultivate-net-zero-award',
    slug: 'cultivate-net-zero-cogeca-award',
    title: "Cultivate Net-Zero, awarded at European level: a source of pride for Tereos",
    excerpt:
      "Tereos' Cultivate Net-Zero offer receives European recognition for linking agriculture and customer decarbonisation.",
    content: `Tereos' Cultivate Net-Zero customer offer has been recognised at European level, receiving an award from COPA-COGECA.

The offer connects regenerative agricultural practices with decarbonisation targets for food and industrial customers — from field to finished product.`,
    image: SUSTAINABILITY_IMAGE,
    category: 'Press Release',
    newsroomType: 'press-release',
    publishedAt: '2025-11-20',
    author: 'Corporate Communications',
    pdfUrl: 'https://www.tereos.com/app/uploads/2025/11/20251120-cp-tereos-cogeca-award.pdf',
  },
  {
    id: 'curated-actifiber-launch',
    slug: 'actifiber-launch',
    title: 'Tereos launches Actifiber®: a new corn-based fibre designed to combine pleasure and nutritional balance',
    excerpt:
      'Actifiber® is a functional corn fibre for food manufacturers seeking cleaner-label nutritional solutions.',
    content: `Tereos has launched Actifiber®, a new corn-based dietary fibre designed to combine pleasure and nutritional balance in everyday food products.

The ingredient supports food manufacturers reformulating products for improved nutritional profiles without compromising taste or texture.`,
    image: INNOVATION_IMAGE,
    category: 'Press Release',
    newsroomType: 'press-release',
    publishedAt: '2025-11-13',
    author: 'Corporate Communications',
    pdfUrl: 'https://www.tereos.com/app/uploads/2025/11/tereos-cp-actifiber-en.pdf',
  },
  {
    id: 'curated-bioplastics-pef',
    slug: 'bioplastics-avantium-lvmh-pef',
    title: 'Bioplastics: Tereos partners with Avantium and LVMH to develop PEF production in Europe',
    excerpt:
      'Strategic alliance to scale releaf® — a 100% renewable and recyclable plant-based polymer.',
    content: `Tereos has signed Memoranda of Understanding with Avantium to accelerate industrial production of PEF (polyethylene furanoate), marketed as releaf® — a 100% renewable and recyclable polymer.

The alliance brings together Avantium, Tereos and LVMH GAÏA to develop bio-based plastics derived from plant resources, contributing to the transition away from fossil-based materials.

"We are proud to strengthen our collaboration with LVMH and Avantium," said Olivier Leducq, CEO of Tereos. "Our partnership marks a new step in the development of sustainable solutions for green chemistry markets."`,
    image: INNOVATION_IMAGE,
    category: 'News',
    newsroomType: 'news',
    publishedAt: '2025-09-23',
    author: 'Innovation Team',
  },
];

function isArchiveDocument(asset: DocumentAsset): boolean {
  if (asset.category !== 'ir-document') return false;

  const haystack = `${asset.id} ${asset.title} ${asset.filename}`.toLowerCase();

  const excluded = [
    'prospectus',
    'euroclear',
    'disclosure document',
    'offer-announcement',
    'bond-placement',
    'subordinated-securities',
    'tap-prospectus',
    'presentation',
  ];
  if (excluded.some((term) => haystack.includes(term))) return false;

  const included = [
    'press',
    'press-release',
    'results-release',
    'results release',
    'communication-to-bondholders',
    'bondholders',
    'annual-results',
    'half-year',
    'financial-results',
    'notice-to-the-market',
    'cp-tereos',
    'cp-en-tereos',
    'release-',
    '/pr-',
    'financial release',
  ];

  return included.some((term) => haystack.includes(term));
}

function inferPublishedAt(asset: DocumentAsset): string {
  const filenameDate = asset.filename.match(/(?:^|[^0-9])(20\d{2})(\d{2})(\d{2})(?:[^0-9]|$)/);
  if (filenameDate) {
    return `${filenameDate[1]}-${filenameDate[2]}-${filenameDate[3]}`;
  }

  const titleDate = asset.title.match(
    /(\d{1,2})\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d{2})/i
  );
  if (titleDate) {
    const month = String(MONTH_NAMES[titleDate[2].toLowerCase()]).padStart(2, '0');
    const day = titleDate[1].padStart(2, '0');
    return `${titleDate[3]}-${month}-${day}`;
  }

  const yearMonth = asset.filename.match(/(20\d{2})(\d{2})(\d{2})/);
  if (yearMonth) {
    return `${yearMonth[1]}-${yearMonth[2]}-${yearMonth[3]}`;
  }

  if (asset.title.toLowerCase().includes('half-year') || asset.title.toLowerCase().includes('h1')) {
    return `${asset.year - 1}-11-21`;
  }
  if (asset.title.toLowerCase().includes('q1')) {
    return `${asset.year}-04-22`;
  }
  if (asset.title.toLowerCase().includes('q3')) {
    return `${asset.year}-01-28`;
  }
  if (asset.title.toLowerCase().includes('annual') || asset.title.toLowerCase().includes('full year')) {
    return `${asset.year}-06-12`;
  }

  return `${asset.year}-06-15`;
}

function mapDocumentCategory(asset: DocumentAsset): string {
  const haystack = asset.title.toLowerCase();
  if (
    haystack.includes('result') ||
    haystack.includes('bond') ||
    haystack.includes('financial') ||
    haystack.includes('outlook')
  ) {
    return 'investor';
  }
  if (
    haystack.includes('sustain') ||
    haystack.includes('cdp') ||
    haystack.includes('carbon') ||
    haystack.includes('net zero') ||
    haystack.includes('cogeca') ||
    haystack.includes('fret21')
  ) {
    return 'sustainability';
  }
  if (haystack.includes('river') || haystack.includes('community') || haystack.includes('farmer')) {
    return 'community';
  }
  if (haystack.includes('innovation') || haystack.includes('alliance') || haystack.includes('partnership')) {
    return 'announcement';
  }
  return 'press-release';
}

function pickImage(categoryKey: string, asset: DocumentAsset): string {
  if (asset.coverImage) return asset.coverImage;
  switch (categoryKey) {
    case 'sustainability':
      return SUSTAINABILITY_IMAGE;
    case 'community':
      return COMMUNITY_IMAGE;
    case 'announcement':
      return INNOVATION_IMAGE;
    case 'investor':
      return IR_IMAGE;
    default:
      return ENERGY_IMAGE;
  }
}

function buildExcerpt(title: string): string {
  const cleaned = title.replace(/\s*—\s*Press Release$/i, '').trim();
  return `Official Tereos communication: ${cleaned}. Download the full PDF for complete details.`;
}

function buildBody(title: string): string {
  const subject = title.replace(/\s*—\s*Press Release$/i, '').trim();
  return `${subject}

Tereos Açúcar e Energia S.A. has published an official communication regarding ${subject.toLowerCase()}. The document provides detailed information for investors, media, and stakeholders.

The full release is available for download in PDF format. This communication may contain forward-looking statements subject to risks and uncertainties described in Tereos regulatory filings.`;
}

function documentToNewsArticle(asset: DocumentAsset): NewsArticle & { content: string } {
  const categoryKey = mapDocumentCategory(asset);
  const category = CATEGORY_LABELS[categoryKey] || categoryKey;
  const newsroomType: NewsroomType = resolveNewsroomType(categoryKey);

  return {
    id: asset.id,
    slug: asset.id,
    title: asset.title.replace(/\s*—\s*Press Release$/i, '').trim(),
    excerpt: buildExcerpt(asset.title),
    content: buildBody(asset.title),
    image: pickImage(categoryKey, asset),
    category,
    newsroomType,
    publishedAt: inferPublishedAt(asset),
    author: newsroomType === 'press-release' ? 'Corporate Communications' : 'Tereos Newsroom',
    pdfUrl: asset.path,
  };
}

export function buildNewsArchiveFromDocuments(): (NewsArticle & { content: string })[] {
  return DOCUMENT_ASSETS.filter(isArchiveDocument).map(documentToNewsArticle);
}

export function getNewsArchive(): (NewsArticle & { content: string })[] {
  const curatedSlugs = new Set(CURATED_NEWS_ARTICLES.map((article) => article.slug));
  const derived = buildNewsArchiveFromDocuments().filter(
    (article) => !curatedSlugs.has(article.slug)
  );

  return [...CURATED_NEWS_ARTICLES, ...derived].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getNewsArchiveSlugs(): string[] {
  return getNewsArchive().map((article) => article.slug);
}

export function getNewsArchiveStats(articles: NewsArticle[]) {
  const pressReleases = articles.filter((a) => a.newsroomType === 'press-release').length;
  const years = Array.from(
    new Set(articles.map((a) => new Date(a.publishedAt).getFullYear()))
  ).sort((a, b) => b - a);

  return {
    total: articles.length,
    pressReleases,
    news: articles.length - pressReleases,
    years,
  };
}

export function filterArticlesByYear(articles: NewsArticle[], year: string): NewsArticle[] {
  if (year === 'all') return articles;
  const target = Number(year);
  return articles.filter((a) => new Date(a.publishedAt).getFullYear() === target);
}

export interface SanityNewsSeedEntry {
  slug: string;
  category: string;
  publishedAt: string;
  title: { en: string; th: string; ptBr: string };
  excerpt: { en: string; th: string; ptBr: string };
  body: { en: string; th: string; ptBr: string };
  imageUrl: string;
  author?: string;
  pdfUrl?: string;
  featured?: boolean;
}

export function getNewsArchiveForSanitySeed(): SanityNewsSeedEntry[] {
  return getNewsArchive().map((article, index) => {
    const categoryKey = Object.entries(CATEGORY_LABELS).find(
      ([, label]) => label === article.category
    )?.[0] || 'press-release';

    return {
      slug: article.slug,
      category: categoryKey,
      publishedAt: `${article.publishedAt}T09:00:00Z`,
      title: { en: article.title, th: article.title, ptBr: article.title },
      excerpt: { en: article.excerpt, th: article.excerpt, ptBr: article.excerpt },
      body: { en: article.content, th: article.content, ptBr: article.content },
      imageUrl: article.image,
      author: article.author,
      pdfUrl: article.pdfUrl,
      featured: index < 3,
    };
  });
}
