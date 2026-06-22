
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Briefcase, GraduationCap, Award } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerContainer, staggerChildVariants } from '@/components/animations/stagger-container';
import { MagneticHover } from '@/components/animations/interactive-hover';
import { cn } from '@/lib/utils';

interface CareersCTAProps {
  title: string;
  description: string;
  cta: { label: string; href: string };
}

const benefits = [
  { icon: <Users className="w-5 h-5" />, label: 'Global Team', desc: 'Work with 25,000+ professionals worldwide' },
  { icon: <Briefcase className="w-5 h-5" />, label: 'Career Growth', desc: 'Clear progression paths and mentorship' },
  { icon: <GraduationCap className="w-5 h-5" />, label: 'Learning', desc: 'Continuous training and development' },
  { icon: <Award className="w-5 h-5" />, label: 'Impact', desc: 'Shape the future of sustainable agriculture' },
];

export function CareersCTA({ title, description, cta }: CareersCTAProps) {
  return (
    <section className="relative py-section overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-neutral-50 to-secondary/5" />
      {/* Floating decorative dots */}
      <div className="floating-dot top-20 left-[15%] animate-delay-100" />
      <div className="floating-dot top-40 right-[20%] animate-delay-300" />
      <div className="floating-dot bottom-24 left-[35%] animate-delay-200" />

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <span className="inline-block text-label uppercase tracking-widest text-primary font-semibold mb-4">
              Careers
            </span>
            <h2 className="text-h2 font-bold text-neutral-900 mb-6 text-balance">{title}</h2>
            <p className="text-body-lg text-neutral-600 leading-relaxed mb-10 max-w-2xl mx-auto text-balance">
              {description}
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={staggerChildVariants}
                className="p-5 bg-white rounded-xl border border-neutral-100 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-500 hover:border-primary/20"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-3">
                  {benefit.icon}
                </div>
                <h4 className="text-sm font-semibold text-neutral-900 mb-1">{benefit.label}</h4>
                <p className="text-xs text-neutral-500">{benefit.desc}</p>
              </motion.div>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <MagneticHover strength={0.2}>
            <Link
              href={cta.href}
              className={cn(
                "group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark",
                "text-white font-semibold rounded-full transition-all duration-300",
                "hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              )}
            >
              {cta.label}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            </MagneticHover>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
