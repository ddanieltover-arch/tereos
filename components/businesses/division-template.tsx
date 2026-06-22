
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { PageHero } from '@/components/shared/page-hero';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { DivisionContent } from '@/lib/content/pages';

interface DivisionTemplateProps {
  locale: string;
  title: string;
  description: string;
  tagline?: string;
  image: string;
  extras: DivisionContent;
  labels: {
    markets: string;
    capabilities: string;
    impact: string;
    products: string;
    back: string;
  };
}

export function DivisionTemplate({
  locale,
  title,
  description,
  tagline,
  image,
  extras,
  labels,
}: DivisionTemplateProps) {
  return (
    <>
      <PageHero eyebrow="Our Businesses" title={title} description={tagline || description} image={image} />

      <section className="py-section bg-white">
        <div className="container-custom grid lg:grid-cols-3 gap-12">
          <FadeIn className="lg:col-span-2">
            <p className="text-body-lg text-neutral-600 leading-relaxed">{description}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href={`/${locale}/our-businesses`}
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-center')}
            >
              ← {labels.back}
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-section-sm bg-neutral-50">
        <div className="container-custom grid md:grid-cols-2 gap-12">
          <FadeIn>
            <h2 className="text-h3 font-bold text-neutral-900 mb-6">{labels.markets}</h2>
            <ul className="space-y-3">
              {extras.markets.map((market) => (
                <li key={market} className="flex items-center gap-3 text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-accent-green shrink-0" />
                  {market}
                </li>
              ))}
            </ul>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-h3 font-bold text-neutral-900 mb-6">{labels.capabilities}</h2>
            <ul className="space-y-3">
              {extras.capabilities.map((cap) => (
                <li key={cap} className="flex items-center gap-3 text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-secondary shrink-0" />
                  {cap}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <section className="py-section bg-dark text-white">
        <div className="container-custom">
          <FadeIn className="mb-8">
            <h2 className="text-h3 font-bold">{labels.impact}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            {extras.sustainabilityMetrics.map((metric) => (
              <FadeIn key={metric.label}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-3xl font-bold text-accent-gold">{metric.value}</p>
                  <p className="text-white/70 mt-2">{metric.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section bg-white text-center">
        <FadeIn>
          <Link
            href={`/${locale}/products?category=${extras.slug === 'food-ingredients' ? 'food-ingredients' : extras.slug}`}
            className={cn(buttonVariants({ variant: 'primary', size: 'lg' }), 'group')}
          >
            {labels.products}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </section>
    </>
  );
}
