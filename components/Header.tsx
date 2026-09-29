"use client";
import { useState } from 'react';
import { useAuth } from './AuthContext';

interface HeaderProps {
  onMenuToggle: () => void;
  onCollapseToggle: () => void;
  isMenuOpen: boolean;
  isCollapsed: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onWalletClick: () => void;
}

function CasinoSportsToggle({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center bg-[#1a1a1e] border border-[#2a2a3e] rounded-[10px] p-1 ${className}`}>
      <a
        href="/"
        className="relative flex-1 lg:flex-none justify-center px-4 lg:px-5 py-1.5 lg:py-2 bg-[#7717ff] text-white rounded-[8px] text-[13px] lg:text-[14px] font-bold overflow-hidden flex items-center"
        style={{
          backgroundImage: `url(https://shuffle.com/images/navigation/mobile-tab-background-press.svg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <span className="relative z-10">Casino</span>
      </a>
      <a href="/sports" className="flex-1 lg:flex-none justify-center px-4 lg:px-5 py-1.5 lg:py-2 text-[#8b8ba7] hover:text-white rounded-[8px] text-[13px] lg:text-[14px] font-medium transition-colors flex items-center">
        Sports
      </a>
    </div>
  );
}

function IconButtons() {
  return (
    <div className="flex items-center gap-1.5">
      <a href="/transactions" aria-label="view transactions" className="w-9 h-9 lg:w-10 lg:h-10 bg-[#1e1e2e] border border-[#2a2a3e] rounded-full flex items-center justify-center hover:bg-[#2a2a3e] transition-colors">
        <img alt="transactions" width="16" height="16" src="/icons/transactions.svg" className="w-4 h-4 opacity-80" />
      </a>
      <a href="/vip-program" aria-label="view VIP rewards" className="w-9 h-9 lg:w-10 lg:h-10 bg-[#1e1e2e] border border-[#2a2a3e] rounded-full flex items-center justify-center hover:bg-[#2a2a3e] transition-colors">
        <img alt="crown" width="16" height="16" src="/icons/crown.svg" className="w-4 h-4 opacity-80" />
      </a>
      <a href="/support" aria-label="open live support" data-testid="chat-button" className="w-9 h-9 lg:w-10 lg:h-10 bg-[#1e1e2e] border border-[#2a2a3e] rounded-full flex items-center justify-center hover:bg-[#2a2a3e] transition-colors">
        <img alt="chat" width="16" height="16" src="/icons/chat.svg" className="w-4 h-4 opacity-80" />
      </a>
    </div>
  );
}

function UserMenu({ username, signOut, onWalletClick }: { username: string; signOut: () => void; onWalletClick: () => void }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <div className="relative flex-shrink-0">
      <button type="button" aria-label="Open user menu" className="cursor-pointer" onClick={() => setShowUserMenu(!showUserMenu)}>
        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full overflow-hidden bg-[#1e1e2e] border border-[#2a2a3e] hover:border-[#3a3a4e] transition-colors flex items-center justify-center">
          <img alt="avatar" width="40" height="40" src="/icons/user-profile.svg" className="w-full h-full object-cover" />
        </div>
      </button>
      {showUserMenu && (
        <>
          <div className="fixed inset-0 z-[90]" onClick={() => setShowUserMenu(false)} />
          <div className="absolute top-full right-0 mt-2 lg:mt-3 z-[100]">
            <div className="w-[300px] max-w-[calc(100vw-2rem)] bg-[#1e1e2e] border border-[#2a2a3e] rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
              <a className="block p-4 hover:bg-[#2a2a3e]/50 transition-colors" href="/vip-program">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-[#0e0e15] border border-[#2a2a3e]">
                    <img alt="avatar" width="40" height="40" src="/icons/user-profile.svg" className="w-full h-full" />
                  </div>
                  <span className="text-white font-bold text-[15px]">{username}</span>
                </div>
                <hr className="border-[#2a2a3e] my-3" />
                <span className="flex items-center gap-2 text-[12px] text-[#8b8ba7] mb-3">
                  <span><img alt="vip icon" width="16" height="16" src="/images/vip/unranked.svg" className="w-4 h-4" /></span>
                  <span>Unranked</span>
                </span>
                <div className="w-full">
                  <div className="w-full">
                    <div className="w-full h-2 bg-[#0e0e15] border border-[#2a2a3e] rounded-full overflow-hidden mb-2">
                      <div className="h-full w-[0%] bg-[#7717ff]"></div>
                    </div>
                    <p className="flex items-center justify-between text-[11px]">
                      <span><span className="text-[#8b8ba7]">0.00%</span></span>
                      <span className="flex items-center">
                        <span className="flex items-center gap-1.5">
                          <span><img alt="vip icon" width="16" height="16" src="/images/vip/wood.svg" className="w-4 h-4" /></span>
                          <span className="text-[#8b8ba7]">Wood</span>
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </a>
              <div className="py-2 border-t border-[#2a2a3e]/60 max-h-[390px] overflow-y-auto scrollbar-thin">
                <button type="button" onClick={() => { setShowUserMenu(false); onWalletClick(); }} className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors text-left"><span className="w-5 h-5 flex items-center justify-center"><img alt="wallet" src="/icons/wallet.svg" className="w-4 h-4" /></span>Wallet</button>
                <a className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/vip-program"><span className="w-5 h-5 flex items-center justify-center"><img alt="crown" src="/icons/crown.svg" className="w-4 h-4" /></span>VIP</a>
                <a className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/vault"><span className="w-5 h-5 flex items-center justify-center"><img alt="lock" src="/icons/shield-lock.svg" className="w-4 h-4" /></span>Vault</a>
                <a className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/token"><span className="w-5 h-5 flex items-center justify-center"><img alt="token" src="/icons/token-white.svg" className="w-4 h-4" /></span>Token</a>
                <a className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/affiliate/overview"><span className="w-5 h-5 flex items-center justify-center"><img alt="affiliate" src="/icons/affiliate.svg" className="w-4 h-4" /></span>Affiliate Program</a>
                <a className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/notifications"><span className="w-5 h-5 flex items-center justify-center"><img alt="notifications" src="/icons/notifications.svg" className="w-4 h-4" /></span>Notifications</a>
                <a className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/transactions"><span className="w-5 h-5 flex items-center justify-center"><img alt="transactions" src="/icons/transactions.svg" className="w-4 h-4" /></span>Transactions</a>
                <a className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/redeem"><span className="w-5 h-5 flex items-center justify-center"><img alt="redeem" src="/icons/redeem-code.svg" className="w-4 h-4" /></span>Redeem Code</a>
                <a className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/settings/account"><span className="w-5 h-5 flex items-center justify-center"><img alt="setting" src="/icons/setting.svg" className="w-4 h-4" /></span>Settings</a>
                <a className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/shuffle-wise/self-exclusion"><span className="w-5 h-5 flex items-center justify-center"><img alt="shuffle wise" src="/icons/shuffle-wise.svg" className="w-4 h-4" /></span>Shuffle Wise</a>
                <a className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/support"><span className="w-5 h-5 flex items-center justify-center"><img alt="support" src="/icons/live-support.svg" className="w-4 h-4" /></span>Live Support</a>
                <button onClick={() => { setShowUserMenu(false); signOut(); }} className="w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#f1323e] hover:text-white hover:bg-[#2a2a3e] transition-colors text-left border-t border-[#2a2a3e]/60 mt-2" type="button"><img className="w-5 h-5" alt="logout" src="/icons/logout.svg" />Logout</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Header({ onMenuToggle, onCollapseToggle, isMenuOpen, isCollapsed, onLoginClick, onRegisterClick, onWalletClick }: HeaderProps) {
  const { user, profile, signOut } = useAuth();

  const handleHamburgerClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onMenuToggle();
    } else {
      onCollapseToggle();
    }
  };

  const username = profile?.username || user?.email?.split('@')[0] || 'feolu';

  return (
    <header className="sticky top-0 z-50 bg-[#0e0e15] border-b border-[#1e1e2e]/60">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-2 lg:py-0 lg:h-16">
        {/*
          Responsive header:
          - row 1 (all sizes): hamburger + logo ... balance/wallet/user OR login/register
          - row 2 (< lg): casino/sports toggle + quick actions
          - at lg+ everything sits in one row (order classes take care of positions)
        */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 lg:gap-x-5 lg:gap-y-0 lg:flex-nowrap lg:h-full">
          {/* Hamburger */}
          <button
            onClick={handleHamburgerClick}
            className="order-1 w-10 h-10 lg:w-9 lg:h-9 flex items-center justify-center text-white hover:bg-[#1e1e2e] rounded-[8px] transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
          </button>

          {/* Logo — always visible with breathing room */}
          <a
            title="Snuffle Casino"
            aria-label="Home"
            className="order-2 lg:order-3 flex items-center ml-1 sm:ml-2 min-w-0"
            href="/"
          >
            <img
              height="26"
              alt="Snuffle logo"
              src="https://i.postimg.cc/6QzR8npH/log0.png"
              className="h-[22px] sm:h-[24px] lg:h-[26px] w-auto max-w-full object-contain object-left block"
              onError={(e) => {
                const target = e.currentTarget;
                if (target.dataset.fallback) return;
                target.dataset.fallback = '1';
                target.src = '/icons/logo.svg';
              }}
            />
          </a>

          {/* Right group: wallet actions (logged in) or Login / Register */}
          {user ? (
            <div className="order-3 lg:order-4 ml-auto flex items-center gap-2 lg:gap-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <button type="button" onClick={onWalletClick} className="flex items-center gap-2 h-9 lg:h-10 px-2.5 lg:px-3 bg-[#1e1e2e] border border-[#2a2a3e] rounded-[10px] hover:bg-[#2a2a3e] transition-colors" id="balance-button">
                    <img className="w-4 h-4 rounded-full" alt="ETH" width="16" height="16" src="/icons/crypto/eth.svg" />
                    <span className="text-white text-[13px] font-medium hidden sm:flex">
                      <span className="formatted-amount-value" data-testid="balance">0.00000000</span>
                    </span>
                    <span className="sm:hidden text-white text-[12px] font-medium">0.00</span>
                    <img alt="arrow" className="w-3 h-3 opacity-60" src="/icons/chevron.svg" />
                  </button>
                </div>
                <button type="button" onClick={onWalletClick} id="wallet-btn" className="h-9 lg:h-10 px-3 lg:px-4 bg-[#7717ff] hover:bg-[#8b3dff] text-white rounded-[10px] flex items-center gap-2 text-[13px] font-bold transition-colors flex-shrink-0">
                  <img alt="wallet" width="16" height="16" src="/icons/wallet.svg" className="w-4 h-4" />
                  <span className="hidden lg:block font-bold">Wallet</span>
                </button>
              </div>

              {/* Desktop quick actions */}
              <div className="hidden lg:flex items-center gap-1.5">
                <IconButtons />
              </div>

              <UserMenu username={username} signOut={signOut} onWalletClick={onWalletClick} />
            </div>
          ) : (
            <div className="order-3 lg:order-4 ml-auto flex items-center gap-2 sm:gap-3">
              <button
                onClick={onLoginClick}
                className="h-9 sm:h-10 px-4 sm:px-5 bg-transparent border border-[#2a2a3e] hover:bg-[#1e1e2e] text-white rounded-[10px] text-[13px] sm:text-[14px] font-medium transition-colors whitespace-nowrap"
              >
                Login
              </button>
              <button
                onClick={onRegisterClick}
                className="h-9 sm:h-10 px-4 sm:px-5 bg-[#7717ff] hover:bg-[#8b3dff] text-white rounded-[10px] text-[13px] sm:text-[14px] font-bold transition-colors whitespace-nowrap"
              >
                Register
              </button>
            </div>
          )}

          {/* Casino/Sports (+ mobile quick actions) — own row under lg, same row at lg+ */}
          <div className="order-4 lg:order-2 w-full lg:w-auto flex items-center gap-2 lg:gap-4">
            <CasinoSportsToggle className="flex-1 lg:flex-none" />
            {user && (
              <div className="flex lg:hidden items-center">
                <IconButtons />
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
