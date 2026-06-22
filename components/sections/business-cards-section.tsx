
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Factory, Zap, Sprout, Apple, Recycle } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerContainer, staggerChildVariants } from '@/components/animations/stagger-container';
import { TiltCard } from '@/components/animations/interactive-hover';
import { cn } from '@/lib/utils';
import type { BusinessCard } from '@/types';

interface BusinessCardsSectionProps {
  title: string;
  description: string;
  businesses: BusinessCard[];
}

const businessIcons = [
  <Factory className="w-8 h-8" key="factory" />,
  <Zap className="w-8 h-8" key="zap" />,
  <Sprout className="w-8 h-8" key="sprout" />,
  <Apple className="w-8 h-8" key="apple" />,
  <Recycle className="w-8 h-8" key="recycle" />,
];

const businessColors = [
  'from-primary/20 to-primary/5',
  'from-secondary/20 to-secondary/5',
  'from-accent-green/20 to-accent-green/5',
  'from-accent-gold/20 to-accent-gold/5',
  'from-accent-orange/20 to-accent-orange/5',
];

export function BusinessCardsSection({ title, description, businesses }: BusinessCardsSectionProps) {
  return (
    <section className="py-section bg-neutral-50">
      <div className="container-custom">
        {/* Section Header */}
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-label uppercase tracking-widest text-primary font-semibold mb-4">
            What We Do
          </span>
          <h2 className="text-h2 font-bold text-neutral-900 mb-6 text-balance">{title}</h2>
          <p className="text-body-lg text-neutral-600 text-balance">{description}</p>
        </FadeIn>

        {/* Business Cards Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business, index) => (
            <motion.div key={business.href} variants={staggerChildVariants}>
              <TiltCard>
              <Link
                href={business.href}
                className={cn(
                  "group block relative overflow-hidden rounded-2xl bg-white border border-neutral-100",
                  "hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
                )}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url('${business.image}')` }}
                  />
                  <div className={cn(
                    "absolute inset-0 bg-gradient-to-t",
                    businessColors[index % businessColors.length]
                  )} />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />

                  {/* Icon Badge */}
                  <div className="absolute top-4 left-4 w-14 h-14 bg-white/95 backdrop-blur-sm rounded-xl flex items-center justify-center text-primary shadow-lg group-hover:scale-110 transition-transform duration-500">
                    {businessIcons[index % businessIcons.length]}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-h4 font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                        {business.title}
                      </h3>
                      <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                        {business.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
              </TiltCard>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
