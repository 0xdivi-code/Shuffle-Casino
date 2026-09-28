'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { Plus, Save } from 'lucide-react';
import { toast } from 'sonner';
import type { PageSpec } from '@/lib/admin/registry';
import { PageHeader } from './page-header';
import { StatCard, StatSkeleton, type StatSpec } from './stat-card';
import { ChartCard, ChartSkeleton, type ChartSpec } from './chart-card';
import { DataTable } from './data-table';
import { EmptyState } from './states';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge, statusVariant } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input, Label } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/admin/utils';

export function RegistryPage({ spec }: { spec: PageSpec }) {
  const [stats, setStats] = React.useState<StatSpec[] | null>(spec.stats ? null : []);
  React.useEffect(() => {
    document.title = `${spec.title} · Shuffle Admin`;
  }, [spec]);
  React.useEffect(() => {
    if (!spec.stats) return;
    setStats(null);
    const t = setTimeout(() => setStats(spec.stats!), 420);
    return () => clearTimeout(t);
  }, [spec]);

  return (
    <div>
      <PageHeader
        title={spec.title}
        description={spec.description}
        actions={
          spec.cards?.actionLabel || spec.settings ? (
            <Button onClick={() => toast.success('Saved — changes recorded in audit log')}>
              {spec.settings ? (<><Save className="h-3.5 w-3.5" /> Save changes</>) : (<><Plus className="h-3.5 w-3.5" /> {spec.cards?.actionLabel}</>)}
            </Button>
          ) : undefined
        }
      />

      {spec.stats && (
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats === null
            ? Array.from({ length: spec.stats.length }).map((_, i) => <StatSkeleton key={i} />)
            : stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
        </div>
      )}

      {spec.charts && spec.charts.length > 0 && (
        <div className={cn('mb-5 grid grid-cols-1 gap-4', spec.charts.length > 1 && 'lg:grid-cols-2')}>
          {spec.charts.map((c, i) => <ChartCard key={c.title + i} spec={c} index={i} />)}
        </div>
      )}

      {spec.table && (
        <DataTable
          columns={spec.table.columns}
          fetch={spec.table.source}
          filters={spec.table.filters}
          bulkActions={spec.table.bulkActions}
          rowDetail={spec.table.rowDetail ?? (spec.table.autoDetail ? (row, close) => autoDetail(row, close, spec.table!.detailTitle ? spec.table!.detailTitle(row) : 'Details') : undefined)}
          rowLink={spec.table.rowLink}
          exportName={spec.table.exportName}
          searchPlaceholder={spec.table.searchPlaceholder}
          defaultSort={spec.table.defaultSort}
        />
      )}

      {spec.settings && <SettingsView groups={spec.settings} />}
      {spec.cards && <CardsView cards={spec.cards} />}
    </div>
  );
}

/* ---------- auto detail drawer ---------- */
import { DrawerHeader, DrawerBody, DrawerSection, FieldGrid, DrawerFooter } from './detail';
function autoDetail(row: Record<string, unknown>, close: () => void, title: string) {
  const fields = Object.entries(row)
    .filter(([k]) => !['image', 'playerId'].includes(k))
    .map(([k, v]) => ({
      label: k.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()),
      value: Array.isArray(v) ? v.join(', ') : typeof v === 'number' ? v.toLocaleString() : String(v ?? '—'),
    }));
  return (
    <>
      <DrawerHeader title={title} subtitle={`Reference ${row.id ?? ''}`} />
      <DrawerBody>
        <DrawerSection title="Details"><FieldGrid fields={fields} /></DrawerSection>
      </DrawerBody>
      <DrawerFooter>
        <Button variant="secondary" onClick={close}>Close</Button>
        <Button onClick={() => { toast.success('Saved — changes recorded in audit log'); close(); }}>Save changes</Button>
      </DrawerFooter>
    </>
  );
}

/* ---------- settings renderer ---------- */
function SettingsView({ groups }: { groups: NonNullable<PageSpec['settings']> }) {
  const [state, setState] = React.useState<Record<string, string | boolean>>(() => {
    const o: Record<string, string | boolean> = {};
    groups.forEach(g => g.fields.forEach(f => { o[f.label] = f.value; }));
    return o;
  });
  return (
    <div className="max-w-3xl space-y-4">
      {groups.map((g, gi) => (
        <motion.div key={g.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi * 0.06 }}>
          <Card>
            <CardContent className="p-0">
              <div className="border-b border-adm-line px-5 py-3.5">
                <h3 className="text-[13px] font-semibold text-adm-text">{g.title}</h3>
                {g.desc && <p className="mt-0.5 text-xs text-adm-muted">{g.desc}</p>}
              </div>
              <div className="divide-y divide-adm-line/60">
                {g.fields.map(f => (
                  <div key={f.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                    <div className="min-w-0">
                      <div className="text-[13px] font-medium text-adm-text">{f.label}</div>
                      {f.desc && <div className="mt-0.5 text-xs text-adm-muted">{f.desc}</div>}
                    </div>
                    {f.type === 'switch' && (
                      <Switch
                        checked={state[f.label] as boolean}
                        onCheckedChange={v => { setState(s => ({ ...s, [f.label]: v })); toast.success(`${f.label} ${v ? 'enabled' : 'disabled'}`); }}
                      />
                    )}
                    {f.type === 'select' && (
                      <Select value={String(state[f.label])} onValueChange={v => { setState(s => ({ ...s, [f.label]: v })); toast.success(`${f.label} set to ${v}`); }}>
                        <SelectTrigger className="h-8 w-[170px]"><SelectValue /></SelectTrigger>
                        <SelectContent>{(f.options || []).map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                      </Select>
                    )}
                    {f.type === 'text' && (
                      <Input value={String(state[f.label] ?? '')} onChange={e => setState(s => ({ ...s, [f.label]: e.target.value }))} className="h-8 w-[260px]" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------- cards renderer ---------- */
function CardsView({ cards }: { cards: NonNullable<PageSpec['cards']> }) {
  const cols = cards.columns ?? 3;
  return (
    <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-2', cols >= 4 ? 'lg:grid-cols-3 xl:grid-cols-4' : cols === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3')}>
      {cards.items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04, duration: 0.3 }}
          className="group relative overflow-hidden rounded-adm-lg border border-adm-line bg-adm-card p-4 shadow-adm transition-all hover:-translate-y-0.5 hover:border-adm-line2 hover:shadow-adm-lg"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-adm bg-adm-card2 text-lg ring-1 ring-white/[.06]">{item.icon}</span>
              <div className="min-w-0">
                <h3 className="truncate text-[13.5px] font-semibold text-adm-text">{item.title}</h3>
                {item.desc && <p className="mt-0.5 line-clamp-1 text-[11.5px] text-adm-muted">{item.desc}</p>}
              </div>
            </div>
            {item.status && <Badge variant={statusVariant(item.status)}>{item.status}</Badge>}
          </div>
          {item.metrics && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {item.metrics.map(m => (
                <div key={m.label} className="rounded-adm bg-adm-inset/70 px-2.5 py-2 ring-1 ring-white/[.04]">
                  <div className="text-[9.5px] font-semibold uppercase tracking-wider text-adm-dim">{m.label}</div>
                  <div className="tnum mt-0.5 truncate text-[13px] font-bold text-adm-text">{m.value}</div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button size="sm" variant="secondary" onClick={() => toast.info(`Editing “${item.title}” (demo)`)}>Configure</Button>
          </div>
        </motion.div>
      ))}
      {cards.items.length === 0 && (
        <div className="col-span-full">
          <EmptyState title="Nothing here yet" hint="Create the first item to get started." action={{ label: 'Create', onClick: () => toast.success('Created (demo)') }} />
        </div>
      )}
    </div>
  );
}

export type { ChartSpec };
