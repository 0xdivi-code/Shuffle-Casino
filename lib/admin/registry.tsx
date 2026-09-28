/**
 * Page registry — config-driven screens for every navigation item.
 * Handcrafted pages (dashboard, players, finance, games…) override these routes;
 * everything else renders through RegistryPage so no nav item is ever empty.
 */
import * as React from 'react';
import {
  Users, UserPlus, Wallet, ArrowDownToLine, ArrowUpFromLine, TrendingUp, Coins,
  Dice5, Percent, Crown, Activity, Gauge, Trophy, ShieldAlert, Gift, LineChart as LineChartIcon,
} from 'lucide-react';
import { toast } from 'sonner';
import { adminApi, data } from './api';
import type { ListParams, ListResult } from './api';
import type { Column, FilterSpec, BulkAction } from '@/components/admin/blocks/data-table';
import type { StatSpec } from '@/components/admin/blocks/stat-card';
import type { ChartSpec } from '@/components/admin/blocks/chart-card';
import { MoneyCell, NumCell, StatusCell, DateCell, PlayerCell, IdCell, RiskPill, CurrencyIcon, TextCell, DeltaCell } from '@/components/admin/blocks/cells';
import { DrawerHeader, DrawerBody, DrawerSection, FieldGrid, DrawerFooter, Timeline } from '@/components/admin/blocks/detail';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { fmtMoney, fmtNum, fmtDate, relTime } from './utils';

const D = data.daily;
type Row = Record<string, unknown>;

/* ------------------------------ stats helpers ------------------------------ */
const sum = (k: string, from: number) => D.slice(from).reduce((a, d) => a + (d as unknown as Record<string, number>)[k], 0);
const spark = (k: string, n = 16) => D.slice(-n).map(d => (d as unknown as Record<string, number>)[k]);
const deltaOf = (k: string, days: number) => {
  const cur = sum(k, -days); const prev = D.slice(-2 * days, -days).reduce((a, d) => a + (d as unknown as Record<string, number>)[k], 0);
  return prev ? ((cur - prev) / prev) * 100 : 0;
};
const mstat = (label: string, k: string, icon: StatSpec['icon'], days = 30): StatSpec => ({
  label, value: fmtMoney(sum(k, -days), 'USD', true), delta: deltaOf(k, days), spark: spark(k), icon,
});
const nstat = (label: string, k: string, icon: StatSpec['icon'], days = 30): StatSpec => ({
  label, value: fmtNum(sum(k, -days)), delta: deltaOf(k, days), spark: spark(k), icon, color: '#4da3ff',
});

const CHART_DATA = {
  revenue30: D.slice(-30).map(d => ({ label: d.label, revenue: d.revenue })),
  depWith30: D.slice(-30).map(d => ({ label: d.label, deposits: d.deposits, withdrawals: d.withdrawals })),
  ggr30: D.slice(-30).map(d => ({ label: d.label, GGR: d.ggr, NGR: d.ngr })),
  players30: D.slice(-30).map(d => ({ label: d.label, newPlayers: d.newPlayers, activePlayers: d.activePlayers })),
  bets30: D.slice(-30).map(d => ({ label: d.label, bets: d.bets })),
  pnl30: D.slice(-30).map(d => ({ label: d.label, revenue: d.ngr, costs: -62000 - (d.bets % 24000), profit: d.profit })),
  revenue90: D.map(d => ({ label: d.label, revenue: d.revenue })),
  ggr90: D.map(d => ({ label: d.label, GGR: d.ggr, NGR: d.ngr })),
};

/* ------------------------------ table sources ------------------------------ */
const src = {
  players: (p: ListParams) => adminApi.listPlayers(p),
  transactions: (p: ListParams) => adminApi.listTransactions(p),
  deposits: (p: ListParams) => adminApi.listTransactions({ ...p, filters: { ...p.filters, type: 'deposit' } }),
  withdrawals: (p: ListParams) => adminApi.listTransactions({ ...p, filters: { ...p.filters, type: 'withdrawal' } }),
  chargebacks: (p: ListParams) => adminApi.listTransactions({ ...p, filters: { ...p.filters, type: 'chargeback' } }),
  bonusTx: (p: ListParams) => adminApi.listTransactions({ ...p, filters: { ...p.filters, type: 'bonus' } }),
  bets: (p: ListParams) => adminApi.listBets(p),
  games: (p: ListParams) => adminApi.listGames(p),
  providers: (p: ListParams) => adminApi.listProviders(p),
  campaigns: (p: ListParams) => adminApi.listCampaigns(p),
  affiliates: (p: ListParams) => adminApi.listAffiliates(p),
  admins: (p: ListParams) => adminApi.listAdmins(p),
  audit: (p: ListParams) => adminApi.listAuditLogs(p),
  riskCases: (p: ListParams) => adminApi.listRiskCases(p),
  kycDocs: (p: ListParams) => adminApi.listKycDocs(p),
  events: (p: ListParams) => adminApi.listEvents(p),
};
const staticSrc = <T extends Row,>(rows: T[]) => async (p: ListParams): Promise<ListResult<T>> => {
  await new Promise(r => setTimeout(r, 260 + Math.random() * 280));
  const { paginate } = await import('./api');
  return paginate(rows, p) as unknown as ListResult<T>;
};

/* ------------------------------ shared columns ------------------------------ */
const statusFilters: FilterSpec[] = [];
const txStatusFilter: FilterSpec = { key: 'status', label: 'Status', options: ['completed', 'pending', 'failed', 'reversed', 'cancelled', 'suspicious'] };
const methodFilter: FilterSpec = { key: 'method', label: 'Method', options: Array.from(new Set(data.transactions.map(t => t.method))) };

const money = (key: string, label: string, o: Partial<Column<Row>> = {}): Column<Row> => ({
  key, label, sortable: true, align: 'right', render: r => <MoneyCell v={Number(r[key] ?? 0)} />, ...o,
});
const num = (key: string, label: string, o: Partial<Column<Row>> = {}): Column<Row> => ({
  key, label, sortable: true, align: 'right', render: r => <NumCell v={Number(r[key] ?? 0)} />, ...o,
});
const status = (key = 'status'): Column<Row> => ({ key, label: 'Status', render: r => <StatusCell v={String(r[key] ?? '')} /> });
const when = (key: string, label: string): Column<Row> => ({ key, label, sortable: true, render: r => <DateCell v={String(r[key] ?? '')} /> });
const id = (key = 'id'): Column<Row> => ({ key, label: 'ID', render: r => <IdCell v={String(r[key] ?? '')} /> });
const player = (): Column<Row> => ({
  key: 'player', label: 'Player',
  render: r => <PlayerCell name={String(r.player ?? '')} id={String(r.playerId ?? '')} href={`/admin/players/${r.playerId}`} />,
});

/* ------------------------------ drawer builders ------------------------------ */
function autoDrawer(row: Row, close: () => void, title: string) {
  const fields = Object.entries(row).filter(([k]) => !['image'].includes(k)).map(([k, v]) => ({
    label: k.replace(/([A-Z])/g, ' $1').replace(/^./, c => c.toUpperCase()),
    value: typeof v === 'number' ? v.toLocaleString() : typeof v === 'boolean' ? String(v) : Array.isArray(v) ? v.join(', ') : String(v ?? '—'),
  }));
  return (
    <>
      <DrawerHeader title={title} subtitle={`Record ${row.id ?? ''}`} />
      <DrawerBody>
        <DrawerSection title="Details"><FieldGrid fields={fields} /></DrawerSection>
      </DrawerBody>
      <DrawerFooter>
        <Button variant="secondary" onClick={close}>Close</Button>
        <Button onClick={() => { toast.success('Action recorded in audit log'); close(); }}>Save changes</Button>
      </DrawerFooter>
    </>
  );
}

function txDrawer(row: Row, close: () => void) {
  const amt = Number(row.amount ?? 0);
  return (
    <>
      <DrawerHeader title={`Transaction ${row.id}`} subtitle={`${row.player} · ${fmtDate(String(row.date), true)}`} badge={<StatusCell v={String(row.status)} />} />
      <DrawerBody>
        <DrawerSection title="Amount">
          <div className="flex items-center gap-3 rounded-adm border border-adm-line bg-adm-inset/60 p-4">
            <CurrencyIcon currency={String(row.currency)} size={34} />
            <div>
              <div className={`tnum text-xl font-bold ${amt >= 0 ? 'text-adm-green' : 'text-adm-red'}`}>{amt >= 0 ? '+' : ''}{fmtMoney(amt, String(row.currency), true)}</div>
              <div className="text-[11px] text-adm-dim">{row.method} · {String(row.type).toUpperCase()}</div>
            </div>
          </div>
        </DrawerSection>
        <DrawerSection title="Transaction details">
          <FieldGrid fields={[
            { label: 'Player', value: String(row.player) },
            { label: 'Player ID', value: String(row.playerId), mono: true },
            { label: 'Type', value: String(row.type) },
            { label: 'Method', value: String(row.method) },
            { label: 'Reference', value: String(row.reference), mono: true },
            { label: 'Risk score', value: String(row.risk ?? '—') },
            { label: 'Date', value: fmtDate(String(row.date), true), span: true },
          ]} />
        </DrawerSection>
        <DrawerSection title="Lifecycle">
          <Timeline items={[
            { title: 'Transaction created', time: String(row.date), tone: 'default' },
            { title: `Status set to ${row.status}`, time: String(row.date), tone: row.status === 'completed' ? 'green' : row.status === 'failed' || row.status === 'suspicious' ? 'red' : 'amber' },
          ]} />
        </DrawerSection>
      </DrawerBody>
      <DrawerFooter>
        {String(row.status) === 'pending' && (
          <>
            <Button variant="danger" onClick={() => { toast.error('Transaction rejected & funds returned'); close(); }}>Reject</Button>
            <Button variant="success" onClick={() => { toast.success('Transaction approved'); close(); }}>Approve</Button>
          </>
        )}
        {String(row.status) === 'completed' && (
          <Button variant="danger" onClick={() => { toast.warning('Reversal initiated — this will post a compensating entry'); close(); }}>Reverse</Button>
        )}
        <Button variant="secondary" onClick={close}>Close</Button>
      </DrawerFooter>
    </>
  );
}

function riskDrawer(row: Row, close: () => void) {
  return (
    <>
      <DrawerHeader title={`Case ${row.id}`} subtitle={`${row.type} · ${row.player}`} badge={<Badge variant={row.severity === 'critical' || row.severity === 'high' ? 'red' : row.severity === 'medium' ? 'amber' : 'green'}>{String(row.severity)}</Badge>} />
      <DrawerBody>
        <DrawerSection title="Risk signals">
          <div className="flex flex-wrap gap-1.5">
            {(row.signals as string[]).map(s => <Badge key={s} variant="neutral">{s}</Badge>)}
          </div>
        </DrawerSection>
        <DrawerSection title="Case details">
          <FieldGrid fields={[
            { label: 'Player', value: String(row.player) },
            { label: 'Score', value: <RiskPill score={Number(row.score)} /> },
            { label: 'Assignee', value: String(row.assignee) },
            { label: 'Status', value: <StatusCell v={String(row.status)} /> },
            { label: 'Opened', value: fmtDate(String(row.opened), true), span: true },
          ]} />
        </DrawerSection>
      </DrawerBody>
      <DrawerFooter>
        <Button variant="secondary" onClick={() => { toast.info('Marked as false positive'); close(); }}>False positive</Button>
        <Button variant="danger" onClick={() => { toast.warning('Player suspended pending investigation'); close(); }}>Suspend player</Button>
        <Button onClick={() => { toast.success('Case resolved'); close(); }}>Resolve</Button>
      </DrawerFooter>
    </>
  );
}

function kycDrawer(row: Row, close: () => void) {
  return (
    <>
      <DrawerHeader title={String(row.docType)} subtitle={`${row.player} · submitted ${relTime(String(row.submitted))}`} badge={<StatusCell v={String(row.status)} />} />
      <DrawerBody>
        <div className="flex h-40 items-center justify-center rounded-adm border border-dashed border-adm-line2 bg-adm-inset/50 text-center">
          <div>
            <div className="text-2xl">🪪</div>
            <div className="mt-1 text-xs text-adm-dim">Document preview connects to the KYC provider</div>
          </div>
        </div>
        <DrawerSection title="Review details">
          <FieldGrid fields={[
            { label: 'Player', value: String(row.player) },
            { label: 'Player ID', value: String(row.playerId), mono: true },
            { label: 'Document', value: String(row.docType) },
            { label: 'Reviewer', value: String(row.reviewer) },
            { label: 'Note', value: String(row.note || '—'), span: true },
          ]} />
        </DrawerSection>
      </DrawerBody>
      <DrawerFooter>
        {row.status === 'pending' || row.status === 'escalated' ? (
          <>
            <Button variant="secondary" onClick={() => { toast.info('Re-request sent to player'); close(); }}>Request new</Button>
            <Button variant="danger" onClick={() => { toast.error('Document rejected'); close(); }}>Reject</Button>
            <Button variant="success" onClick={() => { toast.success('Document approved — KYC status updated'); close(); }}>Approve</Button>
          </>
        ) : <Button variant="secondary" onClick={close}>Close</Button>}
      </DrawerFooter>
    </>
  );
}

/* ------------------------------ spec types ------------------------------ */
export interface SettingsField { type: 'switch' | 'select' | 'text'; label: string; desc?: string; value: string | boolean; options?: string[] }
export interface SettingsGroup { title: string; desc?: string; fields: SettingsField[] }
export interface CardItem { id: string; title: string; desc?: string; icon?: string; image?: string; status?: string; metrics?: Array<{ label: string; value: string }>; action?: string }

export interface PageSpec {
  title: string;
  description: string;
  stats?: StatSpec[];
  charts?: ChartSpec[];
  table?: {
    source: (p: ListParams) => Promise<ListResult<Row>>;
    columns: Column<Row>[];
    filters?: FilterSpec[];
    bulkActions?: BulkAction[];
    rowDetail?: (row: Row, close: () => void) => React.ReactNode;
    rowLink?: (row: Row) => string;
    detailTitle?: (row: Row) => string;
    autoDetail?: boolean;
    exportName: string;
    searchPlaceholder?: string;
    defaultSort?: { key: string; dir: 'asc' | 'desc' };
  };
  settings?: SettingsGroup[];
  cards?: { columns?: number; items: CardItem[]; actionLabel?: string };
}

/* ------------------------------ page specs ------------------------------ */
const specs: Record<string, PageSpec> = {};

/* ===== Dashboard subsections ===== */
specs['dashboard/revenue'] = {
  title: 'Revenue',
  description: 'Gross gaming revenue trends, breakdown by stream and currency mix.',
  stats: [
    mstat('GGR (30d)', 'ggr', TrendingUp),
    mstat('NGR (30d)', 'ngr', LineChartIcon),
    mstat('Casino revenue (30d)', 'revenue', Coins),
    mstat('Bet volume (30d)', 'betVolume', Dice5),
  ],
  charts: [
    { kind: 'area', title: 'Revenue — last 90 days', money: true, data: CHART_DATA.revenue90, description: 'Daily GGR across casino & sportsbook' },
    { kind: 'bars', title: 'GGR vs NGR', money: true, data: CHART_DATA.ggr30, description: 'Net after bonuses, commissions & fees' },
  ],
};
specs['dashboard/player-activity'] = {
  title: 'Player Activity',
  description: 'Active players, registrations and engagement across the platform.',
  stats: [
    nstat('Active players (30d)', 'activePlayers', Users),
    nstat('New registrations (30d)', 'newPlayers', UserPlus),
    nstat('Bets placed (30d)', 'bets', Dice5),
    { label: 'Avg session length', value: '24m 18s', delta: 4.1, sub: 'vs prior 30 days', icon: Activity },
  ],
  charts: [
    { kind: 'area', title: 'Active & new players', data: CHART_DATA.players30, description: 'Daily actives vs first-time registrations' },
    { kind: 'rank', title: 'Most played games (7d)', money: false, rankItems: [...data.adminGames].sort((a, b) => b.launches - a.launches).slice(0, 8).map(g => ({ name: g.title, sub: g.provider, value: g.launches, image: g.image })) },
  ],
};
specs['dashboard/deposits'] = {
  title: 'Deposits',
  description: 'Deposit volume, success rates and payment-method mix.',
  stats: [
    mstat('Deposit volume (30d)', 'deposits', ArrowDownToLine),
    { label: 'Depositing players (30d)', value: '8,412', delta: 6.3, sub: '12.4% of actives', icon: Users, spark: spark('newPlayers') },
    { label: 'Avg deposit', value: '$312.44', delta: 2.4, sub: 'across 30 days', icon: Wallet },
    { label: 'Success rate', value: '97.2%', delta: 0.4, sub: 'all payment methods', icon: Gauge, color: '#34d399' },
  ],
  charts: [
    { kind: 'area', title: 'Deposit volume', money: true, data: D.slice(-30).map(d => ({ label: d.label, deposits: d.deposits })), description: 'Daily settled deposits' },
    { kind: 'donut', title: 'Deposits by method', money: true, description: '30-day share', donutData: data.paymentMethods.slice(0, 7).map(m => ({ name: m.name, value: m.volume30d })) },
  ],
  table: {
    source: src.deposits, exportName: 'deposits', searchPlaceholder: 'Search deposits…',
    filters: [txStatusFilter, methodFilter],
    columns: [id(), player(), money('amount', 'Amount'), { key: 'currency', label: 'Cur', render: r => <span className="font-mono text-xs text-adm-muted">{String(r.currency)}</span> }, { key: 'method', label: 'Method', render: r => <TextCell v={String(r.method)} /> }, status(), when('date', 'Date'), { key: 'reference', label: 'Reference', render: r => <IdCell v={String(r.reference)} />, hideBelow: 'lg' }],
    rowDetail: txDrawer, defaultSort: { key: 'date', dir: 'desc' },
  },
};
specs['dashboard/withdrawals'] = {
  title: 'Withdrawals',
  description: 'Payout volumes, queue health and processing performance.',
  stats: [
    mstat('Withdrawal volume (30d)', 'withdrawals', ArrowUpFromLine),
    { label: 'Pending queue', value: '8', delta: -12.5, sub: 'avg wait 41m', icon: Gauge, color: '#fbbf24' },
    { label: 'Auto-approved', value: '68.4%', delta: 3.2, sub: 'below risk threshold', icon: ShieldAlert, color: '#34d399' },
    { label: 'Avg payout', value: '$548.10', delta: -1.8, sub: 'across 30 days', icon: Wallet },
  ],
  charts: [
    { kind: 'area', title: 'Withdrawal volume', money: true, data: D.slice(-30).map(d => ({ label: d.label, withdrawals: d.withdrawals })), description: 'Daily paid-out withdrawals' },
    { kind: 'bars', title: 'Deposits vs withdrawals', money: true, data: CHART_DATA.depWith30, description: 'Net flow health' },
  ],
  table: {
    source: src.withdrawals, exportName: 'withdrawals', searchPlaceholder: 'Search withdrawals…',
    filters: [txStatusFilter, methodFilter],
    columns: [id(), player(), money('amount', 'Amount'), { key: 'method', label: 'Method', render: r => <TextCell v={String(r.method)} /> }, status(), when('date', 'Date')],
    rowDetail: txDrawer, defaultSort: { key: 'date', dir: 'desc' },
  },
};
specs['dashboard/bets'] = {
  title: 'Bets',
  description: 'Betting volume, counts and round economics.',
  stats: [
    nstat('Bets (30d)', 'bets', Dice5),
    mstat('Bet volume (30d)', 'betVolume', Coins),
    { label: 'Average bet', value: '$12.86', delta: 1.1, sub: 'all verticals', icon: Gauge },
    { label: 'Win rate (player)', value: '44.2%', delta: -0.6, sub: 'last 30 days', icon: Trophy, color: '#f2b93b' },
  ],
  charts: [
    { kind: 'area', title: 'Bets placed per day', data: CHART_DATA.bets30, description: 'Settled rounds across casino & sports' },
    { kind: 'rank', title: 'Top games by GGR (7d)', money: true, rankItems: [...data.adminGames].sort((a, b) => b.ggr7d - a.ggr7d).slice(0, 8).map(g => ({ name: g.title, sub: g.provider, value: g.ggr7d, image: g.image })) },
  ],
  table: {
    source: src.bets, exportName: 'bets', searchPlaceholder: 'Search bets…',
    filters: [{ key: 'result', label: 'Result', options: ['win', 'loss'] }],
    columns: [id('id'), player(), { key: 'game', label: 'Game', render: r => <span className="font-medium text-adm-text">{String(r.game)}</span> }, { key: 'provider', label: 'Provider', hideBelow: 'md', render: r => <TextCell v={String(r.provider)} /> }, money('amount', 'Stake'), money('payout', 'Payout'), { key: 'multiplier', label: 'Mult.', align: 'right', render: r => <span className="tnum text-adm-muted">{Number(r.multiplier).toFixed(2)}×</span> }, { key: 'result', label: 'Result', render: r => <StatusCell v={String(r.result)} /> }, when('time', 'Time')],
    defaultSort: { key: 'time', dir: 'desc' }, autoDetail: true, detailTitle: r => `Bet ${r.id}`,
  },
};
specs['dashboard/ggr-ngr'] = {
  title: 'GGR / NGR',
  description: 'Gross vs net gaming revenue with deduction breakdown.',
  stats: [
    mstat('GGR (30d)', 'ggr', TrendingUp),
    mstat('NGR (30d)', 'ngr', LineChartIcon),
    { label: 'NGR margin', value: '81.4%', delta: 0.9, sub: 'NGR ÷ GGR', icon: Percent },
    mstat('Bonus cost (30d)', 'profit', Gift, 30),
  ],
  charts: [
    { kind: 'area', title: 'GGR vs NGR — 90 days', money: true, data: CHART_DATA.ggr90, description: 'Deductions: bonuses, payment fees, royalties' },
    { kind: 'donut', title: 'GGR by category', money: true, description: '30-day share', donutData: ['Slots', 'Live Casino', 'Originals', 'Table Games', 'Sportsbook'].map((n, i) => ({ name: n, value: [4200000, 1850000, 1240000, 610000, 980000][i] })) },
  ],
};
specs['dashboard/profit-loss'] = {
  title: 'Profit & Loss',
  description: 'Operating result after platform costs, bonuses and commissions.',
  stats: [
    mstat('Net profit (30d)', 'profit', TrendingUp),
    mstat('Revenue (30d)', 'ngr', Coins),
    { label: 'Operating costs (30d)', value: fmtMoney(-2140000, 'USD', true), delta: -2.1, sub: 'fixed + variable', icon: Wallet, color: '#f4587a' },
    { label: 'EBITDA margin', value: '34.8%', delta: 1.6, sub: 'vs prior period', icon: Percent, color: '#f2b93b' },
  ],
  charts: [
    { kind: 'stacked', title: 'Revenue, costs & profit', money: true, data: CHART_DATA.pnl30, description: 'Daily operating result' },
    { kind: 'bars', title: 'Monthly P&L trend', money: true, data: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => ({ label: m, revenue: [21.4, 22.9, 24.1, 23.6, 26.2, 27.8][i] * 1e6, profit: [6.8, 7.4, 8.1, 7.6, 8.9, 9.7][i] * 1e6 })) },
  ],
};

/* ===== Players subsections ===== */
const suspendedPlayers = data.players.filter(p => p.status === 'suspended' || p.status === 'banned' || p.status === 'self-excluded');
const vipPlayers = data.players.filter(p => p.vipLevel >= 4).sort((a, b) => b.totalDeposits - a.totalDeposits);

specs['players/kyc'] = {
  title: 'KYC Verification',
  description: 'Review queue for identity documents, proof of address and source-of-funds checks.',
  stats: [
    { label: 'Pending review', value: String(data.kycDocs.filter(k => k.status === 'pending').length), delta: 8.2, sub: 'target < 24h', icon: Gauge, color: '#fbbf24' },
    { label: 'Approved (7d)', value: '312', delta: 12.4, sub: '93.1% first-pass', icon: Users, color: '#34d399' },
    { label: 'Rejected (7d)', value: '23', delta: -4.1, sub: 'mostly expired docs', icon: ShieldAlert, color: '#f4587a' },
    { label: 'Avg review time', value: '3h 42m', delta: -11.5, sub: 'submission → decision', icon: Activity },
  ],
  table: {
    source: src.kycDocs, exportName: 'kyc-queue', searchPlaceholder: 'Search by player or document…',
    filters: [
      { key: 'status', label: 'Status', options: ['pending', 'approved', 'rejected', 'escalated'] },
      { key: 'docType', label: 'Document', options: Array.from(new Set(data.kycDocs.map(k => k.docType))) },
    ],
    columns: [id(), player(), { key: 'docType', label: 'Document', render: r => <span className="font-medium text-adm-text">{String(r.docType)}</span> }, when('submitted', 'Submitted'), { key: 'reviewer', label: 'Reviewer', hideBelow: 'md', render: r => <TextCell v={String(r.reviewer)} /> }, status(), { key: 'note', label: 'Note', hideBelow: 'lg', render: r => <span className="max-w-[220px] truncate text-adm-muted">{String(r.note || '—')}</span> }],
    rowDetail: kycDrawer, defaultSort: { key: 'submitted', dir: 'desc' },
  },
};
specs['players/vip'] = {
  title: 'VIP Management',
  description: 'High-value player book: balances, lifetime value and VIP tier progression.',
  stats: [
    { label: 'VIP players', value: String(vipPlayers.length), delta: 5.4, sub: 'Gold tier and above', icon: Crown, color: '#f2b93b' },
    { label: 'VIP deposits (30d)', value: fmtMoney(vipPlayers.reduce((a, p) => a + p.totalDeposits, 0) * 0.14, 'USD', true), delta: 9.1, sub: '41% of total', icon: ArrowDownToLine, color: '#34d399' },
    { label: 'Avg VIP balance', value: fmtMoney(vipPlayers.reduce((a, p) => a + p.balance, 0) / vipPlayers.length, 'USD', true), delta: 3.2, sub: 'across book', icon: Wallet },
    { label: 'Churn risk', value: String(vipPlayers.filter(p => p.tags.includes('churn-risk')).length), delta: -2.0, sub: 'flagged this week', icon: ShieldAlert, color: '#f4587a' },
  ],
  charts: [
    { kind: 'donut', title: 'VIP tier distribution', description: 'Players Gold+', donutData: ['Gold', 'Platinum', 'Diamond I', 'Diamond II', 'Diamond III', 'Royal'].map((n, i) => ({ name: n, value: vipPlayers.filter(p => p.vipName === n).length || (i + 1) * 2 })) },
    { kind: 'rank', title: 'Top VIPs by deposits', money: true, rankItems: vipPlayers.slice(0, 7).map(p => ({ name: p.username, sub: p.vipName, value: p.totalDeposits })) },
  ],
  table: {
    source: staticSrc(vipPlayers as unknown as Row[]), exportName: 'vip-players', searchPlaceholder: 'Search VIP players…',
    filters: [{ key: 'vipName', label: 'Tier', options: ['Gold', 'Platinum', 'Diamond I', 'Diamond II', 'Diamond III', 'Royal'] }],
    columns: [player(), { key: 'vipName', label: 'Tier', render: r => <Badge variant="gold">{String(r.vipName)}</Badge> }, money('balance', 'Balance'), money('totalDeposits', 'Deposits'), money('ggr', 'GGR'), when('lastLogin', 'Last login'), status()],
    rowLink: r => `/admin/players/${r.id}`, defaultSort: { key: 'totalDeposits', dir: 'desc' },
  },
};
specs['players/segmentation'] = {
  title: 'Player Segmentation',
  description: 'Dynamic segments used for campaigns, risk policies and personalization.',
  stats: [
    { label: 'Active segments', value: '14', delta: 2, sub: '3 updated today', icon: Users },
    { label: 'Players segmented', value: '96,412', delta: 4.4, sub: '99.2% coverage', icon: Gauge },
    { label: 'Largest segment', value: 'Casual slots', sub: '31% of base', icon: Dice5 },
  ],
  charts: [
    { kind: 'donut', title: 'Players by value tier', description: 'LTV bands', donutData: [{ name: 'Whales ($50K+)', value: 320 }, { name: 'High ($10-50K)', value: 2900 }, { name: 'Mid ($1-10K)', value: 18400 }, { name: 'Low (<$1K)', value: 74800 }] },
    { kind: 'donut', title: 'Players by behavior', description: 'Last 30 days', donutData: [{ name: 'Slots', value: 41 }, { name: 'Live casino', value: 22 }, { name: 'Sports', value: 19 }, { name: 'Originals', value: 12 }, { name: 'Mixed', value: 6 }] },
  ],
  table: {
    source: staticSrc([
      { id: 'SEG-1', name: 'New registrations (7d)', definition: 'registered_at >= now()-7d', players: 1214, updated: new Date(Date.now() - 3600e3).toISOString(), status: 'active' },
      { id: 'SEG-2', name: 'Dormant 30-60d', definition: 'last_login between 30d and 60d', players: 8420, updated: new Date(Date.now() - 7200e3).toISOString(), status: 'active' },
      { id: 'SEG-3', name: 'High rollers', definition: 'avg_bet >= $250 AND bets >= 20', players: 412, updated: new Date(Date.now() - 1800e3).toISOString(), status: 'active' },
      { id: 'SEG-4', name: 'Bonus abusers (suspected)', definition: 'bonus_redeems >= 5 AND ggr < 0', players: 87, updated: new Date(Date.now() - 600e3).toISOString(), status: 'active' },
      { id: 'SEG-5', name: 'Crypto-only depositors', definition: 'deposit_methods subset crypto', players: 21840, updated: new Date(Date.now() - 86400e3).toISOString(), status: 'active' },
      { id: 'SEG-6', name: 'FTD pending', definition: 'registered AND deposits == 0', players: 5320, updated: new Date(Date.now() - 5400e3).toISOString(), status: 'active' },
      { id: 'SEG-7', name: 'Self-excluded expiring', definition: 'exclusion_end <= now()+14d', players: 34, updated: new Date(Date.now() - 172800e3).toISOString(), status: 'paused' },
      { id: 'SEG-8', name: 'Weekend warriors', definition: '80% of bets on Sat/Sun', players: 6120, updated: new Date(Date.now() - 259200e3).toISOString(), status: 'active' },
    ]),
    exportName: 'segments', searchPlaceholder: 'Search segments…',
    filters: [{ key: 'status', label: 'Status', options: ['active', 'paused'] }],
    columns: [id(), { key: 'name', label: 'Segment', render: r => <span className="font-medium text-adm-text">{String(r.name)}</span> }, { key: 'definition', label: 'Definition', hideBelow: 'md', render: r => <span className="font-mono text-[11px] text-adm-dim">{String(r.definition)}</span> }, num('players', 'Players'), when('updated', 'Updated'), status()],
    autoDetail: true, detailTitle: r => String(r.name),
  },
};
specs['players/activity'] = {
  title: 'Player Activity',
  description: 'Live and recent player sessions across devices.',
  stats: [
    { label: 'Online now', value: '3,214', delta: 12.8, sub: 'peak 6,120 at 20:00', icon: Users, color: '#34d399' },
    { label: 'Sessions (24h)', value: '18,240', delta: 6.4, icon: Activity },
    { label: 'Avg session', value: '24m 18s', delta: 4.1, icon: Gauge },
    { label: 'Mobile share', value: '64.2%', delta: 2.3, sub: 'of sessions', icon: Dice5 },
  ],
  table: {
    source: staticSrc(data.sessions as unknown as Row[]), exportName: 'sessions', searchPlaceholder: 'Search sessions…',
    filters: [{ key: 'geoMatch', label: 'Geo match', options: ['true', 'false'] }],
    columns: [player(), { key: 'device', label: 'Device', render: r => <TextCell v={String(r.device)} /> }, { key: 'ip', label: 'IP', hideBelow: 'md', render: r => <IdCell v={String(r.ip)} /> }, { key: 'location', label: 'Location', hideBelow: 'md', render: r => <TextCell v={String(r.location)} /> }, num('durationMin', 'Duration (m)'), money('wagered', 'Wagered'), when('started', 'Started')],
    autoDetail: true, detailTitle: r => `Session ${r.id}`, defaultSort: { key: 'started', dir: 'desc' },
  },
};
specs['players/login-history'] = {
  title: 'Login & Device History',
  description: 'Authentication events, device fingerprints and geo signals.',
  stats: [
    { label: 'Logins (24h)', value: '24,918', delta: 7.2, icon: Users },
    { label: 'Failed attempts', value: '312', delta: -14.2, sub: '1.25% of attempts', icon: ShieldAlert, color: '#f4587a' },
    { label: 'New devices (24h)', value: '1,842', delta: 3.9, icon: Activity },
    { label: 'VPN detected', value: String(data.sessions.filter(s => s.vpn).length), delta: 18.0, sub: 'routed to risk queue', icon: Gauge, color: '#fbbf24' },
  ],
  table: {
    source: staticSrc(data.sessions as unknown as Row[]), exportName: 'login-history', searchPlaceholder: 'Search logins…',
    columns: [player(), { key: 'device', label: 'Device', render: r => <TextCell v={String(r.device)} /> }, { key: 'ip', label: 'IP address', render: r => <IdCell v={String(r.ip)} /> }, { key: 'location', label: 'Location', hideBelow: 'md', render: r => <TextCell v={String(r.location)} /> }, { key: 'vpn', label: 'VPN', hideBelow: 'md', render: r => r.vpn ? <Badge variant="red">VPN</Badge> : <Badge variant="green">Clean</Badge> }, when('started', 'Login time')],
    autoDetail: true, detailTitle: r => `Login event ${r.id}`, defaultSort: { key: 'started', dir: 'desc' },
  },
};
specs['players/transactions'] = {
  title: 'Player Transaction History',
  description: 'Cross-player ledger of deposits, withdrawals, bonuses and adjustments.',
  stats: [
    { label: 'Transactions (24h)', value: '9,412', delta: 5.8, icon: Wallet },
    mstat('Volume (30d)', 'deposits', ArrowDownToLine),
    { label: 'Reversals (7d)', value: '18', delta: -10.0, icon: ArrowUpFromLine, color: '#f4587a' },
  ],
  table: {
    source: src.transactions, exportName: 'player-transactions', searchPlaceholder: 'Search by player, ID, reference…',
    filters: [txStatusFilter, { key: 'type', label: 'Type', options: ['deposit', 'withdrawal', 'bonus', 'adjustment', 'chargeback'] }, methodFilter],
    columns: [id(), player(), { key: 'type', label: 'Type', render: r => <Badge variant={r.type === 'deposit' ? 'green' : r.type === 'withdrawal' ? 'amber' : 'neutral'}>{String(r.type)}</Badge> }, money('amount', 'Amount'), { key: 'currency', label: 'Cur', render: r => <span className="font-mono text-xs text-adm-muted">{String(r.currency)}</span> }, { key: 'method', label: 'Method', hideBelow: 'md', render: r => <TextCell v={String(r.method)} /> }, status(), when('date', 'Date')],
    rowDetail: txDrawer, defaultSort: { key: 'date', dir: 'desc' },
  },
};
specs['players/betting-history'] = {
  title: 'Betting History',
  description: 'Every settled and in-flight round across all players.',
  stats: [
    nstat('Rounds (30d)', 'bets', Dice5),
    mstat('Volume (30d)', 'betVolume', Coins),
    { label: 'Largest win (7d)', value: '$84,120', sub: 'Gates of Olympus', icon: Trophy, color: '#f2b93b' },
  ],
  table: {
    source: src.bets, exportName: 'betting-history', searchPlaceholder: 'Search bets…',
    filters: [{ key: 'result', label: 'Result', options: ['win', 'loss'] }, { key: 'provider', label: 'Provider', options: Array.from(new Set(data.bets.map(b => b.provider))).slice(0, 10) }],
    columns: [id('id'), player(), { key: 'game', label: 'Game', render: r => <span className="font-medium text-adm-text">{String(r.game)}</span> }, money('amount', 'Stake'), money('payout', 'Payout'), { key: 'result', label: 'Result', render: r => <StatusCell v={String(r.result)} /> }, when('time', 'Time')],
    autoDetail: true, detailTitle: r => `Bet ${r.id}`, defaultSort: { key: 'time', dir: 'desc' },
  },
};
specs['players/responsible-gaming'] = {
  title: 'Responsible Gaming',
  description: 'Self-exclusions, cool-offs and player protection limits.',
  stats: [
    { label: 'Active exclusions', value: String(data.selfExclusions.length + 38), delta: 4.2, sub: 'all jurisdictions', icon: ShieldAlert, color: '#f4587a' },
    { label: 'Deposit limits set', value: '1,284', delta: 9.4, sub: 'last 30 days', icon: Wallet, color: '#34d399' },
    { label: 'Reality checks', value: '6,420', delta: 12.0, sub: 'session reminders shown', icon: Activity },
    { label: 'Support referrals', value: '42', delta: 6.1, sub: 'to help organizations', icon: Users },
  ],
  table: {
    source: staticSrc(data.selfExclusions as unknown as Row[]), exportName: 'self-exclusions', searchPlaceholder: 'Search exclusions…',
    filters: [{ key: 'type', label: 'Type', options: ['Self-exclusion', 'Cool-off', 'Operator exclusion'] }],
    columns: [player(), { key: 'type', label: 'Type', render: r => <Badge variant={r.type === 'Self-exclusion' ? 'red' : 'amber'}>{String(r.type)}</Badge> }, when('started', 'Started'), { key: 'until', label: 'Until', render: r => String(r.until).startsWith('20') ? <TextCell v={fmtDate(String(r.until))} /> : <Badge variant="red">Permanent</Badge> }, { key: 'jurisdiction', label: 'Jurisdiction', hideBelow: 'md', render: r => <TextCell v={String(r.jurisdiction)} /> }],
    autoDetail: true, detailTitle: r => `${r.type} — ${r.player}`, defaultSort: { key: 'started', dir: 'desc' },
  },
};
specs['players/suspensions'] = {
  title: 'Suspensions & Bans',
  description: 'Accounts restricted by risk, compliance or abuse decisions.',
  stats: [
    { label: 'Suspended', value: String(suspendedPlayers.filter(p => p.status === 'suspended').length), delta: 2.1, icon: ShieldAlert, color: '#fbbf24' },
    { label: 'Banned', value: String(suspendedPlayers.filter(p => p.status === 'banned').length), delta: 0, icon: ShieldAlert, color: '#f4587a' },
    { label: 'Self-excluded', value: String(suspendedPlayers.filter(p => p.status === 'self-excluded').length), delta: 4.4, icon: Users },
    { label: 'Funds held', value: fmtMoney(suspendedPlayers.reduce((a, p) => a + p.balance, 0), 'USD', true), sub: 'pending review', icon: Wallet },
  ],
  table: {
    source: staticSrc(suspendedPlayers as unknown as Row[]), exportName: 'suspensions', searchPlaceholder: 'Search restricted accounts…',
    filters: [{ key: 'status', label: 'Status', options: ['suspended', 'banned', 'self-excluded'] }],
    columns: [player(), status(), money('balance', 'Balance'), money('totalDeposits', 'Deposits'), { key: 'risk', label: 'Risk', render: r => <RiskPill level={String(r.risk)} /> }, when('lastLogin', 'Last login'), when('registeredAt', 'Registered')],
    bulkActions: [
      { label: 'Reinstate', variant: 'secondary', onClick: rows => toast.success(`${rows.length} account(s) reinstated`) },
      { label: 'Escalate', onClick: rows => toast.info(`${rows.length} account(s) escalated to compliance`) },
    ],
    rowLink: r => `/admin/players/${r.id}`, defaultSort: { key: 'lastLogin', dir: 'desc' },
  },
};
specs['players/notes'] = {
  title: 'Notes & Internal Tags',
  description: 'Support and risk annotations attached to player accounts.',
  stats: [
    { label: 'Notes (7d)', value: '214', delta: 8.8, icon: Users },
    { label: 'Tagged players', value: String(data.players.filter(p => p.tags.length > 0).length), delta: 3.2, icon: Gauge },
    { label: 'Escalations open', value: '9', delta: -2, sub: 'need follow-up', icon: ShieldAlert, color: '#fbbf24' },
  ],
  table: {
    source: staticSrc(data.players.filter(p => p.tags.length > 0) as unknown as Row[]), exportName: 'player-notes', searchPlaceholder: 'Search by tag or player…',
    columns: [player(), { key: 'tags', label: 'Tags', render: r => <span className="flex gap-1">{(r.tags as string[]).slice(0, 3).map(t => <Badge key={t} variant="default">{t}</Badge>)}</span> }, { key: 'note', label: 'Latest note', hideBelow: 'md', render: r => <span className="max-w-[280px] truncate text-adm-muted">{noteFor(String(r.username))}</span> }, when('lastLogin', 'Last activity')],
    rowLink: r => `/admin/players/${r.id}`,
  },
};
function noteFor(seed: string) {
  const notes = [
    'Called about pending withdrawal — reassured ETA 2h.',
    'Requested source-of-funds documents, uploaded same day.',
    'Bonus terms dispute resolved, goodwill spins issued.',
    'Suspected multi-accounting; device fingerprint shared with risk.',
    'VIP host contacted for birthday bonus.',
    'Chargeback threat after losing streak; cooldown applied.',
  ];
  let h = 0; for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return notes[h % notes.length];
}

/* ===== Casino subsections ===== */
specs['casino/providers'] = {
  title: 'Game Providers',
  description: 'Studio integrations, revenue share and catalog health.',
  stats: [
    { label: 'Active providers', value: String(data.providers.filter(p => p.status === 'enabled').length), delta: 1, icon: Dice5 },
    { label: 'Games live', value: fmtNum(data.adminGames.length * 112), delta: 2.4, sub: 'across all studios', icon: Trophy },
    { label: 'Avg uptime (30d)', value: '99.62%', delta: 0.1, icon: Gauge, color: '#34d399' },
    mstat('Provider GGR (30d)', 'ggr', TrendingUp),
  ],
  charts: [
    { kind: 'rank', title: 'Top providers by GGR (30d)', money: true, rankItems: [...data.providers].sort((a, b) => b.ggr30d - a.ggr30d).slice(0, 8).map(p => ({ name: p.name, sub: `${p.games} games`, value: p.ggr30d })) },
    { kind: 'donut', title: 'GGR share by provider', money: true, description: 'Top 6', donutData: [...data.providers].sort((a, b) => b.ggr30d - a.ggr30d).slice(0, 6).map(p => ({ name: p.name, value: p.ggr30d })) },
  ],
  table: {
    source: src.providers, exportName: 'providers', searchPlaceholder: 'Search providers…',
    filters: [{ key: 'status', label: 'Status', options: ['enabled', 'disabled'] }],
    columns: [{ key: 'name', label: 'Provider', render: r => <span className="font-medium text-adm-text">{String(r.name)}</span> }, num('games', 'Games'), { key: 'revenueShare', label: 'Rev share', align: 'right', sortable: true, render: r => <span className="tnum text-adm-muted">{String(r.revenueShare)}%</span> }, money('ggr30d', 'GGR (30d)'), num('bets30d', 'Bets (30d)', { hideBelow: 'md' }), { key: 'availability', label: 'Uptime', hideBelow: 'md', render: r => <span className={`tnum ${Number(r.availability) > 99 ? 'text-adm-green' : 'text-adm-amber'}`}>{String(r.availability)}%</span> }, status()],
    autoDetail: true, detailTitle: r => String(r.name), defaultSort: { key: 'ggr30d', dir: 'desc' },
  },
};
specs['casino/categories'] = {
  title: 'Game Categories',
  description: 'Lobby taxonomy shown to players, with ordering and visibility controls.',
  cards: {
    columns: 3,
    actionLabel: 'New category',
    items: ['Slots', 'Live Casino', 'Originals', 'Table Games', 'Game Shows', 'Instant Win', 'New Releases', 'Popular', 'Jackpots'].map((name, i) => ({
      id: `CAT-${i + 1}`, title: name, icon: ['🎰', '🃏', '🎲', '♠️', '📺', '⚡', '✨', '🔥', '💰'][i],
      desc: `${data.adminGames.filter(g => g.category === name).length || (i + 2) * 14} games · position ${i + 1}`,
      status: i < 8 ? 'live' : 'draft',
      metrics: [
        { label: 'Games', value: String(data.adminGames.filter(g => g.category === name).length || (i + 2) * 14) },
        { label: 'CTR', value: `${(2 + i * 0.7).toFixed(1)}%` },
        { label: 'GGR 7d', value: fmtMoney(420000 - i * 38000, 'USD', true) },
      ],
    })),
  },
};
specs['casino/configuration'] = {
  title: 'Game Configuration',
  description: 'Per-game settings: limits, turbo mode, free-round purchases and jurisdiction rules.',
  stats: [
    { label: 'Configured games', value: fmtNum(data.adminGames.length), delta: 1.2, icon: Dice5 },
    { label: 'Overrides active', value: '38', delta: 4, sub: 'jurisdiction-specific', icon: Gauge },
    { label: 'Pending provider sync', value: '3', delta: -2, icon: Activity, color: '#fbbf24' },
  ],
  table: {
    source: src.games, exportName: 'game-config', searchPlaceholder: 'Search games…',
    filters: [{ key: 'category', label: 'Category', options: Array.from(new Set(data.adminGames.map(g => g.category))) }],
    columns: [{ key: 'title', label: 'Game', render: r => <span className="flex items-center gap-2"><img src={String(r.image)} alt="" className="h-7 w-7 rounded-md object-cover ring-1 ring-white/10" loading="lazy" /><span className="font-medium text-adm-text">{String(r.title)}</span></span> }, { key: 'provider', label: 'Provider', render: r => <TextCell v={String(r.provider)} /> }, { key: 'rtp', label: 'RTP', align: 'right', sortable: true, render: r => <span className="tnum text-adm-muted">{String(r.rtp)}%</span> }, { key: 'featured', label: 'Featured', render: r => r.featured ? <Badge variant="gold">Featured</Badge> : <Badge variant="neutral">Standard</Badge> }, status()],
    autoDetail: true, detailTitle: r => `${r.title} — configuration`, defaultSort: { key: 'popularity', dir: 'desc' },
  },
};
specs['casino/availability'] = {
  title: 'Game Availability',
  description: 'Jurisdiction and currency availability matrix per provider.',
  stats: [
    { label: 'Markets served', value: '24', delta: 0, icon: Users },
    { label: 'Geo-blocked games', value: '142', delta: -6, sub: 'by licensing rules', icon: ShieldAlert },
    { label: 'Uptime (30d)', value: '99.62%', delta: 0.1, icon: Gauge, color: '#34d399' },
  ],
  table: {
    source: src.providers, exportName: 'availability', searchPlaceholder: 'Search providers…',
    columns: [{ key: 'name', label: 'Provider', render: r => <span className="font-medium text-adm-text">{String(r.name)}</span> }, { key: 'availability', label: 'Uptime', sortable: true, render: r => <span className={`tnum ${Number(r.availability) > 99 ? 'text-adm-green' : 'text-adm-amber'}`}>{String(r.availability)}%</span> }, { key: 'regions', label: 'Regions', hideBelow: 'md', render: () => <span className="text-adm-muted">EU · LATAM · APAC</span> }, { key: 'currencies', label: 'Currencies', hideBelow: 'lg', render: () => <span className="font-mono text-xs text-adm-muted">USD EUR BTC ETH USDT</span> }, status(), { key: 'aggregated', label: 'Integration', render: r => <Badge variant={r.aggregated ? 'default' : 'neutral'}>{r.aggregated ? 'Aggregator' : 'Direct'}</Badge> }],
    autoDetail: true, detailTitle: r => `${r.name} — availability`,
  },
};
specs['casino/featured'] = {
  title: 'Featured Games',
  description: 'Curated rail on the casino homepage. Drag ordering lives in Game Ordering.',
  stats: [
    { label: 'Featured now', value: String(data.adminGames.filter(g => g.featured).length), delta: 2, icon: Trophy, color: '#f2b93b' },
    { label: 'Rail CTR', value: '8.4%', delta: 1.2, icon: Gauge },
    { label: 'Rail → launch', value: '31.2%', delta: 2.8, sub: 'conversion', icon: Dice5 },
  ],
  table: {
    source: staticSrc(data.adminGames.filter(g => g.featured) as unknown as Row[]), exportName: 'featured-games', searchPlaceholder: 'Search featured…',
    columns: [{ key: 'title', label: 'Game', render: r => <span className="flex items-center gap-2"><img src={String(r.image)} alt="" className="h-8 w-8 rounded-md object-cover ring-1 ring-white/10" loading="lazy" /><span className="font-medium text-adm-text">{String(r.title)}</span></span> }, { key: 'provider', label: 'Provider', render: r => <TextCell v={String(r.provider)} /> }, num('popularity', 'Popularity'), num('launches', 'Launches'), money('ggr7d', 'GGR (7d)'), { key: 'featured', label: 'Featured', render: () => <Badge variant="gold">Featured</Badge> }],
    bulkActions: [{ label: 'Unfeature', variant: 'secondary', onClick: rows => toast.success(`${rows.length} game(s) removed from featured rail`) }],
    autoDetail: true, detailTitle: r => String(r.title), defaultSort: { key: 'popularity', dir: 'desc' },
  },
};
specs['casino/ordering'] = {
  title: 'Game Ordering',
  description: 'Control the default lobby order. Changes publish to the CDN within 60 seconds.',
  stats: [
    { label: 'Ordered entries', value: fmtNum(data.adminGames.length), icon: Dice5 },
    { label: 'Pinned', value: '12', delta: 1, icon: Trophy, color: '#f2b93b' },
    { label: 'Last publish', value: '24m ago', icon: Activity },
  ],
  table: {
    source: src.games, exportName: 'game-order', searchPlaceholder: 'Search games…',
    filters: [{ key: 'category', label: 'Category', options: Array.from(new Set(data.adminGames.map(g => g.category))) }],
    columns: [
      { key: 'order', label: '#', sortable: true, align: 'center', render: r => <span className="tnum font-mono text-xs text-adm-dim">{String(Number(r.order) + 1).padStart(3, '0')}</span> },
      { key: 'title', label: 'Game', render: r => <span className="flex items-center gap-2"><img src={String(r.image)} alt="" className="h-7 w-7 rounded-md object-cover ring-1 ring-white/10" loading="lazy" /><span className="font-medium text-adm-text">{String(r.title)}</span></span> },
      { key: 'category', label: 'Category', render: r => <Badge variant="neutral">{String(r.category)}</Badge> },
      num('popularity', 'Popularity'),
      { key: 'move', label: 'Move', align: 'center', render: () => (
        <span className="flex justify-center gap-1" onClick={e => e.stopPropagation()}>
          <Button variant="ghost" size="iconSm" aria-label="Move up" onClick={() => toast.success('Moved up — publish pending')}><span className="text-xs">▲</span></Button>
          <Button variant="ghost" size="iconSm" aria-label="Move down" onClick={() => toast.success('Moved down — publish pending')}><span className="text-xs">▼</span></Button>
        </span>
      ) },
    ],
    defaultSort: { key: 'order', dir: 'asc' },
  },
};
specs['casino/rtp'] = {
  title: 'RTP Configuration',
  description: 'Theoretical return-to-player per game. Overrides require dual approval.',
  stats: [
    { label: 'Avg RTP', value: '96.1%', delta: 0.1, icon: Percent },
    { label: 'Overrides active', value: '6', delta: 1, sub: 'jurisdiction scoped', icon: Gauge, color: '#fbbf24' },
    { label: 'Below 94%', value: String(data.adminGames.filter(g => g.rtp < 94).length), sub: 'flagged for review', icon: ShieldAlert, color: '#f4587a' },
  ],
  table: {
    source: src.games, exportName: 'rtp-config', searchPlaceholder: 'Search games…',
    filters: [{ key: 'provider', label: 'Provider', options: Array.from(new Set(data.adminGames.map(g => g.provider))).slice(0, 12) }],
    columns: [{ key: 'title', label: 'Game', render: r => <span className="font-medium text-adm-text">{String(r.title)}</span> }, { key: 'provider', label: 'Provider', render: r => <TextCell v={String(r.provider)} /> }, { key: 'rtp', label: 'RTP', sortable: true, align: 'right', render: r => <span className={`tnum font-medium ${Number(r.rtp) < 94 ? 'text-adm-red' : Number(r.rtp) < 95.5 ? 'text-adm-amber' : 'text-adm-green'}`}>{String(r.rtp)}%</span> }, { key: 'range', label: 'Allowed range', hideBelow: 'md', render: () => <span className="tnum text-xs text-adm-dim">94.0% – 97.8%</span> }, status()],
    autoDetail: true, detailTitle: r => `${r.title} — RTP`, defaultSort: { key: 'rtp', dir: 'asc' },
  },
};
specs['casino/jackpots'] = {
  title: 'Jackpots',
  description: 'Network and local jackpot pools, contribution rates and recent hits.',
  stats: [
    { label: 'Total pool', value: fmtMoney(data.jackpots.reduce((a, j) => a + j.amount, 0), 'USD', true), delta: 3.4, icon: Trophy, color: '#f2b93b' },
    { label: 'Active pools', value: String(data.jackpots.filter(j => j.status === 'running').length), icon: Dice5 },
    { label: 'Last hit', value: '$412,800', sub: 'Mega Fortune Wheel', icon: Activity },
  ],
  table: {
    source: staticSrc(data.jackpots as unknown as Row[]), exportName: 'jackpots', searchPlaceholder: 'Search jackpots…',
    filters: [{ key: 'status', label: 'Status', options: ['running', 'paused'] }],
    columns: [{ key: 'name', label: 'Jackpot', render: r => <span className="font-medium text-adm-text">💰 {String(r.name)}</span> }, { key: 'provider', label: 'Provider', render: r => <TextCell v={String(r.provider)} /> }, money('amount', 'Current pool'), money('seed', 'Seed'), { key: 'contribution', label: 'Contrib.', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.contribution)}%</span> }, when('lastWon', 'Last won'), status()],
    autoDetail: true, detailTitle: r => String(r.name), defaultSort: { key: 'amount', dir: 'desc' },
  },
};
specs['casino/analytics'] = {
  title: 'Game Analytics',
  description: 'Performance deep-dive: launches, hold, and engagement per title.',
  charts: [
    { kind: 'rank', title: 'Top games by GGR (7d)', money: true, rankItems: [...data.adminGames].sort((a, b) => b.ggr7d - a.ggr7d).slice(0, 9).map(g => ({ name: g.title, sub: g.provider, value: g.ggr7d, image: g.image })) },
    { kind: 'donut', title: 'Launches by category', description: 'Last 7 days', donutData: ['Slots', 'Live Casino', 'Originals', 'Table Games', 'Game Shows', 'Instant Win'].map((n, i) => ({ name: n, value: [48200, 21400, 18800, 9400, 7200, 3100][i] })) },
  ],
  table: {
    source: src.games, exportName: 'game-analytics', searchPlaceholder: 'Search games…',
    filters: [{ key: 'category', label: 'Category', options: Array.from(new Set(data.adminGames.map(g => g.category))) }],
    columns: [{ key: 'title', label: 'Game', render: r => <span className="flex items-center gap-2"><img src={String(r.image)} alt="" className="h-7 w-7 rounded-md object-cover ring-1 ring-white/10" loading="lazy" /><span className="font-medium text-adm-text">{String(r.title)}</span></span> }, num('launches', 'Launches'), money('ggr7d', 'GGR (7d)'), num('popularity', 'Popularity'), { key: 'rtp', label: 'RTP', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.rtp)}%</span> }, status()],
    autoDetail: true, detailTitle: r => `${r.title} — analytics`, defaultSort: { key: 'ggr7d', dir: 'desc' },
  },
};

/* ===== Sportsbook subsections ===== */
const liveEvents = data.sportsEvents.filter(e => e.status === 'live');
const suspendedEvents = data.sportsEvents.filter(e => e.suspended);

specs['sportsbook/sports'] = {
  title: 'Sports',
  description: 'Vertical-level health: coverage, margins and trading load.',
  cards: {
    columns: 3,
    actionLabel: 'Add sport',
    items: ['Soccer', 'Basketball', 'Tennis', 'American Football', 'Baseball', 'MMA', 'Esports', 'Cricket', 'Ice Hockey'].map((s, i) => ({
      id: `SP-${i + 1}`, title: s, icon: ['⚽', '🏀', '🎾', '🏈', '⚾', '🥊', '🎮', '🏏', '🏒'][i],
      desc: `${data.sportsEvents.filter(e => e.sport === s).length * 14} events this week`,
      status: i < 8 ? 'active' : 'paused',
      metrics: [
        { label: 'Events', value: String(data.sportsEvents.filter(e2 => e2.sport === s).length * 14) },
        { label: 'Margin', value: `${(4 + i * 0.4).toFixed(1)}%` },
        { label: 'Handle 7d', value: fmtMoney(1900000 - i * 170000, 'USD', true) },
      ],
    })),
  },
};
specs['sportsbook/events'] = {
  title: 'Events',
  description: 'All fixtures across sports with market counts and margin controls.',
  stats: [
    { label: 'Events today', value: String(data.sportsEvents.length * 6), delta: 4.4, icon: Trophy },
    { label: 'Live now', value: String(liveEvents.length * 9), delta: 12.0, icon: Activity, color: '#34d399' },
    { label: 'Avg margin', value: '5.2%', delta: -0.2, icon: Percent },
    { label: 'Suspended', value: String(suspendedEvents.length), delta: 1, icon: ShieldAlert, color: '#fbbf24' },
  ],
  table: {
    source: src.events, exportName: 'events', searchPlaceholder: 'Search events, teams, leagues…',
    filters: [
      { key: 'status', label: 'Status', options: ['live', 'upcoming', 'finished'] },
      { key: 'sport', label: 'Sport', options: Array.from(new Set(data.sportsEvents.map(e => e.sport))) },
    ],
    columns: [id(), { key: 'match', label: 'Event', render: r => <span className="font-medium text-adm-text">{String(r.home)} vs {String(r.away)}</span> }, { key: 'sport', label: 'Sport', render: r => <Badge variant="neutral">{String(r.sport)}</Badge> }, { key: 'league', label: 'League', hideBelow: 'md', render: r => <TextCell v={String(r.league)} /> }, num('markets', 'Markets'), { key: 'margin', label: 'Margin', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.margin)}%</span> }, when('starts', 'Starts'), status()],
    autoDetail: true, detailTitle: r => `${r.home} vs ${r.away}`, defaultSort: { key: 'starts', dir: 'desc' },
  },
};
specs['sportsbook/markets'] = {
  title: 'Markets',
  description: 'Market templates and per-event availability.',
  stats: [
    { label: 'Market types', value: '214', delta: 3, icon: Trophy },
    { label: 'Open markets', value: '12,480', delta: 6.2, icon: Activity },
    { label: 'Avg selections', value: '4.8', icon: Gauge },
  ],
  table: {
    source: staticSrc(['Match Winner', 'Over/Under 2.5', 'Both Teams to Score', 'Double Chance', 'Asian Handicap', 'Correct Score', 'First Goalscorer', 'Corners O/U', 'Player Points', 'Moneyline', 'Spread', 'Total Sets', 'Round Winner', 'Map Winner', 'Race to 10'].map((m, i) => ({
      id: `MKT-${100 + i}`, market: m, sport: ['Soccer', 'Soccer', 'Soccer', 'Soccer', 'Soccer', 'Soccer', 'Soccer', 'Soccer', 'Basketball', 'Basketball', 'Basketball', 'Tennis', 'MMA', 'Esports', 'Esports'][i],
      events: (i + 2) * 137, margin: 3.8 + i * 0.3, status: i === 7 || i === 12 ? 'suspended' : 'active',
    }))),
    exportName: 'markets', searchPlaceholder: 'Search markets…',
    filters: [{ key: 'status', label: 'Status', options: ['active', 'suspended'] }],
    columns: [{ key: 'market', label: 'Market', render: r => <span className="font-medium text-adm-text">{String(r.market)}</span> }, { key: 'sport', label: 'Sport', render: r => <Badge variant="neutral">{String(r.sport)}</Badge> }, num('events', 'Events'), { key: 'margin', label: 'Margin', align: 'right', render: r => <span className="tnum text-adm-muted">{Number(r.margin).toFixed(1)}%</span> }, status()],
    autoDetail: true, detailTitle: r => String(r.market),
  },
};
specs['sportsbook/betting-slips'] = {
  title: 'Betting Slips',
  description: 'Recent sports betting slips including accumulators.',
  stats: [
    { label: 'Slips (24h)', value: '21,480', delta: 8.4, icon: Trophy },
    { label: 'Avg odds', value: '2.84', icon: Gauge },
    { label: 'Acca share', value: '38.2%', delta: 2.1, sub: 'multi-leg slips', icon: Activity },
    { label: 'Cashouts (24h)', value: '2,140', delta: 4.8, icon: Wallet },
  ],
  table: {
    source: staticSrc(data.bets.slice(0, 120).map((b, i) => ({ ...b, legs: (i % 4) + 1, odds: Number((1.4 + (i % 30) * 0.18).toFixed(2)), slipStatus: i % 9 === 0 ? 'pending' : i % 3 === 0 ? 'lost' : 'won' }))),
    exportName: 'betting-slips', searchPlaceholder: 'Search slips…',
    filters: [{ key: 'slipStatus', label: 'Result', options: ['won', 'lost', 'pending'] }],
    columns: [id('id'), player(), { key: 'game', label: 'Selection', render: r => <span className="font-medium text-adm-text">{String(r.game)}</span> }, num('legs', 'Legs'), { key: 'odds', label: 'Odds', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.odds)}</span> }, money('amount', 'Stake'), money('payout', 'Returns'), { key: 'slipStatus', label: 'Result', render: r => <StatusCell v={String(r.slipStatus)} /> }, when('time', 'Placed')],
    autoDetail: true, detailTitle: r => `Slip ${r.id}`, defaultSort: { key: 'time', dir: 'desc' },
  },
};
specs['sportsbook/live-betting'] = {
  title: 'Live Betting',
  description: 'In-play events with latency and exposure monitoring.',
  stats: [
    { label: 'Live events', value: String(liveEvents.length * 9), delta: 12.0, icon: Activity, color: '#34d399' },
    { label: 'Bets/min', value: '1,842', delta: 9.4, icon: Dice5 },
    { label: 'Feed latency', value: '0.8s', delta: -0.1, sub: 'Sportradar feed', icon: Gauge },
    { label: 'Live exposure', value: fmtMoney(482000, 'USD', true), delta: 4.2, icon: Wallet, color: '#fbbf24' },
  ],
  table: {
    source: staticSrc(liveEvents.length ? liveEvents as unknown as Row[] : data.sportsEvents.slice(0, 12) as unknown as Row[]), exportName: 'live-events', searchPlaceholder: 'Search live events…',
    columns: [{ key: 'match', label: 'Event', render: r => <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-adm-green" /><span className="font-medium text-adm-text">{String(r.home)} vs {String(r.away)}</span></span> }, { key: 'sport', label: 'Sport', render: r => <Badge variant="neutral">{String(r.sport)}</Badge> }, num('markets', 'Markets'), { key: 'margin', label: 'Margin', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.margin)}%</span> }, { key: 'suspended', label: 'State', render: r => r.suspended ? <Badge variant="red">Suspended</Badge> : <Badge variant="green">Trading</Badge> }],
    autoDetail: true, detailTitle: r => `${r.home} vs ${r.away}`,
  },
};
specs['sportsbook/odds'] = {
  title: 'Odds Management',
  description: 'Margins, limits and compilation sources per market.',
  stats: [
    { label: 'Avg margin', value: '5.2%', delta: -0.2, icon: Percent },
    { label: 'Price changes (1h)', value: '4,218', delta: 6.4, icon: Activity },
    { label: 'Limit breaches', value: '3', delta: -2, sub: 'auto-rejected stakes', icon: ShieldAlert, color: '#fbbf24' },
  ],
  table: {
    source: src.events, exportName: 'odds', searchPlaceholder: 'Search events…',
    filters: [{ key: 'sport', label: 'Sport', options: Array.from(new Set(data.sportsEvents.map(e => e.sport))) }],
    columns: [{ key: 'match', label: 'Event', render: r => <span className="font-medium text-adm-text">{String(r.home)} vs {String(r.away)}</span> }, { key: 'odds', label: '1 / X / 2', render: r => <span className="tnum font-mono text-xs text-adm-muted">{(r.odds as number[]).map(o => o.toFixed(2)).join(' / ')}</span> }, { key: 'margin', label: 'Margin', sortable: true, align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.margin)}%</span> }, num('markets', 'Markets'), status()],
    autoDetail: true, detailTitle: r => `${r.home} vs ${r.away} — odds`, defaultSort: { key: 'margin', dir: 'desc' },
  },
};
specs['sportsbook/providers'] = {
  title: 'Sportsbook Providers',
  description: 'Odds feeds and turnkey integrations powering the sportsbook.',
  cards: {
    columns: 3,
    actionLabel: 'Request integration',
    items: [
      { id: 'SBP-1', title: 'Sportradar', icon: '📡', desc: 'Primary odds & live data feed.', status: 'connected', metrics: [{ label: 'Latency', value: '0.8s' }, { label: 'Events/d', value: '1,420' }, { label: 'Uptime', value: '99.98%' }] },
      { id: 'SBP-2', title: 'Betradar Integrity', icon: '🛡️', desc: 'Match-fixing & integrity alerts.', status: 'connected', metrics: [{ label: 'Alerts 30d', value: '2' }, { label: 'Resolved', value: '2' }, { label: 'Coverage', value: '100%' }] },
      { id: 'SBP-3', title: 'Kambi Compilation', icon: '🧮', desc: 'Managed trading service (esports).', status: 'connected', metrics: [{ label: 'Margin', value: '5.8%' }, { label: 'Markets', value: '84' }, { label: 'Sports', value: '2' }] },
      { id: 'SBP-4', title: 'Genius Sports', icon: '⚡', desc: 'Backup feed & low-latency courtside data.', status: 'disconnected', metrics: [{ label: 'Status', value: 'Standby' }, { label: 'Failover', value: '< 5s' }, { label: 'Cost', value: 'TBD' }] },
    ],
  },
};
specs['sportsbook/settlement'] = {
  title: 'Bet Settlement',
  description: 'Settlement queue for events awaiting official results.',
  stats: [
    { label: 'Awaiting settlement', value: '6', delta: -3, icon: Gauge, color: '#fbbf24' },
    { label: 'Settled (24h)', value: '18,420', delta: 7.2, icon: Trophy, color: '#34d399' },
    { label: 'Voided (24h)', value: '42', delta: -12.0, icon: ShieldAlert },
    { label: 'Settlement errors', value: '0', delta: 0, sub: 'last 7 days', icon: Activity },
  ],
  table: {
    source: staticSrc(data.sportsEvents.filter(e => e.status === 'finished').slice(0, 24).map((e, i) => ({ ...e, stakeTotal: 4200 + i * 1380, payouts: 2100 + i * 720, setResult: i % 5 === 0 ? 'pending' : 'settled' }))),
    exportName: 'settlement', searchPlaceholder: 'Search events…',
    filters: [{ key: 'setResult', label: 'State', options: ['pending', 'settled'] }],
    columns: [id(), { key: 'match', label: 'Event', render: r => <span className="font-medium text-adm-text">{String(r.home)} vs {String(r.away)}</span> }, { key: 'league', label: 'League', hideBelow: 'md', render: r => <TextCell v={String(r.league)} /> }, money('stakeTotal', 'Staked'), money('payouts', 'Payouts'), { key: 'setResult', label: 'State', render: r => <StatusCell v={String(r.setResult)} /> }],
    bulkActions: [{ label: 'Settle selected', onClick: rows => toast.success(`${rows.length} event(s) settled from official results`) }],
    autoDetail: true, detailTitle: r => `${r.home} vs ${r.away}`,
  },
};
specs['sportsbook/suspended'] = {
  title: 'Suspended Markets',
  description: 'Markets halted by trading or integrity signals.',
  stats: [
    { label: 'Suspended now', value: String(suspendedEvents.length + 2), delta: 1, icon: ShieldAlert, color: '#fbbf24' },
    { label: 'Auto-suspends (24h)', value: '34', delta: 6.2, sub: 'odds volatility', icon: Activity },
    { label: 'Integrity holds', value: '1', delta: 0, sub: 'Betradar alert', icon: Trophy, color: '#f4587a' },
  ],
  table: {
    source: staticSrc((suspendedEvents.length ? suspendedEvents : data.sportsEvents.slice(0, 3)).map((e, i) => ({ ...e, reason: ['Odds volatility', 'Integrity alert', 'Lineup pending', 'Weather delay'][i % 4], suspendedAt: new Date(Date.now() - i * 900000).toISOString() }))),
    exportName: 'suspended-markets', searchPlaceholder: 'Search suspensions…',
    columns: [{ key: 'match', label: 'Event', render: r => <span className="font-medium text-adm-text">{String(r.home)} vs {String(r.away)}</span> }, { key: 'reason', label: 'Reason', render: r => <Badge variant="amber">{String(r.reason)}</Badge> }, num('markets', 'Markets affected'), when('suspendedAt', 'Suspended'), { key: 'actions', label: '', render: () => <Button size="sm" variant="secondary" onClick={e => { e.stopPropagation(); toast.success('Market resumed'); }}>Resume</Button> }],
    autoDetail: true, detailTitle: r => `${r.home} vs ${r.away}`,
  },
};

/* ===== Finance subsections ===== */
specs['finance/deposits'] = specs['dashboard/deposits'];
specs['finance/payment-methods'] = {
  title: 'Payment Methods',
  description: 'Method-level performance: success rates, fees and volume.',
  stats: [
    { label: 'Enabled methods', value: String(data.paymentMethods.filter(m => m.status === 'enabled').length), icon: Wallet },
    { label: 'Avg success rate', value: `${(data.paymentMethods.reduce((a, m) => a + m.successRate, 0) / data.paymentMethods.length).toFixed(1)}%`, delta: 0.4, icon: Gauge, color: '#34d399' },
    mstat('Volume (30d)', 'deposits', ArrowDownToLine),
  ],
  table: {
    source: staticSrc(data.paymentMethods as unknown as Row[]), exportName: 'payment-methods', searchPlaceholder: 'Search methods…',
    filters: [{ key: 'type', label: 'Type', options: ['Crypto', 'Card', 'Bank', 'Wallet / APM'] }, { key: 'status', label: 'Status', options: ['enabled', 'disabled'] }],
    columns: [{ key: 'name', label: 'Method', render: r => <span className="font-medium text-adm-text">{String(r.name)}</span> }, { key: 'type', label: 'Type', render: r => <Badge variant="neutral">{String(r.type)}</Badge> }, num('deposits30d', 'Deposits (30d)'), money('volume30d', 'Volume (30d)'), { key: 'successRate', label: 'Success', sortable: true, align: 'right', render: r => <span className={`tnum ${Number(r.successRate) > 96 ? 'text-adm-green' : 'text-adm-amber'}`}>{String(r.successRate)}%</span> }, { key: 'fee', label: 'Fee', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.fee)}</span> }, status()],
    autoDetail: true, detailTitle: r => String(r.name), defaultSort: { key: 'volume30d', dir: 'desc' },
  },
};
specs['finance/payment-providers'] = {
  title: 'Payment Providers',
  description: 'Gateways and rails powering deposits and payouts.',
  cards: {
    columns: 3,
    actionLabel: 'Connect provider',
    items: [
      { id: 'PP-1', title: 'Stripe', icon: '💳', desc: 'Cards, Apple Pay, Google Pay.', status: 'connected', metrics: [{ label: 'Volume 30d', value: fmtMoney(8400000, 'USD', true) }, { label: 'Success', value: '98.1%' }, { label: 'Fee', value: '2.9%' }] },
      { id: 'PP-2', title: 'CoinsPaid', icon: '🪙', desc: 'Crypto deposits & mass payouts.', status: 'connected', metrics: [{ label: 'Volume 30d', value: fmtMoney(14200000, 'USD', true) }, { label: 'Success', value: '99.4%' }, { label: 'Fee', value: '0.4%' }] },
      { id: 'PP-3', title: 'Pix via EBANX', icon: '⚡', desc: 'Brazil instant payments.', status: 'connected', metrics: [{ label: 'Volume 30d', value: fmtMoney(2100000, 'USD', true) }, { label: 'Success', value: '97.2%' }, { label: 'Fee', value: '1.2%' }] },
      { id: 'PP-4', title: 'SEPA/ACH (Nuvei)', icon: '🏦', desc: 'Bank transfer rails EU/NA.', status: 'disconnected', metrics: [{ label: 'Status', value: 'Evaluating' }, { label: 'ETA', value: 'Q4' }, { label: 'Fee', value: '~0.8%' }] },
    ],
  },
};
specs['finance/bonuses'] = {
  title: 'Bonus Transactions',
  description: 'Financial ledger entries created by bonus campaigns.',
  stats: [
    { label: 'Bonus spend (30d)', value: fmtMoney(sum('profit', -30) * -0.42, 'USD', true), delta: 5.2, icon: Gift, color: '#f2b93b' },
    { label: 'Grants (30d)', value: '18,420', delta: 8.4, icon: Users },
    { label: 'Clawbacks', value: '212', delta: -3.1, sub: 'bonus abuse reversals', icon: ShieldAlert, color: '#f4587a' },
  ],
  table: {
    source: src.bonusTx, exportName: 'bonus-transactions', searchPlaceholder: 'Search bonus entries…',
    filters: [txStatusFilter, methodFilter],
    columns: [id(), player(), money('amount', 'Amount'), { key: 'method', label: 'Campaign', render: r => <Badge variant="gold">{String(r.method)}</Badge> }, status(), when('date', 'Date'), { key: 'reference', label: 'Reference', hideBelow: 'md', render: r => <IdCell v={String(r.reference)} /> }],
    rowDetail: txDrawer, defaultSort: { key: 'date', dir: 'desc' },
  },
};
specs['finance/promo-codes'] = {
  title: 'Promo Codes (Finance)',
  description: 'Redemption accounting for active and expired codes.',
  stats: [
    { label: 'Active codes', value: String(data.promoCodes.filter(p => p.status === 'active').length), icon: Gift },
    { label: 'Redemptions (7d)', value: '4,218', delta: 12.4, icon: Users },
    { label: 'Cost (7d)', value: fmtMoney(184000, 'USD', true), delta: 6.2, icon: Wallet, color: '#fbbf24' },
  ],
  table: {
    source: staticSrc(data.promoCodes as unknown as Row[]), exportName: 'promo-codes', searchPlaceholder: 'Search codes…',
    filters: [{ key: 'status', label: 'Status', options: ['active', 'paused', 'expired'] }],
    columns: [{ key: 'code', label: 'Code', render: r => <span className="rounded-md bg-white/[.06] px-2 py-0.5 font-mono text-xs text-adm-gold">{String(r.code)}</span> }, { key: 'reward', label: 'Reward', render: r => <span className="font-medium text-adm-text">{String(r.reward)}</span> }, num('uses', 'Uses'), { key: 'limit', label: 'Limit', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.limit)}</span> }, { key: 'wager', label: 'Wager', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.wager)}×</span> }, when('expires', 'Expires'), status()],
    autoDetail: true, detailTitle: r => `Code ${r.code}`, defaultSort: { key: 'uses', dir: 'desc' },
  },
};
specs['finance/wallets'] = {
  title: 'Wallets',
  description: 'Hot & cold treasury balances per currency.',
  stats: [
    { label: 'Treasury value', value: fmtMoney(data.wallets.reduce((a, w) => a + w.hotBalance + w.coldBalance, 0), 'USD', true), delta: 2.1, icon: Wallet, color: '#f2b93b' },
    { label: 'Hot wallet share', value: '18.4%', delta: -0.8, sub: 'target < 20%', icon: Gauge },
    { label: 'Pending payouts', value: fmtMoney(data.wallets.reduce((a, w) => a + w.pendingOut, 0), 'USD', true), icon: ArrowUpFromLine },
  ],
  table: {
    source: staticSrc(data.wallets as unknown as Row[]), exportName: 'wallets', searchPlaceholder: 'Search wallets…',
    columns: [{ key: 'currency', label: 'Currency', render: r => <span className="flex items-center gap-2"><CurrencyIcon currency={String(r.currency).replace('-FIAT', '')} size={22} /><span className="font-mono text-sm font-semibold text-adm-text">{String(r.currency)}</span></span> }, money('hotBalance', 'Hot balance'), money('coldBalance', 'Cold balance'), money('pendingOut', 'Pending out'), money('inflow24h', 'Inflow (24h)'), money('outflow24h', 'Outflow (24h)'), { key: 'utilization', label: 'Hot util.', align: 'right', render: r => <span className={`tnum ${Number(r.utilization) > 80 ? 'text-adm-amber' : 'text-adm-muted'}`}>{String(r.utilization)}%</span> }],
    autoDetail: true, detailTitle: r => `${r.currency} wallet`,
  },
};
specs['finance/balances'] = {
  title: 'Player Balances',
  description: 'Liability overview: aggregate player balances by currency.',
  stats: [
    { label: 'Total liability', value: fmtMoney(data.players.reduce((a, p) => a + p.balance, 0) * 42, 'USD', true), delta: 1.8, icon: Wallet },
    { label: 'Funded players', value: '42,180', delta: 3.2, icon: Users },
    { label: 'Dormant balances', value: fmtMoney(1240000, 'USD', true), sub: 'no login > 180d', icon: Gauge, color: '#fbbf24' },
  ],
  table: {
    source: staticSrc(['USD', 'EUR', 'BTC', 'ETH', 'USDT', 'GBP'].map((c, i) => ({
      id: `BAL-${c}`, currency: c, players: 18400 - i * 2600, balance: 4200000 - i * 520000,
      avg: Math.round((4200000 - i * 520000) / (18400 - i * 2600)), dormant: 8 - i > 0 ? 8 - i : 1,
    }))),
    exportName: 'balances', searchPlaceholder: 'Search currencies…',
    columns: [{ key: 'currency', label: 'Currency', render: r => <span className="flex items-center gap-2"><CurrencyIcon currency={String(r.currency)} size={22} /><span className="font-mono text-sm font-semibold text-adm-text">{String(r.currency)}</span></span> }, num('players', 'Players'), money('balance', 'Total balance'), money('avg', 'Avg balance'), { key: 'dormant', label: 'Dormant %', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.dormant)}%</span> }],
    autoDetail: true, detailTitle: r => `${r.currency} balances`,
  },
};
specs['finance/chargebacks'] = {
  title: 'Chargebacks',
  description: 'Disputed card payments and recovery workflow.',
  stats: [
    { label: 'Chargebacks (30d)', value: '23', delta: -8.0, icon: ShieldAlert, color: '#f4587a' },
    { label: 'Chargeback rate', value: '0.42%', delta: -0.06, sub: 'threshold 1%', icon: Gauge },
    { label: 'Disputed amount', value: fmtMoney(48200, 'USD', true), delta: -12.4, icon: Wallet },
    { label: 'Won disputes', value: '61%', delta: 4.2, sub: 'evidence submitted', icon: Trophy, color: '#34d399' },
  ],
  table: {
    source: src.chargebacks, exportName: 'chargebacks', searchPlaceholder: 'Search chargebacks…',
    filters: [txStatusFilter, methodFilter],
    columns: [id(), player(), money('amount', 'Amount'), { key: 'method', label: 'Method', render: r => <TextCell v={String(r.method)} /> }, status(), when('date', 'Date'), { key: 'reference', label: 'Reference', hideBelow: 'md', render: r => <IdCell v={String(r.reference)} /> }],
    rowDetail: txDrawer, defaultSort: { key: 'date', dir: 'desc' },
  },
};
specs['finance/reports'] = {
  title: 'Financial Reports',
  description: 'Reconciliation, liquidity and treasury reporting.',
  charts: [
    { kind: 'bars', title: 'Deposits vs withdrawals', money: true, data: CHART_DATA.depWith30, description: 'Daily flows' },
    { kind: 'stacked', title: 'Treasury composition', money: true, data: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => ({ label: m, Crypto: 18 + i * 1.2, Fiat: 9 - i * 0.4 })) },
  ],
  table: {
    source: staticSrc(['Daily reconciliation', 'Weekly liquidity', 'Monthly treasury', 'Player liability', 'Payment fees', 'Bonus cost allocation'].map((r, i) => ({
      id: `RPT-${i + 1}`, report: r, frequency: ['Daily', 'Weekly', 'Monthly', 'Daily', 'Weekly', 'Monthly'][i],
      lastRun: new Date(Date.now() - i * 7200e3).toISOString(), rows: 42000 - i * 4200, status: i === 4 ? 'failed' : 'completed',
    }))),
    exportName: 'financial-reports', searchPlaceholder: 'Search reports…',
    columns: [{ key: 'report', label: 'Report', render: r => <span className="font-medium text-adm-text">{String(r.report)}</span> }, { key: 'frequency', label: 'Frequency', render: r => <Badge variant="neutral">{String(r.frequency)}</Badge> }, num('rows', 'Rows'), when('lastRun', 'Last run'), status(), { key: 'dl', label: '', render: () => <Button size="sm" variant="secondary" onClick={e => { e.stopPropagation(); toast.success('Report downloaded'); }}>Download</Button> }],
    autoDetail: true, detailTitle: r => String(r.report),
  },
};

/* ===== Bonuses & Promotions ===== */
const campaignFilters: FilterSpec[] = [
  { key: 'status', label: 'Status', options: ['active', 'scheduled', 'paused', 'ended'] },
  { key: 'type', label: 'Type', options: Array.from(new Set(data.campaigns.map(c => c.type))) },
];
const campaignColumns: Column<Row>[] = [
  { key: 'name', label: 'Campaign', render: r => <span className="font-medium text-adm-text">{String(r.name)}</span> },
  { key: 'type', label: 'Type', render: r => <Badge variant="default">{String(r.type)}</Badge> },
  money('budget', 'Budget'), num('claimed', 'Claimed'),
  { key: 'wager', label: 'Wager', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.wager)}×</span> },
  { key: 'channel', label: 'Audience', hideBelow: 'lg', render: r => <TextCell v={String(r.channel)} /> },
  status(),
];
const campaignBulk: BulkAction[] = [
  { label: 'Pause', variant: 'secondary', onClick: rows => toast.success(`${rows.length} campaign(s) paused`) },
  { label: 'Duplicate', onClick: rows => toast.success(`${rows.length} campaign(s) duplicated to drafts`) },
];
function campaignStats(type?: string) {
  const list = type ? data.campaigns.filter(c => c.type === type) : data.campaigns;
  return [
    { label: 'Active campaigns', value: String(list.filter(c => c.status === 'active').length || 3), delta: 1, icon: Gift, color: '#f2b93b' },
    { label: 'Budget allocated', value: fmtMoney(list.reduce((a, c) => a + c.budget, 0) || 420000, 'USD', true), delta: 4.2, icon: Wallet },
    { label: 'Claims (7d)', value: fmtNum(list.reduce((a, c) => a + c.claimed, 0) || 8400), delta: 9.8, icon: Users },
    { label: 'Avg conversion', value: '18.4%', delta: 1.2, sub: 'claim → wager complete', icon: Gauge },
  ] as StatSpec[];
}
specs['bonuses/campaigns'] = {
  title: 'Bonus Campaigns',
  description: 'All promotional campaigns across channels and player segments.',
  stats: campaignStats(),
  table: { source: src.campaigns, exportName: 'campaigns', searchPlaceholder: 'Search campaigns…', filters: campaignFilters, columns: campaignColumns, bulkActions: campaignBulk, autoDetail: true, detailTitle: r => String(r.name), defaultSort: { key: 'budget', dir: 'desc' } },
};
specs['bonuses/welcome'] = {
  title: 'Welcome Bonuses',
  description: 'First-deposit offers for new registrations.',
  stats: campaignStats('Welcome'),
  table: { source: staticSrc(data.campaigns.filter(c => c.type === 'Welcome').concat(data.campaigns.slice(0, 4)) as unknown as Row[]), exportName: 'welcome-bonuses', searchPlaceholder: 'Search welcome offers…', filters: [{ key: 'status', label: 'Status', options: ['active', 'scheduled', 'paused', 'ended'] }], columns: campaignColumns, bulkActions: campaignBulk, autoDetail: true, detailTitle: r => String(r.name) },
};
specs['bonuses/free-spins'] = {
  title: 'Free Spins',
  description: 'Spin grants and drop campaigns.',
  stats: campaignStats('Free Spins'),
  table: { source: staticSrc(data.campaigns.filter(c => c.type === 'Free Spins').concat(data.campaigns.slice(2, 6)) as unknown as Row[]), exportName: 'free-spins', searchPlaceholder: 'Search free spin campaigns…', filters: [{ key: 'status', label: 'Status', options: ['active', 'scheduled', 'paused', 'ended'] }], columns: campaignColumns, bulkActions: campaignBulk, autoDetail: true, detailTitle: r => String(r.name) },
};
specs['bonuses/cashback'] = {
  title: 'Cashback',
  description: 'Loss-return programs by tier and vertical.',
  stats: campaignStats('Cashback'),
  table: { source: staticSrc(data.campaigns.filter(c => c.type === 'Cashback').concat(data.campaigns.slice(4, 8)) as unknown as Row[]), exportName: 'cashback', searchPlaceholder: 'Search cashback programs…', filters: [{ key: 'status', label: 'Status', options: ['active', 'scheduled', 'paused', 'ended'] }], columns: campaignColumns, bulkActions: campaignBulk, autoDetail: true, detailTitle: r => String(r.name) },
};
specs['bonuses/loyalty'] = {
  title: 'Loyalty Rewards',
  description: 'Ongoing reward mechanics tied to wagering.',
  stats: campaignStats('Loyalty'),
  table: { source: staticSrc(data.campaigns.filter(c => c.type === 'Loyalty').concat(data.campaigns.slice(6, 10)) as unknown as Row[]), exportName: 'loyalty-rewards', searchPlaceholder: 'Search loyalty campaigns…', filters: [{ key: 'status', label: 'Status', options: ['active', 'scheduled', 'paused', 'ended'] }], columns: campaignColumns, bulkActions: campaignBulk, autoDetail: true, detailTitle: r => String(r.name) },
};
specs['bonuses/promo-codes'] = {
  title: 'Promo Codes',
  description: 'Create and monitor code-based promotions.',
  stats: [
    { label: 'Active codes', value: String(data.promoCodes.filter(p => p.status === 'active').length), icon: Gift },
    { label: 'Redemptions (7d)', value: '4,218', delta: 12.4, icon: Users },
    { label: 'Cost (7d)', value: fmtMoney(184000, 'USD', true), delta: 6.2, icon: Wallet, color: '#fbbf24' },
  ],
  table: {
    source: staticSrc(data.promoCodes as unknown as Row[]), exportName: 'promo-codes-bonus', searchPlaceholder: 'Search codes…',
    filters: [{ key: 'status', label: 'Status', options: ['active', 'paused', 'expired'] }],
    columns: [{ key: 'code', label: 'Code', render: r => <span className="rounded-md bg-white/[.06] px-2 py-0.5 font-mono text-xs text-adm-gold">{String(r.code)}</span> }, { key: 'reward', label: 'Reward', render: r => <span className="font-medium text-adm-text">{String(r.reward)}</span> }, num('uses', 'Uses'), { key: 'wager', label: 'Wager', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.wager)}×</span> }, when('expires', 'Expires'), status()],
    bulkActions: [{ label: 'Deactivate', variant: 'danger', onClick: rows => toast.warning(`${rows.length} code(s) deactivated`) }],
    autoDetail: true, detailTitle: r => `Code ${r.code}`, defaultSort: { key: 'uses', dir: 'desc' },
  },
};
specs['bonuses/performance'] = {
  title: 'Campaign Performance',
  description: 'ROI of promotional spend against incremental GGR.',
  charts: [
    { kind: 'bars', title: 'Spend vs incremental GGR', money: true, data: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => ({ label: m, Spend: 320 + i * 24, 'Incremental GGR': 840 + i * 61 })) },
    { kind: 'donut', title: 'Spend by campaign type', money: true, description: 'Last 30 days', donutData: [{ name: 'Welcome', value: 284000 }, { name: 'Free spins', value: 168000 }, { name: 'Cashback', value: 214000 }, { name: 'Reload', value: 96000 }, { name: 'Tournaments', value: 122000 }] },
  ],
  table: { source: src.campaigns, exportName: 'campaign-performance', searchPlaceholder: 'Search campaigns…', filters: campaignFilters, columns: [...campaignColumns.slice(0, 3), { key: 'redeemed', label: 'Redeemed', align: 'right', sortable: true, render: r => <NumCell v={Number(r.redeemed)} /> }, { key: 'roi', label: 'ROI', align: 'right', render: r => <DeltaCell v={Number(r.budget) > 0 ? ((Number(r.redeemed) * 42 - Number(r.budget)) / Number(r.budget)) * 100 : 0} /> }, status()], defaultSort: { key: 'redeemed', dir: 'desc' } },
};
specs['bonuses/rules'] = {
  title: 'Bonus Rules',
  description: 'Global wagering and eligibility rules applied to campaigns.',
  settings: [
    {
      title: 'Wagering defaults', desc: 'Applied when a campaign does not define its own contribution rates.',
      fields: [
        { type: 'select', label: 'Default wagering requirement', value: '30×', options: ['10×', '20×', '25×', '30×', '35×', '40×'] },
        { type: 'select', label: 'Slots contribution', value: '100%', options: ['50%', '75%', '100%'] },
        { type: 'select', label: 'Table games contribution', value: '10%', options: ['0%', '5%', '10%', '20%'] },
        { type: 'select', label: 'Live casino contribution', value: '10%', options: ['0%', '5%', '10%', '20%'] },
        { type: 'select', label: 'Expiry window', value: '14 days', options: ['3 days', '7 days', '14 days', '30 days'] },
      ],
    },
    {
      title: 'Eligibility & abuse prevention', desc: 'Guardrails enforced at grant and redemption time.',
      fields: [
        { type: 'switch', label: 'One bonus per household / IP', value: true },
        { type: 'switch', label: 'Require minimum deposit for welcome bonus', value: true },
        { type: 'switch', label: 'Max bet with active bonus ($5)', value: true },
        { type: 'switch', label: 'Block bonus stacking', value: true },
        { type: 'switch', label: 'Exclude bonus abusers automatically', value: true },
      ],
    },
  ],
};

/* ===== VIP & Loyalty ===== */
specs['vip/levels'] = {
  title: 'VIP Levels',
  description: 'Program ladder, thresholds and benefits per level.',
  cards: {
    columns: 4,
    actionLabel: 'Add level',
    items: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond I', 'Diamond II', 'Diamond III', 'Royal'].map((l, i) => ({
      id: `VIP-${i}`, title: l, icon: ['🥉', '🥈', '🥇', '💎', '💎', '💎', '💎', '👑'][i],
      desc: `Enter at ${[0, 500, 2500, 10000, 25000, 60000, 120000, 300000][i].toLocaleString()} pts wagered`,
      status: 'live',
      metrics: [
        { label: 'Players', value: fmtNum([52400, 21800, 9400, 3200, 1100, 420, 160, 38][i]) },
        { label: 'Rakeback', value: `${[0, 2, 5, 8, 12, 15, 18, 25][i]}%` },
        { label: 'Host', value: i >= 4 ? 'Dedicated' : '—' },
      ],
    })),
  },
};
specs['vip/tiers'] = {
  title: 'Player Tiers',
  description: 'Distribution and movement between tiers.',
  charts: [
    { kind: 'donut', title: 'Tier distribution', description: 'All players', donutData: ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond+'].map((n, i) => ({ name: n, value: [52400, 21800, 9400, 3200, 1718][i] })) },
    { kind: 'bars', title: 'Tier upgrades vs downgrades', data: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => ({ label: m, Upgrades: 840 + i * 40, Downgrades: 210 + i * 12 })) },
  ],
  table: {
    source: staticSrc(vipPlayers as unknown as Row[]), exportName: 'tiers', searchPlaceholder: 'Search players…',
    filters: [{ key: 'vipName', label: 'Tier', options: ['Gold', 'Platinum', 'Diamond I', 'Diamond II', 'Diamond III', 'Royal'] }],
    columns: [player(), { key: 'vipName', label: 'Tier', render: r => <Badge variant="gold">{String(r.vipName)}</Badge> }, money('totalDeposits', 'Lifetime deposits'), money('ggr', 'GGR'), when('lastLogin', 'Last login')],
    rowLink: r => `/admin/players/${r.id}`, defaultSort: { key: 'totalDeposits', dir: 'desc' },
  },
};
specs['vip/points'] = {
  title: 'Loyalty Points',
  description: 'Point economy: issuance, redemption and liability.',
  stats: [
    { label: 'Points issued (30d)', value: '48.2M', delta: 6.4, icon: Trophy, color: '#f2b93b' },
    { label: 'Points redeemed (30d)', value: '31.6M', delta: 4.8, icon: Gift },
    { label: 'Point liability', value: fmtMoney(842000, 'USD', true), delta: 2.1, icon: Wallet },
    { label: 'Earn rate', value: '1 pt / $10', sub: 'wagered on slots', icon: Gauge },
  ],
  table: {
    source: staticSrc(data.players.slice(0, 40).map((p, i) => ({ ...p, points: 480000 - i * 9800, earned30d: 24000 - i * 420, redeemed30d: 18000 - i * 380 }))),
    exportName: 'loyalty-points', searchPlaceholder: 'Search players…',
    columns: [player(), { key: 'vipName', label: 'Tier', render: r => <Badge variant="gold">{String(r.vipName)}</Badge> }, num('points', 'Balance (pts)'), num('earned30d', 'Earned (30d)'), num('redeemed30d', 'Redeemed (30d)'), when('lastLogin', 'Last activity')],
    rowLink: r => `/admin/players/${r.id}`, defaultSort: { key: 'points', dir: 'desc' },
  },
};
specs['vip/rewards'] = {
  title: 'Rewards Catalog',
  description: 'Items players can redeem with loyalty points.',
  cards: {
    columns: 3,
    actionLabel: 'Add reward',
    items: [
      { id: 'RW-1', title: '50 Free Spins', icon: '🎰', desc: 'Gates of Olympus · 20,000 pts', status: 'live', metrics: [{ label: 'Redeemed', value: '1,842' }, { label: 'Cost', value: fmtMoney(4200, 'USD', true) }] },
      { id: 'RW-2', title: '$25 Bonus', icon: '💵', desc: '1× wager · 50,000 pts', status: 'live', metrics: [{ label: 'Redeemed', value: '964' }, { label: 'Cost', value: fmtMoney(24100, 'USD', true) }] },
      { id: 'RW-3', title: 'VIP Event Invite', icon: '🎟️', desc: 'Real-world events · 500,000 pts', status: 'live', metrics: [{ label: 'Redeemed', value: '12' }, { label: 'Cost', value: fmtMoney(18400, 'USD', true) }] },
      { id: 'RW-4', title: 'Merch Drop', icon: '🧢', desc: 'Limited apparel · 120,000 pts', status: 'paused', metrics: [{ label: 'Redeemed', value: '218' }, { label: 'Cost', value: fmtMoney(6200, 'USD', true) }] },
      { id: 'RW-5', title: 'Rakeback Boost +5%', icon: '📈', desc: '7-day boost · 80,000 pts', status: 'live', metrics: [{ label: 'Redeemed', value: '420' }, { label: 'Cost', value: fmtMoney(9800, 'USD', true) }] },
      { id: 'RW-6', title: 'Mystery Box', icon: '🎁', desc: 'Random reward · 35,000 pts', status: 'live', metrics: [{ label: 'Redeemed', value: '2,140' }, { label: 'Cost', value: fmtMoney(31200, 'USD', true) }] },
    ],
  },
};
specs['vip/bonuses'] = {
  title: 'VIP Bonuses',
  description: 'Exclusive offers granted by VIP hosts.',
  stats: [
    { label: 'Grants (7d)', value: '128', delta: 8.4, icon: Gift, color: '#f2b93b' },
    { label: 'Value granted', value: fmtMoney(184000, 'USD', true), delta: 12.2, icon: Wallet },
    { label: 'Hosts active', value: '6', icon: Users },
  ],
  table: {
    source: staticSrc(vipPlayers.slice(0, 28).map((p, i) => ({ id: `VGB-${i + 1}`, player: p.username, playerId: p.id, bonus: ['100% reload up to $2K', '5% rakeback bump', '$500 chip', '200 free spins', 'Loss-back $1K'][i % 5], grantedBy: ['Alexandra Voss', 'Marcus Chen', 'Sofia Marino'][i % 3], value: 4800 - i * 120, granted: new Date(Date.now() - i * 26e6).toISOString(), status: i % 7 === 0 ? 'pending' : 'granted' }))),
    exportName: 'vip-bonuses', searchPlaceholder: 'Search grants…',
    filters: [{ key: 'status', label: 'Status', options: ['granted', 'pending'] }],
    columns: [id(), player(), { key: 'bonus', label: 'Bonus', render: r => <span className="font-medium text-adm-text">{String(r.bonus)}</span> }, money('value', 'Value'), { key: 'grantedBy', label: 'Granted by', hideBelow: 'md', render: r => <TextCell v={String(r.grantedBy)} /> }, when('granted', 'Granted'), status()],
    autoDetail: true, detailTitle: r => `VIP grant ${r.id}`, defaultSort: { key: 'granted', dir: 'desc' },
  },
};
specs['vip/activity'] = {
  title: 'VIP Activity',
  description: 'Recent sessions and wins across the VIP book.',
  table: {
    source: staticSrc(data.bets.filter(b => vipPlayers.some(v => v.id === b.playerId)).length ? data.bets.filter(b => vipPlayers.some(v => v.id === b.playerId)) as unknown as Row[] : data.bets.slice(0, 60) as unknown as Row[]),
    exportName: 'vip-activity', searchPlaceholder: 'Search VIP rounds…',
    columns: [player(), { key: 'game', label: 'Game', render: r => <span className="font-medium text-adm-text">{String(r.game)}</span> }, money('amount', 'Stake'), money('payout', 'Payout'), { key: 'result', label: 'Result', render: r => <StatusCell v={String(r.result)} /> }, when('time', 'Time')],
    autoDetail: true, detailTitle: r => `Round ${r.id}`, defaultSort: { key: 'time', dir: 'desc' },
  },
};

/* ===== Marketing ===== */
specs['marketing/banners'] = {
  title: 'Banners',
  description: 'On-site creative placements and performance.',
  stats: [
    { label: 'Live banners', value: String(data.banners.filter(b => b.status === 'live').length), delta: 2, icon: Activity },
    { label: 'Impressions (7d)', value: fmtNum(data.banners.reduce((a, b) => a + b.impressions, 0)), delta: 6.4, icon: Users },
    { label: 'Avg CTR', value: '2.8%', delta: 0.4, icon: Gauge },
  ],
  table: {
    source: staticSrc(data.banners as unknown as Row[]), exportName: 'banners', searchPlaceholder: 'Search banners…',
    filters: [{ key: 'status', label: 'Status', options: ['live', 'scheduled', 'draft', 'paused'] }, { key: 'placement', label: 'Placement', options: Array.from(new Set(data.banners.map(b => b.placement))) }],
    columns: [{ key: 'name', label: 'Banner', render: r => <span className="font-medium text-adm-text">{String(r.name)}</span> }, { key: 'placement', label: 'Placement', render: r => <Badge variant="neutral">{String(r.placement)}</Badge> }, num('impressions', 'Impressions'), num('clicks', 'Clicks'), { key: 'ctr', label: 'CTR', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.ctr)}%</span> }, when('ends', 'Ends'), status()],
    autoDetail: true, detailTitle: r => String(r.name), defaultSort: { key: 'impressions', dir: 'desc' },
  },
};
specs['marketing/popups'] = {
  title: 'Popups',
  description: 'Modal campaigns triggered by behavior or schedule.',
  table: {
    source: staticSrc(['Welcome offer takeover', 'App install prompt', 'Weekend tournament', 'KYC nudge', 'Responsible gaming check-in', 'VIP invitation'].map((n, i) => ({
      id: `POP-${i + 1}`, name: n, trigger: ['On registration', '3rd session', 'Fri 18:00', 'Deposit > $500', '120m session', 'Diamond tier-up'][i],
      audience: ['New players', 'All mobile', 'Everyone', 'Unverified', 'Long sessions', 'VIP'][i],
      impressions: 84000 - i * 9400, conversions: 4200 - i * 480, status: i === 4 ? 'paused' : 'live',
    }))),
    exportName: 'popups', searchPlaceholder: 'Search popups…',
    filters: [{ key: 'status', label: 'Status', options: ['live', 'paused'] }],
    columns: [{ key: 'name', label: 'Popup', render: r => <span className="font-medium text-adm-text">{String(r.name)}</span> }, { key: 'trigger', label: 'Trigger', render: r => <TextCell v={String(r.trigger)} /> }, { key: 'audience', label: 'Audience', hideBelow: 'md', render: r => <Badge variant="neutral">{String(r.audience)}</Badge> }, num('impressions', 'Impressions'), num('conversions', 'Conversions'), status()],
    autoDetail: true, detailTitle: r => String(r.name),
  },
};
specs['marketing/notifications'] = {
  title: 'Notifications',
  description: 'In-app notification center campaigns.',
  table: {
    source: staticSrc(['Drops & Wins live now', 'Your cashback is ready', 'New slot: Sweet Bonanza 2', 'Weekend reload inside', 'Jackpot alert: $2.1M', 'Bet boost on El Clásico'].map((n, i) => ({
      id: `NTF-${i + 1}`, title: n, channel: 'In-app', audience: ['All players', 'Cashback eligible', 'Slots players', 'Depositors 30d', 'Everyone', 'Sports players'][i],
      delivered: 42000 - i * 4800, readRate: 42 - i * 3, sent: new Date(Date.now() - i * 32e6).toISOString(), status: 'sent',
    }))),
    exportName: 'notifications', searchPlaceholder: 'Search notifications…',
    columns: [{ key: 'title', label: 'Notification', render: r => <span className="font-medium text-adm-text">{String(r.title)}</span> }, { key: 'audience', label: 'Audience', render: r => <Badge variant="neutral">{String(r.audience)}</Badge> }, num('delivered', 'Delivered'), { key: 'readRate', label: 'Read rate', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.readRate)}%</span> }, when('sent', 'Sent'), status()],
    autoDetail: true, detailTitle: r => String(r.title), defaultSort: { key: 'sent', dir: 'desc' },
  },
};
specs['marketing/announcements'] = {
  title: 'Announcements',
  description: 'Site-wide and lobby announcements.',
  table: {
    source: staticSrc(['Scheduled maintenance Sep 30', 'New payment method: Pix', 'VIP program refresh', 'Responsible gaming week', 'Sportsbook margin promo', 'Holiday tournament series'].map((n, i) => ({
      id: `ANN-${i + 1}`, title: n, area: ['Site-wide', 'Cashier', 'VIP lounge', 'Site-wide', 'Sportsbook', 'Casino'][i],
      published: new Date(Date.now() - i * 86400e3 * 2).toISOString(), author: data.adminUsers[i % 7].name, status: i < 4 ? 'published' : 'draft',
    }))),
    exportName: 'announcements', searchPlaceholder: 'Search announcements…',
    filters: [{ key: 'status', label: 'Status', options: ['published', 'draft'] }],
    columns: [{ key: 'title', label: 'Announcement', render: r => <span className="font-medium text-adm-text">{String(r.title)}</span> }, { key: 'area', label: 'Area', render: r => <Badge variant="neutral">{String(r.area)}</Badge> }, { key: 'author', label: 'Author', hideBelow: 'md', render: r => <TextCell v={String(r.author)} /> }, when('published', 'Published'), status()],
    autoDetail: true, detailTitle: r => String(r.title),
  },
};
specs['marketing/email'] = {
  title: 'Email Campaigns',
  description: 'Lifecycle and broadcast email performance.',
  stats: [
    { label: 'Sent (30d)', value: fmtNum(data.emailCampaigns.reduce((a, c) => a + c.sent, 0)), delta: 4.8, icon: Users },
    { label: 'Avg open rate', value: '34.2%', delta: 1.6, icon: Gauge, color: '#34d399' },
    { label: 'Avg CTR', value: '4.8%', delta: 0.4, icon: Activity },
    { label: 'Unsubscribes', value: '0.18%', delta: -0.02, icon: ShieldAlert },
  ],
  table: {
    source: staticSrc(data.emailCampaigns as unknown as Row[]), exportName: 'email-campaigns', searchPlaceholder: 'Search campaigns…',
    filters: [{ key: 'status', label: 'Status', options: ['sent', 'scheduled', 'draft'] }],
    columns: [{ key: 'subject', label: 'Subject', render: r => <span className="font-medium text-adm-text">{String(r.subject)}</span> }, { key: 'segment', label: 'Segment', render: r => <Badge variant="neutral">{String(r.segment)}</Badge> }, num('sent', 'Sent'), { key: 'openRate', label: 'Opens', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.openRate)}%</span> }, { key: 'clickRate', label: 'CTR', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.clickRate)}%</span> }, when('date', 'Date'), status()],
    autoDetail: true, detailTitle: r => String(r.subject), defaultSort: { key: 'date', dir: 'desc' },
  },
};
specs['marketing/push'] = {
  title: 'Push Notifications',
  description: 'Mobile & web push campaigns.',
  table: {
    source: staticSrc(['Jackpot won near you 🎉', 'Your free spins expire tonight', 'Live now: UFC 312', 'Deposit match — 24h only', 'New games Friday', 'Cashback Sunday is back'].map((n, i) => ({
      id: `PUSH-${i + 1}`, title: n, platform: i % 2 ? 'iOS + Android' : 'Web + Mobile', optedIn: 128400 - i * 8400,
      delivered: 96000 - i * 6200, ctr: 6.4 - i * 0.4, sent: new Date(Date.now() - i * 40e6).toISOString(), status: 'sent',
    }))),
    exportName: 'push', searchPlaceholder: 'Search push campaigns…',
    columns: [{ key: 'title', label: 'Campaign', render: r => <span className="font-medium text-adm-text">{String(r.title)}</span> }, { key: 'platform', label: 'Platform', render: r => <Badge variant="neutral">{String(r.platform)}</Badge> }, num('delivered', 'Delivered'), { key: 'ctr', label: 'CTR', align: 'right', render: r => <span className="tnum text-adm-muted">{Number(r.ctr).toFixed(1)}%</span> }, when('sent', 'Sent'), status()],
    autoDetail: true, detailTitle: r => String(r.title), defaultSort: { key: 'sent', dir: 'desc' },
  },
};
specs['marketing/affiliate-campaigns'] = {
  title: 'Affiliate Campaigns',
  description: 'Co-marketing runs with partner affiliates.',
  table: {
    source: staticSrc(data.affiliates.slice(0, 12).map((a, i) => ({
      id: `AC-${i + 1}`, name: `${a.company} — ${['September push', 'Streams week', 'Bonus blitz', 'NFL season'][i % 4]}`,
      affiliate: a.company, budget: 24000 - i * 1200, clicks: a.clicks, regs: a.registrations, status: i % 5 === 0 ? 'paused' : 'active',
    }))),
    exportName: 'affiliate-campaigns', searchPlaceholder: 'Search campaigns…',
    filters: [{ key: 'status', label: 'Status', options: ['active', 'paused'] }],
    columns: [{ key: 'name', label: 'Campaign', render: r => <span className="font-medium text-adm-text">{String(r.name)}</span> }, { key: 'affiliate', label: 'Partner', render: r => <TextCell v={String(r.affiliate)} /> }, money('budget', 'Budget'), num('clicks', 'Clicks'), num('regs', 'Registrations'), status()],
    autoDetail: true, detailTitle: r => String(r.name),
  },
};
specs['marketing/referrals'] = {
  title: 'Referral Programs',
  description: 'Player-to-player referral mechanics.',
  stats: [
    { label: 'Referrals (30d)', value: '2,418', delta: 14.2, icon: Users, color: '#34d399' },
    { label: 'Conversion', value: '22.4%', delta: 2.1, sub: 'invite → FTD', icon: Gauge },
    { label: 'Reward cost', value: fmtMoney(64000, 'USD', true), delta: 8.4, icon: Gift },
    { label: 'LTV uplift', value: '+18%', sub: 'referred vs organic', icon: TrendingUp, color: '#f2b93b' },
  ],
  table: {
    source: staticSrc(data.players.slice(0, 30).map((p, i) => ({ ...p, invites: 24 - i % 18, joined: 12 - i % 10, rewardsEarned: 840 - i * 12 }))),
    exportName: 'referrals', searchPlaceholder: 'Search referrers…',
    columns: [player(), num('invites', 'Invites sent'), num('joined', 'Joined'), { key: 'rewardsEarned', label: 'Rewards earned', align: 'right', sortable: true, render: r => <MoneyCell v={Number(r.rewardsEarned)} /> }, when('registeredAt', 'Member since')],
    rowLink: r => `/admin/players/${r.id}`, defaultSort: { key: 'invites', dir: 'desc' },
  },
};

/* ===== Affiliates ===== */
const affStats: StatSpec[] = [
  { label: 'Active affiliates', value: String(data.affiliates.filter(a => a.status === 'active').length), delta: 4.2, icon: Users },
  { label: 'Clicks (30d)', value: fmtNum(data.affiliates.reduce((a, x) => a + x.clicks, 0)), delta: 8.4, icon: Activity },
  { label: 'FTDs (30d)', value: fmtNum(data.affiliates.reduce((a, x) => a + x.ftds, 0)), delta: 6.1, icon: UserPlus, color: '#34d399' },
  { label: 'Commissions due', value: fmtMoney(data.affiliates.reduce((a, x) => a + x.balance, 0), 'USD', true), delta: 3.4, icon: Wallet, color: '#f2b93b' },
];
specs['affiliates/accounts'] = {
  title: 'Affiliate Accounts',
  description: 'Partner book with plans, traffic and earnings.',
  stats: affStats,
  table: {
    source: src.affiliates, exportName: 'affiliates', searchPlaceholder: 'Search affiliates…',
    filters: [{ key: 'plan', label: 'Plan', options: ['RevShare', 'CPA', 'Hybrid'] }, { key: 'status', label: 'Status', options: ['active', 'pending', 'suspended'] }],
    columns: [{ key: 'company', label: 'Partner', render: r => <span className="font-medium text-adm-text">{String(r.company)}</span> }, { key: 'plan', label: 'Plan', render: r => <Badge variant="default">{String(r.plan)}</Badge> }, { key: 'rate', label: 'Rate', hideBelow: 'md', render: r => <span className="tnum text-xs text-adm-muted">{String(r.rate)}</span> }, num('clicks', 'Clicks'), num('ftds', 'FTDs'), money('revenue', 'Revenue'), money('balance', 'Balance due'), status()],
    autoDetail: true, detailTitle: r => String(r.company), defaultSort: { key: 'revenue', dir: 'desc' },
  },
};
specs['affiliates/applications'] = {
  title: 'Affiliate Applications',
  description: 'New partner sign-ups awaiting review.',
  stats: [
    { label: 'Open applications', value: String(data.affiliates.filter(a => a.status === 'pending').length + 3), delta: 2, icon: UserPlus, color: '#fbbf24' },
    { label: 'Approved (30d)', value: '12', delta: 4, icon: Users, color: '#34d399' },
    { label: 'Avg approval time', value: '1.4 days', delta: -12.0, icon: Gauge },
  ],
  table: {
    source: staticSrc(data.affiliates.filter(a => a.status !== 'active').concat(data.affiliates.slice(0, 5)).map((a, i) => ({ ...a, channel: ['SEO', 'Streamer', 'Telegram', 'Comparison site', 'Paid ads'][i % 5], traffic: `${(a.clicks / 10).toFixed(0)}/mo`, applied: a.since }))),
    exportName: 'affiliate-applications', searchPlaceholder: 'Search applications…',
    columns: [{ key: 'company', label: 'Applicant', render: r => <span className="font-medium text-adm-text">{String(r.company)}</span> }, { key: 'name', label: 'Contact', render: r => <TextCell v={String(r.name)} /> }, { key: 'channel', label: 'Channel', render: r => <Badge variant="neutral">{String(r.channel)}</Badge> }, { key: 'traffic', label: 'Traffic', hideBelow: 'md', render: r => <span className="tnum text-adm-muted">{String(r.traffic)}</span> }, when('applied', 'Applied'), status()],
    bulkActions: [
      { label: 'Approve', onClick: rows => toast.success(`${rows.length} application(s) approved`) },
      { label: 'Decline', variant: 'danger', onClick: rows => toast.error(`${rows.length} application(s) declined`) },
    ],
    autoDetail: true, detailTitle: r => `${r.company} — application`, defaultSort: { key: 'applied', dir: 'desc' },
  },
};
specs['affiliates/tracking'] = {
  title: 'Tracking',
  description: 'Click, impression and postback health per tracking source.',
  stats: [
    { label: 'Clicks (24h)', value: '48,420', delta: 7.2, icon: Activity },
    { label: 'Postback failures', value: '0.4%', delta: -0.1, sub: 'retried automatically', icon: Gauge, color: '#34d399' },
    { label: 'SubID mismatches', value: '3', delta: -2, icon: ShieldAlert, color: '#fbbf24' },
  ],
  table: {
    source: staticSrc(data.affiliates.slice(0, 18).map(a => ({ id: a.id, partner: a.company, clicks: a.clicks, registrations: a.registrations, convRate: a.clicks ? Number(((a.registrations / a.clicks) * 100).toFixed(2)) : 0, lastPostback: new Date(Date.now() - Math.random() * 86400e3).toISOString(), status: Math.random() > 0.15 ? 'healthy' : 'degraded' }))),
    exportName: 'tracking', searchPlaceholder: 'Search sources…',
    filters: [{ key: 'status', label: 'Health', options: ['healthy', 'degraded'] }],
    columns: [{ key: 'partner', label: 'Source', render: r => <span className="font-medium text-adm-text">{String(r.partner)}</span> }, num('clicks', 'Clicks'), num('registrations', 'Registrations'), { key: 'convRate', label: 'Conv. rate', align: 'right', sortable: true, render: r => <span className="tnum text-adm-muted">{String(r.convRate)}%</span> }, when('lastPostback', 'Last postback'), status()],
    autoDetail: true, detailTitle: r => `${r.partner} — tracking`, defaultSort: { key: 'clicks', dir: 'desc' },
  },
};
specs['affiliates/statistics'] = {
  title: 'Referral Statistics',
  description: 'Funnel performance across the affiliate channel.',
  charts: [
    { kind: 'bars', title: 'Clicks → registrations → FTDs', data: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => ({ label: m, Registrations: 2400 + i * 180, FTDs: 840 + i * 72 })) },
    { kind: 'donut', title: 'Registrations by channel', description: 'Last 30 days', donutData: [{ name: 'SEO', value: 38 }, { name: 'Streamers', value: 27 }, { name: 'Telegram', value: 16 }, { name: 'Comparison', value: 12 }, { name: 'Paid', value: 7 }] },
  ],
  table: {
    source: src.affiliates, exportName: 'referral-stats', searchPlaceholder: 'Search partners…',
    columns: [{ key: 'company', label: 'Partner', render: r => <span className="font-medium text-adm-text">{String(r.company)}</span> }, num('clicks', 'Clicks'), num('registrations', 'Regs'), num('ftds', 'FTDs'), { key: 'conv', label: 'Reg→FTD', align: 'right', render: r => <span className="tnum text-adm-muted">{Number(r.registrations) ? ((Number(r.ftds) / Number(r.registrations)) * 100).toFixed(1) : '0.0'}%</span> }, money('revenue', 'Revenue')],
    defaultSort: { key: 'ftds', dir: 'desc' },
  },
};
specs['affiliates/commissions'] = {
  title: 'Commissions',
  description: 'Accrued and paid commissions by plan.',
  stats: [
    { label: 'Accrued (30d)', value: fmtMoney(data.affiliates.reduce((a, x) => a + x.commission, 0) * 0.32, 'USD', true), delta: 5.4, icon: Wallet, color: '#f2b93b' },
    { label: 'Paid (30d)', value: fmtMoney(data.affiliates.reduce((a, x) => a + x.commission, 0) * 0.27, 'USD', true), delta: 4.1, icon: ArrowUpFromLine },
    { label: 'Negative carryover', value: '12', sub: 'partners in negative balance', icon: ShieldAlert },
  ],
  table: {
    source: src.affiliates, exportName: 'commissions', searchPlaceholder: 'Search partners…',
    filters: [{ key: 'plan', label: 'Plan', options: ['RevShare', 'CPA', 'Hybrid'] }],
    columns: [{ key: 'company', label: 'Partner', render: r => <span className="font-medium text-adm-text">{String(r.company)}</span> }, { key: 'plan', label: 'Plan', render: r => <Badge variant="default">{String(r.plan)}</Badge> }, money('revenue', 'Net revenue'), money('commission', 'Commission'), money('balance', 'Balance due'), status()],
    autoDetail: true, detailTitle: r => `${r.company} — commissions`, defaultSort: { key: 'commission', dir: 'desc' },
  },
};
specs['affiliates/payouts'] = {
  title: 'Payouts',
  description: 'Monthly affiliate payment runs.',
  stats: [
    { label: 'Next run', value: 'Oct 1', sub: 'auto at 00:00 UTC', icon: Gauge },
    { label: 'Payouts pending', value: String(data.affiliates.filter(a => a.balance > 1000).length), delta: 2, icon: ArrowUpFromLine, color: '#fbbf24' },
    { label: 'Total due', value: fmtMoney(data.affiliates.reduce((a, x) => a + x.balance, 0), 'USD', true), icon: Wallet },
  ],
  table: {
    source: staticSrc(data.affiliates.filter(a => a.balance > 200).map((a, i) => ({ id: `PO-${900 + a.id}`, partner: a.company, method: i % 3 === 0 ? 'Bitcoin' : i % 3 === 1 ? 'USDT (TRC-20)' : 'Bank transfer', amount: a.balance, period: 'Sep 2026', status: i % 6 === 0 ? 'pending approval' : i % 4 === 0 ? 'processing' : 'approved' }))),
    exportName: 'payouts', searchPlaceholder: 'Search payouts…',
    filters: [{ key: 'status', label: 'Status', options: ['approved', 'pending approval', 'processing'] }],
    columns: [id(), { key: 'partner', label: 'Partner', render: r => <span className="font-medium text-adm-text">{String(r.partner)}</span> }, { key: 'method', label: 'Method', render: r => <TextCell v={String(r.method)} /> }, { key: 'period', label: 'Period', render: r => <TextCell v={String(r.period)} /> }, money('amount', 'Amount'), status()],
    bulkActions: [
      { label: 'Approve run', onClick: rows => toast.success(`${rows.length} payout(s) approved for processing`) },
      { label: 'Hold', variant: 'secondary', onClick: rows => toast.warning(`${rows.length} payout(s) placed on hold`) },
    ],
    autoDetail: true, detailTitle: r => `Payout ${r.id}`, defaultSort: { key: 'amount', dir: 'desc' },
  },
};
specs['affiliates/reports'] = {
  title: 'Affiliate Reports',
  description: 'Monthly statements and performance exports.',
  table: {
    source: staticSrc(['Monthly statement — Sep', 'Q3 performance review', 'Top partners ranking', 'Channel mix analysis', 'Negative carryover report', 'SubID audit log'].map((r, i) => ({
      id: `AR-${i + 1}`, report: r, generated: new Date(Date.now() - i * 86400e3).toISOString(), format: i % 2 ? 'PDF' : 'CSV', rows: 8400 - i * 900, status: 'ready',
    }))),
    exportName: 'affiliate-reports', searchPlaceholder: 'Search reports…',
    columns: [{ key: 'report', label: 'Report', render: r => <span className="font-medium text-adm-text">{String(r.report)}</span> }, { key: 'format', label: 'Format', render: r => <Badge variant="neutral">{String(r.format)}</Badge> }, num('rows', 'Rows'), when('generated', 'Generated'), status(), { key: 'dl', label: '', render: () => <Button size="sm" variant="secondary" onClick={e => { e.stopPropagation(); toast.success('Report downloaded'); }}>Download</Button> }],
    autoDetail: true, detailTitle: r => String(r.report),
  },
};

/* ===== Reports & Analytics ===== */
specs['reports/revenue'] = {
  title: 'Revenue Reports',
  description: 'Consolidated revenue reporting with period comparison.',
  charts: [
    { kind: 'area', title: 'Revenue — 90 days', money: true, data: CHART_DATA.revenue90, description: 'Daily GGR' },
    { kind: 'bars', title: 'Monthly revenue', money: true, data: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => ({ label: m, Revenue: [21.4, 22.9, 24.1, 23.6, 26.2, 27.8][i] * 1e6 })) },
  ],
  table: {
    source: staticSrc(D.slice(-30).map(d => ({ id: d.date, period: d.label, ggr: d.ggr, ngr: d.ngr, deposits: d.deposits, withdrawals: d.withdrawals, profit: d.profit })).reverse()),
    exportName: 'revenue-report', searchPlaceholder: 'Search days…',
    columns: [{ key: 'period', label: 'Period', render: r => <span className="font-medium text-adm-text">{String(r.period)}</span> }, money('ggr', 'GGR'), money('ngr', 'NGR'), money('deposits', 'Deposits'), money('withdrawals', 'Withdrawals'), money('profit', 'Profit')],
    defaultSort: { key: 'id', dir: 'desc' },
  },
};
specs['reports/ggr-ngr'] = {
  title: 'GGR / NGR Report',
  description: 'Deduction bridge between gross and net gaming revenue.',
  charts: [
    { kind: 'area', title: 'GGR vs NGR — 90 days', money: true, data: CHART_DATA.ggr90 },
    { kind: 'stacked', title: 'Deduction bridge (Sep)', money: true, data: [{ label: 'Bridge', Bonuses: 4.2, 'Payment fees': 1.1, Royalties: 0.8, 'Comps': 0.5 }] },
  ],
  table: {
    source: staticSrc(D.slice(-30).map(d => ({ id: d.date, period: d.label, ggr: d.ggr, ngr: d.ngr, margin: Number(((d.ngr / d.ggr) * 100).toFixed(1)) })).reverse()),
    exportName: 'ggr-ngr-report', searchPlaceholder: 'Search days…',
    columns: [{ key: 'period', label: 'Period', render: r => <span className="font-medium text-adm-text">{String(r.period)}</span> }, money('ggr', 'GGR'), money('ngr', 'NGR'), { key: 'margin', label: 'NGR margin', align: 'right', sortable: true, render: r => <span className="tnum text-adm-green">{String(r.margin)}%</span> }],
    defaultSort: { key: 'id', dir: 'desc' },
  },
};
specs['reports/players'] = {
  title: 'Player Reports',
  description: 'Acquisition, activation and retention reporting.',
  charts: [
    { kind: 'area', title: 'Registrations vs actives', data: CHART_DATA.players30 },
    { kind: 'donut', title: 'Acquisition channel', description: 'Last 30 days', donutData: [{ name: 'Organic', value: 42 }, { name: 'Affiliate', value: 28 }, { name: 'Paid', value: 18 }, { name: 'Referral', value: 12 }] },
  ],
  table: {
    source: staticSrc(['Retention cohort — Sep', 'D1/D7/D30 retention', 'FTD funnel', 'Churn prediction list', 'Geo acquisition mix', 'LTV by cohort'].map((r, i) => ({
      id: `PR-${i + 1}`, report: r, frequency: ['Weekly', 'Daily', 'Daily', 'Daily', 'Weekly', 'Monthly'][i], lastRun: new Date(Date.now() - i * 14400e3).toISOString(), rows: 96400 - i * 8400, status: 'ready',
    }))),
    exportName: 'player-reports', searchPlaceholder: 'Search reports…',
    columns: [{ key: 'report', label: 'Report', render: r => <span className="font-medium text-adm-text">{String(r.report)}</span> }, { key: 'frequency', label: 'Frequency', render: r => <Badge variant="neutral">{String(r.frequency)}</Badge> }, num('rows', 'Rows'), when('lastRun', 'Last run'), status(), { key: 'dl', label: '', render: () => <Button size="sm" variant="secondary" onClick={e => { e.stopPropagation(); toast.success('Report downloaded'); }}>Download</Button> }],
  },
};
specs['reports/game-performance'] = {
  title: 'Game Performance Report',
  description: 'Per-title economics across the catalog.',
  charts: [
    { kind: 'rank', title: 'Top games by GGR (7d)', money: true, rankItems: [...data.adminGames].sort((a, b) => b.ggr7d - a.ggr7d).slice(0, 9).map(g => ({ name: g.title, sub: g.provider, value: g.ggr7d, image: g.image })) },
    { kind: 'donut', title: 'GGR by category', money: true, description: '7 days', donutData: ['Slots', 'Live Casino', 'Originals', 'Table', 'Shows'].map((n, i) => ({ name: n, value: [980000, 420000, 310000, 140000, 90000][i] })) },
  ],
  table: {
    source: src.games, exportName: 'game-performance', searchPlaceholder: 'Search games…',
    filters: [{ key: 'category', label: 'Category', options: Array.from(new Set(data.adminGames.map(g => g.category))) }],
    columns: [{ key: 'title', label: 'Game', render: r => <span className="font-medium text-adm-text">{String(r.title)}</span> }, { key: 'provider', label: 'Provider', render: r => <TextCell v={String(r.provider)} /> }, num('launches', 'Launches'), money('ggr7d', 'GGR (7d)'), num('popularity', 'Popularity'), status()],
    defaultSort: { key: 'ggr7d', dir: 'desc' },
  },
};
specs['reports/provider-performance'] = {
  title: 'Provider Performance Report',
  description: 'Studio-level contribution and reliability.',
  table: {
    source: src.providers, exportName: 'provider-performance', searchPlaceholder: 'Search providers…',
    columns: [{ key: 'name', label: 'Provider', render: r => <span className="font-medium text-adm-text">{String(r.name)}</span> }, num('games', 'Games'), money('ggr30d', 'GGR (30d)'), num('bets30d', 'Bets (30d)'), { key: 'availability', label: 'Uptime', align: 'right', sortable: true, render: r => <span className="tnum text-adm-muted">{String(r.availability)}%</span> }, { key: 'revenueShare', label: 'Rev share', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.revenueShare)}%</span> }],
    defaultSort: { key: 'ggr30d', dir: 'desc' },
  },
};
specs['reports/payments'] = {
  title: 'Payment Reports',
  description: 'Deposit, withdrawal and method-level payment analytics.',
  charts: [
    { kind: 'bars', title: 'Deposits vs withdrawals', money: true, data: CHART_DATA.depWith30 },
    { kind: 'donut', title: 'Volume by method', money: true, description: '30 days', donutData: data.paymentMethods.slice(0, 6).map(m => ({ name: m.name, value: m.volume30d })) },
  ],
  table: {
    source: staticSrc(data.paymentMethods.map(m => ({ id: m.id, method: m.name, type: m.type, volume: m.volume30d, count: m.deposits30d, success: m.successRate, fee: m.fee }))),
    exportName: 'payment-report', searchPlaceholder: 'Search methods…',
    columns: [{ key: 'method', label: 'Method', render: r => <span className="font-medium text-adm-text">{String(r.method)}</span> }, { key: 'type', label: 'Type', render: r => <Badge variant="neutral">{String(r.type)}</Badge> }, money('volume', 'Volume'), num('count', 'Transactions'), { key: 'success', label: 'Success', align: 'right', render: r => <span className="tnum text-adm-green">{String(r.success)}%</span> }, { key: 'fee', label: 'Fee', align: 'right', render: r => <span className="tnum text-adm-muted">{String(r.fee)}</span> }],
    defaultSort: { key: 'volume', dir: 'desc' },
  },
};
specs['reports/bonuses'] = {
  title: 'Bonus Reports',
  description: 'Promotional cost and efficiency reporting.',
  charts: [
    { kind: 'bars', title: 'Bonus cost by month', money: true, data: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((m, i) => ({ label: m, Cost: 620 + i * 34 })) },
    { kind: 'donut', title: 'Cost by type', money: true, description: 'Last 30 days', donutData: [{ name: 'Welcome', value: 284 }, { name: 'Free spins', value: 168 }, { name: 'Cashback', value: 214 }, { name: 'Reload', value: 96 }] },
  ],
  table: { source: src.campaigns, exportName: 'bonus-report', searchPlaceholder: 'Search campaigns…', filters: campaignFilters, columns: campaignColumns, defaultSort: { key: 'budget', dir: 'desc' } },
};
specs['reports/affiliates'] = specs['affiliates/reports'];
specs['reports/financial'] = specs['finance/reports'];
specs['reports/custom'] = {
  title: 'Custom Analytics',
  description: 'Compose date-range reports across every metric and export to CSV or PDF.',
  charts: [
    { kind: 'area', title: 'Selected metrics — last 30 days', money: true, data: CHART_DATA.depWith30, description: 'Pick metrics & ranges in the toolbar (demo)' },
    { kind: 'line', title: 'Active players', data: D.slice(-30).map(d => ({ label: d.label, activePlayers: d.activePlayers })) },
  ],
};

/* ===== Risk & Security ===== */
specs['risk/fraud'] = {
  title: 'Fraud Monitoring',
  description: 'Real-time fraud engine output with case triage.',
  stats: [
    { label: 'Open cases', value: String(data.riskCases.filter(c => c.status === 'open').length), delta: 3, icon: ShieldAlert, color: '#f4587a' },
    { label: 'Investigating', value: String(data.riskCases.filter(c => c.status === 'investigating').length), icon: Gauge, color: '#fbbf24' },
    { label: 'Resolved (7d)', value: String(data.riskCases.filter(c => c.status === 'resolved').length + 9), delta: 12.4, icon: Trophy, color: '#34d399' },
    { label: 'False-positive rate', value: '6.2%', delta: -1.4, icon: Activity },
  ],
  charts: [
    { kind: 'bars', title: 'Flags by severity (7d)', data: [{ label: 'Mon', low: 8, medium: 5, high: 3, critical: 1 }, { label: 'Tue', low: 6, medium: 4, high: 2, critical: 0 }, { label: 'Wed', low: 9, medium: 6, high: 4, critical: 2 }, { label: 'Thu', low: 7, medium: 5, high: 2, critical: 1 }, { label: 'Fri', low: 11, medium: 7, high: 5, critical: 2 }, { label: 'Sat', low: 14, medium: 8, high: 6, critical: 3 }, { label: 'Sun', low: 12, medium: 9, high: 4, critical: 2 }] },
    { kind: 'donut', title: 'Case types', description: 'Open + investigating', donutData: Array.from(Object.entries(data.riskCases.reduce<Record<string, number>>((acc, c) => { acc[c.type] = (acc[c.type] || 0) + 1; return acc; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 6)).map(([name, value]) => ({ name, value })) },
  ],
  table: {
    source: src.riskCases, exportName: 'fraud-cases', searchPlaceholder: 'Search cases…',
    filters: [
      { key: 'severity', label: 'Severity', options: ['low', 'medium', 'high', 'critical'] },
      { key: 'status', label: 'Status', options: ['open', 'investigating', 'resolved', 'false-positive'] },
    ],
    columns: [id(), player(), { key: 'type', label: 'Type', render: r => <span className="font-medium text-adm-text">{String(r.type)}</span> }, { key: 'severity', label: 'Severity', render: r => <StatusCell v={String(r.severity)} /> }, { key: 'score', label: 'Score', sortable: true, align: 'right', render: r => <RiskPill score={Number(r.score)} /> }, { key: 'assignee', label: 'Assignee', hideBelow: 'md', render: r => <TextCell v={String(r.assignee)} /> }, when('opened', 'Opened'), status()],
    rowDetail: riskDrawer, defaultSort: { key: 'score', dir: 'desc' },
  },
};
specs['risk/suspicious'] = {
  title: 'Suspicious Activity',
  description: 'Live stream of behavior flagged by the rules engine.',
  table: {
    source: staticSrc(data.sessions.filter(s => s.vpn || !s.geoMatch).concat(data.sessions.slice(0, 24)).map((s, i) => ({
      id: s.id, player: s.player, playerId: s.playerId, device: s.device, ip: s.ip, location: s.location,
      reason: i % 3 === 0 ? 'VPN detected' : i % 3 === 1 ? 'Geo mismatch' : 'Velocity: 14 bets/min',
      score: 40 + (i * 7) % 58, time: s.started, status: i % 5 === 0 ? 'open' : 'acknowledged',
    }))),
    exportName: 'suspicious-activity', searchPlaceholder: 'Search activity…',
    filters: [{ key: 'reason', label: 'Reason', options: ['VPN detected', 'Geo mismatch', 'Velocity: 14 bets/min'] }],
    columns: [player(), { key: 'reason', label: 'Trigger', render: r => <Badge variant="amber">{String(r.reason)}</Badge> }, { key: 'score', label: 'Score', sortable: true, align: 'right', render: r => <RiskPill score={Number(r.score)} /> }, { key: 'ip', label: 'IP', hideBelow: 'md', render: r => <IdCell v={String(r.ip)} /> }, { key: 'location', label: 'Location', hideBelow: 'lg', render: r => <TextCell v={String(r.location)} /> }, when('time', 'Detected'), status()],
    bulkActions: [{ label: 'Acknowledge', variant: 'secondary', onClick: rows => toast.success(`${rows.length} alert(s) acknowledged`) }],
    autoDetail: true, detailTitle: r => `Alert ${r.id}`, defaultSort: { key: 'score', dir: 'desc' },
  },
};
specs['risk/duplicates'] = {
  title: 'Duplicate Accounts',
  description: 'Account clusters detected by fingerprint and payment overlap.',
  stats: [
    { label: 'Open clusters', value: String(data.duplicateGroups.filter(g => g.status === 'open').length), delta: 1, icon: Users, color: '#fbbf24' },
    { label: 'Accounts flagged', value: String(data.duplicateGroups.reduce((a, g) => a + g.accounts.length, 0)), icon: ShieldAlert },
    { label: 'Confirmed abuse', value: '3', delta: 0, sub: 'this month', icon: Trophy, color: '#f4587a' },
  ],
  table: {
    source: staticSrc(data.duplicateGroups.map(g => ({ id: g.id, accounts: g.accounts.map(a => a.username).join(', '), count: g.accounts.length, matchType: g.matchType, confidence: g.confidence, detected: g.detected, status: g.status }))),
    exportName: 'duplicate-accounts', searchPlaceholder: 'Search clusters…',
    filters: [{ key: 'status', label: 'Status', options: ['open', 'investigating', 'resolved', 'false-positive'] }],
    columns: [id(), { key: 'accounts', label: 'Linked accounts', render: r => <span className="max-w-[300px] truncate text-adm-text">{String(r.accounts)}</span> }, num('count', 'Size'), { key: 'matchType', label: 'Match type', hideBelow: 'md', render: r => <Badge variant="neutral">{String(r.matchType)}</Badge> }, { key: 'confidence', label: 'Confidence', sortable: true, align: 'right', render: r => <RiskPill score={Number(r.confidence)} /> }, when('detected', 'Detected'), status()],
    autoDetail: true, detailTitle: r => `Cluster ${r.id}`, defaultSort: { key: 'confidence', dir: 'desc' },
  },
};
specs['risk/multi-account'] = {
  title: 'Multi-account Detection',
  description: 'Device graph and collusion heuristics.',
  charts: [
    { kind: 'donut', title: 'Match signals', description: 'Last 30 days', donutData: [{ name: 'Device fingerprint', value: 38 }, { name: 'IP cluster', value: 27 }, { name: 'Payment method', value: 19 }, { name: 'Payout address', value: 11 }, { name: 'Document', value: 5 }] },
    { kind: 'bars', title: 'Detections per week', data: [1, 2, 3, 4, 5, 6].map((w, i) => ({ label: `W${w}`, Detections: 6 + i * 2 + (i % 2) * 3, Confirmed: 2 + (i % 3) })) },
  ],
  table: specs['risk/duplicates'].table,
};
specs['risk/chargebacks'] = specs['finance/chargebacks'];
specs['risk/ip-device'] = {
  title: 'IP / Device Monitoring',
  description: 'Network-level view of access patterns.',
  table: {
    source: staticSrc(data.sessions as unknown as Row[]), exportName: 'ip-device', searchPlaceholder: 'Search IP or device…',
    columns: [player(), { key: 'ip', label: 'IP address', render: r => <IdCell v={String(r.ip)} /> }, { key: 'device', label: 'Device', render: r => <TextCell v={String(r.device)} /> }, { key: 'location', label: 'Location', hideBelow: 'md', render: r => <TextCell v={String(r.location)} /> }, { key: 'vpn', label: 'VPN', render: r => r.vpn ? <Badge variant="red">VPN</Badge> : <Badge variant="green">Direct</Badge> }, { key: 'geoMatch', label: 'Geo match', hideBelow: 'md', render: r => r.geoMatch ? <Badge variant="green">Match</Badge> : <Badge variant="amber">Mismatch</Badge> }, when('started', 'Seen')],
    autoDetail: true, detailTitle: r => `Device ${r.id}`, defaultSort: { key: 'started', dir: 'desc' },
  },
};
specs['risk/rules'] = {
  title: 'Risk Rules',
  description: 'Detection rules evaluated against every session and payment.',
  settings: [
    {
      title: 'Payment rules', desc: 'Evaluated on deposit and withdrawal.',
      fields: [
        { type: 'switch', label: 'Block new card → instant withdrawal', value: true },
        { type: 'switch', label: 'Velocity: >5 deposits/hour → review', value: true },
        { type: 'select', label: 'Auto-approve withdrawals below', value: '$1,000', options: ['$250', '$500', '$1,000', '$2,500'] },
        { type: 'switch', label: 'Sanctions list screening (Chainalysis)', value: true },
      ],
    },
    {
      title: 'Session rules', desc: 'Evaluated in real time during play.',
      fields: [
        { type: 'switch', label: 'VPN usage → risk flag', value: true },
        { type: 'switch', label: 'Geo mismatch → session hold', value: true },
        { type: 'switch', label: 'Shared device fingerprint → cluster review', value: true },
        { type: 'select', label: 'Bet velocity threshold', value: '20 bets/min', options: ['10 bets/min', '20 bets/min', '40 bets/min'] },
      ],
    },
  ],
};
specs['risk/blocklists'] = {
  title: 'Blocklists',
  description: 'IPs, devices, wallets and emails blocked platform-wide.',
  stats: [
    { label: 'Blocked IPs', value: '1,284', delta: 12, icon: ShieldAlert },
    { label: 'Blocked wallets', value: '84', delta: 2, icon: Wallet },
    { label: 'Blocked devices', value: '312', delta: 6, icon: Activity },
    { label: 'Hits prevented (7d)', value: '4,218', delta: 8.4, icon: Trophy, color: '#34d399' },
  ],
  table: {
    source: staticSrc(Array.from({ length: 24 }, (_, i) => ({
      id: `BL-${i + 1}`, value: i % 3 === 0 ? `185.${220 + i}.14.${i * 7}` : i % 3 === 1 ? `0x${(i * 7919).toString(16).padStart(8, 'a')}f3c2b1` : `fraud${i}@mailinator.com`,
      kind: i % 3 === 0 ? 'IP' : i % 3 === 1 ? 'Wallet' : 'Email',
      reason: ['Chargeback fraud', 'Sanctions match', 'Bonus abuse', 'Credential stuffing'][i % 4],
      added: new Date(Date.now() - i * 2.4 * 86400e3).toISOString(), addedBy: data.adminUsers[i % 6].name, status: 'active',
    }))),
    exportName: 'blocklists', searchPlaceholder: 'Search blocklist…',
    filters: [{ key: 'kind', label: 'Kind', options: ['IP', 'Wallet', 'Email'] }],
    columns: [{ key: 'value', label: 'Value', render: r => <span className="font-mono text-xs text-adm-text">{String(r.value)}</span> }, { key: 'kind', label: 'Kind', render: r => <Badge variant="neutral">{String(r.kind)}</Badge> }, { key: 'reason', label: 'Reason', render: r => <Badge variant="red">{String(r.reason)}</Badge> }, { key: 'addedBy', label: 'Added by', hideBelow: 'md', render: r => <TextCell v={String(r.addedBy)} /> }, when('added', 'Added'), status()],
    bulkActions: [{ label: 'Remove', variant: 'danger', onClick: rows => toast.success(`${rows.length} entr${rows.length === 1 ? 'y' : 'ies'} removed from blocklist`) }],
    autoDetail: true, detailTitle: r => `Blocklist entry ${r.id}`, defaultSort: { key: 'added', dir: 'desc' },
  },
};
specs['risk/sessions'] = {
  title: 'Session Management',
  description: 'Terminate or inspect any live player session.',
  stats: [
    { label: 'Active sessions', value: '3,214', delta: 12.8, icon: Activity, color: '#34d399' },
    { label: 'Terminated (24h)', value: '18', delta: -4, icon: ShieldAlert, color: '#f4587a' },
    { label: 'Hijack alerts', value: '0', icon: Trophy },
  ],
  table: {
    source: staticSrc(data.sessions as unknown as Row[]), exportName: 'sessions-risk', searchPlaceholder: 'Search sessions…',
    columns: [player(), { key: 'device', label: 'Device', render: r => <TextCell v={String(r.device)} /> }, { key: 'ip', label: 'IP', hideBelow: 'md', render: r => <IdCell v={String(r.ip)} /> }, num('durationMin', 'Duration (m)'), money('wagered', 'Wagered'), when('started', 'Started'), { key: 'act', label: '', render: () => <Button size="sm" variant="danger" onClick={e => { e.stopPropagation(); toast.error('Session terminated & player notified'); }}>Terminate</Button> }],
    autoDetail: true, detailTitle: r => `Session ${r.id}`, defaultSort: { key: 'started', dir: 'desc' },
  },
};

/* ===== Compliance ===== */
specs['compliance/kyc'] = specs['players/kyc'];
specs['compliance/aml'] = {
  title: 'AML Monitoring',
  description: 'Transaction monitoring, PEP screening and sanctions alerts.',
  stats: [
    { label: 'Open AML alerts', value: '4', delta: -1, icon: ShieldAlert, color: '#f4587a' },
    { label: 'Screened (24h)', value: '9,412', delta: 5.2, icon: Users, color: '#34d399' },
    { label: 'PEP matches', value: '1', delta: 0, icon: Gauge, color: '#fbbf24' },
    { label: 'SARs filed (Q3)', value: '3', icon: Activity },
  ],
  table: {
    source: staticSrc(Array.from({ length: 16 }, (_, i) => {
      const p = data.players[(i * 5) % data.players.length];
      return {
        id: `AML-${500 + i}`, player: p.username, playerId: p.id,
        alert: ['Structuring pattern', 'Sanctions fuzzy match', 'High-risk jurisdiction', 'Unusual source of funds', 'Rapid layering'][i % 5],
        amount: 18400 - i * 900, riskScore: 62 + (i * 3) % 36, opened: new Date(Date.now() - i * 1.8 * 86400e3).toISOString(),
        status: i % 4 === 0 ? 'open' : i % 4 === 1 ? 'investigating' : i % 4 === 2 ? 'cleared' : 'escalated',
      };
    })),
    exportName: 'aml-alerts', searchPlaceholder: 'Search alerts…',
    filters: [{ key: 'status', label: 'Status', options: ['open', 'investigating', 'escalated', 'cleared'] }],
    columns: [id(), player(), { key: 'alert', label: 'Alert', render: r => <span className="font-medium text-adm-text">{String(r.alert)}</span> }, money('amount', 'Amount'), { key: 'riskScore', label: 'Score', sortable: true, align: 'right', render: r => <RiskPill score={Number(r.riskScore)} /> }, when('opened', 'Opened'), status()],
    autoDetail: true, detailTitle: r => `AML alert ${r.id}`, defaultSort: { key: 'riskScore', dir: 'desc' },
  },
};
specs['compliance/verification'] = {
  title: 'Player Verification',
  description: 'Verification progress across the player base.',
  charts: [
    { kind: 'donut', title: 'KYC status', description: 'All players', donutData: [{ name: 'Verified', value: 62 }, { name: 'Pending', value: 16 }, { name: 'Unsubmitted', value: 12 }, { name: 'Rejected', value: 10 }] },
    { kind: 'bars', title: 'Verifications per day', data: D.slice(-14).map(d => ({ label: d.label, Verified: 40 + (d.newPlayers % 30), Rejected: 3 + (d.newPlayers % 5) })) },
  ],
  table: {
    source: src.players, exportName: 'verification', searchPlaceholder: 'Search players…',
    filters: [{ key: 'kyc', label: 'KYC status', options: ['verified', 'pending', 'rejected', 'unsubmitted'] }],
    columns: [player(), { key: 'kyc', label: 'KYC', render: r => <StatusCell v={String(r.kyc)} /> }, { key: 'country', label: 'Country', render: r => <TextCell v={String(r.country)} /> }, money('totalDeposits', 'Deposits'), when('registeredAt', 'Registered')],
    rowLink: r => `/admin/players/${r.id}`, defaultSort: { key: 'registeredAt', dir: 'desc' },
  },
};
specs['compliance/documents'] = specs['players/kyc'];
specs['compliance/self-exclusion'] = specs['players/responsible-gaming'];
specs['compliance/deposit-limits'] = {
  title: 'Deposit Limits',
  description: 'Player-set and jurisdiction-mandated deposit limits.',
  stats: [
    { label: 'Players with limits', value: '1,284', delta: 9.4, icon: Users, color: '#34d399' },
    { label: 'Limit hits (7d)', value: '342', delta: 12.0, icon: Gauge, color: '#fbbf24' },
    { label: 'Avg daily limit', value: '$420', icon: Wallet },
  ],
  table: {
    source: staticSrc(data.players.slice(0, 26).map((p, i) => ({ ...p, limitType: ['Daily', 'Weekly', 'Monthly'][i % 3], limit: [100, 250, 500, 1000, 2500][i % 5], used: Math.round([100, 250, 500, 1000, 2500][i % 5] * (0.2 + (i % 8) / 10)), setAt: p.registeredAt }))),
    exportName: 'deposit-limits', searchPlaceholder: 'Search limits…',
    filters: [{ key: 'limitType', label: 'Period', options: ['Daily', 'Weekly', 'Monthly'] }],
    columns: [player(), { key: 'limitType', label: 'Period', render: r => <Badge variant="neutral">{String(r.limitType)}</Badge> }, money('limit', 'Limit'), money('used', 'Used'), { key: 'pct', label: 'Usage', align: 'right', render: r => <span className={`tnum ${Number(r.used) / Number(r.limit) > 0.9 ? 'text-adm-red' : 'text-adm-muted'}`}>{Math.min(100, Math.round((Number(r.used) / Number(r.limit)) * 100))}%</span> }, when('setAt', 'Set')],
    rowLink: r => `/admin/players/${r.id}`,
  },
};
specs['compliance/betting-limits'] = {
  title: 'Betting Limits',
  description: 'Stake, loss and session limits configured per market.',
  settings: [
    {
      title: 'Global defaults', desc: 'Apply unless overridden by jurisdiction rules.',
      fields: [
        { type: 'select', label: 'Max single stake (slots)', value: '$100', options: ['$25', '$50', '$100', '$250'] },
        { type: 'select', label: 'Max single stake (sports)', value: '$5,000', options: ['$1,000', '$5,000', '$10,000'] },
        { type: 'select', label: 'Default session reminder', value: '60 minutes', options: ['30 minutes', '60 minutes', '120 minutes'] },
        { type: 'switch', label: 'Offer loss limits at registration', value: true },
      ],
    },
    {
      title: 'Jurisdiction overrides', desc: 'Mandatory caps by license.',
      fields: [
        { type: 'select', label: 'Germany — max stake/spin', value: '€1', options: ['€1'] },
        { type: 'select', label: 'UK — default affordability check', value: '£150/day', options: ['£100/day', '£150/day', '£500/day'] },
        { type: 'switch', label: 'Enforce mandatory cool-off after 4h play', value: true },
      ],
    },
  ],
};
specs['compliance/responsible-gaming'] = specs['players/responsible-gaming'];
specs['compliance/reports'] = {
  title: 'Compliance Reports',
  description: 'Regulatory submissions and audit evidence.',
  table: {
    source: staticSrc(['Quarterly AML summary', 'Self-exclusion register export', 'KYC completion report', 'Suspicious activity report (SAR)', 'Jurisdiction revenue split', 'Responsible gaming interventions'].map((r, i) => ({
      id: `CR-${i + 1}`, report: r, regulator: ['FIU', 'Gaming authority', 'Internal', 'FIU', 'Tax authority', 'Internal'][i],
      generated: new Date(Date.now() - i * 3 * 86400e3).toISOString(), format: 'PDF', status: i === 1 ? 'draft' : 'submitted',
    }))),
    exportName: 'compliance-reports', searchPlaceholder: 'Search reports…',
    columns: [{ key: 'report', label: 'Report', render: r => <span className="font-medium text-adm-text">{String(r.report)}</span> }, { key: 'regulator', label: 'Recipient', render: r => <Badge variant="neutral">{String(r.regulator)}</Badge> }, { key: 'format', label: 'Format', render: r => <TextCell v={String(r.format)} /> }, when('generated', 'Generated'), status(), { key: 'dl', label: '', render: () => <Button size="sm" variant="secondary" onClick={e => { e.stopPropagation(); toast.success('Report downloaded'); }}>Download</Button> }],
    autoDetail: true, detailTitle: r => String(r.report),
  },
};

/* ===== CMS ===== */
specs['cms/homepage'] = {
  title: 'Homepage Management',
  description: 'Compose the casino homepage rails, heroes and shortcuts.',
  cards: {
    columns: 3,
    actionLabel: 'Add section',
    items: [
      { id: 'HP-1', title: 'Hero carousel', icon: '🖼️', desc: '3 rotating banners · auto-advance 6s', status: 'live', metrics: [{ label: 'CTR', value: '6.8%' }, { label: 'Position', value: '#1' }] },
      { id: 'HP-2', title: 'Featured games rail', icon: '⭐', desc: '12 curated titles · refreshed hourly', status: 'live', metrics: [{ label: 'CTR', value: '8.4%' }, { label: 'Position', value: '#2' }] },
      { id: 'HP-3', title: 'Live casino rail', icon: '🃏', desc: '8 tables sorted by occupancy', status: 'live', metrics: [{ label: 'CTR', value: '5.2%' }, { label: 'Position', value: '#3' }] },
      { id: 'HP-4', title: 'Sports strip', icon: '⚽', desc: 'Top 6 upcoming events with odds', status: 'live', metrics: [{ label: 'CTR', value: '4.1%' }, { label: 'Position', value: '#4' }] },
      { id: 'HP-5', title: 'Promotions banner', icon: '🎁', desc: 'Golden Rush campaign creative', status: 'paused', metrics: [{ label: 'CTR', value: '3.6%' }, { label: 'Position', value: '#5' }] },
      { id: 'HP-6', title: 'Providers marquee', icon: '🏷️', desc: '18 studio logos, infinite scroll', status: 'live', metrics: [{ label: 'CTR', value: '1.9%' }, { label: 'Position', value: '#6' }] },
    ],
  },
};
specs['cms/pages'] = {
  title: 'Pages',
  description: 'Static content pages with publishing workflow.',
  stats: [
    { label: 'Published', value: String(data.cmsPages.filter(p => p.status === 'published').length), icon: Activity },
    { label: 'Drafts', value: String(data.cmsPages.filter(p => p.status === 'draft').length), icon: Gauge, color: '#fbbf24' },
    { label: 'Locales', value: '6', icon: Users },
  ],
  table: {
    source: staticSrc(data.cmsPages as unknown as Row[]), exportName: 'cms-pages', searchPlaceholder: 'Search pages…',
    filters: [{ key: 'status', label: 'Status', options: ['published', 'draft'] }],
    columns: [{ key: 'title', label: 'Page', render: r => <span className="font-medium text-adm-text">{String(r.title)}</span> }, { key: 'slug', label: 'Slug', render: r => <span className="font-mono text-xs text-adm-muted">{String(r.slug)}</span> }, { key: 'locale', label: 'Locale', hideBelow: 'md', render: r => <Badge variant="neutral">{String(r.locale)}</Badge> }, { key: 'author', label: 'Author', hideBelow: 'lg', render: r => <TextCell v={String(r.author)} /> }, when('updated', 'Updated'), status()],
    autoDetail: true, detailTitle: r => String(r.title), defaultSort: { key: 'updated', dir: 'desc' },
  },
};
specs['cms/menus'] = {
  title: 'Menus',
  description: 'Navigation structures for web and mobile apps.',
  table: {
    source: staticSrc(['Main navigation', 'Footer links', 'Casino categories bar', 'Sports quick links', 'VIP lounge menu', 'Support menu'].map((m, i) => ({
      id: `MENU-${i + 1}`, menu: m, items: 12 - i, surface: i < 2 ? 'Web + App' : i % 2 ? 'Web' : 'App',
      updated: new Date(Date.now() - i * 4 * 86400e3).toISOString(), status: 'published',
    }))),
    exportName: 'menus', searchPlaceholder: 'Search menus…',
    columns: [{ key: 'menu', label: 'Menu', render: r => <span className="font-medium text-adm-text">{String(r.menu)}</span> }, num('items', 'Items'), { key: 'surface', label: 'Surface', render: r => <Badge variant="neutral">{String(r.surface)}</Badge> }, when('updated', 'Updated'), status()],
    autoDetail: true, detailTitle: r => String(r.menu),
  },
};
specs['cms/game-categories'] = specs['casino/categories'];
specs['cms/banners'] = specs['marketing/banners'];
specs['cms/faqs'] = {
  title: 'FAQs',
  description: 'Help center articles with helpfulness tracking.',
  table: {
    source: staticSrc(data.faqs as unknown as Row[]), exportName: 'faqs', searchPlaceholder: 'Search FAQs…',
    filters: [{ key: 'category', label: 'Category', options: Array.from(new Set(data.faqs.map(f => f.category))) }, { key: 'status', label: 'Status', options: ['published', 'draft'] }],
    columns: [{ key: 'q', label: 'Question', render: r => <span className="font-medium text-adm-text">{String(r.q)}</span> }, { key: 'category', label: 'Category', render: r => <Badge variant="neutral">{String(r.category)}</Badge> }, num('views', 'Views'), { key: 'helpful', label: 'Helpful', align: 'right', sortable: true, render: r => <span className="tnum text-adm-green">{String(r.helpful)}%</span> }, status()],
    autoDetail: true, detailTitle: r => String(r.q), defaultSort: { key: 'views', dir: 'desc' },
  },
};
specs['cms/blog'] = {
  title: 'Blog / News',
  description: 'Editorial content and product announcements.',
  table: {
    source: staticSrc(data.blogPosts as unknown as Row[]), exportName: 'blog', searchPlaceholder: 'Search posts…',
    filters: [{ key: 'status', label: 'Status', options: ['published', 'draft', 'scheduled'] }],
    columns: [{ key: 'title', label: 'Post', render: r => <span className="font-medium text-adm-text">{String(r.title)}</span> }, { key: 'author', label: 'Author', hideBelow: 'md', render: r => <TextCell v={String(r.author)} /> }, num('views', 'Views'), when('date', 'Date'), status()],
    autoDetail: true, detailTitle: r => String(r.title), defaultSort: { key: 'date', dir: 'desc' },
  },
};
specs['cms/localization'] = {
  title: 'Localization',
  description: 'Translation coverage across supported languages.',
  charts: [
    { kind: 'donut', title: 'Strings translated', description: 'All locales', donutData: [{ name: 'English', value: 100 }, { name: 'Portuguese', value: 94 }, { name: 'German', value: 88 }, { name: 'Japanese', value: 76 }, { name: 'Turkish', value: 64 }, { name: 'Vietnamese', value: 41 }] },
  ],
  table: {
    source: staticSrc([
      { id: 'en', locale: 'English 🇬🇧', strings: 4820, translated: 4820, coverage: 100, status: 'complete' },
      { id: 'pt-BR', locale: 'Portuguese 🇧🇷', strings: 4820, translated: 4531, coverage: 94, status: 'in review' },
      { id: 'de', locale: 'German 🇩🇪', strings: 4820, translated: 4242, coverage: 88, status: 'in review' },
      { id: 'ja', locale: 'Japanese 🇯🇵', strings: 4820, translated: 3663, coverage: 76, status: 'translating' },
      { id: 'tr', locale: 'Turkish 🇹🇷', strings: 4820, translated: 3085, coverage: 64, status: 'translating' },
      { id: 'vi', locale: 'Vietnamese 🇻🇳', strings: 4820, translated: 1976, coverage: 41, status: 'queued' },
    ]),
    exportName: 'localization', searchPlaceholder: 'Search locales…',
    columns: [{ key: 'locale', label: 'Locale', render: r => <span className="font-medium text-adm-text">{String(r.locale)}</span> }, num('strings', 'Total strings'), num('translated', 'Translated'), { key: 'coverage', label: 'Coverage', align: 'right', sortable: true, render: r => <span className={`tnum ${Number(r.coverage) > 90 ? 'text-adm-green' : Number(r.coverage) > 60 ? 'text-adm-amber' : 'text-adm-red'}`}>{String(r.coverage)}%</span> }, status()],
    autoDetail: true, detailTitle: r => String(r.locale),
  },
};
specs['cms/seo'] = {
  title: 'SEO Settings',
  description: 'Metadata, structured data and indexing controls.',
  settings: [
    {
      title: 'Global metadata', desc: 'Defaults applied when a page does not define its own.',
      fields: [
        { type: 'text', label: 'Title template', value: '%s | Shuffle Casino' },
        { type: 'text', label: 'Default description', value: 'Play 15,000+ casino games with instant crypto deposits.' },
        { type: 'switch', label: 'Generate JSON-LD structured data', value: true },
        { type: 'switch', label: 'Auto-generate canonical URLs', value: true },
      ],
    },
    {
      title: 'Indexing', desc: 'Control crawler access per area.',
      fields: [
        { type: 'switch', label: 'Index casino lobby', value: true },
        { type: 'switch', label: 'Index sportsbook pages', value: true },
        { type: 'switch', label: 'Index blog', value: true },
        { type: 'switch', label: 'Noindex promo landing pages', value: false },
      ],
    },
  ],
};

/* ===== System ===== */
specs['system/admins'] = {
  title: 'Admin Users',
  description: 'Operator accounts, roles and session health.',
  stats: [
    { label: 'Admins', value: String(data.adminUsers.length), icon: Users },
    { label: 'Active now', value: String(data.adminUsers.filter(a => Date.now() - new Date(a.lastActive).getTime() < 3600e3).length), icon: Activity, color: '#34d399' },
    { label: '2FA coverage', value: `${Math.round((data.adminUsers.filter(a => a.twoFA).length / data.adminUsers.length) * 100)}%`, delta: 6.0, icon: ShieldAlert },
    { label: 'Pending invites', value: String(data.adminUsers.filter(a => a.status === 'invited').length), icon: UserPlus, color: '#fbbf24' },
  ],
  table: {
    source: src.admins, exportName: 'admin-users', searchPlaceholder: 'Search admins…',
    filters: [{ key: 'role', label: 'Role', options: Array.from(new Set(data.adminUsers.map(a => a.role))) }, { key: 'status', label: 'Status', options: ['active', 'invited', 'suspended'] }],
    columns: [
      { key: 'name', label: 'Admin', render: r => <PlayerCell name={String(r.name)} id={String(r.email)} /> },
      { key: 'role', label: 'Role', render: r => <Badge variant={String(r.role) === 'Super Admin' ? 'gold' : 'default'}>{String(r.role)}</Badge> },
      { key: 'twoFA', label: '2FA', hideBelow: 'md', render: r => r.twoFA ? <Badge variant="green">Enabled</Badge> : <Badge variant="amber">Disabled</Badge> },
      when('lastActive', 'Last active'), status(),
    ],
    bulkActions: [
      { label: 'Suspend', variant: 'danger', onClick: rows => toast.warning(`${rows.length} admin(s) suspended`) },
      { label: 'Reset 2FA', variant: 'secondary', onClick: rows => toast.success(`2FA reset for ${rows.length} admin(s)`) },
    ],
    autoDetail: true, detailTitle: r => String(r.name),
  },
};
specs['system/api-keys'] = {
  title: 'API Keys',
  description: 'Service credentials for internal and partner integrations.',
  stats: [
    { label: 'Active keys', value: String(data.apiKeys.filter(k => k.status === 'active').length), icon: Gauge },
    { label: 'Requests (24h)', value: '412K', delta: 8.4, icon: Activity },
    { label: 'Errors (24h)', value: '0.02%', delta: -0.01, icon: ShieldAlert, color: '#34d399' },
  ],
  table: {
    source: staticSrc(data.apiKeys as unknown as Row[]), exportName: 'api-keys', searchPlaceholder: 'Search keys…',
    filters: [{ key: 'status', label: 'Status', options: ['active', 'revoked'] }],
    columns: [
      { key: 'name', label: 'Key', render: r => <span className="font-medium text-adm-text">{String(r.name)}</span> },
      { key: 'prefix', label: 'Prefix', render: r => <span className="font-mono text-xs text-adm-muted">{String(r.prefix)}••••••••</span> },
      { key: 'scopes', label: 'Scopes', hideBelow: 'md', render: r => <span className="flex flex-wrap gap-1">{(r.scopes as string[]).map(s => <Badge key={s} variant="neutral">{s}</Badge>)}</span> },
      when('created', 'Created'), when('lastUsed', 'Last used'), status(),
    ],
    bulkActions: [{ label: 'Revoke', variant: 'danger', onClick: rows => toast.error(`${rows.length} key(s) revoked`) }],
    autoDetail: true, detailTitle: r => String(r.name), defaultSort: { key: 'lastUsed', dir: 'desc' },
  },
};
specs['system/integrations'] = {
  title: 'Integrations',
  description: 'Third-party services connected to the platform.',
  cards: {
    columns: 3,
    actionLabel: 'Browse marketplace',
    items: data.integrations.map(i => ({
      id: i.id, title: i.name, icon: i.category === 'Payments' ? '💳' : i.category === 'Crypto rails' ? '🪙' : i.category === 'KYC / Identity' ? '🪪' : i.category === 'Sportsbook feed' ? '📡' : i.category === 'Game aggregation' ? '🎰' : i.category === 'Email' ? '✉️' : i.category === 'Push' ? '📱' : i.category === 'AML screening' ? '🛡️' : '🗄️',
      desc: i.desc, status: i.status,
      metrics: [{ label: 'Category', value: i.category }, { label: 'Docs', value: 'View →' }],
    })),
  },
};
specs['system/webhooks'] = {
  title: 'Webhooks',
  description: 'Outbound event subscriptions and delivery health.',
  stats: [
    { label: 'Endpoints', value: String(data.webhooks.length), icon: Activity },
    { label: 'Deliveries (24h)', value: '48.2K', delta: 6.4, icon: Gauge },
    { label: 'Success rate', value: '99.4%', delta: 0.2, icon: Trophy, color: '#34d399' },
    { label: 'Dead-letter queue', value: '3', delta: -2, icon: ShieldAlert, color: '#fbbf24' },
  ],
  table: {
    source: staticSrc(data.webhooks as unknown as Row[]), exportName: 'webhooks', searchPlaceholder: 'Search endpoints…',
    filters: [{ key: 'status', label: 'Status', options: ['enabled', 'disabled'] }],
    columns: [
      { key: 'url', label: 'Endpoint', render: r => <span className="max-w-[320px] truncate font-mono text-xs text-adm-text">{String(r.url)}</span> },
      { key: 'events', label: 'Events', hideBelow: 'md', render: r => <span className="flex flex-wrap gap-1">{(r.events as string[]).slice(0, 2).map(ev => <Badge key={ev} variant="neutral">{ev}</Badge>)}{(r.events as string[]).length > 2 && <Badge variant="outline">+{(r.events as string[]).length - 2}</Badge>}</span> },
      { key: 'successRate', label: 'Success', align: 'right', sortable: true, render: r => <span className={`tnum ${Number(r.successRate) > 98 ? 'text-adm-green' : 'text-adm-amber'}`}>{String(r.successRate)}%</span> },
      when('lastDelivery', 'Last delivery'), status(),
    ],
    autoDetail: true, detailTitle: r => `Webhook ${r.id}`,
  },
};
specs['system/notifications'] = {
  title: 'System Notifications',
  description: 'Alerting rules for platform events delivered to admins.',
  settings: [
    {
      title: 'Finance alerts', desc: 'Route to the finance channel & on-call.',
      fields: [
        { type: 'switch', label: 'Withdrawal queue > 10 pending', value: true },
        { type: 'switch', label: 'Wallet hot-balance below threshold', value: true },
        { type: 'select', label: 'Large transaction threshold', value: '$25,000', options: ['$10,000', '$25,000', '$50,000'] },
        { type: 'switch', label: 'Chargeback rate above 0.8%', value: true },
      ],
    },
    {
      title: 'Risk & security alerts', desc: 'Route to the risk channel.',
      fields: [
        { type: 'switch', label: 'Critical risk case opened', value: true },
        { type: 'switch', label: 'Admin login from new country', value: true },
        { type: 'switch', label: '3 failed admin logins', value: true },
      ],
    },
    {
      title: 'Platform alerts', desc: 'Route to engineering on-call.',
      fields: [
        { type: 'switch', label: 'Provider API latency spike', value: true },
        { type: 'switch', label: 'Payment success rate drop', value: true },
        { type: 'select', label: 'Escalation delay', value: '15 minutes', options: ['5 minutes', '15 minutes', '30 minutes'] },
      ],
    },
  ],
};
specs['system/settings'] = {
  title: 'System Settings',
  description: 'Platform-wide configuration. Changes are recorded in the audit log.',
  settings: [
    {
      title: 'Platform', desc: 'Core casino behavior.',
      fields: [
        { type: 'text', label: 'Platform name', value: 'Shuffle Casino' },
        { type: 'select', label: 'Default language', value: 'English', options: ['English', 'Portuguese', 'German', 'Japanese', 'Turkish'] },
        { type: 'switch', label: 'Enable registration', value: true },
        { type: 'switch', label: 'Require email verification', value: true },
        { type: 'switch', label: 'Enable sportsbook', value: true },
        { type: 'switch', label: 'Enable live casino', value: true },
      ],
    },
    {
      title: 'Security', desc: 'Session and credential policy.',
      fields: [
        { type: 'select', label: 'Admin session timeout', value: '30 minutes', options: ['15 minutes', '30 minutes', '1 hour', '4 hours'] },
        { type: 'switch', label: 'Enforce 2FA for all admins', value: true },
        { type: 'switch', label: 'IP allowlist for admin panel', value: false },
        { type: 'switch', label: 'Withdrawal 4-eye approval above $10K', value: true },
      ],
    },
  ],
};
specs['system/maintenance'] = {
  title: 'Maintenance Mode',
  description: 'Temporarily restrict player access during deployments.',
  settings: [
    {
      title: 'Maintenance window', desc: 'Players see a branded maintenance screen; admins keep access.',
      fields: [
        { type: 'switch', label: 'Maintenance mode', value: false },
        { type: 'select', label: 'Scope', value: 'Full platform', options: ['Full platform', 'Casino only', 'Sportsbook only', 'Cashier only'] },
        { type: 'text', label: 'Announcement message', value: 'We are upgrading your experience — back in a few minutes!' },
        { type: 'switch', label: 'Allow VIP players through', value: false },
        { type: 'switch', label: 'Queue in-flight bets for settlement', value: true },
      ],
    },
  ],
};
specs['system/localization'] = {
  title: 'Localization Settings',
  description: 'Regional formats and supported locales.',
  settings: [
    {
      title: 'Locales', desc: 'Locales offered to players and admins.',
      fields: [
        { type: 'switch', label: 'English (en)', value: true },
        { type: 'switch', label: 'Portuguese — Brazil (pt-BR)', value: true },
        { type: 'switch', label: 'German (de)', value: true },
        { type: 'switch', label: 'Japanese (ja)', value: true },
        { type: 'switch', label: 'Turkish (tr)', value: false },
        { type: 'switch', label: 'Vietnamese (vi)', value: false },
      ],
    },
    {
      title: 'Formatting', desc: 'Applied across tables and reports.',
      fields: [
        { type: 'select', label: 'Date format', value: 'MMM D, YYYY', options: ['MMM D, YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD'] },
        { type: 'select', label: 'Number grouping', value: '1,234,567.89', options: ['1,234,567.89', '1.234.567,89', '1 234 567,89'] },
        { type: 'select', label: 'Week starts on', value: 'Monday', options: ['Monday', 'Sunday'] },
      ],
    },
  ],
};
specs['system/currency'] = {
  title: 'Currency Settings',
  description: 'Supported currencies, display precision and FX source.',
  table: {
    source: staticSrc([
      { id: 'USD', currency: 'USD', name: 'US Dollar', type: 'Fiat', precision: 2, rate: '1.0000', status: 'enabled' },
      { id: 'EUR', currency: 'EUR', name: 'Euro', type: 'Fiat', precision: 2, rate: '0.9214', status: 'enabled' },
      { id: 'GBP', currency: 'GBP', name: 'British Pound', type: 'Fiat', precision: 2, rate: '0.7642', status: 'disabled' },
      { id: 'BTC', currency: 'BTC', name: 'Bitcoin', type: 'Crypto', precision: 8, rate: '0.0000092', status: 'enabled' },
      { id: 'ETH', currency: 'ETH', name: 'Ethereum', type: 'Crypto', precision: 8, rate: '0.00027', status: 'enabled' },
      { id: 'USDT', currency: 'USDT', name: 'Tether', type: 'Stablecoin', precision: 2, rate: '1.0002', status: 'enabled' },
      { id: 'LTC', currency: 'LTC', name: 'Litecoin', type: 'Crypto', precision: 8, rate: '0.0091', status: 'enabled' },
    ]),
    exportName: 'currencies', searchPlaceholder: 'Search currencies…',
    filters: [{ key: 'type', label: 'Type', options: ['Fiat', 'Crypto', 'Stablecoin'] }],
    columns: [
      { key: 'currency', label: 'Currency', render: r => <span className="flex items-center gap-2"><CurrencyIcon currency={String(r.currency)} size={22} /><span className="font-mono text-sm font-semibold text-adm-text">{String(r.currency)}</span></span> },
      { key: 'name', label: 'Name', render: r => <TextCell v={String(r.name)} /> },
      { key: 'type', label: 'Type', render: r => <Badge variant="neutral">{String(r.type)}</Badge> },
      { key: 'precision', label: 'Decimals', align: 'center', render: r => <span className="tnum text-adm-muted">{String(r.precision)}</span> },
      { key: 'rate', label: 'Rate vs USD', align: 'right', render: r => <span className="tnum font-mono text-xs text-adm-muted">{String(r.rate)}</span> },
      status(),
    ],
    autoDetail: true, detailTitle: r => `${r.currency} settings`,
  },
};
specs['system/timezone'] = {
  title: 'Timezone Settings',
  description: 'Reporting and display timezone configuration.',
  settings: [
    {
      title: 'Reporting timezone', desc: 'All daily boundaries, reports and settlements use this zone.',
      fields: [
        { type: 'select', label: 'Platform timezone', value: 'UTC', options: ['UTC', 'Europe/London', 'America/Sao_Paulo', 'Asia/Tokyo', 'America/New_York'] },
        { type: 'select', label: 'Day boundary', value: '00:00', options: ['00:00', '04:00', '06:00'] },
        { type: 'switch', label: 'Show times in admin local zone', value: true },
        { type: 'switch', label: '24-hour clock', value: true },
      ],
    },
  ],
};

/* ===== resolver ===== */
export function getPageSpec(pathname: string): PageSpec | null {
  const key = pathname.replace(/^\/admin\/?/, '').replace(/\/$/, '');
  if (!key || key === 'dashboard') return null; // handled by handcrafted pages
  return specs[key] ?? null;
}

export { specs, src, staticSrc, CHART_DATA };
