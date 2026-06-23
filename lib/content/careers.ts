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
    id: 'boldness',
    title: 'Boldness',
    description:
      'We are bold in our actions, we dare to take risks, we are enterprising and we are not afraid to make mistakes.',
  },
  {
    id: 'collaboration',
    title: 'Collaboration',
    description:
      'We work together, we share our knowledge and we support each other to achieve our common goals.',
  },
  {
    id: 'performance',
    title: 'Performance',
    description:
      'We are committed to delivering results, we strive for excellence and we continuously improve our processes.',
  },
  {
    id: 'pragmatism',
    title: 'Pragmatism',
    description:
      'We are pragmatic in our approach, we focus on what works and we adapt to changing circumstances.',
  },
];

export const careerTestimonials: CareerTestimonial[] = [
  {
    id: 't1',
    quote:
      'I joined Tereos as an apprentice and have been able to grow within the company. The cooperative model and the diversity of activities offer real career opportunities.',
    name: 'Téo',
    role: 'Production operator',
    location: 'France',
    image: TEREOS_PHOTOS.plantWorker,
  },
  {
    id: 't2',
    quote:
      'What I appreciate at Tereos is the trust placed in employees and the possibility of evolving across different sites and countries.',
    name: 'Olivier',
    role: 'Industrial manager',
    location: 'France',
    image: TEREOS_PHOTOS.field,
  },
  {
    id: 't3',
    quote:
      'Working at Tereos means being part of a group that links agriculture and industry, with a strong commitment to sustainable development.',
    name: 'Carlota',
    role: 'Sustainability',
    location: 'Brazil',
    image: TEREOS_PHOTOS.campus,
  },
  {
    id: 't4',
    quote:
      'The SUSTAIN\'2030 programme gave me exposure to agronomy, industrial operations, and CSR — a unique path to build a career in agri-food.',
    name: 'Clara',
    role: 'Graduate programme',
    location: 'France',
    image: TEREOS_PHOTOS.laboratory,
  },
];

export const careerStats = [
  { value: '10,300', labelKey: 'statGrowers' },
  { value: '15,800', labelKey: 'statEmployees' },
  { value: '38', labelKey: 'statSites' },
  { value: '€7.1bn', labelKey: 'statTurnover' },
] as const;
