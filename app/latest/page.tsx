"use client";
import AppShell from '@/components/AppShell';
import CategoryPage from '@/components/CategoryPage';
import LatestSEO from '@/components/LatestSEO';
import { gameSections } from '@/data/gameSections';

export default function LatestPage() {
  const latestSection = gameSections.find(s => s.id === 'latest-releases');
  const games = latestSection ? latestSection.games : [];
  return (
    <AppShell>
      <CategoryPage title="Latest Releases" games={games} backHref="/" seoContent={<LatestSEO />} showProviders={true} />
    </AppShell>
  );
}
