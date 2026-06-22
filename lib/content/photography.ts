/**
 * Official Tereos photography served from /public/images/tereos/.
 * Run `npm run download:photography` to sync from tereos.com.
 */

const BASE = '/images/tereos';

export const HOMEPAGE_HERO = {
  video: '/videos/hero.mp4',
  poster: '/images/hero-poster.png',
  fallback: `${BASE}/agriculture-beet-irrigation.png`,
} as const;

export const TEREOS_PHOTOS = {
  heroPoster: HOMEPAGE_HERO.poster,
  heroFallback: `${BASE}/agriculture-beet-irrigation.png`,
  agriculture: `${BASE}/agriculture-beet-irrigation.png`,
  factory: `${BASE}/factory-connantre.png`,
  field: `${BASE}/field-partners.png`,
  laboratory: `${BASE}/lab-origny.jpg`,
  plantWorker: `${BASE}/plant-worker.png`,
  food: `${BASE}/food-ingredients.png`,
  sustainability: `${BASE}/sustainability-2030.jpg`,
  careers: `${BASE}/careers-hero.jpeg`,
  innovation: `${BASE}/innovation-lab.jpg`,
  campus: `${BASE}/campus.jpg`,
  brazil: `${BASE}/brazil-operations.jpg`,
  renewable: `${BASE}/renewable-biomass.jpg`,
  newsDefault: `${BASE}/news-operations.jpg`,
  newsSustainability: `${BASE}/news-sustainability.jpg`,
  newsInvestor: `${BASE}/news-investor.jpg`,
  productSugar: `${BASE}/product-sugar.jpg`,
  productBioenergy: `${BASE}/product-bioenergy.jpg`,
  productMolasses: `${BASE}/product-molasses.jpg`,
  productBiomass: `${BASE}/product-biomass.jpg`,
  brandSugar: `${BASE}/brand-sugar.jpg`,
  brandPremium: `${BASE}/brand-premium.jpg`,
  brandBrazil: `${BASE}/brand-brazil.jpg`,
  brandOrganic: `${BASE}/brand-organic.jpg`,
  brandProtein: `${BASE}/brand-protein.jpg`,
  brandEnsemble: `${BASE}/brand-ensemble.jpg`,
  marketFood: `${BASE}/market-food.jpg`,
  marketEnergy: `${BASE}/market-energy.jpg`,
  marketFeed: `${BASE}/market-animal-feed.jpg`,
  marketChemistry: `${BASE}/market-green-chemistry.jpg`,
  marketPharma: `${BASE}/market-pharma.jpg`,
  marketPaper: `${BASE}/market-paper.jpg`,
  marketPersonalCare: `${BASE}/market-personal-care.jpg`,
} as const;

export const LEADERSHIP_PHOTOS = {
  gerardClay: `${BASE}/gerard-clay.jpg`,
  olivierLeducq: `${BASE}/olivier-leducq.jpg`,
  gwenaelElies: `${BASE}/gwenael-elies.jpg`,
  jeromeVerrie: `${BASE}/jerome-verrie.jpg`,
} as const;

export type TereosPhotoKey = keyof typeof TEREOS_PHOTOS;

export function tereosPhoto(key: TereosPhotoKey): string {
  return TEREOS_PHOTOS[key];
}

export const DIVISION_PHOTOS: Record<string, string> = {
  sugar: TEREOS_PHOTOS.agriculture,
  bioenergy: TEREOS_PHOTOS.factory,
  agriculture: TEREOS_PHOTOS.field,
  'food-ingredients': TEREOS_PHOTOS.food,
  'renewable-solutions': TEREOS_PHOTOS.renewable,
};

export const MARKET_PHOTOS: Record<string, string> = {
  'food-and-drink': TEREOS_PHOTOS.marketFood,
  energies: TEREOS_PHOTOS.marketEnergy,
  'animal-feed': TEREOS_PHOTOS.marketFeed,
  'plant-chemistry': TEREOS_PHOTOS.marketChemistry,
  pharmaceuticals: TEREOS_PHOTOS.marketPharma,
  'personal-care': TEREOS_PHOTOS.marketPersonalCare,
  paper: TEREOS_PHOTOS.marketPaper,
};

export const PRODUCT_LINE_PHOTOS: Record<string, string> = {
  alcohol: TEREOS_PHOTOS.laboratory,
  bioethanol: TEREOS_PHOTOS.marketEnergy,
  'sugar-sweeteners': TEREOS_PHOTOS.productSugar,
  starches: TEREOS_PHOTOS.food,
  maltodextrins: TEREOS_PHOTOS.food,
  'organic-products': TEREOS_PHOTOS.agriculture,
  'dietary-fibres': TEREOS_PHOTOS.food,
  'fibres-germs-animal-feed': TEREOS_PHOTOS.marketFeed,
  proteins: TEREOS_PHOTOS.brandProtein,
};

export const IR_DOCUMENT_COVERS = {
  default: TEREOS_PHOTOS.newsInvestor,
  annual: TEREOS_PHOTOS.factory,
  esg: TEREOS_PHOTOS.sustainability,
} as const;
