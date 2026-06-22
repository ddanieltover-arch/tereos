
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

const demoInnovations = [
  {
    id: '1',
    title: 'Next-Gen Biofuel Research',
    description: 'Developing second and third-generation biofuels from agricultural waste and algae for carbon-neutral energy.',
    image: TEREOS_PHOTOS.laboratory,
    icon: <FlaskConical className="w-6 h-6" />,
  },
  {
    id: '2',
    title: 'Smart Agriculture IoT',
    description: 'IoT sensors and AI-powered analytics optimizing water usage, fertilizer application, and harvest timing.',
    image: TEREOS_PHOTOS.agriculture,
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    id: '3',
    title: 'Sustainable Crop Varieties',
    description: 'Researching drought-resistant and high-yield sugarcane varieties to improve farmer productivity.',
    image: TEREOS_PHOTOS.field,
    icon: <Sprout className="w-6 h-6" />,
  },
];

export function InnovationSpotlight({ locale, innovations = [] }: InnovationSpotlightProps) {
  const displayInnovations = innovations.length > 0 ? innovations : demoInnovations;

  return (
    <section className="py-section bg-white">
      <div className="container-custom">
        <FadeIn className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-label uppercase tracking-widest text-accent-gold font-semibold mb-4">
            Innovation
          </span>
          <h2 className="text-h2 font-bold text-neutral-900 mb-6 text-balance">
            Pioneering the Future of Agriculture & Energy
          </h2>
          <p className="text-body-lg text-neutral-600 text-balance">
            Our R&D teams are pushing the boundaries of what&apos;s possible in sustainable agriculture,
            bioenergy production, and circular economy solutions.
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
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
