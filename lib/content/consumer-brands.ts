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
    region: 'France & Europe',
    tagline: 'France’s everyday sugar brand',
    description:
      'Beghin Say is one of France’s most recognised household sugar names and a flagship retail brand of the Tereos cooperative. From granulated white sugar to specialty formats, it represents decades of French beet-sugar expertise on supermarket shelves across Europe.',
    highlights: [
      'Leading French retail sugar range',
      'White, brown, and specialty granulated sugars',
      'Part of the Tereos cooperative brand portfolio',
      'Trusted by households and professional kitchens',
    ],
    image: TEREOS_PHOTOS.brandSugar,
  },
  {
    id: 'la-perruche',
    name: 'La Perruche',
    region: 'Global · Premium channels',
    tagline: 'Iconic amber cane sugar cubes',
    description:
      'La Perruche draws on Réunion Island cane traditions to offer distinctive amber rough-cut cubes and crystals. A premium hospitality and gifting brand, it is distributed across Europe, the Americas, and select Asian retail and food-service channels.',
    highlights: [
      'Signature amber rough-cut cubes',
      'Premium hospitality and gifting formats',
      'Réunion cane heritage',
      'Available in select ASEAN premium retail',
    ],
    image: TEREOS_PHOTOS.brandPremium,
  },
  {
    id: 'guarani',
    name: 'Guarani',
    region: 'Brazil & Americas',
    tagline: 'A leading name in Brazilian sugar',
    description:
      'Guarani is a cornerstone of Tereos’ sugar business in Brazil — one of the world’s largest cane sugar markets. The brand covers refined and specialty sugars for retail, industrial, and export customers across Latin America and international markets.',
    highlights: [
      'Major Brazilian retail and export sugar brand',
      'Refined, crystal, and specialty cane sugars',
      'Integrated with Tereos cane operations in Brazil',
      'Strong presence across the Americas',
    ],
    image: TEREOS_PHOTOS.brandBrazil,
  },
  {
    id: 'sucre-stevia',
    name: 'Sucre & Stévia',
    region: 'France & Europe',
    tagline: 'Cane sugar blended with stevia',
    description:
      'Launched by Tereos in 2022, Sucre & Stévia is a consumer range combining beet or cane sugar with stevia extract. It helps families reduce calories while keeping the sweetness and cooking performance expected from a Tereos product.',
    highlights: [
      'Cane/beet sugar and stevia blend',
      'Reduced-calorie everyday sweetening',
      'Developed by Tereos R&D and marketing teams',
      'Clear nutritional positioning on pack',
    ],
    image: TEREOS_PHOTOS.brandOrganic,
  },
  {
    id: 'ensemble',
    name: 'Ensemble',
    region: 'Global',
    tagline: 'Plant-based protein, simply made',
    description:
      'Ensemble is Tereos’ plant-based protein brand for consumers seeking transparent, sustainable nutrition. With short ingredient lists built around wheat protein and legumes, it targets home cooks and health-conscious shoppers in Europe and expanding export markets.',
    highlights: [
      'Wheat protein and vegetable-based blends',
      'Short, transparent ingredient lists',
      'Launched to meet plant-based nutrition demand',
      'Expanding across EU and Asia-Pacific',
    ],
    image: TEREOS_PHOTOS.brandEnsemble,
  },
  {
    id: 'tereos-cane-asean',
    name: 'Tereos Refined Cane',
    region: 'Thailand & ASEAN',
    tagline: 'Refined cane sugars for Southeast Asian retail',
    description:
      'Through Tereos Açúcar e Energia operations in Thailand and the wider ASEAN region, we supply ICUMSA-certified refined white and golden cane sugars to retail partners, bakeries, and food-service operators — backed by the same traceability and quality standards as our global portfolio.',
    highlights: [
      'Refined white and golden granulated cane sugars',
      'ICUMSA-certified crystal quality',
      'Retail and food-service pack formats',
      'Traceable supply from regional cane partnerships',
    ],
    image: TEREOS_PHOTOS.agriculture,
  },
];

export const consumerBrandStats = [
  { value: '6', labelKey: 'statBrands' },
  { value: '14', labelKey: 'statCountries' },
  { value: '10,300+', labelKey: 'statCoopMembers' },
  { value: '43M t', labelKey: 'statRawMaterials' },
] as const;
