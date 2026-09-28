'use client';
import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/admin/utils';

const TooltipProvider = ({ children, delayDuration = 200 }: { children: React.ReactNode; delayDuration?: number }) => (
  <TooltipPrimitive.Provider delayDuration={delayDuration}>{children}</TooltipPrimitive.Provider>
);
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn('z-[90] overflow-hidden rounded-md border border-adm-line2 bg-adm-card2 px-2.5 py-1.5 text-xs text-adm-text shadow-adm-lg animate-fade-in', className)}
    {...props}
  />
));
TooltipContent.displayName = 'TooltipContent';

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
