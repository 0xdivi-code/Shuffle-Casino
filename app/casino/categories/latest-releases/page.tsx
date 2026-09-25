"use client";
import AppShell from '@/components/AppShell';
import CategoryPage from '@/components/CategoryPage';
import LatestSEO from '@/components/LatestSEO';
import { gameSections } from '@/data/gameSections';

export default function Page() {
  const section = gameSections.find(s => s.id === 'latest-releases');
  const games = section ? section.games : [];
  return (
    <AppShell>
      <CategoryPage title="Latest Releases" games={games} backHref="/" seoContent={<LatestSEO />} showProviders={true} />
    </AppShell>
  );
}
