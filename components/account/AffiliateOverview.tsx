"use client";

import AppShell from '@/components/AppShell';
import { Card } from '@/components/account/AccountUI';
import {
  BarChart3,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  ChevronDown,
  Copy,
  DollarSign,
  ExternalLink,
  FileImage,
  Mail,
  Megaphone,
  MousePointerClick,
  Plus,
  Search,
  Trophy,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import { useState } from 'react';

export type AffiliateTab = 'overview' | 'referred-users' | 'campaigns' | 'earnings';

const tabs: { id: AffiliateTab; label: string; href: string }[] = [
  { id: 'overview', label: 'Overview', href: '/affiliate/overview' },
  { id: 'referred-users', label: 'Referred Users', href: '/affiliate/referred-users' },
  { id: 'campaigns', label: 'Campaigns', href: '/affiliate/campaigns' },
  { id: 'earnings', label: 'Earnings', href: '/affiliate/earnings' },
];

const faqs = [
  { question: 'What is the Shuffle Affiliate Program?', answer: 'The Shuffle Affiliate Program lets creators, publishers and community owners earn lifetime commission by introducing new players to Shuffle Casino and Sportsbook.' },
  { question: 'How do I join the Shuffle Affiliate Program?', answer: 'Every registered player can participate. Create a campaign, share its unique referral link and commission begins tracking when referred users place eligible wagers.' },
  { question: 'What are the benefits of becoming a Shuffle affiliate?', answer: 'Affiliates receive competitive commission rates, real-time referral tracking, professional marketing assets and opportunities for personalised partnerships.' },
  { question: 'I have a large audience. Can I get access to custom deals?', answer: 'Yes. High-traffic publishers and established creators can contact partnerships@shuffle.com to discuss a custom arrangement.' },
  { question: 'How does the commission structure work?', answer: 'Commission uses a wager-share model and is calculated from referred activity across Casino and Sportsbook. Your campaign dashboard tracks every qualifying result.' },
  { question: 'Is there a limit to how much I can earn?', answer: 'There is no earnings cap. Your commission depends on the number of users referred and their engagement with the platform.' },
  { question: 'Where can I promote Shuffle as an affiliate?', answer: 'You may promote through websites, social channels, streams, email or communities where local regulations and the Shuffle Terms of Service permit it.' },
  { question: 'How can I access marketing materials?', answer: 'Ready-to-use promotional assets are available from the Promotional Materials section. Partners can also request customised creative.' },
];

function AffiliateTabs({ active }: { active: AffiliateTab }) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div role="tablist" className="flex w-max items-center gap-1 rounded-[11px] border border-[#292935] bg-[#15151d] p-1">
        {tabs.map((tab) => <a key={tab.id} href={tab.href} role="tab" aria-selected={active === tab.id} data-testid={tab.id} className={`flex h-9 items-center rounded-[8px] px-4 text-[12px] font-bold transition-colors ${active === tab.id ? 'bg-white text-[#15151d] shadow-sm' : 'text-[#7d7d91] hover:bg-[#22222c] hover:text-white'}`}>{tab.label}</a>)}
      </div>
    </div>
  );
}

function TokenDivider() {
  return <div className="my-9 flex items-center gap-4"><span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#302a3c]" /><span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#403457] bg-[#21192f]"><img src="/icons/token-white.svg" alt="Shuffle" className="h-4 w-4 opacity-80" /></span><span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#302a3c]" /></div>;
}

function EmptyTable({ icon: Icon, title, text }: { icon: typeof Users; title: string; text: string }) {
  return <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center"><div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#30303d] bg-[#20202a] text-[#747489]"><Icon size={23} /></div><h3 className="mt-4 text-[14px] font-bold text-white">{title}</h3><p className="mt-1 max-w-[380px] text-[12px] leading-5 text-[#6f6f83]">{text}</p></div>;
}

function OverviewContent() {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const referral = 'https://shuffle.com?r=LV2PZu1Bo2';

  const copy = async () => {
    try { await navigator.clipboard.writeText(referral); } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1700);
  };

  return (
    <>
      <section className="relative mt-5 min-h-[300px] overflow-hidden rounded-[16px] border border-[#3b2b60] bg-gradient-to-br from-[#25134f] via-[#1c172e] to-[#13131a] p-6 sm:p-8 lg:p-10">
        <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[#7023db]/25 blur-[70px]" />
        <div className="relative z-10 grid items-center gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(220px,.75fr)]">
          <div>
            <h2 className="text-[30px] font-black leading-[.95] tracking-[-.04em] text-white sm:text-[38px]"><span className="text-[#9c70ff]">SHARE</span> YOUR LINK!</h2>
            <p className="mt-5 max-w-[650px] text-[13px] leading-6 text-[#aaa2b9]">Earn lifetime commission from your referrals on all their wagers across our Casino and Sportsbook with advanced real-time campaign performance tracking. Share your link to get started. <a href="https://help.shuffle.com/en/articles/6969004-shuffle-affiliate-program" target="_blank" rel="noreferrer" className="font-semibold text-white underline">Terms and Conditions</a></p>
            <div className="mt-6 flex max-w-[620px] flex-col gap-2 sm:flex-row"><div className="flex h-11 min-w-0 flex-1 items-center rounded-[9px] border border-[#423652] bg-[#0f0f15]/70 px-4 font-mono text-[12px] text-[#b4adbf]"><span className="truncate">{referral}</span></div><button onClick={copy} className="flex h-11 min-w-[100px] items-center justify-center gap-2 rounded-[9px] bg-[#7717ff] px-5 text-[12px] font-bold text-white hover:bg-[#8b3dff]">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy'}</button></div>
          </div>
          <div className="relative mx-auto flex h-[210px] w-[230px] items-center justify-center">
            <div className="absolute h-40 w-40 rounded-full bg-[#7b30e8]/25 blur-2xl" />
            <div className="relative rotate-[-12deg] rounded-[34px] border border-[#956aff]/30 bg-gradient-to-br from-[#8f59fa] to-[#4d1b9b] p-8 shadow-[0_24px_55px_rgba(83,30,164,.5)]"><Megaphone size={80} strokeWidth={1.25} className="text-white" /></div>
            <span className="absolute left-3 top-8 text-[23px] text-[#9c75ef]">✦</span><span className="absolute bottom-6 right-5 text-[28px] text-[#7046c3]">✦</span>
          </div>
        </div>
      </section>

      <section className="mt-4 grid overflow-hidden rounded-[14px] border border-[#282834] bg-[#15151d] sm:grid-cols-3">
        {[{ title: 'Lifetime Signups', value: '0 users', icon: Users }, { title: 'Total wagered', value: '$0.00', icon: BarChart3 }, { title: 'Referral Earnings', value: '$0.00', icon: DollarSign }].map(({ title, value, icon: Icon }, index) => <div key={title} className={`flex items-center gap-4 p-5 sm:p-6 ${index ? 'border-t border-[#282834] sm:border-l sm:border-t-0' : ''}`}><div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#28203d] text-[#9c77f7]"><Icon size={18} /></div><div><p className="text-[11px] text-[#717186]">{title}</p><p className="mt-1 text-[19px] font-bold text-white">{value}</p></div></div>)}
      </section>

      <TokenDivider />
      <section>
        <h2 className="text-center text-[22px] font-bold text-white">How to get started</h2>
        <div className="mt-5 grid overflow-hidden rounded-[16px] border border-[#2a2a36] bg-[#15151d] lg:grid-cols-[.85fr_1.15fr]">
          <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-gradient-to-br from-[#2c1658] to-[#17151f] p-8"><div className="absolute h-48 w-48 rounded-full bg-[#7d34e6]/25 blur-3xl" /><div className="relative text-center"><div className="mx-auto flex h-36 w-36 flex-col items-center justify-center rounded-full border-[10px] border-[#7040d2] bg-[#21152f] shadow-[0_20px_50px_rgba(0,0,0,.35)]"><Trophy size={28} className="text-[#af8aff]" /><span className="mt-2 text-[11px] text-[#a69bb4]">Commission Rate</span><span className="text-[30px] font-black text-white">10%</span></div><p className="mt-5 text-[12px] font-bold uppercase tracking-[.12em] text-[#a98bdf]">Earn Commission</p></div></div>
          <div className="space-y-6 p-6 sm:p-8">
            {[['Step 1:', 'Create your campaign', 'Create an affiliate campaign so you can earn commission for bets placed by your referrals across Casino and Sportsbook.'], ['Step 2:', 'Share your campaign', 'Share your referral link anywhere — email, social media, chat groups or directly with friends.'], ['Step 3:', 'Earn commission', 'Earn commission each time someone joins and places bets using your link. Track earnings in real time.']].map(([step, title, text]) => <div key={step} className="flex gap-4"><span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#7128db] text-[11px] font-bold text-white">{step.slice(5, 6)}</span><div><h3 className="text-[13px] font-bold text-white"><span className="text-[#a17cf7]">{step}</span> {title}</h3><p className="mt-1.5 text-[12px] leading-5 text-[#747489]">{text}</p></div></div>)}
            <a href="/affiliate/campaigns" className="inline-flex h-10 items-center rounded-[9px] bg-[#2ebd85] px-5 text-[12px] font-bold text-[#09251a] hover:bg-[#42d49a]">View Campaigns</a>
          </div>
        </div>
      </section>

      <TokenDivider />
      <section><h2 className="text-center text-[22px] font-bold text-white">Commission Structure</h2><div className="mt-5 grid gap-4 lg:grid-cols-2">
        {[{ icon: Trophy, title: 'Sports', description: 'Every sports bet generates commission at 3% of the wagered amount.', formula: '(0.03 × Wagered Amount × Commission Rate) / 2' }, { icon: MousePointerClick, title: 'Casino', description: 'Every game generates commission based on its house edge.', formula: '(Edge × Wagered Amount × Commission Rate) / 2' }].map(({ icon: Icon, title, description, formula }) => <Card key={title} className="flex flex-col items-center p-6 text-center sm:flex-row sm:text-left"><div className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-[#28203d] text-[#a47ffc]"><Icon size={34} /></div><div className="mt-5 sm:ml-6 sm:mt-0"><h3 className="text-[16px] font-bold text-white">{title}</h3><p className="mt-2 text-[12px] leading-5 text-[#727287]">{description}</p><code className="mt-4 block rounded-[8px] border border-[#30303d] bg-[#0f0f15] p-3 text-[10px] text-[#b69bf2]">{formula}</code></div></Card>)}
      </div></section>

      <TokenDivider />
      <section><h2 className="text-center text-[22px] font-bold text-white">More Information</h2><div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Card className="flex flex-col items-center p-6 text-center sm:flex-row sm:text-left"><div className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-[#28203d] text-[#a47ffc]"><BriefcaseBusiness size={34} /></div><div className="mt-5 sm:ml-6 sm:mt-0"><h3 className="text-[15px] font-bold text-white">Become a Partner</h3><p className="mt-2 text-[12px] leading-5 text-[#727287]">If you&apos;re a KOL or have an exceptional online presence, reach out for personalised deals.</p><a href="mailto:partnerships@shuffle.com" className="mt-4 inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#7717ff] px-4 text-[11px] font-bold text-white"><Mail size={13} />Contact Us</a></div></Card>
        <Card className="flex flex-col items-center p-6 text-center sm:flex-row sm:text-left"><div className="flex h-20 w-20 flex-none items-center justify-center rounded-full bg-[#202d31] text-[#66c3af]"><FileImage size={34} /></div><div className="mt-5 sm:ml-6 sm:mt-0"><h3 className="text-[15px] font-bold text-white">Promotional Materials</h3><p className="mt-2 text-[12px] leading-5 text-[#727287]">Use our ready-to-publish promotional materials to engage with your audience.</p><a href="https://drive.google.com/drive/folders/1-KRtYbV0uog6BTpuxVIxYWTV96eq64ke?usp=sharing" target="_blank" rel="noreferrer" className="mt-4 inline-flex h-9 items-center gap-2 rounded-[8px] bg-[#7717ff] px-4 text-[11px] font-bold text-white">Get Materials <ExternalLink size={12} /></a></div></Card>
      </div></section>

      <TokenDivider />
      <section><h2 className="text-center text-[22px] font-bold text-white">Affiliate FAQ</h2><div className="mx-auto mt-5 max-w-[900px] overflow-hidden rounded-[14px] border border-[#292935] bg-[#15151d]">{faqs.map((item, index) => <div key={item.question} className="border-b border-[#292935] last:border-0"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} className="flex min-h-[54px] w-full items-center gap-4 px-5 text-left text-[12px] font-semibold text-[#c9c9d4] hover:bg-[#1c1c25]"><span className="flex-1">{item.question}</span><ChevronDown size={15} className={`text-[#737387] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="border-t border-[#252530] px-5 py-4 text-[12px] leading-6 text-[#77778c]">{item.answer}</p>}</div>)}</div></section>
    </>
  );
}

function ReferredUsersContent() {
  const [query, setQuery] = useState('');
  return <><div className="mt-5 grid gap-3 sm:grid-cols-3">{[['Total referrals', '0'], ['Active this month', '0'], ['Total wagered', '$0.00']].map(([label, value]) => <Card key={label} className="p-5"><p className="text-[11px] text-[#707085]">{label}</p><p className="mt-1 text-[21px] font-bold text-white">{value}</p></Card>)}</div><Card className="mt-4 overflow-hidden"><div className="flex flex-col gap-3 border-b border-[#292934] p-4 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-[14px] font-bold text-white">Referred Users</h2><p className="mt-1 text-[11px] text-[#69697e]">Players registered through your campaigns.</p></div><label className="flex h-9 items-center gap-2 rounded-[8px] border border-[#30303d] bg-[#101016] px-3"><Search size={14} className="text-[#626277]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search users" className="w-[180px] bg-transparent text-[11px] text-white outline-none placeholder:text-[#555568]" /></label></div><div className="hidden grid-cols-4 border-b border-[#292934] bg-[#191921] px-5 py-3 text-[10px] font-bold uppercase tracking-[.08em] text-[#5f5f73] sm:grid"><span>User</span><span>Joined</span><span>Wagered</span><span className="text-right">Commission</span></div><EmptyTable icon={Users} title="No referred users yet" text={query ? `No users match “${query}”.` : 'Share a campaign link to start growing your affiliate audience.'} /></Card></>;
}

function CampaignsContent() {
  const [createOpen, setCreateOpen] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [campaigns, setCampaigns] = useState<{ name: string; code: string }[]>([]);
  const createCampaign = (event: React.FormEvent) => { event.preventDefault(); if (!campaignName.trim()) return; setCampaigns((items) => [...items, { name: campaignName.trim(), code: campaignName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'campaign' }]); setCampaignName(''); setCreateOpen(false); };
  return <><div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-[19px] font-bold text-white">Your campaigns</h2><p className="mt-1 text-[12px] text-[#717186]">Create and track unique referral links for each channel.</p></div><button onClick={() => setCreateOpen(true)} className="flex h-10 items-center justify-center gap-2 rounded-[9px] bg-[#7717ff] px-5 text-[12px] font-bold text-white hover:bg-[#8b3dff]"><Plus size={15} />Create Campaign</button></div><div className="mt-4 grid gap-3 sm:grid-cols-3">{[['Active campaigns', String(campaigns.length)], ['Total clicks', '0'], ['Conversion rate', '0.00%']].map(([label, value]) => <Card key={label} className="p-5"><p className="text-[11px] text-[#707085]">{label}</p><p className="mt-1 text-[21px] font-bold text-white">{value}</p></Card>)}</div><Card className="mt-4 overflow-hidden">{campaigns.length ? <div><div className="grid grid-cols-[1fr_1fr_auto] border-b border-[#292934] bg-[#191921] px-5 py-3 text-[10px] font-bold uppercase tracking-[.08em] text-[#5f5f73]"><span>Campaign</span><span>Referral link</span><span>Status</span></div>{campaigns.map((campaign) => <div key={campaign.code} className="grid grid-cols-[1fr_1fr_auto] items-center border-b border-[#292934] px-5 py-4 text-[12px]"><span className="font-semibold text-white">{campaign.name}</span><button onClick={() => navigator.clipboard?.writeText(`https://shuffle.com?r=${campaign.code}`)} className="truncate text-left font-mono text-[10px] text-[#9c78ed]">shuffle.com?r={campaign.code}</button><span className="rounded-full bg-[#18352a] px-2.5 py-1 text-[9px] font-bold text-[#55d5a4]">ACTIVE</span></div>)}</div> : <EmptyTable icon={Megaphone} title="No campaigns yet" text="Create your first campaign to receive a trackable referral link." />}</Card>{createOpen && <div className="fixed inset-0 z-[220] flex items-center justify-center p-4"><button aria-label="Close" onClick={() => setCreateOpen(false)} className="absolute inset-0 bg-black/75 backdrop-blur-sm" /><form onSubmit={createCampaign} className="relative w-full max-w-[440px] rounded-[15px] border border-[#30303d] bg-[#16161e] p-6 shadow-2xl"><button type="button" onClick={() => setCreateOpen(false)} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#272731] text-[#858598]"><X size={16} /></button><h2 className="text-[18px] font-bold text-white">Create campaign</h2><p className="mt-1 text-[11px] text-[#6e6e82]">Generate a new referral link for a channel or audience.</p><label className="mb-2 mt-5 block text-[11px] font-semibold text-[#aaaabb]">Campaign name*</label><input autoFocus value={campaignName} onChange={(event) => setCampaignName(event.target.value)} placeholder="e.g. YouTube channel" className="h-11 w-full rounded-[9px] border border-[#343440] bg-[#101016] px-3 text-[12px] text-white outline-none focus:border-[#7445d5]" /><label className="mb-2 mt-4 block text-[11px] font-semibold text-[#aaaabb]">Commission rate</label><div className="flex h-11 items-center rounded-[9px] border border-[#292935] bg-[#191920] px-3 text-[12px] text-[#77778b]">10%</div><button disabled={!campaignName.trim()} className="mt-5 h-11 w-full rounded-[9px] bg-[#7717ff] text-[12px] font-bold text-white disabled:bg-[#30303b] disabled:text-[#686879]">Create Campaign</button></form></div>}</>;
}

function EarningsContent() {
  return <><div className="mt-5 grid gap-3 sm:grid-cols-3">{[{ label: 'Available earnings', value: '$0.00', icon: WalletCards }, { label: 'Lifetime earnings', value: '$0.00', icon: DollarSign }, { label: 'Pending commission', value: '$0.00', icon: CalendarDays }].map(({ label, value, icon: Icon }) => <Card key={label} className="p-5"><div className="flex items-center justify-between"><div><p className="text-[11px] text-[#707085]">{label}</p><p className="mt-1 text-[21px] font-bold text-white">{value}</p></div><Icon size={18} className="text-[#9470ef]" /></div></Card>)}</div><Card className="mt-4 overflow-hidden"><div className="flex flex-col gap-4 border-b border-[#292934] p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-[14px] font-bold text-white">Earnings history</h2><p className="mt-1 text-[11px] text-[#69697e]">Commission generated by referred activity.</p></div><button disabled className="h-9 rounded-[8px] bg-[#30303b] px-4 text-[11px] font-bold text-[#686879]">Claim Earnings</button></div><div className="hidden grid-cols-4 border-b border-[#292934] bg-[#191921] px-5 py-3 text-[10px] font-bold uppercase tracking-[.08em] text-[#5f5f73] sm:grid"><span>Date</span><span>Campaign</span><span>Source</span><span className="text-right">Amount</span></div><EmptyTable icon={DollarSign} title="No earnings yet" text="Commission entries will appear here when your referred users begin wagering." /></Card></>;
}

export default function AffiliateOverview({ initialTab = 'overview' }: { initialTab?: AffiliateTab }) {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1160px] pb-8">
        <h1 className="text-[24px] font-bold tracking-[-.02em] text-white sm:text-[28px]">Shuffle Affiliate Program</h1>
        <div className="mt-5"><AffiliateTabs active={initialTab} /></div>
        {initialTab === 'overview' && <OverviewContent />}
        {initialTab === 'referred-users' && <ReferredUsersContent />}
        {initialTab === 'campaigns' && <CampaignsContent />}
        {initialTab === 'earnings' && <EarningsContent />}
      </div>
    </AppShell>
  );
}
