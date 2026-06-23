'use client';

import { FadeIn } from '@/components/animations/fade-in';
import {
  groupAgriculture,
  groupEnvironment,
  groupPartner,
} from '@/lib/content/group-overview';

interface GroupOverviewProps {
  labels: {
    environment: string;
    partner: string;
    agriculture: string;
  };
}

export function GroupOverview({ labels }: GroupOverviewProps) {
  return (
    <>
      <section className="py-section bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-h2 font-bold text-neutral-900 mb-6">{labels.environment}</h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed">{groupEnvironment.description}</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-section bg-neutral-50">
        <div className="container-custom">
          <FadeIn className="max-w-4xl mb-12">
            <h2 className="text-h2 font-bold text-neutral-900 mb-6">{labels.partner}</h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed">{groupPartner.description}</p>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {groupPartner.stats.map((stat, index) => (
              <FadeIn key={stat.label} delay={index * 0.05}>
                <div className="p-6 bg-white rounded-2xl border border-neutral-100 text-center h-full">
                  <p className="text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="text-sm text-neutral-600 mt-2 leading-snug">{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section bg-white">
        <div className="container-custom max-w-4xl">
          <FadeIn>
            <h2 className="text-h2 font-bold text-neutral-900 mb-6">{labels.agriculture}</h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed">{groupAgriculture.description}</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
