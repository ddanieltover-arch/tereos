'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeIn } from '@/components/animations/fade-in';
import { MagneticHover } from '@/components/animations/interactive-hover';
import { cn } from '@/lib/utils';

interface ContactCTAProps {
  locale?: string;
}

export function ContactCTA({ locale = 'en' }: ContactCTAProps) {
  const t = useTranslations('home.contactCta');

  const contactMethods = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t('email'),
      value: 'contact-presse@tereos.com',
      href: 'mailto:contact-presse@tereos.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: t('press'),
      value: 'contact-presse@tereos.com',
      href: 'mailto:contact-presse@tereos.com',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t('office'),
      value: t('officeValue'),
      href: '#',
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: t('inquiry'),
      value: t('inquiryValue'),
      href: '',
    },
  ];

  return (
    <section className="py-section bg-dark relative overflow-hidden grain-overlay">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left">
            <div>
              <span className="inline-block text-label uppercase tracking-widest text-primary font-semibold mb-4">
                {t('eyebrow')}
              </span>
              <h2 className="text-h2 font-bold text-white mb-6 text-balance">{t('title')}</h2>
              <p className="text-body-lg text-white/60 leading-relaxed mb-8 text-balance">{t('description')}</p>
              <MagneticHover strength={0.2}>
                <Link
                  href={`/${locale}/contact`}
                  className={cn(
                    'group inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark',
                    'text-white font-semibold rounded-full transition-all duration-300',
                    'hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5',
                    'animate-pulse-glow'
                  )}
                >
                  {t('cta')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticHover>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="grid grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href || `/${locale}/contact`}
                  className={cn(
                    'group p-6 bg-white/5 border border-white/10 rounded-2xl',
                    'hover:bg-white/10 hover:border-white/20 transition-all duration-300'
                  )}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    {method.icon}
                  </div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{method.label}</p>
                  <p className="text-sm font-semibold text-white">{method.value}</p>
                </motion.a>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
