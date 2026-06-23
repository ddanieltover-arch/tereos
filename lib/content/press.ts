export const PRESS_CONTACT = {
  email: 'contact-presse@tereos.com',
  phone: '',
  hours: '',
  responseTime: 'For all inquiries, please reach out to us via contact-presse@tereos.com.',
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
    email: 'contact-presse@tereos.com',
    region: 'Tereos Group',
  },
];

export const pressInquiries = [
  'For all inquiries, please reach out to us via contact-presse@tereos.com.',
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
  'For all inquiries, please reach out to us via the following email: contact-presse@tereos.com',
];
