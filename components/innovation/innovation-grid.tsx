'use client';

import Image from 'next/image';
import { FlaskConical, Cpu, Sprout, Leaf, GraduationCap, Package } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerContainer, staggerChildVariants } from '@/components/animations/stagger-container';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface InnovationProject {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface InnovationGridProps {
  projects: InnovationProject[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Bioenergy: <FlaskConical className="w-6 h-6" />,
  Agriculture: <Sprout className="w-6 h-6" />,
  Renewable: <Leaf className="w-6 h-6" />,
  'R&D': <GraduationCap className="w-6 h-6" />,
  'Food Ingredients': <Package className="w-6 h-6" />,
};

export function InnovationGrid({ projects }: InnovationGridProps) {
  return (
    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((item) => (
        <motion.article
          key={item.id}
          variants={staggerChildVariants}
          className={cn(
            'group relative bg-white rounded-2xl overflow-hidden border border-neutral-100',
            'hover:shadow-card-hover transition-all duration-500'
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
            <div className="absolute bottom-4 left-4 flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                {CATEGORY_ICONS[item.category] || <Cpu className="w-6 h-6" />}
              </div>
              <Badge variant="secondary" className="bg-white/90">
                {item.category}
              </Badge>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-h4 font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
              {item.title}
            </h3>
            <p className="text-sm text-neutral-500 leading-relaxed">{item.description}</p>
          </div>
        </motion.article>
      ))}
    </StaggerContainer>
  );
}

export function InnovationStats({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
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
