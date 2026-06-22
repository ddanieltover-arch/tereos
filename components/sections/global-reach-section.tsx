
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { WorldMap } from '@/components/global/world-map';
import { cn } from '@/lib/utils';
import type { GlobalLocation } from '@/types';

interface GlobalReachSectionProps {
  locale: string;
  locations: GlobalLocation[];
  labels: {
    eyebrow: string;
    title: string;
    description: string;
    cta: string;
    offices: string;
    facilities: string;
    partners: string;
    countries: string;
    selectLocation: string;
    filterAll: string;
    typeOffice: string;
    typeFacility: string;
    typePartner: string;
  };
}

export function GlobalReachSection({ locale, locations, labels }: GlobalReachSectionProps) {
  return (
    <section className="py-section bg-neutral-50">
      <div className="container-custom">
        <FadeIn className="max-w-2xl mb-10">
          <span className="inline-block text-label uppercase tracking-widest text-secondary font-semibold mb-4">
            {labels.eyebrow}
          </span>
          <h2 className="text-h2 font-bold text-neutral-900 mb-6 text-balance">{labels.title}</h2>
          <p className="text-body-lg text-neutral-600 leading-relaxed text-balance">
            {labels.description}
          </p>
        </FadeIn>

        <WorldMap
          locations={locations}
          compact
          showStats={false}
          labels={{
            offices: labels.offices,
            facilities: labels.facilities,
            partners: labels.partners,
            countries: labels.countries,
            selectLocation: labels.selectLocation,
            filterAll: labels.filterAll,
            typeOffice: labels.typeOffice,
            typeFacility: labels.typeFacility,
            typePartner: labels.typePartner,
          }}
        />

        <FadeIn delay={0.15} className="mt-10 text-center">
          <Link
            href={`/${locale}/global-presence`}
            className={cn(
              'group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark',
              'text-white font-semibold rounded-full transition-all duration-300',
              'hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5'
            )}
          >
            {labels.cta}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
