'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin progress bar fixed to the top of the viewport showing
 * how far the user has scrolled down the page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-accent-gold to-secondary z-[60] origin-left"
      style={{ scaleX }}
    />
  );
}
