/**
 * Seed Sanity CMS with initial Tereos corporate content.
 *
 * Usage:
 *   1. Create a project at https://sanity.io/manage
 *   2. Add SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN to .env.local
 *   3. Deploy schemas: npm run sanity:deploy
 *   4. Run seed: npm run sanity:seed
 *   5. Full news archive: npm run generate:news-archive && npm run sanity:seed:news
 */

import { createClient } from '@sanity/client';
import { config } from 'dotenv';

config({ path: '.env.local' });

const projectId = process.env.SANITY_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error('Missing SANITY_PROJECT_ID or SANITY_API_TOKEN in .env.local');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

const id = (type, slug) => `${type}-${slug}`;

const IMG = '/images/tereos';
const PHOTOS = {
  agriculture: `${IMG}/agriculture-beet-irrigation.png`,
  factory: `${IMG}/factory-connantre.png`,
  field: `${IMG}/field-partners.png`,
  food: `${IMG}/food-ingredients.png`,
  renewable: `${IMG}/renewable-biomass.jpg`,
  productSugar: `${IMG}/product-sugar.jpg`,
  productBioenergy: `${IMG}/product-bioenergy.jpg`,
  productMolasses: `${IMG}/product-molasses.jpg`,
  productBiomass: `${IMG}/product-biomass.jpg`,
  marketEnergy: `${IMG}/market-energy.jpg`,
  newsInvestor: `${IMG}/news-investor.jpg`,
  newsSustainability: `${IMG}/news-sustainability.jpg`,
  innovation: `${IMG}/innovation-lab.jpg`,
  annualCover: `${IMG}/factory-connantre.png`,
  esgCover: `${IMG}/sustainability-2030.jpg`,
};

const localized = (en, th, ptBr) => ({ en, th, ptBr });

const divisions = [
  {
    _id: id('businessDivision', 'sugar'),
    _type: 'businessDivision',
    title: localized(
      'Sugar',
      'น้ำตาล',
      'Açúcar'
    ),
    slug: { _type: 'slug', current: 'sugar' },
    description: localized(
      'World-class sugar production from cane to crystal, serving food, beverage, and industrial markets globally with uncompromising quality.',
      'การผลิตน้ำตาลระดับโลกจากอ้อยสู่ผลึก บริการตลาดอาหาร เครื่องดื่ม และอุตสาหกรรมทั่วโลก',
      'Produção mundial de açúcar da cana ao cristal, atendendo mercados de alimentos, bebidas e indústria.'
    ),
    imageUrl: PHOTOS.agriculture,
    order: 1,
  },
  {
    _id: id('businessDivision', 'bioenergy'),
    _type: 'businessDivision',
    title: localized('Bioenergy', 'พลังงานชีวภาพ', 'Bioenergia'),
    slug: { _type: 'slug', current: 'bioenergy' },
    description: localized(
      'Renewable energy solutions including ethanol, biomass power, and next-generation biofuels driving the clean energy transition.',
      'โซลูชันพลังงานหมุนเวียนรวมถึงเอทานอล พลังงานชีวมวล และไบโอฟูเอลรุ่นต่อไป',
      'Soluções de energia renovável incluindo etanol, biomassa e biocombustíveis de nova geração.'
    ),
    imageUrl: PHOTOS.factory,
    order: 2,
  },
  {
    _id: id('businessDivision', 'agriculture'),
    _type: 'businessDivision',
    title: localized('Agriculture', 'การเกษตร', 'Agricultura'),
    slug: { _type: 'slug', current: 'agriculture' },
    description: localized(
      'Sustainable farming practices, agricultural services, and farmer partnership programs cultivating prosperity in rural communities.',
      'การปฏิบัติการเกษตรอย่างยั่งยืน บริการการเกษตร และโครงการร่วมมือกับเกษตรกร',
      'Práticas agrícolas sustentáveis, serviços agrícolas e programas de parceria com agricultores.'
    ),
    imageUrl: PHOTOS.field,
    order: 3,
  },
  {
    _id: id('businessDivision', 'food-ingredients'),
    _type: 'businessDivision',
    title: localized('Food Ingredients', 'ส่วนผสมอาหาร', 'Ingredientes Alimentícios'),
    slug: { _type: 'slug', current: 'food-ingredients' },
    description: localized(
      'Specialty ingredients, sweeteners, and functional solutions that enhance taste, texture, and nutrition for the global food industry.',
      'ส่วนผสมพิเศษ สารให้ความหวาน และโซลูชันฟังก์ชันเพื่ออุตสาหกรรมอาหารโลก',
      'Ingredientes especiais, adoçantes e soluções funcionais para a indústria alimentícia global.'
    ),
    imageUrl: PHOTOS.food,
    order: 4,
  },
  {
    _id: id('businessDivision', 'renewable-solutions'),
    _type: 'businessDivision',
    title: localized('Renewable Solutions', 'โซลูชันหมุนเวียน', 'Soluções Renováveis'),
    slug: { _type: 'slug', current: 'renewable-solutions' },
    description: localized(
      'Circular economy innovations transforming agricultural byproducts into valuable resources for a sustainable tomorrow.',
      'นวัตกรรมเศรษฐกิจหมุนเวียนที่เปลี่ยนผลพลอยได้ทางการเกษตรเป็นทรัพยากรมีค่า',
      'Inovações de economia circular transformando subprodutos agrícolas em recursos valiosos.'
    ),
    imageUrl: PHOTOS.renewable,
    order: 5,
  },
];

const products = [
  {
    _id: id('product', 'crystal-sugar-icumsa-45'),
    _type: 'product',
    name: localized('Crystal Sugar ICUMSA 45', 'น้ำตาลคริสตัล ICUMSA 45', 'Açúcar Cristal ICUMSA 45'),
    slug: { _type: 'slug', current: 'crystal-sugar-icumsa-45' },
    category: 'sugar',
    description: localized(
      'Premium refined white sugar meeting international quality standards for food and beverage applications.',
      'น้ำตาลขาวบริสุทธิ์พรีเมียมที่ตรงตามมาตรฐานคุณภาพระดับสากล',
      'Açúcar branco refinado premium atendendo padrões internacionais de qualidade.'
    ),
    imageUrl: PHOTOS.productSugar,
    featured: true,
  },
  {
    _id: id('product', 'fuel-ethanol'),
    _type: 'product',
    name: localized('Fuel Ethanol', 'เอทานอลเชื้อเพลิง', 'Etanol Combustível'),
    slug: { _type: 'slug', current: 'fuel-ethanol' },
    category: 'bioenergy',
    description: localized(
      'High-purity bioethanol for fuel blending and industrial applications, supporting clean energy transition.',
      'ไบโอเอทานอลบริสุทธิ์สูงสำหรับการผสมเชื้อเพลิงและการใช้งานอุตสาหกรรม',
      'Bioetanol de alta pureza para mistura de combustíveis e aplicações industriais.'
    ),
    imageUrl: PHOTOS.productBioenergy,
    featured: true,
  },
  {
    _id: id('product', 'molasses'),
    _type: 'product',
    name: localized('Molasses', 'กากน้ำตาล', 'Melaço'),
    slug: { _type: 'slug', current: 'molasses' },
    category: 'food-ingredients',
    description: localized(
      'Versatile syrup for animal feed, fermentation, and food processing industries.',
      'น้ำเชื่อมอเนกประสงค์สำหรับอาหารสัตว์ การหมัก และอุตสาหกรรมแปรรูปอาหาร',
      'Xarope versátil para ração animal, fermentação e indústria de processamento de alimentos.'
    ),
    imageUrl: PHOTOS.productMolasses,
    featured: true,
  },
  {
    _id: id('product', 'bagasse-pellets'),
    _type: 'product',
    name: localized('Bagasse Pellets', 'เชื้อเพลิงเม็ดจากกากอ้อย', 'Pellets de Bagaço'),
    slug: { _type: 'slug', current: 'bagasse-pellets' },
    category: 'renewable',
    description: localized(
      'Sustainable biomass fuel derived from sugarcane fiber for power generation.',
      'เชื้อเพลิงชีวมวลที่ยั่งยืนจากเส้นใยอ้อยสำหรับผลิตไฟฟ้า',
      'Combustível de biomassa sustentável derivado da fibra da cana-de-açúcar.'
    ),
    imageUrl: PHOTOS.productBiomass,
    featured: true,
  },
  {
    _id: id('product', 'raw-sugar'),
    _type: 'product',
    name: localized('Raw Sugar VHP', 'น้ำตาลดิบ VHP', 'Açúcar VHP'),
    slug: { _type: 'slug', current: 'raw-sugar-vhp' },
    category: 'sugar',
    description: localized(
      'Very High Pol raw sugar for refining and international commodity trading.',
      'น้ำตาลดิบ Very High Pol สำหรับการกลั่นและการค้าระหว่างประเทศ',
      'Açúcar VHP para refino e comércio internacional de commodities.'
    ),
    imageUrl: PHOTOS.agriculture,
    featured: false,
  },
  {
    _id: id('product', 'biomass-power'),
    _type: 'product',
    name: localized('Biomass Power', 'พลังงานชีวมวล', 'Energia de Biomassa'),
    slug: { _type: 'slug', current: 'biomass-power' },
    category: 'bioenergy',
    description: localized(
      'Renewable electricity generated from sugarcane bagasse and agricultural residues.',
      'ไฟฟ้าพลังงานหมุนเวียนจากกากอ้อยและเศษวัสดุทางการเกษตร',
      'Eletricidade renovável gerada a partir de bagaço de cana e resíduos agrícolas.'
    ),
    imageUrl: PHOTOS.marketEnergy,
    featured: false,
  },
];

const news = [
  {
    _id: id('newsArticle', 'bioenergy-expansion-sea'),
    _type: 'newsArticle',
    title: localized(
      'Tereos Announces Major Expansion of Bioenergy Operations in Southeast Asia',
      'Tereos ประกาศขยายการดำเนินงานพลังงานชีวภาพในภูมิภาคเอเชียตะวันออกเฉียงใต้',
      'Tereos anuncia grande expansão das operações de bioenergia no Sudeste Asiático'
    ),
    slug: { _type: 'slug', current: 'bioenergy-expansion-sea' },
    category: 'press-release',
    publishedAt: '2026-06-15T09:00:00Z',
    excerpt: localized(
      'The company invests €200M in new biomass power facilities to support regional renewable energy goals.',
      'บริษัทลงทุน 200 ล้านยูโรในโรงไฟฟ้าชีวมวลใหม่เพื่อสนับสนุนเป้าหมายพลังงานหมุนเวียน',
      'A empresa investe €200M em novas instalações de biomassa para apoiar metas de energia renovável.'
    ),
    imageUrl: PHOTOS.factory,
    author: 'Corporate Communications',
    featured: true,
    pdfUrl: '/downloads/press-bioenergy-saf-2026.pdf',
  },
  {
    _id: id('newsArticle', 'sustainability-report-2025'),
    _type: 'newsArticle',
    title: localized(
      'Sustainability Report 2025: Record Carbon Reduction Achieved',
      'รายงานความยั่งยืน 2025: บรรลุการลดคาร์บอนสถิติ',
      'Relatório de Sustentabilidade 2025: Redução recorde de carbono'
    ),
    slug: { _type: 'slug', current: 'sustainability-report-2025' },
    category: 'sustainability',
    publishedAt: '2026-05-28T09:00:00Z',
    excerpt: localized(
      'Tereos reports a 35% reduction in carbon emissions across all operations, exceeding targets ahead of schedule.',
      'Tereos รายงานการลดการปล่อยคาร์บอน 35% ทั่วทุกการดำเนินงาน เกินเป้าหมาย',
      'Tereos reporta redução de 35% nas emissões de carbono, superando metas antes do prazo.'
    ),
    imageUrl: PHOTOS.newsSustainability,
    author: 'ESG Team',
    featured: true,
  },
  {
    _id: id('newsArticle', 'farmer-partnership-thailand'),
    _type: 'newsArticle',
    title: localized(
      'Partnership with Thai Farmers Boosts Sustainable Sugarcane Production',
      'ความร่วมมือกับเกษตรกรไทยส่งเสริมการผลิตอ้อยอย่างยั่งยืน',
      'Parceria com agricultores tailandeses impulsiona produção sustentável de cana'
    ),
    slug: { _type: 'slug', current: 'farmer-partnership-thailand' },
    category: 'community',
    publishedAt: '2026-05-10T09:00:00Z',
    excerpt: localized(
      'New cooperative program reaches 5,000+ farming families with advanced agricultural training and resources.',
      'โครงการสหกรณ์ใหม่ครอบคลุมครอบครัวเกษตรกรกว่า 5,000 ครัวเรือน',
      'Novo programa cooperativo alcança mais de 5.000 famílias de agricultores.'
    ),
    imageUrl: PHOTOS.field,
    author: 'Community Relations',
    featured: true,
  },
  {
    _id: id('newsArticle', 'q1-results-2026'),
    _type: 'newsArticle',
    title: localized(
      'Q1 2026 Results: Strong Performance Across All Divisions',
      'ผลประกอบการ Q1 2026: ผลงานแข็งแกร่งทุกหน่วยธุรกิจ',
      'Resultados Q1 2026: Desempenho forte em todas as divisões'
    ),
    slug: { _type: 'slug', current: 'q1-results-2026' },
    category: 'investor',
    publishedAt: '2026-04-22T09:00:00Z',
    excerpt: localized(
      'Revenue up 12% year-over-year driven by sugar exports and bioenergy growth.',
      'รายได้เพิ่มขึ้น 12% เทียบปีก่อนจากการส่งออกน้ำตาลและการเติบโตของพลังงานชีวภาพ',
      'Receita aumenta 12% ano a ano impulsionada por exportações de açúcar e bioenergia.'
    ),
    imageUrl: PHOTOS.newsInvestor,
    author: 'Investor Relations',
    featured: false,
    pdfUrl: '/downloads/press-annual-results-2025-26.pdf',
  },
  {
    _id: id('newsArticle', 'innovation-lab-launch'),
    _type: 'newsArticle',
    title: localized(
      'New Agricultural Innovation Lab Opens in Bangkok',
      'เปิดห้องปฏิบัติการนวัตกรรมการเกษตรแห่งใหม่ในกรุงเทพฯ',
      'Novo laboratório de inovação agrícola abre em Bangkok'
    ),
    slug: { _type: 'slug', current: 'innovation-lab-launch' },
    category: 'announcement',
    publishedAt: '2026-03-18T09:00:00Z',
    excerpt: localized(
      'State-of-the-art R&D facility focused on precision agriculture and sustainable crop science.',
      'สถานที่วิจัยและพัฒนาที่ทันสมัยมุ่งเน้นการเกษตรแม่นยำและวิทยาศาสตร์พืชที่ยั่งยืน',
      'Instalação de P&D de ponta focada em agricultura de precisão e ciência de culturas sustentáveis.'
    ),
    imageUrl: PHOTOS.innovation,
    author: 'Innovation Team',
    featured: false,
  },
];

const downloads = [
  {
    _id: id('downloadDocument', 'annual-report-2024-25'),
    _type: 'downloadDocument',
    title: localized('Annual Report 2024/25', 'รายงานประจำปี 2024/25', 'Relatório Anual 2024/25'),
    category: 'annual-report',
    year: 2025,
    language: 'en',
    documentKey: 'annual-report-2024-25',
    fileUrl: '/downloads/annual-report-2024-25.pdf',
    imageUrl: PHOTOS.annualCover,
    gated: true,
    featured: true,
  },
  {
    _id: id('downloadDocument', 'non-financial-statement-2024-25'),
    _type: 'downloadDocument',
    title: localized('Non-Financial Statement 2024/25', 'งบแสดงฐานะการเงินนอกงบ 2024/25', 'Demonstração Não Financeira 2024/25'),
    category: 'sustainability-report',
    year: 2025,
    language: 'all',
    documentKey: 'non-financial-statement-2024-25',
    fileUrl: '/downloads/non-financial-statement-2024-25.pdf',
    imageUrl: PHOTOS.esgCover,
    featured: true,
  },
  {
    _id: id('downloadDocument', 'ethical-charter-2025'),
    _type: 'downloadDocument',
    title: localized('Ethical Charter 2025', 'จรรยาบรรณ 2025', 'Carta Ética 2025'),
    category: 'brochure',
    year: 2025,
    language: 'all',
    documentKey: 'ethical-charter-2025',
    fileUrl: '/downloads/ethical-charter-2025.pdf',
    featured: true,
  },
  {
    _id: id('downloadDocument', 'press-half-year-2025'),
    _type: 'downloadDocument',
    title: localized('Half-Year Results 2025/26', 'ผลประกอบการครึ่งปี 2025/26', 'Resultados Semestrais 2025/26'),
    category: 'ir-document',
    year: 2025,
    language: 'en',
    documentKey: 'press-half-year-2025',
    fileUrl: '/downloads/press-half-year-2025.pdf',
  },
  {
    _id: id('downloadDocument', 'press-annual-results-2025-26'),
    _type: 'downloadDocument',
    title: localized('Full Year 2025/26 Results', 'ผลประกอบการปี 2025/26', 'Resultados Anuais 2025/26'),
    category: 'ir-document',
    year: 2026,
    language: 'en',
    documentKey: 'press-annual-results-2025-26',
    fileUrl: '/downloads/press-annual-results-2025-26.pdf',
  },
];

const siteSettings = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  siteName: 'Tereos Açúcar e Energia S.A.',
  tagline: localized(
    'Day by day, cultivating the future',
    'วันต่อวัน เราปลูกปัญญาเพื่ออนาคต',
    'Dia após dia, cultivando o futuro'
  ),
  description: localized(
    'Global leader in sugar production, bioenergy, agricultural innovation, and sustainable food solutions.',
    'ผู้นำระดับโลกด้านการผลิตน้ำตาล พลังงานชีวภาพ นวัตกรรมการเกษตร และโซลูชันด้านอาหารที่ยั่งยืน',
    'Líder global em produção de açúcar, bioenergia, inovação agrícola e soluções alimentares sustentáveis.'
  ),
  contactEmail: 'info@tereosa.com',
  phone: '+66 2 XXX XXXX',
  address: 'Bangkok, Thailand',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/tereosa',
    twitter: 'https://twitter.com/tereosa',
    youtube: 'https://youtube.com/@tereosa',
  },
};

async function seed() {
  const documents = [siteSettings, ...divisions, ...products, ...news, ...downloads];

  console.log(`Seeding ${documents.length} documents to ${projectId}/${dataset}...`);

  const transaction = client.transaction();
  for (const doc of documents) {
    transaction.createOrReplace(doc);
  }

  await transaction.commit();
  console.log('Seed complete.');
}

seed().catch((err) => {
  console.error('Seed failed:', err.message);
  process.exit(1);
});
