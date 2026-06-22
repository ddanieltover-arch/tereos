
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';

interface IrBackLinkProps {
  href: string;
  label: string;
}

export function IrBackLink({ href, label }: IrBackLinkProps) {
  return (
    <FadeIn>
      <Link
        href={href}
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-primary transition-colors mb-10"
      >
        <ArrowLeft className="w-4 h-4" />
        {label}
      </Link>
    </FadeIn>
  );
}
