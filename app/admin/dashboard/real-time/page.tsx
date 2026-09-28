'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Users, Dice5, Wallet, ArrowDownToLine, Pause, Play } from 'lucide-react';
import { PageHeader } from '@/components/admin/blocks/page-header';
import { LiveFeed, useLiveFeed, FeedRow } from '@/components/admin/blocks/live-feed';
import { StatCard, type StatSpec } from '@/components/admin/blocks/stat-card';
import { data } from '@/lib/admin/api';
import { fmtNum, fmtMoney } from '@/lib/admin/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RealTimePage() {
  const { events, paused, setPaused } = useLiveFeed(data.initialFeed, 2600, 40);
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setTick(x => x + 1), 4000);
    return () => clearInterval(t);
  }, []);

  const jitter = (base: number, amt: number) => base + Math.round(Math.sin(tick * 1.7 + amt) * amt * 0.1);
  const stats: StatSpec[] = [
    { label: 'Online now', value: fmtNum(jitter(3214, 400)), delta: 12.8, sub: 'across casino & sports', icon: Users, color: '#34d399' },
    { label: 'Bets / minute', value: fmtNum(jitter(1842, 220)), delta: 9.4, icon: Dice5 },
    { label: 'Deposits / minute', value: fmtNum(jitter(64, 14)), delta: 5.2, icon: ArrowDownToLine, color: '#4da3ff' },
    { label: 'Volume / minute', value: fmtMoney(jitter(84200, 9000), 'USD', true), delta: 6.1, icon: Wallet, color: '#f2b93b' },
  ];

  return (
    <div>
      <PageHeader
        title="Real-time Activity"
        description="Unfiltered stream of registrations, payments, bets and platform events."
        actions={
          <Button variant={paused ? 'default' : 'secondary'} onClick={() => setPaused(!paused)}>
            {paused ? <><Play className="h-3.5 w-3.5" /> Resume stream</> : <><Pause className="h-3.5 w-3.5" /> Pause stream</>}
          </Button>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2">
          <LiveFeed events={events} live={!paused} className="h-[640px]" />
        </motion.div>
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            <Card>
              <CardHeader><CardTitle>Biggest wins (last hour)</CardTitle></CardHeader>
              <CardContent className="space-y-2.5">
                {data.bets.filter(b => b.result === 'win').slice(0, 6).map((b, i) => (
                  <div key={b.id} className="flex items-center justify-between gap-2 rounded-adm bg-adm-inset/60 px-3 py-2 ring-1 ring-white/[.04]">
                    <div className="min-w-0">
                      <div className="truncate text-[12.5px] font-medium text-adm-text">{b.player}</div>
                      <div className="truncate text-[11px] text-adm-dim">{b.game} · {b.multiplier}×</div>
                    </div>
                    <span className="tnum shrink-0 text-[13px] font-bold text-adm-gold">{fmtMoney(b.payout, 'USD', true)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14 }}>
            <Card>
              <CardHeader><CardTitle>System events</CardTitle></CardHeader>
              <CardContent className="p-0">
                {events.filter(e => e.kind === 'system').slice(0, 5).map(ev => <FeedRow key={ev.id} ev={ev} />)}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
