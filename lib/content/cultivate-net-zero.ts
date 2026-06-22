export interface Solution {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
}

export interface InvestmentTarget {
  value: string;
  label: string;
  description: string;
}

export interface FarmerProgram {
  name: string;
  description: string;
}

export const cultivateNetZeroIntro =
  'Cultivate Net-Zero is our exclusive decarbonisation and regenerative agriculture offer designed to support industrial customers in reducing the carbon footprint of their value chains. Aligned with the Science Based Targets initiative (SBTi) FLAG trajectory, our programme delivers measurable results on the path to limiting global warming to 1.5°C.';

export const solutions: Solution[] = [
  {
    id: 'activate',
    title: 'Activate',
    tagline: 'Immediate carbon footprint reduction',
    description:
      'Reduce your carbon footprint immediately by sourcing raw materials with verified lower environmental impact. Activate provides access to certified low-carbon ingredients backed by transparent life-cycle assessments.',
    features: [
      'Verified low-carbon raw material sourcing',
      'Life-cycle assessment documentation',
      'Scope 3 emission reduction for customers',
      'Certified origin traceability',
    ],
    icon: '⚡',
    color: 'from-emerald-500 to-green-600',
  },
  {
    id: 'connect',
    title: 'Connect',
    tagline: 'Personalised carbon management',
    description:
      'A personalised carbon performance management programme that connects your sustainability targets with our agricultural and industrial transformation. Track, measure, and report progress with real data.',
    features: [
      'Customised decarbonisation roadmap',
      'Real-time carbon performance dashboards',
      'Joint target setting and monitoring',
      'Annual sustainability reporting support',
    ],
    icon: '🔗',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'engage',
    title: 'Engage',
    tagline: 'Regenerative agriculture partnership',
    description:
      'Partner with us to invest directly in regenerative agriculture practices. Engage supports farmer transitions to low-carbon and regenerative methods, creating shared environmental and economic value.',
    features: [
      'Direct farmer partnership programmes',
      'Regenerative agriculture transition support',
      'Biodiversity and soil health improvement',
      'Shared value creation model',
    ],
    icon: '🌱',
    color: 'from-amber-500 to-orange-600',
  },
];

export const investmentHighlights: InvestmentTarget[] = [
  {
    value: '€800M',
    label: 'Total investment (2022–2033)',
    description: 'Committed to 100+ decarbonisation projects across 16 industrial sites in Europe.',
  },
  {
    value: '65%',
    label: 'European emissions reduction target',
    description: 'Reduction in direct CO₂ emissions from our European operations by 2033.',
  },
  {
    value: '20%',
    label: 'Regenerative sourcing by 2032-33',
    description: 'Plant-based raw materials from regenerative or low-carbon agriculture sources.',
  },
  {
    value: '36%',
    label: 'Agricultural GHG reduction',
    description: 'Reduction in agricultural greenhouse gas emissions by 2032-33.',
  },
];

export const farmerPrograms: FarmerProgram[] = [
  {
    name: 'Carbon Diagnostics',
    description:
      'Covering 75% of the cost for 1,000 farm-level carbon diagnostics, helping cooperative members understand and reduce their environmental footprint.',
  },
  {
    name: 'Transition Partnerships',
    description:
      'Collaborative programmes with partners including Vivescia Transitions, Transitions Noriap, PADV (COVALO), and Earthworm Foundation supporting farmer transitions.',
  },
  {
    name: 'Sector Bonus',
    description:
      'Financial incentives of €50 to €150 per hectare paid to cooperative members for sugar beet areas adopting sustainable practices.',
  },
];

export const sbtiBadge = {
  title: 'Science Based Targets initiative',
  description:
    'Our NET-ZERO targets are validated by the SBTi under the FLAG (Forest, Land and Agriculture) methodology, ensuring alignment with the 1.5°C warming limit trajectory.',
  certification: 'SBTi FLAG 1.5°C Validated',
};
