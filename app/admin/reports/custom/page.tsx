'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Calendar, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/blocks/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChartCard } from '@/components/admin/blocks/chart-card';
import { DateRangePicker, DEFAULT_RANGE, type DateRange } from '@/components/admin/blocks/date-range-picker';
import { data } from '@/lib/admin/api';
import { fmtMoney, fmtNum, downloadCSV } from '@/lib/admin/utils';

const METRIC_SETS: Record<string, { label: string; money: boolean; keys: string[]; color?: string }> = {
  revenue: { label: 'Revenue (GGR)', money: true, keys: ['revenue'] },
  ggrngr: { label: 'GGR vs NGR', money: true, keys: ['ggr', 'ngr'] },
  flows: { label: 'Deposits vs Withdrawals', money: true, keys: ['deposits', 'withdrawals'] },
  players: { label: 'Players', money: false, keys: ['newPlayers', 'activePlayers'] },
  betting: { label: 'Betting', money: false, keys: ['bets'] },
  profit: { label: 'Profit & Loss', money: true, keys: ['profit', 'ngr'] },
};

export default function CustomAnalyticsPage() {
  const [range, setRange] = React.useState<DateRange>(DEFAULT_RANGE);
  const [metric, setMetric] = React.useState('revenue');
  const [granularity, setGranularity] = React.useState('daily');

  const days = range.preset === '7d' ? 7 : range.preset === '90d' ? 90 : range.preset === 'today' ? 1 : range.preset === 'ytd' ? 90 : 30;
  const slice = data.daily.slice(-Math.max(2, days));
  const set = METRIC_SETS[metric];

  const chartData = slice.map(d => {
    const o: Record<string, unknown> = { label: d.label, date: d.date };
    set.keys.forEach(k => { o[k] = Number(d[k as keyof typeof d]); });
    return o;
  });
  const aggregate = (key: string) => slice.reduce((a, d) => a + Number(d[key as keyof typeof d]), 0);

  const handleExport = (kind: 'csv' | 'pdf') => {
    if (kind === 'csv') {
      downloadCSV(
        `report-${metric}-${range.preset}`,
        [{ key: 'date', label: 'Date' }, ...set.keys.map(k => ({ key: k, label: k }))],
        chartData
      );
      toast.success(`Exported ${chartData.length} rows to CSV`);
    } else {
      toast.info('PDF export queued — you will be notified when it is ready', { description: 'Connects to the reporting service in production.' });
    }
  };

  return (
    <div>
      <PageHeader
        title="Custom Analytics"
        description="Compose a report across any metric and date range, then export to CSV or PDF."
        actions={
          <>
            <DateRangePicker value={range} onChange={setRange} />
            <Button variant="secondary" onClick={() => handleExport('csv')}><Download className="h-3.5 w-3.5" /> CSV</Button>
            <Button onClick={() => handleExport('pdf')}><FileText className="h-3.5 w-3.5" /> PDF</Button>
          </>
        }
      />

      {/* controls */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-4 flex flex-wrap items-center gap-2 rounded-adm-lg border border-adm-line bg-adm-card p-3 shadow-adm">
        <span className="flex items-center gap-1.5 text-xs font-medium text-adm-dim"><BarChart3 className="h-3.5 w-3.5" /> Metric</span>
        <Select value={metric} onValueChange={setMetric}>
          <SelectTrigger className="h-9 w-[210px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {Object.entries(METRIC_SETS).map(([k, v]) => <SelectItem key={k} value={k}>{v.label}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={granularity} onValueChange={setGranularity}>
          <SelectTrigger className="h-9 w-[130px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant="neutral"><Calendar className="h-3 w-3" /> {range.label}</Badge>
          <Badge variant="default">{granularity}</Badge>
        </div>
      </motion.div>

      {/* summary strip */}
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {set.keys.map((k, i) => (
          <motion.div key={k} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="rounded-adm-lg border border-adm-line bg-adm-card p-4 shadow-adm">
            <div className="text-[11px] font-medium uppercase tracking-[.08em] text-adm-dim">{k} · total</div>
            <div className="tnum mt-1.5 text-xl font-bold text-adm-text">{set.money ? fmtMoney(aggregate(k), 'USD', true) : fmtNum(aggregate(k))}</div>
          </motion.div>
        ))}
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="rounded-adm-lg border border-adm-line bg-adm-card p-4 shadow-adm">
          <div className="text-[11px] font-medium uppercase tracking-[.08em] text-adm-dim">Data points</div>
          <div className="tnum mt-1.5 text-xl font-bold text-adm-text">{chartData.length}</div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="rounded-adm-lg border border-adm-line bg-adm-card p-4 shadow-adm">
          <div className="text-[11px] font-medium uppercase tracking-[.08em] text-adm-dim">Avg / day</div>
          <div className="tnum mt-1.5 text-xl font-bold text-adm-text">
            {set.money ? fmtMoney(aggregate(set.keys[0]) / chartData.length, 'USD', true) : fmtNum(Math.round(aggregate(set.keys[0]) / chartData.length))}
          </div>
        </motion.div>
      </div>

      <ChartCard
        spec={{ kind: set.keys.length > 1 ? 'bars' : 'area', title: `${set.label} — ${range.label}`, description: `${granularity} granularity · ${chartData.length} points`, money: set.money, height: 320, data: chartData }}
      />

      <Card className="mt-4">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <div><CardTitle>Data table</CardTitle><CardDescription className="mt-0.5">Preview of the exported dataset</CardDescription></div>
          <Button size="sm" variant="secondary" onClick={() => handleExport('csv')}><Download className="h-3.5 w-3.5" /> Export</Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="max-h-[360px] overflow-auto">
            <table className="w-full text-[13px]">
              <thead className="sticky top-0">
                <tr>
                  <th className="h-9 border-b border-adm-line bg-adm-inset px-4 text-left text-[10.5px] font-semibold uppercase tracking-[.08em] text-adm-dim">Date</th>
                  {set.keys.map(k => <th key={k} className="h-9 border-b border-adm-line bg-adm-inset px-4 text-right text-[10.5px] font-semibold uppercase tracking-[.08em] text-adm-dim">{k}</th>)}
                </tr>
              </thead>
              <tbody>
                {[...chartData].reverse().map(r => (
                  <tr key={String(r.date)} className="adm-row-hover">
                    <td className="border-b border-adm-line/60 px-4 py-2 font-mono text-xs text-adm-muted">{String(r.date)}</td>
                    {set.keys.map(k => (
                      <td key={k} className="tnum border-b border-adm-line/60 px-4 py-2 text-right font-medium text-adm-text">
                        {set.money ? fmtMoney(Number(r[k]), 'USD', true) : fmtNum(Number(r[k]))}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
