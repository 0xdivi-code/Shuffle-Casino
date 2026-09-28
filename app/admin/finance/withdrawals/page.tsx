'use client';
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpFromLine, CheckCircle2, XCircle, ShieldAlert, Timer, BadgeDollarSign, Download } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/blocks/page-header';
import { StatCard, type StatSpec } from '@/components/admin/blocks/stat-card';
import { Button } from '@/components/ui/button';
import { Badge, statusVariant } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Drawer, DrawerContent } from '@/components/ui/sheet';
import { DrawerHeader, DrawerBody, DrawerSection, FieldGrid, DrawerFooter, Timeline } from '@/components/admin/blocks/detail';
import { ConfirmDialog, closedConfirm, type ConfirmState } from '@/components/admin/blocks/confirm';
import { EmptyState } from '@/components/admin/blocks/states';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { UserAvatar } from '@/components/ui/avatar';
import { CurrencyIcon, RiskPill } from '@/components/admin/blocks/cells';
import { data } from '@/lib/admin/api';
import { fmtMoney, fmtDate, relTime, downloadCSV } from '@/lib/admin/utils';

interface Withdrawal {
  id: string; player: string; playerId: string; amount: number; currency: string; method: string;
  requested: string; risk: number; status: 'pending' | 'approved' | 'rejected' | 'processing' | 'escalated';
  kyc: string; note?: string;
}

const seed: Withdrawal[] = data.transactions
  .filter(t => t.type === 'withdrawal')
  .slice(0, 26)
  .map((t, i) => ({
    id: t.id, player: t.player, playerId: t.playerId, amount: Math.abs(t.amount), currency: t.currency,
    method: t.method, requested: t.date, risk: t.risk ?? 20,
    status: i < 8 ? 'pending' : i < 10 ? 'escalated' : i % 3 === 0 ? 'processing' : 'approved',
    kyc: data.players.find(p => p.id === t.playerId)?.kyc ?? 'verified',
  }));

export default function WithdrawalsPage() {
  const [items, setItems] = React.useState(seed);
  const [selected, setSelected] = React.useState<Withdrawal | null>(null);
  const [statusFilter, setStatusFilter] = React.useState('pending');
  const [query, setQuery] = React.useState('');
  const [confirm, setConfirm] = React.useState<ConfirmState>(closedConfirm);

  const setStatus = (id: string, status: Withdrawal['status'], msg: string, kind: 'success' | 'error' | 'warning' = 'success') => {
    setItems(prev => prev.map(w => (w.id === id ? { ...w, status } : w)));
    setSelected(s => (s && s.id === id ? { ...s, status } : s));
    if (kind === 'success') toast.success(msg); else if (kind === 'error') toast.error(msg); else toast.warning(msg);
  };

  const filtered = items.filter(w =>
    (statusFilter === 'all' || w.status === statusFilter) &&
    (!query || w.player.toLowerCase().includes(query.toLowerCase()) || w.id.toLowerCase().includes(query.toLowerCase()))
  );
  const pending = items.filter(w => w.status === 'pending' || w.status === 'escalated');

  const stats: StatSpec[] = [
    { label: 'Queue depth', value: String(pending.length), delta: -12.5, sub: 'target < 10', icon: Timer, color: '#fbbf24' },
    { label: 'Queue value', value: fmtMoney(pending.reduce((a, w) => a + w.amount, 0), 'USD', true), icon: BadgeDollarSign },
    { label: 'Paid today', value: fmtMoney(412800, 'USD', true), delta: 8.4, icon: ArrowUpFromLine, color: '#34d399' },
    { label: 'Avg processing', value: '41m', delta: -9.2, sub: 'request → payout', icon: ShieldAlert },
  ];

  const drawer = selected && (
    <>
      <DrawerHeader
        title={`Withdrawal ${selected.id}`}
        subtitle={`${selected.player} · requested ${relTime(selected.requested)}`}
        avatar={selected.player}
        badge={<Badge variant={statusVariant(selected.status)} className="capitalize">{selected.status}</Badge>}
      />
      <DrawerBody>
        <DrawerSection title="Amount">
          <div className="flex items-center gap-3 rounded-adm border border-adm-line bg-adm-inset/60 p-4">
            <CurrencyIcon currency={selected.currency} size={36} />
            <div>
              <div className="tnum text-xl font-bold text-adm-amber">{fmtMoney(selected.amount, selected.currency, true)}</div>
              <div className="text-[11px] text-adm-dim">{selected.method} · payout to verified {selected.currency} wallet</div>
            </div>
          </div>
        </DrawerSection>
        <DrawerSection title="Approval checks">
          <FieldGrid fields={[
            { label: 'KYC status', value: <Badge variant={selected.kyc === 'verified' ? 'green' : 'amber'}>{selected.kyc}</Badge> },
            { label: 'Risk score', value: <RiskPill score={selected.risk} /> },
            { label: 'Balance covers', value: <Badge variant="green">Yes</Badge> },
            { label: 'Bonus lock', value: <Badge variant="green">Clear</Badge> },
            { label: 'Sanctions screen', value: <Badge variant="green">Pass</Badge> },
            { label: 'Velocity check', value: selected.risk > 60 ? <Badge variant="amber">Review</Badge> : <Badge variant="green">Pass</Badge> },
          ]} />
        </DrawerSection>
        <DrawerSection title="History">
          <Timeline items={[
            { title: 'Withdrawal requested', time: selected.requested },
            { title: 'Automated checks completed', desc: selected.risk > 60 ? '2 checks need human review' : 'All checks passed', time: selected.requested, tone: selected.risk > 60 ? 'amber' : 'green' },
            { title: 'Queued for manual approval', desc: 'Above auto-approve threshold ($1,000)', time: selected.requested, tone: 'amber' },
          ]} />
        </DrawerSection>
      </DrawerBody>
      <DrawerFooter>
        {selected.status === 'pending' || selected.status === 'escalated' ? (
          <>
            <Button variant="danger" onClick={() => setConfirm({ open: true, title: `Reject withdrawal ${selected.id}?`, description: `${fmtMoney(selected.amount, selected.currency, true)} will be returned to ${selected.player}'s balance. The player is notified with the rejection reason.`, confirmLabel: 'Reject withdrawal', danger: true, onConfirm: () => setStatus(selected.id, 'rejected', 'Withdrawal rejected — funds returned') })}>
              <XCircle className="h-3.5 w-3.5" /> Reject
            </Button>
            <Button variant="secondary" onClick={() => setStatus(selected.id, 'escalated', 'Escalated to senior finance', 'warning')}>Escalate</Button>
            <Button variant="success" onClick={() => setConfirm({ open: true, title: `Approve ${fmtMoney(selected.amount, selected.currency, true)} payout?`, description: `Approving releases ${fmtMoney(selected.amount, selected.currency, true)} to ${selected.player} via ${selected.method}. Amounts above $10,000 require a second approver.`, confirmLabel: 'Approve payout', onConfirm: () => setStatus(selected.id, selected.amount > 10000 ? 'processing' : 'approved', selected.amount > 10000 ? 'Approved — awaiting second approver' : 'Payout approved & sent to processor') })}>
              <CheckCircle2 className="h-3.5 w-3.5" /> Approve
            </Button>
          </>
        ) : (
          <Button variant="secondary" onClick={() => setSelected(null)}>Close</Button>
        )}
      </DrawerFooter>
    </>
  );

  return (
    <div>
      <PageHeader
        title="Withdrawals"
        description="Review and approve payout requests. Anything above $1,000 requires manual sign-off."
        actions={
          <Button variant="secondary" onClick={() => { downloadCSV('withdrawals', [{ key: 'id', label: 'ID' }, { key: 'player', label: 'Player' }, { key: 'amount', label: 'Amount' }, { key: 'method', label: 'Method' }, { key: 'status', label: 'Status' }, { key: 'requested', label: 'Requested' }], filtered); toast.success(`Exported ${filtered.length} withdrawals`); }}>
            <Download className="h-3.5 w-3.5" /> Export CSV
          </Button>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      <div className="overflow-hidden rounded-adm-lg border border-adm-line bg-adm-card shadow-adm">
        <div className="flex flex-wrap items-center gap-2 border-b border-adm-line p-3">
          <Input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search player or ID…" className="h-9 max-w-xs" />
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9 w-[170px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {['pending', 'escalated', 'processing', 'approved', 'rejected', 'all'].map(s => <SelectItem key={s} value={s}>{s === 'all' ? 'All statuses' : s[0].toUpperCase() + s.slice(1)}</SelectItem>)}
            </SelectContent>
          </Select>
          {pending.length > 0 && (
            <Button
              className="ml-auto"
              onClick={() => setConfirm({ open: true, title: `Batch approve ${pending.filter(w => w.amount <= 10000 && w.risk <= 60).length} withdrawals?`, description: 'Low-risk payouts under $10,000 will be approved in bulk. Large or risky items stay in the queue.', confirmLabel: 'Batch approve', onConfirm: () => { const n = pending.filter(w => w.amount <= 10000 && w.risk <= 60).length; setItems(prev => prev.map(w => w.status === 'pending' && w.amount <= 10000 && w.risk <= 60 ? { ...w, status: 'approved' } : w)); toast.success(`${n} withdrawals approved`); } })}
            >
              <CheckCircle2 className="h-3.5 w-3.5" /> Batch approve low-risk
            </Button>
          )}
        </div>

        {filtered.length === 0 ? (
          <EmptyState title="Queue is clear 🎉" hint="No withdrawals match this view. New requests appear here in real time." />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead><TableHead>Player</TableHead><TableHead>Amount</TableHead>
                <TableHead>Method</TableHead><TableHead className="hidden md:table-cell">Risk</TableHead>
                <TableHead className="hidden lg:table-cell">Requested</TableHead><TableHead>Status</TableHead><TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence initial={false}>
                {filtered.map(w => (
                  <motion.tr key={w.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="adm-row-hover cursor-pointer" onClick={() => setSelected(w)}>
                    <TableCell className="font-mono text-xs text-adm-muted">{w.id}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2">
                        <UserAvatar name={w.player} size={7} />
                        <span className="font-medium text-adm-text">{w.player}</span>
                      </span>
                    </TableCell>
                    <TableCell><span className="flex items-center gap-1.5"><CurrencyIcon currency={w.currency} size={16} /><span className="tnum font-semibold text-adm-text">{fmtMoney(w.amount, w.currency, true)}</span></span></TableCell>
                    <TableCell className="text-adm-muted">{w.method}</TableCell>
                    <TableCell className="hidden md:table-cell"><RiskPill score={w.risk} /></TableCell>
                    <TableCell className="hidden text-adm-muted lg:table-cell">{fmtDate(w.requested, true)}</TableCell>
                    <TableCell><Badge variant={statusVariant(w.status)} className="capitalize">{w.status}</Badge></TableCell>
                    <TableCell onClick={e => e.stopPropagation()}>
                      {w.status === 'pending' ? (
                        <div className="flex justify-end gap-1.5">
                          <Button size="sm" variant="success" onClick={() => setStatus(w.id, 'approved', `Approved ${fmtMoney(w.amount, w.currency, true)} to ${w.player}`)}><CheckCircle2 className="h-3.5 w-3.5" /></Button>
                          <Button size="sm" variant="danger" onClick={() => setStatus(w.id, 'rejected', 'Withdrawal rejected', 'error')}><XCircle className="h-3.5 w-3.5" /></Button>
                        </div>
                      ) : (
                        <div className="text-right"><Button size="sm" variant="ghost" onClick={() => setSelected(w)}>Details</Button></div>
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        )}
      </div>

      <Drawer open={!!selected} onOpenChange={o => !o && setSelected(null)}>
        <DrawerContent width="max-w-[520px]">{drawer}</DrawerContent>
      </Drawer>
      <ConfirmDialog state={confirm} onClose={() => setConfirm(closedConfirm)} />
    </div>
  );
}
