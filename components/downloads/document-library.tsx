'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { DocumentCard } from '@/components/downloads/document-card';
import { cn } from '@/lib/utils';
import {
  getAvailableFiscalYears,
  IR_DOCUMENT_TYPES,
  type IrDocumentType,
} from '@/lib/investor/document-filters';
import type { DownloadDocument } from '@/types';

interface DocumentLibraryLabels {
  all: string;
  allYears: string;
  allLanguages: string;
  allFiscalYears: string;
  allDocumentTypes: string;
  filterFiscalYear: string;
  filterDocumentType: string;
  documentTypes: Record<IrDocumentType, string>;
  download: string;
  gated: string;
  gatedTitle: string;
  gatedDescription: string;
  email: string;
  submit: string;
  success: string;
  noResults: string;
}

interface DocumentLibraryProps {
  documents: DownloadDocument[];
  categoryLabels: Record<string, string>;
  initialCategory?: string;
  filterMode?: 'standard' | 'financial';
  syncUrlParams?: boolean;
  labels: DocumentLibraryLabels;
}

function DocumentLibraryInner({
  documents,
  categoryLabels,
  initialCategory = 'all',
  filterMode = 'standard',
  syncUrlParams = false,
  labels,
}: DocumentLibraryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(documents.map((d) => d.category)))],
    [documents]
  );
  const years = useMemo(
    () => ['all', ...Array.from(new Set(documents.map((d) => d.year))).sort((a, b) => b - a)],
    [documents]
  );
  const fiscalYears = useMemo(() => getAvailableFiscalYears(documents), [documents]);
  const languages = useMemo(
    () => ['all', ...Array.from(new Set(documents.map((d) => d.language)))],
    [documents]
  );

  const initialFiscalYear = syncUrlParams ? searchParams.get('fiscalYear') ?? 'all' : 'all';
  const initialDocType = syncUrlParams ? searchParams.get('type') ?? 'all' : 'all';

  const [category, setCategory] = useState(initialCategory);
  const [year, setYear] = useState<string>('all');
  const [fiscalYear, setFiscalYear] = useState(initialFiscalYear);
  const [docType, setDocType] = useState(initialDocType);
  const [language, setLanguage] = useState('all');
  const [gatedDoc, setGatedDoc] = useState<DownloadDocument | null>(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setCategory(initialCategory || 'all');
  }, [initialCategory]);

  useEffect(() => {
    if (!syncUrlParams) return;
    setFiscalYear(searchParams.get('fiscalYear') ?? 'all');
    setDocType(searchParams.get('type') ?? 'all');
  }, [searchParams, syncUrlParams]);

  const updateUrlParam = (key: string, value: string) => {
    if (!syncUrlParams) return;
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'all') params.delete(key);
    else params.set(key, value);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleFiscalYearChange = (value: string) => {
    setFiscalYear(value);
    updateUrlParam('fiscalYear', value);
  };

  const handleDocTypeChange = (value: string) => {
    setDocType(value);
    updateUrlParam('type', value);
  };

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      const matchLang = language === 'all' || d.language === language || d.language === 'all';

      if (filterMode === 'financial') {
        const matchCategory = category === 'all' || d.category === category;
        const matchFiscalYear = fiscalYear === 'all' || d.fiscalYear === fiscalYear;
        const matchDocType =
          docType === 'all' || (d.irType !== undefined && d.irType === docType);
        return matchCategory && matchFiscalYear && matchDocType && matchLang;
      }

      const matchCat = category === 'all' || d.category === category;
      const matchYear = year === 'all' || d.year === Number(year);
      return matchCat && matchYear && matchLang;
    });
  }, [documents, category, year, fiscalYear, docType, language, filterMode]);

  const handleDownload = (doc: DownloadDocument) => {
    if (doc.gated) {
      setGatedDoc(doc);
      setSubmitted(false);
      setEmail('');
      return;
    }
    if (doc.fileUrl && doc.fileUrl !== '#') {
      window.open(doc.fileUrl, '_blank');
    }
  };

  const handleGatedSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gatedDoc) return;
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: 'Download',
          lastName: 'Request',
          email,
          department: 'investor',
          subject: `Download request: ${gatedDoc.title}`,
          message: `Please send the document "${gatedDoc.title}" (${gatedDoc.year}) to ${email}.`,
        }),
      });
      setSubmitted(true);
      if (gatedDoc.fileUrl && gatedDoc.fileUrl !== '#') {
        window.open(gatedDoc.fileUrl, '_blank');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const selectClassName =
    'px-4 py-2 rounded-full text-sm border border-neutral-200 bg-white focus:outline-none focus:border-primary';

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 mb-10">
        {filterMode === 'standard' && (
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  category === cat
                    ? 'bg-primary text-white'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                )}
              >
                {cat === 'all' ? labels.all : categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3 lg:ml-auto">
          {filterMode === 'financial' ? (
            <>
              <select
                value={fiscalYear}
                onChange={(e) => handleFiscalYearChange(e.target.value)}
                aria-label={labels.filterFiscalYear}
                className={selectClassName}
              >
                <option value="all">{labels.allFiscalYears}</option>
                {fiscalYears.map((fy) => (
                  <option key={fy} value={fy}>
                    {fy}
                  </option>
                ))}
              </select>
              <select
                value={docType}
                onChange={(e) => handleDocTypeChange(e.target.value)}
                aria-label={labels.filterDocumentType}
                className={selectClassName}
              >
                <option value="all">{labels.allDocumentTypes}</option>
                {IR_DOCUMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {labels.documentTypes[type]}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              aria-label={labels.allYears}
              className={selectClassName}
            >
              <option value="all">{labels.allYears}</option>
              {years.filter((y) => y !== 'all').map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          )}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            aria-label={labels.allLanguages}
            className={selectClassName}
          >
            <option value="all">{labels.allLanguages}</option>
            {languages.filter((l) => l !== 'all').map((l) => (
              <option key={l} value={l}>
                {l.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-neutral-500 text-center py-16">{labels.noResults}</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              categoryLabel={categoryLabels[doc.category] || doc.category}
              labels={{ download: labels.download, gated: labels.gated }}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}

      <Modal open={!!gatedDoc} onOpenChange={(open) => !open && setGatedDoc(null)}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{labels.gatedTitle}</ModalTitle>
            <ModalDescription>{labels.gatedDescription}</ModalDescription>
          </ModalHeader>
          {submitted ? (
            <p className="text-primary font-medium py-4">{labels.success}</p>
          ) : (
            <form onSubmit={handleGatedSubmit} className="space-y-4">
              <input
                type="email"
                required
                placeholder={labels.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:outline-none focus:border-primary"
              />
              <Button type="submit" variant="primary" className="w-full" disabled={submitting}>
                {labels.submit}
              </Button>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

function DocumentLibraryFallback() {
  return <div className="h-40 animate-pulse rounded-2xl bg-neutral-50 mb-10" />;
}

export function DocumentLibrary(props: DocumentLibraryProps) {
  if (props.syncUrlParams) {
    return (
      <Suspense fallback={<DocumentLibraryFallback />}>
        <DocumentLibraryInner {...props} />
      </Suspense>
    );
  }

  return <DocumentLibraryInner {...props} />;
}

export type { DocumentLibraryLabels };
