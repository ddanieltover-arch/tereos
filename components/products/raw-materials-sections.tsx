'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerContainer } from '@/components/animations/stagger-container';
import type { RawMaterial } from '@/lib/content/raw-materials';

/* ─── Key Figures ─── */

interface KeyFiguresProps {
  figures: RawMaterial['keyFigures'];
}

export function RawMaterialKeyFigures({ figures }: KeyFiguresProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {figures.map((fig, i) => (
        <FadeIn key={fig.label} delay={i * 0.08}>
          <div className="bg-white rounded-2xl border border-neutral-100 p-6 text-center hover:shadow-card-hover hover:-translate-y-1 transition-all">
            <span className="block text-h3 font-bold text-primary mb-2">
              {fig.value}
            </span>
            <span className="text-sm text-neutral-600">{fig.label}</span>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/* ─── Process Steps ─── */

interface ProcessStepsProps {
  title: string;
  description: string;
  steps: RawMaterial['processSteps'];
}

export function RawMaterialProcess({ title, description, steps }: ProcessStepsProps) {
  return (
    <section className="py-section bg-neutral-50">
      <div className="container-custom">
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-h3 font-bold text-neutral-900 mb-4">{title}</h2>
          <p className="text-neutral-600 leading-relaxed">{description}</p>
        </FadeIn>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 hidden sm:block" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="flex gap-6 items-start">
                  {/* Step number */}
                  <div className="shrink-0 w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-primary text-white font-bold flex items-center justify-center text-lg lg:text-xl shadow-lg relative z-10">
                    {i + 1}
                  </div>
                  {/* Step content */}
                  <div className="bg-white rounded-2xl border border-neutral-100 p-6 flex-1 hover:shadow-card-hover transition-shadow">
                    <h3 className="font-bold text-neutral-900 text-lg mb-2">
                      {step.title}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Applications ─── */

interface ApplicationsProps {
  applications: string[];
  label: string;
}

export function RawMaterialApplications({ applications, label }: ApplicationsProps) {
  return (
    <section className="py-section bg-white">
      <div className="container-custom">
        <FadeIn className="mb-8">
          <h2 className="text-h3 font-bold text-neutral-900">{label}</h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {applications.map((app, i) => (
            <FadeIn key={app} delay={i * 0.05}>
              <div className="flex items-start gap-3 bg-neutral-50 rounded-xl p-4 border border-neutral-100">
                <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-neutral-700 text-sm leading-relaxed">{app}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Other Raw Materials Carousel ─── */

interface CarouselProps {
  materials: RawMaterial[];
  locale: string;
  label: string;
  learnMoreLabel: string;
}

export function RawMaterialsCarousel({ materials, locale, label, learnMoreLabel }: CarouselProps) {
  return (
    <section className="py-section bg-neutral-50 border-t border-neutral-100">
      <div className="container-custom">
        <FadeIn className="mb-8">
          <h2 className="text-h3 font-bold text-neutral-900">{label}</h2>
        </FadeIn>

        <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {materials.map((rm, i) => (
            <FadeIn key={rm.slug} delay={i * 0.06}>
              <Link
                href={`/${locale}/products/raw-materials/${rm.slug}`}
                className="group block bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all snap-start shrink-0 w-72"
              >
                <div className="relative h-40">
                  <Image
                    src={rm.image}
                    alt={rm.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-3xl">{rm.icon}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors mb-1">
                    {rm.title}
                  </h3>
                  <p className="text-sm text-neutral-500 line-clamp-2 mb-3">{rm.subtitle}</p>
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

/* ─── Raw Materials Grid (for index page) ─── */

interface GridProps {
  materials: RawMaterial[];
  locale: string;
  learnMoreLabel: string;
}

export function RawMaterialsGrid({ materials, locale, learnMoreLabel }: GridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {materials.map((rm, i) => (
        <FadeIn key={rm.slug} delay={i * 0.06}>
          <Link
            href={`/${locale}/products/raw-materials/${rm.slug}`}
            className="group block bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all h-full"
          >
            <div className="relative h-48">
              <Image
                src={rm.image}
                alt={rm.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent" />
              <span className="absolute bottom-4 left-5 text-4xl">{rm.icon}</span>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors mb-1">
                {rm.title}
              </h3>
              <p className="text-sm text-neutral-500 mb-2">{rm.subtitle}</p>
              <p className="text-sm text-neutral-600 line-clamp-3 mb-4">{rm.description}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                {learnMoreLabel} <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}
