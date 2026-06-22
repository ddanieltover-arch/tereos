
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  BookOpen,
  FileStack,
  Leaf,
  Newspaper,
  TrendingUp,
} from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { DownloadHubSlug } from '@/lib/content/downloads';

const SECTION_ICONS: Record<DownloadHubSlug, ReactNode> = {
  all: <FileStack className="w-6 h-6" />,
  'annual-reports': <BookOpen className="w-6 h-6" />,
  sustainability: <Leaf className="w-6 h-6" />,
  brochures: <FileStack className="w-6 h-6" />,
  certifications: <Award className="w-6 h-6" />,
  investor: <TrendingUp className="w-6 h-6" />,
  newsroom: <Newspaper className="w-6 h-6" />,
};

interface DownloadHubNavProps {
  locale: string;
  activeSlug: DownloadHubSlug;
  sections: Array<{
    slug: DownloadHubSlug;
    href: string;
    title: string;
    description: string;
    count?: number;
    external?: boolean;
  }>;
  title: string;
  description: string;
  learnMore: string;
}

export function DownloadHubNav({
  locale,
  activeSlug,
  sections,
  title,
  description,
  learnMore,
}: DownloadHubNavProps) {
  return (
    <section className="py-section bg-neutral-50 border-b border-neutral-100">
      <div className="container-custom">
        <FadeIn>
          <h2 className="text-h3 font-bold text-neutral-900 mb-2">{title}</h2>
          <p className="text-neutral-600 mb-10 max-w-2xl">{description}</p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sections.map((section, index) => {
            const href = section.external ? `/${locale}${section.href}` : `/${locale}${section.href}`;
            const isActive = section.slug === activeSlug;
            const Icon = SECTION_ICONS[section.slug];

            return (
              <FadeIn key={section.slug} delay={index * 0.04}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group flex flex-col h-full p-5 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-primary text-white border-primary shadow-card'
                      : 'bg-white border-neutral-100 hover:shadow-card-hover hover:-translate-y-0.5'
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                      isActive ? 'bg-white/15 text-white' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {Icon}
                  </div>
                  <h3
                    className={`font-bold ${isActive ? 'text-white' : 'text-neutral-900 group-hover:text-primary'}`}
                  >
                    {section.title}
                  </h3>
                  <p
                    className={`text-sm mt-2 flex-1 ${isActive ? 'text-white/80' : 'text-neutral-500'}`}
                  >
                    {section.description}
                  </p>
                  <div
                    className={`flex items-center justify-between mt-4 text-sm font-semibold ${
                      isActive ? 'text-white' : 'text-primary'
                    }`}
                  >
                    <span>{learnMore}</span>
                    <span className="flex items-center gap-2">
                      {section.count !== undefined && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            isActive ? 'bg-white/20' : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {section.count}
                        </span>
                      )}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
