"use client";
import AppShell from '@/components/AppShell';
import CategoryPage from '@/components/CategoryPage';
import { gameSections } from '@/data/gameSections';
export default function Page(){
  const section=gameSections.find(s=>s.id==='live-casino');
  const games=section?section.games:[];
  return (<AppShell><CategoryPage title="Baccarat" games={games} backHref="/" showProviders={true} /></AppShell>);
}
