'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronsLeft, ChevronsRight, X } from 'lucide-react';
import { NAV_SECTIONS } from '@/lib/admin/nav';
import { cn } from '@/lib/admin/utils';
import { AdminLogo } from './logo';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({ collapsed, onToggleCollapsed, mobileOpen, onCloseMobile }: SidebarProps) {
  const pathname = usePathname();
  const [openSections, setOpenSections] = React.useState<Set<string>>(() => new Set(['dashboard']));

  // auto-expand the section that contains the current route
  React.useEffect(() => {
    const active = NAV_SECTIONS.find(s => s.items.some(i => pathname === i.href || pathname.startsWith(i.href + '/')));
    if (active) setOpenSections(prev => new Set(prev).add(active.id));
  }, [pathname]);

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const body = (
    <div className="flex h-full flex-col bg-adm-panel">
      {/* logo */}
      <div className={cn('flex h-14 shrink-0 items-center border-b border-adm-line px-3', collapsed ? 'justify-center' : 'justify-between')}>
        <Link href="/admin/dashboard" className="flex items-center gap-2.5" onClick={onCloseMobile}>
          <AdminLogo collapsed={collapsed} />
        </Link>
        <button onClick={onCloseMobile} className="rounded-md p-1.5 text-adm-dim hover:bg-white/[.05] hover:text-adm-text lg:hidden" aria-label="Close menu">
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* nav */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-2 py-3">
        {NAV_SECTIONS.map(section => {
          const isActive = section.items.some(i => pathname === i.href || pathname.startsWith(i.href + '/'));
          const open = openSections.has(section.id);
          const Icon = section.icon;

          if (collapsed) {
            return (
              <Tooltip key={section.id} delayDuration={100}>
                <TooltipTrigger asChild>
                  <Link
                    href={section.items[0].href}
                    className={cn(
                      'mx-auto flex h-9 w-9 items-center justify-center rounded-adm transition-colors',
                      isActive ? 'bg-adm-brandsoft text-adm-brand2' : 'text-adm-dim hover:bg-white/[.05] hover:text-adm-text'
                    )}
                    onClick={onCloseMobile}
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">{section.title}</TooltipContent>
              </Tooltip>
            );
          }

          return (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className={cn(
                  'flex w-full items-center gap-2.5 rounded-adm px-2.5 py-2 text-[13px] font-medium transition-colors',
                  isActive ? 'text-adm-text' : 'text-adm-muted hover:bg-white/[.04] hover:text-adm-text'
                )}
              >
                <Icon className={cn('h-[18px] w-[18px] shrink-0', isActive ? 'text-adm-brand2' : 'text-adm-dim')} />
                <span className="flex-1 truncate text-left">{section.title}</span>
                <ChevronDown className={cn('h-3.5 w-3.5 text-adm-dim transition-transform duration-200', open && 'rotate-180')} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="ml-[21px] space-y-px border-l border-adm-line py-1 pl-2.5">
                      {section.items.map(item => {
                        const active = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={onCloseMobile}
                            className={cn(
                              'group relative flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-[12.5px] transition-colors',
                              active ? 'bg-adm-brandsoft font-medium text-adm-brand2' : 'text-adm-muted hover:bg-white/[.04] hover:text-adm-text'
                            )}
                          >
                            <span className="truncate">{item.title}</span>
                            <span className="flex items-center gap-1.5">
                              {item.dot && <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-adm-green" />}
                              {item.badge !== undefined && (
                                <span className={cn(
                                  'tnum rounded-md px-1.5 py-px text-[10px] font-semibold',
                                  active ? 'bg-adm-brand/25 text-adm-brand2' : 'bg-white/[.06] text-adm-dim group-hover:text-adm-muted'
                                )}>
                                  {item.badge}
                                </span>
                              )}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* collapse toggle (desktop) */}
      <div className="hidden shrink-0 border-t border-adm-line p-2 lg:block">
        <button
          onClick={onToggleCollapsed}
          className="flex w-full items-center justify-center gap-2 rounded-adm px-2 py-2 text-xs text-adm-dim transition-colors hover:bg-white/[.04] hover:text-adm-text"
        >
          {collapsed ? <ChevronsRight className="h-4 w-4" /> : (<><ChevronsLeft className="h-4 w-4" /> Collapse</>)}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* desktop */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 248 }}
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className="sticky top-0 z-40 hidden h-screen shrink-0 border-r border-adm-line lg:block"
      >
        {body}
      </motion.aside>

      {/* mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-[2px] lg:hidden"
              onClick={onCloseMobile}
            />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-[61] w-[268px] border-r border-adm-line lg:hidden"
            >
              {body}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
