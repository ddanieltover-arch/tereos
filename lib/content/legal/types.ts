export type LegalDocumentId = 'privacy' | 'cookies' | 'terms' | 'accessibility';

export interface LegalSubsection {
  title: string;
  paragraphs: string[];
  listItems?: string[];
}

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  listItems?: string[];
  subsections?: LegalSubsection[];
}

export interface LegalDocument {
  title: string;
  description: string;
  lastUpdated: string;
  contactLabel: string;
  contactEmail: string;
  sections: LegalSection[];
}
