import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5',
        secondary:
          'bg-secondary text-white hover:bg-secondary-dark hover:shadow-lg hover:-translate-y-0.5',
        outline:
          'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
        ghost: 'text-neutral-700 hover:bg-neutral-100 hover:text-primary',
        'ghost-light': 'text-white/90 hover:text-white hover:bg-white/10',
        'outline-light':
          'border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:border-white/40',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };
