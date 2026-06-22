import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  locale: string;
  variant?: 'full' | 'icon';
  className?: string;
  /** Adds a white backdrop — useful on dark/transparent headers */
  onDark?: boolean;
  priority?: boolean;
}

export function Logo({
  locale,
  variant = 'full',
  className,
  onDark = false,
  priority = false,
}: LogoProps) {
  const isFull = variant === 'full';

  return (
    <Link
      href={`/${locale}`}
      className={cn('inline-flex items-center shrink-0 z-50', className)}
      aria-label="Tereos Açúcar e Energia — Home"
    >
      <span
        className={cn(
          'inline-flex items-center',
          onDark && 'bg-white rounded-lg px-2.5 py-1.5 shadow-sm'
        )}
      >
        <Image
          src={isFull ? '/images/tereosa-logo.png' : '/images/tereosa-icon.png'}
          alt={
            isFull
              ? 'Tereos — Day by day, cultivating the future'
              : 'Tereos'
          }
          width={isFull ? 220 : 40}
          height={isFull ? 56 : 40}
          className={cn(
            'w-auto object-contain',
            isFull ? 'h-10 sm:h-11 lg:h-12' : 'h-9 w-9 sm:h-10 sm:w-10'
          )}
          priority={priority}
        />
      </span>
    </Link>
  );
}
