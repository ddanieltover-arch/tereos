
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { primaryNav } from '@/lib/navigation';
import { MegaMenu } from '@/components/layout/mega-menu';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { Logo } from '@/components/brand/logo';
import { Button, buttonVariants } from '@/components/ui/button';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('navigation');
  const tCommon = useTranslations('common');

  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;
  const headerSolid = !isHomePage || isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setExpandedMobile(null);
    setIsScrolled(window.scrollY > 50);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md"
      >
        {tCommon('skipToContent')}
      </a>

      <header className="fixed top-0 left-0 right-0 z-50 overflow-visible">
        {/* Keep backdrop-filter on a separate layer so the mobile menu can use viewport-fixed positioning */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-0 transition-all duration-500 ease-smooth',
            headerSolid ? 'bg-white/95 backdrop-blur-md shadow-subtle' : 'bg-transparent'
          )}
        />

        <div className="relative container-custom">
          <div className="flex items-center justify-between h-20 lg:h-24 gap-4">
            {/* Logo */}
            <Logo
              locale={locale}
              variant="full"
              onDark={!headerSolid}
              priority
            />

            {/* Desktop MegaMenu */}
            <MegaMenu items={primaryNav} locale={locale} isScrolled={headerSolid} />

            {/* Right Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href={`/${locale}/search`}
                className={cn(
                  'p-2 rounded-full transition-colors',
                  headerSolid
                    ? 'text-neutral-600 hover:text-primary hover:bg-neutral-100'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
                aria-label={t('search')}
              >
                <Search className="w-5 h-5" />
              </Link>

              <LanguageSwitcher isScrolled={headerSolid} className="hidden sm:block" />

              <Link
                href={`/${locale}/contact`}
                className={cn(
                  buttonVariants({
                    variant: headerSolid ? 'primary' : 'outline-light',
                    size: 'sm',
                  }),
                  'hidden md:inline-flex'
                )}
              >
                {t('contactUs')}
              </Link>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  'lg:hidden p-2 rounded-md transition-colors',
                  headerSolid
                    ? 'text-neutral-700 hover:bg-neutral-100'
                    : 'text-white hover:bg-white/10'
                )}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu — rendered outside header to avoid backdrop-filter containing block */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 top-20 bg-white z-40 transition-all duration-500 ease-bounce-out overflow-y-auto',
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="container-custom py-6 flex flex-col gap-1">
            <Link
              href={`/${locale}`}
              className={cn(
                'px-4 py-3 text-base font-medium rounded-lg',
                pathname === `/${locale}` ? 'text-neutral-900 bg-neutral-100 font-semibold' : 'text-neutral-800 hover:bg-neutral-50'
              )}
            >
              {t('home')}
            </Link>

            {primaryNav.map((item) => {
              const hasChildren = item.columns && item.columns.flat().length > 0;
              const isExpanded = expandedMobile === item.labelKey;

              return (
                <div key={item.labelKey}>
                  <div className="flex items-center">
                    <Link
                      href={`/${locale}${item.href}`}
                      className={cn(
                        'flex-1 px-4 py-3 text-base font-medium rounded-lg',
                        pathname.startsWith(`/${locale}${item.href}`)
                          ? 'text-neutral-900 bg-neutral-100 font-semibold'
                          : 'text-neutral-800 hover:bg-neutral-50'
                      )}
                    >
                      {t(item.labelKey)}
                    </Link>
                    {hasChildren && (
                      <button
                        type="button"
                        onClick={() => setExpandedMobile(isExpanded ? null : item.labelKey)}
                        className="p-3 text-neutral-500"
                        aria-expanded={isExpanded}
                        aria-label={`Expand ${t(item.labelKey)}`}
                      >
                        <ChevronDown className={cn('w-5 h-5 transition-transform', isExpanded && 'rotate-180')} />
                      </button>
                    )}
                  </div>
                  {hasChildren && isExpanded && (
                    <div className="ml-4 border-l border-neutral-200 pl-2 mb-2">
                      {item.columns!.flat().map((link) => (
                        <Link
                          key={link.href}
                          href={`/${locale}${link.href}`}
                          className="block px-4 py-2.5 text-sm text-neutral-600 hover:text-primary rounded-lg"
                        >
                          {t(link.labelKey)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="mt-6 pt-6 border-t border-neutral-200 px-4">
              <LanguageSwitcher isScrolled className="sm:hidden w-full mb-4" />
              <Link href={`/${locale}/contact`}>
                <Button variant="primary" className="w-full">
                  {t('contactUs')}
                </Button>
              </Link>
            </div>
          </nav>
      </div>
    </>
  );
}
