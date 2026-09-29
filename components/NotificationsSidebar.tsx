"use client";

import { CheckCircle2, Filter, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type NotificationFilter = 'ALL' | 'PROMOTIONAL' | 'TRANSACTIONAL';

export default function NotificationsSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [filter, setFilter] = useState<NotificationFilter>('ALL');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <>
      <button aria-label="Close notifications" onClick={onClose} className={`fixed inset-0 z-[170] bg-black/55 backdrop-blur-[2px] transition-opacity ${isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`} />
      <aside aria-label="Notifications" aria-hidden={!isOpen} className={`fixed bottom-0 right-0 top-0 z-[180] flex w-full max-w-[390px] flex-col border-l border-[#2a2a35] bg-[#13131a] shadow-[-20px_0_60px_rgba(0,0,0,.55)] transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <header className="flex min-h-[66px] items-center gap-3 border-b border-[#292934] px-4 sm:px-5">
          <h2 className="flex-1 text-[17px] font-bold text-white">Notifications</h2>
          <button type="button" disabled aria-label="Mark all as read" className="flex h-9 w-9 items-center justify-center rounded-[9px] border border-[#30303d] bg-[#1c1c25] text-[#555568] disabled:cursor-not-allowed"><CheckCircle2 size={16} /></button>
          <div className="relative">
            <button type="button" aria-label="Filter notifications" aria-expanded={filterOpen} onClick={() => setFilterOpen(!filterOpen)} className={`flex h-9 w-9 items-center justify-center rounded-[9px] border transition-colors ${filterOpen || filter !== 'ALL' ? 'border-[#6f43ca] bg-[#281f3d] text-[#a780ff]' : 'border-[#30303d] bg-[#1c1c25] text-[#9292a5] hover:text-white'}`}><Filter size={16} /></button>
            {filterOpen && <div className="absolute right-0 top-11 z-10 w-[190px] overflow-hidden rounded-[10px] border border-[#30303d] bg-[#1b1b24] p-1 shadow-2xl">{[{ id: 'ALL', label: 'All notifications' }, { id: 'PROMOTIONAL', label: 'From Shuffle' }, { id: 'TRANSACTIONAL', label: 'Transactions' }].map((item) => <button key={item.id} onClick={() => { setFilter(item.id as NotificationFilter); setFilterOpen(false); }} className={`flex h-9 w-full items-center rounded-[7px] px-3 text-left text-[11px] font-semibold ${filter === item.id ? 'bg-[#2a223c] text-[#aa86ff]' : 'text-[#8a8a9e] hover:bg-[#24242e] hover:text-white'}`}>{item.label}</button>)}</div>}
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-[9px] text-[#88889b] hover:bg-[#24242e] hover:text-white"><X size={18} /></button>
        </header>
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
            <img alt="notification empty state icon" src="https://shuffle.com/icons/notification-gold.svg" onError={(event) => { const target = event.currentTarget; if (!target.dataset.fallback) { target.dataset.fallback = 'true'; target.src = '/icons/notification-gold.svg'; } }} className="h-[90px] w-[90px]" />
            <h3 className="mt-4 text-[16px] font-bold text-white">No notifications</h3>
            <p className="mt-1.5 text-[12px] text-[#737388]">There are no notifications to display</p>
            {filter !== 'ALL' && <button onClick={() => setFilter('ALL')} className="mt-5 text-[11px] font-bold text-[#a17cf8]">Show all notifications</button>}
          </div>
        </div>
      </aside>
    </>
  );
}
