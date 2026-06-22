'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

/**
 * Cinematic text reveal — text slides up from a masked clip with
 * a slight rotation for a premium editorial feel.
 */
export function TextReveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'h2',
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const variants: Variants = {
    hidden: {
      y: '120%',
      rotateX: 25,
      opacity: 0,
    },
    visible: {
      y: '0%',
      rotateX: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div ref={ref} className={cn('overflow-hidden', className)} style={{ perspective: '1000px' }}>
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={variants}
        style={{ transformOrigin: 'bottom center' }}
      >
        <Tag>{children}</Tag>
      </motion.div>
    </div>
  );
}

/* ─── Shimmer Text ─── */

interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
}

/**
 * Subtle shimmer / gradient sweep across text — draws attention
 * to headlines without being distracting.
 */
export function ShimmerText({ children, className = '' }: ShimmerTextProps) {
  return (
    <span
      className={cn(
        'relative inline-block bg-clip-text text-transparent',
        'bg-[length:200%_auto]',
        'animate-shimmer',
        className
      )}
      style={{
        backgroundImage:
          'linear-gradient(90deg, #1A1A1A 0%, #1A1A1A 40%, #E30613 50%, #1A1A1A 60%, #1A1A1A 100%)',
      }}
    >
      {children}
    </span>
  );
}
