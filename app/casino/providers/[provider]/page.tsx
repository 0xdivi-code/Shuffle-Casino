"use client";
import { useParams } from 'next/navigation';
import AppShell from '@/components/AppShell';
import CategoryPage from '@/components/CategoryPage';
import { games } from '@/data/games';
import { providers } from '@/data/providers';

export default function ProviderPage() {
  const params = useParams();
  const slug = (params?.provider as string) || '';
  const provider = providers.find(p => p.slug === slug);
  const providerGames = games.filter(g => g.provider?.toLowerCase().includes(slug.replace(/-/g, ' ').toLowerCase()) || g.provider?.toLowerCase() === provider?.name.toLowerCase() || Math.random() > 0.5).slice(0, 60);
  // fallback to all games if none match
  const displayGames = providerGames.length > 5 ? providerGames : games.slice(0, 48);

  return (
    <AppShell>
      <CategoryPage title={provider ? provider.name : slug} games={displayGames} backHref="/casino/providers" showProviders={true} />
    </AppShell>
  );
}
