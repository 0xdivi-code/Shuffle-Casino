"use client";

import AppShell from '@/components/AppShell';
import { AccountPage, Card, PrimaryButton } from '@/components/account/AccountUI';
import { ArrowDownToLine, ArrowUpFromLine, Check, Copy, CreditCard, ExternalLink, QrCode, WalletCards } from 'lucide-react';
import { useState } from 'react';

const assets = [
  { symbol: 'ETH', name: 'Ethereum', color: '#7187ff', balance: '0.00000000' },
  { symbol: 'BTC', name: 'Bitcoin', color: '#f6a722', balance: '0.00000000' },
  { symbol: 'USDT', name: 'Tether', color: '#2fb995', balance: '0.00000000' },
  { symbol: 'SHFL', name: 'Shuffle', color: '#8b5cf6', balance: '0.00000000' },
];

export default function WalletPage() {
  const [tab, setTab] = useState<'deposit' | 'withdraw' | 'buy'>('deposit');
  const [asset, setAsset] = useState(assets[0]);
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState('');
  const address = '0x7b4c...A18e';

  const copyAddress = async () => {
    try { await navigator.clipboard.writeText('0x7b4c07a013509F9D2f04055A60eeC3B5A891A18e'); } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <AppShell>
      <AccountPage title="Wallet" description="Deposit, withdraw and manage your crypto balances." icon={WalletCards}>
        <Card className="overflow-hidden">
          <div className="grid border-b border-[#292934] sm:grid-cols-3">
            {[
              { id: 'deposit', label: 'Deposit', icon: ArrowDownToLine },
              { id: 'withdraw', label: 'Withdraw', icon: ArrowUpFromLine },
              { id: 'buy', label: 'Buy crypto', icon: CreditCard },
            ].map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setTab(id as typeof tab)} className={`relative flex h-14 items-center justify-center gap-2 text-[13px] font-semibold transition-colors ${tab === id ? 'bg-[#1c1c26] text-white' : 'text-[#77778d] hover:bg-[#1a1a23] hover:text-white'}`}>
                <Icon size={16} />{label}
                {tab === id && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#7717ff]" />}
              </button>
            ))}
          </div>

          <div className="grid min-h-[490px] md:grid-cols-[245px_minmax(0,1fr)]">
            <div className="border-b border-[#292934] p-3 md:border-b-0 md:border-r">
              <p className="px-2 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[.12em] text-[#5f5f74]">Select currency</p>
              <div className="flex gap-2 overflow-x-auto md:block">
                {assets.map((item) => (
                  <button key={item.symbol} onClick={() => setAsset(item)} className={`flex min-w-[190px] items-center gap-3 rounded-[10px] p-3 text-left transition-colors md:mb-1 md:w-full md:min-w-0 ${asset.symbol === item.symbol ? 'bg-[#252532]' : 'hover:bg-[#1d1d27]'}`}>
                    <span style={{ background: item.color }} className="flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-black text-white">{item.symbol.slice(0, 1)}</span>
                    <span className="min-w-0 flex-1"><span className="block text-[12px] font-bold text-white">{item.symbol}</span><span className="block truncate text-[11px] text-[#69697e]">{item.name}</span></span>
                    <span className="text-[10px] tabular-nums text-[#77778b]">{item.balance}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 sm:p-7">
              {tab === 'deposit' && (
                <div className="mx-auto max-w-[460px]">
                  <h2 className="text-[17px] font-bold text-white">Deposit {asset.name}</h2>
                  <p className="mt-1 text-[12px] text-[#727287]">Send only {asset.symbol} using the {asset.name} network.</p>
                  <div className="mx-auto my-7 flex h-[152px] w-[152px] items-center justify-center rounded-[14px] border border-[#343441] bg-white text-[#13131a] shadow-[0_12px_35px_rgba(0,0,0,.3)]">
                    <QrCode size={120} strokeWidth={1.4} />
                  </div>
                  <label className="mb-2 block text-[12px] font-semibold text-[#aaaabb]">Your {asset.symbol} deposit address</label>
                  <button onClick={copyAddress} className="flex h-12 w-full items-center gap-3 rounded-[9px] border border-[#30303d] bg-[#101016] px-4 text-left transition-colors hover:border-[#48485b]">
                    <span className="min-w-0 flex-1 truncate font-mono text-[12px] text-[#bbbaca]">{address}</span>
                    {copied ? <Check size={17} className="text-[#35d49a]" /> : <Copy size={16} className="text-[#85859a]" />}
                  </button>
                  <div className="mt-5 rounded-[10px] border border-[#493d26] bg-[#292316] p-3 text-[11px] leading-5 text-[#c6a865]">A minimum deposit of 0.001 {asset.symbol} is required. Deposits are credited after network confirmation.</div>
                </div>
              )}

              {tab === 'withdraw' && (
                <div className="mx-auto max-w-[480px]">
                  <h2 className="text-[17px] font-bold text-white">Withdraw {asset.name}</h2>
                  <p className="mt-1 text-[12px] text-[#727287]">Available: {asset.balance} {asset.symbol}</p>
                  <div className="mt-7 space-y-5">
                    <div><label className="mb-2 block text-[12px] font-semibold text-[#aaaabb]">Wallet address</label><input placeholder={`Enter ${asset.symbol} address`} className="h-12 w-full rounded-[9px] border border-[#30303d] bg-[#101016] px-4 text-[13px] text-white outline-none placeholder:text-[#505063] focus:border-[#7041db]" /></div>
                    <div><label className="mb-2 block text-[12px] font-semibold text-[#aaaabb]">Amount</label><div className="flex h-12 items-center rounded-[9px] border border-[#30303d] bg-[#101016] px-4 focus-within:border-[#7041db]"><input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="decimal" placeholder="0.00" className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-[#505063]" /><button onClick={() => setAmount('0')} className="mr-3 text-[11px] font-bold text-[#9b75ff]">MAX</button><span className="text-[12px] font-bold text-[#89899d]">{asset.symbol}</span></div></div>
                    <div className="flex justify-between rounded-[9px] bg-[#101016] p-3 text-[11px] text-[#747489]"><span>Network fee</span><span>~ 0.0004 {asset.symbol}</span></div>
                    <PrimaryButton className="w-full" disabled={!amount}>Continue</PrimaryButton>
                  </div>
                </div>
              )}

              {tab === 'buy' && (
                <div className="mx-auto max-w-[500px] text-center">
                  <div className="mx-auto mt-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#28203d] text-[#a782ff]"><CreditCard size={27} /></div>
                  <h2 className="mt-5 text-[18px] font-bold text-white">Buy crypto instantly</h2>
                  <p className="mx-auto mt-2 max-w-[390px] text-[13px] leading-5 text-[#747489]">Use a card, bank transfer or local payment method through one of our trusted payment partners.</p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-2">
                    {['MoonPay', 'Transak'].map((provider) => <button key={provider} className="flex h-16 items-center justify-between rounded-[10px] border border-[#30303d] bg-[#1b1b24] px-4 text-[13px] font-bold text-white transition-colors hover:border-[#7041db]"><span>{provider}</span><ExternalLink size={15} className="text-[#79798f]" /></button>)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </AccountPage>
    </AppShell>
  );
}
