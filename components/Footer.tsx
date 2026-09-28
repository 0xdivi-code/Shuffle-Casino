"use client";
import { ChevronDown } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#08080a] border-t border-[#1e1e2e]/40 mt-12">
      {/* Main footer row */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-10 lg:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-7 gap-8 lg:gap-6">
          {/* Branding column */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex flex-col gap-4">
              <a href="/" title="Snuffle Casino" className="inline-flex">
                <img 
                  src="https://i.postimg.cc/6QzR8npH/log0.png" 
                  alt="Snuffle logo" 
                  height={24}
                  className="h-[24px] w-auto"
                />
              </a>
              
              <div className="flex items-center gap-3 mt-1">
                <a 
                  title="Sunderland A.F.C" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  href="https://www.safc.com/"
                  className="flex-shrink-0"
                >
                  <img 
                    src="https://shuffle.com/images/partners/sunderland-afc.svg" 
                    alt="Sunderland A.F.C crest" 
                    width={48} 
                    height={48}
                    className="w-[48px] h-[48px] object-contain"
                    loading="lazy"
                  />
                </a>
                <p className="text-[#8b8ba7] text-[13px] leading-[1.3]">
                  Official Partner of <br />
                  <span className="text-white font-medium">Sunderland A.F.C</span>
                </p>
              </div>
            </div>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <div className="text-white font-bold text-[14px] mb-4">Support</div>
            <ul className="space-y-3">
              <li>
                <button className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors text-left">
                  Live Support
                </button>
              </li>
              <li>
                <a target="_blank" href="https://help.shuffle.com" rel="noopener noreferrer" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.begambleaware.org/" rel="noopener noreferrer" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">
                  Game Responsibly
                </a>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="col-span-1">
            <div className="text-white font-bold text-[14px] mb-4">Platform</div>
            <ul className="space-y-3">
              <li><a href="/provably-fair/overview" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Provably Fair</a></li>
              <li><a href="/affiliate" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Affiliate Program</a></li>
              <li><button className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Redeem Code</button></li>
              <li><a href="/vip-program" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">VIP Program</a></li>
            </ul>
          </div>

          {/* Policy */}
          <div className="col-span-1">
            <div className="text-white font-bold text-[14px] mb-4">Policy</div>
            <ul className="space-y-3">
              <li><a href="/info/terms" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Terms of Service</a></li>
              <li><a href="/info/privacy" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Privacy Policy</a></li>
              <li><a href="/info/responsible-gambling" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Responsible Gambling</a></li>
              <li><a href="/info/aml" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">AML Policy</a></li>
              <li><a href="/info/license" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">License</a></li>
              <li><a href="/info/sports" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Sports</a></li>
              <li><a href="/info/lottery" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Lottery</a></li>
              <li><a href="/info/convert" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Convert</a></li>
              <li><a href="/info/airdrop" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Airdrop</a></li>
            </ul>
          </div>

          {/* Community */}
          <div className="col-span-1">
            <div className="text-white font-bold text-[14px] mb-4">Community</div>
            <ul className="space-y-3">
              <li><a target="_blank" href="https://x.com/shufflecom" rel="noopener noreferrer" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">X</a></li>
              <li><a target="_blank" href="https://www.instagram.com/shufflecom" rel="noopener noreferrer" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Instagram</a></li>
              <li><a target="_blank" href="https://facebook.com/shufflefb" rel="noopener noreferrer" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Facebook</a></li>
              <li><a target="_blank" href="https://t.me/shufflecom" rel="noopener noreferrer" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Telegram</a></li>
              <li><a target="_blank" href="https://shuffle.store/" rel="noopener noreferrer" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Merch</a></li>
              <li><a target="_blank" href="https://shufflecommunity.com" rel="noopener noreferrer" className="text-[#8b8ba7] hover:text-white text-[13px] transition-colors">Snuffle Forum</a></li>
            </ul>
          </div>

          {/* Language and Odds selectors - matches screenshot */}
          <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
            <div className="relative">
              <button className="w-full flex items-center justify-between bg-[#14141f] border border-[#1e1e2e] rounded-[8px] px-4 h-[44px] text-[13px] text-white hover:border-[#2a2a3e] transition-colors">
                <span>English</span>
                <ChevronDown size={16} className="text-[#8b8ba7]" />
              </button>
            </div>
            
            <div className="relative">
              <button className="w-full flex items-center justify-between bg-[#14141f] border border-[#1e1e2e] rounded-[8px] px-4 h-[44px] text-[13px] text-white hover:border-[#2a2a3e] transition-colors">
                <span className="flex items-center gap-1">
                  <span className="text-white">Odds:</span>
                  <span className="text-[#8b5cf6] font-medium">Decimal</span>
                </span>
                <ChevronDown size={16} className="text-[#8b8ba7]" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Language/Odds - visible only on mobile per original html */}
        <div className="lg:hidden mt-8 grid grid-cols-2 gap-3">
          <button className="flex items-center justify-between bg-[#14141f] border border-[#1e1e2e] rounded-[8px] px-4 h-[44px] text-[13px] text-white">
            <span>English</span>
            <ChevronDown size={16} className="text-[#8b8ba7]" />
          </button>
          <button className="flex items-center justify-between bg-[#14141f] border border-[#1e1e2e] rounded-[8px] px-4 h-[44px] text-[13px]">
            <span className="text-white">Odds: <span className="text-[#8b5cf6]">Decimal</span></span>
            <ChevronDown size={16} className="text-[#8b8ba7]" />
          </button>
        </div>

        {/* Description - matches screenshot exactly */}
        <div className="mt-10 pt-8 border-t border-[#1e1e2e]/40">
          <p className="text-[#6b7280] text-[12px] leading-[1.6]">
            Snuffle is owned and operated by Natural Nine B.V., Curaçao company registration number 160998, with its registered address at Korporaalweg 10, Willemstad, Curaçao and is licensed by the Curaçao Gaming Control Board to offer games of chance under license number OGL/2024/1337/0628. Contact us at <a href="mailto:support@shuffle.com" className="text-[#8b8ba7] hover:text-white underline">support@shuffle.com</a>.
          </p>
        </div>

        {/* Bottom bar - extra from html for completeness */}
        <div className="mt-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pt-6 border-t border-[#1e1e2e]/30">
          <div className="flex items-center gap-4 text-[12px] text-[#5a5a7a]">
            <span>1 ETH = $2,691.91</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#5a5a7a] text-[11px]">© 2026 Snuffle.com | All Rights Reserved</span>
            <div className="flex items-center gap-2">
              <img 
                src="/icons/eighteen-plus.svg" 
                alt="18+" 
                className="h-[24px] w-auto opacity-60"
                onError={(e) => (e.target as HTMLImageElement).style.display = 'none'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating support button like in screenshot */}
      <div className="fixed bottom-6 right-6 z-30">
        <button className="w-12 h-12 bg-[#7717ff] hover:bg-[#8b3dff] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(119,23,255,0.4)] transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
          </svg>
        </button>
      </div>
    </footer>
  );
}
