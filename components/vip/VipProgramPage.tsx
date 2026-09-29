"use client";

import AppShell from '@/components/AppShell';
import { useAuth } from '@/components/AuthContext';
import { Check, ChevronDown, Gift, LockKeyhole, Rocket } from 'lucide-react';
import { useState } from 'react';

type Tier = {
  name: string;
  slug: string;
  levels: { name: string; xp: number }[];
};

const tiers: Tier[] = [
  { name: 'Wood', slug: 'wood', levels: [{ name: 'Wood', xp: 500 }] },
  { name: 'Bronze', slug: 'bronze', levels: [1, 2, 3, 4, 5].map((level) => ({ name: `Bronze ${level}`, xp: level * 1000 })) },
  { name: 'Silver', slug: 'silver', levels: [1, 2, 3, 4, 5].map((level) => ({ name: `Silver ${level}`, xp: level * 10000 })) },
  { name: 'Gold', slug: 'gold', levels: [100000, 150000, 200000, 250000, 300000].map((xp, index) => ({ name: `Gold ${index + 1}`, xp })) },
  { name: 'Platinum', slug: 'platinum', levels: [450000, 600000, 750000, 900000, 1050000].map((xp, index) => ({ name: `Platinum ${index + 1}`, xp })) },
  { name: 'Jade', slug: 'jade', levels: [1200000, 1350000, 1500000, 1650000, 1800000].map((xp, index) => ({ name: `Jade ${index + 1}`, xp })) },
  { name: 'Sapphire', slug: 'sapphire', levels: [2300000, 2800000, 3300000, 3800000, 4300000].map((xp, index) => ({ name: `Sapphire ${index + 1}`, xp })) },
  { name: 'Ruby', slug: 'ruby', levels: [5800000, 7300000, 8800000, 10300000, 11800000].map((xp, index) => ({ name: `Ruby ${index + 1}`, xp })) },
  { name: 'Diamond', slug: 'diamond', levels: [17000000, 22000000, 27000000, 32000000, 37000000].map((xp, index) => ({ name: `Diamond ${index + 1}`, xp })) },
];

const rewards = [
  { title: 'Instant Rakeback', icon: '/icons/rake.svg', level: '', active: true },
  { title: 'Daily Rakeback', icon: '/icons/daily-bonus.svg', level: 'Bronze 1' },
  { title: 'Weekly Bonus', icon: '/icons/weekly-bonus.svg', level: 'Bronze 1' },
  { title: 'Monthly Bonus', icon: '/icons/monthly-bonus.svg', level: 'Silver 1' },
];

const benefits = [
  { name: 'Instant Rakeback', from: 0 },
  { name: 'Weekly Bonus', from: 0 },
  { name: 'Level-Up Bonus', from: 0 },
  { name: 'Rank Up Bonus', from: 0 },
  { name: 'Monthly Bonus', from: 1 },
  { name: 'Bonus Increase', from: 1 },
  { name: 'VIP Host', from: 5 },
  { name: 'Invitation to Shuffle Events', from: 6 },
];

const benefitRanks = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Jade', 'Sapphire', 'Ruby', 'Diamond'];

function VipRankIcon({ slug, className, size }: { slug: string; className: string; size: number }) {
  const useShuffleAsset = slug === 'wood' || slug === 'unranked';
  const source = useShuffleAsset ? `https://shuffle.com/images/vip/${slug}.svg` : `/images/vip/${slug}.svg`;

  return (
    <img
      src={source}
      alt={`${slug} VIP icon`}
      width={size}
      height={size}
      className={className}
      onError={(event) => {
        const target = event.currentTarget;
        if (!target.dataset.fallback) {
          target.dataset.fallback = 'true';
          target.src = `/images/vip/${slug}.svg`;
        }
      }}
    />
  );
}

function RankBadge({ slug, label, compact = false }: { slug: string; label?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center ${label ? 'gap-2' : ''}`}>
      <VipRankIcon slug={slug} size={compact ? 18 : 22} className={compact ? 'h-[18px] w-[18px]' : 'h-[22px] w-[22px]'} />
      {label && <span>{label}</span>}
    </span>
  );
}

function SectionTitle({ icon, children }: { icon: 'gift' | 'crown' | 'rocket'; children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      {icon === 'gift' && <Gift size={21} className="text-[#9973ff]" />}
      {icon === 'crown' && <img src="/icons/crown.svg" alt="crown" className="h-[22px] w-[22px]" />}
      {icon === 'rocket' && <Rocket size={21} className="text-[#9973ff]" />}
      <h2 className="text-[17px] font-bold text-white">{children}</h2>
    </div>
  );
}

function VipIllustration() {
  return (
    <div className="relative mx-auto h-[220px] w-full max-w-[390px] lg:h-[260px]" aria-label="VIP rewards illustration" role="img">
      <div className="absolute left-1/2 top-1/2 h-[180px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#782cff]/20 blur-[55px]" />
      <div className="absolute bottom-5 left-[12%] h-10 w-10 rotate-[-20deg] rounded-full border-[5px] border-[#7c42ff] bg-[#291b55] shadow-[0_8px_20px_rgba(0,0,0,.4)]" />
      <div className="absolute bottom-12 right-[10%] h-12 w-12 rotate-12 rounded-full border-[6px] border-[#6b34e7] bg-[#211849] shadow-[0_8px_20px_rgba(0,0,0,.4)]" />
      <div className="absolute left-[18%] top-8 h-8 w-8 rotate-12 rounded-full border-4 border-[#9f7aff] bg-[#3f2874]" />
      <div className="absolute left-1/2 top-[48%] h-[112px] w-[148px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-gradient-to-br from-[#9c72ff] via-[#6e26df] to-[#3e167f] shadow-[0_30px_50px_rgba(67,20,142,.48)]">
        <div className="absolute inset-x-[-8px] top-0 h-7 rounded-[9px] bg-gradient-to-b from-[#b795ff] to-[#7240df]" />
        <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-[#a17dff]/75" />
        <div className="absolute left-1/2 top-[-32px] h-14 w-14 -translate-x-1/2 rotate-45 rounded-[18px_4px_18px_4px] border-[9px] border-[#a987ff]" />
        <Gift className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/90" size={30} />
      </div>
      <div className="absolute right-[19%] top-5 rotate-12 text-[#c8b5ff]">✦</div>
      <div className="absolute bottom-6 left-[27%] text-[22px] text-[#8154ec]">✦</div>
      <div className="absolute right-[30%] top-[42%] text-[12px] text-white">✦</div>
    </div>
  );
}

function RewardsSection() {
  return (
    <section className="mt-8 rounded-[15px] border border-[#22222e] bg-[#111118] p-4 sm:p-5">
      <div className="flex items-center gap-2.5">
        <img src="/icons/small-gift.svg" alt="gift" className="h-6 w-6" />
        <h2 className="text-[17px] font-bold text-white">Your Rewards</h2>
        <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#282835] px-2 text-[11px] font-bold text-[#8d8da3]">0</span>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {rewards.map((reward) => (
          <article key={reward.title} className="flex min-h-[216px] flex-col overflow-hidden rounded-[12px] border border-[#2a2a37] bg-[#181820]">
            <div className="flex h-11 items-center justify-between border-b border-[#282834] px-4">
              <span className={`text-[11px] font-semibold ${reward.active ? 'text-[#aaaabe]' : 'text-[#5e5e70]'}`}>Wager to Unlock</span>
              <img src="/icons/small-gift.svg" alt="gift" className={`h-4 w-4 ${reward.active ? '' : 'grayscale opacity-40'}`} />
            </div>
            <div className={`flex flex-1 flex-col items-center justify-center gap-3 py-4 ${reward.active ? '' : 'opacity-45 grayscale'}`}>
              <img src={reward.icon} alt="" className="h-12 w-12" />
              <h3 className="text-[13px] font-bold text-white">{reward.title}</h3>
            </div>
            <div className="px-3 pb-3">
              {reward.active ? (
                <button disabled className="h-9 w-full cursor-not-allowed rounded-[8px] bg-[#30303b] text-[12px] font-bold text-[#69697b]">Claim</button>
              ) : (
                <div className="flex h-9 w-full items-center justify-center gap-2 rounded-[8px] bg-[#24242d] text-[11px] font-semibold text-[#68687a]">
                  <LockKeyhole size={13} /> {reward.level}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function LevelAccordion({ tier, open, onToggle }: { tier: Tier; open: boolean; onToggle: () => void }) {
  return (
    <div className="overflow-hidden border-b border-[#292934] last:border-b-0">
      <button type="button" onClick={onToggle} aria-expanded={open} className="flex h-[58px] w-full items-center px-4 text-left transition-colors hover:bg-[#1c1c25] sm:px-5">
        <RankBadge slug={tier.slug} label={tier.name} />
        <span className="ml-auto flex items-center gap-4 text-[#6f6f81]">
          <LockKeyhole size={15} />
          <ChevronDown size={17} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows] duration-200 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="min-h-0 overflow-hidden">
          <div className="overflow-x-auto border-t border-[#292934] bg-[#111118]">
            <table className="w-full min-w-[500px] border-collapse text-left text-[12px]">
              <thead className="text-[#69697d]">
                <tr>
                  <th className="px-5 py-3 font-medium">Level</th>
                  <th className="px-5 py-3 font-medium">XP required</th>
                  <th className="px-5 py-3 font-medium">Completed</th>
                </tr>
              </thead>
              <tbody>
                {tier.levels.map((level) => (
                  <tr key={level.name} className="border-t border-[#23232d] even:bg-[#16161e]">
                    <td className="px-5 py-3.5 text-white"><RankBadge slug={tier.slug} label={level.name} compact /></td>
                    <td className="px-5 py-3.5 font-medium tabular-nums text-[#aaaabd]">{level.xp.toLocaleString('en-US')}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-2 text-[#77778c]"><img src="/icons/tick-incomplete.svg" alt="incomplete" className="h-[17px] w-[17px]" />Incomplete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function BenefitsTable() {
  return (
    <section className="mt-8 rounded-[15px] border border-[#22222e] bg-[#111118] p-4 sm:p-5">
      <SectionTitle icon="rocket">The benefits</SectionTitle>
      <div className="overflow-x-auto rounded-[11px] border border-[#292935] scrollbar-thin">
        <table className="w-full min-w-[980px] border-collapse text-left text-[12px]">
          <thead className="bg-[#1b1b24] text-[#85859a]">
            <tr>
              <th className="min-w-[210px] px-5 py-3.5 font-medium">VIP Rank</th>
              {benefitRanks.map((rank) => <th key={rank} className="min-w-[96px] px-3 py-3.5 text-center font-medium">{rank}</th>)}
            </tr>
          </thead>
          <tbody>
            {benefits.map((benefit, row) => (
              <tr key={benefit.name} className={`border-t border-[#282833] ${row % 2 ? 'bg-[#17171f]' : 'bg-[#14141b]'}`}>
                <td className="px-5 py-4 font-medium text-[#c2c2d0]">{benefit.name}</td>
                {benefitRanks.map((rank, index) => (
                  <td key={rank} className="px-3 py-4 text-center">
                    {index >= benefit.from && <span className="mx-auto flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#153f33] text-[#3bd99f]"><Check size={12} strokeWidth={3} /></span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function VipProgramPage() {
  const { profile, user } = useAuth();
  const [openTier, setOpenTier] = useState<string | null>(null);
  const username = profile?.username || user?.email?.split('@')[0] || 'feolu';

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-[1160px] pb-6">
        <h1 className="mb-5 text-[24px] font-bold tracking-[-0.02em] text-white sm:text-[28px]">VIP Program</h1>

        <section data-testid="vip-progress-overview" className="relative overflow-hidden rounded-[16px] border border-[#252532] bg-gradient-to-br from-[#191922] via-[#15151d] to-[#111117] px-5 py-6 sm:px-7 lg:min-h-[310px] lg:px-9 lg:py-8">
          <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
            <div className="max-w-[650px]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#30303e] bg-[#22222d]">
                  <img alt="avatar" width="44" height="44" src="/icons/user-profile.svg" className="h-full w-full" />
                </div>
                <div>
                  <h2 className="text-[18px] font-bold text-white">{username}</h2>
                  <span className="mt-1 flex items-center gap-1.5 text-[11px] text-[#8d8da2]"><VipRankIcon slug="unranked" size={16} className="h-4 w-4" />Unranked</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="mb-2.5 flex items-center justify-between text-[12px] font-semibold text-[#bbbaca]"><span>Your VIP Progress</span><span>0.00%</span></div>
                <div className="h-2 overflow-hidden rounded-full border border-[#32323f] bg-[#0d0d13]" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100} aria-label="Your VIP Progress">
                  <div className="h-full w-0 bg-[#7717ff]" />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-[#85859a]">
                  <span className="flex items-center gap-1.5"><VipRankIcon slug="unranked" size={16} className="h-4 w-4" />Unranked</span>
                  <span className="flex items-center gap-1.5"><VipRankIcon slug="wood" size={16} className="h-4 w-4" />Wood</span>
                </div>
              </div>

              <p className="mt-6 max-w-[660px] text-[13px] leading-[1.65] text-[#8a8a9f]">
                Shuffle&apos;s VIP program is designed to suit all different types of players with an emphasis on ensuring you receive the most in cumulative bonuses for every dollar you wager.
              </p>
            </div>
            <VipIllustration />
          </div>
        </section>

        <RewardsSection />

        <section className="mt-8 rounded-[15px] border border-[#22222e] bg-[#111118] p-4 sm:p-5">
          <SectionTitle icon="crown">VIP levels</SectionTitle>
          <div className="overflow-hidden rounded-[11px] border border-[#292935] bg-[#17171f]">
            {tiers.map((tier) => <LevelAccordion key={tier.slug} tier={tier} open={openTier === tier.slug} onToggle={() => setOpenTier(openTier === tier.slug ? null : tier.slug)} />)}
          </div>
        </section>

        <BenefitsTable />
      </div>
    </AppShell>
  );
}
