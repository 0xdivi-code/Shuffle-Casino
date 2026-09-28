import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ---------------------------------- seeded RNG ---------------------------------- */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function hashStr(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
export const pick = <T,>(rnd: () => number, arr: readonly T[]) => arr[Math.floor(rnd() * arr.length)];
export const rndInt = (rnd: () => number, min: number, max: number) => Math.floor(rnd() * (max - min + 1)) + min;
export const rndFloat = (rnd: () => number, min: number, max: number, dp = 2) =>
  Number((rnd() * (max - min) + min).toFixed(dp));

/* ---------------------------------- formatters ---------------------------------- */
/** Fixed "now" so mock data and relative timestamps stay deterministic across SSR/CSR. */
export const ADMIN_NOW = new Date('2026-09-28T14:32:00Z').getTime();

export function fmtMoney(v: number, currency = 'USD', compact = false) {
  const sym = { USD: '$', EUR: '€', GBP: '£', BTC: '₿', ETH: 'Ξ', USDT: '₮' }[currency] ?? currency + ' ';
  const abs = Math.abs(v);
  if (compact || abs >= 1_000_000) {
    if (abs >= 1_000_000_000) return (v < 0 ? '-' : '') + sym + (abs / 1_000_000_000).toFixed(2) + 'B';
    if (abs >= 1_000_000) return (v < 0 ? '-' : '') + sym + (abs / 1_000_000).toFixed(2) + 'M';
    if (abs >= 10_000) return (v < 0 ? '-' : '') + sym + (abs / 1_000).toFixed(1) + 'K';
  }
  return (v < 0 ? '-' : '') + sym + abs.toLocaleString('en-US', { minimumFractionDigits: abs < 100 && abs !== 0 ? 2 : 0, maximumFractionDigits: 2 });
}
export function fmtNum(v: number, compact = true) {
  const abs = Math.abs(v);
  if (compact) {
    if (abs >= 1_000_000_000) return (v / 1_000_000_000).toFixed(2) + 'B';
    if (abs >= 1_000_000) return (v / 1_000_000).toFixed(2) + 'M';
    if (abs >= 1_000) return (v / 1_000).toFixed(1) + 'K';
  }
  return v.toLocaleString('en-US');
}
export function fmtPct(v: number, dp = 1) { return `${v >= 0 ? '' : ''}${v.toFixed(dp)}%`; }
export function fmtDelta(v: number) { return `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`; }

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export function fmtDate(d: Date | string | number, withTime = false) {
  const dt = typeof d === 'object' ? d : new Date(d);
  const base = `${MONTHS[dt.getMonth()]} ${dt.getDate()}, ${dt.getFullYear()}`;
  if (!withTime) return base;
  return `${base} · ${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}`;
}
export function fmtTime(d: Date | string | number) {
  const dt = typeof d === 'object' ? d : new Date(d);
  return `${dt.getHours().toString().padStart(2, '0')}:${dt.getMinutes().toString().padStart(2, '0')}:${dt.getSeconds().toString().padStart(2, '0')}`;
}
export function relTime(d: Date | string | number, now: number = ADMIN_NOW) {
  const dt = typeof d === 'object' ? d.getTime() : new Date(d).getTime();
  const s = Math.max(0, Math.floor((now - dt) / 1000));
  if (s < 10) return 'just now';
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const days = Math.floor(h / 24);
  if (days < 30) return `${days}d ago`;
  const mo = Math.floor(days / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}

export function initials(name: string) {
  return name.split(/[\s_.-]+/).filter(Boolean).slice(0, 2).map(p => p[0]!.toUpperCase()).join('');
}

/* ---------------------------------- CSV export ---------------------------------- */
export function downloadCSV(filename: string, columns: { key: string; label: string }[], rows: Record<string, unknown>[]) {
  const esc = (v: unknown) => {
    const s = v == null ? '' : typeof v === 'object' ? JSON.stringify(v) : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [columns.map(c => esc(c.label)).join(','), ...rows.map(r => columns.map(c => esc(r[c.key])).join(','))].join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  document.body.appendChild(a); a.click();
  setTimeout(() => { document.body.removeChild(a); URL.revokeObjectURL(url); }, 500);
}

/* ---------------------------------- misc ---------------------------------- */
export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
export function timeAgoTick(iso: string) { return relTime(iso); }

export function daysAgoISO(days: number, hourJitter = 0, rnd?: () => number) {
  const t = ADMIN_NOW - days * 86400000 - (rnd ? rnd() * hourJitter : hourJitter * Math.random()) * 3600000;
  return new Date(t).toISOString();
}

export const uid = (prefix: string, rnd: () => number, len = 8) => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < len; i++) s += chars[Math.floor(rnd() * chars.length)];
  return `${prefix}${s}`;
};
