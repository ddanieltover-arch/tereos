import { TEREOS_PHOTOS } from '@/lib/content/photography';

export interface CareerValue {
  id: string;
  title: string;
  description: string;
}

export interface CareerTestimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  image: string;
}

export const careerValues: CareerValue[] = [
  {
    id: 'sustainability',
    title: 'Sustainability at the Core',
    description:
      'Every decision we make balances economic performance with environmental stewardship and community impact — from cane field to consumer shelf.',
  },
  {
    id: 'partnership',
    title: 'Farmer Partnership',
    description:
      'We grow together with 5,000+ farming families. Fair contracts, technical support, and long-term relationships define how we operate.',
  },
  {
    id: 'innovation',
    title: 'Innovation & Excellence',
    description:
      'We invest in R&D, digital agriculture, and process engineering to stay at the forefront of sugar, bioenergy, and ingredient markets.',
  },
  {
    id: 'integrity',
    title: 'Integrity & Safety',
    description:
      'Zero compromise on ethical conduct and workplace safety. We maintain transparent governance and rigorous operational standards.',
  },
  {
    id: 'inclusion',
    title: 'Inclusive Culture',
    description:
      'Diverse perspectives drive better outcomes. We foster an environment where every colleague can contribute, grow, and belong.',
  },
  {
    id: 'development',
    title: 'Grow Your Career',
    description:
      'From graduate rotations to international assignments, we invest in learning paths that build leaders across Thailand and our global network.',
  },
];

export const careerTestimonials: CareerTestimonial[] = [
  {
    id: 't1',
    quote:
      'Joining Tereos meant working on projects that genuinely matter — reducing emissions while keeping mills competitive. The engineering team collaborates across Thailand, Brazil, and France every week.',
    name: 'Priya Sharma',
    role: 'Senior Process Engineer, Bioenergy',
    location: 'Bangkok, Thailand',
    image: TEREOS_PHOTOS.plantWorker,
  },
  {
    id: 't2',
    quote:
      'The graduate program gave me rotations in agronomy, sustainability reporting, and operations. Two years in, I lead farmer partnership initiatives that I helped design as an intern.',
    name: 'Somchai Wattana',
    role: 'Agricultural Program Manager',
    location: 'Khon Kaen, Thailand',
    image: TEREOS_PHOTOS.field,
  },
  {
    id: 't3',
    quote:
      'What sets Tereos apart is the cooperative mindset — even as a global company, decisions consider farmers and local communities. That alignment makes my work in ESG reporting meaningful.',
    name: 'Camille Dubois',
    role: 'Sustainability Analyst',
    location: 'Paris, France',
    image: TEREOS_PHOTOS.campus,
  },
  {
    id: 't4',
    quote:
      'I moved from commodity trading to ASEAN export sales at Tereos. The international exposure and mentorship culture helped me build a network across ten markets in three years.',
    name: 'Marcus Chen',
    role: 'Export Sales Manager',
    location: 'Singapore',
    image: TEREOS_PHOTOS.laboratory,
  },
];

export const careerStats = [
  { value: '25,000+', labelKey: 'statEmployees' },
  { value: '40+', labelKey: 'statCountries' },
  { value: '92%', labelKey: 'statRecommend' },
  { value: '18 mo', labelKey: 'statTenure' },
] as const;
