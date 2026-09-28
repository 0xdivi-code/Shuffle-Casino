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
}

export default function Header({ onMenuToggle, onCollapseToggle, isMenuOpen, isCollapsed, onLoginClick, onRegisterClick }: HeaderProps) {
  const { user, profile, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleHamburgerClick = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onMenuToggle();
    } else {
      onCollapseToggle();
    }
  };

  const username = profile?.username || user?.email?.split('@')[0] || 'feolu';

  const CasinoSportsToggle = () => (
    <div className="flex items-center bg-[#1a1a1e] border border-[#2a2a3e] rounded-[10px] p-1">
      <a
        href="/"
        className="relative px-4 lg:px-5 py-2 bg-[#7717ff] text-white rounded-[8px] text-[14px] font-bold overflow-hidden flex items-center justify-center"
        style={{
          backgroundImage: `url(https://shuffle.com/images/navigation/mobile-tab-background-press.svg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <span className="relative z-10">Casino</span>
      </a>
      <a href="/sports" className="px-4 lg:px-5 py-2 text-[#8b8ba7] hover:text-white rounded-[8px] text-[14px] font-medium transition-colors">
        Sports
      </a>
    </div>
  );

  if (user) {
    return (
      <header className="sticky top-0 z-50 bg-[#0e0e15] border-b border-[#1e1e2e]/60 h-[56px] lg:h-[64px]">
        <section className="LayoutContainer_root__YmW71 Header_navContainer__7H2Ay LayoutContainer_row___4Cfc flex items-center justify-between h-full px-3 lg:px-4 max-w-[1920px] mx-auto">
          {/* Left: Hamburger + Casino/Sports + Footer Logo aligned left */}
          <div className="flex items-center gap-3 lg:gap-4">
            <button
              onClick={handleHamburgerClick}
              className="w-9 h-9 flex items-center justify-center text-white hover:bg-[#1e1e2e] rounded-[8px] transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
            </button>
            <div className="flex items-center">
              <CasinoSportsToggle />
            </div>
            {/* Footer Snuffle Logo - aligned left, not center */}
            <a title="Snuffle Casino" className="HeaderLogo_mobileLogoWrapper__jgM7c flex lg:hidden ml-1" href="/">
              <img alt="logo" height="28" src="/icons/logo-small.svg" className="h-[26px] w-auto block" />
            </a>
            <a title="Snuffle Casino" aria-label="Home" className="HeaderLogo_desktopLogoWrapper__bmAcy hidden lg:flex items-center ml-2" href="/">
              <img height="24" alt="Snuffle logo" src="https://i.postimg.cc/6QzR8npH/log0.png" className="h-[24px] w-auto block" />
            </a>
          </div>

          {/* Right: Balance + Wallet + Icons */}
          <div className="HeaderWalletActions_navMenu__JyPzb flex items-center gap-2 lg:gap-3 ml-auto">
            <div className="HeaderWalletActions_btnContainer__NaMC3 flex items-center gap-2">
              <div className="BalanceSelect_root__Pdpt2">
                <div className="BalanceSelect_selectContainer__xCM8V">
                  <button className="BalanceSelect_balanceBtn__a2IXa flex items-center gap-2 h-[36px] lg:h-[40px] px-3 bg-[#1e1e2e] border border-[#2a2a3e] rounded-[10px] hover:bg-[#2a2a3e] transition-colors" id="balance-button" type="button">
                    <img className="CryptoIcon_root__FVB7K CryptoIcon_image__1494s w-4 h-4 rounded-full" alt="ETH" width="16" height="16" src="/icons/crypto/eth.svg" />
                    <span className="IconValue_root__hDG8_ text-white text-[13px] font-medium hidden sm:flex">
                      <span className="FormattedAmount_root__Vpi79 BalanceSelect_amount__GdFUJ formatted-amount-value" data-testid="balance">0.00000000</span>
                    </span>
                    <span className="sm:hidden text-white text-[12px] font-medium">0.00</span>
                    <img alt="arrow" className="BalanceSelect_arrow__48cRg w-3 h-3 opacity-60" src="/icons/chevron.svg" />
                  </button>
                </div>
              </div>
              <button type="button" id="wallet-btn" className="ButtonVariants_root__EFlHO ButtonVariants_buttonHeightMedium__PC3FX ButtonVariants_primary__zlUoe ButtonVariants_hasIcon__9cB6H HeaderWalletActions_walletBtn__zd_WZ h-[36px] lg:h-[40px] px-3 lg:px-4 bg-[#7717ff] hover:bg-[#8b3dff] text-white rounded-[10px] flex items-center gap-2 text-[13px] font-bold transition-colors">
                <span className="ButtonVariants_buttonContent__mRPrs flex items-center gap-1.5">
                  <span className="ButtonIcon_root__ettnD">
                    <img alt="wallet" width="16" height="16" src="/icons/wallet.svg" className="w-4 h-4" />
                  </span>
                  <span className="HeaderWalletActions_walletBtnText__m9TA2 hidden lg:block">Wallet</span>
                </span>
              </button>
            </div>

            <div className="Flex_root__yC03I Flex_sm5__iH98w HeaderWalletActions_userActions__g8cj4 hidden lg:flex items-center gap-1.5 ml-1">
              <div className="Flex_root__yC03I Flex_sm5__iH98w IconMenu_root__1U8Mx undefined flex items-center gap-1.5">
                <div className="IconMenu_menuWrapper__UDtAl flex items-center gap-1.5">
                  <span className="Tooltip_trigger__N4IYT" data-react-aria-pressable="true">
                    <button aria-label="show bets panel" className="ButtonVariants_root__EFlHO ButtonVariants_buttonHeightMedium__PC3FX ButtonVariants_tertiaryRound__Q9Q9d ButtonVariants_hasIcon__9cB6H w-10 h-10 bg-[#1e1e2e] border border-[#2a2a3e] rounded-full flex items-center justify-center hover:bg-[#2a2a3e] transition-colors">
                      <span className="ButtonVariants_buttonContent__mRPrs">
                        <span className="ButtonIcon_root__ettnD">
                          <img alt="bet slip" width="16" height="16" src="/icons/bet-slip.svg" className="w-4 h-4 opacity-80" />
                        </span>
                      </span>
                    </button>
                  </span>
                  <span className="Tooltip_trigger__N4IYT" data-react-aria-pressable="true">
                    <button className="ButtonVariants_root__EFlHO ButtonVariants_buttonHeightMedium__PC3FX ButtonVariants_tertiaryRound__Q9Q9d ButtonVariants_hasIcon__9cB6H w-10 h-10 bg-[#1e1e2e] border border-[#2a2a3e] rounded-full flex items-center justify-center hover:bg-[#2a2a3e] transition-colors">
                      <span className="ButtonVariants_buttonContent__mRPrs">
                        <span className="ButtonIcon_root__ettnD">
                          <img alt="crown" width="16" height="16" src="/icons/crown.svg" className="w-4 h-4 opacity-80" />
                        </span>
                      </span>
                    </button>
                  </span>
                  <span className="Tooltip_trigger__N4IYT" data-react-aria-pressable="true">
                    <button data-testid="chat-button" className="ButtonVariants_root__EFlHO ButtonVariants_buttonHeightMedium__PC3FX ButtonVariants_tertiaryRound__Q9Q9d ButtonVariants_hasIcon__9cB6H w-10 h-10 bg-[#1e1e2e] border border-[#2a2a3e] rounded-full flex items-center justify-center hover:bg-[#2a2a3e] transition-colors">
                      <span className="ButtonVariants_buttonContent__mRPrs">
                        <span className="ButtonIcon_root__ettnD">
                          <img alt="chat" width="16" height="16" src="/icons/chat.svg" className="w-4 h-4 opacity-80" />
                        </span>
                      </span>
                    </button>
                  </span>
                </div>
              </div>
              <div className="UserMenu_root___VZVV relative">
                <button type="button" className="UserMenu_userMenuWrapper__2ECxj" onClick={() => setShowUserMenu(!showUserMenu)}>
                  <div className="Avatar_root__zvy3z UserMenu_avatarButton__R2TFE w-10 h-10 rounded-full overflow-hidden bg-[#1e1e2e] border border-[#2a2a3e] hover:border-[#3a3a4e] transition-colors flex items-center justify-center">
                    <img alt="avatar" width="40" height="40" src="/icons/user-profile.svg" className="w-full h-full object-cover" />
                  </div>
                </button>
                {showUserMenu && (
                  <div className="ExpandMenuElement_menuWrapper__1GIcq absolute top-full right-0 mt-3 z-[100]">
                    <div className="ExpandMenuElement_expandMenu__uz55t w-[300px] bg-[#1e1e2e] border border-[#2a2a3e] rounded-[14px] shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                      <a className="UserMenuVipCard_userMenuVipWrapper__C886j block p-4 hover:bg-[#2a2a3e]/50 transition-colors" href="/vip-program">
                        <div className="UserMenuVipCard_name__dnXOc flex items-center gap-3 mb-3">
                          <div className="Avatar_root__zvy3z Avatar_background__DwIyy w-11 h-11 rounded-full overflow-hidden bg-[#0e0e15] border border-[#2a2a3e]">
                            <img alt="avatar" width="40" height="40" src="/icons/user-profile.svg" className="w-full h-full" />
                          </div>
                          <span className="UserMenuVipCard_username__tAS1m text-white font-bold text-[15px]">{username}</span>
                        </div>
                        <hr className="UserMenuVipCard_lineBreak__VDweT border-[#2a2a3e] my-3" />
                        <span className="VipBadge_root__ozOvC flex items-center gap-2 text-[12px] text-[#8b8ba7] mb-3">
                          <span className="VipIcon_root__8kkPV"><img alt="vip icon" width="16" height="16" src="/images/vip/unranked.svg" className="w-4 h-4" /></span>
                          <span>Unranked</span>
                        </span>
                        <div className="ProgressBarSection_graph__BfTU0">
                          <div className="ProgressBarSection_graphContent__R0VwM UserMenuVipCard_progressBarContent__PxLVl">
                            <div className="ProgressBarSection_progress__dk3_K ProgressBarSection_skipBorder__6HHfI w-full h-2 bg-[#0e0e15] border border-[#2a2a3e] rounded-full overflow-hidden mb-2">
                              <div className="h-full w-[0%] bg-[#7717ff]"></div>
                            </div>
                            <p className="ProgressBarSection_supportText__9fRTm flex items-center justify-between text-[11px]">
                              <span><span className="UserMenuVipCard_levelPercentage__fvTW8 text-[#8b8ba7]">0.00%</span></span>
                              <span className="ProgressBarSection_tokenAmount__pYu5q">
                                <span className="VipBadge_root__ozOvC flex items-center gap-1.5">
                                  <span className="VipIcon_root__8kkPV"><img alt="vip icon" width="16" height="16" src="/images/vip/wood.svg" className="w-4 h-4" /></span>
                                  <span className="text-[#8b8ba7]">Wood</span>
                                </span>
                              </span>
                            </p>
                          </div>
                        </div>
                      </a>
                      <div className="py-2 border-t border-[#2a2a3e]/60 max-h-[320px] overflow-y-auto scrollbar-thin">
                        <button type="button" className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors text-left"><span className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5 flex items-center justify-center"><img alt="wallet" src="/icons/wallet.svg" className="w-4 h-4" /></span>Wallet</button>
                        <a className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/vip-program"><span className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5 flex items-center justify-center"><img alt="crown" src="/icons/crown.svg" className="w-4 h-4" /></span>VIP</a>
                        <button type="button" className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors text-left"><span className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5 flex items-center justify-center"><img alt="lock" src="/icons/shield-lock.svg" className="w-4 h-4" /></span>Vault</button>
                        <a className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/token"><span className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5 flex items-center justify-center"><img alt="token" src="/icons/token-white.svg" className="w-4 h-4" /></span>Token</a>
                        <a className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/affiliate/overview"><span className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5 flex items-center justify-center"><img alt="affiliate" src="/icons/affiliate.svg" className="w-4 h-4" /></span>Affiliate Program</a>
                        <button type="button" className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors text-left"><span className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5 flex items-center justify-center"><img alt="notifications" src="/icons/notifications.svg" className="w-4 h-4" /></span>Notifications</button>
                        <a className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/transactions"><span className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5 flex items-center justify-center"><img alt="transactions" src="/icons/transactions.svg" className="w-4 h-4" /></span>Transactions</a>
                        <button type="button" className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors text-left"><span className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5 flex items-center justify-center"><img alt="redeem" src="/icons/redeem-code.svg" className="w-4 h-4" /></span>Redeem Code</button>
                        <a className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/settings/account"><span className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5 flex items-center justify-center"><img alt="setting" src="/icons/setting.svg" className="w-4 h-4" /></span>Settings</a>
                        <a className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors" href="/shuffle-wise/self-exclusion"><span className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5 flex items-center justify-center"><img alt="shuffle wise" src="/icons/shuffle-wise.svg" className="w-4 h-4" /></span>Snuffle Wise</a>
                        <button type="button" className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] transition-colors text-left"><span className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5 flex items-center justify-center"><img alt="support" src="/icons/live-support.svg" className="w-4 h-4" /></span>Live Support</button>
                        <button onClick={signOut} className="ExpandMenuElement_menuItem__Isfin w-full flex items-center gap-3 px-4 py-3 text-[13px] text-[#f1323e] hover:text-white hover:bg-[#2a2a3e] transition-colors text-left border-t border-[#2a2a3e]/60 mt-2" type="button"><img className="ExpandMenuElement_menuIcon__8Vlj8 w-5 h-5" alt="logout" src="/icons/logout.svg" />Logout</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:hidden flex items-center">
              <button type="button" className="w-9 h-9 rounded-full bg-[#1e1e2e] border border-[#2a2a3e] flex items-center justify-center" onClick={() => setShowUserMenu(!showUserMenu)}>
                <img alt="avatar" width="24" height="24" src="/icons/user-profile.svg" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      </header>
    );
  }

  // Before login - footer logo aligned left, not center
  return (
    <header className="sticky top-0 z-50 bg-[#0e0e15] border-b border-[#1e1e2e]/60 h-[56px] lg:h-[64px]">
      <section className="LayoutContainer_root__YmW71 undefined Header_navContainer__7H2Ay LayoutContainer_row___4Cfc flex items-center justify-between h-full px-3 lg:px-4 max-w-[1920px] mx-auto">
        {/* Left: Hamburger + Casino/Sports + Footer Logo aligned left */}
        <div className="flex items-center gap-3 lg:gap-4">
          <button
            onClick={handleHamburgerClick}
            className="w-9 h-9 flex items-center justify-center text-white hover:bg-[#1e1e2e] rounded-[8px] transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
          </button>
          <div className="flex items-center">
            <CasinoSportsToggle />
          </div>
          {/* Footer Snuffle Logo - left aligned */}
          <a title="Snuffle Casino" className="HeaderLogo_mobileLogoWrapper__jgM7c flex lg:hidden ml-1" href="/">
            <img alt="logo" height="28" src="/icons/logo-small.svg" className="h-[26px] w-auto block" />
          </a>
          <a title="Snuffle Casino" aria-label="Home" className="HeaderLogo_desktopLogoWrapper__bmAcy hidden lg:flex items-center ml-2" href="/">
            <img height="24" alt="Snuffle logo" src="https://i.postimg.cc/6QzR8npH/log0.png" className="h-[24px] w-auto block" />
          </a>
        </div>

        {/* Right: Login/Register */}
        <div className="HeaderWalletActions_navMenu__JyPzb flex items-center gap-2 ml-auto">
          <button onClick={onLoginClick} className="ButtonVariants_root__EFlHO ButtonVariants_buttonHeightMedium__PC3FX ButtonVariants_tertiary__LojiE ButtonVariants_noTextWrap__oD6zC HeaderLoginRegister_authButton__sLCuV HeaderLoginRegister_transparentButton__4jkyV h-[40px] px-5 bg-[#2a2a3e] border border-[#2a2a3e] text-white rounded-[10px] text-[14px] font-medium hover:bg-[#3a3a4e] transition-colors">
            <span className="ButtonVariants_buttonContent__mRPrs">Login</span>
          </button>
          <button onClick={onRegisterClick} className="ButtonVariants_root__EFlHO ButtonVariants_buttonHeightMedium__PC3FX ButtonVariants_primary__zlUoe ButtonVariants_noTextWrap__oD6zC HeaderLoginRegister_authButton__sLCuV h-[40px] px-5 bg-[#7717ff] hover:bg-[#8b3dff] text-white rounded-[10px] text-[14px] font-bold transition-colors">
            <span className="ButtonVariants_buttonContent__mRPrs">Register</span>
          </button>
        </div>
      </section>
    </header>
  );
}
