"use client";

import AppShell from '@/components/AppShell';
import { AccountPage, Card, PrimaryButton } from '@/components/account/AccountUI';
import { ArrowRight, Check, Copy, DollarSign, HandCoins, Link2, MousePointerClick, Share2, Users } from 'lucide-react';
import { useState } from 'react';

export default function AffiliateOverview() {
  const [copied, setCopied] = useState(false);
  const referral = 'https://snuffle.com/?r=FEOLU';
  const copy = async () => {
    try { await navigator.clipboard.writeText(referral); } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1700);
  };

  return (
    <AppShell>
      <AccountPage title="Affiliate Program" description="Invite players and earn commission from every qualifying wager." icon={HandCoins}>
        <section className="relative overflow-hidden rounded-[16px] border border-[#3b2b60] bg-gradient-to-br from-[#2b1559] via-[#1d1831] to-[#15151d] p-6 sm:p-8">
          <div className="absolute -right-14 -top-20 h-56 w-56 rounded-full bg-[#7b2cff]/25 blur-3xl" />
          <div className="relative max-w-[590px]">
            <span className="inline-flex rounded-full border border-[#8c62e6]/35 bg-[#7440df]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#b89bfa]">Earn together</span>
            <h2 className="mt-4 text-[23px] font-bold leading-tight text-white sm:text-[28px]">Share Shuffle. Earn up to <span className="text-[#a982ff]">50% commission.</span></h2>
            <p className="mt-3 text-[13px] leading-5 text-[#a19ab3]">Receive commission when friends join with your link and play eligible games. There is no limit to how many players you can refer.</p>
          </div>
        </section>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[{ label: 'Total referrals', value: '0', icon: Users }, { label: 'Qualified referrals', value: '0', icon: MousePointerClick }, { label: 'Total commission', value: '$0.00', icon: DollarSign }].map(({ label, value, icon: Icon }) => <Card key={label} className="p-5"><div className="flex items-center justify-between"><div><p className="text-[11px] text-[#707085]">{label}</p><p className="mt-1.5 text-[21px] font-bold text-white">{value}</p></div><div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#28203d] text-[#9e7af6]"><Icon size={17} /></div></div></Card>)}
        </div>

        <Card className="mt-4 p-5 sm:p-6">
          <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-[9px] bg-[#28203d] text-[#a27cff]"><Link2 size={17} /></div><div><h3 className="text-[14px] font-bold text-white">Your referral link</h3><p className="text-[11px] text-[#6f6f83]">Share this unique link with your audience.</p></div></div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row"><div className="flex h-11 min-w-0 flex-1 items-center rounded-[9px] border border-[#30303d] bg-[#101016] px-4 font-mono text-[12px] text-[#aaaabd]"><span className="truncate">{referral}</span></div><PrimaryButton onClick={copy} className="sm:min-w-[115px]">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied' : 'Copy link'}</PrimaryButton><button className="flex h-10 items-center justify-center gap-2 rounded-[9px] border border-[#30303d] px-4 text-[12px] font-bold text-[#aaaabc] hover:border-[#49495c] hover:text-white"><Share2 size={15} />Share</button></div>
        </Card>

        <Card className="mt-4 overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#292934] px-5 py-4 sm:px-6"><div><h3 className="text-[14px] font-bold text-white">Recent referrals</h3><p className="mt-0.5 text-[11px] text-[#69697e]">Players who registered through your link</p></div><button className="text-[11px] font-bold text-[#9f7afa]">View all</button></div>
          <div className="flex min-h-[210px] flex-col items-center justify-center px-5 text-center"><div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#20202a] text-[#747489]"><Users size={21} /></div><h4 className="mt-4 text-[14px] font-bold text-white">No referrals yet</h4><p className="mt-1 max-w-[330px] text-[12px] leading-5 text-[#6f6f83]">Share your unique referral link to start building your network.</p></div>
        </Card>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[['1', 'Share your link', 'Invite friends or promote your link to your community.'], ['2', 'They join & play', 'Referred players create an account and make qualifying wagers.'], ['3', 'You earn', 'Commission is added to your affiliate balance automatically.']].map(([step, title, text]) => <div key={step} className="rounded-[12px] border border-[#242430] bg-[#121219] p-5"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#752de0] text-[11px] font-bold text-white">{step}</span><h3 className="mt-4 text-[13px] font-bold text-white">{title}</h3><p className="mt-1 text-[11px] leading-5 text-[#69697e]">{text}</p></div>)}
        </div>
      </AccountPage>
    </AppShell>
  );
}
