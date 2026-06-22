
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { PageHero } from '@/components/shared/page-hero';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Market, ProductLine } from '@/lib/content/taxonomy';
import { fallbackProducts } from '@/lib/content/pages';

interface TaxonomyLabels {
  highlights: string;
  productLines: string;
  markets: string;
  products: string;
  divisions: string;
  contactTitle: string;
  contactButton: string;
  viewAllProducts: string;
  backToProducts: string;
  learnMore: string;
}

interface TaxonomyTemplateProps {
  locale: string;
  type: 'market' | 'product-line';
  page: Market | ProductLine;
  relatedProductLines?: ProductLine[];
  relatedMarkets?: Market[];
  relatedDivisions?: { slug: string; title: string }[];
  labels: TaxonomyLabels;
}

export function TaxonomyTemplate({
  locale,
  type,
  page,
  relatedProductLines = [],
  relatedMarkets = [],
  relatedDivisions = [],
  labels,
}: TaxonomyTemplateProps) {
  const relatedProducts = fallbackProducts.filter((p) => page.productSlugs.includes(p.slug));

  return (
    <>
      <PageHero
        eyebrow={type === 'market' ? 'Markets' : 'Product Lines'}
        title={page.title}
        description={page.description}
        image={page.image}
        dark
      />

      <section className="py-section bg-white">
        <div className="container-custom grid lg:grid-cols-3 gap-12">
          <FadeIn className="lg:col-span-2">
            <p className="text-body-lg text-neutral-600 leading-relaxed">{page.intro}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link
              href={`/${locale}/products`}
              className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-center')}
            >
              ← {labels.backToProducts}
            </Link>
          </FadeIn>
        </div>
      </section>

      <section className="py-section-sm bg-neutral-50">
        <div className="container-custom">
          <FadeIn>
            <h2 className="text-h3 font-bold text-neutral-900 mb-6">{labels.highlights}</h2>
            <ul className="grid sm:grid-cols-2 gap-4">
              {page.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-neutral-700">
                  <CheckCircle className="w-5 h-5 text-accent-green shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {type === 'market' && relatedProductLines.length > 0 && (
        <section className="py-section bg-white">
          <div className="container-custom">
            <FadeIn>
              <h2 className="text-h3 font-bold text-neutral-900 mb-8">{labels.productLines}</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProductLines.map((line, i) => (
                <FadeIn key={line.slug} delay={i * 0.05}>
                  <Link
                    href={`/${locale}/products/product-lines/${line.slug}`}
                    className="group block rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all"
                  >
                    <div className="relative h-40">
                      <Image src={line.image} alt={line.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">
                        {line.title}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-2 line-clamp-2">{line.description}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4">
                        {labels.learnMore} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {type === 'product-line' && relatedMarkets.length > 0 && (
        <section className="py-section bg-white">
          <div className="container-custom">
            <FadeIn>
              <h2 className="text-h3 font-bold text-neutral-900 mb-8">{labels.markets}</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedMarkets.map((market, i) => (
                <FadeIn key={market.slug} delay={i * 0.05}>
                  <Link
                    href={`/${locale}/products/markets/${market.slug}`}
                    className="group block rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover hover:-translate-y-1 transition-all"
                  >
                    <div className="relative h-40">
                      <Image src={market.image} alt={market.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">
                        {market.title}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-2 line-clamp-2">{market.description}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary mt-4">
                        {labels.learnMore} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedProducts.length > 0 && (
        <section className="py-section bg-neutral-50">
          <div className="container-custom">
            <FadeIn>
              <h2 className="text-h3 font-bold text-neutral-900 mb-8">{labels.products}</h2>
            </FadeIn>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((product, i) => (
                <FadeIn key={product.slug} delay={i * 0.05}>
                  <Link
                    href={`/${locale}/products/${product.slug}`}
                    className="group block bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover transition-all"
                  >
                    <div className="relative h-36">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-neutral-900 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-neutral-500 mt-2 line-clamp-2">{product.description}</p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.15} className="mt-8 text-center">
              <Link
                href={`/${locale}/products?${type === 'market' ? 'market' : 'line'}=${page.slug}`}
                className={cn(buttonVariants({ variant: 'outline' }))}
              >
                {labels.viewAllProducts}
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {relatedDivisions.length > 0 && (
        <section className="py-section-sm bg-white border-t border-neutral-100">
          <div className="container-custom">
            <FadeIn>
              <h2 className="text-h4 font-bold text-neutral-900 mb-4">{labels.divisions}</h2>
              <div className="flex flex-wrap gap-3">
                {relatedDivisions.map((div) => (
                  <Link
                    key={div.slug}
                    href={`/${locale}/our-businesses/${div.slug}`}
                    className="px-4 py-2 rounded-full bg-neutral-100 text-neutral-700 text-sm font-medium hover:bg-primary hover:text-white transition-colors"
                  >
                    {div.title}
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      )}

      <section className="py-section bg-primary text-white">
        <div className="container-custom text-center">
          <FadeIn>
            <h2 className="text-h3 font-bold mb-4">{labels.contactTitle}</h2>
            <Link href={`/${locale}/contact`} className={cn(buttonVariants({ variant: 'secondary' }), 'mt-4')}>
              {labels.contactButton}
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
