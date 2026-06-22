import { TEREOS_PHOTOS } from '@/lib/content/photography';

export interface DivisionContent {
  slug: string;
  markets: string[];
  capabilities: string[];
  sustainabilityMetrics: { label: string; value: string }[];
  image: string;
}

export const divisionExtras: Record<string, DivisionContent> = {
  sugar: {
    slug: 'sugar',
    markets: ['Food & Beverage', 'Industrial', 'Pharmaceuticals', 'Export Commodities'],
    capabilities: [
      'Cane cultivation and harvesting',
      'Refining and crystallization',
      'Quality certification (ICUMSA)',
      'Global logistics and trading',
    ],
    sustainabilityMetrics: [
      { label: 'Water recycled', value: '85%' },
      { label: 'Bagasse energy recovery', value: '100%' },
    ],
    image: TEREOS_PHOTOS.agriculture,
  },
  bioenergy: {
    slug: 'bioenergy',
    markets: ['Fuel blending', 'Power generation', 'Industrial heat', 'Export markets'],
    capabilities: [
      'Ethanol production',
      'Biomass power plants',
      'Cogeneration systems',
      'Carbon credit programs',
    ],
    sustainabilityMetrics: [
      { label: 'Renewable electricity', value: '65%' },
      { label: 'CO₂ avoided annually', value: '2.1M tons' },
    ],
    image: TEREOS_PHOTOS.factory,
  },
  agriculture: {
    slug: 'agriculture',
    markets: ['Farmer cooperatives', 'Seed distribution', 'Agricultural services', 'Rural development'],
    capabilities: [
      'Sustainable farming programs',
      'Precision agriculture',
      'Farmer training and support',
      'Supply chain traceability',
    ],
    sustainabilityMetrics: [
      { label: 'Farmers partnered', value: '5,000+' },
      { label: 'Organic certified area', value: '12,000 ha' },
    ],
    image: TEREOS_PHOTOS.field,
  },
  'food-ingredients': {
    slug: 'food-ingredients',
    markets: ['Food manufacturing', 'Beverages', 'Confectionery', 'Animal nutrition'],
    capabilities: [
      'Specialty sweeteners',
      'Functional ingredients',
      'Custom formulations',
      'Regulatory compliance support',
    ],
    sustainabilityMetrics: [
      { label: 'Clean label products', value: '40+' },
      { label: 'R&D projects active', value: '18' },
    ],
    image: TEREOS_PHOTOS.food,
  },
  'renewable-solutions': {
    slug: 'renewable-solutions',
    markets: ['Circular economy', 'Bioplastics', 'Green chemicals', 'Waste valorization'],
    capabilities: [
      'Byproduct transformation',
      'Biomass pellet production',
      'Industrial symbiosis',
      'Carbon capture research',
    ],
    sustainabilityMetrics: [
      { label: 'Waste diverted from landfill', value: '95%' },
      { label: 'Circular products launched', value: '8' },
    ],
    image: TEREOS_PHOTOS.renewable,
  },
};

export const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'sugar', label: 'Sugar' },
  { id: 'bioenergy', label: 'Bioenergy' },
  { id: 'food-ingredients', label: 'Food Ingredients' },
  { id: 'renewable', label: 'Renewable Solutions' },
] as const;

export const fallbackProducts = [
  {
    id: '1',
    slug: 'crystal-sugar-icumsa-45',
    name: 'Crystal Sugar ICUMSA 45',
    category: 'sugar',
    categoryLabel: 'Sugar',
    description:
      'Premium refined white sugar meeting international quality standards for food and beverage applications.',
    image: TEREOS_PHOTOS.productSugar,
    specifications: { Purity: '99.8%', ICUMSA: '45', Moisture: '<0.04%' },
    applications: ['Food & Beverage', 'Pharmaceuticals', 'Industrial'],
  },
  {
    id: '2',
    slug: 'fuel-ethanol',
    name: 'Fuel Ethanol',
    category: 'bioenergy',
    categoryLabel: 'Bioenergy',
    description: 'High-purity bioethanol for fuel blending and industrial applications.',
    image: TEREOS_PHOTOS.productBioenergy,
    specifications: { Purity: '99.5%', Standard: 'EN 15376', Blend: 'E10–E85' },
    applications: ['Fuel blending', 'Industrial solvents', 'Export'],
  },
  {
    id: '3',
    slug: 'molasses',
    name: 'Molasses',
    category: 'food-ingredients',
    categoryLabel: 'Food Ingredients',
    description: 'Versatile syrup for animal feed, fermentation, and food processing.',
    image: TEREOS_PHOTOS.productMolasses,
    specifications: { Brix: '82–85%', pH: '5.0–6.5' },
    applications: ['Animal feed', 'Fermentation', 'Food processing'],
  },
  {
    id: '4',
    slug: 'bagasse-pellets',
    name: 'Bagasse Pellets',
    category: 'renewable',
    categoryLabel: 'Renewable Solutions',
    description: 'Sustainable biomass fuel derived from sugarcane fiber.',
    image: TEREOS_PHOTOS.productBiomass,
    specifications: { 'Calorific value': '4,000 kcal/kg', Moisture: '<10%' },
    applications: ['Power generation', 'Industrial heat', 'Export biomass'],
  },
  {
    id: '5',
    slug: 'raw-sugar-vhp',
    name: 'Raw Sugar VHP',
    category: 'sugar',
    categoryLabel: 'Sugar',
    description: 'Very High Pol raw sugar for refining and commodity trading.',
    image: TEREOS_PHOTOS.agriculture,
    specifications: { Pol: '99.3%+', Moisture: '<0.15%' },
    applications: ['Refining', 'Commodity export', 'Industrial'],
  },
  {
    id: '6',
    slug: 'biomass-power',
    name: 'Biomass Power',
    category: 'bioenergy',
    categoryLabel: 'Bioenergy',
    description: 'Renewable electricity from sugarcane bagasse and agricultural residues.',
    image: TEREOS_PHOTOS.marketEnergy,
    specifications: { Capacity: '150 MW', Source: '100% biomass' },
    applications: ['Grid supply', 'Industrial cogeneration', 'Carbon credits'],
  },
];

export interface ESGTab {
  id: string;
  label: string;
  headline: string;
  description: string;
  metrics: { label: string; value: number; target: number; suffix: string }[];
}

export const esgTabs: ESGTab[] = [
  {
    id: 'carbon',
    label: 'Carbon',
    headline: 'Carbon Reduction',
    description:
      'Science-based targets to reduce Scope 1 and 2 emissions across all production facilities.',
    metrics: [
      { label: 'Emissions reduced', value: 35, target: 50, suffix: '%' },
      { label: 'Renewable energy share', value: 65, target: 80, suffix: '%' },
    ],
  },
  {
    id: 'water',
    label: 'Water',
    headline: 'Water Stewardship',
    description: 'Advanced water recycling and watershed protection in cane-growing regions.',
    metrics: [
      { label: 'Water efficiency gain', value: 28, target: 40, suffix: '%' },
      { label: 'Water recycled', value: 85, target: 95, suffix: '%' },
    ],
  },
  {
    id: 'energy',
    label: 'Energy',
    headline: 'Renewable Energy',
    description: 'Bagasse-powered cogeneration and bioethanol production for clean energy transition.',
    metrics: [
      { label: 'Biomass power capacity', value: 150, target: 200, suffix: ' MW' },
      { label: 'Fossil fuel displaced', value: 42, target: 60, suffix: '%' },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    headline: 'Community Impact',
    description: 'Farmer partnerships, education programs, and rural development investments.',
    metrics: [
      { label: 'Farmers supported', value: 5000, target: 8000, suffix: '+' },
      { label: 'Community investment', value: 12, target: 20, suffix: 'M USD' },
    ],
  },
];

export const sustainabilityReports = [
  { title: 'Sustainability Report 2025', year: 2025, category: 'sustainability-report' },
  { title: 'ESG Fact Sheet 2025', year: 2025, category: 'brochure' },
  { title: 'Carbon Reduction Roadmap', year: 2024, category: 'presentation' },
];
