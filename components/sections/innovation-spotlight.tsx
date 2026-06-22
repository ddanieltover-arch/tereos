
'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, FlaskConical, Cpu, Sprout } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerContainer, staggerChildVariants } from '@/components/animations/stagger-container';
import { cn } from '@/lib/utils';
import { TEREOS_PHOTOS } from '@/lib/content/photography';

import { useTranslations } from 'next-intl';

interface InnovationItem {
  id: string;
  title: string;
  description: string;
  image: string;
  icon?: ReactNode;
}

interface InnovationSpotlightProps {
  locale: string;
  innovations?: InnovationItem[];
}

export function InnovationSpotlight({ locale, innovations = [] }: InnovationSpotlightProps) {
  const t = useTranslations('pages.innovation');

  const demoInnovations = [
    {
      id: '1',
      title: t('demo1.title'),
      description: t('demo1.description'),
      image: TEREOS_PHOTOS.laboratory,
      icon: <FlaskConical className="w-6 h-6" />,
    },
    {
      id: '2',
      title: t('demo2.title'),
      description: t('demo2.description'),
      image: TEREOS_PHOTOS.agriculture,
      icon: <Cpu className="w-6 h-6" />,
    },
    {
      id: '3',
      title: t('demo3.title'),
      description: t('demo3.description'),
      image: TEREOS_PHOTOS.field,
      icon: <Sprout className="w-6 h-6" />,
    },
  ];

  const displayInnovations = innovations.length > 0 ? innovations : demoInnovations;

  return (
    <section className="py-section bg-white">
      <div className="container-custom">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-label uppercase tracking-widest text-accent-gold font-semibold mb-4">
            {t('badge')}
          </span>
          <h2 className="text-h2 font-bold text-neutral-900 mb-6 text-balance">
            {t('overviewTitle')}
          </h2>
          <p className="text-body-lg text-neutral-600 text-balance">
            {t('overviewDescription')}
          </p>
        </FadeIn>

        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {displayInnovations.map((item) => (
            <motion.div
              key={item.id}
              variants={staggerChildVariants}
              className={cn(
                "group relative bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100",
                "hover:shadow-card-hover transition-all duration-500"
              )}
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-h4 font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                  {item.description}
                </p>
                <Link
                  href={`/${locale}/innovation`}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all"
                >
                  {t('learnMore')} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
