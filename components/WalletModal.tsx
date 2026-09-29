"use client";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Check,
  ChevronDown,
  Copy,
  CreditCard,
  ExternalLink,
  Gift,
  Info,
  RefreshCw,
  Send,
  WalletCards,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type WalletTab = 'deposit' | 'withdraw' | 'buy' | 'tip';

type Currency = {
  symbol: string;
  name: string;
  color: string;
  networks: { value: string; short: string; label: string }[];
};

const currencies: Currency[] = [
  { symbol: 'BTC', name: 'Bitcoin', color: '#f3a52b', networks: [{ value: 'BITCOIN', short: 'Bitcoin', label: 'Bitcoin' }] },
  { symbol: 'ETH', name: 'Ethereum', color: '#7187ef', networks: [{ value: 'ETHEREUM', short: 'ERC20', label: 'Ethereum (ERC20)' }, { value: 'BINANCE_SMART_CHAIN', short: 'BEP20', label: 'BNB Smart Chain (BEP20)' }, { value: 'BASE', short: 'BASE', label: 'Base (BASE)' }, { value: 'RHC', short: 'RHC', label: 'Robinhood Chain (RHC)' }] },
  { symbol: 'USDT', name: 'Tether', color: '#2eae8d', networks: [{ value: 'ETHEREUM', short: 'ERC20', label: 'Ethereum (ERC20)' }, { value: 'TRON', short: 'TRC20', label: 'Tron (TRC20)' }, { value: 'BINANCE_SMART_CHAIN', short: 'BEP20', label: 'BNB Smart Chain (BEP20)' }, { value: 'SOLANA', short: 'SOL', label: 'Solana' }] },
  { symbol: 'USDC', name: 'USD Coin', color: '#2775ca', networks: [{ value: 'ETHEREUM', short: 'ERC20', label: 'Ethereum (ERC20)' }, { value: 'BASE', short: 'BASE', label: 'Base (BASE)' }, { value: 'SOLANA', short: 'SOL', label: 'Solana' }] },
  { symbol: 'SHFL', name: 'Shuffle', color: '#8150f0', networks: [{ value: 'ETHEREUM', short: 'ERC20', label: 'Ethereum (ERC20)' }] },
  { symbol: 'SOL', name: 'Solana', color: '#5e5ce6', networks: [{ value: 'SOLANA', short: 'SOL', label: 'Solana' }] },
  { symbol: 'LTC', name: 'Litecoin', color: '#8795a1', networks: [{ value: 'LITECOIN', short: 'LTC', label: 'Litecoin' }] },
  { symbol: 'XRP', name: 'XRP', color: '#4e6474', networks: [{ value: 'XRP', short: 'XRP', label: 'XRP Ledger' }] },
  { symbol: 'TRX', name: 'TRON', color: '#ef3f47', networks: [{ value: 'TRON', short: 'TRC20', label: 'Tron (TRC20)' }] },
  { symbol: 'DOGE', name: 'Dogecoin', color: '#c7a63b', networks: [{ value: 'DOGECOIN', short: 'DOGE', label: 'Dogecoin' }] },
  { symbol: 'MATIC', name: 'Polygon', color: '#8247e5', networks: [{ value: 'POLYGON', short: 'POLYGON', label: 'Polygon' }] },
  { symbol: 'AVAX', name: 'Avalanche', color: '#e84142', networks: [{ value: 'AVALANCHE', short: 'C-CHAIN', label: 'Avalanche C-Chain' }] },
  { symbol: 'BNB', name: 'BNB', color: '#f3ba2f', networks: [{ value: 'BINANCE_SMART_CHAIN', short: 'BEP20', label: 'BNB Smart Chain (BEP20)' }] },
  { symbol: 'TON', name: 'Toncoin', color: '#3898ea', networks: [{ value: 'TON', short: 'TON', label: 'The Open Network' }] },
  { symbol: 'BONK', name: 'Bonk', color: '#f0a02f', networks: [{ value: 'SOLANA', short: 'SOL', label: 'Solana' }] },
  { symbol: 'SHIB', name: 'Shiba Inu', color: '#ef6b31', networks: [{ value: 'ETHEREUM', short: 'ERC20', label: 'Ethereum (ERC20)' }] },
  { symbol: 'WIF', name: 'dogwifhat', color: '#a88265', networks: [{ value: 'SOLANA', short: 'SOL', label: 'Solana' }] },
  { symbol: 'PUMP', name: 'Pump.fun', color: '#47c966', networks: [{ value: 'SOLANA', short: 'SOL', label: 'Solana' }] },
  { symbol: 'TRUMP', name: 'Official Trump', color: '#d8bd7f', networks: [{ value: 'SOLANA', short: 'SOL', label: 'Solana' }] },
  { symbol: 'DAI', name: 'Dai', color: '#f5ac37', networks: [{ value: 'ETHEREUM', short: 'ERC20', label: 'Ethereum (ERC20)' }] },
  { symbol: 'CASH', name: 'Shuffle Cash', color: '#42c38b', networks: [{ value: 'INTERNAL', short: 'CASH', label: 'Shuffle' }] },
];

const tabItems: { id: WalletTab; label: string; icon: typeof ArrowDownToLine }[] = [
  { id: 'deposit', label: 'Deposit', icon: ArrowDownToLine },
  { id: 'withdraw', label: 'Withdraw', icon: ArrowUpFromLine },
  { id: 'buy', label: 'Buy Crypto', icon: CreditCard },
  { id: 'tip', label: 'Tip', icon: Gift },
];

const addresses: Record<string, string> = {
  BTC: 'bc1q8gzct7s2v0u3ne4f3m8ndt8g56h2l0nk2x6k9p',
  SOL: 'F28QRJny7LQtHmpE5FhQ4BVkrP5A1zUD8eRxQkJ2p3Es',
  XRP: 'rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh',
  LTC: 'ltc1qg82mrfu28jyc9j8kq8s9y3nezu2u6fx8qv9rdk',
  TRX: 'THji3QvKf8Cz19pRyeRTrPoxG62GDNmQyc',
};

function TokenIcon({ currency, size = 24 }: { currency: Currency; size?: number }) {
  if (currency.symbol === 'ETH') return <img src="/icons/crypto/eth.svg" alt="ETH" style={{ width: size, height: size }} className="rounded-full" />;
  if (currency.symbol === 'SHFL') return <span style={{ width: size, height: size, background: currency.color }} className="flex items-center justify-center rounded-full"><img src="/icons/token-white.svg" alt="SHFL" className="h-[65%] w-[65%]" /></span>;
  return <span style={{ width: size, height: size, background: currency.color, fontSize: Math.max(8, size * .32) }} className="flex items-center justify-center rounded-full font-black text-white">{currency.symbol.slice(0, 1)}</span>;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-[12px] font-semibold text-[#b5b5c4]">{children}</label>;
}

function CurrencySelect({ value, onChange }: { value: Currency; onChange: (currency: Currency) => void }) {
  return (
    <div>
      <FieldLabel>Currency</FieldLabel>
      <div className="relative">
        <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2"><TokenIcon currency={value} size={19} /></div>
        <select aria-label="Currency" value={value.symbol} onChange={(event) => onChange(currencies.find((currency) => currency.symbol === event.target.value) || currencies[1])} className="h-11 w-full appearance-none rounded-[9px] border border-[#343440] bg-[#1b1b23] pl-10 pr-10 text-[12px] font-semibold text-white outline-none transition-colors hover:border-[#444453] focus:border-[#7450ce]">
          {currencies.map((currency) => <option key={currency.symbol} value={currency.symbol}>{currency.name} ({currency.symbol}) · 0.00000000</option>)}
        </select>
        <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77778a]" />
      </div>
    </div>
  );
}

function NetworkSelect({ currency, value, onChange }: { currency: Currency; value: string; onChange: (value: string) => void }) {
  return (
    <div>
      <FieldLabel>Network*</FieldLabel>
      <div className="relative">
        <select aria-label="Network" value={value} onChange={(event) => onChange(event.target.value)} className="h-11 w-full appearance-none rounded-[9px] border border-[#343440] bg-[#1b1b23] px-3 pr-9 text-[12px] font-semibold text-white outline-none transition-colors hover:border-[#444453] focus:border-[#7450ce]">
          {currency.networks.map((network) => <option key={network.value} value={network.value}>{network.short}</option>)}
        </select>
        <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#77778a]" />
      </div>
    </div>
  );
}

function QrCode({ value }: { value: string }) {
  const cells = useMemo(() => {
    let seed = 0;
    for (let i = 0; i < value.length; i += 1) seed = (seed * 31 + value.charCodeAt(i)) >>> 0;
    const isFinder = (x: number, y: number, ox: number, oy: number) => {
      const dx = x - ox;
      const dy = y - oy;
      if (dx < 0 || dx > 6 || dy < 0 || dy > 6) return null;
      return dx === 0 || dx === 6 || dy === 0 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
    };
    const output: { x: number; y: number }[] = [];
    for (let y = 0; y < 29; y += 1) {
      for (let x = 0; x < 29; x += 1) {
        const finder = isFinder(x, y, 0, 0) ?? isFinder(x, y, 22, 0) ?? isFinder(x, y, 0, 22);
        const timing = (y === 6 && x > 7 && x < 21) || (x === 6 && y > 7 && y < 21) ? (x + y) % 2 === 0 : null;
        const random = (((x * 73 + y * 151 + seed + ((x * y) << 2)) >>> ((x + y) % 9)) & 1) === 1;
        if ((finder === null ? (timing === null ? random : timing) : finder)) output.push({ x, y });
      }
    }
    return output;
  }, [value]);

  return (
    <svg viewBox="0 0 29 29" aria-label={`QR code for ${value}`} className="h-[158px] w-[158px] rounded-[9px] bg-[#121418] p-2.5 shadow-[0_12px_32px_rgba(0,0,0,.3)]">
      {cells.map((cell) => <rect key={`${cell.x}-${cell.y}`} x={cell.x} y={cell.y} width="1" height="1" fill="#fff" />)}
    </svg>
  );
}

function ActionButton({ children, disabled = false, onClick, type = 'button' }: { children: React.ReactNode; disabled?: boolean; onClick?: () => void; type?: 'button' | 'submit' }) {
  return <button type={type} onClick={onClick} disabled={disabled} className="flex h-11 w-full items-center justify-center gap-2 rounded-[9px] bg-[#7717ff] text-[13px] font-bold text-white transition-colors hover:bg-[#8c3dff] disabled:cursor-not-allowed disabled:bg-[#30303b] disabled:text-[#686879]">{children}</button>;
}

function Notice({ children, danger = false }: { children: React.ReactNode; danger?: boolean }) {
  return <div className={`flex items-start gap-2.5 rounded-[9px] border px-3 py-2.5 text-[11px] leading-[1.5] ${danger ? 'border-[#563037] bg-[#2b191d] text-[#c68a91]' : 'border-[#4d4127] bg-[#292316] text-[#bca56c]'}`}><Info size={15} className="mt-0.5 flex-none" />{children}</div>;
}

export default function WalletModal({ isOpen, onClose, initialTab = 'deposit' }: { isOpen: boolean; onClose: () => void; initialTab?: WalletTab }) {
  const [tab, setTab] = useState<WalletTab>(initialTab);
  const [currency, setCurrency] = useState(currencies[1]);
  const [network, setNetwork] = useState(currencies[1].networks[0].value);
  const [address, setAddress] = useState('0x3f9Ac00a4bb7ecF69906eD61d8D97Ec5012De6a8');
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [note, setNote] = useState('');
  const [fiat, setFiat] = useState('100');
  const [provider, setProvider] = useState('MoonPay');
  const [feedback, setFeedback] = useState('');

  const currentNetwork = currency.networks.find((item) => item.value === network) || currency.networks[0];

  useEffect(() => {
    if (!isOpen) return;
    setTab(initialTab);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, initialTab, onClose]);

  const changeCurrency = (next: Currency) => {
    setCurrency(next);
    setNetwork(next.networks[0].value);
    setAddress(addresses[next.symbol] || `0x${next.symbol.toLowerCase()}3f9Ac00a4bb7ecF69906eD61d8D97Ec5012De6a8`);
    setFeedback('');
  };

  const regenerate = () => {
    const bytes = new Uint8Array(20);
    if (typeof crypto !== 'undefined') crypto.getRandomValues(bytes);
    const generated = `0x${Array.from(bytes).map((value) => value.toString(16).padStart(2, '0')).join('')}`;
    setAddress(generated);
    setFeedback('New deposit address generated.');
  };

  const copyAddress = async () => {
    try { await navigator.clipboard.writeText(address); } catch {}
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  const submit = (message: string) => {
    setFeedback(message);
    window.setTimeout(() => setFeedback(''), 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 sm:p-4" role="dialog" aria-modal="true" aria-label="Wallet">
      <button aria-label="Close wallet" className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-[3px]" onClick={onClose} />
      <div data-testid="modal-content-wallet" className="relative flex h-[100dvh] w-full max-w-[560px] flex-col overflow-hidden bg-[#121218] shadow-[0_28px_90px_rgba(0,0,0,.75)] sm:h-auto sm:max-h-[min(760px,calc(100dvh-32px))] sm:rounded-[16px] sm:border sm:border-[#2c2c38]">
        <button type="button" aria-label="Close modal" onClick={onClose} id="close-modal" className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-[#262630] text-[#9292a5] transition-colors hover:bg-[#343440] hover:text-white"><X size={17} /></button>

        <div className="border-b border-[#292934] bg-[#15151c] px-4 pb-0 pt-14 sm:px-5 sm:pt-5">
          <div className="grid grid-cols-4 rounded-[10px] border border-[#30303d] bg-[#101016] p-1">
            {tabItems.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" id={id} data-testid={id} disabled={tab === id} onClick={() => { setTab(id); setFeedback(''); }} className={`flex h-9 min-w-0 items-center justify-center gap-1.5 rounded-[7px] px-1 text-[10px] font-bold transition-colors sm:text-[12px] ${tab === id ? 'bg-[#2a2a35] text-white shadow-sm' : 'text-[#747489] hover:bg-[#1d1d26] hover:text-white'}`}>
                <Icon size={13} className="hidden sm:block" /> <span className="truncate">{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-5 scrollbar-thin sm:p-6">
          {tab === 'deposit' && (
            <div>
              <div className="grid grid-cols-2 gap-3"><CurrencySelect value={currency} onChange={changeCurrency} /><NetworkSelect currency={currency} value={network} onChange={(value) => { setNetwork(value); setFeedback(''); }} /></div>

              <div className="mt-5">
                <FieldLabel>{currentNetwork.label} Address</FieldLabel>
                <div className="flex min-h-11 items-center rounded-[9px] border border-[#343440] bg-[#101016] p-1 pl-3 focus-within:border-[#7450ce]">
                  <input value={address} readOnly data-testid="deposit-address" className="min-w-0 flex-1 truncate bg-transparent font-mono text-[11px] text-white outline-none sm:text-[12px]" />
                  <button type="button" aria-label="Generate new address" onClick={regenerate} className="ml-2 flex h-8 w-8 flex-none items-center justify-center rounded-[7px] bg-[#252530] text-[#858599] hover:text-white"><RefreshCw size={14} /></button>
                  <button type="button" aria-label="Copy address" onClick={copyAddress} className="ml-1 flex h-8 w-8 flex-none items-center justify-center rounded-[7px] bg-[#252530] text-[#858599] hover:text-white">{copied ? <Check size={14} className="text-[#42d49f]" /> : <Copy size={14} />}</button>
                </div>
              </div>

              <div className="mt-3"><Notice>Your deposit must be sent on the {currentNetwork.label} network to be processed.</Notice></div>
              <div className="my-5 flex justify-center"><QrCode value={address} /></div>
              <div className="text-center"><a href="/transactions?type=deposits" onClick={onClose} className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#9f7bf4] hover:text-[#b69aff]">Deposit history <ExternalLink size={11} /></a></div>
            </div>
          )}

          {tab === 'withdraw' && (
            <form onSubmit={(event) => { event.preventDefault(); submit('Withdrawal request submitted for review.'); }}>
              <div className="grid grid-cols-2 gap-3"><CurrencySelect value={currency} onChange={changeCurrency} /><NetworkSelect currency={currency} value={network} onChange={setNetwork} /></div>
              <div className="mt-5"><FieldLabel>Recipient {currentNetwork.label} address</FieldLabel><input required placeholder={`Enter ${currency.symbol} address`} className="h-11 w-full rounded-[9px] border border-[#343440] bg-[#101016] px-3 text-[12px] text-white outline-none placeholder:text-[#515163] focus:border-[#7450ce]" /></div>
              <div className="mt-4"><FieldLabel>Amount</FieldLabel><div className="flex h-11 items-center rounded-[9px] border border-[#343440] bg-[#101016] px-3 focus-within:border-[#7450ce]"><input required value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" placeholder="0.00000000" className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-[#515163]" /><button type="button" onClick={() => setAmount('0.00000000')} className="mr-3 text-[10px] font-black text-[#9e78f7]">MAX</button><span className="text-[11px] font-bold text-[#8c8c9f]">{currency.symbol}</span></div><div className="mt-2 flex justify-between text-[10px] text-[#606075]"><span>Available 0.00000000 {currency.symbol}</span><span>Min. 0.001</span></div></div>
              <div className="my-4 rounded-[9px] bg-[#191920] px-3 py-3 text-[11px]"><div className="flex justify-between text-[#77778b]"><span>Network fee</span><span>~0.0004 {currency.symbol}</span></div><div className="mt-2 flex justify-between border-t border-[#292933] pt-2 font-semibold text-[#aaaabc]"><span>You will receive</span><span>0.00000000 {currency.symbol}</span></div></div>
              <Notice danger>Crypto withdrawals are irreversible. Confirm the network and recipient address before continuing.</Notice>
              <div className="mt-4"><ActionButton type="submit" disabled={!amount}><ArrowUpFromLine size={15} />Withdraw {currency.symbol}</ActionButton></div>
              <a href="/transactions?type=withdrawals" onClick={onClose} className="mx-auto mt-4 flex w-fit items-center gap-1 text-[11px] font-semibold text-[#9f7bf4]">Withdrawal history <ExternalLink size={11} /></a>
            </form>
          )}

          {tab === 'buy' && (
            <form onSubmit={(event) => { event.preventDefault(); submit(`Opening ${provider} checkout…`); }}>
              <div className="text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#29203f] text-[#a680ff]"><CreditCard size={21} /></div><h2 className="mt-3 text-[16px] font-bold text-white">Buy crypto</h2><p className="mt-1 text-[11px] text-[#707084]">Purchase securely through a payment partner.</p></div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div><FieldLabel>You pay</FieldLabel><div className="flex h-11 items-center rounded-[9px] border border-[#343440] bg-[#101016] px-3"><input value={fiat} onChange={(event) => setFiat(event.target.value)} inputMode="decimal" className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none" /><select aria-label="Fiat currency" className="bg-transparent text-[11px] font-bold text-[#9393a6] outline-none"><option>USD</option><option>EUR</option><option>GBP</option><option>NGN</option></select></div></div>
                <CurrencySelect value={currency} onChange={changeCurrency} />
              </div>
              <div className="mt-4"><FieldLabel>You receive approximately</FieldLabel><div className="flex h-11 items-center rounded-[9px] border border-[#2e2e39] bg-[#191920] px-3"><span className="flex-1 text-[13px] text-[#a8a8b9]">{fiat ? (Number(fiat || 0) / (currency.symbol === 'ETH' ? 3500 : 1)).toFixed(6) : '0.00'}</span><span className="text-[11px] font-bold text-[#87879a]">{currency.symbol}</span></div></div>
              <FieldLabel><span className="mt-5 block">Choose provider</span></FieldLabel>
              <div className="grid grid-cols-2 gap-3">{['MoonPay', 'Transak'].map((item) => <button key={item} type="button" onClick={() => setProvider(item)} className={`flex h-14 items-center justify-between rounded-[9px] border px-4 text-[12px] font-bold transition-colors ${provider === item ? 'border-[#7445d5] bg-[#261e3a] text-white' : 'border-[#343440] bg-[#191920] text-[#9a9aac]'}`}><span>{item}</span>{provider === item ? <Check size={15} className="text-[#a984ff]" /> : <ExternalLink size={13} />}</button>)}</div>
              <div className="mt-5"><ActionButton type="submit" disabled={!fiat}><CreditCard size={15} />Continue with {provider}</ActionButton></div>
              <p className="mt-3 text-center text-[10px] leading-4 text-[#57576a]">Rates and payment availability are determined by the selected third-party provider.</p>
            </form>
          )}

          {tab === 'tip' && (
            <form onSubmit={(event) => { event.preventDefault(); submit(`Tip prepared for @${recipient}.`); }}>
              <div className="text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#29203f] text-[#a680ff]"><Send size={20} /></div><h2 className="mt-3 text-[16px] font-bold text-white">Send a tip</h2><p className="mt-1 text-[11px] text-[#707084]">Instantly send crypto to another Shuffle player.</p></div>
              <div className="mt-5"><FieldLabel>Recipient username</FieldLabel><div className="flex h-11 items-center rounded-[9px] border border-[#343440] bg-[#101016] px-3 focus-within:border-[#7450ce]"><span className="text-[13px] text-[#68687c]">@</span><input required value={recipient} onChange={(event) => setRecipient(event.target.value.replace(/^@/, ''))} placeholder="username" className="min-w-0 flex-1 bg-transparent px-1 text-[12px] text-white outline-none placeholder:text-[#515163]" /></div></div>
              <div className="mt-4 grid grid-cols-[1fr_150px] gap-3"><div><FieldLabel>Amount</FieldLabel><input required value={amount} onChange={(event) => setAmount(event.target.value)} inputMode="decimal" placeholder="0.00000000" className="h-11 w-full rounded-[9px] border border-[#343440] bg-[#101016] px-3 text-[12px] text-white outline-none placeholder:text-[#515163] focus:border-[#7450ce]" /></div><CurrencySelect value={currency} onChange={changeCurrency} /></div>
              <div className="mt-4"><FieldLabel>Note <span className="font-normal text-[#5f5f72]">(optional)</span></FieldLabel><textarea value={note} onChange={(event) => setNote(event.target.value.slice(0, 120))} placeholder="Add a message" rows={3} className="w-full resize-none rounded-[9px] border border-[#343440] bg-[#101016] p-3 text-[12px] text-white outline-none placeholder:text-[#515163] focus:border-[#7450ce]" /><p className="mt-1 text-right text-[9px] text-[#57576a]">{note.length}/120</p></div>
              <Notice>Tips are transferred instantly and cannot be cancelled once sent.</Notice>
              <div className="mt-4"><ActionButton type="submit" disabled={!recipient || !amount}><Send size={15} />Review tip</ActionButton></div>
            </form>
          )}

          {feedback && <div role="status" className="mt-4 flex items-center justify-center gap-2 rounded-[9px] border border-[#285440] bg-[#183126] px-3 py-2.5 text-[11px] text-[#5bd6a6]"><Check size={14} />{feedback}</div>}
        </div>
      </div>
    </div>
  );
}
