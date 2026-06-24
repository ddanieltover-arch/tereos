import { COMPANY_PHONE } from '@/lib/site';

export const PRESS_CONTACT = {
  email: 'sales@tereosa.com',
  phone: COMPANY_PHONE,
  hours: '',
  responseTime: 'For all inquiries, please reach out to us via sales@tereosa.com.',
} as const;

export interface PressTeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  region: string;
}

export const pressTeam: PressTeamMember[] = [
  {
    id: 'press-office',
    name: 'Tereos Press Office',
    role: 'Media Relations',
    email: 'sales@tereosa.com',
    region: 'Tereos Group',
  },
];

export const pressInquiries = [
  'For all inquiries, please reach out to us via sales@tereosa.com.',
];

export const pressResources = [
  {
    id: 'releases',
    title: 'Latest press releases',
    description: 'Read the latest press releases published by Tereos.',
    href: '/news-media?tab=press-releases',
  },
] as const;

export const pressIntro = [
  'Welcome to our Press contact page.',
  'For all inquiries, please reach out to us via the following email: sales@tereosa.com',
];
