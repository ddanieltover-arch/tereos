export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: 'cooperative' | 'sugar' | 'starch' | 'expansion';
}

export interface TimelineSection {
  id: string;
  title: string;
  events: TimelineEvent[];
}

export const historyIntroText =
  'The story of Tereos begins in 1932 with a cooperative distillery in Origny-Sainte-Benoîte, in the Aisne department of northern France. Through decades of strategic growth, mergers, and international expansion, this small local cooperative has grown into one of the world\'s leading agri-food groups — processing sugar beet, sugar cane, wheat, corn, and alfalfa across 14 countries.';

export const timelineSections: TimelineSection[] = [
  {
    id: 'cooperative',
    title: 'Birth of a Cooperative',
    events: [
      {
        year: '1932',
        title: 'Foundation',
        description: 'A cooperative distillery is founded in Origny-Sainte-Benoîte by local farmers in the Aisne department of northern France.',
        category: 'cooperative',
      },
      {
        year: '1950s',
        title: 'Conversion to Sugar',
        description: 'The distillery converts to sugar production, marking the beginning of Tereos\' core business in sugar processing.',
        category: 'cooperative',
      },
      {
        year: '1990s',
        title: 'Merger and Growth',
        description: 'Multiple cooperatives merge to form SDA (Sucreries et Distilleries de l\'Aisne), creating critical mass. Berneuil is acquired, strengthening distillery capacity.',
        category: 'cooperative',
      },
      {
        year: '2002',
        title: 'Tereos is Born',
        description: 'SDA acquires Béghin Say, one of France\'s most iconic sugar brands, and the group is renamed Tereos — from the Greek word meaning "to protect, to preserve."',
        category: 'cooperative',
      },
      {
        year: '2006',
        title: 'SDHF Merger',
        description: 'Tereos merges with SDHF (Sucrerie-Distillerie des Hauts de France), significantly expanding its French production base.',
        category: 'cooperative',
      },
      {
        year: '2016',
        title: 'Alfalfa Partnership',
        description: 'Tereos joins forces with APM Déshy, adding alfalfa dehydration to its portfolio and broadening its agricultural raw material base.',
        category: 'cooperative',
      },
      {
        year: '2018',
        title: 'Tereos SCA',
        description: 'The cooperative is reorganised as Tereos SCA, modernising its governance structure while preserving its cooperative values and member ownership.',
        category: 'cooperative',
      },
    ],
  },
  {
    id: 'sugar-expansion',
    title: 'Sugar Business Expansion',
    events: [
      {
        year: '1992',
        title: 'Czech Republic',
        description: 'Tereos acquires beet sugar operations in the Czech Republic, establishing TTD as the country\'s largest beet processor and top food producer.',
        category: 'sugar',
      },
      {
        year: '2000s',
        title: 'Brazil — Guarani',
        description: 'Major expansion into Brazil through the Guarani brand, establishing cane sugar and ethanol operations in São Paulo state. Partnership with Petrobras strengthens ethanol production.',
        category: 'sugar',
      },
      {
        year: '2006',
        title: 'Reunion Island',
        description: 'Operations established on Reunion Island through Bois Rouge and Quartier Français sugar mills, producing premium cane sugars for the French market.',
        category: 'sugar',
      },
      {
        year: '2010',
        title: 'Kenya — Transmara',
        description: 'Tereos expands into East Africa through the Transmara sugar company in Kenya, adding tropical cane processing to its global footprint.',
        category: 'expansion',
      },
      {
        year: '2014',
        title: 'Tereos Commodities',
        description: 'Launch of Tereos Commodities to manage global sugar trading and optimise commercial flows across all producing regions.',
        category: 'sugar',
      },
      {
        year: '2018',
        title: 'CDG Europe Campus',
        description: 'Opening of the CDG (Centre de Décision du Groupe) Europe Campus in Seine-et-Marne, consolidating European headquarters and R&D operations.',
        category: 'cooperative',
      },
    ],
  },
  {
    id: 'starch-diversification',
    title: 'Starch & Diversification',
    events: [
      {
        year: '1993',
        title: 'Cereal Processing',
        description: 'Tereos enters cereal processing at Origny, beginning wheat starch and sweetener production alongside existing sugar operations.',
        category: 'starch',
      },
      {
        year: '1996',
        title: 'Staral Joint Venture',
        description: 'Creation of the Staral joint venture, expanding starch production capacity. Lillebonne wheat ethanol unit begins production.',
        category: 'starch',
      },
      {
        year: '2007',
        title: 'Tate & Lyle Acquisition',
        description: 'Tereos acquires Tate & Lyle\'s European starch and sweetener assets, becoming one of Europe\'s leading starch producers overnight.',
        category: 'starch',
      },
      {
        year: '2011',
        title: 'Halotek & Haussimont',
        description: 'Acquisition of Halotek and expansion of the Haussimont facility, strengthening modified starch capabilities for food and paper applications.',
        category: 'starch',
      },
      {
        year: '2013',
        title: 'Palmital, Brazil',
        description: 'Corn starch processing begins at Palmital in Brazil, combining cane and corn operations in the South American market.',
        category: 'expansion',
      },
      {
        year: '2014',
        title: 'Indonesia — Redwood',
        description: 'Tereos enters Southeast Asia through Redwood operations in Indonesia, processing cassava and corn starch for regional food markets.',
        category: 'expansion',
      },
      {
        year: '2018',
        title: 'Singapore R&D Centre',
        description: 'Opening of the Singapore R&D centre, focusing on tropical ingredient innovation, customer formulation support, and Asia-Pacific market development.',
        category: 'starch',
      },
    ],
  },
];

export const categoryColors: Record<TimelineEvent['category'], string> = {
  cooperative: 'bg-primary text-white',
  sugar: 'bg-accent-gold text-dark',
  starch: 'bg-blue-600 text-white',
  expansion: 'bg-green-600 text-white',
};

export const categoryLabels: Record<TimelineEvent['category'], string> = {
  cooperative: 'Cooperative',
  sugar: 'Sugar',
  starch: 'Starch',
  expansion: 'Global Expansion',
};
