'use client';
import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { UserAvatar } from '@/components/ui/avatar';
import { cn, fmtDate } from '@/lib/admin/utils';

/** Building blocks rendered inside detail drawers. */

export function DrawerHeader({ title, subtitle, badge, avatar }: {
  title: string; subtitle?: string; badge?: React.ReactNode; avatar?: string;
}) {
  return (
    <div className="border-b border-adm-line px-5 py-4">
      <div className="flex items-center gap-3">
        {avatar && <UserAvatar name={avatar} size={10} />}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="truncate text-[15px] font-semibold text-adm-text">{title}</h2>
            {badge}
          </div>
          {subtitle && <p className="mt-0.5 truncate text-xs text-adm-muted">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

export function DrawerBody({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">{children}</div>;
}

export function DrawerSection({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section>
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[10.5px] font-semibold uppercase tracking-[.1em] text-adm-dim">{title}</h3>
        {action}
      </div>
      {children}
    </section>
  );
}

export function FieldGrid({ fields, cols = 2 }: { fields: Array<{ label: string; value: React.ReactNode; mono?: boolean; span?: boolean }>; cols?: 2 | 3 }) {
  return (
    <div className={cn('grid gap-x-4 gap-y-3 rounded-adm border border-adm-line bg-adm-inset/50 p-3.5', cols === 3 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2')}>
      {fields.map((f, i) => (
        <div key={i} className={cn(f.span && 'col-span-2')}>
          <div className="text-[10.5px] font-medium uppercase tracking-wider text-adm-dim">{f.label}</div>
          <div className={cn('mt-0.5 text-[13px] font-medium text-adm-text', f.mono && 'font-mono text-xs')}>{f.value ?? '—'}</div>
        </div>
      ))}
    </div>
  );
}

export function Timeline({ items }: { items: Array<{ title: string; time: string | Date; desc?: string; tone?: 'default' | 'green' | 'red' | 'amber' }> }) {
  const toneCls = { default: 'bg-adm-dim', green: 'bg-adm-green', red: 'bg-adm-red', amber: 'bg-adm-amber' };
  return (
    <ol className="relative ml-1.5 space-y-4 border-l border-adm-line pl-4">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span className={cn('absolute -left-[21.5px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-adm-panel', toneCls[it.tone || 'default'])} />
          <div className="text-[13px] font-medium text-adm-text">{it.title}</div>
          {it.desc && <div className="mt-0.5 text-xs leading-relaxed text-adm-muted">{it.desc}</div>}
          <div className="mt-0.5 text-[11px] text-adm-dim">{typeof it.time === 'string' ? fmtDate(it.time, true) : fmtDate(it.time, true)}</div>
        </li>
      ))}
    </ol>
  );
}

export function DrawerFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center justify-end gap-2 border-t border-adm-line bg-adm-panel px-5 py-3.5">{children}</div>;
}

export { Badge };
