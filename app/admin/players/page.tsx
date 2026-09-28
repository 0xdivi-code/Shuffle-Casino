'use client';
import * as React from 'react';
import { UserPlus, Download, Ban, Tag, ShieldCheck, Users, UserCheck, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/blocks/page-header';
import { StatCard, type StatSpec } from '@/components/admin/blocks/stat-card';
import { DataTable, type Column } from '@/components/admin/blocks/data-table';
import { adminApi, data } from '@/lib/admin/api';
import { Badge, statusVariant } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoneyCell, PlayerCell, RiskPill, DateCell, IdCell } from '@/components/admin/blocks/cells';
import { DrawerHeader, DrawerBody, DrawerSection, FieldGrid, DrawerFooter, Timeline } from '@/components/admin/blocks/detail';
import { fmtMoney, fmtDate } from '@/lib/admin/utils';

type Row = Record<string, unknown>;

const columns: Column<Row>[] = [
  { key: 'id', label: 'Player ID', render: r => <IdCell v={String(r.id)} /> },
  { key: 'username', label: 'Player', render: r => <PlayerCell name={String(r.username)} id={String(r.email)} /> },
  { key: 'country', label: 'Country', hideBelow: 'lg', render: r => <span className="text-adm-muted">{String(r.country)}</span> },
  { key: 'balance', label: 'Balance', sortable: true, align: 'right', render: r => <MoneyCell v={Number(r.balance)} currency={String(r.currency)} /> },
  { key: 'vipName', label: 'VIP', render: r => Number(r.vipLevel) >= 4 ? <Badge variant="gold">{String(r.vipName)}</Badge> : <span className="text-xs text-adm-dim">{String(r.vipName)}</span> },
  { key: 'kyc', label: 'KYC', render: r => <Badge variant={statusVariant(String(r.kyc))}>{String(r.kyc)}</Badge> },
  { key: 'status', label: 'Status', render: r => <Badge variant={statusVariant(String(r.status))} className="capitalize">{String(r.status)}</Badge> },
  { key: 'totalDeposits', label: 'Deposits', sortable: true, align: 'right', hideBelow: 'md', render: r => <MoneyCell v={Number(r.totalDeposits)} /> },
  { key: 'totalWithdrawals', label: 'Withdrawals', sortable: true, align: 'right', hideBelow: 'xl', render: r => <MoneyCell v={Number(r.totalWithdrawals)} /> },
  { key: 'ggr', label: 'GGR', sortable: true, align: 'right', hideBelow: 'lg', render: r => <MoneyCell v={Number(r.ggr)} signed /> },
  { key: 'lastLogin', label: 'Last login', sortable: true, hideBelow: 'md', render: r => <DateCell v={String(r.lastLogin)} /> },
  { key: 'registeredAt', label: 'Registered', sortable: true, hideBelow: 'xl', render: r => <span className="text-adm-muted">{fmtDate(String(r.registeredAt))}</span> },
  { key: 'risk', label: 'Risk', render: r => <RiskPill level={String(r.risk)} /> },
];

export default function PlayersPage() {
  const [refresh, setRefresh] = React.useState(0);

  const stats: StatSpec[] = [
    { label: 'Total players', value: '96,412', delta: 3.8, icon: Users },
    { label: 'Active (24h)', value: '12,840', delta: 6.4, icon: UserCheck, color: '#34d399' },
    { label: 'Verified', value: '59,782', delta: 2.1, sub: '62% of base', icon: ShieldCheck, color: '#4da3ff' },
    { label: 'VIP players', value: String(data.players.filter(p => p.vipLevel >= 4).length * 58), delta: 5.4, sub: 'Gold and above', icon: Crown, color: '#f2b93b' },
  ];

  const playerDrawer = (row: Row, close: () => void) => (
    <>
      <DrawerHeader
        title={String(row.username)}
        subtitle={`${row.email} · ${row.id}`}
        avatar={String(row.username)}
        badge={<Badge variant={statusVariant(String(row.status))} className="capitalize">{String(row.status)}</Badge>}
      />
      <DrawerBody>
        <DrawerSection title="Account">
          <FieldGrid fields={[
            { label: 'Country', value: String(row.country) },
            { label: 'Currency', value: String(row.currency) },
            { label: 'Balance', value: fmtMoney(Number(row.balance), String(row.currency), true) },
            { label: 'VIP level', value: String(row.vipName) },
            { label: 'KYC', value: String(row.kyc) },
            { label: 'Risk level', value: <RiskPill level={String(row.risk)} /> },
            { label: 'Total deposits', value: fmtMoney(Number(row.totalDeposits), 'USD', true) },
            { label: 'Total withdrawals', value: fmtMoney(Number(row.totalWithdrawals), 'USD', true) },
            { label: 'GGR', value: fmtMoney(Number(row.ggr), 'USD', true) },
            { label: 'Lifetime bets', value: Number(row.lifetimeBets).toLocaleString() },
            { label: 'Registered', value: fmtDate(String(row.registeredAt)) },
            { label: 'Last login', value: fmtDate(String(row.lastLogin), true) },
          ]} />
        </DrawerSection>
        <DrawerSection title="Recent activity">
          <Timeline items={[
            { title: 'Logged in', desc: String(row.device), time: String(row.lastLogin), tone: 'default' },
            { title: 'Deposit completed', desc: 'USDT (TRC-20) · instant credit', time: String(row.lastLogin), tone: 'green' },
            { title: 'KYC status updated', desc: `Now ${String(row.kyc)}`, time: String(row.registeredAt), tone: row.kyc === 'verified' ? 'green' : 'amber' },
          ]} />
        </DrawerSection>
      </DrawerBody>
      <DrawerFooter>
        <Button variant="danger" onClick={() => { toast.warning(`${row.username} suspended — audit entry created`); close(); setRefresh(x => x + 1); }}>
          Suspend
        </Button>
        <Button onClick={() => { toast.success('Navigating to full profile…'); window.location.href = `/admin/players/${row.id}`; }}>
          Open full profile
        </Button>
      </DrawerFooter>
    </>
  );

  return (
    <div>
      <PageHeader
        title="Players"
        description="Search, filter and manage every player account on the platform."
        actions={
          <>
            <Button variant="secondary" onClick={() => toast.success('Player export queued — you will be notified when ready')}>
              <Download className="h-3.5 w-3.5" /> Export all
            </Button>
            <Button onClick={() => toast.success('Registration form opens here once the player API is connected')}>
              <UserPlus className="h-3.5 w-3.5" /> Register player
            </Button>
          </>
        }
      />

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>

      <DataTable
        columns={columns}
        fetch={adminApi.listPlayers}
        searchPlaceholder="Search by username, email, ID, country…"
        refreshKey={refresh}
        defaultSort={{ key: 'lastLogin', dir: 'desc' }}
        defaultPageSize={10}
        exportName="players"
        rowDetail={playerDrawer}
        rowLink={r => `/admin/players/${r.id}`}
        filters={[
          { key: 'status', label: 'Status', options: ['active', 'suspended', 'banned', 'self-excluded', 'dormant'] },
          { key: 'kyc', label: 'KYC', options: ['verified', 'pending', 'rejected', 'unsubmitted'] },
          { key: 'risk', label: 'Risk', options: ['low', 'medium', 'high'] },
          { key: 'vipName', label: 'VIP tier', options: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond I', 'Diamond II', 'Diamond III', 'Royal'] },
        ]}
        bulkActions={[
          { label: 'Suspend', icon: Ban, variant: 'danger', onClick: rows => { toast.warning(`${rows.length} player(s) suspended — audit entries created`); setRefresh(x => x + 1); } },
          { label: 'Add tag', icon: Tag, variant: 'secondary', onClick: rows => toast.success(`Tag added to ${rows.length} player(s)`) },
          { label: 'Export selected', icon: Download, variant: 'secondary', onClick: rows => toast.success(`${rows.length} player(s) exported to CSV`) },
        ]}
      />
    </div>
  );
}
