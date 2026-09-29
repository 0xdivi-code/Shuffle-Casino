"use client";

import AppShell from '@/components/AppShell';
import { AccountPage, Card, PrimaryButton } from '@/components/account/AccountUI';
import { Gift, Info, Sparkles, TicketCheck } from 'lucide-react';
import { useState } from 'react';

export default function RedeemPage() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const redeem = (event: React.FormEvent) => {
    event.preventDefault();
    if (!code.trim()) return;
    setMessage('This code is not valid or has already been redeemed.');
  };

  return (
    <AppShell>
      <AccountPage title="Redeem Code" description="Enter a promotion or reward code to add it to your account." icon={Gift}>
        <Card className="relative overflow-hidden p-6 sm:p-9">
          <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-[#7624e8]/15 blur-3xl" />
          <div className="relative mx-auto max-w-[560px] text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#4d347c] bg-[#2b1c49] text-[#a984ff]"><TicketCheck size={28} /></div>
            <h2 className="mt-5 text-[20px] font-bold text-white">Got a reward code?</h2>
            <p className="mx-auto mt-2 max-w-[410px] text-[12px] leading-5 text-[#77778c]">Codes may contain letters, numbers and dashes. Each code can only be redeemed once per eligible account.</p>
            <form onSubmit={redeem} className="mt-7">
              <input value={code} onChange={(e) => { setCode(e.target.value.toUpperCase()); setMessage(''); }} placeholder="ENTER CODE" autoCapitalize="characters" className="h-13 w-full rounded-[10px] border border-[#343441] bg-[#0f0f15] px-4 py-3 text-center font-mono text-[15px] font-bold tracking-[.12em] text-white outline-none placeholder:text-[#4e4e60] focus:border-[#7541e6]" />
              <PrimaryButton type="submit" disabled={!code.trim()} className="mt-3 w-full">Redeem Code</PrimaryButton>
            </form>
            {message && <p role="alert" className="mt-4 rounded-[9px] border border-[#65313b] bg-[#321b20] px-4 py-3 text-[12px] text-[#e27b88]">{message}</p>}
          </div>
        </Card>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Card className="flex gap-4 p-5"><div className="flex h-9 w-9 flex-none items-center justify-center rounded-[9px] bg-[#28203d] text-[#9e7afa]"><Sparkles size={17} /></div><div><h3 className="text-[12px] font-bold text-white">Where to find codes</h3><p className="mt-1 text-[11px] leading-5 text-[#69697e]">Look out for special campaigns, community drops and partner promotions.</p></div></Card>
          <Card className="flex gap-4 p-5"><div className="flex h-9 w-9 flex-none items-center justify-center rounded-[9px] bg-[#202a33] text-[#78a6ca]"><Info size={17} /></div><div><h3 className="text-[12px] font-bold text-white">Code conditions</h3><p className="mt-1 text-[11px] leading-5 text-[#69697e]">Some codes have expiry dates, wagering requirements or eligibility restrictions.</p></div></Card>
        </div>
      </AccountPage>
    </AppShell>
  );
}
