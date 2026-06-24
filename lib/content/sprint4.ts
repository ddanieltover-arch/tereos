import type { DownloadDocument, GlobalLocation, JobPosting, NewsArticle } from '@/types';
import { getFallbackDownloadDocuments } from '@/lib/content/documents';
import { getNewsArchive } from '@/lib/content/news-archive';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

export const fallbackNewsArticles = getNewsArchive();

export const fallbackJobs: JobPosting[] = [
  {
    id: 'j1',
    slug: 'senior-process-engineer',
    title: 'Senior Process Engineer — Bioenergy',
    department: 'engineering',
    location: 'Bangkok, Thailand',
    type: 'full-time',
    description:
      'Lead process optimization for biomass power generation facilities. Requires 8+ years experience in chemical or energy engineering.',
    requirements: ['BSc/MSc in Chemical Engineering', '8+ years bioenergy experience', 'Fluent English'],
    postedAt: '2026-06-01',
    externalId: 'R-10234',
  },
  {
    id: 'j2',
    slug: 'sustainability-analyst',
    title: 'Sustainability Analyst',
    department: 'sustainability',
    location: 'Bangkok, Thailand',
    type: 'full-time',
    description: 'Support ESG reporting, carbon accounting, and sustainability strategy development across global operations.',
    requirements: ['Degree in Environmental Science', 'GRI/TCFD experience', 'Data analysis skills'],
    postedAt: '2026-05-20',
    externalId: 'R-10198',
  },
  {
    id: 'j3',
    slug: 'export-sales-manager',
    title: 'Export Sales Manager — ASEAN',
    department: 'operations',
    location: 'Bangkok, Thailand',
    type: 'full-time',
    description: 'Drive sugar and ethanol export sales across ASEAN markets. Build and maintain key customer relationships.',
    requirements: ['5+ years commodity trading', 'ASEAN market knowledge', 'Thai/English fluency'],
    postedAt: '2026-05-15',
    externalId: 'R-10176',
  },
  {
    id: 'j4',
    slug: 'graduate-program-2026',
    title: 'Graduate Program 2026 — Agriculture',
    department: 'research',
    location: 'Multiple Locations',
    type: 'internship',
    description:
      'Two-year rotational program for recent graduates in agriculture, engineering, or business. Rotations across Thailand, Brazil, and France.',
    requirements: ['Recent graduate (within 2 years)', 'Strong academic record', 'Willingness to travel'],
    postedAt: '2026-04-01',
    externalId: 'R-10045',
  },
  {
    id: 'j5',
    slug: 'financial-controller',
    title: 'Financial Controller',
    department: 'finance',
    location: 'Bangkok, Thailand',
    type: 'full-time',
    description: 'Oversee financial reporting, budgeting, and compliance for Thailand operations. Report to regional CFO.',
    requirements: ['CPA/ACCA qualification', 'IFRS expertise', '10+ years experience'],
    postedAt: '2026-03-28',
    externalId: 'R-10012',
  },
];

export const fallbackDownloads: DownloadDocument[] = getFallbackDownloadDocuments();

export const globalLocations: GlobalLocation[] = [
  { id: 'hq', name: 'Headquarters', type: 'office', country: 'Thailand', city: 'Lampang', coordinates: [99.493, 18.289], description: 'Chomphu, Mueang Lampang District, Lampang 52100' },
  { id: 'th1', name: 'Korat Sugar Mill', type: 'facility', country: 'Thailand', city: 'Nakhon Ratchasima', coordinates: [102.1, 14.97], description: 'Major sugar production facility' },
  { id: 'br1', name: 'Guaíra Operations', type: 'facility', country: 'Brazil', city: 'Guaíra', coordinates: [-50.642, -20.079], description: 'SP-345, 146, Guaíra - SP, 14790-000' },
  { id: 'fr1', name: 'Paris Office', type: 'office', country: 'France', city: 'Paris', coordinates: [2.35, 48.86], description: 'European operations center' },
  { id: 'vn1', name: 'Ho Chi Minh Facility', type: 'facility', country: 'Vietnam', city: 'Ho Chi Minh City', coordinates: [106.63, 10.82], description: 'Southeast Asia processing plant' },
  { id: 'in1', name: 'Mumbai Partner Hub', type: 'partner', country: 'India', city: 'Mumbai', coordinates: [72.88, 19.08], description: 'Distribution partner network' },
  { id: 'jp1', name: 'Tokyo Office', type: 'office', country: 'Japan', city: 'Tokyo', coordinates: [139.69, 35.69], description: 'Asia-Pacific trading desk' },
  { id: 'au1', name: 'Sydney Partner', type: 'partner', country: 'Australia', city: 'Sydney', coordinates: [151.21, -33.87], description: 'Oceania distribution' },
  { id: 'za1', name: 'Johannesburg Office', type: 'office', country: 'South Africa', city: 'Johannesburg', coordinates: [28.05, -26.2], description: 'Africa regional office' },
  { id: 'us1', name: 'Houston Trading', type: 'office', country: 'USA', city: 'Houston', coordinates: [-95.37, 29.76], description: 'Americas commodity trading' },
];

export const innovationProjects = [
  {
    id: 'i1',
    title: 'Sustainable Aviation Fuel in France',
    description:
      'Technip Energies, Airbus, Safran and Tereos are developing a SAF production project leveraging Tereos ethanol and industrial expertise.',
    image: TEREOS_PHOTOS.marketEnergy,
    category: 'Energy',
  },
  {
    id: 'i2',
    title: 'Actifiber®',
    description:
      'A new corn-based fibre designed to combine pleasure and nutritional balance in everyday food products.',
    image: TEREOS_PHOTOS.food,
    category: 'Nutrition',
  },
  {
    id: 'i3',
    title: 'Cultivate Net-Zero',
    description:
      'Customer offer linking regenerative agriculture and decarbonisation from field to finished product — awarded at European level in 2025.',
    image: TEREOS_PHOTOS.field,
    category: 'Sustainability',
  },
  {
    id: 'i4',
    title: 'PEF bioplastics alliance',
    description:
      'Partnership with Avantium and LVMH GAÏA to scale releaf® — a 100% renewable and recyclable plant-based polymer.',
    image: TEREOS_PHOTOS.laboratory,
    category: 'Green Chemistry',
  },
  {
    id: 'i5',
    title: 'Robotized weeding',
    description:
      'Trials with ecoRobotix at the Tereos Polyculture Farm to bring precision weed control to cooperative growers.',
    image: TEREOS_PHOTOS.agriculture,
    category: 'Agronomy',
  },
  {
    id: 'i6',
    title: 'Connected sugar beet',
    description:
      'Sensor devices shaped like beets record harvest impacts so growers can optimise machine settings and crop quality.',
    image: TEREOS_PHOTOS.factory,
    category: 'Agronomy',
  },
];

export const IR_CATEGORIES = ['annual-report', 'ir-document', 'presentation'] as const;

export const DOCUMENT_CATEGORY_LABELS: Record<string, string> = {
  'annual-report': 'Annual Reports',
  'sustainability-report': 'Sustainability Reports',
  brochure: 'Brochures',
  catalog: 'Catalogs',
  certification: 'Certifications',
  presentation: 'Presentations',
  'ir-document': 'IR Documents',
};

export const JOB_DEPARTMENT_LABELS: Record<string, string> = {
  engineering: 'Engineering',
  sustainability: 'Sustainability',
  operations: 'Operations',
  research: 'Research',
  finance: 'Finance',
  marketing: 'Marketing',
  hr: 'Human Resources',
  it: 'IT',
  logistics: 'Logistics',
};
