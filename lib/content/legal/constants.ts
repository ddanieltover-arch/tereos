import { BRAZIL_OFFICE_ADDRESS, COMPANY_PHONE, THAILAND_OFFICE_ADDRESS } from '@/lib/site';

export const LEGAL_ENTITY = {
  name: 'Tereos Açúcar e Energia S.A.',
  website: 'tereosa.com',
  address: THAILAND_OFFICE_ADDRESS,
  brazilAddress: BRAZIL_OFFICE_ADDRESS,
  phone: COMPANY_PHONE,
  registration: 'Company Registration No. 0107536000123 (Thailand)',
  publicationDirector: 'Corporate Communications Department',
  hostingProvider: 'Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States',
  emails: {
    info: 'sales@tereosa.com',
    privacy: 'sales@tereosa.com',
    legal: 'sales@tereosa.com',
    accessibility: 'sales@tereosa.com',
  },
} as const;
