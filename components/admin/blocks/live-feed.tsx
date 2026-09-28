'use client';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, ArrowDownToLine, ArrowUpFromLine, Dice5, Trophy, FileCheck2, ShieldAlert, Server } from 'lucide-react';
import { relTime, fmtMoney, cn } from '@/lib/admin/utils';
import type { FeedEvent } from '@/lib/admin/data/world';

const KIND_META: Record<FeedEvent['kind'], { icon: typeof UserPlus; cls: string }> = {
  registration: { icon: UserPlus, cls: 'bg-adm-bluesoft text-adm-blue' },
  deposit: { icon: ArrowDownToLine, cls: 'bg-adm-greensoft text-adm-green' },
  withdrawal: { icon: ArrowUpFromLine, cls: 'bg-adm-ambersoft text-adm-amber' },
  bet: { icon: Dice5, cls: 'bg-adm-brandsoft text-adm-brand2' },
  win: { icon: Trophy, cls: 'bg-adm-goldsoft text-adm-gold' },
  kyc: { icon: FileCheck2, cls: 'bg-adm-bluesoft text-adm-blue' },
  risk: { icon: ShieldAlert, cls: 'bg-adm-redsoft text-adm-red' },
  system: { icon: Server, cls: 'bg-white/[.06] text-adm-muted' },
};

export function FeedRow({ ev, now }: { ev: FeedEvent; now?: number }) {
  const meta = KIND_META[ev.kind];
  const Icon = meta.icon;
  return (
    <div className="flex items-start gap-3 px-4 py-2.5 transition-colors hover:bg-white/[.02]">
      <span className={cn('mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg', meta.cls)}>
        <Icon className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[12.5px] leading-5 text-adm-text">
          {ev.player && <span className="font-semibold">{ev.player}</span>}{' '}
          <span className={cn(!ev.player && 'text-adm-text', 'text-adm-muted')}>{ev.message}</span>
        </p>
        <div className="mt-0.5 flex items-center gap-2 text-[10.5px] text-adm-dim">
          <span>{relTime(ev.time, now)}</span>
          {ev.amount !== undefined && (
            <span className={cn('tnum font-semibold', ev.kind === 'withdrawal' ? 'text-adm-amber' : 'text-adm-green')}>
              {fmtMoney(ev.amount, ev.currency || 'USD', true)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function LiveFeed({ events, live = true, className }: { events: FeedEvent[]; live?: boolean; className?: string }) {
  // hydration-safe clock: SSR & first client paint use the fixed demo time,
  // then we switch to the real clock after mount for freshly streamed events.
  const [now, setNow] = React.useState<number | undefined>(undefined);
  React.useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={cn('flex h-full flex-col overflow-hidden rounded-adm-lg border border-adm-line bg-adm-card shadow-adm', className)}>
      <div className="flex items-center justify-between border-b border-adm-line px-4 py-2.5">
        <h3 className="text-[13px] font-semibold text-adm-text">Real-time Activity</h3>
        {live && (
          <span className="flex items-center gap-1.5 rounded-full border border-adm-green/25 bg-adm-greensoft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-adm-green">
            <span className="live-dot h-1.5 w-1.5 animate-pulse-dot rounded-full bg-adm-green" /> Live
          </span>
        )}
      </div>
      <div className="flex-1 divide-y divide-adm-line/40 overflow-y-auto">
        <AnimatePresence initial={false}>
          {events.map(ev => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: -10, backgroundColor: 'rgba(139,92,246,.12)' }}
              animate={{ opacity: 1, y: 0, backgroundColor: 'rgba(139,92,246,0)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <FeedRow ev={ev} now={now} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

/** Hook: prepends freshly generated events on an interval to simulate a live stream. */
export function useLiveFeed(initial: FeedEvent[], intervalMs = 3800, max = 30) {
  const [events, setEvents] = React.useState(initial);
  const [paused, setPaused] = React.useState(false);
  React.useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      import('@/lib/admin/data/world').then(w => {
        setEvents(prev => [w.makeFeedEvent(0, Date.now()), ...prev].slice(0, max));
      });
    }, intervalMs);
    return () => clearInterval(t);
  }, [paused, intervalMs, max]);
  return { events, paused, setPaused };
}
