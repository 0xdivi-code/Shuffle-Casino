'use client';
import * as React from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';
import { CommandPalette } from './command-palette';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';
import { cn } from '@/lib/admin/utils';

export function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = React.useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('adm.sidebar.collapsed') === '1';
  });
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cmdOpen, setCmdOpen] = React.useState(false);

  const toggleCollapsed = () => {
    setCollapsed(prev => {
      localStorage.setItem('adm.sidebar.collapsed', prev ? '0' : '1');
      return !prev;
    });
  };

  // ⌘K opens the command palette
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
      if (e.key === 'Escape') setCmdOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <TooltipProvider>
      <div className="admin-root font-admin flex min-h-screen text-adm-text">
        <Sidebar
          collapsed={collapsed}
          onToggleCollapsed={toggleCollapsed}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onOpenMobileNav={() => setMobileOpen(true)} onOpenCommand={() => setCmdOpen(true)} />
          <main className={cn('min-w-0 flex-1 px-3 py-5 sm:px-5 lg:px-6')}>
            <div className="mx-auto w-full max-w-[1440px]">{children}</div>
          </main>
          <footer className="border-t border-adm-line px-5 py-3 text-center text-[11px] text-adm-dim">
            Snuffle Operator Console · demo environment with simulated data · no real funds or personal data
          </footer>
        </div>
        <CommandPalette open={cmdOpen} onOpenChange={setCmdOpen} />
        <Toaster />
      </div>
    </TooltipProvider>
  );
}
