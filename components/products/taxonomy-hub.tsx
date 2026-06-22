
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import type { Market, ProductLine } from '@/lib/content/taxonomy';

interface TaxonomyHubProps {
  locale: string;
  type: 'markets' | 'product-lines';
  items: Market[] | ProductLine[];
  labels: {
    title: string;
    description: string;
    viewAll: string;
    learnMore: string;
  };
  compact?: boolean;
}

export function TaxonomyHub({ locale, type, items, labels, compact = false }: TaxonomyHubProps) {
  const basePath = type === 'markets' ? 'markets' : 'product-lines';
  const displayItems = compact ? items.slice(0, 6) : items;

  return (
    <section className={compact ? 'py-section-sm bg-neutral-50' : 'py-section bg-white'}>
      <div className="container-custom">
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-h3 font-bold text-neutral-900">{labels.title}</h2>
              <p className="text-neutral-600 mt-2 max-w-2xl">{labels.description}</p>
            </div>
            {compact && (
              <Link
                href={`/${locale}/products/${basePath}`}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all shrink-0"
              >
                {labels.viewAll} <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </FadeIn>

        <div className={`grid gap-6 ${compact ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}`}>
          {displayItems.map((item, i) => (
            <FadeIn key={item.slug} delay={i * 0.04}>
              <Link
                href={`/${locale}/products/${basePath}/${item.slug}`}
                className="group block bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all h-full"
              >
                <div className="relative h-36">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-neutral-500 mt-2 line-clamp-2">{item.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4 group-hover:gap-2 transition-all">
                    {labels.learnMore} <ArrowRight className="w-4 h-4" />
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
