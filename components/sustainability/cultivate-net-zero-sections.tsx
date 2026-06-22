'use client';

import Link from 'next/link';
import { ArrowRight, Leaf, Target, TrendingDown } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { Solution, InvestmentTarget, FarmerProgram } from '@/lib/content/cultivate-net-zero';

/* ─── Solutions Grid ─── */

interface SolutionsProps {
  solutions: Solution[];
  label: string;
}

export function SolutionsGrid({ solutions, label }: SolutionsProps) {
  return (
    <section className="py-section bg-white">
      <div className="container-custom">
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-h3 font-bold text-neutral-900 mb-4">{label}</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((sol, i) => (
            <FadeIn key={sol.id} delay={i * 0.1}>
              <div className="group relative bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all h-full flex flex-col">
                {/* Gradient header */}
                <div
                  className={`bg-gradient-to-r ${sol.color} px-6 py-8 text-white`}
                >
                  <span className="text-4xl mb-3 block">{sol.icon}</span>
                  <h3 className="text-xl font-bold mb-1">{sol.title}</h3>
                  <p className="text-white/80 text-sm">{sol.tagline}</p>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                    {sol.description}
                  </p>
                  <ul className="space-y-3 mt-auto">
                    {sol.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm text-neutral-700"
                      >
                        <Leaf className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Investment Stats ─── */

interface InvestmentProps {
  targets: InvestmentTarget[];
  title: string;
  description: string;
}

export function InvestmentHighlights({ targets, title, description }: InvestmentProps) {
  return (
    <section className="py-section bg-dark text-white">
      <div className="container-custom">
        <FadeIn className="text-center max-w-3xl mx-auto mb-12">
          <Target className="w-10 h-10 text-accent-gold mx-auto mb-4" />
          <h2 className="text-h3 font-bold mb-4">{title}</h2>
          <p className="text-white/70 leading-relaxed">{description}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targets.map((target, i) => (
            <FadeIn key={target.label} delay={i * 0.08}>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
                <span className="block text-h2 font-bold text-accent-gold mb-2">
                  {target.value}
                </span>
                <span className="block text-sm font-semibold text-white mb-2">
                  {target.label}
                </span>
                <p className="text-xs text-white/60 leading-relaxed">
                  {target.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Farmer Programs ─── */

interface FarmerProps {
  programs: FarmerProgram[];
  title: string;
  description: string;
}

export function FarmerProgramsSection({ programs, title, description }: FarmerProps) {
  return (
    <section className="py-section bg-neutral-50">
      <div className="container-custom">
        <FadeIn className="max-w-3xl mx-auto mb-12">
          <h2 className="text-h3 font-bold text-neutral-900 mb-4">{title}</h2>
          <p className="text-neutral-600 leading-relaxed">{description}</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {programs.map((program, i) => (
            <FadeIn key={program.name} delay={i * 0.08}>
              <div className="bg-white rounded-2xl border border-neutral-100 p-6 hover:shadow-card-hover transition-shadow h-full">
                <TrendingDown className="w-8 h-8 text-green-600 mb-4" />
                <h3 className="font-bold text-neutral-900 mb-2">{program.name}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  {program.description}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SBTi Badge ─── */

interface SbtiBadgeProps {
  title: string;
  description: string;
  certification: string;
}

export function SbtiBadgeSection({ title, description, certification }: SbtiBadgeProps) {
  return (
    <section className="py-section-sm bg-white">
      <div className="container-custom">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8">
            <div className="w-16 h-16 rounded-full bg-green-600 text-white flex items-center justify-center mx-auto mb-4 text-2xl">
              🎯
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">{title}</h3>
            <p className="text-neutral-600 text-sm leading-relaxed mb-4">
              {description}
            </p>
            <span className="inline-block bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide">
              {certification}
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */

interface CtaProps {
  locale: string;
  title: string;
  sustainabilityLabel: string;
  contactLabel: string;
}

export function CultivateNetZeroCta({ locale, title, sustainabilityLabel, contactLabel }: CtaProps) {
  return (
    <section className="py-section bg-gradient-to-r from-green-700 to-emerald-800 text-white">
      <div className="container-custom text-center">
        <FadeIn>
          <h2 className="text-h3 font-bold mb-8">{title}</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/sustainability`}
              className="inline-flex items-center gap-2 bg-white text-green-800 font-semibold px-6 py-3 rounded-xl hover:bg-white/90 transition-colors"
            >
              {sustainabilityLabel} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
            >
              {contactLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
