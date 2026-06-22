export const PRESS_CONTACT = {
  email: 'media@tereosa.com',
  phone: '+66 2 XXX XXXX',
  hours: 'Mon–Fri, 9:00–18:00 ICT (Bangkok)',
  responseTime: 'We aim to respond to verified media inquiries within one business day.',
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
    id: 'apac',
    name: 'Nattaya Srisuk',
    role: 'Head of Corporate Communications — APAC',
    email: 'media@tereosa.com',
    phone: '+66 2 XXX XXXX',
    region: 'Bangkok, Thailand',
  },
  {
    id: 'global',
    name: 'Thomas Mercier',
    role: 'Group Media Relations',
    email: 'media@tereosa.com',
    region: 'Paris, France',
  },
];

export const pressInquiries = [
  'Interview and spokesperson requests',
  'Press release confirmations and fact-checking',
  'Corporate imagery, logos, and b-roll',
  'Sustainability and ESG data requests',
  'Event and facility visit coordination',
  'Crisis and urgent media enquiries',
];

export const pressResources = [
  {
    id: 'newsroom',
    title: 'Newsroom',
    description: 'Latest press releases, news, and media documents.',
    href: '/news-media',
  },
  {
    id: 'releases',
    title: 'Press releases',
    description: 'Official announcements and regulatory disclosures.',
    href: '/news-media?tab=press-releases',
  },
  {
    id: 'downloads',
    title: 'Download center',
    description: 'Annual reports, fact sheets, logos, and brand guidelines.',
    href: '/download-center',
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    description: 'ESG commitments, metrics, and community programmes.',
    href: '/sustainability',
  },
] as const;

export const pressIntro = [
  'Welcome to the Tereos press contact page. Our communications team supports journalists, editors, and media professionals covering sugar, bioenergy, agriculture, and sustainable food systems.',
  'Please use the form below or contact us directly. Include your outlet, deadline, and the nature of your request so we can respond promptly. Only legitimate media enquiries will receive a response.',
];
