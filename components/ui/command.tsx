'use client';
import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import { cn } from '@/lib/admin/utils';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive ref={ref} className={cn('flex h-full w-full flex-col overflow-hidden rounded-adm-lg bg-adm-card text-adm-text', className)} {...props} />
));
Command.displayName = 'Command';

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center gap-2.5 border-b border-adm-line px-3.5" cmdk-input-wrapper="">
    <Search className="h-4 w-4 shrink-0 text-adm-dim" />
    <CommandPrimitive.Input
      ref={ref}
      className={cn('flex h-11 w-full bg-transparent text-[13.5px] text-adm-text outline-none placeholder:text-adm-dim disabled:opacity-50', className)}
      {...props}
    />
  </div>
));
CommandInput.displayName = 'CommandInput';

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={cn('overflow-y-auto overflow-x-hidden p-2', className)} {...props} />
));
CommandList.displayName = 'CommandList';

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => <CommandPrimitive.Empty ref={ref} className="py-8 text-center text-[13px] text-adm-dim" {...props} />);
CommandEmpty.displayName = 'CommandEmpty';

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn('overflow-hidden p-1 text-adm-text [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-adm-dim', className)}
    {...props}
  />
));
CommandGroup.displayName = 'CommandGroup';

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex cursor-pointer select-none items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-adm-muted outline-none data-[selected=true]:bg-white/[.06] data-[selected=true]:text-adm-text [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-adm-dim data-[selected=true]:[&_svg]:text-adm-brand2',
      className
    )}
    {...props}
  />
));
CommandItem.displayName = 'CommandItem';

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-adm-line', className)} {...props} />
));
CommandSeparator.displayName = 'CommandSeparator';

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn('ml-auto text-[10px] tracking-widest text-adm-dim', className)} {...props} />
);

export { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator, CommandShortcut };
