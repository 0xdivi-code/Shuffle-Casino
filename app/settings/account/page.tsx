"use client";

import AppShell from '@/components/AppShell';
import { useAuth } from '@/components/AuthContext';
import { Card, Toggle } from '@/components/account/AccountUI';
import { Check, Globe2, KeyRound, Laptop, LockKeyhole, Search, ShieldCheck, Smartphone, UserCheck, UserRound, UsersRound } from 'lucide-react';
import { useEffect, useState } from 'react';

type SettingsTab = 'account' | 'verify' | 'security' | 'preferences' | 'sessions' | 'ignored-users';

const tabs: { id: SettingsTab; label: string }[] = [
  { id: 'account', label: 'Account' },
  { id: 'verify', label: 'Verify' },
  { id: 'security', label: 'Security' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'ignored-users', label: 'Ignored Users' },
];

export default function AccountSettingsPage() {
  const { profile, user, setProfile } = useAuth();
  const [tab, setTab] = useState<SettingsTab>('account');
  const [username, setUsername] = useState(profile?.username || user?.email?.split('@')[0] || 'feolu');
  const [saved, setSaved] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [withdrawalLock, setWithdrawalLock] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [ignoredQuery, setIgnoredQuery] = useState('');

  useEffect(() => { if (profile?.username) setUsername(profile.username); }, [profile?.username]);

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    setProfile({ ...(profile || {}), username: username.trim() || 'feolu' });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <AppShell>
      <section className="mx-auto w-full max-w-[1160px] pb-8">
        <h1 className="text-[24px] font-bold tracking-[-.02em] text-white sm:text-[28px]">Settings</h1>
        <div className="mt-5 overflow-x-auto scrollbar-hide"><div role="tablist" className="flex w-max items-center gap-1 rounded-[11px] border border-[#292935] bg-[#15151d] p-1">{tabs.map((item) => <button key={item.id} role="tab" aria-selected={tab === item.id} data-testid={item.id} disabled={tab === item.id} onClick={() => setTab(item.id)} className={`h-9 rounded-[8px] px-4 text-[12px] font-bold transition-colors ${tab === item.id ? 'bg-white text-[#15151d]' : 'text-[#7d7d91] hover:bg-[#22222c] hover:text-white'}`}>{item.label}</button>)}</div></div>

        {tab === 'account' && <form onSubmit={save} className="mt-5 overflow-hidden rounded-[14px] border border-[#292935] bg-[#15151d]">
          <div className="border-b border-[#292935] px-5 py-4 sm:px-6"><h2 className="text-[15px] font-bold text-white">User Information</h2></div>
          <div className="p-5 sm:p-6">
            <div className="flex flex-col justify-between gap-5 rounded-[12px] border border-[#2d2d39] bg-[#1a1a22] p-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3"><div className="h-12 w-12 overflow-hidden rounded-full border border-[#343442] bg-[#22222c]"><img src="/icons/user-profile.svg" alt="avatar" className="h-full w-full" /></div><div><h2 className="text-[17px] font-bold text-white">{username}</h2><span className="mt-1 flex items-center gap-1.5 text-[11px] text-[#89899d]"><img src="https://shuffle.com/images/vip/unranked.svg" onError={(event) => { const target = event.currentTarget; if (!target.dataset.fallback) { target.dataset.fallback = 'true'; target.src = '/images/vip/unranked.svg'; } }} alt="vip icon" className="h-4 w-4" />Unranked</span></div></div>
              <div className="flex gap-2"><input value={username} onChange={(event) => setUsername(event.target.value)} aria-label="Username" className="h-10 min-w-0 rounded-[8px] border border-[#343440] bg-[#101016] px-3 text-[12px] text-white outline-none focus:border-[#7445d5]" /><button className="h-10 rounded-[8px] bg-[#7717ff] px-4 text-[11px] font-bold text-white">Save</button></div>
            </div>

            <div className="mt-4 grid overflow-hidden rounded-[11px] border border-[#2d2d39] sm:grid-cols-3">{[['Join Date', '9.25.2026'], ['Total Bets', '0'], ['Total wagered', '$0.00']].map(([title, value], index) => <div key={title} className={`p-4 ${index ? 'border-t border-[#2d2d39] sm:border-l sm:border-t-0' : ''}`}><span className="text-[10px] text-[#6f6f83]">{title}</span><p className="mt-1 text-[13px] font-bold text-white">{value}</p></div>)}</div>

            <div className="relative mt-5"><label className="mb-2 block text-[11px] font-semibold text-[#aaaabb]">Email</label><input readOnly value={user?.email || 'shuffle@gmail.com'} className="h-11 w-full rounded-[9px] border border-[#30303d] bg-[#101016] px-4 pr-12 text-[12px] font-medium text-[#c3c3cf] outline-none" /><span className="absolute bottom-3 right-4 flex h-5 w-5 items-center justify-center rounded-full bg-[#173c31] text-[#3cd39b]"><Check size={12} strokeWidth={3} /></span></div>
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-[#292935] px-5 py-4">{saved && <span className="text-[11px] text-[#48d6a2]">Changes saved</span>}<button type="submit" className="h-10 rounded-[8px] bg-[#7717ff] px-5 text-[11px] font-bold text-white">Save changes</button></div>
        </form>}

        {tab === 'verify' && <Card className="mt-5 overflow-hidden"><div className="border-b border-[#292935] px-5 py-4 sm:px-6"><h2 className="text-[15px] font-bold text-white">Account Verification</h2><p className="mt-1 text-[11px] text-[#6d6d81]">Verify your identity to unlock all account features.</p></div><div className="p-5 sm:p-6"><div className="flex flex-col items-start gap-5 rounded-[12px] border border-[#3d3524] bg-[#242015] p-5 sm:flex-row sm:items-center"><div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#493b1c] text-[#e0b95b]"><UserCheck size={22} /></div><div className="flex-1"><h3 className="text-[13px] font-bold text-white">Identity verification required</h3><p className="mt-1 text-[11px] leading-5 text-[#9d947d]">Complete a secure identity check to increase limits and protect your account.</p></div><button className="h-10 rounded-[8px] bg-[#7717ff] px-5 text-[11px] font-bold text-white">Start verification</button></div><div className="mt-5 grid gap-3 sm:grid-cols-3">{[['1', 'Personal details'], ['2', 'Identity document'], ['3', 'Review']].map(([step, label]) => <div key={step} className="rounded-[10px] border border-[#2d2d39] bg-[#191921] p-4"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2b2141] text-[10px] font-bold text-[#a581fa]">{step}</span><p className="mt-3 text-[11px] font-semibold text-[#c3c3cf]">{label}</p></div>)}</div></div></Card>}

        {tab === 'security' && <Card className="mt-5 overflow-hidden"><div className="border-b border-[#292935] px-5 py-4 sm:px-6"><h2 className="text-[15px] font-bold text-white">Security</h2><p className="mt-1 text-[11px] text-[#6d6d81]">Protect your account and withdrawals.</p></div><div className="divide-y divide-[#292934] px-5 sm:px-6">
          <div className="flex items-center gap-4 py-5"><div className="flex h-10 w-10 flex-none items-center justify-center rounded-[9px] bg-[#29203f] text-[#a17cf8]"><KeyRound size={18} /></div><div className="min-w-0 flex-1"><h3 className="text-[12px] font-bold text-white">Password</h3><p className="mt-1 text-[11px] text-[#69697d]">Last changed when your account was created.</p></div><button className="rounded-[8px] border border-[#343442] px-3 py-2 text-[11px] font-bold text-[#aaaabd]">Change</button></div>
          <div className="flex items-center gap-4 py-5"><div className="flex h-10 w-10 flex-none items-center justify-center rounded-[9px] bg-[#20302b] text-[#50d3a2]"><ShieldCheck size={18} /></div><div className="min-w-0 flex-1"><h3 className="text-[12px] font-bold text-white">Two-factor authentication</h3><p className="mt-1 text-[11px] text-[#69697d]">Require an authenticator code when signing in.</p></div><Toggle checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} label="Two-factor authentication" /></div>
          <div className="flex items-center gap-4 py-5"><div className="flex h-10 w-10 flex-none items-center justify-center rounded-[9px] bg-[#262630] text-[#9494a7]"><LockKeyhole size={18} /></div><div className="min-w-0 flex-1"><h3 className="text-[12px] font-bold text-white">Withdrawal lock</h3><p className="mt-1 text-[11px] text-[#69697d]">Pause withdrawals after security changes.</p></div><Toggle checked={withdrawalLock} onChange={() => setWithdrawalLock(!withdrawalLock)} label="Withdrawal lock" /></div>
        </div></Card>}

        {tab === 'preferences' && <Card className="mt-5 overflow-hidden"><div className="border-b border-[#292935] px-5 py-4 sm:px-6"><h2 className="text-[15px] font-bold text-white">Preferences</h2></div><div className="divide-y divide-[#292934] px-5 sm:px-6">
          <div className="flex items-center gap-4 py-5"><Globe2 size={18} className="text-[#9370ed]" /><div className="flex-1"><h3 className="text-[12px] font-bold text-white">Display currency</h3><p className="mt-1 text-[11px] text-[#69697d]">Currency used for converted balances.</p></div><select className="h-9 rounded-[8px] border border-[#343442] bg-[#17171f] px-3 text-[11px] text-[#aaaabd]"><option>USD</option><option>EUR</option><option>GBP</option></select></div>
          <div className="flex items-center gap-4 py-5"><UserRound size={18} className="text-[#9370ed]" /><div className="flex-1"><h3 className="text-[12px] font-bold text-white">Hide balances</h3><p className="mt-1 text-[11px] text-[#69697d]">Mask balances throughout the site.</p></div><Toggle checked={hideBalance} onChange={() => setHideBalance(!hideBalance)} label="Hide balances" /></div>
          <div className="flex items-center gap-4 py-5"><Smartphone size={18} className="text-[#9370ed]" /><div className="flex-1"><h3 className="text-[12px] font-bold text-white">Marketing updates</h3><p className="mt-1 text-[11px] text-[#69697d]">Receive product and promotion emails.</p></div><Toggle checked={marketing} onChange={() => setMarketing(!marketing)} label="Marketing updates" /></div>
        </div></Card>}

        {tab === 'sessions' && <Card className="mt-5 overflow-hidden"><div className="border-b border-[#292935] px-5 py-4 sm:px-6"><h2 className="text-[15px] font-bold text-white">Active Sessions</h2><p className="mt-1 text-[11px] text-[#6d6d81]">Devices currently signed in to your account.</p></div><div className="p-5 sm:p-6"><div className="flex items-center gap-4 rounded-[11px] border border-[#2d2d39] bg-[#191921] p-4"><div className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#28203d] text-[#a17cf8]"><Laptop size={18} /></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h3 className="text-[12px] font-bold text-white">Chrome on Linux</h3><span className="rounded-full bg-[#18352a] px-2 py-0.5 text-[8px] font-bold text-[#54d6a4]">CURRENT</span></div><p className="mt-1 text-[10px] text-[#69697d]">Lagos, Nigeria · Active now</p></div><button disabled className="rounded-[8px] border border-[#30303d] px-3 py-2 text-[10px] font-bold text-[#5e5e71]">Revoke</button></div></div></Card>}

        {tab === 'ignored-users' && <Card className="mt-5 overflow-hidden"><div className="flex flex-col gap-3 border-b border-[#292935] p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-[15px] font-bold text-white">Ignored Users</h2><p className="mt-1 text-[11px] text-[#6d6d81]">Manage users hidden from chat.</p></div><label className="flex h-9 items-center gap-2 rounded-[8px] border border-[#30303d] bg-[#101016] px-3"><Search size={14} className="text-[#626277]" /><input value={ignoredQuery} onChange={(event) => setIgnoredQuery(event.target.value)} placeholder="Search users" className="w-[180px] bg-transparent text-[11px] text-white outline-none" /></label></div><div className="flex min-h-[280px] flex-col items-center justify-center px-5 text-center"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#20202a] text-[#747489]"><UsersRound size={22} /></div><h3 className="mt-4 text-[14px] font-bold text-white">No ignored users</h3><p className="mt-1 text-[11px] text-[#6f6f83]">Users you ignore in chat will appear here.</p></div></Card>}
      </section>
    </AppShell>
  );
}
