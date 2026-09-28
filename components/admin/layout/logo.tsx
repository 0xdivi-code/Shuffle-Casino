import { cn } from '@/lib/admin/utils';

/**
 * Admin branding — uses the same logo assets as the player-facing frontend
 * (`public/icons/logo-small.svg` mark, `public/icons/logo.svg` full wordmark).
 */
export function AdminLogo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/logo-small.svg"
        alt="Shuffle"
        className="h-8 w-8 shrink-0 drop-shadow-[0_4px_14px_rgba(139,92,246,.45)]"
        draggable={false}
      />
      {!collapsed && (
        <span className="flex flex-col leading-none">
          <span className="text-[14px] font-bold tracking-tight text-adm-text">Shuffle</span>
          <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[.18em] text-adm-gold">Operator Console</span>
        </span>
      )}
    </span>
  );
}

export function AdminLogoFull({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/logo-small.svg"
        alt="Shuffle"
        className="h-10 w-10 drop-shadow-[0_6px_18px_rgba(139,92,246,.5)]"
        draggable={false}
      />
      <span className="flex flex-col leading-none">
        <span className="text-[16px] font-bold tracking-tight text-adm-text">Shuffle Admin</span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[.18em] text-adm-gold">Operator Console</span>
      </span>
    </div>
  );
}
