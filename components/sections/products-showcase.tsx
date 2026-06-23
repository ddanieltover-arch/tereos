
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Beaker, Wheat, Droplets, Package } from 'lucide-react';
import type { Product } from '@/types';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerContainer, staggerChildVariants } from '@/components/animations/stagger-container';
import { cn } from '@/lib/utils';
import { TEREOS_PHOTOS } from '@/lib/content/photography';
import { useTranslations } from 'next-intl';

interface ProductsShowcaseProps {
  locale: string;
  products?: Product[];
}

const demoProducts: Product[] = [
  {
    id: '1',
    slug: 'crystal-sugar-icumsa-45',
    name: 'Crystal Sugar ICUMSA 45',
    category: 'Sugar',
    description: 'Premium refined white sugar meeting international quality standards for food and beverage applications.',
    image: TEREOS_PHOTOS.productSugar,
  },
  {
    id: '2',
    slug: 'fuel-ethanol',
    name: 'Fuel Ethanol',
    category: 'Bioenergy',
    description: 'High-purity bioethanol for fuel blending and industrial applications, supporting clean energy transition.',
    image: TEREOS_PHOTOS.productBioenergy,
  },
  {
    id: '3',
    slug: 'molasses',
    name: 'Molasses',
    category: 'Food Ingredients',
    description: 'Versatile syrup for animal feed, fermentation, and food processing industries.',
    image: TEREOS_PHOTOS.productMolasses,
  },
  {
    id: '4',
    slug: 'bagasse-pellets',
    name: 'Bagasse Pellets',
    category: 'Renewable Solutions',
    description: 'Sustainable biomass fuel derived from sugarcane fiber for power generation.',
    image: TEREOS_PHOTOS.productBiomass,
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  'Sugar': <Wheat className="w-4 h-4" />,
  'Bioenergy': <Droplets className="w-4 h-4" />,
  'Food Ingredients': <Beaker className="w-4 h-4" />,
  'Renewable Solutions': <Package className="w-4 h-4" />,
};

export function ProductsShowcase({ locale, products = [] }: ProductsShowcaseProps) {
  const t = useTranslations('home.productsShowcase');
  const displayProducts = products.length > 0 ? products : demoProducts;

  return (
    <section className="py-section bg-white">
      <div className="container-custom">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-label uppercase tracking-widest text-primary font-semibold mb-4">
            {t('eyebrow')}
          </span>
          <h2 className="text-h2 font-bold text-neutral-900 mb-6 text-balance">
            {t('title')}
          </h2>
          <p className="text-body-lg text-neutral-600 text-balance">
            {t('description')}
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <motion.div
              key={product.slug}
              variants={staggerChildVariants}
              className="group"
            >
              <Link
                href={`/${locale}/products/${product.slug}`}
                className={cn(
                  "block bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100",
                  "hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
                )}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-neutral-700">
                      {categoryIcons[product.category] || <Package className="w-3 h-3" />}
                      {product.category}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-neutral-500 line-clamp-2 mb-4">
                    {product.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    {t('learnMore')} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </StaggerContainer>

        <FadeIn delay={0.3} className="text-center mt-10">
          <Link
            href={`/${locale}/products`}
            className={cn(
              "group inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary",
              "hover:bg-primary hover:text-white font-semibold rounded-full transition-all duration-300"
            )}
          >
            {t('viewAll')}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
