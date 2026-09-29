"use client";

import AppShell from '@/components/AppShell';
import { AccountPage, Card, PrimaryButton } from '@/components/account/AccountUI';
import { ArrowDownRight, ArrowUpRight, BarChart3, Coins, ExternalLink, Flame, PieChart, Repeat2, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function TokenPage() {
  const [amount, setAmount] = useState('');
  const [direction, setDirection] = useState<'buy' | 'sell'>('buy');

  return (
    <AppShell>
      <AccountPage title="SHFL Token" description="Explore, convert and use the token that powers the Shuffle ecosystem." icon={Coins}>
        <section className="relative overflow-hidden rounded-[16px] border border-[#46316e] bg-gradient-to-br from-[#291653] via-[#1c1630] to-[#15151d] p-6 sm:p-8">
          <div className="absolute -right-12 -top-20 h-56 w-56 rounded-full bg-[#7b2cff]/20 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/15 bg-[#7a2bed] shadow-[0_0_30px_rgba(119,23,255,.45)]"><img src="/icons/token-white.svg" alt="SHFL" className="h-8 w-8" /></div><div><p className="text-[12px] font-bold uppercase tracking-[.12em] text-[#a889ed]">Shuffle</p><h2 className="text-[24px] font-black text-white">SHFL</h2></div></div>
            <div className="sm:text-right"><p className="text-[26px] font-bold tabular-nums text-white">$0.3865</p><span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#3bdd9e]"><ArrowUpRight size={14} />9.15% today</span></div>
          </div>
          <div className="relative mt-7 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:grid-cols-4">
            {[['Market cap', '$118.4M'], ['24h volume', '$4.82M'], ['Circulating', '306.3M'], ['Total supply', '1B']].map(([label, value]) => <div key={label}><p className="text-[10px] text-[#8e80aa]">{label}</p><p className="mt-1 text-[13px] font-bold text-white">{value}</p></div>)}
          </div>
        </section>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
          <Card className="p-5 sm:p-6">
            <div className="flex items-center justify-between"><div><p className="text-[12px] text-[#747489]">Your SHFL balance</p><p className="mt-1 text-[22px] font-bold text-white">0.0000 SHFL</p></div><BarChart3 size={23} className="text-[#8e66f0]" /></div>
            <div className="mt-5 h-[150px] overflow-hidden rounded-[10px] border border-[#262632] bg-[#111117] p-4">
              <div className="flex h-full items-end gap-2 opacity-70">{[25, 42, 34, 58, 53, 72, 64, 88, 70, 94, 84, 100].map((height, i) => <span key={i} style={{ height: `${height}%` }} className="flex-1 rounded-t-sm bg-gradient-to-t from-[#5220ad] to-[#a17dff]" />)}</div>
            </div>
            <div className="mt-4 flex justify-between text-[10px] text-[#5f5f73]"><span>24H</span><span>7D</span><span>30D</span><span>1Y</span></div>
          </Card>

          <Card className="overflow-hidden">
            <div className="grid grid-cols-2 border-b border-[#292934]">
              {(['buy', 'sell'] as const).map((item) => <button key={item} onClick={() => setDirection(item)} className={`relative h-12 text-[12px] font-bold capitalize ${direction === item ? 'text-white' : 'text-[#747489]'}`}>{item}{direction === item && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#7717ff]" />}</button>)}
            </div>
            <div className="p-5">
              <label className="text-[11px] font-semibold text-[#89899d]">You {direction === 'buy' ? 'pay' : 'sell'}</label>
              <div className="mt-2 flex h-12 items-center rounded-[9px] border border-[#30303c] bg-[#101016] px-3"><input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-[#4f4f61]" /><span className="text-[12px] font-bold text-[#8d8da1]">{direction === 'buy' ? 'USDT' : 'SHFL'}</span></div>
              <div className="my-3 flex justify-center"><button className="flex h-8 w-8 items-center justify-center rounded-full border border-[#30303d] bg-[#1c1c25] text-[#85859a]"><Repeat2 size={14} /></button></div>
              <label className="text-[11px] font-semibold text-[#89899d]">You receive</label>
              <div className="mt-2 flex h-12 items-center rounded-[9px] border border-[#292935] bg-[#17171f] px-3"><span className="flex-1 text-[14px] text-[#707084]">0.00</span><span className="text-[12px] font-bold text-[#8d8da1]">{direction === 'buy' ? 'SHFL' : 'USDT'}</span></div>
              <PrimaryButton className="mt-4 w-full" disabled={!amount}>{direction === 'buy' ? 'Buy SHFL' : 'Sell SHFL'}</PrimaryButton>
            </div>
          </Card>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[{ icon: Flame, title: 'Rewards', text: 'Earn SHFL through airdrops and community campaigns.' }, { icon: PieChart, title: 'Staking', text: 'Stake tokens and participate in the Shuffle ecosystem.' }, { icon: Sparkles, title: 'Utility', text: 'Unlock exclusive promotions and token-holder benefits.' }].map(({ icon: Icon, title, text }) => <Card key={title} className="p-5"><Icon size={20} className="text-[#9c77f8]" /><h3 className="mt-4 text-[13px] font-bold text-white">{title}</h3><p className="mt-1 text-[11px] leading-5 text-[#6d6d82]">{text}</p><a href="#" className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#a17dff]">Learn more <ExternalLink size={11} /></a></Card>)}
        </div>
      </AccountPage>
    </AppShell>
  );
}
