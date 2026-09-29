"use client";

import AppShell from '@/components/AppShell';
import { AccountPage, Card, PrimaryButton } from '@/components/account/AccountUI';
import { ArrowDownToLine, ArrowUpFromLine, Clock3, Landmark, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function VaultPage() {
  const [mode, setMode] = useState<'deposit' | 'withdraw'>('deposit');
  const [amount, setAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (!amount) return;
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 2200);
  };

  return (
    <AppShell>
      <AccountPage title="Vault" description="Keep funds separate from your playable balance." icon={Landmark}>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="p-5 sm:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25203b] text-[#9c78ff]"><LockKeyhole size={19} /></div>
              <div><p className="text-[11px] text-[#717186]">Total vault balance</p><p className="mt-0.5 text-[22px] font-bold tabular-nums text-white">$0.00</p></div>
            </div>
            <div className="mt-5 flex items-center gap-2 border-t border-[#292934] pt-4 text-[11px] text-[#6f6f84]"><ShieldCheck size={15} className="text-[#37ce97]" />Protected by your account security settings</div>
          </Card>
          <Card className="p-5">
            <p className="text-[11px] text-[#717186]">Vault asset</p>
            <div className="mt-4 flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6478df] text-[11px] font-black">E</span><div><p className="text-[13px] font-bold text-white">Ethereum</p><p className="text-[11px] text-[#68687c]">ETH</p></div></div>
          </Card>
        </div>

        <Card className="mt-4 overflow-hidden">
          <div className="flex border-b border-[#292934]">
            <button onClick={() => { setMode('deposit'); setSubmitted(false); }} className={`relative flex h-13 flex-1 items-center justify-center gap-2 py-4 text-[13px] font-bold ${mode === 'deposit' ? 'text-white' : 'text-[#737388]'}`}><ArrowDownToLine size={16} />Deposit to Vault{mode === 'deposit' && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#7717ff]" />}</button>
            <button onClick={() => { setMode('withdraw'); setSubmitted(false); }} className={`relative flex h-13 flex-1 items-center justify-center gap-2 py-4 text-[13px] font-bold ${mode === 'withdraw' ? 'text-white' : 'text-[#737388]'}`}><ArrowUpFromLine size={16} />Withdraw from Vault{mode === 'withdraw' && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#7717ff]" />}</button>
          </div>
          <div className="mx-auto max-w-[520px] p-6 sm:p-8">
            <h2 className="text-[16px] font-bold text-white">{mode === 'deposit' ? 'Move funds into your Vault' : 'Move funds to your playable balance'}</h2>
            <p className="mt-1 text-[12px] leading-5 text-[#727287]">{mode === 'deposit' ? 'Vaulted funds cannot be used for wagers until withdrawn.' : 'Withdrawals from your Vault are returned to your main wallet instantly.'}</p>
            <label className="mb-2 mt-6 block text-[12px] font-semibold text-[#aaaabb]">Amount</label>
            <div className="flex h-12 items-center rounded-[9px] border border-[#30303d] bg-[#101016] px-4 focus-within:border-[#7041db]"><input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" placeholder="0.00000000" className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-[#505063]" /><button onClick={() => setAmount('0')} className="mr-3 text-[11px] font-bold text-[#9b75ff]">MAX</button><span className="text-[12px] font-bold text-[#89899d]">ETH</span></div>
            <p className="mt-2 text-right text-[11px] text-[#5f5f72]">Available 0.00000000 ETH</p>
            <PrimaryButton onClick={submit} disabled={!amount} className="mt-5 w-full">{mode === 'deposit' ? 'Deposit to Vault' : 'Withdraw from Vault'}</PrimaryButton>
            {submitted && <p className="mt-3 text-center text-[12px] text-[#35d49a]">Request submitted successfully.</p>}
          </div>
        </Card>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[{ icon: ShieldCheck, title: 'Extra protection', text: 'Keep long-term funds away from your playing balance.' }, { icon: Clock3, title: 'Instant transfers', text: 'Move funds between your balances at any time.' }, { icon: LockKeyhole, title: 'Account secured', text: 'All vault activity is protected by your security settings.' }].map(({ icon: Icon, title, text }) => <div key={title} className="rounded-[12px] border border-[#242430] bg-[#121219] p-4"><Icon size={18} className="text-[#9170ed]" /><h3 className="mt-3 text-[12px] font-bold text-white">{title}</h3><p className="mt-1 text-[11px] leading-4 text-[#68687d]">{text}</p></div>)}
        </div>
      </AccountPage>
    </AppShell>
  );
}
