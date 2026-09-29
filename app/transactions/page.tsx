"use client";

import AppShell from '@/components/AppShell';
import { CalendarDays, ChevronDown, Filter, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type TransactionTab = 'deposits' | 'withdrawals' | 'bets' | 'sports-bets' | 'tip-rain' | 'other';

const tabs: { id: TransactionTab; label: string }[] = [
  { id: 'deposits', label: 'Deposits' },
  { id: 'withdrawals', label: 'Withdrawals' },
  { id: 'bets', label: 'Casino Bets' },
  { id: 'sports-bets', label: 'Sports Bets' },
  { id: 'tip-rain', label: 'Tip / Rain' },
  { id: 'other', label: 'Other' },
];

const tableHeaders: Record<TransactionTab, string[]> = {
  deposits: ['Date', 'Method', 'Amount', 'Transaction ID', 'Status'],
  withdrawals: ['Date', 'Method', 'Amount', 'Transaction ID', 'Status'],
  bets: ['Date', 'Game', 'Bet Amount', 'Payout', 'Result'],
  'sports-bets': ['Date', 'Event', 'Wager', 'Odds', 'Status'],
  'tip-rain': ['Date', 'Type', 'User', 'Amount', 'Status'],
  other: ['Date', 'Type', 'Amount', 'Description', 'Status'],
};

export default function TransactionsPage() {
  const [tab, setTab] = useState<TransactionTab>('deposits');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [currency, setCurrency] = useState('All currencies');
  const [status, setStatus] = useState('All statuses');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const selected = new URLSearchParams(window.location.search).get('type') as TransactionTab | null;
    if (selected && tabs.some((item) => item.id === selected)) setTab(selected);
    if (selected === ('deposits' as TransactionTab) || selected === ('withdrawals' as TransactionTab)) setTab(selected);
  }, []);

  const selectTab = (next: TransactionTab) => {
    setTab(next);
    const url = new URL(window.location.href);
    url.searchParams.set('type', next);
    window.history.replaceState({}, '', url);
  };

  return (
    <AppShell>
      <section className="mx-auto w-full max-w-[1160px] pb-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[24px] font-bold tracking-[-.02em] text-white sm:text-[28px]">Transactions</h1>
          <button aria-label="Filter" onClick={() => setFiltersOpen(!filtersOpen)} className={`flex h-10 w-10 items-center justify-center rounded-[9px] border sm:hidden ${filtersOpen ? 'border-[#7145cc] bg-[#281f3c] text-[#a47fff]' : 'border-[#30303d] bg-[#181820] text-[#8a8a9e]'}`}><Filter size={17} /></button>
        </div>

        <div className="mt-5 flex items-center gap-4">
          <div className="min-w-0 flex-1 overflow-x-auto scrollbar-hide"><div role="tablist" className="flex w-max items-center gap-1 rounded-[11px] border border-[#292935] bg-[#15151d] p-1">{tabs.map((item) => <button key={item.id} role="tab" aria-selected={tab === item.id} data-testid={item.id} disabled={tab === item.id} onClick={() => selectTab(item.id)} className={`h-9 rounded-[8px] px-4 text-[12px] font-bold transition-colors ${tab === item.id ? 'bg-white text-[#15151d]' : 'text-[#7d7d91] hover:bg-[#22222c] hover:text-white'}`}>{item.label}</button>)}</div></div>
          <button onClick={() => setFiltersOpen(!filtersOpen)} className={`hidden h-10 items-center gap-2 rounded-[9px] border px-4 text-[12px] font-semibold sm:flex ${filtersOpen ? 'border-[#7145cc] bg-[#281f3c] text-[#b28fff]' : 'border-[#30303d] bg-[#181820] text-[#9292a5] hover:text-white'}`}>Filter <ChevronDown size={14} className={`transition-transform ${filtersOpen ? 'rotate-180' : ''}`} /></button>
        </div>

        {filtersOpen && <div className="mt-4 grid gap-3 rounded-[12px] border border-[#2d2d39] bg-[#15151d] p-4 sm:grid-cols-2 lg:grid-cols-[minmax(180px,1fr)_180px_180px_160px_auto]">
          <label className="flex h-10 items-center gap-2 rounded-[9px] border border-[#30303d] bg-[#101016] px-3 focus-within:border-[#7041db]"><Search size={14} className="text-[#606074]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search transactions" className="min-w-0 flex-1 bg-transparent text-[11px] text-white outline-none placeholder:text-[#535366]" /></label>
          <label className="relative"><select value={currency} onChange={(event) => setCurrency(event.target.value)} aria-label="Currency" className="h-10 w-full appearance-none rounded-[9px] border border-[#30303d] bg-[#101016] px-3 pr-9 text-[11px] text-[#9999ad] outline-none"><option>All currencies</option><option>BTC</option><option>ETH</option><option>USDT</option><option>USDC</option><option>SHFL</option></select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-3.5 text-[#626276]" /></label>
          <label className="relative"><select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Status" className="h-10 w-full appearance-none rounded-[9px] border border-[#30303d] bg-[#101016] px-3 pr-9 text-[11px] text-[#9999ad] outline-none"><option>All statuses</option><option>Pending</option><option>Completed</option><option>Failed</option></select><ChevronDown size={13} className="pointer-events-none absolute right-3 top-3.5 text-[#626276]" /></label>
          <button className="flex h-10 items-center justify-center gap-2 rounded-[9px] border border-[#30303d] bg-[#101016] px-3 text-[11px] text-[#9999ad]"><CalendarDays size={14} />All dates</button>
          <button aria-label="Clear filters" onClick={() => { setCurrency('All currencies'); setStatus('All statuses'); setQuery(''); }} className="flex h-10 items-center justify-center gap-2 rounded-[9px] px-3 text-[11px] font-bold text-[#858599] hover:bg-[#22222c] hover:text-white"><X size={14} />Clear</button>
        </div>}

        <div className="mt-5 overflow-hidden rounded-[13px] border border-[#292935] bg-[#15151d]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead className="bg-[#1b1b24] text-[10px] font-bold uppercase tracking-[.07em] text-[#656579]"><tr>{tableHeaders[tab].map((header) => <th key={header} className="px-5 py-3.5 font-semibold">{header}</th>)}</tr></thead>
            </table>
          </div>
          <div className="flex min-h-[300px] items-center justify-center border-t border-[#292935] px-6 text-center"><p className="text-[12px] text-[#707084]">No transactions to show.</p></div>
        </div>
      </section>
    </AppShell>
  );
}
