'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RevenueAreaChart, DualBarChart, StackedBarChart, SimpleLineChart, DonutChart, RankBars } from '../charts';

export interface ChartSpec {
  kind: 'area' | 'bars' | 'stacked' | 'line' | 'donut' | 'rank';
  title: string;
  description?: string;
  money?: boolean;
  height?: number;
  data?: Array<Record<string, unknown>>;
  donutData?: Array<{ name: string; value: number }>;
  rankItems?: Array<{ name: string; sub?: string; value: number; image?: string }>;
  headerExtra?: React.ReactNode;
}

export function ChartCard({ spec, index = 0, className }: { spec: ChartSpec; index?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + index * 0.05, duration: 0.35 }} className={className}>
      <Card className="h-full">
        <CardHeader className="flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle>{spec.title}</CardTitle>
            {spec.description && <CardDescription className="mt-0.5">{spec.description}</CardDescription>}
          </div>
          {spec.headerExtra}
        </CardHeader>
        <CardContent>
          {spec.kind === 'area' && <RevenueAreaChart data={spec.data || []} money={spec.money} height={spec.height ?? 260} />}
          {spec.kind === 'bars' && <DualBarChart data={spec.data || []} money={spec.money} height={spec.height ?? 260} />}
          {spec.kind === 'stacked' && <StackedBarChart data={spec.data || []} money={spec.money} height={spec.height ?? 260} />}
          {spec.kind === 'line' && <SimpleLineChart data={spec.data || []} money={spec.money} height={spec.height ?? 240} />}
          {spec.kind === 'donut' && <DonutChart data={spec.donutData || []} money={spec.money} height={spec.height ?? 200} centerLabel={spec.description} />}
          {spec.kind === 'rank' && <RankBars items={spec.rankItems || []} money={spec.money} />}
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function ChartSkeleton({ height = 300 }: { height?: number }) {
  return (
    <div className="rounded-adm-lg border border-adm-line bg-adm-card p-4">
      <div className="adm-skeleton h-4 w-40 rounded" />
      <div className="adm-skeleton mt-2 h-3 w-56 rounded" />
      <div className="adm-skeleton mt-4 rounded-md" style={{ height: height - 90 }} />
    </div>
  );
}
