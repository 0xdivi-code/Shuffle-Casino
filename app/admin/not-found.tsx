import Link from 'next/link';
import { Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-adm-line bg-adm-card2">
        <Compass className="h-6 w-6 text-adm-dim" />
      </div>
      <h1 className="mt-4 text-lg font-bold text-adm-text">Page not found</h1>
      <p className="mt-1 max-w-sm text-[13px] text-adm-muted">This screen does not exist in the operator console.</p>
      <Link href="/admin/dashboard" className="mt-4">
        <Button variant="secondary">Back to Dashboard</Button>
      </Link>
    </div>
  );
}
