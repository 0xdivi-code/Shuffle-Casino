"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type TabId = 'LOBBY' | 'ORIGINALS' | 'SLOTS' | 'LIVE_CASINO' | 'TABLE_GAMES';

const tabs: { id: TabId; label: string; icon: string; alt: string; href: string }[] = [
  { id: 'LOBBY', label: 'Lobby', icon: '/icons/home.svg', alt: 'home', href: '/' },
  { id: 'ORIGINALS', label: 'Originals', icon: '/icons/original.svg', alt: 'ORIGINALS', href: '/originals' },
  { id: 'SLOTS', label: 'Slots', icon: '/icons/slots.svg', alt: 'SLOTS', href: '/slots' },
  { id: 'LIVE_CASINO', label: 'Live Casino', icon: '/icons/casino.svg', alt: 'LIVE_CASINO', href: '/live-casino' },
  { id: 'TABLE_GAMES', label: 'Table Games', icon: '/icons/table-games.svg', alt: 'TABLE_GAMES', href: '/table-games' },
];

export default function CategoryNav() {
  const [active, setActive] = useState<TabId>('LOBBY');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActive(tab.id);
    if (tab.href !== '/') {
      router.push(tab.href);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="Home_wrapper__dZQnM w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
      <div className="Tab_root__BVPOu flex-1 overflow-x-auto scrollbar-hide">
        <div className="Tab_tabsContainer__n_T8O flex items-center gap-1.5 p-1 bg-[#14141f] border border-[#1e1e2e] rounded-[12px] w-fit" role="tablist">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`Tab_tab__QsESc ${isActive ? 'Tab_active__d8K_Q bg-white text-black shadow-sm' : 'text-[#8b8ba7] hover:text-white hover:bg-[#1e1e2e]'} flex items-center gap-2 h-[36px] px-4 rounded-[8px] text-[13px] font-bold whitespace-nowrap transition-all`}
                data-testid={tab.id}
                id={tab.id}
                value={tab.id}
                disabled={tab.id === 'LOBBY' ? true : undefined}
                onClick={() => handleTabClick(tab)}
              >
                <span className="Tab_icon__64HgR w-4 h-4 flex items-center justify-center">
                  <img alt={tab.alt} width="16" height="16" src={tab.icon} className={`w-4 h-4 ${isActive ? 'brightness-0' : 'opacity-80'}`} />
                </span>
                <p className="Tab_text__y05gE">{tab.label}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="Home_homeTabSectionSearch__x4fei w-full lg:w-[320px] flex-shrink-0">
        <div className="TextInput_formControlWrapper__iBF1i w-full">
          <div className="InputWrapper_root__4rgbp relative w-full flex items-center bg-[#14141f] border border-[#1e1e2e] rounded-[10px] h-[40px] focus-within:border-[#2a2a3e] focus-within:bg-[#1a1a27] transition-colors">
            <span className="TextInput_inputPrefix__Gveih absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <img alt="search" src="/icons/search.svg" className="w-4 h-4 opacity-60" />
            </span>
            <input
              className="Input_root__lWEbp Input_hasPrefix__CSfXf Input_hasRightIcon__iWAyU w-full h-full bg-transparent pl-10 pr-[70px] text-[13px] text-white placeholder-[#5a5a7a] focus:outline-none"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span className="InputSuffix_root__oj7G6 absolute right-1 top-1/2 -translate-y-1/2 flex items-center">
              <span className="Home_searchHotkeyBadge__bjQiH">
                <button aria-label="Search" type="button" className="ButtonVariants_root__EFlHO ButtonVariants_buttonHeightXSmall__CLrw0 ButtonVariants_tertiary__LojiE h-[28px] px-2.5 bg-[#1e1e2e] border border-[#2a2a3e] rounded-[6px] text-[#8b8ba7] text-[11px] font-medium hover:bg-[#2a2a3e] hover:text-white transition-colors flex items-center justify-center">
                  <span className="ButtonVariants_buttonContent__mRPrs">⌘ K</span>
                </button>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
