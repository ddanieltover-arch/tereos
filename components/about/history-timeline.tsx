'use client';

import { FadeIn } from '@/components/animations/fade-in';
import type { TimelineSection, TimelineEvent } from '@/lib/content/history';
import { categoryColors, categoryLabels } from '@/lib/content/history';

/* ─── Timeline Event Card ─── */

function TimelineEventCard({ event, index }: { event: TimelineEvent; index: number }) {
  return (
    <FadeIn delay={index * 0.06} direction={index % 2 === 0 ? 'left' : 'right'}>
      <div className="relative flex gap-4 sm:gap-6 items-start">
        {/* Pulsing timeline dot */}
        <div className="absolute -left-[33px] sm:-left-[41px] top-2 w-4 h-4 rounded-full bg-white border-[3px] border-primary shadow-md" />

        {/* Year badge */}
        <div className="shrink-0 w-16 sm:w-20">
          <span className="block text-lg sm:text-xl font-bold text-primary">
            {event.year}
          </span>
          <span
            className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mt-1 ${categoryColors[event.category]}`}
          >
            {categoryLabels[event.category]}
          </span>
        </div>

        {/* Content card */}
        <div className="flex-1 bg-white rounded-xl border border-neutral-100 p-4 sm:p-5 hover:shadow-card-hover hover:-translate-y-0.5 hover:border-primary/20 transition-all duration-500">
          <h3 className="font-bold text-neutral-900 mb-1">{event.title}</h3>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ─── Timeline Section ─── */

interface TimelineSectionProps {
  section: TimelineSection;
  sectionIndex: number;
}

function TimelineSectionBlock({ section, sectionIndex }: TimelineSectionProps) {
  return (
    <div className="mb-16 last:mb-0">
      <FadeIn delay={sectionIndex * 0.1}>
        <h2 className="text-h3 font-bold text-neutral-900 mb-8 flex items-center gap-3">
          <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold shrink-0">
            {sectionIndex + 1}
          </span>
          {section.title}
        </h2>
      </FadeIn>

      <div className="relative ml-8 sm:ml-10 pl-6 sm:pl-8 border-l-2 border-gradient-to-b from-primary via-primary/50 to-primary/10">
        <div className="space-y-6">
          {section.events.map((event, i) => (
            <TimelineEventCard key={`${event.year}-${event.title}`} event={event} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Full History Timeline ─── */

interface HistoryTimelineProps {
  sections: TimelineSection[];
}

export function HistoryTimeline({ sections }: HistoryTimelineProps) {
  return (
    <section className="py-section bg-neutral-50">
      <div className="container-custom max-w-4xl">
        {sections.map((section, i) => (
          <TimelineSectionBlock
            key={section.id}
            section={section}
            sectionIndex={i}
          />
        ))}
      </div>
    </section>
  );
}
