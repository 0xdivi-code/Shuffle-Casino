'use client';
import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass } from 'lucide-react';
import { getPageSpec } from '@/lib/admin/registry';
import { RegistryPage } from '@/components/admin/blocks/registry-page';
import { Button } from '@/components/ui/button';

export default function AdminDynamicPage() {
  const pathname = usePathname();
  const spec = getPageSpec(pathname);

  if (!spec) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-adm-line bg-adm-card2">
          <Compass className="h-6 w-6 text-adm-dim" />
        </div>
        <h1 className="mt-4 text-lg font-bold text-adm-text">Page not found</h1>
        <p className="mt-1 max-w-sm text-[13px] text-adm-muted">
          The screen <span className="font-mono text-xs">{pathname}</span> does not exist in the operator console.
        </p>
        <Link href="/admin/dashboard" className="mt-4">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return <RegistryPage spec={spec} />;
}
