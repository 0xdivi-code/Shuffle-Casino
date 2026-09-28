'use client';
import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Ban, CheckCircle2, XCircle, Pencil, Plus, ShieldAlert, Wallet as WalletIcon,
  ArrowDownToLine, ArrowUpFromLine, Crown, KeyRound, Smartphone,
} from 'lucide-react';
import { toast } from 'sonner';
import { data } from '@/lib/admin/api';
import { PageHeader } from '@/components/admin/blocks/page-header';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge, statusVariant } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { UserAvatar } from '@/components/ui/avatar';
import { EmptyState } from '@/components/admin/blocks/states';
import { FieldGrid, Timeline, DrawerSection } from '@/components/admin/blocks/detail';
import { ConfirmDialog, closedConfirm, type ConfirmState } from '@/components/admin/blocks/confirm';
import { MoneyCell, StatusCell, CurrencyIcon, RiskPill } from '@/components/admin/blocks/cells';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fmtMoney, fmtDate, relTime, cn } from '@/lib/admin/utils';

export default function PlayerProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const player = data.players.find(p => p.id === params.id) ?? data.players[0];
  const txs = data.transactions.filter(t => t.playerId === player.id);
  const bets = data.bets.filter(b => b.playerId === player.id);
  const sessions = data.sessions.filter(s => s.playerId === player.id);
  const docs = data.kycDocs.filter(k => k.playerId === player.id);
  const bonii = data.campaigns.slice(0, 4);

  const [notes, setNotes] = React.useState([
    { id: 1, author: 'Tomás Herrera', time: new Date(Date.now() - 2 * 86400e3).toISOString(), text: 'Player called about withdrawal delay — reassured standard ETA. Polite, VIP treatment.' },
    { id: 2, author: 'Ingrid Bergström', time: new Date(Date.now() - 9 * 86400e3).toISOString(), text: 'Device fingerprint shared across 2 accounts — cleared after ID check.' },
  ]);
  const [noteDraft, setNoteDraft] = React.useState('');
  const [confirm, setConfirm] = React.useState<ConfirmState>(closedConfirm);
  const [rgState, setRgState] = React.useState({ depositLimit: true, lossLimit: false, realityCheck: true, coolOff: false });

  const addNote = () => {
    if (!noteDraft.trim()) return toast.error('Write a note first');
    setNotes(n => [{ id: Date.now(), author: 'Alexandra Voss', time: new Date().toISOString(), text: noteDraft.trim() }, ...n]);
    setNoteDraft('');
    toast.success('Note added — visible to all support roles');
  };

  return (
    <div>
      <PageHeader title="Player Profile" description="Complete account view across wallets, activity, compliance and risk."
        actions={
          <>
            <Button variant="secondary" onClick={() => router.back()}><ArrowLeft className="h-3.5 w-3.5" /> Back</Button>
            <Button variant="danger" onClick={() => setConfirm({ open: true, title: `Suspend ${player.username}?`, description: 'The player will be logged out immediately and blocked from depositing or betting. Funds stay frozen pending review.', confirmLabel: 'Suspend account', danger: true, onConfirm: () => toast.warning(`${player.username} suspended — audit entry created`) })}>
              <Ban className="h-3.5 w-3.5" /> Suspend
            </Button>
          </>
        }
      />

      {/* identity strip */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 rounded-adm-lg border border-adm-line bg-adm-card p-4 shadow-adm">
        <div className="flex flex-wrap items-center gap-4">
          <UserAvatar name={player.username} size={14} />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-bold text-adm-text">{player.username}</h2>
              <Badge variant={statusVariant(player.status)} className="capitalize">{player.status}</Badge>
              <Badge variant={statusVariant(player.kyc)}>KYC {player.kyc}</Badge>
              {player.vipLevel >= 4 && <Badge variant="gold"><Crown className="h-3 w-3" /> {player.vipName}</Badge>}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-adm-muted">
              <span className="font-mono">{player.id}</span>
              <span>{player.email}</span>
              <span>{player.country}</span>
              <span>Joined {fmtDate(player.registeredAt)}</span>
              <span>Last login {relTime(player.lastLogin)}</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="rounded-adm bg-adm-inset/70 px-4 py-2 text-center ring-1 ring-white/[.05]">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-adm-dim">Balance</div>
              <div className="tnum text-base font-bold text-adm-text">{fmtMoney(player.balance, player.currency, true)}</div>
            </div>
            <div className="rounded-adm bg-adm-inset/70 px-4 py-2 text-center ring-1 ring-white/[.05]">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-adm-dim">Lifetime GGR</div>
              <div className={cn('tnum text-base font-bold', player.ggr >= 0 ? 'text-adm-green' : 'text-adm-red')}>{fmtMoney(player.ggr, 'USD', true)}</div>
            </div>
            <div className="hidden rounded-adm bg-adm-inset/70 px-4 py-2 text-center ring-1 ring-white/[.05] sm:block">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-adm-dim">Risk</div>
              <div className="mt-1"><RiskPill level={player.risk} /></div>
            </div>
          </div>
        </div>
      </motion.div>

      <Tabs defaultValue="overview">
        <TabsList className="max-w-full">
          {['overview', 'wallet', 'transactions', 'bets', 'bonuses', 'kyc', 'sessions', 'devices', 'responsible-gaming', 'notes', 'activity-log'].map(t => (
            <TabsTrigger key={t} value={t} className="capitalize">{t.replace(/-/g, ' ')}</TabsTrigger>
          ))}
        </TabsList>

        {/* -------- Overview -------- */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Account summary</CardTitle></CardHeader>
              <CardContent>
                <FieldGrid cols={3} fields={[
                  { label: 'Player ID', value: player.id, mono: true },
                  { label: 'Email', value: player.email },
                  { label: 'Country', value: player.country },
                  { label: 'Currency', value: player.currency },
                  { label: 'VIP level', value: player.vipName },
                  { label: '2FA', value: player.twoFA ? 'Enabled' : 'Disabled' },
                  { label: 'Total deposits', value: fmtMoney(player.totalDeposits, 'USD', true) },
                  { label: 'Total withdrawals', value: fmtMoney(player.totalWithdrawals, 'USD', true) },
                  { label: 'Lifetime bets', value: player.lifetimeBets.toLocaleString() },
                  { label: 'Favorite game', value: player.favoriteGame },
                  { label: 'Registered', value: fmtDate(player.registeredAt, true) },
                  { label: 'Last login', value: fmtDate(player.lastLogin, true) },
                  { label: 'IP address', value: player.ip, mono: true },
                  { label: 'Device', value: player.device },
                  { label: 'Tags', value: player.tags.length ? player.tags.join(', ') : '—' },
                ]} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Recent timeline</CardTitle></CardHeader>
              <CardContent>
                <Timeline items={[
                  { title: 'Logged in', desc: player.device, time: player.lastLogin },
                  { title: 'Deposit completed', desc: 'USDT (TRC-20) · credited instantly', time: player.lastLogin, tone: 'green' },
                  { title: 'Big win 🎉', desc: `${player.favoriteGame} · ${fmtMoney(player.balance * 0.4, 'USD', true)}`, time: player.lastLogin, tone: 'green' },
                  { title: 'KYC updated', desc: `Status now ${player.kyc}`, time: player.registeredAt, tone: player.kyc === 'verified' ? 'green' : 'amber' },
                  { title: 'Account created', desc: 'Organic registration', time: player.registeredAt },
                ]} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* -------- Wallet -------- */}
        <TabsContent value="wallet">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: 'Available balance', value: fmtMoney(player.balance, player.currency, true), icon: WalletIcon, cls: 'text-adm-text' },
              { label: 'Bonus balance', value: fmtMoney(player.balance * 0.12, player.currency, true), icon: ArrowDownToLine, cls: 'text-adm-gold' },
              { label: 'Locked / pending', value: fmtMoney(player.balance * 0.04, player.currency, true), icon: ArrowUpFromLine, cls: 'text-adm-amber' },
            ].map((w, i) => (
              <motion.div key={w.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card><CardContent className="flex items-center gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-adm bg-adm-brandsoft text-adm-brand2"><w.icon className="h-[18px] w-[18px]" /></span>
                  <span>
                    <div className="text-[11px] font-medium uppercase tracking-wider text-adm-dim">{w.label}</div>
                    <div className={cn('tnum text-xl font-bold', w.cls)}>{w.value}</div>
                  </span>
                </CardContent></Card>
              </motion.div>
            ))}
          </div>
          <Card className="mt-4">
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Wallet adjustments</CardTitle>
              <div className="flex gap-2">
                <Button size="sm" variant="success" onClick={() => setConfirm({ open: true, title: 'Credit player wallet', description: `Add ${fmtMoney(100, player.currency, true)} to ${player.username}'s available balance. This creates an adjustment transaction and an audit entry.`, confirmLabel: 'Credit wallet', onConfirm: () => toast.success(`${fmtMoney(100, player.currency, true)} credited to ${player.username}`) })}>
                  <Plus className="h-3.5 w-3.5" /> Credit
                </Button>
                <Button size="sm" variant="danger" onClick={() => toast.error('Debit requires compliance approval — request submitted')}>Debit</Button>
              </div>
            </CardHeader>
            <CardContent className="text-[12.5px] text-adm-muted">
              Manual adjustments post to the ledger immediately and appear in Transactions. Amounts above $1,000 require dual approval.
            </CardContent>
          </Card>
        </TabsContent>

        {/* -------- Transactions -------- */}
        <TabsContent value="transactions">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Transactions ({txs.length})</CardTitle>
              <Link href="/admin/finance/transactions"><Button size="sm" variant="secondary">Open finance view</Button></Link>
            </CardHeader>
            <CardContent className="p-0">
              {txs.length === 0 ? <EmptyState title="No transactions yet" hint="This player has not made any deposits or withdrawals." /> : (
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>ID</TableHead><TableHead>Type</TableHead><TableHead>Amount</TableHead><TableHead>Method</TableHead><TableHead>Status</TableHead><TableHead>Date</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {txs.slice(0, 12).map(t => (
                      <TableRow key={t.id} className="adm-row-hover">
                        <TableCell className="font-mono text-xs text-adm-muted">{t.id}</TableCell>
                        <TableCell><Badge variant={t.type === 'deposit' ? 'green' : t.type === 'withdrawal' ? 'amber' : 'neutral'}>{t.type}</Badge></TableCell>
                        <TableCell><MoneyCell v={t.amount} currency={t.currency} signed /></TableCell>
                        <TableCell className="text-adm-muted">{t.method}</TableCell>
                        <TableCell><StatusCell v={t.status} /></TableCell>
                        <TableCell className="text-adm-muted">{fmtDate(t.date, true)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* -------- Bets -------- */}
        <TabsContent value="bets">
          <Card>
            <CardHeader><CardTitle>Betting history ({bets.length})</CardTitle></CardHeader>
            <CardContent className="p-0">
              {bets.length === 0 ? <EmptyState title="No bets placed" hint="Rounds will appear here as soon as the player starts playing." /> : (
                <Table>
                  <TableHeader><TableRow>
                    <TableHead>Bet ID</TableHead><TableHead>Game</TableHead><TableHead>Provider</TableHead><TableHead>Stake</TableHead><TableHead>Payout</TableHead><TableHead>Result</TableHead><TableHead>Time</TableHead>
                  </TableRow></TableHeader>
                  <TableBody>
                    {bets.slice(0, 12).map(b => (
                      <TableRow key={b.id} className="adm-row-hover">
                        <TableCell className="font-mono text-xs text-adm-muted">{b.id}</TableCell>
                        <TableCell className="font-medium text-adm-text">{b.game}</TableCell>
                        <TableCell className="text-adm-muted">{b.provider}</TableCell>
                        <TableCell><MoneyCell v={b.amount} /></TableCell>
                        <TableCell><MoneyCell v={b.payout} /></TableCell>
                        <TableCell><StatusCell v={b.result} /></TableCell>
                        <TableCell className="text-adm-muted">{fmtDate(b.time, true)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* -------- Bonuses -------- */}
        <TabsContent value="bonuses">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {bonii.map((b, i) => (
              <Card key={b.id + i}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-[13.5px] font-semibold text-adm-text">{b.name}</h4>
                      <p className="mt-0.5 text-xs text-adm-muted">{b.type} · {b.wager}× wager · {b.channel}</p>
                    </div>
                    <StatusCell v={i === 2 ? 'claimed' : i === 3 ? 'expired' : 'available'} />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-adm-dim">Budget {fmtMoney(b.budget, 'USD', true)}</span>
                    <Button size="sm" variant="secondary" onClick={() => toast.success(`"${b.name}" granted to ${player.username}`)}>Grant manually</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* -------- KYC -------- */}
        <TabsContent value="kyc">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Verification status</CardTitle></CardHeader>
              <CardContent>
                <FieldGrid fields={[
                  { label: 'KYC status', value: <Badge variant={statusVariant(player.kyc)}>{player.kyc}</Badge> },
                  { label: 'ID document', value: docs[0]?.docType ?? 'Passport' },
                  { label: 'Proof of address', value: docs[1]?.docType ?? 'Utility Bill' },
                  { label: 'Last review', value: fmtDate(player.lastLogin, true) },
                  { label: 'Reviewer', value: docs[0]?.reviewer ?? '—' },
                  { label: 'PEP screening', value: <Badge variant="green">Clear</Badge> },
                ]} />
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="success" onClick={() => toast.success(`${player.username} marked as verified`)}><CheckCircle2 className="h-3.5 w-3.5" /> Approve KYC</Button>
                  <Button size="sm" variant="danger" onClick={() => setConfirm({ open: true, title: 'Reject KYC?', description: `${player.username} will be asked to resubmit documents. Withdrawals stay locked until verified.`, confirmLabel: 'Reject', danger: true, onConfirm: () => toast.error('KYC rejected — resubmission requested') })}><XCircle className="h-3.5 w-3.5" /> Reject</Button>
                  <Button size="sm" variant="secondary" onClick={() => toast.info('Document re-request sent to player')}><Pencil className="h-3.5 w-3.5" /> Request docs</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Submitted documents</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {(docs.length ? docs : data.kycDocs.slice(0, 3)).map(d => (
                  <div key={d.id} className="flex items-center justify-between rounded-adm border border-adm-line bg-adm-inset/50 px-3 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">🪪</span>
                      <div>
                        <div className="text-[13px] font-medium text-adm-text">{d.docType}</div>
                        <div className="text-[11px] text-adm-dim">Submitted {relTime(d.submitted)}</div>
                      </div>
                    </div>
                    <StatusCell v={d.status} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* -------- Sessions -------- */}
        <TabsContent value="sessions">
          <Card>
            <CardHeader className="flex-row items-center justify-between space-y-0">
              <CardTitle>Sessions</CardTitle>
              <Button size="sm" variant="danger" onClick={() => setConfirm({ open: true, title: 'Terminate all sessions?', description: `${player.username} will be logged out everywhere and asked to re-authenticate.`, confirmLabel: 'Terminate all', danger: true, onConfirm: () => toast.error('All sessions terminated') })}>
                Terminate all
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader><TableRow><TableHead>Session</TableHead><TableHead>Device</TableHead><TableHead>IP</TableHead><TableHead>Location</TableHead><TableHead>Duration</TableHead><TableHead>Started</TableHead><TableHead /></TableRow></TableHeader>
                <TableBody>
                  {(sessions.length ? sessions : data.sessions.slice(0, 4)).map(s => (
                    <TableRow key={s.id} className="adm-row-hover">
                      <TableCell className="font-mono text-xs text-adm-muted">{s.id}</TableCell>
                      <TableCell className="text-adm-muted">{s.device}</TableCell>
                      <TableCell className="font-mono text-xs text-adm-muted">{s.ip}</TableCell>
                      <TableCell className="text-adm-muted">{s.location}</TableCell>
                      <TableCell className="tnum text-adm-muted">{s.durationMin}m</TableCell>
                      <TableCell className="text-adm-muted">{relTime(s.started)}</TableCell>
                      <TableCell><Button size="sm" variant="ghost" className="text-adm-red" onClick={() => toast.error('Session terminated')}>End</Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* -------- Devices -------- */}
        <TabsContent value="devices">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
            {[player.device, 'Windows 11 · Edge', 'iPad Air · Safari'].map((d, i) => (
              <Card key={d}>
                <CardContent className="flex items-start gap-3 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-adm bg-adm-card2 ring-1 ring-white/[.06]"><Smartphone className="h-4 w-4 text-adm-muted" /></span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold text-adm-text">{d}</div>
                    <div className="mt-0.5 text-[11px] text-adm-dim">{player.ip} · {player.country}</div>
                    <div className="mt-2 flex items-center gap-2">
                      {i === 0 ? <Badge variant="green">Current</Badge> : <Badge variant="neutral">Trusted</Badge>}
                      <Badge variant={i === 2 ? 'amber' : 'green'}>{i === 2 ? 'New this week' : 'Seen 30d+'}</Badge>
                    </div>
                  </div>
                  <Button size="iconSm" variant="ghost" aria-label="Revoke device trust" onClick={() => toast.warning('Device trust revoked — re-login required')}><KeyRound className="h-3.5 w-3.5" /></Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* -------- Responsible gaming -------- */}
        <TabsContent value="responsible-gaming">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Player protection limits</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { k: 'depositLimit' as const, label: 'Deposit limit', desc: '$500 / day · set by player' },
                  { k: 'lossLimit' as const, label: 'Loss limit', desc: 'Not set' },
                  { k: 'realityCheck' as const, label: 'Reality check', desc: 'Reminder every 60 minutes' },
                  { k: 'coolOff' as const, label: 'Cool-off period', desc: 'No active cool-off' },
                ].map(f => (
                  <div key={f.k} className="flex items-center justify-between gap-3 rounded-adm border border-adm-line bg-adm-inset/40 px-3.5 py-3">
                    <div>
                      <div className="text-[13px] font-medium text-adm-text">{f.label}</div>
                      <div className="text-[11px] text-adm-dim">{f.desc}</div>
                    </div>
                    <Switch checked={rgState[f.k]} onCheckedChange={v => { setRgState(s => ({ ...s, [f.k]: v })); toast.success(`${f.label} ${v ? 'enabled' : 'disabled'} for ${player.username}`); }} />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Exclusion</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 rounded-adm border border-adm-red/20 bg-adm-redsoft p-4">
                  <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-adm-red" />
                  <div>
                    <div className="text-[13px] font-semibold text-adm-text">Self-exclusion</div>
                    <p className="mt-1 text-xs leading-relaxed text-adm-muted">
                      Permanently closes the account, freezes funds for regulatory hold and removes the player from all marketing. This action is logged and cannot be silently undone.
                    </p>
                    <Button variant="danger" size="sm" className="mt-3" onClick={() => setConfirm({ open: true, title: `Self-exclude ${player.username}?`, description: 'The account will be closed permanently and reported to the exclusion register. Funds follow the regulatory hold policy.', confirmLabel: 'Self-exclude player', danger: true, onConfirm: () => toast.error(`${player.username} self-excluded — register updated`) })}>
                      Apply self-exclusion
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* -------- Notes -------- */}
        <TabsContent value="notes">
          <Card>
            <CardHeader><CardTitle>Internal notes & tags</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {player.tags.map(t => <Badge key={t} variant="default">{t}</Badge>)}
                <Button size="sm" variant="ghost" onClick={() => toast.success('Tag picker connects to the tagging API')}><Plus className="h-3 w-3" /> Add tag</Button>
              </div>
              <div className="flex gap-2">
                <Textarea value={noteDraft} onChange={e => setNoteDraft(e.target.value)} placeholder="Add an internal note… (visible to support, risk and compliance)" />
                <Button className="h-auto" onClick={addNote}><Plus className="h-4 w-4" /> Add</Button>
              </div>
              <div className="space-y-3">
                {notes.map(nt => (
                  <div key={nt.id} className="rounded-adm border border-adm-line bg-adm-inset/40 p-3.5">
                    <div className="flex items-center gap-2">
                      <UserAvatar name={nt.author} size={6} />
                      <span className="text-[12.5px] font-semibold text-adm-text">{nt.author}</span>
                      <span className="text-[11px] text-adm-dim">{relTime(nt.time)}</span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-adm-muted">{nt.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* -------- Activity log -------- */}
        <TabsContent value="activity-log">
          <Card>
            <CardHeader><CardTitle>Account activity log</CardTitle></CardHeader>
            <CardContent>
              <Timeline items={[
                { title: 'Logged in', desc: `${player.device} · ${player.ip}`, time: player.lastLogin },
                { title: 'Deposit completed', desc: 'USDT (TRC-20) · credited instantly', time: player.lastLogin, tone: 'green' },
                { title: 'Withdrawal approved', desc: `${fmtMoney(player.totalWithdrawals * 0.02, 'USD', true)} · auto-approved under threshold`, time: player.lastLogin, tone: 'green' },
                { title: 'Bonus claimed', desc: 'Welcome package · stage 2 of 3', time: player.registeredAt, tone: 'amber' },
                { title: 'KYC submitted', desc: 'Passport + utility bill', time: player.registeredAt },
                { title: 'Account created', desc: 'Organic registration · no referral code', time: player.registeredAt },
              ]} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ConfirmDialog state={confirm} onClose={() => setConfirm(closedConfirm)} />
    </div>
  );
}
