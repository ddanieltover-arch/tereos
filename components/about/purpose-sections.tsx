'use client';

import { FadeIn } from '@/components/animations/fade-in';

/* ─── Full Manifesto ─── */

interface ManifestoProps {
  text: string;
}

export function PurposeManifesto({ text }: ManifestoProps) {
  return (
    <section className="py-section bg-white">
      <div className="container-custom">
        <FadeIn className="max-w-3xl mx-auto">
          <blockquote className="relative">
            <div className="absolute -left-4 lg:-left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-accent-gold to-green-600 rounded-full" />
            <p className="text-xl lg:text-2xl text-neutral-700 leading-relaxed font-light pl-8 italic">
              {text}
            </p>
          </blockquote>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── Purpose Pillars ─── */

export interface PurposePillar {
  title: string;
  description: string;
  icon: string;
  gradient: string;
}

interface PillarsProps {
  pillars: PurposePillar[];
  label: string;
}

export function PurposePillarsSection({ pillars, label }: PillarsProps) {
  return (
    <section className="py-section bg-neutral-50">
      <div className="container-custom">
        <FadeIn className="text-center mb-12">
          <h2 className="text-h3 font-bold text-neutral-900">{label}</h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.title} delay={i * 0.1}>
              <div className="group bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all h-full">
                <div
                  className={`bg-gradient-to-br ${pillar.gradient} p-6 text-white text-center`}
                >
                  <span className="text-5xl block mb-3">{pillar.icon}</span>
                  <h3 className="text-xl font-bold">{pillar.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-neutral-600 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Signature Block ─── */

interface SignatureProps {
  signature: string;
  description: string;
}

export function PurposeSignature({ signature, description }: SignatureProps) {
  return (
    <section className="py-section bg-dark text-white">
      <div className="container-custom text-center">
        <FadeIn>
          <p className="text-sm uppercase tracking-widest text-accent-gold font-semibold mb-6">
            Our Signature
          </p>
          <h2 className="text-display-l font-bold text-white mb-6 max-w-3xl mx-auto">
            {signature}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
