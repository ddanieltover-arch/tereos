import { TEREOS_PHOTOS } from '@/lib/content/photography';

export const RAW_MATERIAL_SLUGS = [
  'sugar-cane',
  'sugar-beet',
  'wheat',
  'corn',
  'alfalfa',
] as const;

export type RawMaterialSlug = (typeof RAW_MATERIAL_SLUGS)[number];

export interface KeyFigure {
  value: string;
  label: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface RawMaterial {
  slug: RawMaterialSlug;
  title: string;
  subtitle: string;
  description: string;
  intro: string;
  keyFigures: KeyFigure[];
  processTitle: string;
  processDescription: string;
  processSteps: ProcessStep[];
  applications: string[];
  image: string;
  icon: string;
}

export const rawMaterials: RawMaterial[] = [
  {
    slug: 'sugar-cane',
    title: 'Sugar Cane',
    subtitle: 'The Backbone of Tropical Agriculture',
    description:
      'Sugar cane is the primary raw material for Tereos operations in Brazil, Reunion Island, Kenya, and across Southeast Asia — producing sugar, ethanol, and bioelectricity.',
    intro:
      'Sugar cane is a tropical grass cultivated for its high sucrose content and remarkable energy density. Tereos processes millions of tonnes annually, transforming every part of the plant: the juice yields sugar and ethanol, the fibre (bagasse) fuels cogeneration, and the residual molasses serves animal feed and fermentation industries. This circular approach valorises virtually 100% of the plant.',
    keyFigures: [
      { value: '20M+', label: 'Tonnes of cane crushed annually' },
      { value: '7', label: 'Sugar mills in operation' },
      { value: '4', label: 'Distilleries producing ethanol' },
      { value: '100%', label: 'Bagasse valorised for energy' },
    ],
    processTitle: 'From Field to Product',
    processDescription:
      'Sugar cane undergoes a highly integrated industrial process where nothing goes to waste.',
    processSteps: [
      {
        title: 'Cultivation & Harvest',
        description:
          'Sugar cane grows for 12–18 months before mechanical harvesting. Tereos works with partner farmers on variety selection, soil management, and precision irrigation to maximise yield and sustainability.',
      },
      {
        title: 'Crushing & Juice Extraction',
        description:
          'Cane stalks are shredded and passed through roller mills to extract juice rich in sucrose. The remaining fibrous bagasse is collected for energy recovery.',
      },
      {
        title: 'Clarification & Crystallisation',
        description:
          'Raw juice is clarified, evaporated, and crystallised in vacuum pans to produce raw sugar. Multiple boilings yield different sugar grades from ICUMSA 45 refined to VHP raw sugar.',
      },
      {
        title: 'Distillation',
        description:
          'Cane juice or molasses is fermented and distilled to produce anhydrous or hydrated ethanol for fuel blending and industrial applications.',
      },
      {
        title: 'Cogeneration',
        description:
          'Bagasse is burned in high-pressure boilers to generate steam and electricity. Surplus power is exported to the grid, making operations energy self-sufficient.',
      },
    ],
    applications: [
      'Crystal and raw sugars for food and beverage',
      'Bioethanol for fuel blending (E10–E85)',
      'Biomass electricity from bagasse cogeneration',
      'Molasses for animal feed and fermentation',
      'Organic and specialty sugars',
    ],
    image: TEREOS_PHOTOS.agriculture,
    icon: '🌾',
  },
  {
    slug: 'sugar-beet',
    title: 'Sugar Beet',
    subtitle: 'European Agricultural Excellence',
    description:
      'Sugar beet is the foundation of Tereos European operations — processed into white sugar, bioethanol, animal feed, and fertilisers in France and the Czech Republic.',
    intro:
      'Sugar beet is a temperate root crop that stores sucrose in its taproot. Tereos is one of the world\'s largest beet processors, operating factories across northern France and the Czech Republic. The entire beet is valorised: roots yield sugar and ethanol, pulp becomes animal feed, and lime residues return to fields as fertiliser — a true circular agriculture model.',
    keyFigures: [
      { value: '12,000', label: 'Cooperative member farmers' },
      { value: '9', label: 'Sugar factories in Europe' },
      { value: '3', label: 'Distilleries for bioethanol' },
      { value: '99.8%', label: 'Raw material valorised' },
    ],
    processTitle: 'Beet to Product',
    processDescription:
      'Sugar beet processing exemplifies circular economy principles with near-total raw material utilisation.',
    processSteps: [
      {
        title: 'Sowing & Growing',
        description:
          'Beets are sown in spring and harvested in autumn. Tereos agronomists advise farmers on variety selection, pest management, and sustainable practices through the growing season.',
      },
      {
        title: 'Reception & Washing',
        description:
          'Harvested beets are transported to the factory, weighed, sampled for sugar content, and washed to remove soil and stones before processing.',
      },
      {
        title: 'Diffusion',
        description:
          'Beets are sliced into thin cossettes and sugar is extracted through hot-water diffusion. The resulting raw juice contains approximately 14% sucrose.',
      },
      {
        title: 'Purification & Evaporation',
        description:
          'Raw juice is purified with lime and carbon dioxide, then evaporated in multi-effect evaporators to concentrate the syrup before crystallisation.',
      },
      {
        title: 'Crystallisation & Drying',
        description:
          'Concentrated syrup is crystallised in vacuum pans and centrifuged to produce white sugar. The sugar is dried, cooled, and stored in silos for packaging and dispatch.',
      },
    ],
    applications: [
      'White sugar for food, beverage, and pharmaceutical industries',
      'Bioethanol for European fuel mandates',
      'Beet pulp pellets for ruminant nutrition',
      'Vinasse and betaine for animal feed supplements',
      'Lime-based fertilisers returned to agricultural fields',
    ],
    image: TEREOS_PHOTOS.field,
    icon: '🥬',
  },
  {
    slug: 'wheat',
    title: 'Wheat',
    subtitle: 'Versatile Cereal Transformation',
    description:
      'Wheat is processed into starches, glucose syrups, proteins, and bioethanol at Tereos European cereal processing plants.',
    intro:
      'Wheat is the primary cereal feedstock for Tereos starch and sweetener operations. At industrial scale, the grain is separated into its three components — starch, gluten, and fibre — each serving distinct industrial and food markets. Wheat starch serves food texturising, paper coating, and fermentation; vital wheat gluten supports bakery and aquaculture; and residual fractions produce bioethanol.',
    keyFigures: [
      { value: '3M+', label: 'Tonnes of wheat processed annually' },
      { value: '4', label: 'Starch and sweetener plants' },
      { value: '1', label: 'Dedicated wheat ethanol unit' },
      { value: '300+', label: 'Product references produced' },
    ],
    processTitle: 'Grain to Ingredient',
    processDescription:
      'Wheat undergoes wet milling to separate starch, protein, and fibre for multiple downstream applications.',
    processSteps: [
      {
        title: 'Grain Reception & Cleaning',
        description:
          'Wheat is received from cooperative farms, cleaned, and conditioned before entering the wet milling process.',
      },
      {
        title: 'Wet Milling & Separation',
        description:
          'Grain is steeped and milled to separate starch slurry from gluten and fibre fractions. Centrifugal separation yields purified starch milk.',
      },
      {
        title: 'Starch Processing',
        description:
          'Native starch is dried for direct sale, or converted via enzymatic hydrolysis into glucose syrups, maltodextrins, and specialty sweeteners.',
      },
      {
        title: 'Protein Recovery',
        description:
          'Vital wheat gluten is recovered, dried, and sold for bakery improvers, aquaculture feed, and pet food applications.',
      },
      {
        title: 'Ethanol Production',
        description:
          'Starch fractions are fermented and distilled to produce wheat-based bioethanol meeting EU renewable fuel standards.',
      },
    ],
    applications: [
      'Native and modified starches for food texture',
      'Glucose syrups and maltodextrins for beverages',
      'Vital wheat gluten for bakery and feed',
      'Wheat-based bioethanol for fuel blending',
      'Paper and corrugated board starch coatings',
    ],
    image: TEREOS_PHOTOS.food,
    icon: '🌾',
  },
  {
    slug: 'corn',
    title: 'Corn',
    subtitle: 'Starch & Sweetener Powerhouse',
    description:
      'Corn is processed into high-performance starches, sweeteners, and industrial ingredients at Tereos facilities.',
    intro:
      'Corn (maize) is a highly versatile cereal crop used by Tereos for starch, sweetener, and ethanol production. Wet milling separates the kernel into starch, protein, oil, and fibre — each fraction serving distinct food, feed, and industrial markets. Corn starch derivatives include glucose, fructose, maltodextrin, and fermentation substrates used across the food, pharmaceutical, and paper industries.',
    keyFigures: [
      { value: '1.5M+', label: 'Tonnes of corn processed annually' },
      { value: '2', label: 'Processing facilities' },
      { value: '200+', label: 'Derived product grades' },
      { value: '95%', label: 'Kernel valorisation rate' },
    ],
    processTitle: 'Kernel to Product',
    processDescription:
      'Corn wet milling is a precision separation process yielding multiple high-value product streams.',
    processSteps: [
      {
        title: 'Steeping',
        description:
          'Corn kernels are steeped in warm water with sulphur dioxide for 24–48 hours to soften the grain and begin separation of components.',
      },
      {
        title: 'Milling & Separation',
        description:
          'Softened kernels are coarsely ground to release germ (for oil extraction), then finely milled to separate starch from fibre and gluten.',
      },
      {
        title: 'Starch Refining',
        description:
          'Purified starch slurry is washed, dewatered, and dried for native starch applications, or further processed into modified starches and sweeteners.',
      },
      {
        title: 'Sweetener Production',
        description:
          'Enzymatic hydrolysis converts starch to glucose syrups, which can be isomerised to high-fructose corn syrup for beverage applications.',
      },
      {
        title: 'Co-product Recovery',
        description:
          'Corn oil is extracted from germ, gluten meal is dried for animal feed, and fibre residues are pelletised for feed applications.',
      },
    ],
    applications: [
      'Native and modified starches for food and paper',
      'Glucose and fructose syrups for beverages',
      'Maltodextrins for nutrition and pharma',
      'Corn oil for cooking and industrial use',
      'Gluten feed and fibre for animal nutrition',
    ],
    image: TEREOS_PHOTOS.factory,
    icon: '🌽',
  },
  {
    slug: 'alfalfa',
    title: 'Alfalfa',
    subtitle: 'Protein-Rich Forage Crop',
    description:
      'Alfalfa is dehydrated and processed into high-protein feed products and plant-based protein concentrates at Tereos facilities.',
    intro:
      'Alfalfa (lucerne) is a nitrogen-fixing legume cultivated for its exceptional protein content and agronomic benefits. Tereos entered the alfalfa business through its partnership with APM Déshy, operating dehydration plants that transform fresh-cut alfalfa into dried pellets, bales, and protein concentrates. As a rotation crop, alfalfa improves soil health, reduces fertiliser needs, and supports biodiversity — making it a cornerstone of regenerative agriculture.',
    keyFigures: [
      { value: '500K+', label: 'Tonnes of alfalfa dehydrated annually' },
      { value: '3', label: 'Dehydration plants' },
      { value: '18%+', label: 'Protein content in dried products' },
      { value: '0', label: 'Synthetic nitrogen fertiliser needed' },
    ],
    processTitle: 'Field to Feed',
    processDescription:
      'Alfalfa undergoes rapid dehydration to preserve its nutritional value and produce shelf-stable feed products.',
    processSteps: [
      {
        title: 'Cultivation',
        description:
          'Alfalfa is sown as a perennial crop lasting 3–4 years, with 3–5 cuts per growing season. Its deep roots fix atmospheric nitrogen, enriching soil for subsequent crops.',
      },
      {
        title: 'Harvest & Transport',
        description:
          'Fresh-cut alfalfa is transported quickly to dehydration plants to minimise nutrient loss, typically within hours of cutting.',
      },
      {
        title: 'Dehydration',
        description:
          'Industrial drum dryers rapidly remove moisture, preserving protein, carotenoids, and vitamins. Heat is often generated from biomass to reduce the carbon footprint.',
      },
      {
        title: 'Pelletising & Packaging',
        description:
          'Dried alfalfa is milled and compressed into pellets or bales for easy handling, storage, and export.',
      },
      {
        title: 'Protein Extraction (Advanced)',
        description:
          'Green juice expressed during initial processing can be further refined to extract high-purity plant protein concentrates for food and feed applications.',
      },
    ],
    applications: [
      'Dehydrated pellets for ruminant and equine nutrition',
      'Plant protein concentrates for animal feed',
      'Carotenoid-rich ingredients for poultry pigmentation',
      'Soil improvement through nitrogen fixation',
      'Emerging plant-based protein for human food',
    ],
    image: TEREOS_PHOTOS.sustainability,
    icon: '🌿',
  },
];

export function getRawMaterial(slug: string): RawMaterial | undefined {
  return rawMaterials.find((rm) => rm.slug === slug);
}

export function getOtherRawMaterials(currentSlug: string): RawMaterial[] {
  return rawMaterials.filter((rm) => rm.slug !== currentSlug);
}
