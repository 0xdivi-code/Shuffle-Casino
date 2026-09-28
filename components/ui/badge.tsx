import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/admin/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-4 whitespace-nowrap [&_svg]:size-3',
  {
    variants: {
      variant: {
        default: 'bg-adm-brandsoft text-adm-brand2 border border-adm-brand/25',
        gold: 'bg-adm-goldsoft text-adm-gold border border-adm-gold/25',
        green: 'bg-adm-greensoft text-adm-green border border-adm-green/25',
        red: 'bg-adm-redsoft text-adm-red border border-adm-red/25',
        amber: 'bg-adm-ambersoft text-adm-amber border border-adm-amber/25',
        blue: 'bg-adm-bluesoft text-adm-blue border border-adm-blue/25',
        neutral: 'bg-white/[.05] text-adm-muted border border-white/[.07]',
        outline: 'text-adm-muted border border-adm-line2',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}
function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

/** Map a semantic status string to a badge variant. */
export function statusVariant(status: string): BadgeProps['variant'] {
  const s = status.toLowerCase();
  if (['completed', 'active', 'verified', 'enabled', 'success', 'approved', 'settled', 'connected', 'live', 'running', 'published', 'win', 'resolved', 'paid', 'safe', 'low'].includes(s)) return 'green';
  if (['pending', 'scheduled', 'investigating', 'paused', 'processing', 'unsubmitted', 'draft', 'invited', 'escalated', 'medium', 'warming'].includes(s)) return 'amber';
  if (['failed', 'rejected', 'banned', 'suspended', 'disabled', 'overdue', 'revoked', 'denied', 'error', 'critical', 'high', 'suspicious', 'chargeback', 'self-excluded', 'disconnected', 'reversed', 'loss'].includes(s)) return 'red';
  if (['info', 'dormant', 'cancelled', 'false-positive', 'finished', 'ended', 'expired', 'maintenance'].includes(s)) return 'neutral';
  return 'default';
}

export { Badge, badgeVariants };
