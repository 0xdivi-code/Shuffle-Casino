import type { Metadata } from 'next';
import { AdminShell } from '@/components/admin/layout/shell';

export const metadata: Metadata = {
  title: {
    default: 'Shuffle Admin — Operator Console',
    template: '%s · Shuffle Admin',
  },
  description: 'Casino operator control center: players, finance, games, risk, compliance and more. Demo environment with simulated data.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <AdminShell>{children}</AdminShell>
    </>
  );
}
