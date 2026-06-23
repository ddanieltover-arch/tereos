import { TEREOS_PHOTOS } from '@/lib/content/photography';

export interface ConsumerBrand {
  id: string;
  name: string;
  region: string;
  tagline: string;
  description: string;
  highlights: string[];
  image: string;
}

/** Real Tereos consumer & retail-facing brands (global portfolio + ASEAN retail). */
export const consumerBrands: ConsumerBrand[] = [
  {
    id: 'beghin-say',
    name: 'Beghin Say',
    region: 'France',
    tagline: 'The most famous sugar brand on the French market',
    description:
      'Béghin Say is the most famous sugar brand on the French market. With dozens of references, it has one of the widest sugar ranges in France and continues to adapt to consumer expectations, including Sucre & Stévia.',
    highlights: [
      'Broadest sugar range in its national market',
      'Iconic yellow branding',
      'Strong retail presence in France',
      'Includes Sucre & Stévia range',
    ],
    image: TEREOS_PHOTOS.brandSugar,
  },
  {
    id: 'la-perruche',
    name: 'La Perruche',
    region: 'France & export markets',
    tagline: 'Iconic amber cane sugars since 1890',
    description:
      'Founded in 1890 and originating in Réunion Island, La Perruche is known for its distinctive shape, amber color and cane sugar taste. Over time, it became a symbol of refinement in France.',
    highlights: [
      'Founded in 1890',
      'Réunion Island cane sugar heritage',
      'Distinctive amber sugars',
      'Strong brand recognition in France',
    ],
    image: TEREOS_PHOTOS.brandPremium,
  },
  {
    id: 'ttd',
    name: 'TTD',
    region: 'Czech Republic',
    tagline: 'Largest beet processor in the Czech Republic',
    description:
      'TTD is the largest beet processor in the Czech Republic and one of the country’s leading food producers. The brand has been affiliated with Tereos since 1992.',
    highlights: [
      'Largest beet processor in Czech Republic',
      'Top-tier food producer in country',
      'Affiliated with Tereos since 1992',
      'Strong Central European footprint',
    ],
    image: TEREOS_PHOTOS.marketFood,
  },
  {
    id: 'guarani',
    name: 'Guarani',
    region: 'Brazil',
    tagline: 'One of Brazil’s main sugar brands',
    description:
      'Guarani is one of the main sugar brands in Brazil with strong supermarket distribution. It offers refined, crystal and demerara sugars, plus newer lines such as organic crystal and stevia-based products.',
    highlights: [
      'Strong retail presence across Brazil',
      'Organic crystal sugar line',
      'Stevia special refined sugar',
      'Portfolio includes traditional and demerara sugars',
    ],
    image: TEREOS_PHOTOS.brandBrazil,
  },
  {
    id: 'sucreries-de-bourbon',
    name: 'Sucreries de Bourbon',
    region: 'Réunion Island',
    tagline: 'Public retail sugar brand on Réunion Island',
    description:
      'Sucreries de Bourbon is the general public sweets brand on Réunion Island, with a long history linked to the Bois Rouge and Gol sugar operations.',
    highlights: [
      'Strong local heritage on Réunion Island',
      'White, blond and brown sugar offerings',
      'Historical link with Bois Rouge and Gol',
      'Important part of island economy and culture',
    ],
    image: TEREOS_PHOTOS.brandPremium,
  },
];

export const consumerBrandStats = [
  { value: '5', labelKey: 'statBrands' },
  { value: '14', labelKey: 'statCountries' },
  { value: '10,300+', labelKey: 'statCoopMembers' },
  { value: '43M t', labelKey: 'statRawMaterials' },
] as const;
