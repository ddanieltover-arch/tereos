
import Link from 'next/link';
import { ArrowLeft, ArrowRight, FileText } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { RegulatedInfoBlock } from '@/lib/content/investor';
import type { DownloadDocument } from '@/types';

interface RegulatedInfoViewProps {
  locale: string;
  blocks: RegulatedInfoBlock[];
  documents: DownloadDocument[];
  labels: {
    backLabel: string;
    backHref: string;
    viewPage: string;
    blocks: Record<
      string,
      {
        title: string;
        description: string;
      }
    >;
  };
}

export function RegulatedInfoView({
  locale,
  blocks,
  documents,
  labels,
}: RegulatedInfoViewProps) {
  return (
    <section className="py-section bg-white">
      <div className="container-custom">
        <FadeIn>
          <Link
            href={labels.backHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {labels.backLabel}
          </Link>
        </FadeIn>

        <div className="space-y-8">
          {blocks.map((block, index) => {
            const copy = labels.blocks[block.id];
            if (!copy) return null;

            const blockDocs = (block.documentTitles ?? [])
              .map((title) => documents.find((d) => d.title === title))
              .filter(Boolean) as DownloadDocument[];

            return (
              <FadeIn key={block.id} delay={index * 0.05}>
                <article className="p-6 lg:p-8 bg-neutral-50 rounded-2xl border border-neutral-100">
                  <h2 className="text-xl font-bold text-neutral-900">{copy.title}</h2>
                  <p className="text-neutral-600 mt-3 max-w-3xl">{copy.description}</p>

                  {(blockDocs.length > 0 || block.pageHref) && (
                    <ul className="mt-6 space-y-3">
                      {blockDocs.map((doc) => (
                        <li key={doc.id}>
                          <span className="inline-flex items-center gap-2 text-sm text-neutral-700">
                            <FileText className="w-4 h-4 text-primary shrink-0" />
                            {doc.title}
                            {doc.fileSize ? ` (${doc.fileSize})` : ''}
                          </span>
                        </li>
                      ))}
                      {block.pageHref && (
                        <li>
                          <Link
                            href={
                              block.pageHref.startsWith('/news-media')
                                ? `/${locale}${block.pageHref}`
                                : `/${locale}${block.pageHref}`
                            }
                            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                          >
                            {labels.viewPage} <ArrowRight className="w-4 h-4" />
                          </Link>
                        </li>
                      )}
                    </ul>
                  )}
                </article>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
