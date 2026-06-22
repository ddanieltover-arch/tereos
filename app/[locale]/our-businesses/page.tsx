
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { FadeIn } from '@/components/animations/fade-in';
import { getBusinessDivisions } from '@/lib/sanity/fetch';
import { divisionExtras } from '@/lib/content/pages';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.businesses' });
  return { title: t('title'), description: t('description') };
}

export default async function BusinessesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pages.businesses' });
  const cmsDivisions = await getBusinessDivisions(locale);

  const divisions =
    cmsDivisions?.map((d) => ({
      title: d.title,
      description: d.description,
      image: d.image,
      href: d.href,
    })) ||
    Object.values(divisionExtras).map((d) => ({
      title: d.slug.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      description: '',
      image: d.image,
      href: `/${locale}/our-businesses/${d.slug}`,
    }));

  return (
    <>
      <PageHero eyebrow="Tereos Açúcar e Energia" title={t('title')} description={t('description')} />
      <section className="py-section bg-white">
        <div className="container-custom grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {divisions.map((division, i) => (
            <FadeIn key={division.href} delay={i * 0.05}>
              <Link
                href={division.href}
                className="group block rounded-2xl overflow-hidden border border-neutral-100 hover:shadow-card-hover hover:-translate-y-1 transition-all"
              >
                <div className="relative h-56">
                  <Image src={division.image} alt={division.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <h2 className="text-xl font-bold text-white">{division.title}</h2>
                    <ArrowUpRight className="w-5 h-5 text-white group-hover:rotate-45 transition-transform" />
                  </div>
                </div>
                {division.description && (
                  <p className="p-5 text-sm text-neutral-600 line-clamp-2">{division.description}</p>
                )}
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
