import { cn } from '@/lib/admin/utils';

/**
 * Admin branding — uses the official Shuffle wordmark from shuffle.com
 * (same image the player-facing frontend renders in its header), with an
 * offline fallback to the bundled copy at /icons/logo.svg.
 */
export function AdminLogo({ collapsed = false }: { collapsed?: boolean }) {
  if (collapsed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="/icons/logo-small.svg"
        alt="Shuffle"
        className="h-8 w-8 shrink-0 drop-shadow-[0_4px_14px_rgba(139,92,246,.45)]"
        draggable={false}
      />
    );
  }
  return (
    <span className="flex min-w-0 flex-col gap-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://shuffle.com/icons/logo.svg"
        alt="Shuffle"
        className="h-[22px] w-auto shrink-0"
        draggable={false}
        onError={e => {
          const t = e.currentTarget;
          if (!t.src.includes('/icons/logo.svg')) t.src = '/icons/logo.svg';
        }}
      />
      <span className="text-[8.5px] font-semibold uppercase tracking-[.22em] text-adm-gold">
        Operator Console
      </span>
    </span>
  );
}

export function AdminLogoFull({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://shuffle.com/icons/logo.svg"
        alt="Shuffle"
        className="h-[28px] w-auto drop-shadow-[0_6px_18px_rgba(139,92,246,.4)]"
        draggable={false}
        onError={e => {
          const t = e.currentTarget;
          if (!t.src.includes('/icons/logo.svg')) t.src = '/icons/logo.svg';
        }}
      />
      <span className="text-[9px] font-semibold uppercase tracking-[.22em] text-adm-gold">
        Operator Console
      </span>
    </div>
  );
}
