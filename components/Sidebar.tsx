"use client";
import { useState } from 'react';
import { Menu, Search } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed?: boolean;
}

export default function Sidebar({ isOpen, onClose, collapsed = false }: SidebarProps) {
  const isCollapsed = collapsed;
  const [showPromotions, setShowPromotions] = useState(false);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 lg:z-0
        ${isCollapsed ? 'w-[64px] lg:w-[64px]' : 'w-[300px] lg:w-[240px]'} 
        h-[100dvh] lg:h-[calc(100vh-64px)] lg:top-[64px]
        bg-[#0e0e15] border-r border-[#1e1e2e]/60
        overflow-y-auto overflow-x-hidden
        transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        scrollbar-thin
      `}>
        <div className="flex flex-col pb-24 lg:pb-6">
          {/* Search - top of sidebar as in screenshot */}
          {!isCollapsed ? (
            <div className="p-3 border-b border-[#1e1e2e]/60">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5a5a7a] w-[18px] h-[18px]" />
                <input
                  placeholder="Search"
                  className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-[10px] pl-10 pr-3 h-[44px] text-[14px] text-white placeholder-[#5a5a7a] focus:outline-none focus:border-[#2a2a3e] focus:bg-[#14141f] transition-colors"
                />
              </div>
            </div>
          ) : (
            <div className="p-2 border-b border-[#1e1e2e]/60 flex justify-center">
              <button className="w-9 h-9 bg-[#0a0a0f] border border-[#1e1e2e] rounded-[10px] flex items-center justify-center text-[#5a5a7a]">
                <Search size={16} />
              </button>
            </div>
          )}

          {/* SHFL Token - exact as screenshot */}
          {isCollapsed ? (
            <div className="p-2 border-b border-[#1e1e2e]/60 flex justify-center">
              <div className="w-10 h-10 rounded-full bg-[#1e1e2e] border border-[#2a2a3e] flex items-center justify-center overflow-hidden">
                <img src="https://shuffle.com/icons/token.svg" alt="SHFL" className="w-7 h-7" />
              </div>
            </div>
          ) : (
            <div className="p-3 border-b border-[#1e1e2e]/60">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#1e1e2e] border border-[#2a2a3e] flex items-center justify-center overflow-hidden">
                  <img src="https://shuffle.com/icons/token.svg" alt="SHFL Token" className="w-7 h-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-white font-bold text-[14px]">Shuffle</span>
                    <span className="text-[#5a5a7a] text-[14px]">(SHFL)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-medium text-[14px]">$0.3865</span>
                    <span className="text-[#00d26a] text-[13px] font-bold">+9.15%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button className="h-[36px] bg-[#1e1e2e] border border-[#2a2a3e] text-[#8b8ba7] rounded-[10px] text-[13px] font-medium hover:bg-[#2a2a3e] hover:text-white transition-colors">
                  Convert
                </button>
                <button className="h-[36px] bg-[#1e1e2e] border border-[#2a2a3e] text-white rounded-[10px] text-[13px] font-medium hover:bg-[#2a2a3e] transition-colors">
                  Dashboard
                </button>
              </div>
            </div>
          )}

          <nav className="flex-1 py-2">
            <div className={`space-y-[2px] ${isCollapsed ? 'px-1' : 'px-2'}`}>
              <a href="/" className={`flex items-center ${isCollapsed ? 'justify-center px-2 h-[44px]' : 'gap-3 px-3 h-[44px]'} rounded-[10px] ${isCollapsed ? '' : 'bg-[#14141f] border-l-[3px] border-[#8b5cf6]'} text-[#8b5cf6]`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><path d="M10 3L3 9V17H7V12H13V17H17V9L10 3Z" stroke="#8b5cf6" strokeWidth="1.5" strokeLinejoin="round" fill="none"/><path d="M10 3L3 9V17H7V12H13V17H17V9L10 3Z" fill="#8b5cf6" fillOpacity="0.15"/></svg>
                {!isCollapsed && <span className="text-[15px] font-bold">Home</span>}
              </a>

              <a href="/favourites" className={`flex items-center ${isCollapsed ? 'justify-center px-2 h-[44px]' : 'gap-3 px-3 h-[44px]'} rounded-[10px] text-[#8b8ba7] hover:text-white hover:bg-[#14141f] transition-colors`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><path d="M10 2.5L12.5 7.5L18 8.5L14 12.5L15 18L10 15.5L5 18L6 12.5L2 8.5L7.5 7.5L10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                {!isCollapsed && <span className="text-[15px] font-medium">Favourites</span>}
              </a>

              <a href="/latest" className={`flex items-center ${isCollapsed ? 'justify-center px-2 h-[44px]' : 'gap-3 px-3 h-[44px]'} rounded-[10px] text-[#8b8ba7] hover:text-white hover:bg-[#14141f] transition-colors`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><path d="M10 3C6 3 3 6 3 10C3 14 6 17 10 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 3C10 3 14 5 14 10C14 15 10 17 10 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="10" r="2" fill="currentColor"/><path d="M13 4L17 2L15 6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                {!isCollapsed && <span className="text-[15px] font-medium">Latest Releases</span>}
              </a>

              <a href="/recent" className={`flex items-center ${isCollapsed ? 'justify-center px-2 h-[44px]' : 'gap-3 px-3 h-[44px]'} rounded-[10px] text-[#8b8ba7] hover:text-white hover:bg-[#14141f] transition-colors`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 7V10L12.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M3 5L4 7L6 6M17 5L16 7L14 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                {!isCollapsed && <span className="text-[15px] font-medium">Recently Played</span>}
              </a>

              <a href="/challenges" className={`flex items-center ${isCollapsed ? 'justify-center px-2 h-[44px]' : 'gap-3 px-3 h-[44px]'} rounded-[10px] text-[#8b8ba7] hover:text-white hover:bg-[#14141f] transition-colors`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M10 3C10 3 14 3 16 5C18 7 18 11 18 11M2 11C2 11 2 7 4 5C6 3 10 3 10 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><path d="M7 14L10 17L13 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {!isCollapsed && (
                  <>
                    <span className="text-[15px] font-medium flex-1">Challenges</span>
                    <span className="bg-[#8b5cf6] text-white text-[12px] font-bold px-2.5 py-1 rounded-[8px] min-w-[32px] text-center">26</span>
                  </>
                )}
              </a>
            </div>

            <div className="my-3 border-t border-[#1e1e2e]/60" />

            <div className={`space-y-[2px] ${isCollapsed ? 'px-1' : 'px-2'}`}>
              <a href="/lottery" className={`flex items-center ${isCollapsed ? 'justify-center px-2 h-[44px]' : 'gap-3 px-3 h-[44px]'} rounded-[10px] text-[#c9a86a] hover:bg-[#14141f] transition-colors`}>
                <div className="w-5 h-5 rounded-full border border-[#c9a86a] flex items-center justify-center text-[11px] font-bold">8</div>
                {!isCollapsed && (
                  <>
                    <span className="text-[15px] font-medium flex-1">SHFL Lottery</span>
                    <span className="text-[#00d26a] text-[13px] font-bold">6d</span>
                  </>
                )}
              </a>

              <a href="/airdrop" className={`flex items-center ${isCollapsed ? 'justify-center px-2 h-[44px]' : 'gap-3 px-3 h-[44px]'} rounded-[10px] text-[#8b8ba7] hover:text-white hover:bg-[#14141f] transition-colors`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 3V6M10 14V17M3 10H6M14 10H17" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.2"/></svg>
                {!isCollapsed && (
                  <>
                    <span className="text-[15px] font-medium flex-1">SHFL Airdrop</span>
                    <span className="text-[#00d26a] text-[13px] font-bold">2h</span>
                  </>
                )}
              </a>

              <button onClick={() => setShowPromotions(!showPromotions)} className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2 h-[44px]' : 'gap-3 px-3 h-[44px]'} rounded-[10px] text-[#8b8ba7] hover:text-white hover:bg-[#14141f] transition-colors`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M10 2V3.5M10 16.5V18M2 10H3.5M16.5 10H18M4.5 4.5L5.5 5.5M14.5 14.5L15.5 15.5M15.5 4.5L14.5 5.5M5.5 14.5L4.5 15.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                {!isCollapsed && (
                  <>
                    <span className="text-[15px] font-medium flex-1 text-left">Promotions</span>
                    <div className={`w-7 h-7 bg-[#1e1e2e] rounded-[8px] flex items-center justify-center transition-transform ${showPromotions ? 'rotate-180' : ''}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5a5a7a" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                    </div>
                  </>
                )}
              </button>
            </div>

            <div className="my-3 border-t border-[#1e1e2e]/60" />

            <div className={`space-y-[2px] ${isCollapsed ? 'px-1' : 'px-2'}`}>
              {!isCollapsed && <div className="px-3 py-2 text-[11px] font-bold text-[#5a5a7a] uppercase tracking-widest opacity-0">Casino</div>}
              
              <a href="/originals" className={`flex items-center ${isCollapsed ? 'justify-center px-2 h-[40px]' : 'gap-3 px-3 h-[40px]'} rounded-[10px] text-[#8b8ba7] hover:text-white hover:bg-[#14141f] transition-colors`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><path d="M6 9H7M6 12H7M9 9H10M9 12H10M3 7C3 6 4 5 5 5H15C16 5 17 6 17 7V13C17 14 16 15 15 15H5C4 15 3 14 3 13V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="13" cy="10" r="1" fill="currentColor"/></svg>
                {!isCollapsed && <span className="text-[14px] font-medium">Originals</span>}
              </a>

              <a href="/slots" className={`flex items-center ${isCollapsed ? 'justify-center px-2 h-[40px]' : 'gap-3 px-3 h-[40px]'} rounded-[10px] text-[#8b8ba7] hover:text-white hover:bg-[#14141f] transition-colors`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><path d="M4 6C4 5 5 4 6 4H8C9 4 10 5 10 6V7C10 8 9 9 8 9H6C5 9 4 10 4 11V12C4 13 5 14 6 14H8C9 14 10 13 10 12M10 6H14C15 6 16 7 16 8V9C16 10 15 11 14 11H12C11 11 10 12 10 13V14C10 15 11 16 12 16H14C15 16 16 15 16 14V13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                {!isCollapsed && <span className="text-[14px] font-medium">Slots</span>}
              </a>

              <a href="/live-casino" className={`flex items-center ${isCollapsed ? 'justify-center px-2 h-[40px]' : 'gap-3 px-3 h-[40px]'} rounded-[10px] text-[#8b8ba7] hover:text-white hover:bg-[#14141f] transition-colors`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 8L13 10L8 12V8Z" fill="currentColor"/></svg>
                {!isCollapsed && <span className="text-[14px] font-medium">Live Casino</span>}
              </a>

              <a href="/shuffle-picks" className={`flex items-center ${isCollapsed ? 'justify-center px-2 h-[40px]' : 'gap-3 px-3 h-[40px]'} rounded-[10px] text-[#8b8ba7] hover:text-white hover:bg-[#14141f] transition-colors`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M8 12L10 14L13 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="14" cy="6" r="1" fill="#00d26a"/></svg>
                {!isCollapsed && <span className="text-[14px] font-medium">Shuffle Picks</span>}
              </a>
            </div>

            {!isCollapsed && (
              <div className="mt-4 mx-2 p-3 bg-gradient-to-br from-[#7717ff]/20 via-[#7717ff]/10 to-[#1e1e2e] border border-[#7717ff]/30 rounded-[12px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-[#7717ff] rounded-[8px] flex items-center justify-center">
                    <span className="text-white font-bold text-[12px]">API</span>
                  </div>
                  <div>
                    <div className="text-white font-bold text-[13px]">Connect API</div>
                    <div className="text-[#8b8ba7] text-[11px]">Developer Contact</div>
                  </div>
                </div>
                <p className="text-[#8b8ba7] text-[12px] leading-[1.4] mb-3">Need integration help? Contact for API access.</p>
                <a href="https://t.me/vicckr" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full h-[36px] px-3 bg-[#7717ff] hover:bg-[#8b3dff] text-white rounded-[8px] text-[13px] font-bold transition-colors group">
                  <span>Contact Developer</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            )}
          </nav>
        </div>
      </aside>
    </>
  );
}
