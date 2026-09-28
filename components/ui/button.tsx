'use client';
import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/admin/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-adm text-[13px] font-medium transition-all duration-150 adm-focus disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-adm-brand text-white hover:bg-adm-brand/85 shadow-[0_4px_16px_-4px_rgba(139,92,246,.5)]',
        gold: 'bg-gradient-to-b from-[#f7c95c] to-[#e2a422] text-[#241a02] hover:brightness-110 shadow-[0_4px_18px_-4px_rgba(242,185,59,.45)]',
        secondary: 'bg-adm-card2 text-adm-text border border-adm-line hover:border-adm-line2 hover:bg-[#1d2438]',
        ghost: 'text-adm-muted hover:text-adm-text hover:bg-white/[.045]',
        outline: 'border border-adm-line2 text-adm-text hover:bg-white/[.045] hover:border-adm-dim',
        danger: 'bg-adm-red/15 text-adm-red border border-adm-red/30 hover:bg-adm-red/25',
        success: 'bg-adm-green/15 text-adm-green border border-adm-green/30 hover:bg-adm-green/25',
        link: 'text-adm-brand2 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4',
        sm: 'h-8 px-2.5 text-xs rounded-lg',
        lg: 'h-11 px-6 text-sm',
        icon: 'h-9 w-9',
        iconSm: 'h-7 w-7 rounded-lg',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
