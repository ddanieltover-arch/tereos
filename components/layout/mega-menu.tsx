'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MegaMenuItem } from '@/lib/navigation';

interface MegaMenuProps {
  items: MegaMenuItem[];
  locale: string;
  isScrolled: boolean;
}

export function MegaMenu({ items, locale, isScrolled }: MegaMenuProps) {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (labelKey: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveItem(labelKey);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveItem(null), 150);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    setActiveItem(null);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div className="relative hidden lg:flex flex-1 justify-center">
      <div className="flex items-center gap-0.5">
        {items.map((item, index) => {
          const href = `/${locale}${item.href}`;
          const isActive = pathname === href || pathname.startsWith(`${href}/`);
          const isOpen = activeItem === item.labelKey;
          const showDropdown = (item.columns && item.columns.length > 0) || item.featured;
          const alignRight = index >= items.length - 2;

          return (
            <div
              key={item.labelKey}
              className="relative"
              onMouseEnter={() => showDropdown && openMenu(item.labelKey)}
              onMouseLeave={scheduleClose}
            >
              <Link
                href={href}
                className={cn(
                  'inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-300',
                  isScrolled
                    ? isActive || isOpen
                      ? 'text-neutral-900 bg-neutral-100 font-semibold'
                      : 'text-neutral-700 hover:text-primary hover:bg-neutral-100'
                    : isActive || isOpen
                      ? 'text-white bg-white/20'
                      : 'text-white/90 hover:text-white hover:bg-white/10'
                )}
                aria-expanded={showDropdown ? isOpen : undefined}
                aria-haspopup={showDropdown ? 'true' : undefined}
              >
                {t(item.labelKey)}
                {showDropdown && (
                  <ChevronDown
                    className={cn('w-3.5 h-3.5 transition-transform duration-300', isOpen && 'rotate-180')}
                  />
                )}
              </Link>

              <AnimatePresence>
                {showDropdown && isOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                      'absolute top-full z-50 pt-3 w-max min-w-[28rem] max-w-4xl',
                      alignRight ? 'right-0' : 'left-0'
                    )}
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    <div className="bg-white rounded-2xl shadow-elevated border border-neutral-100 overflow-hidden">
                      <div
                        className={cn(
                          'grid',
                          item.featured
                            ? item.columns?.length
                              ? 'lg:grid-cols-[1fr_280px]'
                              : 'lg:grid-cols-[1fr_280px]'
                            : 'grid-cols-1'
                        )}
                      >
                        {item.columns && item.columns.length > 0 && (
                          <div className="p-8 grid grid-cols-2 gap-8">
                            {item.columns.map((column, colIndex) => (
                              <ul key={colIndex} className="space-y-1">
                                {column.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={`/${locale}${link.href}`}
                                      className="group block rounded-lg px-3 py-2.5 hover:bg-neutral-50 transition-colors"
                                      onClick={() => setActiveItem(null)}
                                    >
                                      <span className="block text-sm font-semibold text-neutral-900 group-hover:text-primary transition-colors">
                                        {t(link.labelKey)}
                                      </span>
                                      {link.descriptionKey && (
                                        <span className="block text-xs text-neutral-500 mt-0.5 line-clamp-2">
                                          {t(link.descriptionKey)}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            ))}
                          </div>
                        )}

                        {item.featured && (
                          <Link
                            href={`/${locale}${item.featured.href}`}
                            className="relative group block min-h-[200px] bg-neutral-100"
                            onClick={() => setActiveItem(null)}
                          >
                            <Image
                              src={item.featured.image}
                              alt=""
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              sizes="280px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
                            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                              <p className="text-sm font-bold mb-1">{t(item.featured.titleKey)}</p>
                              <p className="text-xs text-white/80 line-clamp-2 mb-3">
                                {t(item.featured.descriptionKey)}
                              </p>
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-accent-gold">
                                {t('learnMore')} <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
