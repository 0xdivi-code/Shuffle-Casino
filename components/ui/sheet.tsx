'use client';
import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/admin/utils';

/** Right-hand drawer built on Radix Dialog — used for detail panels. */
const Drawer = DialogPrimitive.Root;
const DrawerTrigger = DialogPrimitive.Trigger;
const DrawerClose = DialogPrimitive.Close;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { width?: string }
>(({ className, children, width = 'max-w-[480px]', ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-[78] bg-black/60 backdrop-blur-[2px] animate-fade-in" />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed inset-y-0 right-0 z-[79] flex w-full flex-col border-l border-adm-line2 bg-adm-panel shadow-adm-lg animate-drawer-in',
        width,
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-3.5 top-3.5 z-10 rounded-md p-1 text-adm-dim transition-colors hover:bg-white/[.06] hover:text-adm-text adm-focus">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DrawerContent.displayName = 'DrawerContent';

export { Drawer, DrawerTrigger, DrawerClose, DrawerContent };
