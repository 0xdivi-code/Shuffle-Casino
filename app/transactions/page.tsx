"use client";

import AppShell from '@/components/AppShell';
import { AccountPage, Card, EmptyState } from '@/components/account/AccountUI';
import { CalendarDays, ChevronDown, Download, History, Search, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function TransactionsPage() {
  const [type, setType] = useState('All transactions');
  const [asset, setAsset] = useState('All assets');
  const [query, setQuery] = useState('');

  return (
    <AppShell>
      <AccountPage title="Transactions" description="Review deposits, withdrawals, rewards and account activity." icon={History}>
        <Card className="overflow-hidden">
          <div className="border-b border-[#292934] p-4 sm:p-5">
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_190px_170px_auto]">
              <label className="flex h-10 items-center gap-2 rounded-[9px] border border-[#30303d] bg-[#101016] px-3 focus-within:border-[#7041db]"><Search size={15} className="text-[#636377]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search transactions" className="min-w-0 flex-1 bg-transparent text-[12px] text-white outline-none placeholder:text-[#555568]" /></label>
              <label className="relative"><select aria-label="Transaction type" value={type} onChange={(e) => setType(e.target.value)} className="h-10 w-full appearance-none rounded-[9px] border border-[#30303d] bg-[#17171f] px-3 pr-9 text-[12px] text-[#aaaabd] outline-none focus:border-[#7041db]"><option>All transactions</option><option>Deposits</option><option>Withdrawals</option><option>Rewards</option><option>Transfers</option></select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-3 text-[#6b6b80]" /></label>
              <label className="relative"><select aria-label="Asset" value={asset} onChange={(e) => setAsset(e.target.value)} className="h-10 w-full appearance-none rounded-[9px] border border-[#30303d] bg-[#17171f] px-3 pr-9 text-[12px] text-[#aaaabd] outline-none focus:border-[#7041db]"><option>All assets</option><option>ETH</option><option>BTC</option><option>USDT</option><option>SHFL</option></select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-3 text-[#6b6b80]" /></label>
              <button className="flex h-10 items-center justify-center gap-2 rounded-[9px] border border-[#30303d] px-4 text-[12px] font-semibold text-[#9494a8] hover:border-[#49495b] hover:text-white"><CalendarDays size={15} />Date</button>
            </div>
          </div>

          <div className="hidden grid-cols-[1.4fr_1fr_1fr_1fr_1fr] border-b border-[#292934] bg-[#191921] px-5 py-3 text-[10px] font-bold uppercase tracking-[.08em] text-[#5f5f73] md:grid"><span>Transaction</span><span>Date</span><span>Amount</span><span>Status</span><span className="text-right">Balance</span></div>
          <EmptyState icon={History} title="No transactions found" text={query || type !== 'All transactions' || asset !== 'All assets' ? 'Try changing your search or filters.' : 'Once you make a deposit, withdrawal or receive a reward, it will appear here.'} />
        </Card>

        <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-[12px] border border-[#242430] bg-[#121219] p-4 sm:flex-row sm:items-center">
          <div><h3 className="text-[12px] font-bold text-white">Need a copy of your history?</h3><p className="mt-1 text-[11px] text-[#68687d]">Export transaction records as a CSV file.</p></div>
          <button className="flex h-9 items-center gap-2 rounded-[8px] border border-[#30303d] px-4 text-[11px] font-bold text-[#9999ad] hover:text-white"><Download size={14} />Export CSV</button>
        </div>
      </AccountPage>
    </AppShell>
  );
}
