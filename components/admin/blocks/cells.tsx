'use client';
import Link from 'next/link';
import { Badge, statusVariant } from '@/components/ui/badge';
import { UserAvatar } from '@/components/ui/avatar';
import { cn, fmtMoney, fmtNum, relTime } from '@/lib/admin/utils';

/* Ready-made cell renderers reused across admin tables. */

export const MoneyCell = ({ v, currency = 'USD', signed = false }: { v: number; currency?: string; signed?: boolean }) => (
  <span className={cn('tnum font-medium', signed ? (v >= 0 ? 'text-adm-green' : 'text-adm-red') : 'text-adm-text')}>
    {signed && v > 0 ? '+' : ''}{fmtMoney(v, currency, true)}
  </span>
);

export const NumCell = ({ v }: { v: number }) => <span className="tnum text-adm-muted">{fmtNum(v)}</span>;

export const StatusCell = ({ v }: { v: string }) => (
  <Badge variant={statusVariant(v)} className="capitalize">{v.replace(/-/g, ' ')}</Badge>
);

export const DateCell = ({ v }: { v: string }) => <span className="text-adm-muted">{relTime(v)}</span>;

export const PlayerCell = ({ name, id, href }: { name: string; id?: string; href?: string }) => {
  const inner = (
    <span className="flex items-center gap-2">
      <UserAvatar name={name} size={7} />
      <span className="min-w-0">
        <span className="block truncate font-medium text-adm-text">{name}</span>
        {id && <span className="block font-mono text-[10px] text-adm-dim">{id}</span>}
      </span>
    </span>
  );
  return href ? <Link href={href} onClick={e => e.stopPropagation()} className="hover:opacity-80">{inner}</Link> : inner;
};

export const TextCell = ({ v, className }: { v: React.ReactNode; className?: string }) => <span className={cn('text-adm-muted', className)}>{v}</span>;

export const IdCell = ({ v }: { v: string }) => <span className="font-mono text-xs text-adm-muted">{v}</span>;

export const DeltaCell = ({ v }: { v: number }) => (
  <span className={cn('tnum text-xs font-semibold', v >= 0 ? 'text-adm-green' : 'text-adm-red')}>
    {v >= 0 ? '+' : ''}{v.toFixed(1)}%
  </span>
);

/** Flaticon-style currency marks (custom SVG, offline-safe). */
export function CurrencyIcon({ currency, size = 16 }: { currency: string; size?: number }) {
  const map: Record<string, { bg: string; fg: string; glyph: string }> = {
    BTC: { bg: '#f7931a', fg: '#fff', glyph: '₿' },
    ETH: { bg: '#627eea', fg: '#fff', glyph: 'Ξ' },
    USDT: { bg: '#26a17b', fg: '#fff', glyph: '₮' },
    LTC: { bg: '#bfbbbb', fg: '#fff', glyph: 'Ł' },
    USD: { bg: '#2f6f4f', fg: '#fff', glyph: '$' },
    EUR: { bg: '#2b4f9e', fg: '#fff', glyph: '€' },
    GBP: { bg: '#7d4e9e', fg: '#fff', glyph: '£' },
  };
  const c = map[currency] || { bg: '#5b6478', fg: '#fff', glyph: currency.slice(0, 1) };
  return (
    <span className="inline-flex shrink-0 items-center justify-center rounded-full font-bold"
      style={{ width: size, height: size, background: c.bg, color: c.fg, fontSize: size * 0.55 }}>
      {c.glyph}
    </span>
  );
}

export function RiskPill({ level, score }: { level?: string; score?: number }) {
  const s = score ?? (level === 'high' ? 85 : level === 'medium' ? 55 : 18);
  const variant = s >= 70 ? 'red' : s >= 40 ? 'amber' : 'green';
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex h-1.5 w-12 overflow-hidden rounded-full bg-white/[.07]">
        <span className={cn('h-full rounded-full', s >= 70 ? 'bg-adm-red' : s >= 40 ? 'bg-adm-amber' : 'bg-adm-green')} style={{ width: `${s}%` }} />
      </span>
      <Badge variant={variant} className="tnum">{level ?? s}</Badge>
    </span>
  );
}
