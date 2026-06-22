
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowUp, Linkedin, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';

export function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const navT = useTranslations('navigation');
  const legalT = useTranslations('pages.legal');
  const sitemapT = useTranslations('pages.sitemap');
  const commonT = useTranslations('common');
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    company: [
      { label: navT('about'), href: `/${locale}/about` },
      { label: navT('governance'), href: `/${locale}/about/governance` },
      { label: navT('global'), href: `/${locale}/global-presence` },
      { label: navT('innovation'), href: `/${locale}/innovation` },
      { label: navT('careers'), href: `/${locale}/careers` },
    ],
    businesses: [
      { label: 'Sugar', href: `/${locale}/our-businesses/sugar` },
      { label: 'Bioenergy', href: `/${locale}/our-businesses/bioenergy` },
      { label: 'Agriculture', href: `/${locale}/our-businesses/agriculture` },
      { label: 'Food Ingredients', href: `/${locale}/our-businesses/food-ingredients` },
      { label: 'Renewable Solutions', href: `/${locale}/our-businesses/renewable-solutions` },
    ],
    resources: [
      { label: navT('news'), href: `/${locale}/news-media` },
      { label: navT('pressContact'), href: `/${locale}/press-contact` },
      { label: navT('downloads'), href: `/${locale}/download-center` },
      { label: navT('investors'), href: `/${locale}/investor-relations` },
      { label: navT('sustainability'), href: `/${locale}/sustainability` },
      { label: navT('consumerBrands'), href: `/${locale}/consumer-brands` },
    ],
    legal: [
      { label: legalT('privacy'), href: `/${locale}/legal/privacy` },
      { label: legalT('cookies'), href: `/${locale}/legal/cookies` },
      { label: legalT('terms'), href: `/${locale}/legal/terms` },
      { label: legalT('accessibility'), href: `/${locale}/legal/accessibility` },
      { label: legalT('credits'), href: `/${locale}/legal/credits` },
      { label: sitemapT('title'), href: `/${locale}/sitemap` },
    ],
  };

  return (
    <footer className="bg-dark text-white relative grain-overlay">
      {/* Animated gradient top border */}
      <div className="divider-gradient" />

      {/* Main Footer */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand Column */}
          <FadeIn className="lg:col-span-4">
            <Link
              href={`/${locale}`}
              className="inline-block mb-6 bg-white rounded-xl px-4 py-3"
              aria-label="Tereos — Home"
            >
              <Image
                src="/images/tereosa-logo.png"
                alt="Tereos — Day by day, cultivating the future"
                width={260}
                height={72}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              A global leader in sugar, bioenergy, and sustainable agriculture. 
              Day by day, cultivating the future from Thailand to the world.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Mail className="w-4 h-4 text-primary" />
                <span>sales@tereosa.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Phone className="w-4 h-4 text-primary" />
                <span>+66 2 XXX XXXX</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <MapPin className="w-4 h-4 text-primary" />
                <span>[Thailand Address] | [Brazil Address]</span>
              </div>
            </div>
          </FadeIn>

          {/* Links Columns */}
          <FadeIn delay={0.1} className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{t('company')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{t('businesses')}</h4>
            <ul className="space-y-3">
              {footerLinks.businesses.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.2} className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{t('resources')}</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn delay={0.25} className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{t('legal')}</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/60 hover:text-white transition-colors duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        {/* Newsletter */}
        <FadeIn delay={0.3} className="mt-12 pt-10 border-t border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-1">{t('newsletter.title')}</h4>
              <p className="text-sm text-white/60">{t('newsletter.description')}</p>
            </div>
            <form className="flex gap-2 max-w-md w-full lg:w-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg transition-colors duration-300 whitespace-nowrap"
              >
                {t('newsletter.button')}
              </button>
            </form>
          </div>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/50">
            {commonT('allRightsReserved', { year: currentYear })}
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="Twitter">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors" aria-label="YouTube">
              <Youtube className="w-5 h-5" />
            </a>
            <button
              onClick={scrollToTop}
              className="ml-2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-all duration-300"
              aria-label={commonT('backToTop')}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
