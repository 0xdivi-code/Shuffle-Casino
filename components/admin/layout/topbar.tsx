'use client';
import * as React from 'react';
import Link from 'next/link';
import { Menu, Search, Bell, ExternalLink, Settings2, LogOut, User, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { notifications as seedNotifications } from '@/lib/admin/data/world';
import { relTime, cn } from '@/lib/admin/utils';
import { toast } from 'sonner';

interface TopbarProps {
  onOpenMobileNav: () => void;
  onOpenCommand: () => void;
}

const KIND_CLS: Record<string, string> = {
  risk: 'bg-adm-redsoft text-adm-red',
  finance: 'bg-adm-greensoft text-adm-green',
  system: 'bg-adm-bluesoft text-adm-blue',
  compliance: 'bg-adm-ambersoft text-adm-amber',
  marketing: 'bg-adm-brandsoft text-adm-brand2',
};

export function Topbar({ onOpenMobileNav, onOpenCommand }: TopbarProps) {
  const [notifOpen, setNotifOpen] = React.useState(false);
  const [items, setItems] = React.useState(seedNotifications);
  const unread = items.filter(i => i.unread).length;

  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b border-adm-line bg-adm-panel/85 px-3 backdrop-blur-md sm:px-4">
      <button onClick={onOpenMobileNav} className="rounded-md p-2 text-adm-muted hover:bg-white/[.05] hover:text-adm-text lg:hidden" aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </button>

      {/* global search */}
      <button
        onClick={onOpenCommand}
        className="group flex h-9 w-full max-w-[300px] items-center gap-2 rounded-adm border border-adm-line bg-adm-inset px-3 text-left transition-colors hover:border-adm-line2 sm:max-w-[380px]"
      >
        <Search className="h-3.5 w-3.5 shrink-0 text-adm-dim" />
        <span className="flex-1 truncate text-[13px] text-adm-dim">Search players, games, transactions…</span>
        <kbd className="hidden rounded border border-adm-line2 bg-adm-card2 px-1.5 py-0.5 font-mono text-[10px] text-adm-dim sm:inline-flex">⌘K</kbd>
      </button>

      <div className="ml-auto flex items-center gap-1.5">
        <Link href="/" target="_blank">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            <ExternalLink className="h-3.5 w-3.5" /> View Casino
          </Button>
        </Link>

        {/* notifications */}
        <DropdownMenu open={notifOpen} onOpenChange={setNotifOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative text-adm-muted hover:text-adm-text">
              <Bell className="h-[18px] w-[18px]" />
              {unread > 0 && (
                <span className="tnum absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-adm-red px-1 text-[9px] font-bold text-white ring-2 ring-adm-panel">
                  {unread}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[340px] p-0">
            <div className="flex items-center justify-between border-b border-adm-line px-3.5 py-2.5">
              <span className="text-[13px] font-semibold text-adm-text">Notifications</span>
              <button
                onClick={() => { setItems(prev => prev.map(i => ({ ...i, unread: false }))); toast.success('All notifications marked as read'); }}
                className="text-[11px] font-medium text-adm-brand2 hover:underline"
              >
                Mark all read
              </button>
            </div>
            <div className="max-h-[380px] overflow-y-auto">
              {items.map(n => (
                <button
                  key={n.id}
                  onClick={() => setItems(prev => prev.map(i => i.id === n.id ? { ...i, unread: false } : i))}
                  className={cn('flex w-full items-start gap-2.5 px-3.5 py-2.5 text-left transition-colors hover:bg-white/[.03]', n.unread && 'bg-[rgba(139,92,246,0.10)]')}
                >
                  <span className={cn('mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[13px]', KIND_CLS[n.kind] || 'bg-white/[.06] text-adm-muted')}>
                    {n.kind === 'risk' ? '⚠' : n.kind === 'finance' ? '$' : n.kind === 'compliance' ? '✓' : n.kind === 'marketing' ? '◎' : '⚙'}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-adm-text">
                      {n.title}
                      {n.unread && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-adm-brand" />}
                    </span>
                    <span className="mt-0.5 block truncate text-[11.5px] text-adm-muted">{n.body}</span>
                    <span className="mt-0.5 block text-[10px] text-adm-dim">{relTime(n.time)}</span>
                  </span>
                </button>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 flex items-center gap-2 rounded-full p-0.5 transition-all hover:ring-2 hover:ring-adm-brand/40 adm-focus">
              <UserAvatar name="Alexandra Voss" size={8} />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[230px]">
            <DropdownMenuLabel className="normal-case tracking-normal">
              <div className="text-[13px] font-semibold text-adm-text">Alexandra Voss</div>
              <div className="mt-0.5 text-[11px] font-normal text-adm-dim">alexandra@shuffle.com</div>
              <span className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-adm-goldsoft px-1.5 py-0.5 text-[10px] font-semibold text-adm-gold">
                <ShieldCheck className="h-3 w-3" /> Super Admin
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><User /> My profile</DropdownMenuItem>
            <DropdownMenuItem asChild><Link href="/admin/system/settings"><Settings2 /> Preferences</Link></DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => toast.info('Signed out (demo) — session would be revoked here')} className="text-adm-red data-[highlighted]:text-adm-red">
              <LogOut /> Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
