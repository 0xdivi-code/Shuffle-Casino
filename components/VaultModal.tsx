"use client";

import { ArrowDownToLine, ArrowUpFromLine, Check, ChevronDown, LockKeyhole, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Direction = 'TransferIn' | 'TransferOut';

type VaultCurrency = {
  symbol: string;
  name: string;
  color: string;
  usd: number;
};

const vaultCurrencies: VaultCurrency[] = [
  { symbol: 'BTC', name: 'Bitcoin', color: '#f3a52b', usd: 67420 },
  { symbol: 'ETH', name: 'Ethereum', color: '#7187ef', usd: 3500 },
  { symbol: 'USDT', name: 'Tether', color: '#2eae8d', usd: 1 },
  { symbol: 'USDC', name: 'USD Coin', color: '#2775ca', usd: 1 },
  { symbol: 'SHFL', name: 'Shuffle', color: '#8150f0', usd: .3865 },
  { symbol: 'SOL', name: 'Solana', color: '#5e5ce6', usd: 155 },
  { symbol: 'LTC', name: 'Litecoin', color: '#8795a1', usd: 84 },
  { symbol: 'XRP', name: 'XRP', color: '#4e6474', usd: .58 },
  { symbol: 'TRX', name: 'TRON', color: '#ef3f47', usd: .13 },
  { symbol: 'DOGE', name: 'Dogecoin', color: '#c7a63b', usd: .14 },
  { symbol: 'MATIC', name: 'Polygon', color: '#8247e5', usd: .48 },
  { symbol: 'AVAX', name: 'Avalanche', color: '#e84142', usd: 28 },
  { symbol: 'BNB', name: 'BNB', color: '#f3ba2f', usd: 595 },
  { symbol: 'TON', name: 'Toncoin', color: '#3898ea', usd: 5.2 },
  { symbol: 'BONK', name: 'Bonk', color: '#f0a02f', usd: .00002 },
  { symbol: 'SHIB', name: 'Shiba Inu', color: '#ef6b31', usd: .000015 },
  { symbol: 'WIF', name: 'dogwifhat', color: '#a88265', usd: 1.72 },
  { symbol: 'PUMP', name: 'Pump.fun', color: '#47c966', usd: .004 },
  { symbol: 'TRUMP', name: 'Official Trump', color: '#d8bd7f', usd: 8.4 },
  { symbol: 'DAI', name: 'Dai', color: '#f5ac37', usd: 1 },
  { symbol: 'CASH', name: 'Shuffle Cash', color: '#42c38b', usd: 1 },
];

function TokenIcon({ currency }: { currency: VaultCurrency }) {
  if (currency.symbol === 'ETH') return <img src="/icons/crypto/eth.svg" alt="ETH" className="h-[18px] w-[18px] rounded-full" />;
  if (currency.symbol === 'SHFL') return <span style={{ background: currency.color }} className="flex h-[18px] w-[18px] items-center justify-center rounded-full"><img src="/icons/token-white.svg" alt="SHFL" className="h-3 w-3" /></span>;
  return <span style={{ background: currency.color }} className="flex h-[18px] w-[18px] items-center justify-center rounded-full text-[7px] font-black text-white">{currency.symbol.charAt(0)}</span>;
}

export default function VaultModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [direction, setDirection] = useState<Direction>('TransferIn');
  const [currency, setCurrency] = useState(vaultCurrencies[1]);
  const [amount, setAmount] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const numericAmount = Number(amount || 0);
  const usdAmount = Number.isFinite(numericAmount) ? numericAmount * currency.usd : 0;
  const transferIn = direction === 'TransferIn';

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!numericAmount) return;
    setFeedback(`${amount} ${currency.symbol} ${transferIn ? 'transferred to' : 'withdrawn from'} your Vault.`);
    setAmount('');
  };

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label="Vault">
      <button aria-label="Close Vault" onClick={onClose} className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-[3px]" />
      <div data-testid="modal-content-vault" className="relative w-full bg-[#14141b] shadow-[0_28px_90px_rgba(0,0,0,.75)] sm:max-w-[470px] sm:rounded-[16px] sm:border sm:border-[#2d2d39]">
        <button type="button" aria-label="Close modal" onClick={onClose} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#25252f] text-[#8d8da0] transition-colors hover:bg-[#33333f] hover:text-white"><X size={17} /></button>
        <form data-testid="vault-modal" noValidate onSubmit={submit} className="p-5 pt-7 sm:p-7">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#29203f] text-[#a47fff]"><LockKeyhole size={19} /></div>
            <div><h1 className="text-[20px] font-bold text-white">Vault</h1><p className="mt-0.5 text-[11px] text-[#6f6f83]">Securely separate funds from your playing balance.</p></div>
          </div>

          <div>
            <label className="mb-2 block text-[12px] font-semibold text-[#b5b5c4]">Direction*</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#9e7af7]">{transferIn ? <ArrowDownToLine size={17} /> : <ArrowUpFromLine size={17} />}</span>
              <select data-testid="direction" aria-label="Direction" value={direction} onChange={(event) => { setDirection(event.target.value as Direction); setFeedback(''); }} className="h-11 w-full appearance-none rounded-[9px] border border-[#343440] bg-[#1b1b23] pl-10 pr-10 text-[12px] font-semibold text-white outline-none hover:border-[#464656] focus:border-[#7450ce]"><option value="TransferIn">Transfer In</option><option value="TransferOut">Transfer Out</option></select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77778a]" />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-[12px] font-semibold text-[#b5b5c4]">Currency</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2"><TokenIcon currency={currency} /></span>
              <select data-testid="currency-select" aria-label="Currency" value={currency.symbol} onChange={(event) => { setCurrency(vaultCurrencies.find((item) => item.symbol === event.target.value) || vaultCurrencies[1]); setFeedback(''); }} className="h-11 w-full appearance-none rounded-[9px] border border-[#343440] bg-[#1b1b23] pl-10 pr-10 text-[12px] font-semibold text-white outline-none hover:border-[#464656] focus:border-[#7450ce]">{vaultCurrencies.map((item) => <option key={item.symbol} value={item.symbol}>{item.name} ({item.symbol}) · 0.00000000</option>)}</select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77778a]" />
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between"><label className="text-[12px] font-semibold text-[#b5b5c4]">Amount*</label><span className="text-[11px] tabular-nums text-[#757589]">{usdAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 })}</span></div>
            <div className="flex h-11 items-center rounded-[9px] border border-[#343440] bg-[#101016] px-3 focus-within:border-[#7450ce]"><TokenIcon currency={currency} /><input maxLength={20} type="number" min="0" step="any" value={amount} onChange={(event) => { setAmount(event.target.value); setFeedback(''); }} placeholder="Enter Value" className="min-w-0 flex-1 bg-transparent px-2.5 text-[13px] text-white outline-none placeholder:text-[#535365]" /><button type="button" onClick={() => setAmount('0')} className="text-[11px] font-bold text-[#a17cf8]">Max</button></div>
            <p className="mt-2 text-right text-[10px] text-[#5f5f73]">Available: 0.00000000 {currency.symbol}</p>
          </div>

          {feedback && <div role="status" className="mt-4 flex items-center gap-2 rounded-[9px] border border-[#285440] bg-[#183126] px-3 py-2.5 text-[11px] text-[#5bd6a6]"><Check size={14} />{feedback}</div>}

          <button type="submit" disabled={!numericAmount} value={transferIn ? 'Transfer to Vault' : 'Transfer from Vault'} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-[9px] bg-[#7717ff] text-[13px] font-bold text-white transition-colors hover:bg-[#8b3dff] disabled:cursor-not-allowed disabled:bg-[#30303b] disabled:text-[#686879]">{transferIn ? <ArrowDownToLine size={16} /> : <ArrowUpFromLine size={16} />}{transferIn ? 'Transfer to Vault' : 'Transfer from Vault'}</button>
        </form>
      </div>
    </div>
  );
}
