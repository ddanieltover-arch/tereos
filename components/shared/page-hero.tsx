
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  image?: string;
  dark?: boolean;
  className?: string;
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  dark = false,
  className,
}: PageHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={ref}
      className={cn(
        'relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden grain-overlay',
        dark ? 'bg-dark text-white' : 'bg-neutral-50',
        className
      )}
    >
      {image && (
        <>
          <motion.div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url('${image}')`, y: bgY }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/75 to-dark/60" />
          {/* Decorative blurred circles */}
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/6 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />
        </>
      )}

      <motion.div
        className="container-custom relative"
        style={{ opacity }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {eyebrow && (
            <motion.span
              variants={childVariants}
              className={cn(
                'inline-block text-label uppercase tracking-widest font-semibold mb-4',
                image || dark ? 'text-accent-gold' : 'text-primary'
              )}
            >
              {eyebrow}
            </motion.span>
          )}
          <motion.h1
            variants={childVariants}
            className={cn(
              'text-display-l font-bold mb-6 text-balance max-w-4xl',
              image || dark ? 'text-white' : 'text-neutral-900'
            )}
          >
            {title}
          </motion.h1>
          {description && (
            <motion.p
              variants={childVariants}
              className={cn(
                'text-body-lg max-w-3xl leading-relaxed text-balance',
                image || dark ? 'text-white/80' : 'text-neutral-600'
              )}
            >
              {description}
            </motion.p>
          )}
          {/* Animated divider */}
          <motion.div
            variants={childVariants}
            className="mt-8 max-w-xs"
          >
            <div className="divider-gradient rounded-full" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

