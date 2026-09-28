'use client';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, Legend,
} from 'recharts';
import { fmtNum, fmtMoney } from '@/lib/admin/utils';

export const CHART_COLORS = ['#8b5cf6', '#f2b93b', '#34d399', '#4da3ff', '#f4587a', '#22d3ee', '#fb923c', '#a3e635'];

const gridStroke = 'rgba(138,147,171,.10)';
const axisTick = { fill: '#5b6478', fontSize: 11 };

export function ChartTooltip({ active, payload, label, money }: {
  active?: boolean; payload?: Array<{ name?: string; value?: number | string; color?: string }>; label?: string | number; money?: boolean;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-adm border border-adm-line2 bg-adm-card2/95 px-3 py-2 shadow-adm-lg backdrop-blur">
      <div className="mb-1.5 text-[11px] font-medium text-adm-dim">{label}</div>
      <div className="space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-adm-muted">
              <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
              {p.name}
            </span>
            <span className="tnum font-semibold text-adm-text">
              {money ? fmtMoney(Number(p.value ?? 0), 'USD', true) : fmtNum(Number(p.value ?? 0))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RevenueAreaChart({ data, height = 260, money = true }: { data: Array<Record<string, unknown>>; height?: number; money?: boolean }) {
  const keys = Object.keys(data[0] || {}).filter(k => k !== 'label' && k !== 'date');
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <defs>
          {keys.map((k, i) => (
            <linearGradient key={k} id={`grad-${k}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_COLORS[i % CHART_COLORS.length]} stopOpacity={0.28} />
              <stop offset="100%" stopColor={CHART_COLORS[i % CHART_COLORS.length]} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid stroke={gridStroke} vertical={false} />
        <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} minTickGap={28} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} width={46} tickFormatter={(v: number) => fmtNum(v, true)} />
        <ReTooltip content={<ChartTooltip money={money} />} cursor={{ stroke: 'rgba(139,92,246,.35)', strokeDasharray: '3 3' }} />
        {keys.length > 1 && <Legend wrapperStyle={{ fontSize: 11, color: '#8a93ab' }} iconType="circle" iconSize={7} />}
        {keys.map((k, i) => (
          <Area key={k} type="monotone" dataKey={k} name={String(k)} stroke={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2}
            fill={`url(#grad-${k})`} activeDot={{ r: 3.5, strokeWidth: 0 }} />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DualBarChart({ data, height = 260, money = true }: { data: Array<Record<string, unknown>>; height?: number; money?: boolean }) {
  const keys = Object.keys(data[0] || {}).filter(k => k !== 'label' && k !== 'date');
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }} barGap={2}>
        <CartesianGrid stroke={gridStroke} vertical={false} />
        <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} minTickGap={28} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} width={46} tickFormatter={(v: number) => fmtNum(v, true)} />
        <ReTooltip content={<ChartTooltip money={money} />} cursor={{ fill: 'rgba(255,255,255,.03)' }} />
        {keys.length > 1 && <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={7} />}
        {keys.map((k, i) => (
          <Bar key={k} dataKey={k} name={String(k)} fill={CHART_COLORS[i % CHART_COLORS.length]} radius={[4, 4, 0, 0]} maxBarSize={18} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function StackedBarChart({ data, height = 260, money = true }: { data: Array<Record<string, unknown>>; height?: number; money?: boolean }) {
  const keys = Object.keys(data[0] || {}).filter(k => k !== 'label' && k !== 'date');
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={gridStroke} vertical={false} />
        <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} minTickGap={28} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} width={46} tickFormatter={(v: number) => fmtNum(v, true)} />
        <ReTooltip content={<ChartTooltip money={money} />} cursor={{ fill: 'rgba(255,255,255,.03)' }} />
        <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={7} />
        {keys.map((k, i) => (
          <Bar key={k} dataKey={k} name={String(k)} stackId="a" fill={CHART_COLORS[i % CHART_COLORS.length]} radius={i === keys.length - 1 ? [4, 4, 0, 0] : 0} maxBarSize={22} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SimpleLineChart({ data, height = 220, money = false }: { data: Array<Record<string, unknown>>; height?: number; money?: boolean }) {
  const keys = Object.keys(data[0] || {}).filter(k => k !== 'label' && k !== 'date');
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
        <CartesianGrid stroke={gridStroke} vertical={false} />
        <XAxis dataKey="label" tick={axisTick} axisLine={false} tickLine={false} minTickGap={28} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} width={46} tickFormatter={(v: number) => fmtNum(v, true)} />
        <ReTooltip content={<ChartTooltip money={money} />} cursor={{ stroke: 'rgba(139,92,246,.35)', strokeDasharray: '3 3' }} />
        {keys.length > 1 && <Legend wrapperStyle={{ fontSize: 11 }} iconType="circle" iconSize={7} />}
        {keys.map((k, i) => (
          <Line key={k} type="monotone" dataKey={k} name={String(k)} stroke={CHART_COLORS[i % CHART_COLORS.length]} strokeWidth={2} dot={false} activeDot={{ r: 3.5, strokeWidth: 0 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({ data, height = 240, money = false, centerLabel }: {
  data: Array<{ name: string; value: number }>; height?: number; money?: boolean; centerLabel?: string;
}) {
  const total = data.reduce((a, b) => a + b.value, 0);
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <ReTooltip content={<ChartTooltip money={money} />} />
          <Pie data={data} dataKey="value" nameKey="name" innerRadius="68%" outerRadius="92%" paddingAngle={3} strokeWidth={0}>
            {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {centerLabel && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-[10px] font-medium uppercase tracking-wider text-adm-dim">{centerLabel}</div>
          <div className="tnum text-lg font-bold text-adm-text">{money ? fmtMoney(total, 'USD', true) : fmtNum(total)}</div>
        </div>
      )}
      <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {data.slice(0, 8).map((d, i) => (
          <div key={d.name} className="flex items-center justify-between gap-2 text-xs">
            <span className="flex min-w-0 items-center gap-1.5 text-adm-muted">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
              <span className="truncate">{d.name}</span>
            </span>
            <span className="tnum shrink-0 font-medium text-adm-text">{((d.value / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Tiny sparkline used inside KPI cards. */
export function Sparkline({ data, color = '#8b5cf6', height = 36, id }: { data: number[]; color?: string; height?: number; id: string }) {
  const d = data.map((v, i) => ({ i, v }));
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={d} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.6} fill={`url(#spark-${id})`} dot={false} isAnimationActive={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/** Horizontal bar list — top games / providers style ranking. */
export function RankBars({ items, money = false }: { items: Array<{ name: string; sub?: string; value: number; image?: string }>; money?: boolean }) {
  const max = Math.max(...items.map(i => i.value), 1);
  return (
    <div className="space-y-3">
      {items.map((it, idx) => (
        <div key={it.name} className="group">
          <div className="mb-1 flex items-center justify-between gap-2 text-xs">
            <span className="flex min-w-0 items-center gap-2 text-adm-text">
              <span className="w-4 shrink-0 text-right font-mono text-[10px] text-adm-dim">{idx + 1}</span>
              {it.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={it.image} alt="" className="h-6 w-6 shrink-0 rounded-md object-cover ring-1 ring-white/10" loading="lazy" />
              ) : null}
              <span className="truncate font-medium">{it.name}</span>
              {it.sub && <span className="hidden truncate text-adm-dim sm:inline">{it.sub}</span>}
            </span>
            <span className="tnum shrink-0 font-semibold text-adm-text">{money ? fmtMoney(it.value, 'USD', true) : fmtNum(it.value)}</span>
          </div>
          <div className="ml-6 h-1.5 overflow-hidden rounded-full bg-white/[.05]">
            <div className="h-full rounded-full bg-gradient-to-r from-adm-brand to-adm-brand2/70 transition-all duration-500 group-hover:brightness-125" style={{ width: `${(it.value / max) * 100}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
