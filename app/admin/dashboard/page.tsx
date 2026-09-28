'use client';
import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Users, UserPlus, ArrowDownToLine, ArrowUpFromLine, TrendingUp, LineChart as LineChartIcon,
  Dice5, Gauge, Percent, Repeat, Dices, Wallet, ArrowRight,
} from 'lucide-react';
import { PageHeader } from '@/components/admin/blocks/page-header';
import { StatCard, StatSkeleton, type StatSpec } from '@/components/admin/blocks/stat-card';
import { ChartCard, ChartSkeleton } from '@/components/admin/blocks/chart-card';
import { LiveFeed, useLiveFeed } from '@/components/admin/blocks/live-feed';
import { DateRangePicker, DEFAULT_RANGE, type DateRange } from '@/components/admin/blocks/date-range-picker';
import { data } from '@/lib/admin/api';
import { fmtMoney, fmtNum, fmtPct } from '@/lib/admin/utils';
import { Button } from '@/components/ui/button';

const D = data.daily;
const sum = (k: keyof (typeof D)[0], from: number) => D.slice(from).reduce((a, d) => a + Number(d[k]), 0);
const spark = (k: keyof (typeof D)[0], n = 16) => D.slice(-n).map(d => Number(d[k]));
const deltaOf = (k: keyof (typeof D)[0], days: number) => {
  const cur = sum(k, -days);
  const prev = D.slice(-2 * days, -days).reduce((a, d) => a + Number(d[k]), 0);
  return prev ? ((cur - prev) / prev) * 100 : 0;
};

export default function DashboardOverview() {
  const [range, setRange] = React.useState<DateRange>(DEFAULT_RANGE);
  const [stats, setStats] = React.useState<StatSpec[] | null>(null);
  const { events } = useLiveFeed(data.initialFeed);
  const days = range.preset === '7d' ? 7 : range.preset === '90d' ? 90 : range.preset === 'today' ? 1 : 30;
  const n = Math.max(2, days);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setStats([
        { label: 'Total players', value: fmtNum(96412), delta: 3.8, sub: 'all time', icon: Users },
        { label: 'Active players', value: fmtNum(sum('activePlayers', -n) / n), delta: deltaOf('activePlayers', Math.min(n, 30)), spark: spark('activePlayers'), icon: Users, color: '#34d399' },
        { label: 'New registrations', value: fmtNum(sum('newPlayers', -n)), delta: deltaOf('newPlayers', Math.min(n, 30)), spark: spark('newPlayers'), icon: UserPlus, color: '#4da3ff' },
        { label: 'Deposits', value: fmtMoney(sum('deposits', -n), 'USD', true), delta: deltaOf('deposits', Math.min(n, 30)), spark: spark('deposits'), icon: ArrowDownToLine, color: '#34d399' },
        { label: 'Withdrawals', value: fmtMoney(sum('withdrawals', -n), 'USD', true), delta: deltaOf('withdrawals', Math.min(n, 30)), spark: spark('withdrawals'), icon: ArrowUpFromLine, color: '#fbbf24' },
        { label: 'GGR', value: fmtMoney(sum('ggr', -n), 'USD', true), delta: deltaOf('ggr', Math.min(n, 30)), spark: spark('ggr'), icon: TrendingUp },
        { label: 'NGR', value: fmtMoney(sum('ngr', -n), 'USD', true), delta: deltaOf('ngr', Math.min(n, 30)), spark: spark('ngr'), icon: LineChartIcon },
        { label: 'Net profit', value: fmtMoney(sum('profit', -n), 'USD', true), delta: deltaOf('profit', Math.min(n, 30)), spark: spark('profit'), icon: Wallet, color: '#f2b93b' },
        { label: 'Total bets', value: fmtNum(sum('bets', -n)), delta: deltaOf('bets', Math.min(n, 30)), spark: spark('bets'), icon: Dice5 },
        { label: 'Average bet', value: '$12.86', delta: 1.2, sub: 'per round', icon: Gauge },
        { label: 'Conversion rate', value: fmtPct(31.4), delta: 2.1, sub: 'registration → FTD', icon: Percent, color: '#34d399' },
        { label: 'Player retention', value: fmtPct(46.8), delta: -1.4, sub: 'D30 retention', icon: Repeat, color: '#f4587a' },
        { label: 'Active games', value: fmtNum(data.adminGames.filter(g => g.status === 'active').length * 112), delta: 2.4, sub: 'live in lobby', icon: Dices },
      ]);
    }, 480);
    return () => clearTimeout(t);
  }, [n]);

  const topGames = [...data.adminGames].sort((a, b) => b.ggr7d - a.ggr7d).slice(0, 7);
  const topProviders = [...data.providers].sort((a, b) => b.ggr30d - a.ggr30d).slice(0, 7);
  const chartDays = n > 31 ? 90 : 30;
  const cd = D.slice(-chartDays);

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Live snapshot of platform performance across casino, sportsbook and payments."
        actions={
          <>
            <DateRangePicker value={range} onChange={setRange} />
            <Link href="/admin/reports/custom"><Button variant="secondary">Full reports <ArrowRight className="h-3.5 w-3.5" /></Button></Link>
          </>
        }
      />

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {stats === null
          ? Array.from({ length: 10 }).map((_, i) => <StatSkeleton key={i} />)
          : stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      {/* charts + live feed */}
      <div className="mt-5 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          {stats === null ? (
            <ChartSkeleton height={340} />
          ) : (
            <ChartCard
              index={0}
              spec={{ kind: 'area', title: 'Revenue over time', description: `GGR · last ${chartDays} days`, money: true, height: 280, data: cd.map(d => ({ label: d.label, revenue: d.revenue })) }}
            />
          )}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {stats === null ? (
              <>
                <ChartSkeleton height={300} />
                <ChartSkeleton height={300} />
              </>
            ) : (
              <>
                <ChartCard index={1} spec={{ kind: 'bars', title: 'Deposits vs withdrawals', description: 'Daily flows', money: true, height: 240, data: cd.map(d => ({ label: d.label, deposits: d.deposits, withdrawals: d.withdrawals })) }} />
                <ChartCard index={2} spec={{ kind: 'area', title: 'GGR / NGR', description: 'Net after deductions', money: true, height: 240, data: cd.map(d => ({ label: d.label, GGR: d.ggr, NGR: d.ngr })) }} />
                <ChartCard index={3} spec={{ kind: 'line', title: 'New vs active players', description: 'Daily engagement', height: 240, data: cd.map(d => ({ label: d.label, newPlayers: d.newPlayers, activePlayers: d.activePlayers })) }} />
                <ChartCard index={4} spec={{ kind: 'area', title: 'Betting volume', description: 'Rounds settled per day', money: true, height: 240, data: cd.map(d => ({ label: d.label, betVolume: d.betVolume })) }} />
              </>
            )}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {stats === null ? (
              <>
                <ChartSkeleton height={300} />
                <ChartSkeleton height={300} />
              </>
            ) : (
              <>
                <ChartCard index={5} spec={{ kind: 'rank', title: 'Top games by GGR (7d)', money: true, rankItems: topGames.map(g => ({ name: g.title, sub: g.provider, value: g.ggr7d, image: g.image })) }} />
                <ChartCard index={6} spec={{ kind: 'rank', title: 'Top providers by GGR (30d)', money: true, rankItems: topProviders.map(p => ({ name: p.name, sub: `${p.games} games`, value: p.ggr30d })) }} />
              </>
            )}
          </div>
        </div>

        {/* right rail: live feed */}
        <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15, duration: 0.4 }} className="xl:sticky xl:top-[72px] xl:h-[calc(100vh-140px)]">
          <LiveFeed events={events} className="h-[540px] xl:h-full" />
        </motion.div>
      </div>
    </div>
  );
}
