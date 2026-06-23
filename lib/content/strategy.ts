export interface StrategySection {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  icon: string;
}

export interface CircularEconomyStat {
  value: string;
  label: string;
}

export const strategyIntro =
  "The agri-foods sector is undergoing a transformation: eating habits are changing, and along with them, so are customers' expectations. At the same time, the deregulation of some markets constitutes a revolution to which Tereos must adapt. We are building a long-term strategy to address this. Our aim is to become a partner to trust for our customers, guaranteeing them the same standards of quality and reliability wherever they operate.";

export const strategySections: StrategySection[] = [
  {
    id: 'market-changes',
    title: 'Supporting Market Changes',
    description:
      'With the end of European sugar quotas and the opening of global markets, Tereos has adapted its strategy to maintain competitiveness. We have achieved critical mass through strategic partnerships and complementary activities, diversifying our revenue base across sugar, starch, and ethanol while expanding our geographical footprint to reduce market concentration risk.',
    highlights: [
      'Post-quota market adaptation and diversification',
      'Strategic acquisitions for critical mass',
      'Multi-crop, multi-product business model',
      'Geographic risk diversification across 14 countries',
    ],
    icon: '📊',
  },
  {
    id: 'value-chain',
    title: 'Cultivating Excellence Throughout the Whole Value Chain',
    description:
      'From the field to the end product, Tereos supports excellence at every stage. Our agronomists advise cooperative member farmers on variety selection, soil management, and sustainable practices. Our commercial, operational, and industrial teams drive competitiveness through process optimisation, quality assurance, and customer intimacy.',
    highlights: [
      'Agronomic advice for 12,000+ cooperative farmers',
      'Continuous industrial process optimisation',
      'Commercial and operational competitiveness',
      'End-to-end quality assurance and traceability',
    ],
    icon: '🌾',
  },
  {
    id: 'circular-economy',
    title: 'Responding Through a Circular Economy Model',
    description:
      'Tereos responds to economic and societal challenges through a virtuous circle of agricultural transformation. We add value to 99.8% of raw materials processed, generate 53% of our energy from renewable sources, and continuously reuse water in our industrial processes. This circular model transforms every fraction of the plant into useful products — from food and fuel to fertiliser and animal feed.',
    highlights: [
      '99.8% of raw materials valorised',
      '53% energy from renewable sources',
      'Water recycling and reuse across operations',
      'Byproduct transformation into high-value products',
    ],
    icon: '♻️',
  },
];

export const circularEconomyStats: CircularEconomyStat[] = [
  { value: '99.8%', label: 'Raw materials valorised' },
  { value: '53%', label: 'Renewable energy share' },
  { value: '€7.1bn', label: 'Turnover (2023/24)' },
  { value: '14', label: 'Countries of operation' },
];
