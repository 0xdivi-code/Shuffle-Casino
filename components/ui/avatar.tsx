'use client';
import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { cn, initials } from '@/lib/admin/utils';

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root ref={ref} className={cn('relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full', className)} {...props} />
));
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn('aspect-square h-full w-full', className)} {...props} />
));
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback ref={ref} className={cn('flex h-full w-full items-center justify-center rounded-full bg-adm-brandsoft text-[11px] font-semibold text-adm-brand2', className)} {...props} />
));
AvatarFallback.displayName = 'AvatarFallback';

/** Deterministic colored initial avatar used across the admin. */
export function UserAvatar({ name, size = 8, className }: { name: string; size?: number; className?: string }) {
  const hues = [262, 200, 340, 160, 32, 220, 288, 12];
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const hue = hues[h % hues.length];
  return (
    <span
      className={cn('flex shrink-0 items-center justify-center rounded-full font-semibold', className)}
      style={{
        height: size * 4, width: size * 4, fontSize: size * 1.45,
        background: `linear-gradient(135deg, hsl(${hue} 65% 32%), hsl(${(hue + 40) % 360} 60% 24%))`,
        color: `hsl(${hue} 90% 82%)`,
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,.08)',
      }}
    >
      {initials(name)}
    </span>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
