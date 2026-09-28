'use client';
import * as React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Plus, Save, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/blocks/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/admin/utils';

const ROLES = [
  { name: 'Super Admin', members: 1, desc: 'Unrestricted access to every module and setting.', locked: true, color: '#f2b93b' },
  { name: 'Admin', members: 2, desc: 'Full operational access except system settings.', locked: false, color: '#8b5cf6' },
  { name: 'Finance', members: 1, desc: 'Payments, treasury and financial reporting.', locked: false, color: '#34d399' },
  { name: 'Support', members: 3, desc: 'Player profiles, notes and limited wallet tools.', locked: false, color: '#4da3ff' },
  { name: 'Risk Manager', members: 1, desc: 'Risk queue, blocklists and session controls.', locked: false, color: '#f4587a' },
  { name: 'Compliance', members: 2, desc: 'KYC, AML and responsible gaming tools.', locked: false, color: '#22d3ee' },
  { name: 'Marketing', members: 1, desc: 'Campaigns, banners, CRM and affiliates.', locked: false, color: '#fb923c' },
  { name: 'Game Manager', members: 1, desc: 'Casino catalog, ordering and RTP overrides.', locked: false, color: '#a3e635' },
  { name: 'Analyst', members: 1, desc: 'Read-only access to reports and dashboards.', locked: false, color: '#94a3b8' },
];

const RESOURCES = ['Players', 'Transactions', 'Withdrawals', 'Games', 'Sportsbook', 'Bonuses', 'Affiliates', 'Reports', 'Risk', 'Compliance', 'Marketing', 'CMS', 'System'];
const PERMS = ['View', 'Create', 'Edit', 'Delete', 'Approve', 'Export'] as const;

/** deterministic baseline permission map per role */
function basePerms(role: string): Set<string> {
  const set = new Set<string>();
  const all = () => { RESOURCES.forEach(r => PERMS.forEach(p => set.add(`${r}:${p}`))); };
  const viewer = () => { RESOURCES.forEach(r => { set.add(`${r}:View`); set.add(`${r}:Export`); }); };
  switch (role) {
    case 'Super Admin': all(); break;
    case 'Admin': all(); RESOURCES.forEach(r => set.delete(`${r}:Delete`)); break;
    case 'Analyst': viewer(); break;
    case 'Finance':
      ['Transactions', 'Withdrawals', 'Reports', 'Players'].forEach(r => PERMS.forEach(p => set.add(`${r}:${p}`)));
      viewer(); break;
    case 'Support':
      ['Players'].forEach(r => ['View', 'Edit', 'Create'].forEach(p => set.add(`${r}:${p}`)));
      ['Transactions', 'Bonuses'].forEach(r => set.add(`${r}:View`)); viewer(); break;
    case 'Risk Manager':
      ['Risk', 'Players', 'Compliance'].forEach(r => PERMS.forEach(p => set.add(`${r}:${p}`)));
      viewer(); break;
    case 'Compliance':
      ['Compliance', 'Players'].forEach(r => PERMS.forEach(p => set.add(`${r}:${p}`)));
      viewer(); break;
    case 'Marketing':
      ['Marketing', 'CMS', 'Affiliates'].forEach(r => PERMS.forEach(p => set.add(`${r}:${p}`)));
      viewer(); break;
    case 'Game Manager':
      ['Games', 'Sportsbook'].forEach(r => PERMS.filter(p => p !== 'Delete').forEach(p => set.add(`${r}:${p}`)));
      viewer(); break;
  }
  return set;
}

export default function RolesPage() {
  const [selected, setSelected] = React.useState(ROLES[1]);
  const [perms, setPerms] = React.useState<Record<string, Set<string>>>(() =>
    Object.fromEntries(ROLES.map(r => [r.name, basePerms(r.name)]))
  );
  const [dirty, setDirty] = React.useState(false);

  const toggle = (res: string, perm: string) => {
    if (selected.locked) return toast.warning('Super Admin permissions are locked');
    setPerms(prev => {
      const next = { ...prev, [selected.name]: new Set(prev[selected.name]) };
      const key = `${res}:${perm}`;
      if (next[selected.name].has(key)) next[selected.name].delete(key); else next[selected.name].add(key);
      return next;
    });
    setDirty(true);
  };

  const current = perms[selected.name];

  return (
    <div>
      <PageHeader
        title="Roles & Permissions"
        description="Role-based access control across every module. Changes apply on next login and are audit-logged."
        actions={<Button disabled={!dirty} onClick={() => { setDirty(false); toast.success(`Permissions saved for ${selected.name}`); }}><Save className="h-3.5 w-3.5" /> Save changes</Button>}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[260px_1fr]">
        {/* role list */}
        <div className="space-y-2">
          <Button variant="secondary" className="w-full justify-start" onClick={() => toast.success('Role creation wizard connects to the auth service')}>
            <Plus className="h-3.5 w-3.5" /> New role
          </Button>
          {ROLES.map((r, i) => (
            <motion.button
              key={r.name}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
              onClick={() => setSelected(r)}
              className={cn(
                'w-full rounded-adm-lg border p-3 text-left transition-all',
                selected.name === r.name ? 'border-adm-brand/50 bg-adm-brandsoft shadow-adm-glow' : 'border-adm-line bg-adm-card hover:border-adm-line2'
              )}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[13px] font-semibold text-adm-text">
                  <span className="h-2 w-2 rounded-full" style={{ background: r.color }} />
                  {r.name}
                  {r.locked && <Lock className="h-3 w-3 text-adm-gold" />}
                </span>
                <Badge variant="neutral">{r.members}</Badge>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-adm-muted">{r.desc}</p>
            </motion.button>
          ))}
        </div>

        {/* permission matrix */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} key={selected.name}>
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between border-b border-adm-line px-4 py-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" style={{ color: selected.color }} />
                  <h3 className="text-[13.5px] font-semibold text-adm-text">{selected.name} — permission matrix</h3>
                </div>
                <span className="text-[11px] text-adm-dim">{current.size} grants</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-[12.5px]">
                  <thead>
                    <tr>
                      <th className="h-9 border-b border-adm-line bg-adm-inset/60 px-4 text-left text-[10.5px] font-semibold uppercase tracking-[.08em] text-adm-dim">Resource</th>
                      {PERMS.map(p => (
                        <th key={p} className="h-9 border-b border-adm-line bg-adm-inset/60 px-2 text-center text-[10.5px] font-semibold uppercase tracking-[.08em] text-adm-dim">{p}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {RESOURCES.map(res => {
                      const rowPerms = PERMS.filter(p => current.has(`${res}:${p}`));
                      return (
                        <tr key={res} className="adm-row-hover">
                          <td className="border-b border-adm-line/60 px-4 py-2.5">
                            <span className="font-medium text-adm-text">{res}</span>
                            <span className="ml-2 hidden text-[10px] text-adm-dim xl:inline">{rowPerms.length}/{PERMS.length}</span>
                          </td>
                          {PERMS.map(p => {
                            const on = current.has(`${res}:${p}`);
                            return (
                              <td key={p} className="border-b border-adm-line/60 px-2 py-2.5 text-center">
                                <span className="inline-flex justify-center">
                                  <Checkbox checked={on} onCheckedChange={() => toggle(res, p)} disabled={selected.locked} aria-label={`${res} ${p}`} />
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-[11px] text-adm-dim">
                <span>Tip: use column headers with bulk tools to grant an entire row at once (coming via API).</span>
                {dirty && <Badge variant="amber">Unsaved changes</Badge>}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
