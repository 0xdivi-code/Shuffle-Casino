'use client';
import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => (
  <Sonner
    theme="dark"
    position="bottom-right"
    offset={20}
    gap={8}
    toastOptions={{
      unstyled: false,
      classNames: {
        toast: 'font-admin !bg-adm-card2 !border-adm-line2 !text-adm-text !text-[13px] !rounded-adm !shadow-adm-lg',
        title: '!font-medium',
        description: '!text-adm-muted !text-xs',
        actionButton: '!bg-adm-brand !text-white !rounded-lg',
        success: '[&>[data-icon]]:text-adm-green',
        error: '[&>[data-icon]]:text-adm-red',
        warning: '[&>[data-icon]]:text-adm-amber',
        info: '[&>[data-icon]]:text-adm-blue',
      },
    }}
    {...props}
  />
);

export { Toaster };
