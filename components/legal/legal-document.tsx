import Link from 'next/link';
import { CalendarDays } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { LegalSidebar } from '@/components/legal/legal-sidebar';
import { PageHero } from '@/components/shared/page-hero';
import type { LegalDocument } from '@/lib/content/legal/types';
import { LEGAL_ENTITY } from '@/lib/content/legal/constants';

interface LegalDocumentProps {
  locale: string;
  document: LegalDocument;
  relatedLinks?: { label: string; href: string }[];
  relatedLabel?: string;
  tableOfContentsLabel: string;
  needHelpLabel: string;
}

function renderParagraph(text: string, locale: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    const [, label, href] = match;
    const resolved = href.startsWith('/') ? `/${locale}${href}` : href;
    const isExternal = resolved.startsWith('http') || resolved.startsWith('mailto:');
    if (isExternal) {
      return (
        <a
          key={index}
          href={resolved}
          className="font-medium text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary"
          {...(resolved.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {label}
        </a>
      );
    }
    return (
      <Link
        key={index}
        href={resolved}
        className="font-medium text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary"
      >
        {label}
      </Link>
    );
  });
}

function LegalList({ items, locale }: { items: string[]; locale: string }) {
  return (
    <ul className="my-4 space-y-3">
      {items.map((item, itemIndex) => (
        <li key={itemIndex} className="flex gap-3 text-neutral-600 leading-relaxed">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          <span>{renderParagraph(item, locale)}</span>
        </li>
      ))}
    </ul>
  );
}

export function LegalDocumentPage({
  locale,
  document,
  relatedLinks,
  relatedLabel,
  tableOfContentsLabel,
  needHelpLabel,
}: LegalDocumentProps) {
  return (
    <>
      <PageHero
        eyebrow={LEGAL_ENTITY.name}
        title={document.title}
        description={document.description}
      />

      <section className="py-section bg-neutral-50">
        <div className="container-custom">
          <FadeIn>
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600 shadow-subtle">
                <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
                <span>
                  {document.lastUpdated}: <strong className="font-semibold text-neutral-900">June 2026</strong>
                </span>
              </div>
            </div>
          </FadeIn>

          <div className="grid gap-10 lg:grid-cols-12 xl:gap-14">
            <div className="lg:col-span-4 xl:col-span-3">
              <FadeIn delay={0.05}>
                <LegalSidebar
                  sections={document.sections.map(({ id, title }) => ({ id, title }))}
                  relatedLinks={relatedLinks}
                  tableOfContentsLabel={tableOfContentsLabel}
                  relatedLabel={relatedLabel}
                  needHelpLabel={needHelpLabel}
                  contactEmail={document.contactEmail}
                  contactLabel={document.contactLabel}
                />
              </FadeIn>
            </div>

            <div className="lg:col-span-8 xl:col-span-9 space-y-5">
              {document.sections.map((section, index) => (
                <FadeIn key={section.id} delay={index * 0.04}>
                  <article
                    id={section.id}
                    className="scroll-mt-32 rounded-2xl border border-neutral-200 bg-white p-6 sm:p-8 shadow-subtle"
                  >
                    <h2 className="border-l-4 border-primary pl-4 text-h4 font-bold text-neutral-900">
                      {section.title}
                    </h2>

                    <div className="mt-6 space-y-4">
                      {section.paragraphs.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-neutral-600 leading-relaxed">
                          {renderParagraph(paragraph, locale)}
                        </p>
                      ))}

                      {section.listItems && section.listItems.length > 0 && (
                        <LegalList items={section.listItems} locale={locale} />
                      )}

                      {section.subsections?.map((subsection) => (
                        <div
                          key={subsection.title}
                          className="mt-8 rounded-xl border border-neutral-100 bg-neutral-50/80 p-5 sm:p-6"
                        >
                          <h3 className="text-lg font-semibold text-neutral-900">{subsection.title}</h3>
                          <div className="mt-4 space-y-4">
                            {subsection.paragraphs.map((paragraph, pIndex) => (
                              <p key={pIndex} className="text-neutral-600 leading-relaxed">
                                {renderParagraph(paragraph, locale)}
                              </p>
                            ))}
                            {subsection.listItems && subsection.listItems.length > 0 && (
                              <LegalList items={subsection.listItems} locale={locale} />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
