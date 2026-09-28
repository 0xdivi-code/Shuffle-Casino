import { cn } from '@/lib/admin/utils';

export function AdminLogo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-adm bg-gradient-to-br from-adm-brand to-[#5b2ed6] shadow-[0_4px_14px_-2px_rgba(139,92,246,.5)]">
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-adm-gold ring-2 ring-adm-panel" />
      </span>
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
      <span className="flex h-10 w-10 items-center justify-center rounded-adm bg-gradient-to-br from-adm-brand to-[#5b2ed6] shadow-adm-glow">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <circle cx="8.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="8.5" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="15.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[16px] font-bold tracking-tight text-adm-text">Shuffle Admin</span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-[.18em] text-adm-gold">Operator Console</span>
      </span>
    </div>
  );
}
