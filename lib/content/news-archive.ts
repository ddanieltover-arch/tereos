import { DOCUMENT_ASSETS, getPressReleasePdfUrl, type DocumentAsset } from '@/lib/content/documents';
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
    id: 'curated-bioenergy-expansion-sea',
    slug: 'bioenergy-expansion-sea',
    title: 'Tereos Announces Major Expansion of Bioenergy Operations in Southeast Asia',
    excerpt:
      'The company invests €200M in new biomass power facilities to support regional renewable energy goals.',
    content: `Tereos Açúcar e Energia S.A. today announced a landmark €200 million investment in expanding its bioenergy operations across Southeast Asia, reinforcing the company's commitment to renewable energy and sustainable agricultural practices.

The investment will fund three new biomass power facilities in Thailand and Vietnam, adding 150 MW of renewable electricity capacity to the regional grid. These facilities will utilize sugarcane bagasse — a byproduct of sugar production — as their primary fuel source, exemplifying Tereos' circular economy approach.

"This expansion represents a significant step in our journey toward carbon neutrality," said Alexandre L. Silva, Chief Executive Officer. "By transforming agricultural waste into clean energy, we are creating value for farmers, communities, and the environment simultaneously."

The projects are expected to create over 2,000 direct and indirect jobs and will be operational by Q4 2027. Tereos has partnered with local governments and international development banks to ensure the facilities meet the highest environmental standards.`,
    image: ENERGY_IMAGE,
    category: 'Press Release',
    newsroomType: 'press-release',
    publishedAt: '2026-06-15',
    author: 'Corporate Communications',
    pdfUrl: getPressReleasePdfUrl('bioenergy-expansion-sea'),
  },
  {
    id: 'curated-sustainability-report-2025',
    slug: 'sustainability-report-2025',
    title: 'Sustainability Report 2025: Record Carbon Reduction Achieved',
    excerpt:
      'Tereos reports a 35% reduction in carbon emissions across all operations, exceeding targets ahead of schedule.',
    content: `Tereos Açúcar e Energia S.A. has published its 2025 Sustainability Report, documenting a 35% reduction in carbon emissions across all global operations — surpassing the company's 2030 interim target five years ahead of schedule.

Key highlights from the report include a 65% renewable energy share in production facilities, 85% water recycling rate, and partnerships with over 5,000 farming families through sustainable agriculture programs.

The report has been prepared in accordance with GRI Standards and aligns with TCFD recommendations. It is available for download in English, Thai, and Portuguese.`,
    image: SUSTAINABILITY_IMAGE,
    category: 'Sustainability',
    newsroomType: 'news',
    publishedAt: '2026-05-28',
    author: 'ESG Team',
    pdfUrl: getPressReleasePdfUrl('sustainability-report-2025'),
  },
  {
    id: 'curated-farmer-partnership-thailand',
    slug: 'farmer-partnership-thailand',
    title: 'Partnership with Thai Farmers Boosts Sustainable Sugarcane Production',
    excerpt:
      'New cooperative program reaches 5,000+ farming families with advanced agricultural training and resources.',
    content: `Tereos has launched its largest farmer partnership program to date, reaching more than 5,000 farming families across Thailand's sugarcane-growing regions with advanced agricultural training, precision farming tools, and fair-trade pricing guarantees.

The program includes soil health monitoring, drip irrigation systems, and access to drought-resistant cane varieties developed through Tereos' R&D center in Bangkok.`,
    image: COMMUNITY_IMAGE,
    category: 'Community',
    newsroomType: 'news',
    publishedAt: '2026-05-10',
    author: 'Community Relations',
  },
  {
    id: 'curated-q1-results-2026',
    slug: 'q1-results-2026',
    title: 'Q1 2026 Results: Strong Performance Across All Divisions',
    excerpt: 'Revenue up 12% year-over-year driven by sugar exports and bioenergy growth.',
    content: `Tereos Açúcar e Energia S.A. reported strong Q1 2026 results with revenue increasing 12% year-over-year to €1.4 billion, driven by robust sugar export volumes and expanding bioenergy revenues.

All five business divisions contributed to growth, with bioenergy showing the strongest performance at 18% revenue increase.`,
    image: IR_IMAGE,
    category: 'Investor',
    newsroomType: 'press-release',
    publishedAt: '2026-04-22',
    author: 'Investor Relations',
    pdfUrl: getPressReleasePdfUrl('q1-results-2026'),
  },
  {
    id: 'curated-innovation-lab-launch',
    slug: 'innovation-lab-launch',
    title: 'New Agricultural Innovation Lab Opens in Bangkok',
    excerpt:
      'State-of-the-art R&D facility focused on precision agriculture and sustainable crop science.',
    content: `Tereos has inaugurated a new Agricultural Innovation Lab in Bangkok, a state-of-the-art R&D facility dedicated to precision agriculture, sustainable crop science, and bioenergy research.

The lab features IoT-enabled field monitoring systems, gene editing research capabilities, and partnerships with leading universities in Thailand, France, and Brazil.`,
    image: INNOVATION_IMAGE,
    category: 'Announcement',
    newsroomType: 'news',
    publishedAt: '2026-03-18',
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
