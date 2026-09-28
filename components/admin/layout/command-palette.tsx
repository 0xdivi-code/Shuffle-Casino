'use client';
import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandShortcut } from '@/components/ui/command';
import { ALL_NAV_ITEMS } from '@/lib/admin/nav';
import { data } from '@/lib/admin/api';
import { UserPlus, ArrowDownToLine, ArrowUpFromLine, LayoutDashboard, Download, Moon, RefreshCw, Users } from 'lucide-react';

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter();
  const go = (href: string) => { router.push(href); onOpenChange(false); };

  // top players surfaced in global search for instant access
  const topPlayers = React.useMemo(() => data.players.slice(0, 6), []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[16%] max-w-[600px] -translate-y-0 overflow-hidden border-adm-line2 bg-adm-panel p-0 shadow-adm-lg">
        <Command
          className="adm-cmdk"
          filter={(value, search) => (value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0)}
        >
          <CommandInput placeholder="Type a command or search…" />
          <CommandList>
            <CommandEmpty>No results found. Try “players”, “games”, or a username.</CommandEmpty>

            <CommandGroup heading="Quick actions">
              <CommandItem value="go dashboard overview" onSelect={() => go('/admin/dashboard')}>
                <LayoutDashboard /> Go to Dashboard <CommandShortcut>G D</CommandShortcut>
              </CommandItem>
              <CommandItem value="go players list all players" onSelect={() => go('/admin/players')}>
                <Users /> Open Players <CommandShortcut>G P</CommandShortcut>
              </CommandItem>
              <CommandItem value="new player registration create" onSelect={() => { go('/admin/players'); }}>
                <UserPlus /> Register player…
              </CommandItem>
              <CommandItem value="finance deposit record" onSelect={() => go('/admin/finance/deposits')}>
                <ArrowDownToLine /> Record deposit
              </CommandItem>
              <CommandItem value="finance withdrawals approve queue" onSelect={() => go('/admin/finance/withdrawals')}>
                <ArrowUpFromLine /> Withdrawal queue
              </CommandItem>
              <CommandItem value="export current report csv download" onSelect={() => go('/admin/reports/custom')}>
                <Download /> Export report (CSV / PDF)
              </CommandItem>
            </CommandGroup>

            <CommandGroup heading="Players">
              {topPlayers.map(p => (
                <CommandItem key={p.id} value={`player ${p.username} ${p.email} ${p.id}`} onSelect={() => go(`/admin/players/${p.id}`)}>
                  <Users /> {p.username} <span className="ml-auto font-mono text-[10px] text-adm-dim">{p.id}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandGroup heading="Navigate">
              {ALL_NAV_ITEMS.map(item => (
                <CommandItem key={item.href} value={`nav ${item.section} ${item.title}`} onSelect={() => go(item.href)}>
                  <span className="text-adm-dim">↳</span> {item.title}
                  <span className="ml-auto text-[10px] text-adm-dim">{item.section}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <div className="flex items-center justify-between border-t border-adm-line px-3.5 py-2 text-[10px] text-adm-dim">
          <span><kbd className="rounded border border-adm-line2 px-1">↑↓</kbd> navigate · <kbd className="rounded border border-adm-line2 px-1">↵</kbd> open · <kbd className="rounded border border-adm-line2 px-1">esc</kbd> close</span>
          <span className="flex items-center gap-1"><RefreshCw className="h-3 w-3" /> Demo data</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
