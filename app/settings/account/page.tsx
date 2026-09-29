"use client";

import AppShell from '@/components/AppShell';
import { useAuth } from '@/components/AuthContext';
import { AccountPage, Card, PrimaryButton, Toggle } from '@/components/account/AccountUI';
import { Camera, Check, Globe2, KeyRound, LockKeyhole, Settings, ShieldCheck, UserRound } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AccountSettingsPage() {
  const { profile, user, setProfile } = useAuth();
  const [tab, setTab] = useState<'account' | 'security' | 'preferences'>('account');
  const [username, setUsername] = useState(profile?.username || user?.email?.split('@')[0] || 'feolu');
  const [saved, setSaved] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);

  useEffect(() => { if (profile?.username) setUsername(profile.username); }, [profile?.username]);

  const save = (event: React.FormEvent) => {
    event.preventDefault();
    setProfile({ ...(profile || {}), username: username.trim() || 'feolu' });
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  return (
    <AppShell>
      <AccountPage title="Settings" description="Manage your account, security and display preferences." icon={Settings}>
        <Card className="overflow-hidden">
          <div className="flex overflow-x-auto border-b border-[#292934]">
            {[{ id: 'account', label: 'Account', icon: UserRound }, { id: 'security', label: 'Security', icon: ShieldCheck }, { id: 'preferences', label: 'Preferences', icon: Globe2 }].map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setTab(id as typeof tab)} className={`relative flex h-14 min-w-[130px] flex-1 items-center justify-center gap-2 text-[12px] font-bold ${tab === id ? 'bg-[#1b1b24] text-white' : 'text-[#737388] hover:text-white'}`}><Icon size={15} />{label}{tab === id && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#7717ff]" />}</button>)}
          </div>

          {tab === 'account' && (
            <form onSubmit={save}>
              <div className="border-b border-[#292934] p-5 sm:p-6">
                <h2 className="text-[14px] font-bold text-white">Profile</h2><p className="mt-1 text-[11px] text-[#6e6e82]">Update your public profile information.</p>
                <div className="mt-5 flex items-center gap-4"><div className="relative"><div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#343442] bg-[#22222c]"><img src="/icons/user-profile.svg" alt="avatar" className="h-full w-full" /></div><button type="button" aria-label="Change avatar" className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#15151d] bg-[#782be8] text-white"><Camera size={13} /></button></div><div><p className="text-[12px] font-semibold text-white">Profile picture</p><p className="mt-1 text-[11px] text-[#69697e]">JPG or PNG. Maximum size 2MB.</p></div></div>
              </div>
              <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                <div><label className="mb-2 block text-[11px] font-semibold text-[#a2a2b4]">Username</label><input value={username} onChange={(e) => setUsername(e.target.value)} className="h-11 w-full rounded-[9px] border border-[#30303d] bg-[#101016] px-4 text-[13px] text-white outline-none focus:border-[#7041db]" /></div>
                <div><label className="mb-2 block text-[11px] font-semibold text-[#a2a2b4]">Email address</label><input value={user?.email || 'demo@example.com'} disabled className="h-11 w-full cursor-not-allowed rounded-[9px] border border-[#292935] bg-[#181820] px-4 text-[13px] text-[#69697d]" /></div>
                <div><label className="mb-2 block text-[11px] font-semibold text-[#a2a2b4]">Date of birth</label><input type="date" className="h-11 w-full rounded-[9px] border border-[#30303d] bg-[#101016] px-4 text-[13px] text-[#838397] outline-none focus:border-[#7041db]" /></div>
                <div><label className="mb-2 block text-[11px] font-semibold text-[#a2a2b4]">Country</label><select className="h-11 w-full rounded-[9px] border border-[#30303d] bg-[#101016] px-4 text-[13px] text-[#838397] outline-none focus:border-[#7041db]"><option>Not selected</option><option>United Kingdom</option><option>Canada</option><option>Australia</option></select></div>
              </div>
              <div className="flex items-center justify-end gap-3 border-t border-[#292934] px-5 py-4 sm:px-6">{saved && <span className="flex items-center gap-1 text-[11px] text-[#35d49a]"><Check size={14} />Saved</span>}<PrimaryButton type="submit">Save changes</PrimaryButton></div>
            </form>
          )}

          {tab === 'security' && (
            <div>
              <div className="divide-y divide-[#292934] px-5 sm:px-6">
                <div className="flex items-center gap-4 py-5"><div className="flex h-10 w-10 flex-none items-center justify-center rounded-[9px] bg-[#27203b] text-[#9f7afb]"><KeyRound size={18} /></div><div className="min-w-0 flex-1"><h3 className="text-[12px] font-bold text-white">Password</h3><p className="mt-1 text-[11px] text-[#69697d]">Choose a strong, unique password for your account.</p></div><button className="rounded-[8px] border border-[#343442] px-3 py-2 text-[11px] font-bold text-[#aaaabd] hover:text-white">Change</button></div>
                <div className="flex items-center gap-4 py-5"><div className="flex h-10 w-10 flex-none items-center justify-center rounded-[9px] bg-[#202e2b] text-[#50d3a2]"><ShieldCheck size={18} /></div><div className="min-w-0 flex-1"><h3 className="text-[12px] font-bold text-white">Two-factor authentication</h3><p className="mt-1 text-[11px] text-[#69697d]">Require an authenticator code when signing in.</p></div><Toggle checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} label="Two-factor authentication" /></div>
                <div className="flex items-center gap-4 py-5"><div className="flex h-10 w-10 flex-none items-center justify-center rounded-[9px] bg-[#202631] text-[#8d9dbd]"><LockKeyhole size={18} /></div><div className="min-w-0 flex-1"><h3 className="text-[12px] font-bold text-white">Active sessions</h3><p className="mt-1 text-[11px] text-[#69697d]">Review browsers and devices signed in to your account.</p></div><button className="rounded-[8px] border border-[#343442] px-3 py-2 text-[11px] font-bold text-[#aaaabd] hover:text-white">Review</button></div>
              </div>
            </div>
          )}

          {tab === 'preferences' && (
            <div className="divide-y divide-[#292934] px-5 sm:px-6">
              <div className="flex items-center gap-4 py-5"><div className="min-w-0 flex-1"><h3 className="text-[12px] font-bold text-white">Display currency</h3><p className="mt-1 text-[11px] text-[#69697d]">Choose your preferred fiat currency.</p></div><select className="h-9 rounded-[8px] border border-[#343442] bg-[#17171f] px-3 text-[11px] text-[#aaaabd]"><option>USD</option><option>EUR</option><option>GBP</option></select></div>
              <div className="flex items-center gap-4 py-5"><div className="min-w-0 flex-1"><h3 className="text-[12px] font-bold text-white">Language</h3><p className="mt-1 text-[11px] text-[#69697d]">Select the language used throughout the site.</p></div><select className="h-9 rounded-[8px] border border-[#343442] bg-[#17171f] px-3 text-[11px] text-[#aaaabd]"><option>English</option><option>Español</option><option>Português</option></select></div>
              <div className="flex items-center gap-4 py-5"><div className="min-w-0 flex-1"><h3 className="text-[12px] font-bold text-white">Hide balances</h3><p className="mt-1 text-[11px] text-[#69697d]">Mask account balances across the site.</p></div><Toggle checked={hideBalance} onChange={() => setHideBalance(!hideBalance)} label="Hide balances" /></div>
            </div>
          )}
        </Card>
      </AccountPage>
    </AppShell>
  );
}
