import * as React from 'react';
import { cn } from '@/lib/admin/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('adm-skeleton rounded-md', className)} {...props} />;
}

const Separator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { orientation?: 'horizontal' | 'vertical' }>(
  ({ className, orientation = 'horizontal', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('shrink-0 bg-adm-line', orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', className)}
      {...props}
    />
  )
);
Separator.displayName = 'Separator';

export { Skeleton, Separator };
