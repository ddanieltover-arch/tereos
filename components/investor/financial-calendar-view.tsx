
import Link from 'next/link';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { FinancialCalendarEvent } from '@/lib/content/investor';
import { cn } from '@/lib/utils';

interface FinancialCalendarViewProps {
  locale: string;
  events: FinancialCalendarEvent[];
  labels: {
    backLabel: string;
    backHref: string;
    typeResults: string;
    typeAgm: string;
    typeDividend: string;
    typePublication: string;
    upcoming: string;
    past: string;
    learnMore: string;
  };
}

const TYPE_LABEL_KEYS: Record<
  FinancialCalendarEvent['type'],
  keyof Pick<
    FinancialCalendarViewProps['labels'],
    'typeResults' | 'typeAgm' | 'typeDividend' | 'typePublication'
  >
> = {
  results: 'typeResults',
  agm: 'typeAgm',
  dividend: 'typeDividend',
  publication: 'typePublication',
};

const TYPE_STYLES: Record<FinancialCalendarEvent['type'], string> = {
  results: 'bg-primary/10 text-primary',
  agm: 'bg-secondary/10 text-secondary',
  dividend: 'bg-accent-green/10 text-accent-green',
  publication: 'bg-neutral-200 text-neutral-700',
};

function formatDate(iso: string, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}

export function FinancialCalendarView({ locale, events, labels }: FinancialCalendarViewProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const sorted = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const upcoming = sorted.filter((e) => new Date(e.date) >= today);
  const past = sorted.filter((e) => new Date(e.date) < today).reverse();

  const renderGroup = (title: string, items: FinancialCalendarEvent[]) => (
    <div>
      <h2 className="text-xl font-bold text-neutral-900 mb-6">{title}</h2>
      <ol className="relative border-l border-neutral-200 ml-3 space-y-8">
        {items.map((event, index) => (
          <FadeIn key={event.id} delay={index * 0.04}>
            <li className="ml-8">
              <span className="absolute -left-1.5 mt-1.5 w-3 h-3 rounded-full bg-primary ring-4 ring-white" />
              <div className="p-5 bg-neutral-50 rounded-2xl border border-neutral-100">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold',
                      TYPE_STYLES[event.type]
                    )}
                  >
                    <CalendarDays className="w-3.5 h-3.5" />
                    {labels[TYPE_LABEL_KEYS[event.type]]}
                  </span>
                  <time dateTime={event.date} className="text-sm text-neutral-500">
                    {formatDate(event.date, locale)}
                  </time>
                </div>
                <h3 className="font-bold text-neutral-900">{event.title}</h3>
                <p className="text-sm text-neutral-600 mt-2">{event.description}</p>
                {event.relatedHref && (
                  <Link
                    href={`/${locale}${event.relatedHref}`}
                    className="inline-block text-sm font-semibold text-primary mt-3 hover:underline underline-offset-2"
                  >
                    {labels.learnMore}
                  </Link>
                )}
              </div>
            </li>
          </FadeIn>
        ))}
      </ol>
    </div>
  );

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

        <div className="grid lg:grid-cols-2 gap-12">
          {upcoming.length > 0 && renderGroup(labels.upcoming, upcoming)}
          {past.length > 0 && renderGroup(labels.past, past)}
        </div>
      </div>
    </section>
  );
}
