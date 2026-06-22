'use client';

import { Sprout, Globe, Users, Package } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerContainer, staggerChildVariants } from '@/components/animations/stagger-container';
import { motion } from 'framer-motion';
import type { PurposePillar, TimelineSection } from '@/lib/content/about';

const pillarIcons = {
  integrity: Package,
  innovation: Sprout,
  sustainability: Globe,
  partnership: Users,
};

interface AboutSectionsProps {
  manifesto: string[];
  purposeStatement: string;
  signature: string;
  purposePillars: PurposePillar[];
  historyIntro: string;
  timelineSections: TimelineSection[];
  labels: {
    purpose: string;
    manifesto: string;
    purposeStatement: string;
    signature: string;
    purposePillars: string;
    history: string;
  };
}

export function AboutSections({
  manifesto,
  purposeStatement,
  signature,
  purposePillars,
  historyIntro,
  timelineSections,
  labels,
}: AboutSectionsProps) {
  return (
    <>
      {/* Our Purpose */}
      <section className="py-section bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <span className="text-label uppercase tracking-widest text-primary font-semibold">{labels.purpose}</span>
            <h2 className="text-h2 font-bold text-neutral-900 mt-4">{labels.manifesto}</h2>
          </FadeIn>
          <div className="mt-8 space-y-6">
            {manifesto.map((paragraph, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <p className="text-body-lg text-neutral-600 leading-relaxed">{paragraph}</p>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3} className="mt-10 p-8 bg-primary/5 rounded-2xl border border-primary/10">
            <p className="text-label uppercase tracking-widest text-primary font-semibold mb-3">{labels.purposeStatement}</p>
            <p className="text-h3 font-bold text-neutral-900 leading-snug">&ldquo;{purposeStatement}&rdquo;</p>
          </FadeIn>
          <FadeIn delay={0.35} className="mt-8 text-center">
            <p className="text-label uppercase tracking-widest text-secondary font-semibold mb-2">{labels.signature}</p>
            <p className="text-h4 font-bold text-neutral-900 italic">{signature}</p>
          </FadeIn>
        </div>
      </section>

      {/* Purpose Pillars */}
      <section className="py-section bg-neutral-50">
        <div className="container-custom">
          <FadeIn className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-h2 font-bold text-neutral-900">{labels.purposePillars}</h2>
          </FadeIn>
          <StaggerContainer className="grid sm:grid-cols-2 gap-6">
            {purposePillars.map((pillar) => {
              const Icon = pillarIcons[pillar.icon];
              return (
                <motion.div key={pillar.title} variants={staggerChildVariants}>
                  <div className="p-6 rounded-2xl bg-white border border-neutral-100 hover:shadow-card-hover transition-shadow h-full">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-neutral-900 mb-2">{pillar.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* History */}
      <section className="py-section bg-white">
        <div className="container-custom">
          <FadeIn className="max-w-3xl mb-12">
            <h2 className="text-h2 font-bold text-neutral-900">{labels.history}</h2>
            <p className="text-body-lg text-neutral-600 mt-4 leading-relaxed">{historyIntro}</p>
          </FadeIn>

          <div className="space-y-16">
            {timelineSections.map((section, sectionIndex) => (
              <div key={section.title}>
                <FadeIn delay={sectionIndex * 0.05}>
                  <h3 className="text-h3 font-bold text-neutral-900 mb-3">{section.title}</h3>
                  {section.intro && (
                    <p className="text-neutral-600 leading-relaxed max-w-3xl mb-8">{section.intro}</p>
                  )}
                </FadeIn>
                <div className="relative">
                  <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-neutral-200 md:-translate-x-px" />
                  <div className="space-y-10">
                    {section.events.map((event, i) => (
                      <FadeIn key={`${section.title}-${event.year}-${event.title}`} delay={i * 0.03}>
                        <div
                          className={`relative flex flex-col md:flex-row gap-6 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                        >
                          <div className="md:w-1/2" />
                          <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 md:-translate-x-1.5 mt-2 ring-4 ring-white" />
                          <div className={`md:w-1/2 pl-10 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                            <span className="text-sm font-bold text-primary">{event.year}</span>
                            <h4 className="text-h4 font-bold text-neutral-900 mt-1">{event.title}</h4>
                            <p className="text-neutral-600 mt-2 text-sm leading-relaxed">{event.description}</p>
                          </div>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
