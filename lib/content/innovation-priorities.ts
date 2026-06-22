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

export const innovationPriorities: InnovationPriority[] = [
  {
    slug: 'agronomy',
    title: 'Agronomy',
    subtitle: 'Sustainable Farming Innovation',
    description:
      'Developing resilient crop varieties, precision agriculture tools, and sustainable farming practices to support cooperative members.',
    intro:
      'Agronomy is at the foundation of our innovation strategy. Our research teams work alongside 12,000+ cooperative member farmers to develop high-yield, disease-resistant beet varieties, optimise irrigation and fertilisation through precision agriculture, and implement regenerative farming practices that improve soil health while maintaining productivity.',
    highlights: [
      'High-yield, disease-resistant variety development',
      'Precision agriculture and satellite-guided farming',
      'Cover crop and soil health programmes',
      'Reduced-input farming methodologies',
      'Climate change adaptation strategies',
    ],
    stats: [
      { value: '12,000+', label: 'Partner farmers' },
      { value: '50+', label: 'Beet varieties tested annually' },
      { value: '15%', label: 'Yield improvement (decade)' },
    ],
    image: TEREOS_PHOTOS.agriculture,
    icon: '🌱',
  },
  {
    slug: 'industrial-process',
    title: 'Industrial Process',
    subtitle: 'Factory Efficiency & Optimisation',
    description:
      'Optimising extraction, crystallisation, and distillation processes to maximise yield, reduce energy use, and improve product quality.',
    intro:
      'Continuous improvement of our industrial processes drives both economic competitiveness and environmental performance. Our R&D engineers work on extraction efficiency, energy recovery systems, water recycling, and digital process control to push the boundaries of what\'s possible in sugar, starch, and ethanol production.',
    highlights: [
      'Extraction efficiency optimisation',
      'Digital process control and automation',
      'Heat recovery and energy integration',
      'Water recycling and zero-discharge systems',
      'Quality prediction through AI/ML models',
    ],
    stats: [
      { value: '99.8%', label: 'Raw material valorisation' },
      { value: '30+', label: 'Process patents' },
      { value: '€50M+', label: 'Annual process investment' },
    ],
    image: TEREOS_PHOTOS.factory,
    icon: '⚙️',
  },
  {
    slug: 'energy',
    title: 'Energy',
    subtitle: 'Renewable Energy & Biogas',
    description:
      'Advancing biogas, biomass, and cogeneration technologies for carbon-neutral industrial operations and renewable energy supply.',
    intro:
      'Energy innovation is central to our decarbonisation strategy. We develop next-generation biogas plants, optimise bagasse cogeneration efficiency, and explore hydrogen production from biomass. Our goal is to make all Tereos industrial sites energy self-sufficient through renewable sources by 2035.',
    highlights: [
      'Biogas production from agricultural residues',
      'High-efficiency bagasse cogeneration',
      'Biomass-to-hydrogen pilot projects',
      'Carbon capture and utilisation research',
      'Grid-scale renewable electricity export',
    ],
    stats: [
      { value: '53%', label: 'Renewable energy share' },
      { value: '16', label: 'Cogeneration sites' },
      { value: '2035', label: 'Self-sufficiency target' },
    ],
    image: TEREOS_PHOTOS.renewable,
    icon: '⚡',
  },
  {
    slug: 'green-chemicals',
    title: 'Green Chemicals',
    subtitle: 'Plant-Based Chemistry',
    description:
      'Developing bio-based alternatives to fossil-derived chemicals, solvents, and materials from renewable agricultural feedstocks.',
    intro:
      'Green chemistry represents a major growth frontier for Tereos. By converting sugars, starches, and alcohols into bio-based building blocks, we enable customers to replace petroleum-derived chemicals with renewable alternatives. Our research spans bio-solvents, bio-plastics precursors, and specialty chemicals for diverse industrial applications.',
    highlights: [
      'Bio-based solvent development',
      'Renewable polymer and plastic precursors',
      'Fermentation-derived specialty chemicals',
      'Life-cycle assessment and eco-design',
      'Collaborative R&D with chemical industry partners',
    ],
    stats: [
      { value: '20+', label: 'Bio-chemical products' },
      { value: '8', label: 'Industry partnerships' },
      { value: '40%', label: 'CO₂ reduction vs fossil' },
    ],
    image: TEREOS_PHOTOS.laboratory,
    icon: '🧪',
  },
  {
    slug: 'pharmacy',
    title: 'Pharmacy',
    subtitle: 'Pharmaceutical-Grade Ingredients',
    description:
      'Producing high-purity sugars, alcohols, and excipients meeting stringent pharmaceutical regulatory requirements.',
    intro:
      'Our pharmaceutical innovation programme focuses on developing and qualifying excipients, carriers, and active ingredient bases that meet the most demanding pharmacopoeia standards. From pharmaceutical-grade sucrose to specialty alcohols, Tereos serves the pharmaceutical industry with traceable, high-purity ingredients backed by rigorous quality systems.',
    highlights: [
      'Pharmacopoeia-compliant excipient development',
      'High-purity alcohol grades for pharmaceutical use',
      'Controlled-release carrier technologies',
      'GMP-aligned quality management systems',
      'Regulatory documentation and support',
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
    subtitle: 'Functional Ingredients for Wellbeing',
    description:
      'Creating functional ingredients, dietary fibres, and nutritional solutions that support health-conscious food innovation.',
    intro:
      'Consumer demand for healthier, cleaner-label foods drives our nutrition and health R&D. We develop functional ingredients — from resistant starches and dietary fibres to low-glycaemic sweeteners — that help food manufacturers reformulate products for better nutritional profiles without compromising taste or texture.',
    highlights: [
      'Low-glycaemic and reduced-sugar solutions',
      'Dietary fibre enrichment ingredients',
      'Resistant starch for gut health',
      'Clean-label texturising agents',
      'Nutritional profiling and reformulation support',
    ],
    stats: [
      { value: '30+', label: 'Functional ingredients' },
      { value: '100+', label: 'Customer formulations' },
      { value: '5', label: 'Clinical study partnerships' },
    ],
    image: TEREOS_PHOTOS.food,
    icon: '🥗',
  },
  {
    slug: 'customer-innovation-centre',
    title: 'Customer Innovation Centre',
    subtitle: 'Collaborative Innovation Lab',
    description:
      'A dedicated facility where customers and Tereos experts co-develop tailored ingredient solutions and new product formulations.',
    intro:
      'Our Customer Innovation Centre in Singapore brings together food scientists, application technologists, and customer R&D teams in a state-of-the-art facility. Here, we co-develop custom formulations, test new ingredient applications, and accelerate time-to-market for innovative food and beverage products targeting Asian and global markets.',
    highlights: [
      'Pilot-scale formulation and testing',
      'Sensory analysis and consumer testing',
      'Application-specific ingredient optimisation',
      'Rapid prototyping for new product development',
      'Regional market insight and trend analysis',
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
