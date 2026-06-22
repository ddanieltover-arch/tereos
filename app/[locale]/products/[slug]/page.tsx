
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/animations/fade-in';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getProductBySlug } from '@/lib/sanity/fetch';
import { fallbackProducts } from '@/lib/content/pages';
import { JsonLd } from '@/components/seo/json-ld';
import { generateBreadcrumbSchema, generateProductSchema } from '@/lib/seo/schemas';
import { absoluteUrl } from '@/lib/site';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProductBySlug(locale, slug);
  const fallback = fallbackProducts.find((p) => p.slug === slug);
  const name = product?.name || fallback?.name;
  if (!name) return { title: 'Product Not Found' };
  return { title: name, description: product?.description || fallback?.description };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.products' });

  const cms = await getProductBySlug(locale, slug);
  const fallback = fallbackProducts.find((p) => p.slug === slug);
  if (!cms && !fallback) notFound();

  const product = {
    name: cms?.name || fallback!.name,
    description: cms?.description || fallback!.description,
    categoryLabel: cms?.category || fallback!.categoryLabel,
    image: cms?.image || fallback!.image,
    specifications: fallback?.specifications || {},
    applications: fallback?.applications || [],
  };

  const related = fallbackProducts.filter((p) => p.slug !== slug).slice(0, 3);
  const productUrl = absoluteUrl(`/products/${slug}`, locale);

  return (
    <>
      <JsonLd
        data={[
          generateProductSchema({
            name: product.name,
            description: product.description,
            image: product.image,
            url: productUrl,
            category: product.categoryLabel,
            sku: slug,
          }),
          generateBreadcrumbSchema(locale, [
            { name: t('title'), url: '/products' },
            { name: product.name, url: `/products/${slug}` },
          ]),
        ]}
      />
      <PageHero title={product.name} description={product.categoryLabel} image={product.image} />

      <section className="py-section bg-white">
        <div className="container-custom grid lg:grid-cols-2 gap-16">
          <FadeIn>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image src={product.image} alt={product.name} fill className="object-cover" priority />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Badge variant="secondary" className="mb-4">{product.categoryLabel}</Badge>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-8">{product.description}</p>

            {Object.keys(product.specifications).length > 0 && (
              <div className="mb-8">
                <h2 className="text-h4 font-bold text-neutral-900 mb-4">{t('specifications')}</h2>
                <dl className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="p-3 bg-neutral-50 rounded-lg">
                      <dt className="text-xs text-neutral-500 uppercase tracking-wide">{key}</dt>
                      <dd className="font-semibold text-neutral-900 mt-1">{String(val)}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {product.applications.length > 0 && (
              <div className="mb-8">
                <h2 className="text-h4 font-bold text-neutral-900 mb-4">{t('applications')}</h2>
                <ul className="flex flex-wrap gap-2">
                  {product.applications.map((app) => (
                    <li key={app}><Badge variant="outline">{app}</Badge></li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-4">
              <Link href={`/${locale}/contact`} className={cn(buttonVariants({ variant: 'primary' }))}>
                {t('inquire')}
              </Link>
              <Link href={`/${locale}/products`} className={cn(buttonVariants({ variant: 'outline' }))}>
                <ArrowLeft className="w-4 h-4" /> {t('backToCatalog')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-section bg-neutral-50">
          <div className="container-custom">
            <h2 className="text-h3 font-bold text-neutral-900 mb-8">{t('related')}</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/${locale}/products/${r.slug}`} className="group p-4 bg-white rounded-xl border hover:shadow-card transition-all">
                  <p className="font-semibold group-hover:text-primary transition-colors">{r.name}</p>
                  <span className="text-sm text-primary mt-2 inline-flex items-center gap-1">
                    {t('learnMore')} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
