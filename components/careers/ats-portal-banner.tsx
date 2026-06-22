
import Link from 'next/link';
import { ExternalLink, Briefcase } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AtsPortalBannerProps {
  portalUrl: string;
  title: string;
  description: string;
  ctaLabel: string;
}

export function AtsPortalBanner({ portalUrl, title, description, ctaLabel }: AtsPortalBannerProps) {
  return (
    <FadeIn>
      <div className="mb-10 rounded-2xl border border-primary/15 bg-primary/5 p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Briefcase className="w-6 h-6" aria-hidden />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 mb-1">{title}</h3>
            <p className="text-sm text-neutral-600 leading-relaxed max-w-xl">{description}</p>
          </div>
        </div>
        <Link
          href={portalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'primary' }), 'shrink-0 inline-flex items-center gap-2')}
        >
          {ctaLabel}
          <ExternalLink className="w-4 h-4" aria-hidden />
        </Link>
      </div>
    </FadeIn>
  );
}
