'use client';
import * as React from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/admin/utils';

export interface DateRange { preset: string; from: string; to: string; label: string }

const PRESETS = [
  { id: 'today', label: 'Today', days: 1 },
  { id: '7d', label: 'Last 7 days', days: 7 },
  { id: '30d', label: 'Last 30 days', days: 30 },
  { id: '90d', label: 'Last 90 days', days: 90 },
  { id: 'mtd', label: 'Month to date', days: 28 },
  { id: 'ytd', label: 'Year to date', days: 271 },
];

export function DateRangePicker({ value, onChange }: { value: DateRange; onChange: (r: DateRange) => void }) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="h-9 gap-2">
          <Calendar className="h-3.5 w-3.5 text-adm-dim" />
          <span>{value.label}</span>
          <ChevronDown className="h-3 w-3 text-adm-dim" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[280px] p-1.5">
        <div className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-adm-dim">Date range</div>
        {PRESETS.map(p => (
          <button
            key={p.id}
            onClick={() => {
              const to = new Date('2026-09-28'); const from = new Date(to); from.setDate(from.getDate() - p.days + 1);
              onChange({ preset: p.id, from: from.toISOString().slice(0, 10), to: to.toISOString().slice(0, 10), label: p.label });
              setOpen(false);
            }}
            className={cn(
              'flex w-full items-center rounded-lg px-2.5 py-2 text-left text-[13px] transition-colors',
              value.preset === p.id ? 'bg-adm-brandsoft text-adm-brand2' : 'text-adm-muted hover:bg-white/[.05] hover:text-adm-text'
            )}
          >
            {p.label}
          </button>
        ))}
        <div className="my-1.5 h-px bg-adm-line" />
        <div className="px-2 pb-1.5 text-[11px] text-adm-dim">Custom ranges connect via the reporting API.</div>
      </PopoverContent>
    </Popover>
  );
}

export const DEFAULT_RANGE: DateRange = { preset: '30d', from: '2026-08-30', to: '2026-09-28', label: 'Last 30 days' };
