"use client";
import AppShell from '@/components/AppShell';
import CategoryPage from '@/components/CategoryPage';
import { gameSections } from '@/data/gameSections';

export default function Page() {
  const section = gameSections.find(s => s.id === 'shuffle-picks');
  const games = section ? section.games : [];
  return (
    <AppShell>
      <CategoryPage title="Shuffle Picks" games={games} backHref="/" showProviders={true} />
    </AppShell>
  );
}
