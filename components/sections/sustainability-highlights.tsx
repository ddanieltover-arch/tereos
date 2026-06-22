
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, Droplets, Sun, Heart } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerContainer, staggerChildVariants } from '@/components/animations/stagger-container';
import { CountUp } from '@/components/animations/count-up';
import { cn } from '@/lib/utils';
import { TEREOS_PHOTOS } from '@/lib/content/photography';
import type { ESGMetric } from '@/types';

interface SustainabilityHighlightsProps {
  title: string;
  description: string;
  metrics: ESGMetric[];
  cta: { label: string; href: string };
}

const metricIcons = [
  <Leaf className="w-6 h-6" key="leaf" />,
  <Droplets className="w-6 h-6" key="droplets" />,
  <Sun className="w-6 h-6" key="sun" />,
  <Heart className="w-6 h-6" key="heart" />,
];

const metricColors = [
  'text-accent-green bg-accent-green/10',
  'text-secondary bg-secondary/10',
  'text-accent-gold bg-accent-gold/10',
  'text-primary bg-primary/10',
];

export function SustainabilityHighlights({ title, description, metrics, cta }: SustainabilityHighlightsProps) {
  return (
    <section className="relative py-section overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark" />
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${TEREOS_PHOTOS.sustainability}')` }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/95 to-dark/90" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-accent-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <FadeIn direction="left">
            <div>
              <span className="inline-flex items-center gap-2 text-label uppercase tracking-widest text-accent-green font-semibold mb-4">
                <Leaf className="w-4 h-4" />
                ESG Commitment
              </span>
              <h2 className="text-h2 font-bold text-white mb-6 text-balance">{title}</h2>
              <p className="text-body-lg text-white/70 leading-relaxed mb-8 text-balance">{description}</p>
              <Link
                href={cta.href}
                className={cn(
                  "group inline-flex items-center gap-2 px-8 py-4",
                  "bg-accent-green hover:bg-accent-green/90",
                  "text-white font-semibold rounded-full transition-all duration-300",
                  "hover:shadow-lg hover:shadow-accent-green/25 hover:-translate-y-0.5"
                )}
              >
                {cta.label}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </FadeIn>

          {/* Metrics Grid */}
          <StaggerContainer className="grid grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                variants={staggerChildVariants}
                className={cn(
                  "relative p-6 rounded-2xl border border-white/10 backdrop-blur-sm",
                  "bg-white/5 hover:bg-white/10 transition-all duration-500"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                  metricColors[index % metricColors.length]
                )}>
                  {metricIcons[index % metricIcons.length]}
                </div>
                <div className="text-h2 font-bold text-white mb-1">
                  <CountUp
                    end={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    duration={2}
                  />
                </div>
                <p className="text-sm text-white/60 mb-3">{metric.label}</p>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-accent-green"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(metric.value / metric.target) * 100}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                  />
                </div>
                <p className="text-xs text-white/40 mt-1.5">Target: {metric.target}{metric.suffix}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
