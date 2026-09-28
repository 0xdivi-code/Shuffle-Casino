'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { getBreadcrumbs } from '@/lib/admin/nav';
import { cn } from '@/lib/admin/utils';

export function Breadcrumbs() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);
  return (
    <nav className="flex items-center gap-1 text-[11.5px] text-adm-dim">
      {crumbs.map((c, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight className="h-3 w-3 text-adm-dim/60" />}
          {c.href && i < crumbs.length - 1 ? (
            <Link href={c.href} className="transition-colors hover:text-adm-muted">{c.title}</Link>
          ) : (
            <span className={cn(i === crumbs.length - 1 && 'font-medium text-adm-muted')}>{c.title}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export function PageHeader({ title, description, actions, children }: {
  title: string; description?: string; actions?: React.ReactNode; children?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3">
      <Breadcrumbs />
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-adm-text">{title}</h1>
          {description && <p className="mt-1 max-w-2xl text-[13px] text-adm-muted">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
