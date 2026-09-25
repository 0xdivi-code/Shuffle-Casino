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
                      />
                    </div>
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
