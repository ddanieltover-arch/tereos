import { MARKET_PHOTOS, PRODUCT_LINE_PHOTOS } from '@/lib/content/photography';

export const MARKET_SLUGS = [
  'food-and-drink',
  'energies',
  'animal-feed',
  'plant-chemistry',
  'pharmaceuticals',
  'personal-care',
  'paper',
] as const;

export const PRODUCT_LINE_SLUGS = [
  'alcohol',
  'bioethanol',
  'sugar-sweeteners',
  'starches',
  'maltodextrins',
  'organic-products',
  'dietary-fibres',
  'fibres-germs-animal-feed',
  'proteins',
] as const;

export type MarketSlug = (typeof MARKET_SLUGS)[number];
export type ProductLineSlug = (typeof PRODUCT_LINE_SLUGS)[number];

export interface TaxonomyPage {
  slug: string;
  labelKey: string;
  title: string;
  description: string;
  intro: string;
  highlights: string[];
  image: string;
}

export interface Market extends TaxonomyPage {
  slug: MarketSlug;
  productLineSlugs: ProductLineSlug[];
  productSlugs: string[];
  divisionSlugs: string[];
}

export interface ProductLine extends TaxonomyPage {
  slug: ProductLineSlug;
  marketSlugs: MarketSlug[];
  productSlugs: string[];
  divisionSlugs: string[];
}

export const markets: Market[] = [
  {
    slug: 'food-and-drink',
    labelKey: 'navMarket.food',
    title: 'Food & Beverage',
    description:
      'Sugar, sweeteners, and specialty ingredients for food manufacturers, beverage producers, and confectionery brands worldwide.',
    intro:
      'From refined crystal sugar to functional sweeteners and fermentation substrates, Tereos supplies consistent, certified ingredients that meet the quality and traceability demands of global food and beverage markets. Our cane-sugar expertise and integrated supply chain support industrial-scale production across Asia and export corridors.',
    highlights: [
      'ICUMSA-certified refined and raw sugars',
      'Beverage and confectionery formulations',
      'Clean-label and specialty sweetener development',
      'Full traceability from farm to factory',
    ],
    productLineSlugs: ['sugar-sweeteners', 'organic-products', 'maltodextrins', 'starches'],
    productSlugs: ['crystal-sugar-icumsa-45', 'raw-sugar-vhp', 'molasses'],
    divisionSlugs: ['sugar', 'food-ingredients'],
    image: MARKET_PHOTOS['food-and-drink'],
  },
  {
    slug: 'energies',
    labelKey: 'navMarket.energy',
    title: 'Energy & Biofuels',
    description:
      'Bioethanol, biomass power, and renewable energy solutions supporting the clean energy transition.',
    intro:
      'Tereos converts agricultural resources into renewable fuels and electricity. Our bioethanol meets international fuel-blending standards, while bagasse cogeneration delivers low-carbon power to grids and industrial sites across Southeast Asia.',
    highlights: [
      'Fuel-grade bioethanol (E10–E85 blending)',
      'Bagasse biomass power and cogeneration',
      'Carbon credit and renewable certificate programs',
      'Export-ready energy commodities',
    ],
    productLineSlugs: ['bioethanol', 'alcohol'],
    productSlugs: ['fuel-ethanol', 'biomass-power', 'bagasse-pellets'],
    divisionSlugs: ['bioenergy', 'renewable-solutions'],
    image: MARKET_PHOTOS.energies,
  },
  {
    slug: 'animal-feed',
    labelKey: 'navMarket.feed',
    title: 'Animal Feed & Nutrition',
    description:
      'Molasses, fibrous co-products, and nutritional ingredients for livestock and aquaculture feed formulators.',
    intro:
      'Sugarcane processing generates valuable co-products for animal nutrition. Tereos supplies molasses, fibre-rich pellets, and protein concentrates used in compound feed, fermentation media, and aquaculture applications across the region.',
    highlights: [
      'Cane molasses for ruminant and monogastric diets',
      'Fibres and germ co-products for feed mills',
      'Consistent Brix and nutritional profiles',
      'Bulk logistics for regional feed producers',
    ],
    productLineSlugs: ['fibres-germs-animal-feed', 'proteins', 'organic-products'],
    productSlugs: ['molasses', 'bagasse-pellets'],
    divisionSlugs: ['food-ingredients', 'renewable-solutions'],
    image: MARKET_PHOTOS['animal-feed'],
  },
  {
    slug: 'plant-chemistry',
    labelKey: 'navMarket.chemicals',
    title: 'Plant Chemistry & Fermentation',
    description:
      'Renewable alcohols, fermentation substrates, and bio-based building blocks for green chemistry.',
    intro:
      'Our integrated distillery and fermentation capabilities supply industrial alcohol, ethanol, and carbohydrate substrates for solvents, cosmetics, pharmaceuticals, and biochemical production — replacing fossil-based feedstocks with renewable alternatives.',
    highlights: [
      'Industrial and neutral alcohol grades',
      'Fermentation substrates from cane derivatives',
      'Green solvent and intermediate supply',
      'Custom purity and packaging options',
    ],
    productLineSlugs: ['alcohol', 'bioethanol', 'starches', 'maltodextrins'],
    productSlugs: ['fuel-ethanol', 'molasses'],
    divisionSlugs: ['bioenergy', 'renewable-solutions'],
    image: MARKET_PHOTOS['plant-chemistry'],
  },
  {
    slug: 'pharmaceuticals',
    labelKey: 'navMarket.pharma',
    title: 'Pharmaceuticals & Cosmetics',
    description:
      'High-purity sugars, alcohols, and excipients for pharmaceutical, cosmetic, and personal care formulations.',
    intro:
      'Tereos produces pharmaceutical-grade sugars and alcohols meeting stringent purity requirements. Our ingredients serve as excipients, carriers, and active bases in OTC products, cosmetics, and regulated pharmaceutical applications.',
    highlights: [
      'Pharma-grade refined sugars and alcohols',
      'Excipient and carrier applications',
      'Regulatory documentation and batch traceability',
      'Cosmetic and OTC formulation support',
    ],
    productLineSlugs: ['alcohol', 'sugar-sweeteners', 'organic-products'],
    productSlugs: ['crystal-sugar-icumsa-45'],
    divisionSlugs: ['sugar', 'food-ingredients'],
    image: MARKET_PHOTOS.pharmaceuticals,
  },
  {
    slug: 'personal-care',
    labelKey: 'navMarket.personalCare',
    title: 'Personal Care',
    description:
      'Natural sweeteners, alcohols, and plant-derived ingredients for personal care and hygiene products.',
    intro:
      'Consumer demand for natural and renewable ingredients drives our supply of plant-based alcohols, glycols, and functional carbohydrates to personal care brands seeking sustainable, traceable raw materials.',
    highlights: [
      'Renewable alcohol bases for formulations',
      'Natural sweeteners and humectants',
      'Clean-label and organic-certified options',
      'Technical support for R&D teams',
    ],
    productLineSlugs: ['alcohol', 'organic-products', 'dietary-fibres'],
    productSlugs: ['fuel-ethanol', 'molasses'],
    divisionSlugs: ['food-ingredients', 'renewable-solutions'],
    image: MARKET_PHOTOS['personal-care'],
  },
  {
    slug: 'paper',
    labelKey: 'navMarket.paper',
    title: 'Paper & Cellulose',
    description:
      'Lignocellulosic fibres and biomass co-products supporting paper, packaging, and cellulose industries.',
    intro:
      'Bagasse and cane fibre co-products from our mills provide renewable fibre inputs for pulp, paper, and packaging applications. We work with industrial partners to valorise agricultural residues into circular material streams.',
    highlights: [
      'Bagasse fibre for pulp and paper blends',
      'Biomass pellets for industrial energy',
      'Circular economy and waste valorisation',
      'Sustainable sourcing from cane processing',
    ],
    productLineSlugs: ['fibres-germs-animal-feed', 'dietary-fibres'],
    productSlugs: ['bagasse-pellets'],
    divisionSlugs: ['renewable-solutions'],
    image: MARKET_PHOTOS.paper,
  },
];

export const productLines: ProductLine[] = [
  {
    slug: 'alcohol',
    labelKey: 'navProductLine.alcohol',
    title: 'Alcohol',
    description: 'Industrial and neutral alcohols for solvents, cosmetics, pharmaceuticals, and specialty applications.',
    intro:
      'Tereos produces high-purity alcohol from renewable cane feedstock. Our distillery network supplies neutral and industrial grades for formulation, extraction, and chemical synthesis across regulated and industrial markets.',
    highlights: ['Neutral and industrial grades', 'Renewable cane-based feedstock', 'Pharma and cosmetic compliance support', 'Bulk and packaged delivery'],
    marketSlugs: ['plant-chemistry', 'pharmaceuticals', 'personal-care', 'energies'],
    productSlugs: ['fuel-ethanol'],
    divisionSlugs: ['bioenergy'],
    image: PRODUCT_LINE_PHOTOS.alcohol,
  },
  {
    slug: 'bioethanol',
    labelKey: 'navProductLine.bioethanol',
    title: 'Bioethanol',
    description: 'Fuel-grade bioethanol for E10–E85 blending and export energy markets.',
    intro:
      'Our bioethanol meets international fuel standards and supports national blending mandates across Southeast Asia. Integrated production from cane to distillery ensures supply security and competitive carbon intensity.',
    highlights: ['EN 15376 and regional fuel standards', 'E10–E85 blending applications', 'Low-carbon renewable fuel certificates', 'Export and domestic supply'],
    marketSlugs: ['energies', 'plant-chemistry'],
    productSlugs: ['fuel-ethanol'],
    divisionSlugs: ['bioenergy'],
    image: PRODUCT_LINE_PHOTOS.bioethanol,
  },
  {
    slug: 'sugar-sweeteners',
    labelKey: 'navProductLine.sugarSweeteners',
    title: 'Sugar & Sweeteners',
    description: 'Refined crystal sugar, raw VHP sugar, and specialty sweeteners for food and industrial use.',
    intro:
      'As one of the world\'s leading cane sugar producers, Tereos delivers consistent quality from ICUMSA 45 refined sugar to Very High Pol raw sugar for refining and commodity trading.',
    highlights: ['ICUMSA 45 crystal sugar', 'VHP raw sugar for export', 'Specialty and organic sweeteners', 'Global logistics and certification'],
    marketSlugs: ['food-and-drink', 'pharmaceuticals'],
    productSlugs: ['crystal-sugar-icumsa-45', 'raw-sugar-vhp'],
    divisionSlugs: ['sugar'],
    image: PRODUCT_LINE_PHOTOS['sugar-sweeteners'],
  },
  {
    slug: 'starches',
    labelKey: 'navProductLine.starches',
    title: 'Starches',
    description: 'Native and modified starches for food, paper, and industrial applications.',
    intro:
      'Our starch portfolio supports texturising, binding, and fermentation applications in food manufacturing, green chemistry, and industrial processes derived from renewable agricultural sources.',
    highlights: ['Food-grade native starches', 'Industrial binding and thickening', 'Fermentation substrates', 'Custom modification capabilities'],
    marketSlugs: ['food-and-drink', 'plant-chemistry', 'paper'],
    productSlugs: ['molasses'],
    divisionSlugs: ['food-ingredients'],
    image: MARKET_PHOTOS['food-and-drink'],
  },
  {
    slug: 'maltodextrins',
    labelKey: 'navProductLine.maltodextrins',
    title: 'Maltodextrins',
    description: 'Carbohydrate powders for food, beverage, and nutritional applications.',
    intro:
      'Maltodextrins from our ingredient portfolio provide soluble carbohydrates for sports nutrition, infant formula, beverage bulking, and pharmaceutical excipient applications.',
    highlights: ['Soluble carbohydrate powders', 'Beverage and nutrition applications', 'Controlled DE profiles', 'Food and pharma grades'],
    marketSlugs: ['food-and-drink', 'plant-chemistry'],
    productSlugs: [],
    divisionSlugs: ['food-ingredients'],
    image: PRODUCT_LINE_PHOTOS.starches,
  },
  {
    slug: 'organic-products',
    labelKey: 'navProductLine.organic',
    title: 'Organic Products',
    description: 'Certified organic sugars, alcohols, and ingredients from sustainable cane programs.',
    intro:
      'Tereos organic product lines support brands seeking certified renewable ingredients. Our farmer partnership programs enable traceable organic cane production with full chain-of-custody documentation.',
    highlights: ['Certified organic cane programs', 'Organic sugar and alcohol grades', 'Chain-of-custody traceability', 'Farmer partnership model'],
    marketSlugs: ['food-and-drink', 'pharmaceuticals', 'personal-care', 'animal-feed'],
    productSlugs: ['crystal-sugar-icumsa-45'],
    divisionSlugs: ['sugar', 'agriculture'],
    image: PRODUCT_LINE_PHOTOS['organic-products'],
  },
  {
    slug: 'dietary-fibres',
    labelKey: 'navProductLine.dietaryFibres',
    title: 'Dietary Fibres',
    description: 'Plant-based fibres for food enrichment, supplements, and functional nutrition.',
    intro:
      'Cane-derived dietary fibres support gut health, clean-label formulation, and functional food development. Our fibre ingredients complement sugar and starch portfolios for holistic nutrition solutions.',
    highlights: ['Soluble and insoluble fibre grades', 'Clean-label food enrichment', 'Nutraceutical applications', 'Sustainable plant origin'],
    marketSlugs: ['food-and-drink', 'personal-care', 'paper'],
    productSlugs: ['bagasse-pellets'],
    divisionSlugs: ['food-ingredients', 'renewable-solutions'],
    image: PRODUCT_LINE_PHOTOS['dietary-fibres'],
  },
  {
    slug: 'fibres-germs-animal-feed',
    labelKey: 'navProductLine.animalFeedFibres',
    title: 'Fibres, Germs & Animal Feed',
    description: 'Co-products from cane processing for compound feed and aquaculture nutrition.',
    intro:
      'Fibres, germs, and molasses co-products provide energy and fibre content for livestock and aquaculture feed. Tereos supplies bulk ingredients to regional feed mills and integrators.',
    highlights: ['Cane molasses for feed energy', 'Fibrous co-products for ruminants', 'Aquaculture feed applications', 'Bulk regional supply'],
    marketSlugs: ['animal-feed'],
    productSlugs: ['molasses', 'bagasse-pellets'],
    divisionSlugs: ['renewable-solutions', 'food-ingredients'],
    image: MARKET_PHOTOS['animal-feed'],
  },
  {
    slug: 'proteins',
    labelKey: 'navProductLine.proteins',
    title: 'Proteins',
    description: 'Plant-based proteins and nutritional concentrates for feed and food applications.',
    intro:
      'Protein concentrates from our agricultural processing streams support animal nutrition and emerging plant-protein food applications, contributing to circular use of cane co-products.',
    highlights: ['Plant protein concentrates', 'Animal nutrition formulations', 'Emerging food protein applications', 'Circular co-product valorisation'],
    marketSlugs: ['animal-feed', 'food-and-drink'],
    productSlugs: [],
    divisionSlugs: ['food-ingredients', 'agriculture'],
    image: PRODUCT_LINE_PHOTOS.proteins,
  },
];

export function getMarket(slug: string): Market | undefined {
  return markets.find((m) => m.slug === slug);
}

export function getProductLine(slug: string): ProductLine | undefined {
  return productLines.find((l) => l.slug === slug);
}

export function getProductLinesForMarket(slug: MarketSlug): ProductLine[] {
  const market = getMarket(slug);
  if (!market) return [];
  return productLines.filter((l) => market.productLineSlugs.includes(l.slug));
}

export function getMarketsForProductLine(slug: ProductLineSlug): Market[] {
  const line = getProductLine(slug);
  if (!line) return [];
  return markets.filter((m) => line.marketSlugs.includes(m.slug));
}

export function productMatchesMarket(productSlug: string, marketSlug: MarketSlug): boolean {
  const market = getMarket(marketSlug);
  return market?.productSlugs.includes(productSlug) ?? false;
}

export function productMatchesProductLine(productSlug: string, lineSlug: ProductLineSlug): boolean {
  const line = getProductLine(lineSlug);
  return line?.productSlugs.includes(productSlug) ?? false;
}

export const productTaxonomyMap: Record<
  string,
  { marketSlugs: MarketSlug[]; productLineSlugs: ProductLineSlug[] }
> = {
  'crystal-sugar-icumsa-45': {
    marketSlugs: ['food-and-drink', 'pharmaceuticals'],
    productLineSlugs: ['sugar-sweeteners', 'organic-products'],
  },
  'fuel-ethanol': {
    marketSlugs: ['energies', 'plant-chemistry', 'personal-care'],
    productLineSlugs: ['bioethanol', 'alcohol'],
  },
  molasses: {
    marketSlugs: ['animal-feed', 'food-and-drink', 'plant-chemistry', 'personal-care'],
    productLineSlugs: ['fibres-germs-animal-feed', 'starches'],
  },
  'bagasse-pellets': {
    marketSlugs: ['energies', 'animal-feed', 'paper'],
    productLineSlugs: ['fibres-germs-animal-feed', 'dietary-fibres'],
  },
  'raw-sugar-vhp': {
    marketSlugs: ['food-and-drink'],
    productLineSlugs: ['sugar-sweeteners'],
  },
  'biomass-power': {
    marketSlugs: ['energies'],
    productLineSlugs: ['bioethanol'],
  },
};

export function getTaxonomyForProduct(slug: string) {
  return (
    productTaxonomyMap[slug] ?? {
      marketSlugs: [] as MarketSlug[],
      productLineSlugs: [] as ProductLineSlug[],
    }
  );
}
