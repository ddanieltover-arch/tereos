'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerContainer, staggerChildVariants } from '@/components/animations/stagger-container';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ConsumerBrand } from '@/lib/content/consumer-brands';
import { motion } from 'framer-motion';

interface ConsumerBrandsGridProps {
  brands: ConsumerBrand[];
  labels: {
    highlights: string;
  };
}

export function ConsumerBrandsGrid({ brands, labels }: ConsumerBrandsGridProps) {
  return (
    <StaggerContainer className="grid md:grid-cols-2 gap-8">
      {brands.map((brand) => (
        <motion.article
          key={brand.id}
          variants={staggerChildVariants}
          id={brand.id}
          className="group scroll-mt-32 bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:shadow-card-hover transition-all duration-500"
        >
          <div className="relative h-56 overflow-hidden">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/85 via-dark/25 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <Badge variant="secondary" className="mb-3 bg-white/90">
                <MapPin className="w-3 h-3 mr-1" aria-hidden />
                {brand.region}
              </Badge>
              <h3 className="text-2xl font-bold text-white">{brand.name}</h3>
              <p className="text-white/80 text-sm mt-1">{brand.tagline}</p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-neutral-600 leading-relaxed mb-5">{brand.description}</p>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              {labels.highlights}
            </p>
            <ul className="space-y-2">
              {brand.highlights.map((item) => (
                <li key={item} className="text-sm text-neutral-600 flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>
      ))}
    </StaggerContainer>
  );
}

interface ConsumerBrandStatsProps {
  stats: { value: string; label: string }[];
}

export function ConsumerBrandStats({ stats }: ConsumerBrandStatsProps) {
  return (
    <FadeIn>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center p-6 bg-neutral-50 rounded-2xl">
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-neutral-500 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

interface ConsumerBrandsCtaProps {
  locale: string;
  title: string;
  description: string;
  productsLabel: string;
  contactLabel: string;
}

export function ConsumerBrandsCta({
  locale,
  title,
  description,
  productsLabel,
  contactLabel,
}: ConsumerBrandsCtaProps) {
  return (
    <FadeIn>
      <section className="mt-16 rounded-2xl bg-neutral-50 border border-neutral-100 p-8 md:p-12 text-center">
        <h2 className="text-h3 font-bold text-neutral-900 mb-3">{title}</h2>
        <p className="text-neutral-600 max-w-2xl mx-auto mb-8">{description}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href={`/${locale}/products`} className={cn(buttonVariants({ variant: 'primary' }))}>
            {productsLabel}
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          <Link href={`/${locale}/contact`} className={cn(buttonVariants({ variant: 'outline' }))}>
            {contactLabel}
          </Link>
        </div>
      </section>
    </FadeIn>
  );
}
