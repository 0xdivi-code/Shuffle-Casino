'use client';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, List, Star, Search, GripVertical, Power, Pencil, Download } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/blocks/page-header';
import { StatCard, type StatSpec } from '@/components/admin/blocks/stat-card';
import { Button } from '@/components/ui/button';
import { Badge, statusVariant } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer, DrawerContent } from '@/components/ui/sheet';
import { DrawerHeader, DrawerBody, DrawerSection, FieldGrid, DrawerFooter } from '@/components/admin/blocks/detail';
import { ConfirmDialog, closedConfirm, type ConfirmState } from '@/components/admin/blocks/confirm';
import { EmptyState } from '@/components/admin/blocks/states';
import { data } from '@/lib/admin/api';
import { fmtMoney, fmtNum, cn, downloadCSV } from '@/lib/admin/utils';
import type { AdminGame } from '@/lib/admin/data/world';

export default function GamesAdminPage() {
  const [games, setGames] = React.useState<AdminGame[]>(() => [...data.adminGames].sort((a, b) => a.order - b.order));
  const [view, setView] = React.useState<'grid' | 'table'>('grid');
  const [query, setQuery] = React.useState('');
  const [category, setCategory] = React.useState('all');
  const [provider, setProvider] = React.useState('all');
  const [statusF, setStatusF] = React.useState('all');
  const [editing, setEditing] = React.useState<AdminGame | null>(null);
  const [confirm, setConfirm] = React.useState<ConfirmState>(closedConfirm);
  const categories = Array.from(new Set(data.adminGames.map(g => g.category)));
  const providers = Array.from(new Set(data.adminGames.map(g => g.provider))).slice(0, 14);

  const filtered = games.filter(g =>
    (category === 'all' || g.category === category) &&
    (provider === 'all' || g.provider === provider) &&
    (statusF === 'all' || g.status === statusF) &&
    (!query || g.title.toLowerCase().includes(query.toLowerCase()) || g.provider.toLowerCase().includes(query.toLowerCase()))
  );

  const patch = (id: string, p: Partial<AdminGame>, msg?: string) => {
    setGames(gs => gs.map(g => (g.id === id ? { ...g, ...p } : g)));
    setEditing(e => (e && e.id === id ? { ...e, ...p } : e));
    if (msg) toast.success(msg);
  };

  const move = (id: string, dir: -1 | 1) => {
    setGames(gs => {
      const idx = gs.findIndex(g => g.id === id);
      const target = idx + dir;
      if (target < 0 || target >= gs.length) return gs;
      const next = [...gs];
      const [item] = next.splice(idx, 1);
      next.splice(target, 0, item);
      return next.map((g, i) => ({ ...g, order: i }));
    });
    toast.success('Order updated — publish pending');
  };

  const stats: StatSpec[] = [
    { label: 'Games live', value: fmtNum(games.filter(g => g.status === 'active').length * 112), delta: 2.4, icon: LayoutGrid },
    { label: 'Featured', value: String(games.filter(g => g.featured).length), delta: 2, icon: Star, color: '#f2b93b' },
    { label: 'Avg RTP', value: `${(games.reduce((a, g) => a + g.rtp, 0) / games.length).toFixed(1)}%`, delta: 0.1, icon: List },
    { label: 'Launches (7d)', value: fmtNum(games.reduce((a, g) => a + g.launches, 0)), delta: 6.4, icon: GripVertical, color: '#34d399' },
  ];

  const editDrawer = editing && (
    <>
      <DrawerHeader title={editing.title} subtitle={`${editing.provider} · ${editing.category}`} badge={<Badge variant={statusVariant(editing.status)}>{editing.status}</Badge>} />
      <DrawerBody>
        {editing.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={editing.image} alt={editing.title} className="h-40 w-full rounded-adm object-cover ring-1 ring-white/10" />
        )}
        <DrawerSection title="Visibility & status">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-adm border border-adm-line bg-adm-inset/40 px-3.5 py-3">
              <div>
                <div className="text-[13px] font-medium text-adm-text">Featured in lobby</div>
                <div className="text-[11px] text-adm-dim">Shows on the homepage featured rail</div>
              </div>
              <Switch checked={editing.featured} onCheckedChange={v => patch(editing.id, { featured: v }, v ? `${editing.title} featured` : `${editing.title} removed from featured`)} />
            </div>
            <div className="flex items-center justify-between rounded-adm border border-adm-line bg-adm-inset/40 px-3.5 py-3">
              <div>
                <div className="text-[13px] font-medium text-adm-text">Game enabled</div>
                <div className="text-[11px] text-adm-dim">Disabled games are hidden from players</div>
              </div>
              <Switch checked={editing.status === 'active'} onCheckedChange={v => patch(editing.id, { status: v ? 'active' : 'disabled' }, v ? `${editing.title} enabled` : `${editing.title} disabled`)} />
            </div>
          </div>
        </DrawerSection>
        <DrawerSection title="Configuration">
          <FieldGrid fields={[
            { label: 'RTP', value: `${editing.rtp}%` },
            { label: 'Category', value: editing.category },
            { label: 'Popularity score', value: String(editing.popularity) },
            { label: 'Launches', value: editing.launches.toLocaleString() },
            { label: 'GGR (7d)', value: fmtMoney(editing.ggr7d, 'USD', true) },
            { label: 'Position', value: `#${editing.order + 1} in lobby` },
          ]} />
          <div className="mt-3 flex items-center justify-between rounded-adm border border-adm-line bg-adm-inset/40 px-3.5 py-3">
            <div>
              <div className="text-[13px] font-medium text-adm-text">RTP override</div>
              <div className="text-[11px] text-adm-dim">Requires dual approval · audit logged</div>
            </div>
            <Button size="sm" variant="secondary" onClick={() => toast.info('RTP override submitted for second approval')}><Pencil className="h-3.5 w-3.5" /> Change</Button>
          </div>
        </DrawerSection>
      </DrawerBody>
      <DrawerFooter>
        <Button variant="danger" onClick={() => setConfirm({ open: true, title: `Disable ${editing.title}?`, description: 'Players will no longer see or launch this game. In-flight rounds settle normally.', confirmLabel: 'Disable game', danger: true, onConfirm: () => { patch(editing.id, { status: 'disabled' }, `${editing.title} disabled`); setEditing(null); } })}>
          <Power className="h-3.5 w-3.5" /> Disable
        </Button>
        <Button onClick={() => { toast.success('Configuration saved'); setEditing(null); }}>Save changes</Button>
      </DrawerFooter>
    </>
  );

  return (
    <div>
      <PageHeader
        title="Games"
        description="Curate the lobby: enable, feature, reorder and configure every game."
        actions={
          <>
            <Button variant="secondary" onClick={() => { downloadCSV('games', [{ key: 'title', label: 'Game' }, { key: 'provider', label: 'Provider' }, { key: 'category', label: 'Category' }, { key: 'rtp', label: 'RTP' }, { key: 'status', label: 'Status' }, { key: 'launches', label: 'Launches' }], filtered as unknown as Record<string, unknown>[]); toast.success(`Exported ${filtered.length} games`); }}>
              <Download className="h-3.5 w-3.5" /> Export CSV
            </Button>
            <div className="flex overflow-hidden rounded-adm border border-adm-line">
              <button onClick={() => setView('grid')} className={cn('px-3 py-2 text-xs font-medium transition-colors', view === 'grid' ? 'bg-adm-brandsoft text-adm-brand2' : 'text-adm-dim hover:text-adm-text')}><LayoutGrid className="h-4 w-4" /></button>
              <button onClick={() => setView('table')} className={cn('px-3 py-2 text-xs font-medium transition-colors', view === 'table' ? 'bg-adm-brandsoft text-adm-brand2' : 'text-adm-dim hover:text-adm-text')}><List className="h-4 w-4" /></button>
            </div>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      {/* filters */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-adm-dim" />
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search games or providers…" className="h-9 pl-8" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-9 w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All categories</SelectItem>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={provider} onValueChange={setProvider}>
          <SelectTrigger className="h-9 w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All providers</SelectItem>{providers.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={statusF} onValueChange={setStatusF}>
          <SelectTrigger className="h-9 w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent><SelectItem value="all">All statuses</SelectItem>{['active', 'disabled', 'maintenance'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
        </Select>
        <span className="ml-auto text-xs text-adm-dim">{filtered.length} of {games.length} games</span>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-adm-lg border border-adm-line bg-adm-card"><EmptyState title="No games match" hint="Adjust the filters or search term to find games." /></div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          <AnimatePresence>
            {filtered.slice(0, 48).map((g, i) => (
              <motion.div
                key={g.id} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.18, delay: Math.min(i * 0.015, 0.3) }}
                className="group relative cursor-pointer overflow-hidden rounded-adm-lg border border-adm-line bg-adm-card shadow-adm transition-all hover:-translate-y-0.5 hover:border-adm-brand/40 hover:shadow-adm-glow"
                onClick={() => setEditing(g)}
              >
                <div className="relative aspect-square overflow-hidden bg-adm-inset">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute left-2 top-2 flex gap-1">
                    {g.featured && <span className="flex h-6 w-6 items-center justify-center rounded-md bg-adm-gold/90 text-black shadow"><Star className="h-3.5 w-3.5 fill-current" /></span>}
                    {g.status !== 'active' && <Badge variant={statusVariant(g.status)}>{g.status}</Badge>}
                  </div>
                  <button
                    className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-md bg-black/60 text-white opacity-0 backdrop-blur transition-opacity hover:bg-adm-gold hover:text-black group-hover:opacity-100"
                    aria-label="Toggle featured"
                    onClick={e => { e.stopPropagation(); patch(g.id, { featured: !g.featured }, g.featured ? `${g.title} unfeatured` : `${g.title} featured`); }}
                  >
                    <Star className={cn('h-3.5 w-3.5', g.featured && 'fill-adm-gold text-adm-gold')} />
                  </button>
                  <div className="absolute inset-x-0 bottom-0 p-2.5">
                    <div className="truncate text-[12.5px] font-semibold text-white">{g.title}</div>
                    <div className="truncate text-[10.5px] text-white/60">{g.provider}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between px-2.5 py-2">
                  <span className="tnum text-[10.5px] text-adm-dim">RTP {g.rtp}%</span>
                  <span className="tnum text-[10.5px] font-medium text-adm-muted">{fmtNum(g.launches)} plays</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="overflow-hidden rounded-adm-lg border border-adm-line bg-adm-card shadow-adm">
          <table className="w-full text-[13px]">
            <thead>
              <tr>
                {['#', 'Game', 'Provider', 'Category', 'RTP', 'Featured', 'Status', 'Launches', 'GGR (7d)', 'Order'].map(h => (
                  <th key={h} className="h-9 border-b border-adm-line bg-adm-inset/60 px-3 text-left text-[10.5px] font-semibold uppercase tracking-[.08em] text-adm-dim">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.slice(0, 30).map(g => (
                <tr key={g.id} className="adm-row-hover cursor-pointer" onClick={() => setEditing(g)}>
                  <td className="border-b border-adm-line/60 px-3 py-2.5 font-mono text-xs text-adm-dim">{String(games.indexOf(g) + 1).padStart(3, '0')}</td>
                  <td className="border-b border-adm-line/60 px-3 py-2.5">
                    <span className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={g.image} alt="" className="h-8 w-8 rounded-md object-cover ring-1 ring-white/10" loading="lazy" />
                      <span className="font-medium text-adm-text">{g.title}</span>
                    </span>
                  </td>
                  <td className="border-b border-adm-line/60 px-3 py-2.5 text-adm-muted">{g.provider}</td>
                  <td className="border-b border-adm-line/60 px-3 py-2.5"><Badge variant="neutral">{g.category}</Badge></td>
                  <td className="border-b border-adm-line/60 px-3 py-2.5"><span className={cn('tnum', g.rtp < 94 ? 'text-adm-red' : 'text-adm-muted')}>{g.rtp}%</span></td>
                  <td className="border-b border-adm-line/60 px-3 py-2.5" onClick={e => e.stopPropagation()}>
                    <Switch checked={g.featured} onCheckedChange={v => patch(g.id, { featured: v })} aria-label="Featured" />
                  </td>
                  <td className="border-b border-adm-line/60 px-3 py-2.5"><Badge variant={statusVariant(g.status)}>{g.status}</Badge></td>
                  <td className="tnum border-b border-adm-line/60 px-3 py-2.5 text-adm-muted">{fmtNum(g.launches)}</td>
                  <td className="tnum border-b border-adm-line/60 px-3 py-2.5 font-medium text-adm-text">{fmtMoney(g.ggr7d, 'USD', true)}</td>
                  <td className="border-b border-adm-line/60 px-3 py-2.5" onClick={e => e.stopPropagation()}>
                    <span className="flex gap-1">
                      <Button variant="ghost" size="iconSm" onClick={() => move(g.id, -1)} aria-label="Move up"><span className="text-xs">▲</span></Button>
                      <Button variant="ghost" size="iconSm" onClick={() => move(g.id, 1)} aria-label="Move down"><span className="text-xs">▼</span></Button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Drawer open={!!editing} onOpenChange={o => !o && setEditing(null)}>
        <DrawerContent width="max-w-[480px]">{editDrawer}</DrawerContent>
      </Drawer>
      <ConfirmDialog state={confirm} onClose={() => setConfirm(closedConfirm)} />
    </div>
  );
}
