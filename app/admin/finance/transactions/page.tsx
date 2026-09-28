'use client';
import * as React from 'react';
import { ArrowDownToLine, ArrowUpFromLine, Wallet, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/blocks/page-header';
import { StatCard, type StatSpec } from '@/components/admin/blocks/stat-card';
import { DataTable, type Column } from '@/components/admin/blocks/data-table';
import { adminApi, data } from '@/lib/admin/api';
import { Badge, statusVariant } from '@/components/ui/badge';
import { MoneyCell, PlayerCell, DateCell, IdCell, TextCell, CurrencyIcon } from '@/components/admin/blocks/cells';
import { DrawerHeader, DrawerBody, DrawerSection, FieldGrid, DrawerFooter, Timeline } from '@/components/admin/blocks/detail';
import { Button } from '@/components/ui/button';
import { fmtMoney, fmtDate } from '@/lib/admin/utils';

type Row = Record<string, unknown>;

const STATUS_OPTIONS = ['completed', 'pending', 'failed', 'reversed', 'cancelled', 'suspicious'];

export default function TransactionsPage() {
  const stats: StatSpec[] = [
    { label: 'Transactions (24h)', value: '9,412', delta: 5.8, icon: Wallet },
    { label: 'Volume (24h)', value: '$4.8M', delta: 7.2, sub: 'deposits + withdrawals', icon: ArrowDownToLine, color: '#34d399' },
    { label: 'Pending review', value: String(data.transactions.filter(t => t.status === 'pending').length), delta: -4.2, icon: ArrowUpFromLine, color: '#fbbf24' },
    { label: 'Flagged suspicious', value: String(data.transactions.filter(t => t.status === 'suspicious').length), delta: 1, icon: ShieldAlert, color: '#f4587a' },
  ];

  const columns: Column<Row>[] = [
    { key: 'id', label: 'Transaction ID', render: r => <IdCell v={String(r.id)} /> },
    { key: 'player', label: 'Player', render: r => <PlayerCell name={String(r.player)} id={String(r.playerId)} href={`/admin/players/${r.playerId}`} /> },
    { key: 'type', label: 'Type', render: r => <Badge variant={r.type === 'deposit' ? 'green' : r.type === 'withdrawal' ? 'amber' : r.type === 'chargeback' ? 'red' : 'neutral'}>{String(r.type)}</Badge> },
    { key: 'amount', label: 'Amount', sortable: true, align: 'right', render: r => <span className="flex items-center justify-end gap-1.5"><CurrencyIcon currency={String(r.currency)} size={16} /><MoneyCell v={Number(r.amount)} signed /></span> },
    { key: 'currency', label: 'Cur', render: r => <span className="font-mono text-xs text-adm-muted">{String(r.currency)}</span> },
    { key: 'method', label: 'Payment method', hideBelow: 'md', render: r => <TextCell v={String(r.method)} /> },
    { key: 'status', label: 'Status', render: r => <Badge variant={statusVariant(String(r.status))} className="capitalize">{String(r.status)}</Badge> },
    { key: 'date', label: 'Date', sortable: true, render: r => <DateCell v={String(r.date)} /> },
    { key: 'reference', label: 'Reference', hideBelow: 'xl', render: r => <IdCell v={String(r.reference)} /> },
  ];

  const drawer = (row: Row, close: () => void) => {
    const amt = Number(row.amount ?? 0);
    return (
      <>
        <DrawerHeader title={`Transaction ${row.id}`} subtitle={`${row.player} · ${fmtDate(String(row.date), true)}`} badge={<Badge variant={statusVariant(String(row.status))} className="capitalize">{String(row.status)}</Badge>} />
        <DrawerBody>
          <DrawerSection title="Amount">
            <div className="flex items-center gap-3 rounded-adm border border-adm-line bg-adm-inset/60 p-4">
              <CurrencyIcon currency={String(row.currency)} size={36} />
              <div>
                <div className={`tnum text-xl font-bold ${amt >= 0 ? 'text-adm-green' : 'text-adm-red'}`}>{amt >= 0 ? '+' : ''}{fmtMoney(amt, String(row.currency), true)}</div>
                <div className="text-[11px] text-adm-dim">{row.method} · {String(row.type).toUpperCase()}</div>
              </div>
            </div>
          </DrawerSection>
          <DrawerSection title="Details">
            <FieldGrid fields={[
              { label: 'Player', value: String(row.player) },
              { label: 'Player ID', value: String(row.playerId), mono: true },
              { label: 'Type', value: String(row.type) },
              { label: 'Method', value: String(row.method) },
              { label: 'Reference', value: String(row.reference), mono: true },
              { label: 'Risk score', value: `${row.risk ?? '—'} / 100` },
              { label: 'Date', value: fmtDate(String(row.date), true), span: true },
            ]} />
          </DrawerSection>
          <DrawerSection title="Lifecycle">
            <Timeline items={[
              { title: 'Transaction created', time: String(row.date) },
              { title: row.status === 'completed' ? 'Settled & reconciled' : `Status: ${row.status}`, time: String(row.date), tone: row.status === 'completed' ? 'green' : row.status === 'failed' || row.status === 'suspicious' ? 'red' : 'amber' },
            ]} />
          </DrawerSection>
        </DrawerBody>
        <DrawerFooter>
          {row.status === 'pending' && (
            <>
              <Button variant="danger" onClick={() => { toast.error('Transaction rejected — funds returned to player'); close(); }}>Reject</Button>
              <Button variant="success" onClick={() => { toast.success('Transaction approved & settled'); close(); }}>Approve</Button>
            </>
          )}
          {row.status === 'completed' && (
            <Button variant="danger" onClick={() => { toast.warning('Reversal initiated — compensating entry posted'); close(); }}>Reverse</Button>
          )}
          {row.status === 'suspicious' && (
            <Button variant="secondary" onClick={() => { toast.info('Sent to risk queue'); close(); }}>Send to risk</Button>
          )}
          <Button variant="secondary" onClick={close}>Close</Button>
        </DrawerFooter>
      </>
    );
  };

  return (
    <div>
      <PageHeader
        title="Transactions"
        description="Unified ledger across deposits, withdrawals, bonuses, adjustments and chargebacks."
      />
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>
      <DataTable
        columns={columns}
        fetch={adminApi.listTransactions}
        searchPlaceholder="Search by ID, player, reference…"
        exportName="transactions"
        defaultSort={{ key: 'date', dir: 'desc' }}
        rowDetail={drawer}
        filters={[
          { key: 'status', label: 'Status', options: STATUS_OPTIONS },
          { key: 'type', label: 'Type', options: ['deposit', 'withdrawal', 'bonus', 'adjustment', 'chargeback'] },
          { key: 'method', label: 'Method', options: Array.from(new Set(data.transactions.map(t => t.method))) },
        ]}
        bulkActions={[
          { label: 'Mark reviewed', variant: 'secondary', onClick: rows => toast.success(`${rows.length} transaction(s) marked reviewed`) },
          { label: 'Flag suspicious', variant: 'danger', onClick: rows => toast.warning(`${rows.length} transaction(s) flagged & sent to risk`) },
        ]}
      />
    </div>
  );
}
