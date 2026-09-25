"use client";
import { useState } from 'react';
import AppShell from '@/components/AppShell';
import ErrorToast from '@/components/ErrorToast';
import { providers } from '@/data/providers';

export default function ProvidersPage() {
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const showError = (name?: string) => {
    setErrorMessage(`API not connected - ${name || 'Provider'} cannot load`);
    setErrorVisible(true);
  };

  const buildSrcSet = (imageId: string) => {
    const widths = [256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
    return widths.map(w => `https://shuffle-com.imgix.net/${imageId}?auto=format&width=${w} ${w}w`).join(', ');
  };

  return (
    <AppShell>
      <div className="LayoutContainer_root w-full">
        <div className="flex items-center gap-3 mb-6">
          <a href="/" className="w-8 h-8 bg-[#14141f] border border-[#1e1e2e] rounded-[8px] flex items-center justify-center text-[#8b8ba7] hover:text-white hover:border-[#2a2a3e] transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <h1 className="text-white font-bold text-[22px] tracking-tight">Providers</h1>
        </div>

        <div className="GamesToolbar_root flex items-center justify-between mb-6">
          <div className="text-[13px] text-[#8b8ba7]">Displaying {providers.length} providers</div>
          <div className="SearchInput_root relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2"><img src="/icons/search.svg" alt="search" width="16" height="16" className="w-4 h-4 opacity-60" /></div>
            <input placeholder="Search providers" className="h-[40px] w-[260px] bg-[#14141f] border border-[#1e1e2e] rounded-[10px] pl-10 pr-4 text-[13px] text-white placeholder-[#5a5a7a] focus:outline-none focus:border-[#2a2a3e]" onKeyDown={(e) => { if (e.key === 'Enter') showError("Search providers"); }} />
          </div>
        </div>

        <div className="CardGrid_cardGridWrapper">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
            {providers.map((provider) => (
              <div key={provider.id} className="ProviderCard_ProviderCardWrapper" style={{ cursor: 'pointer' }}>
                <a href={provider.href} className="block">
                  <div className="ProviderCard_providerCardBlock w-full h-[96px] lg:h-[110px] bg-[#14141f] border border-[#1e1e2e] rounded-[12px] flex items-center justify-center p-4 hover:bg-[#1a1a27] hover:border-[#2a2a3e] transition-all group">
                    <div className="ProviderCard_providerCardElement relative w-full h-full">
                      <img
                        alt={provider.name}
                        loading="lazy"
                        decoding="async"
                        data-nimg="fill"
                        sizes="(max-width: 600px) 30vw, (max-width: 992px) 25vw, 260px"
                        srcSet={buildSrcSet(provider.imageId)}
                        src={`https://shuffle-com.imgix.net/${provider.imageId}?auto=format&width=3840`}
                        style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain', color: 'transparent' } as React.CSSProperties}
                        className="group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-[12px] text-[#8b8ba7] group-hover:text-white transition-colors font-medium">{provider.name}</span>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <ErrorToast message={errorMessage} isVisible={errorVisible} onClose={() => setErrorVisible(false)} />
      </div>
    </AppShell>
  );
}
