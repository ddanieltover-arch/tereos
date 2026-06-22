import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  Briefcase,
  Building2,
  FileText,
  FolderOpen,
  Globe,
  Home,
  Newspaper,
  Package,
  Scale,
} from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { HtmlSitemapSection } from '@/lib/seo/html-sitemap';

const SECTION_ICONS: Record<string, ReactNode> = {
  main: <Home className="h-5 w-5" />,
  about: <Building2 className="h-5 w-5" />,
  businesses: <Briefcase className="h-5 w-5" />,
  products: <Package className="h-5 w-5" />,
  news: <Newspaper className="h-5 w-5" />,
  resources: <FolderOpen className="h-5 w-5" />,
  legal: <Scale className="h-5 w-5" />,
};

interface HtmlSitemapViewProps {
  sections: HtmlSitemapSection[];
  xmlLabel: string;
  browseLabel: string;
  openXmlLabel: string;
}

export function HtmlSitemapView({ sections, xmlLabel, browseLabel, openXmlLabel }: HtmlSitemapViewProps) {
  return (
    <div className="space-y-10">
      <FadeIn>
        <p className="max-w-2xl text-body-lg text-neutral-600">{browseLabel}</p>
      </FadeIn>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((section, index) => {
          const icon = SECTION_ICONS[section.id] ?? <Globe className="h-5 w-5" />;

          return (
            <FadeIn key={section.id} delay={index * 0.04}>
              <nav
                aria-labelledby={`sitemap-${section.id}`}
                className="group flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 shadow-subtle transition-shadow hover:shadow-card"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {icon}
                  </div>
                  <h2
                    id={`sitemap-${section.id}`}
                    className="text-lg font-bold text-neutral-900"
                  >
                    {section.title}
                  </h2>
                </div>

                <ul className="flex-1 space-y-1">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group/link flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-primary"
                      >
                        <span>{link.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-neutral-300 transition-all group-hover/link:translate-x-0.5 group-hover/link:text-primary" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={0.2}>
        <div className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-gradient-to-r from-neutral-900 to-dark p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="font-semibold">{xmlLabel}</p>
              <p className="mt-1 text-sm text-white/70">sitemap.xml</p>
            </div>
          </div>
          <a
            href="/sitemap.xml"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-100"
          >
            {openXmlLabel}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
