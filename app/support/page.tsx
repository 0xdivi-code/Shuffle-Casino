"use client";

import AppShell from '@/components/AppShell';
import { AccountPage, Card, PrimaryButton } from '@/components/account/AccountUI';
import { ChevronDown, CircleHelp, FileText, LifeBuoy, MessageCircle, Search, Send, ShieldCheck, WalletCards, X } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  { question: 'How long do crypto deposits take?', answer: 'Most deposits are credited after the required network confirmations. Timing varies by asset and current network activity.' },
  { question: 'Where can I find my VIP rewards?', answer: 'Open VIP from your profile menu. Available rewards appear in the Your Rewards section and can be claimed there.' },
  { question: 'How do I secure my account?', answer: 'Use a unique password and enable two-factor authentication from Settings under the Security tab.' },
  { question: 'Why is my withdrawal pending?', answer: 'Withdrawals may briefly remain pending while automated security checks are completed. You can track the status in Transactions.' },
];

export default function SupportPage() {
  const [query, setQuery] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const filtered = faqs.filter((item) => item.question.toLowerCase().includes(query.toLowerCase()));

  const send = (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim()) return;
    setMessage('');
    setSent(true);
  };

  return (
    <AppShell>
      <AccountPage title="Live Support" description="Find an answer or chat with our support team 24/7." icon={LifeBuoy}>
        <section className="rounded-[16px] border border-[#332657] bg-gradient-to-br from-[#25154b] via-[#1c182d] to-[#15151d] p-6 text-center sm:p-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#3b765f] bg-[#183529] px-3 py-1 text-[10px] font-bold text-[#62dbaa]"><span className="h-1.5 w-1.5 rounded-full bg-[#45d69e]" />Support online</span>
          <h2 className="mt-4 text-[22px] font-bold text-white">How can we help?</h2>
          <p className="mt-1 text-[12px] text-[#8a849a]">Search our help centre or start a conversation.</p>
          <label className="mx-auto mt-6 flex h-12 max-w-[560px] items-center gap-3 rounded-[10px] border border-[#403457] bg-[#111118]/80 px-4 focus-within:border-[#7950d9]"><Search size={17} className="text-[#756b86]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for help" className="min-w-0 flex-1 bg-transparent text-[13px] text-white outline-none placeholder:text-[#625c70]" /></label>
        </section>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {[{ icon: WalletCards, title: 'Payments', text: 'Deposits, withdrawals and balances' }, { icon: ShieldCheck, title: 'Account & security', text: 'Login, verification and safety' }, { icon: FileText, title: 'Games & rewards', text: 'VIP, bonuses and promotions' }].map(({ icon: Icon, title, text }) => <button key={title} className="rounded-[12px] border border-[#292936] bg-[#15151d] p-5 text-left transition-colors hover:border-[#4c396f] hover:bg-[#1b1924]"><Icon size={19} className="text-[#9c79f2]" /><h3 className="mt-4 text-[12px] font-bold text-white">{title}</h3><p className="mt-1 text-[11px] text-[#6b6b80]">{text}</p></button>)}
        </div>

        <Card className="mt-4 overflow-hidden">
          <div className="border-b border-[#292934] px-5 py-4"><h2 className="text-[14px] font-bold text-white">Frequently asked questions</h2></div>
          <div className="divide-y divide-[#292934]">
            {filtered.length ? filtered.map((item, index) => <div key={item.question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center gap-3 px-5 py-4 text-left text-[12px] font-semibold text-[#c6c6d2] hover:bg-[#1a1a23]"><CircleHelp size={16} className="text-[#8667d3]" /><span className="flex-1">{item.question}</span><ChevronDown size={15} className={`text-[#6b6b7f] transition-transform ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="px-5 pb-5 pl-[48px] text-[11px] leading-5 text-[#747489]">{item.answer}</p>}</div>) : <div className="p-8 text-center text-[12px] text-[#6f6f84]">No articles match “{query}”.</div>}
          </div>
        </Card>

        <Card className="mt-4 flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"><div className="flex items-center gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#29203f] text-[#a17bff]"><MessageCircle size={20} /></div><div><h3 className="text-[13px] font-bold text-white">Still need help?</h3><p className="mt-1 text-[11px] text-[#6d6d82]">Our team typically replies in a few minutes.</p></div></div><PrimaryButton onClick={() => setChatOpen(true)}><MessageCircle size={15} />Start live chat</PrimaryButton></Card>

        {chatOpen && (
          <div className="fixed inset-0 z-[150] flex items-end justify-end bg-black/45 p-3 backdrop-blur-sm sm:p-6" onMouseDown={(e) => { if (e.target === e.currentTarget) setChatOpen(false); }}>
            <div className="flex h-[520px] max-h-[calc(100dvh-24px)] w-full max-w-[380px] flex-col overflow-hidden rounded-[16px] border border-[#343442] bg-[#15151d] shadow-[0_24px_80px_rgba(0,0,0,.6)]">
              <div className="flex items-center gap-3 border-b border-[#292934] bg-[#1b1826] p-4"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#762dde] text-white"><LifeBuoy size={17} /></div><div className="flex-1"><p className="text-[12px] font-bold text-white">Shuffle Support</p><p className="flex items-center gap-1.5 text-[10px] text-[#54d7a4]"><span className="h-1.5 w-1.5 rounded-full bg-[#54d7a4]" />Online</p></div><button onClick={() => setChatOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full text-[#7d7d91] hover:bg-[#292934] hover:text-white"><X size={17} /></button></div>
              <div className="flex-1 overflow-y-auto p-4"><div className="max-w-[85%] rounded-[12px_12px_12px_3px] bg-[#272733] p-3 text-[11px] leading-5 text-[#c0c0cc]">Hi! Welcome to Shuffle Support. How can we help you today?</div>{sent && <div className="ml-auto mt-3 max-w-[85%] rounded-[12px_12px_3px_12px] bg-[#7026d9] p-3 text-[11px] leading-5 text-white">Thanks — I need help with my account.</div>}</div>
              <form onSubmit={send} className="flex gap-2 border-t border-[#292934] p-3"><input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." className="h-10 min-w-0 flex-1 rounded-[9px] border border-[#30303d] bg-[#101016] px-3 text-[12px] text-white outline-none focus:border-[#7140dc]" /><button disabled={!message.trim()} className="flex h-10 w-10 items-center justify-center rounded-[9px] bg-[#7717ff] text-white disabled:bg-[#30303c] disabled:text-[#68687b]"><Send size={16} /></button></form>
            </div>
          </div>
        )}
      </AccountPage>
    </AppShell>
  );
}
