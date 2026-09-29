"use client";

import { Gift, TicketCheck, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function RedeemCodeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener('keydown', handleKey); };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!code.trim()) return;
    setMessage('This bonus code is invalid, expired or has already been redeemed.');
  };

  return (
    <div className="fixed inset-0 z-[210] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Redeem Code">
      <button aria-label="Close redeem modal" onClick={onClose} className="absolute inset-0 cursor-default bg-black/75 backdrop-blur-[3px]" />
      <div data-testid="modal-content-redeem" className="relative w-full max-w-[460px] rounded-[16px] border border-[#2e2e3a] bg-[#15151d] p-6 pt-8 text-center shadow-[0_28px_90px_rgba(0,0,0,.75)] sm:p-8">
        <button type="button" aria-label="Close modal" onClick={onClose} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#272731] text-[#8a8a9e] hover:bg-[#343440] hover:text-white"><X size={17} /></button>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#4a3474] bg-[#2a1e43] text-[#a681ff]"><TicketCheck size={28} /></div>
        <h3 className="mt-5 text-[20px] font-bold text-white">Redeem Code</h3>
        <p className="mx-auto mt-2 max-w-[320px] text-[12px] leading-5 text-[#747489]">Enter a bonus or promotion code to apply it to your account.</p>
        <form id="redeem-bonus-code-form" onSubmit={submit} className="mt-6">
          <input name="code" value={code} onChange={(event) => { setCode(event.target.value.toUpperCase()); setMessage(''); }} placeholder="Enter bonus code" autoComplete="off" className="h-12 w-full rounded-[9px] border border-[#343440] bg-[#101016] px-4 text-center font-mono text-[13px] font-bold tracking-[.08em] text-white outline-none placeholder:font-sans placeholder:font-normal placeholder:tracking-normal placeholder:text-[#555568] focus:border-[#7546d8]" />
          <button type="submit" disabled={!code.trim()} className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[9px] bg-[#7717ff] text-[13px] font-bold text-white hover:bg-[#8b3dff] disabled:cursor-not-allowed disabled:bg-[#30303b] disabled:text-[#686879]"><Gift size={15} />Redeem</button>
        </form>
        {message && <div role="alert" className="mt-4 rounded-[9px] border border-[#5a3138] bg-[#2e1a1e] px-3 py-2.5 text-[11px] text-[#d88791]">{message}</div>}
        <div className="mt-6 border-t border-[#292934] pt-5"><a href="/vip-program" onClick={onClose} className="text-[11px] font-semibold text-[#a17cf8] hover:text-[#b89dff]">Learn more about the Shuffle VIP program</a></div>
      </div>
    </div>
  );
}
