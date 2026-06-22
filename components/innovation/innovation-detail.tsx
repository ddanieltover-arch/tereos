'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { InnovationPriority } from '@/lib/content/innovation-priorities';

/* ─── Priority Stats ─── */

interface StatsProps {
  stats: InnovationPriority['stats'];
}

export function InnovationPriorityStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <FadeIn key={stat.label} delay={i * 0.08}>
          <div className="bg-white rounded-2xl border border-neutral-100 p-6 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all">
            <span className="block text-h3 font-bold text-primary mb-2">
              {stat.value}
            </span>
            <span className="text-sm text-neutral-600">{stat.label}</span>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/* ─── Priority Highlights ─── */

interface HighlightsProps {
  highlights: string[];
  label: string;
}

export function InnovationPriorityHighlights({ highlights, label }: HighlightsProps) {
  return (
    <section className="py-section bg-neutral-50">
      <div className="container-custom">
        <FadeIn className="mb-8">
          <h2 className="text-h3 font-bold text-neutral-900">{label}</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          {highlights.map((h, i) => (
            <FadeIn key={h} delay={i * 0.05}>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 border border-neutral-100">
                <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-neutral-700 text-sm leading-relaxed">{h}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Other Priorities Carousel ─── */

interface CarouselProps {
  priorities: InnovationPriority[];
  locale: string;
  label: string;
  learnMoreLabel: string;
}

export function InnovationPrioritiesCarousel({
  priorities,
  locale,
  label,
  learnMoreLabel,
}: CarouselProps) {
  return (
    <section className="py-section bg-white border-t border-neutral-100">
      <div className="container-custom">
        <FadeIn className="mb-8">
          <h2 className="text-h3 font-bold text-neutral-900">{label}</h2>
        </FadeIn>

        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {priorities.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.06}>
              <Link
                href={`/${locale}/innovation/${p.slug}`}
                className="group block bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all snap-start shrink-0 w-72"
              >
                <div className="relative h-40">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-3xl">{p.icon}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-neutral-500 line-clamp-2 mb-3">
                    {p.subtitle}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    {learnMoreLabel} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Priority Tiles Grid (for landing page) ─── */

interface TilesProps {
  priorities: InnovationPriority[];
  locale: string;
  label: string;
  learnMoreLabel: string;
}

export function InnovationPriorityTiles({
  priorities,
  locale,
  label,
  learnMoreLabel,
}: TilesProps) {
  return (
    <section className="py-section bg-neutral-50">
      <div className="container-custom">
        <FadeIn className="mb-8">
          <h2 className="text-h3 font-bold text-neutral-900">{label}</h2>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {priorities.map((p, i) => (
            <FadeIn key={p.slug} delay={i * 0.06}>
              <Link
                href={`/${locale}/innovation/${p.slug}`}
                className="group block bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-500 h-full hover:border-primary/20"
              >
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/30 to-transparent group-hover:from-dark/80 transition-all duration-500" />
                  <div className="absolute bottom-4 left-5 text-white">
                    <span className="text-3xl block mb-1 group-hover:scale-110 inline-block transition-transform duration-500">{p.icon}</span>
                    <h3 className="text-lg font-bold drop-shadow-md">{p.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
                    {p.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-300">
                    {learnMoreLabel} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
