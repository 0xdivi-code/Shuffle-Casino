'use client';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { Sparkline } from '../charts';
import { cn, fmtDelta } from '@/lib/admin/utils';

export interface StatSpec {
  label: string;
  value: string;
  sub?: string;
  delta?: number; // % vs previous period
  spark?: number[];
  color?: string;
  icon?: LucideIcon;
}

export function StatCard({ stat, index = 0 }: { stat: StatSpec; index?: number }) {
  const up = (stat.delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.3, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-adm-lg border border-adm-line bg-adm-card p-4 shadow-adm transition-colors hover:border-adm-line2 adm-card-highlight"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[.08em] text-adm-dim">
            {stat.icon && <stat.icon className="h-3.5 w-3.5" />}
            <span className="truncate">{stat.label}</span>
          </div>
          <div className="tnum mt-1.5 truncate text-[22px] font-bold leading-7 text-adm-text">{stat.value}</div>
          <div className="mt-1 flex items-center gap-2">
            {stat.delta !== undefined && (
              <span className={cn('inline-flex items-center gap-0.5 text-[11px] font-semibold', up ? 'text-adm-green' : 'text-adm-red')}>
                {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {fmtDelta(stat.delta)}
              </span>
            )}
            {stat.sub && <span className="truncate text-[11px] text-adm-dim">{stat.sub}</span>}
          </div>
        </div>
      </div>
      {stat.spark && stat.spark.length > 1 && (
        <div className="-mx-1 mt-2 opacity-80 transition-opacity group-hover:opacity-100">
          <Sparkline data={stat.spark} color={stat.color || '#8b5cf6'} id={`stat-${stat.label.replace(/\W/g, '')}`} height={34} />
        </div>
      )}
    </motion.div>
  );
}

export function StatSkeleton() {
  return (
    <div className="rounded-adm-lg border border-adm-line bg-adm-card p-4">
      <div className="adm-skeleton h-3 w-24 rounded" />
      <div className="adm-skeleton mt-3 h-7 w-32 rounded" />
      <div className="adm-skeleton mt-2 h-3 w-20 rounded" />
      <div className="adm-skeleton mt-3 h-8 w-full rounded" />
    </div>
  );
}
