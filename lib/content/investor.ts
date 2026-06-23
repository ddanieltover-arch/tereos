export type IrSectionSlug =
  | 'annual-results'
  | 'regulated-information'
  | 'financial-calendar'
  | 'presentations'
  | 'governance';

export interface IrSection {
  slug: IrSectionSlug;
  href: string;
  external?: boolean;
}

export const IR_SECTIONS: IrSection[] = [
  { slug: 'annual-results', href: '/investor-relations/annual-results' },
  { slug: 'regulated-information', href: '/investor-relations/regulated-information' },
  { slug: 'financial-calendar', href: '/investor-relations/financial-calendar' },
  { slug: 'presentations', href: '/investor-relations/presentations' },
  { slug: 'governance', href: '/about/governance' },
];

export type ResultPeriod = 'annual' | 'h1' | 'q1' | 'q3';

export interface AnnualResultRelease {
  id: string;
  year: number;
  period: ResultPeriod;
  title: string;
  publishedAt: string;
  highlight?: string;
  newsSlug?: string;
  documentTitle?: string;
}

export const annualResultReleases: AnnualResultRelease[] = [
  {
    id: 'annual-2025-26',
    year: 2026,
    period: 'annual',
    title: '2025/26 Annual results',
    publishedAt: '2026-05-28',
    newsSlug: 'annual-results-2025-26',
    documentTitle: '2025/26 Annual results press release',
  },
  {
    id: 'h1-2025-26',
    year: 2025,
    period: 'h1',
    title: '2025/26 Half-year accounts',
    publishedAt: '2025-11-21',
    highlight: 'Results in line with forecasts',
    newsSlug: 'half-year-results-2025-26',
    documentTitle: '2025/26 Half-year financial results',
  },
  {
    id: 'annual-2024-25',
    year: 2025,
    period: 'annual',
    title: 'Annual Report 2024/25',
    publishedAt: '2025-06-18',
    documentTitle: 'Annual Report 2024/25',
  },
  {
    id: 'h1-2024-25',
    year: 2024,
    period: 'h1',
    title: 'Half-Year Financial Report 2024/25',
    publishedAt: '2024-11-21',
    documentTitle: 'Half-Year Financial Report 2025',
  },
  {
    id: 'annual-2024',
    year: 2024,
    period: 'annual',
    title: 'Annual Report 2024',
    publishedAt: '2024-06-20',
    documentTitle: 'Annual Report 2024',
  },
];

export type CalendarEventType = 'results' | 'agm' | 'dividend' | 'publication';

export interface FinancialCalendarEvent {
  id: string;
  date: string;
  title: string;
  type: CalendarEventType;
  description: string;
  relatedHref?: string;
}

export const financialCalendarEvents: FinancialCalendarEvent[] = [
  {
    id: 'fc-q1-2026',
    date: '2026-04-28',
    title: 'Q1 2026 results publication',
    type: 'results',
    description: 'First-quarter revenue, EBITDA, and net debt figures.',
    relatedHref: '/investor-relations/annual-results',
  },
  {
    id: 'fc-agm-2026',
    date: '2026-06-25',
    title: 'Annual General Meeting 2026',
    type: 'agm',
    description: 'Shareholder meeting to approve the 2025 accounts and dividend proposal.',
    relatedHref: '/investor-relations/regulated-information',
  },
  {
    id: 'fc-h1-2026',
    date: '2026-07-30',
    title: 'H1 2026 results publication',
    type: 'results',
    description: 'Half-year consolidated financial statements and investor presentation.',
    relatedHref: '/investor-relations/annual-results',
  },
  {
    id: 'fc-dividend-2026',
    date: '2026-09-15',
    title: 'Interim dividend payment',
    type: 'dividend',
    description: 'Payment date for the interim dividend approved at the AGM.',
  },
  {
    id: 'fc-q3-2026',
    date: '2026-10-29',
    title: 'Q3 2026 results publication',
    type: 'results',
    description: 'Nine-month revenue and operating performance update.',
    relatedHref: '/investor-relations/annual-results',
  },
  {
    id: 'fc-annual-2026',
    date: '2027-04-22',
    title: 'FY 2026 annual results',
    type: 'results',
    description: 'Full-year results, annual report, and sustainability highlights.',
    relatedHref: '/investor-relations/annual-results',
  },
];

export interface RegulatedInfoBlock {
  id: string;
  documentTitles?: string[];
  pageHref?: string;
}

export const regulatedInfoBlocks: RegulatedInfoBlock[] = [
  {
    id: 'periodic',
    documentTitles: ['Annual Report 2025', 'Q1 2026 Interim Report', 'Half-Year Financial Report 2025'],
  },
  {
    id: 'insideInformation',
    pageHref: '/news-media?tab=press-releases',
  },
  {
    id: 'shareholderMeetings',
    documentTitles: ['Corporate Governance Charter'],
    pageHref: '/investor-relations/financial-calendar',
  },
  {
    id: 'governance',
    pageHref: '/about/governance',
    documentTitles: ['Corporate Governance Charter'],
  },
  {
    id: 'debtInvestors',
    documentTitles: ['Investor Presentation — H1 2026'],
  },
];
