"use client";

import AppShell from '@/components/AppShell';
import { AccountPage, Card, EmptyState, Toggle } from '@/components/account/AccountUI';
import { Bell, BellOff, CheckCheck, Mail } from 'lucide-react';
import { useState } from 'react';

export default function NotificationsPage() {
  const [tab, setTab] = useState('All');
  const [preferences, setPreferences] = useState({ promos: true, transactions: true, vip: true, email: false });

  const setPreference = (key: keyof typeof preferences) => setPreferences((current) => ({ ...current, [key]: !current[key] }));

  return (
    <AppShell>
      <AccountPage title="Notifications" description="Stay up to date with rewards, account activity and promotions." icon={Bell}>
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#292934] px-4 sm:px-5">
            <div className="flex overflow-x-auto">
              {['All', 'Rewards', 'Transactions', 'System'].map((item) => <button key={item} onClick={() => setTab(item)} className={`relative h-14 whitespace-nowrap px-3 text-[12px] font-semibold sm:px-5 ${tab === item ? 'text-white' : 'text-[#75758a] hover:text-white'}`}>{item}{tab === item && <span className="absolute inset-x-3 bottom-0 h-0.5 bg-[#7717ff] sm:inset-x-5" />}</button>)}
            </div>
            <button className="hidden items-center gap-2 text-[11px] font-bold text-[#8f6bec] sm:flex"><CheckCheck size={15} />Mark all read</button>
          </div>
          <EmptyState icon={BellOff} title={`No ${tab === 'All' ? '' : tab.toLowerCase()} notifications yet`} text="We’ll let you know when there’s an update, reward or important change to your account." />
        </Card>

        <Card className="mt-4">
          <div className="border-b border-[#292934] px-5 py-4"><h2 className="text-[14px] font-bold text-white">Notification preferences</h2><p className="mt-1 text-[11px] text-[#6e6e82]">Choose what you want to hear about.</p></div>
          <div className="divide-y divide-[#282833] px-5">
            {[
              { key: 'promos' as const, title: 'Promotions and bonuses', text: 'New campaigns, races and special offers.' },
              { key: 'transactions' as const, title: 'Transaction updates', text: 'Deposits, withdrawals and account transfers.' },
              { key: 'vip' as const, title: 'VIP rewards', text: 'Rakeback, weekly bonuses and level updates.' },
              { key: 'email' as const, title: 'Email notifications', text: 'Receive selected notifications in your inbox.', icon: Mail },
            ].map(({ key, title, text }) => <div key={key} className="flex items-center gap-4 py-4"><div className="min-w-0 flex-1"><h3 className="text-[12px] font-semibold text-[#d0d0da]">{title}</h3><p className="mt-0.5 text-[11px] leading-4 text-[#69697d]">{text}</p></div><Toggle checked={preferences[key]} onChange={() => setPreference(key)} label={title} /></div>)}
          </div>
        </Card>
      </AccountPage>
    </AppShell>
  );
}
