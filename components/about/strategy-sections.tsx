'use client';

import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { StrategySection, CircularEconomyStat } from '@/lib/content/strategy';

/* ─── Strategy Sections ─── */

interface StrategySectionsProps {
  sections: StrategySection[];
}

export function StrategySectionsGrid({ sections }: StrategySectionsProps) {
  return (
    <section className="py-section bg-white">
      <div className="container-custom space-y-16">
        {sections.map((section, i) => (
          <FadeIn key={section.id} delay={i * 0.1}>
            <div
              className={`flex flex-col lg:flex-row gap-8 items-start ${
                i % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Icon block */}
              <div className="shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center text-4xl lg:text-5xl">
                {section.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-h4 lg:text-h3 font-bold text-neutral-900 mb-4">
                  {section.title}
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {section.description}
                </p>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {section.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-sm text-neutral-700"
                    >
                      <ChevronRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ─── Circular Economy Stats ─── */

interface CircularStatsProps {
  stats: CircularEconomyStat[];
  title: string;
}

export function CircularEconomyBanner({ stats, title }: CircularStatsProps) {
  return (
    <section className="py-section bg-gradient-to-r from-green-800 to-emerald-900 text-white">
      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <h2 className="text-h3 font-bold">{title}</h2>
        </FadeIn>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.08}>
              <div className="text-center">
                <span className="block text-h2 font-bold text-accent-gold mb-2">
                  {stat.value}
                </span>
                <span className="text-sm text-white/70">{stat.label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Related Pages ─── */

interface RelatedPage {
  title: string;
  description: string;
  href: string;
}

interface RelatedPagesProps {
  pages: RelatedPage[];
  label: string;
}

export function StrategyRelatedPages({ pages, label }: RelatedPagesProps) {
  return (
    <section className="py-section bg-neutral-50 border-t border-neutral-100">
      <div className="container-custom">
        <FadeIn className="mb-8">
          <h2 className="text-h3 font-bold text-neutral-900">{label}</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6">
          {pages.map((page, i) => (
            <FadeIn key={page.href} delay={i * 0.08}>
              <Link
                href={page.href}
                className="group block bg-white rounded-2xl border border-neutral-100 p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all"
              >
                <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors mb-2">
                  {page.title}
                </h3>
                <p className="text-sm text-neutral-500 mb-4">{page.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
