'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { locales, localeLabels, localeFlags, type Locale } from '@/lib/i18n/config';
import { trackLanguageSwitch } from '@/lib/i18n/analytics';
import { LOCALE_STORAGE_KEY } from '@/lib/i18n/locale-meta';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
  className?: string;
}

export function LanguageSwitcher({ isScrolled = false, className }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const getPathWithoutLocale = (path: string) => {
    const segments = path.split('/');
    if (locales.includes(segments[1] as Locale)) {
      return '/' + segments.slice(2).join('/');
    }
    return path;
  };

  const currentPath = getPathWithoutLocale(pathname);

  useEffect(() => {
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    } catch {
      /* ignore */
    }
  }, [locale]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors',
          isScrolled
            ? 'text-neutral-700 hover:text-primary hover:bg-neutral-100'
            : 'text-white/90 hover:text-white hover:bg-white/10'
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('language')}
      >
        <Globe className="w-4 h-4" />
        <span className="uppercase">{locale}</span>
        <ChevronDown className={cn('w-3 h-3 transition-transform', isOpen && 'rotate-180')} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-elevated border border-neutral-200 py-1 z-50"
        >
          {locales.map((loc) => (
            <li key={loc} role="option" aria-selected={loc === locale}>
              <Link
                href={`/${loc}${currentPath}`}
                className={cn(
                  'flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors',
                  loc === locale
                    ? 'text-primary bg-primary/5 font-medium'
                    : 'text-neutral-700 hover:bg-neutral-50'
                )}
                onClick={() => {
                  trackLanguageSwitch(locale, loc);
                  setIsOpen(false);
                }}
              >
                <span aria-hidden>{localeFlags[loc]}</span>
                <span className="uppercase text-xs w-8 text-neutral-400">{loc}</span>
                <span>{localeLabels[loc]}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
