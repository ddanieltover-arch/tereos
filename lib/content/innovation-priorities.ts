import { TEREOS_PHOTOS } from '@/lib/content/photography';

export const INNOVATION_PRIORITY_SLUGS = [
  'agronomy',
  'industrial-process',
  'energy',
  'green-chemicals',
  'pharmacy',
  'nutrition-health',
  'customer-innovation-centre',
] as const;

export type InnovationPrioritySlug = (typeof INNOVATION_PRIORITY_SLUGS)[number];

export interface InnovationPriority {
  slug: InnovationPrioritySlug;
  title: string;
  subtitle: string;
  description: string;
  intro: string;
  highlights: string[];
  stats: { value: string; label: string }[];
  image: string;
  icon: string;
}

const SHARED_INTRO =
  'We are innovating over the entire value chain to achieve optimal competitiveness by anticipating the needs of our markets — from sustainable agricultural practices to industrial process excellence and customer-facing solutions.';

export const innovationPriorities: InnovationPriority[] = [
  {
    slug: 'agronomy',
    title: 'Agronomy',
    subtitle: 'Sustainable & resilient farming',
    description:
      'Developing agronomic performance through sustainable and resilient practices that protect soil, biodiversity, water and energy use.',
    intro: SHARED_INTRO,
    highlights: [
      'Robotized weeding trials with ecoRobotix at the Tereos Polyculture Farm in Chevrières (Oise, France)',
      'Agro-industrial Operations Centre in Brazil: 11% reduction in fuel consumption per tonne of cane harvested',
      'Connected sugar beet and potato sensors to fine-tune harvest machine settings and crop quality',
      'Variety development, crop rotation and mechanisation for cooperative growers',
      'Regenerative agriculture aligned with the Cultivate Net-Zero customer offer',
    ],
    stats: [
      { value: '10,300+', label: 'Grower partners' },
      { value: '11%', label: 'Fuel reduction (Brazil AOC)' },
      { value: '8', label: 'French sugar factories' },
    ],
    image: TEREOS_PHOTOS.agriculture,
    icon: '🌱',
  },
  {
    slug: 'industrial-process',
    title: 'Industrial Process',
    subtitle: 'Efficiency across our sites',
    description:
      'Optimising extraction, crystallisation and distillation to maximise yield, reduce energy and water consumption, and improve product quality.',
    intro: SHARED_INTRO,
    highlights: [
      'Continuous improvement of extraction and crystallisation efficiency',
      'Digital process control and automation across 38 industrial sites',
      'Heat recovery, water recycling and by-product valorisation (99.8% of raw materials)',
      'Quality prediction and traceability from field to finished product',
      'Standardised reporting through integrated operations centres',
    ],
    stats: [
      { value: '99.8%', label: 'Raw materials valorised' },
      { value: '38', label: 'Industrial sites worldwide' },
      { value: '43M', label: 'Tonnes processed annually' },
    ],
    image: TEREOS_PHOTOS.factory,
    icon: '⚙️',
  },
  {
    slug: 'energy',
    title: 'Energy',
    subtitle: 'Renewable energy & decarbonisation',
    description:
      'Advancing biogas, biomass cogeneration and renewable electricity to decarbonise operations and supply low-carbon energy markets.',
    intro: SHARED_INTRO,
    highlights: [
      'Sustainable Aviation Fuel project with Technip Energies, Airbus and Safran in France',
      'Bagasse and beet pulp cogeneration across sugar and ethanol sites',
      '53% renewable energy share in industrial operations',
      'Biogas production from agricultural residues',
      'Cultivate Net-Zero offer linking field practices to customer decarbonisation goals',
    ],
    stats: [
      { value: '53%', label: 'Renewable energy share' },
      { value: '2nd', label: 'European ethanol producer' },
      { value: 'A-', label: 'CDP climate rating (2026)' },
    ],
    image: TEREOS_PHOTOS.renewable,
    icon: '⚡',
  },
  {
    slug: 'green-chemicals',
    title: 'Green Chemicals',
    subtitle: 'Plant-based chemistry',
    description:
      'Developing bio-based building blocks, solvents and materials from sugars, starches and alcohols to replace fossil-derived chemistry.',
    intro: SHARED_INTRO,
    highlights: [
      'PEF bioplastics partnership with Avantium and LVMH GAÏA for releaf® production in Europe',
      'Bio-based solvents and fermentation-derived specialty chemicals',
      'Life-cycle assessment and eco-design for industrial customers',
      'Green chemistry markets supported by Cultivate Net-Zero traceability',
      'Collaborative R&D with chemical and luxury industry partners',
    ],
    stats: [
      { value: '100%', label: 'Renewable releaf® polymer' },
      { value: '3', label: 'Strategic alliance partners (PEF)' },
      { value: '40%', label: 'CO₂ reduction vs fossil routes' },
    ],
    image: TEREOS_PHOTOS.laboratory,
    icon: '🧪',
  },
  {
    slug: 'pharmacy',
    title: 'Pharmacy',
    subtitle: 'Pharmaceutical-grade ingredients',
    description:
      'High-purity sugars, alcohols and excipients meeting pharmacopoeia standards for pharmaceutical and healthcare applications.',
    intro: SHARED_INTRO,
    highlights: [
      'Pharmacopoeia-compliant excipient development and qualification',
      'High-purity alcohol grades for pharmaceutical and sanitiser markets',
      'GMP-aligned quality management and batch traceability',
      'Regulatory documentation and customer technical support',
      'Controlled-release and carrier technologies from plant-based raw materials',
    ],
    stats: [
      { value: '99.9%', label: 'Purity grades achieved' },
      { value: '3', label: 'Pharma-certified facilities' },
      { value: '50+', label: 'Pharmaceutical customers' },
    ],
    image: TEREOS_PHOTOS.marketPharma,
    icon: '💊',
  },
  {
    slug: 'nutrition-health',
    title: 'Nutrition & Health',
    subtitle: 'Functional ingredients',
    description:
      'Creating fibres, sweeteners and nutritional solutions — including Actifiber® — that support healthier, cleaner-label food innovation.',
    intro: SHARED_INTRO,
    highlights: [
      'Actifiber® — a new corn-based fibre combining pleasure and nutritional balance',
      'Dietary fibres, resistant starches and low-glycaemic sweetening solutions',
      'Reformulation support for food manufacturers worldwide',
      'Clean-label texturising agents from wheat and corn streams',
      'Nutrition & health aligned with CSR pillar on sustainable daily life',
    ],
    stats: [
      { value: 'Actifiber®', label: 'Flagship fibre launch (2025)' },
      { value: '30+', label: 'Functional ingredients' },
      { value: '100+', label: 'Customer formulations supported' },
    ],
    image: TEREOS_PHOTOS.food,
    icon: '🥗',
  },
  {
    slug: 'customer-innovation-centre',
    title: 'Customer Innovation Centre',
    subtitle: 'Co-development with customers',
    description:
      'A dedicated facility where customers and Tereos experts co-develop tailored ingredient solutions and accelerate time-to-market.',
    intro:
      'The Customer Innovation Centre brings together food scientists, application technologists and customer R&D teams to test formulations, run sensory analysis and prototype new products — turning Tereos ingredients into market-ready solutions.',
    highlights: [
      'Pilot-scale formulation and application testing',
      'Sensory analysis and consumer insight sessions',
      'Rapid prototyping for food, beverage and nutrition products',
      'Regional trend analysis for European and export markets',
      'Direct link to Tereos starch, sweetener and fibre portfolios',
    ],
    stats: [
      { value: '200+', label: 'Customer projects per year' },
      { value: '15', label: 'Application specialists' },
      { value: '2018', label: 'Centre established' },
    ],
    image: TEREOS_PHOTOS.innovation,
    icon: '🔬',
  },
];

export function getInnovationPriority(slug: string): InnovationPriority | undefined {
  return innovationPriorities.find((p) => p.slug === slug);
}

export function getOtherPriorities(currentSlug: string): InnovationPriority[] {
  return innovationPriorities.filter((p) => p.slug !== currentSlug);
}

/** Six core innovation priorities shown on the index (excludes Customer Innovation Centre tile count). */
export const innovationCorePriorities = innovationPriorities.filter(
  (p) => p.slug !== 'customer-innovation-centre'
);
