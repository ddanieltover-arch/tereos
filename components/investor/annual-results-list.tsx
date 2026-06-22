
import Link from 'next/link';
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { AnnualResultRelease } from '@/lib/content/investor';
import type { DownloadDocument } from '@/types';

interface AnnualResultsListProps {
  locale: string;
  releases: AnnualResultRelease[];
  documents: DownloadDocument[];
  labels: {
    periodAnnual: string;
    periodH1: string;
    periodQ1: string;
    periodQ3: string;
    viewPressRelease: string;
    reportAvailable: string;
    noDocument: string;
  };
  backLabel: string;
  backHref: string;
}

const PERIOD_LABEL_KEYS: Record<AnnualResultRelease['period'], keyof AnnualResultsListProps['labels']> = {
  annual: 'periodAnnual',
  h1: 'periodH1',
  q1: 'periodQ1',
  q3: 'periodQ3',
};

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

export function AnnualResultsList({
  locale,
  releases,
  documents,
  labels,
  backLabel,
  backHref,
}: AnnualResultsListProps) {
  const byYear = releases.reduce<Record<number, AnnualResultRelease[]>>((acc, release) => {
    if (!acc[release.year]) acc[release.year] = [];
    acc[release.year].push(release);
    return acc;
  }, {});

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <section className="py-section bg-white">
      <div className="container-custom">
        <FadeIn>
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {backLabel}
          </Link>
        </FadeIn>

        <div className="space-y-12">
          {years.map((year, yearIndex) => (
            <FadeIn key={year} delay={yearIndex * 0.05}>
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 mb-6 pb-3 border-b border-neutral-200">
                  {year}
                </h2>
                <div className="space-y-4">
                  {byYear[year].map((release) => {
                    const doc = release.documentTitle
                      ? documents.find((d) => d.title === release.documentTitle)
                      : undefined;

                    return (
                      <article
                        key={release.id}
                        className="flex flex-col lg:flex-row lg:items-center gap-4 p-6 bg-neutral-50 rounded-2xl border border-neutral-100"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">
                            {labels[PERIOD_LABEL_KEYS[release.period]]}
                          </p>
                          <h3 className="text-lg font-bold text-neutral-900">{release.title}</h3>
                          <p className="text-sm text-neutral-500 mt-1">
                            {formatDate(release.publishedAt, locale)}
                          </p>
                          {release.highlight && (
                            <p className="text-sm text-neutral-600 mt-2">{release.highlight}</p>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-3 shrink-0">
                          {release.newsSlug && (
                            <Link
                              href={`/${locale}/news-media/${release.newsSlug}`}
                              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white border border-neutral-200 rounded-lg hover:border-primary hover:text-primary transition-colors"
                            >
                              {labels.viewPressRelease}
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}
                          {doc ? (
                            <span className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-white border border-neutral-200 rounded-lg text-neutral-700">
                              <FileText className="w-4 h-4 text-primary" />
                              {labels.reportAvailable}
                              {doc.fileSize ? ` · ${doc.fileSize}` : ''}
                            </span>
                          ) : (
                            <span className="text-sm text-neutral-400">{labels.noDocument}</span>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
