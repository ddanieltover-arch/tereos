
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerContainer, staggerChildVariants } from '@/components/animations/stagger-container';
import { cn, formatDate } from '@/lib/utils';
import { TEREOS_PHOTOS } from '@/lib/content/photography';
import type { NewsArticle } from '@/types';

interface LatestNewsProps {
  title: string;
  articles: NewsArticle[];
  cta: { label: string; href: string };
  locale?: string;
}

export function LatestNews({ title, articles, cta, locale = 'en' }: LatestNewsProps) {
  // Demo articles if none provided
  const demoArticles: NewsArticle[] = articles.length > 0 ? articles : [
    {
      id: '1',
      title: 'Tereos Announces Major Expansion of Bioenergy Operations in Southeast Asia',
      excerpt: 'The company invests €200M in new biomass power facilities to support regional renewable energy goals.',
      image: TEREOS_PHOTOS.factory,
      category: 'Press Release',
      newsroomType: 'press-release',
      publishedAt: '2026-06-15',
      slug: 'bioenergy-expansion-sea',
    },
    {
      id: '2',
      title: 'Sustainability Report 2025: Record Carbon Reduction Achieved',
      excerpt: 'Tereos reports a 35% reduction in carbon emissions across all operations, exceeding targets ahead of schedule.',
      image: TEREOS_PHOTOS.newsSustainability,
      category: 'Sustainability',
      newsroomType: 'news',
      publishedAt: '2026-05-28',
      slug: 'sustainability-report-2025',
    },
    {
      id: '3',
      title: 'Partnership with Thai Farmers Boosts Sustainable Sugarcane Production',
      excerpt: 'New cooperative program reaches 5,000+ farming families with advanced agricultural training and resources.',
      image: TEREOS_PHOTOS.field,
      category: 'Community',
      newsroomType: 'news',
      publishedAt: '2026-05-10',
      slug: 'farmer-partnership-thailand',
    },
  ];

  return (
    <section className="py-section bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <FadeIn className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <span className="inline-block text-label uppercase tracking-widest text-primary font-semibold mb-4">
              News & Updates
            </span>
            <h2 className="text-h2 font-bold text-neutral-900 text-balance">{title}</h2>
          </div>
          <Link
            href={cta.href}
            className={cn(
              "group inline-flex items-center gap-2 text-primary font-semibold",
              "hover:text-primary-dark transition-colors"
            )}
          >
            {cta.label}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </FadeIn>

        {/* News Grid */}
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoArticles.map((article, index) => (
            <motion.article
              key={article.id}
              variants={staggerChildVariants}
              className={cn(
                "group relative bg-white rounded-2xl overflow-hidden border border-neutral-100",
                "hover:shadow-card-hover transition-all duration-500 hover:-translate-y-1"
              )}
            >
              <Link href={`/${locale}/news-media/${article.slug}`} className="block">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(article.publishedAt, locale)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      5 min read
                    </span>
                  </div>
                  <h3 className="text-h4 font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
