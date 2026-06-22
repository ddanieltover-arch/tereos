
'use client';

import { FadeIn } from '@/components/animations/fade-in';
import { CountUp } from '@/components/animations/count-up';
import { StaggerContainer, staggerChildVariants } from '@/components/animations/stagger-container';
import { motion } from 'framer-motion';
import { TrendingUp, Globe, Users, DollarSign } from 'lucide-react';
import type { StatItem } from '@/types';

interface StatsSectionProps {
  title: string;
  description: string;
  stats: StatItem[];
}

const iconMap: Record<string, React.ReactNode> = {
  'sugar': <TrendingUp className="w-6 h-6" />,
  'countries': <Globe className="w-6 h-6" />,
  'employees': <Users className="w-6 h-6" />,
  'revenue': <DollarSign className="w-6 h-6" />,
};

export function StatsSection({ title, description, stats }: StatsSectionProps) {
  return (
    <section className="relative py-section bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <FadeIn direction="left">
            <div>
              <span className="inline-block text-label uppercase tracking-widest text-primary font-semibold mb-4">
                Corporate Overview
              </span>
              <h2 className="text-h2 font-bold text-neutral-900 mb-6 text-balance">
                {title}
              </h2>
              <p className="text-body-lg text-neutral-600 leading-relaxed text-balance">
                {description}
              </p>
            </div>
          </FadeIn>

          {/* Stats Grid */}
          <StaggerContainer className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const keys = ['sugar', 'countries', 'employees', 'revenue'];
              const key = keys[index] || 'sugar';
              return (
                <motion.div
                  key={index}
                  variants={staggerChildVariants}
                  className="relative group"
                >
                  <div className="p-6 lg:p-8 bg-neutral-50 rounded-2xl border border-neutral-100 hover:border-primary/20 hover:shadow-card-hover transition-all duration-500 group-hover:-translate-y-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      {iconMap[key]}
                    </div>
                    <div className="text-h2 font-bold text-neutral-900 mb-2">
                      <CountUp
                        end={stat.value}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                        duration={2.5}
                      />
                    </div>
                    <p className="text-sm text-neutral-500 font-medium">{stat.label}</p>
                  </div>
                </motion.div>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
