'use client';
import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { cn } from '@/lib/admin/utils';

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-adm-line2 transition-colors adm-focus disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-adm-brand data-[state=unchecked]:bg-adm-card2',
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className="pointer-events-none block h-3.5 w-3.5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-1" />
  </SwitchPrimitives.Root>
));
Switch.displayName = 'Switch';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors adm-focus data-[state=checked]:border-adm-brand data-[state=checked]:bg-adm-brand data-[state=checked]:text-white data-[state=indeterminate]:border-adm-brand data-[state=indeterminate]:bg-adm-brand data-[state=indeterminate]:text-white data-[state=unchecked]:border-adm-line2 data-[state=unchecked]:bg-adm-inset data-[state=unchecked]:hover:border-adm-dim',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {props.checked === 'indeterminate' ? (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14" /></svg>
      ) : (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5"><path d="M20 6 9 17l-5-5" /></svg>
      )}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = 'Checkbox';

export { Switch, Checkbox };
