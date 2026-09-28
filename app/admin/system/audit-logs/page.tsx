'use client';
import * as React from 'react';
import { FileClock, Download, ShieldCheck, ShieldX, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/blocks/page-header';
import { StatCard, type StatSpec } from '@/components/admin/blocks/stat-card';
import { DataTable, type Column } from '@/components/admin/blocks/data-table';
import { adminApi } from '@/lib/admin/api';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/avatar';
import { DrawerHeader, DrawerBody, DrawerSection, FieldGrid, DrawerFooter } from '@/components/admin/blocks/detail';
import { fmtDate, cn } from '@/lib/admin/utils';

type Row = Record<string, unknown>;

const ACTION_TONES: Record<string, 'green' | 'red' | 'amber' | 'default'> = {
  suspend: 'red', unsuspend: 'green', approve: 'green', reject: 'red', revoke: 'red',
  disable: 'red', enable: 'green', adjust: 'amber', update: 'default', create: 'green',
};

function actionTone(action: string) {
  for (const k of Object.keys(ACTION_TONES)) if (action.includes(k)) return ACTION_TONES[k];
  return 'default';
}

export default function AuditLogsPage() {
  const stats: StatSpec[] = [
    { label: 'Events (24h)', value: '1,284', delta: 8.4, icon: FileClock },
    { label: 'Admins active', value: '9', delta: 0, icon: ShieldCheck, color: '#34d399' },
    { label: 'Denied actions', value: '14', delta: -12.0, sub: 'permission errors', icon: ShieldX, color: '#f4587a' },
    { label: 'Sensitive changes', value: '38', delta: 4, sub: 'RTP, limits, roles', icon: AlertTriangle, color: '#fbbf24' },
  ];

  const columns: Column<Row>[] = [
    { key: 'admin', label: 'Admin', render: r => <span className="flex items-center gap-2"><UserAvatar name={String(r.admin)} size={7} /><span className="font-medium text-adm-text">{String(r.admin)}</span></span> },
    { key: 'action', label: 'Action', render: r => { const t = actionTone(String(r.action)); return <Badge variant={t === 'green' ? 'green' : t === 'red' ? 'red' : t === 'amber' ? 'amber' : 'neutral'} className="font-mono text-[10.5px]">{String(r.action)}</Badge>; } },
    { key: 'resource', label: 'Resource', render: r => <span className="text-adm-muted">{String(r.resource)}</span> },
    { key: 'change', label: 'Change', hideBelow: 'md', render: r => r.before !== '—' ? (
      <span className="flex items-center gap-1.5 font-mono text-[11px]">
        <span className="rounded bg-adm-redsoft px-1.5 py-0.5 text-adm-red line-through">{String(r.before)}</span>
        <span className="text-adm-dim">→</span>
        <span className="rounded bg-adm-greensoft px-1.5 py-0.5 text-adm-green">{String(r.after)}</span>
      </span>
    ) : <span className="text-adm-dim">—</span> },
    { key: 'ip', label: 'IP address', hideBelow: 'lg', render: r => <span className="font-mono text-xs text-adm-muted">{String(r.ip)}</span> },
    { key: 'time', label: 'Timestamp', sortable: true, render: r => <span className="tnum text-xs text-adm-muted">{fmtDate(String(r.time), true)}</span> },
    { key: 'result', label: 'Result', render: r => <Badge variant={r.result === 'success' ? 'green' : r.result === 'denied' ? 'red' : 'amber'} className="capitalize">{String(r.result)}</Badge> },
  ];

  const drawer = (row: Row, close: () => void) => (
    <>
      <DrawerHeader title={String(row.action)} subtitle={`${row.admin} · ${fmtDate(String(row.time), true)}`} avatar={String(row.admin)} badge={<Badge variant={row.result === 'success' ? 'green' : row.result === 'denied' ? 'red' : 'amber'} className="capitalize">{String(row.result)}</Badge>} />
      <DrawerBody>
        <DrawerSection title="Event">
          <FieldGrid fields={[
            { label: 'Admin', value: String(row.admin) },
            { label: 'Action', value: <span className="font-mono text-xs">{String(row.action)}</span> },
            { label: 'Resource', value: String(row.resource) },
            { label: 'IP address', value: String(row.ip), mono: true },
            { label: 'Timestamp', value: fmtDate(String(row.time), true), span: true },
          ]} />
        </DrawerSection>
        {row.before !== '—' && (
          <DrawerSection title="Value change">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-adm border border-adm-red/25 bg-adm-redsoft p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-adm-red">Previous</div>
                <div className={cn('mt-1 font-mono text-sm text-adm-text')}>{String(row.before)}</div>
              </div>
              <div className="rounded-adm border border-adm-green/25 bg-adm-greensoft p-3">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-adm-green">New</div>
                <div className="mt-1 font-mono text-sm text-adm-text">{String(row.after)}</div>
              </div>
            </div>
          </DrawerSection>
        )}
      </DrawerBody>
      <DrawerFooter>
        <Button variant="secondary" onClick={close}>Close</Button>
        <Button onClick={() => { toast.success('Event pinned to investigation'); close(); }}>Pin to case</Button>
      </DrawerFooter>
    </>
  );

  return (
    <div>
      <PageHeader
        title="Audit Logs"
        description="Immutable record of every administrative action, with before/after values for sensitive changes."
        actions={<Button variant="secondary" onClick={() => toast.success('Audit export queued — signed CSV arrives by email')}><Download className="h-3.5 w-3.5" /> Export logs</Button>}
      />
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => <StatCard key={s.label} stat={s} index={i} />)}
      </div>
      <DataTable
        columns={columns}
        fetch={adminApi.listAuditLogs}
        searchPlaceholder="Search by admin, action or resource…"
        exportName="audit-logs"
        defaultSort={{ key: 'time', dir: 'desc' }}
        defaultPageSize={25}
        rowDetail={drawer}
        filters={[
          { key: 'result', label: 'Result', options: ['success', 'denied', 'error'] },
          { key: 'admin', label: 'Admin', options: Array.from(new Set(['Alexandra Voss', 'Marcus Chen', 'Priya Nair', 'Tomás Herrera', 'Ingrid Bergström', 'Ken Watanabe', 'Sofia Marino', 'Dmitri Volkov', 'Hannah Fischer'])) },
        ]}
      />
    </div>
  );
}
