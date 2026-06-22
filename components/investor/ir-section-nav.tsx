
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Building2,
  Calendar,
  FileBarChart,
  Presentation,
  Scale,
} from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { IrSectionSlug } from '@/lib/content/investor';

const SECTION_ICONS: Record<IrSectionSlug, ReactNode> = {
  'annual-results': <FileBarChart className="w-6 h-6" />,
  'regulated-information': <Scale className="w-6 h-6" />,
  'financial-calendar': <Calendar className="w-6 h-6" />,
  presentations: <Presentation className="w-6 h-6" />,
  governance: <Building2 className="w-6 h-6" />,
};

interface IrSectionNavProps {
  locale: string;
  sections: Array<{
    slug: IrSectionSlug;
    href: string;
    title: string;
    description: string;
    external?: boolean;
  }>;
  title: string;
  description: string;
  learnMore: string;
}

export function IrSectionNav({ locale, sections, title, description, learnMore }: IrSectionNavProps) {
  return (
    <section className="py-section bg-neutral-50 border-b border-neutral-100">
      <div className="container-custom">
        <FadeIn>
          <h2 className="text-h3 font-bold text-neutral-900 mb-2">{title}</h2>
          <p className="text-neutral-600 mb-10 max-w-2xl">{description}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => {
            const href = section.external
              ? section.href
              : `/${locale}${section.href}`;
            const Icon = SECTION_ICONS[section.slug];

            return (
              <FadeIn key={section.slug} delay={index * 0.05}>
                <Link
                  href={href}
                  className="group flex flex-col h-full p-6 bg-white rounded-2xl border border-neutral-100 hover:shadow-card-hover hover:-translate-y-1 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {Icon}
                  </div>
                  <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-2 flex-1">{section.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4 group-hover:gap-2 transition-all">
                    {learnMore} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
