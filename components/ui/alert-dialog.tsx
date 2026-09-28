'use client';
import * as React from 'react';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';
import { cn } from '@/lib/admin/utils';
import { buttonVariants } from './button';

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay ref={ref} className={cn('fixed inset-0 z-[80] bg-black/65 backdrop-blur-[3px] animate-fade-in', className)} {...props} />
));
AlertDialogOverlay.displayName = 'AlertDialogOverlay';

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={cn('fixed left-1/2 top-1/2 z-[81] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-adm-lg border border-adm-line2 bg-adm-card p-5 shadow-adm-lg animate-scale-in', className)}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = 'AlertDialogContent';

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1.5', className)} {...props} />
);
const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('mt-5 flex items-center justify-end gap-2', className)} {...props} />
);
const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title ref={ref} className={cn('text-[15px] font-semibold text-adm-text', className)} {...props} />
));
AlertDialogTitle.displayName = 'AlertDialogTitle';
const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description ref={ref} className={cn('text-[13px] leading-relaxed text-adm-muted', className)} {...props} />
));
AlertDialogDescription.displayName = 'AlertDialogDescription';

const AlertDialogAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => <button ref={ref} className={cn(buttonVariants(), className)} {...props} />
);
AlertDialogAction.displayName = 'AlertDialogAction';
const AlertDialogCancel = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => <button ref={ref} className={cn(buttonVariants({ variant: 'secondary' }), className)} {...props} />
);
AlertDialogCancel.displayName = 'AlertDialogCancel';

export {
  AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter,
  AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel,
};
