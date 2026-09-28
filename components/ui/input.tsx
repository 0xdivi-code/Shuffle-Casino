import * as React from 'react';
import { cn } from '@/lib/admin/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn(
      'flex h-9 w-full rounded-adm border border-adm-line bg-adm-inset px-3 py-1 text-[13px] text-adm-text placeholder:text-adm-dim transition-colors adm-focus disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
));
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      'flex min-h-[72px] w-full rounded-adm border border-adm-line bg-adm-inset px-3 py-2 text-[13px] text-adm-text placeholder:text-adm-dim transition-colors adm-focus disabled:opacity-50',
      className
    )}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn('text-xs font-medium text-adm-muted', className)} {...props} />
  )
);
Label.displayName = 'Label';

export { Input, Textarea, Label };
