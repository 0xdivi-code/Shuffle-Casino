"use client";

import AppShell from '@/components/AppShell';
import { AccountPage, Card, PrimaryButton } from '@/components/account/AccountUI';
import { AlertTriangle, Check, Clock3, ExternalLink, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

const periods = [
  { id: '24h', title: '24 hours', text: 'A short break until this time tomorrow.' },
  { id: '7d', title: '7 days', text: 'Temporarily block access for one week.' },
  { id: '30d', title: '30 days', text: 'Take a longer break for one month.' },
  { id: 'permanent', title: 'Permanent', text: 'Permanently self-exclude this account.' },
];

export default function SelfExclusionPage() {
  const [period, setPeriod] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <AppShell>
      <AccountPage title="Shuffle Wise" description="Tools and resources to help you stay in control of your play." icon={ShieldCheck}>
        <section className="rounded-[15px] border border-[#403824] bg-gradient-to-br from-[#282316] to-[#17171b] p-5 sm:p-6">
          <div className="flex items-start gap-4"><div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-[#4a3c1d] text-[#e0b954]"><HeartHandshake size={21} /></div><div><h2 className="text-[16px] font-bold text-white">Play should always stay fun</h2><p className="mt-2 max-w-[660px] text-[12px] leading-5 text-[#aaa18a]">If gambling no longer feels enjoyable, taking a break can help. Self-exclusion immediately restricts access to gameplay for the period you select.</p></div></div>
        </section>

        <Card className="mt-4">
          <div className="border-b border-[#292934] p-5 sm:p-6"><div className="flex items-center gap-2"><Clock3 size={17} className="text-[#9874ef]" /><h2 className="text-[14px] font-bold text-white">Choose a self-exclusion period</h2></div><p className="mt-2 text-[11px] leading-5 text-[#6f6f84]">Once started, a self-exclusion period cannot be reversed or shortened by support.</p></div>
          <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
            {periods.map((item) => <button key={item.id} onClick={() => { setPeriod(item.id); setSubmitted(false); }} className={`flex items-start gap-3 rounded-[11px] border p-4 text-left transition-colors ${period === item.id ? 'border-[#7442dc] bg-[#261d3c]' : 'border-[#30303d] bg-[#181820] hover:border-[#48485a]'}`}><span className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border ${period === item.id ? 'border-[#8c5df3] bg-[#7717ff]' : 'border-[#4a4a5c]'}`}>{period === item.id && <Check size={12} strokeWidth={3} />}</span><span><span className="block text-[12px] font-bold text-white">{item.title}</span><span className="mt-1 block text-[11px] leading-4 text-[#6c6c81]">{item.text}</span></span></button>)}
          </div>
          {period && (
            <div className="border-t border-[#292934] p-5 sm:p-6">
              <div className="rounded-[10px] border border-[#60343a] bg-[#301b20] p-4"><div className="flex items-start gap-3"><AlertTriangle size={18} className="mt-0.5 flex-none text-[#e06c79]" /><div><h3 className="text-[12px] font-bold text-[#f0bbc1]">Please read this carefully</h3><p className="mt-1 text-[11px] leading-5 text-[#b7868c]">You will be logged out and unable to wager, deposit or claim rewards during this period. Pending withdrawals will continue to be processed.</p></div></div></div>
              <label className="mt-4 flex cursor-pointer items-start gap-3 text-[11px] leading-5 text-[#85859a]"><button type="button" onClick={() => setConfirmed(!confirmed)} className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-[4px] border ${confirmed ? 'border-[#7717ff] bg-[#7717ff]' : 'border-[#454557]'}`}>{confirmed && <Check size={12} strokeWidth={3} />}</button><span>I understand that self-exclusion cannot be cancelled before the selected period ends.</span></label>
              <PrimaryButton onClick={() => setSubmitted(true)} disabled={!confirmed} className="mt-5 w-full bg-[#c23748] hover:bg-[#d64a5a]">Start self-exclusion</PrimaryButton>
              {submitted && <p className="mt-3 text-center text-[12px] text-[#e07883]">Please contact support to complete this protected action.</p>}
            </div>
          )}
        </Card>

        <Card className="mt-4 p-5 sm:p-6">
          <h2 className="text-[14px] font-bold text-white">Need support now?</h2><p className="mt-2 max-w-[620px] text-[11px] leading-5 text-[#6e6e83]">Free, confidential help is available through independent support organisations. If you feel at risk, please reach out to someone you trust.</p>
          <div className="mt-4 flex flex-wrap gap-2"><a href="https://www.begambleaware.org" target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#343442] px-4 text-[11px] font-bold text-[#aaaabc] hover:text-white">BeGambleAware <ExternalLink size={12} /></a><a href="/support" className="inline-flex h-9 items-center gap-2 rounded-[8px] border border-[#343442] px-4 text-[11px] font-bold text-[#aaaabc] hover:text-white">Contact support</a></div>
        </Card>
      </AccountPage>
    </AppShell>
  );
}
