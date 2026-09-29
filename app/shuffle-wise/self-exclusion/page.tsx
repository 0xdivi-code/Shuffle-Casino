"use client";

import AppShell from '@/components/AppShell';
import { Card } from '@/components/account/AccountUI';
import { AlertTriangle, Check, Clock3, Headphones, ShieldOff, TimerReset } from 'lucide-react';
import { useState } from 'react';

type WiseTab = 'self-exclusion' | 'gambling-limits';

const periods = [
  { id: '1d', title: '1 day' },
  { id: '1w', title: '1 week' },
  { id: '1m', title: '1 month' },
  { id: '6m', title: '6 months' },
  { id: 'permanent', title: 'Permanent' },
];

function SupportPrompt() {
  return <aside className="rounded-[14px] border border-[#2d2d39] bg-gradient-to-br from-[#1d1928] to-[#15151d] p-6 text-center lg:sticky lg:top-[84px]"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#41345d] bg-[#29203d] text-[#a27dff]"><Headphones size={27} /></div><h3 className="mt-4 text-[15px] font-bold text-white">Need Help?</h3><p className="mt-2 text-[11px] leading-5 text-[#747489]">Have questions or concerns regarding your Shuffle account? Our experts are here to help!</p><a href="/support" className="mt-5 flex h-10 items-center justify-center rounded-[8px] bg-[#7717ff] text-[11px] font-bold text-white hover:bg-[#8b3dff]">Chat with us</a></aside>;
}

export default function SelfExclusionPage() {
  const [tab, setTab] = useState<WiseTab>('self-exclusion');
  const [stage, setStage] = useState<'intro' | 'choose'>('intro');
  const [scope, setScope] = useState('Casino & Sports');
  const [period, setPeriod] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [limits, setLimits] = useState({ deposit: '', loss: '', wager: '' });
  const [limitsSaved, setLimitsSaved] = useState(false);

  return (
    <AppShell>
      <section className="mx-auto w-full max-w-[1160px] pb-8">
        <h1 className="text-[24px] font-bold tracking-[-.02em] text-white sm:text-[28px]">Shuffle Wise</h1>
        <div className="mt-5 overflow-x-auto scrollbar-hide"><div role="tablist" className="flex w-max items-center gap-1 rounded-[11px] border border-[#292935] bg-[#15151d] p-1"><button role="tab" aria-selected={tab === 'self-exclusion'} data-testid="self-exclusion" disabled={tab === 'self-exclusion'} onClick={() => setTab('self-exclusion')} className={`h-9 rounded-[8px] px-4 text-[12px] font-bold ${tab === 'self-exclusion' ? 'bg-white text-[#15151d]' : 'text-[#7d7d91] hover:bg-[#22222c] hover:text-white'}`}>Self-exclusion</button><button role="tab" aria-selected={tab === 'gambling-limits'} data-testid="gambling-limits" disabled={tab === 'gambling-limits'} onClick={() => setTab('gambling-limits')} className={`h-9 rounded-[8px] px-4 text-[12px] font-bold ${tab === 'gambling-limits' ? 'bg-white text-[#15151d]' : 'text-[#7d7d91] hover:bg-[#22222c] hover:text-white'}`}>Gambling Limits</button></div></div>

        <div data-testid="shuffle-wise-tab-content-section" className="mt-5 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_270px]">
          {tab === 'self-exclusion' && <div>
            {stage === 'intro' ? <Card className="overflow-hidden"><div className="border-b border-[#292935] px-5 py-4 sm:px-6"><h2 className="text-[15px] font-bold text-white">Taking a break from gambling</h2></div><div className="p-5 sm:p-6">
              <div className="space-y-3 text-[12px] leading-6 text-[#828296]"><p>Shuffle is committed to providing you with a safe, enjoyable, and responsible gaming environment.</p><p>To enhance your gaming experience you can choose to take a break or give yourself some time away from gambling. Your break starts immediately once confirmed and is non-reversible.</p><p>Our safe gambling process is detailed below:</p></div>
              <div className="mt-5 space-y-3">
                <div className="flex gap-4 rounded-[12px] border border-[#2e2e3a] bg-[#191921] p-4 sm:p-5"><div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#29203f] text-[#a17cf8]"><Clock3 size={21} /></div><div><h3 className="text-[13px] font-bold text-white">Step 1: Take a 24 Hour Cooldown</h3><p className="mt-1.5 text-[11px] leading-5 text-[#747489]">Take a 24 hour cooldown from betting on sports, casino, or both. You can still access the platform and claim rewards. Changing the cooldown type resets the 24 hour timer.</p></div></div>
                <div className="flex gap-4 rounded-[12px] border border-[#2e2e3a] bg-[#191921] p-4 sm:p-5"><div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#30201f] text-[#dd827b]"><ShieldOff size={21} /></div><div><h3 className="text-[13px] font-bold text-white">Step 2: Self-Exclusion</h3><p className="mt-1.5 text-[11px] leading-5 text-[#747489]">After your cooldown ends, you have 24 hours to extend exclusion by 1 day, 1 week, 1 month, 6 months, or permanently. Self-exclusion is strictly irreversible.</p></div></div>
              </div>
              <button onClick={() => setStage('choose')} className="mt-6 h-11 w-full rounded-[9px] bg-[#7717ff] text-[12px] font-bold text-white hover:bg-[#8b3dff]">Continue</button>
            </div></Card> : <Card className="overflow-hidden"><div className="flex items-center justify-between border-b border-[#292935] px-5 py-4 sm:px-6"><div><h2 className="text-[15px] font-bold text-white">Start a cooldown</h2><p className="mt-1 text-[11px] text-[#6d6d81]">This action begins immediately.</p></div><button onClick={() => setStage('intro')} className="text-[11px] font-bold text-[#9f7af4]">Back</button></div><div className="p-5 sm:p-6">
              <label className="mb-2 block text-[11px] font-semibold text-[#aaaabb]">Cooldown applies to</label><select value={scope} onChange={(event) => setScope(event.target.value)} className="h-11 w-full rounded-[9px] border border-[#343440] bg-[#101016] px-3 text-[12px] text-white outline-none focus:border-[#7445d5]"><option>Casino & Sports</option><option>Casino only</option><option>Sports only</option><option>Entire platform</option></select>
              <label className="mb-2 mt-5 block text-[11px] font-semibold text-[#aaaabb]">Exclusion period</label><div className="grid gap-2 sm:grid-cols-3">{periods.map((item) => <button key={item.id} onClick={() => { setPeriod(item.id); setSubmitted(false); }} className={`flex h-10 items-center justify-center rounded-[8px] border text-[11px] font-bold ${period === item.id ? 'border-[#7445d5] bg-[#2a203f] text-[#b18dff]' : 'border-[#343440] bg-[#191920] text-[#858599]'}`}>{item.title}</button>)}</div>
              {period && <><div className="mt-5 flex gap-3 rounded-[10px] border border-[#5f3639] bg-[#301d20] p-4"><AlertTriangle size={17} className="mt-0.5 flex-none text-[#df7d84]" /><p className="text-[11px] leading-5 text-[#ba898d]">No member of our team can reverse or shorten a confirmed cooldown or self-exclusion period.</p></div><label className="mt-4 flex cursor-pointer gap-3 text-[11px] leading-5 text-[#858599]"><button type="button" onClick={() => setConfirmed(!confirmed)} className={`mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-[4px] border ${confirmed ? 'border-[#7717ff] bg-[#7717ff]' : 'border-[#454557]'}`}>{confirmed && <Check size={12} strokeWidth={3} />}</button><span>I understand this action is irreversible and applies to {scope.toLowerCase()}.</span></label><button disabled={!confirmed} onClick={() => setSubmitted(true)} className="mt-5 h-11 w-full rounded-[9px] bg-[#c43d4c] text-[12px] font-bold text-white hover:bg-[#d44d5b] disabled:bg-[#30303b] disabled:text-[#686879]">Confirm exclusion</button>{submitted && <p className="mt-3 text-center text-[11px] text-[#dc818a]">Contact support to complete this protected account action.</p>}</>}
            </div></Card>}
          </div>}

          {tab === 'gambling-limits' && <Card className="overflow-hidden"><div className="border-b border-[#292935] px-5 py-4 sm:px-6"><h2 className="text-[15px] font-bold text-white">Gambling Limits</h2><p className="mt-1 text-[11px] text-[#6d6d81]">Set limits to keep your play within a comfortable budget.</p></div><div className="p-5 sm:p-6">
            <div className="mb-5 flex gap-3 rounded-[10px] border border-[#3e3927] bg-[#252217] p-4"><TimerReset size={18} className="mt-0.5 flex-none text-[#d8b65d]" /><p className="text-[11px] leading-5 text-[#a99d7d]">Decreases apply immediately. Increases become active after a 24-hour cooling-off period.</p></div>
            <div className="space-y-4">{[{ key: 'deposit', label: 'Weekly deposit limit', text: 'Maximum amount you can deposit each week.' }, { key: 'loss', label: 'Weekly loss limit', text: 'Maximum net amount you can lose each week.' }, { key: 'wager', label: 'Daily wager limit', text: 'Maximum total amount wagered per day.' }].map((item) => <div key={item.key} className="rounded-[11px] border border-[#2e2e3a] bg-[#191921] p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center"><div className="min-w-0 flex-1"><h3 className="text-[12px] font-bold text-white">{item.label}</h3><p className="mt-1 text-[10px] text-[#6d6d81]">{item.text}</p></div><div className="flex h-10 w-full items-center rounded-[8px] border border-[#343440] bg-[#101016] px-3 sm:w-[210px]"><span className="text-[11px] text-[#77778b]">$</span><input value={limits[item.key as keyof typeof limits]} onChange={(event) => { setLimits((current) => ({ ...current, [item.key]: event.target.value })); setLimitsSaved(false); }} inputMode="decimal" placeholder="No limit" className="min-w-0 flex-1 bg-transparent px-2 text-[12px] text-white outline-none placeholder:text-[#525264]" /><span className="text-[9px] font-bold text-[#656579]">USD</span></div></div></div>)}</div>
            <button onClick={() => setLimitsSaved(true)} className="mt-5 h-11 w-full rounded-[9px] bg-[#7717ff] text-[12px] font-bold text-white hover:bg-[#8b3dff]">Save limits</button>{limitsSaved && <p className="mt-3 text-center text-[11px] text-[#49d4a0]">Your gambling limits have been saved.</p>}
          </div></Card>}

          <SupportPrompt />
        </div>
      </section>
    </AppShell>
  );
}
