import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LegalSidebarSection {
  id: string;
  title: string;
}

interface LegalSidebarProps {
  sections: LegalSidebarSection[];
  relatedLinks?: { label: string; href: string }[];
  tableOfContentsLabel: string;
  relatedLabel?: string;
  needHelpLabel: string;
  contactEmail: string;
  contactLabel: string;
}

export function LegalSidebar({
  sections,
  relatedLinks,
  tableOfContentsLabel,
  relatedLabel,
  needHelpLabel,
  contactEmail,
  contactLabel,
}: LegalSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-32 space-y-6">
      <nav
        aria-label={tableOfContentsLabel}
        className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-subtle"
      >
        <p className="text-label uppercase tracking-widest font-semibold text-primary mb-4">
          {tableOfContentsLabel}
        </p>
        <ol className="space-y-1">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className={cn(
                  'group flex items-start gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                  'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                )}
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </span>
                <span className="leading-snug group-hover:text-primary transition-colors">
                  {section.title.replace(/^\d+\.\s*/, '')}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {relatedLinks && relatedLinks.length > 0 && (
        <nav
          aria-label={relatedLabel ?? 'Related documents'}
          className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-subtle"
        >
          <p className="text-label uppercase tracking-widest font-semibold text-neutral-500 mb-4">
            {relatedLabel ?? 'Related documents'}
          </p>
          <ul className="space-y-2">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 hover:text-primary transition-colors"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div className="rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/5 to-secondary/5 p-6">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Mail className="h-5 w-5" />
        </div>
        <p className="font-semibold text-neutral-900">{needHelpLabel}</p>
        <p className="mt-1 text-sm text-neutral-600">{contactLabel}</p>
        <a
          href={`mailto:${contactEmail}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline underline-offset-2"
        >
          {contactEmail}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </aside>
  );
}
