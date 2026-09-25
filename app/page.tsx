"use client";
import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Hero from '@/components/Hero';
import GameCarousel from '@/components/GameCarousel';
import TournamentsSection from '@/components/TournamentsSection';
import Footer from '@/components/Footer';
import CategoryNav from '@/components/CategoryNav';
import ProvidersSection from '@/components/ProvidersSection';
import ErrorToast from '@/components/ErrorToast';
import AuthModal from '@/components/AuthModal';
import { gameSections } from '@/data/gameSections';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

  const showError = (gameTitle?: string) => {
    const messages = [
      `API not connected - ${gameTitle || 'Game'} cannot load`,
      `URI mismatched - Failed to resolve ${gameTitle || 'game'} endpoint`,
      `API not connected - Backend unreachable for ${gameTitle || 'request'}`,
      `URI mismatched - Invalid game URI: /api/games/${(gameTitle || 'unknown').toLowerCase().replace(/\s+/g, '-')}`,
    ];
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    setErrorMessage(randomMsg);
    setErrorVisible(true);
  };

  const openLogin = () => {
    setAuthTab('login');
    setAuthOpen(true);
  };

  const openRegister = () => {
    setAuthTab('register');
    setAuthOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-[#7717ff] selection:text-white">
      <Header 
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} 
        onCollapseToggle={() => setIsCollapsed(!isCollapsed)}
        isMenuOpen={isMenuOpen}
        isCollapsed={isCollapsed}
        onLoginClick={openLogin}
        onRegisterClick={openRegister}
      />
      
      <div className="flex max-w-[1920px] mx-auto">
        <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} collapsed={isCollapsed} />
        
        <main className="flex-1 min-w-0 overflow-hidden">
          <div className="px-3 lg:px-6 py-4 lg:py-6 max-w-[1440px] mx-auto w-full">
            <Hero />
            <CategoryNav />

            <div className="space-y-7 lg:space-y-10">
              {gameSections.map((section) => (
                <GameCarousel
                  key={section.id}
                  title={section.title}
                  games={section.games}
                  icon={section.icon}
                  href={section.href}
                  onGameClick={(game) => showError(game.title)}
                  priority={true}
                />
              ))}

              <TournamentsSection />

              <div className="mt-8 border-t border-[#1e1e2e]/60 pt-8">
                <ProvidersSection />
              </div>
            </div>
          </div>

          <Footer />
        </main>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0e0e15]/95 backdrop-blur-xl border-t border-[#1e1e2e] z-30 px-2 py-2 safe-area-pb">
        <div className="flex justify-around">
          {[
            { label: 'Casino', active: true, icon: '🎰' },
            { label: 'Sports', active: false, icon: '⚽' },
            { label: 'Airdrop', active: false, icon: '🪂' },
            { label: 'VIP', active: false, icon: '👑' },
            { label: 'Menu', active: false, icon: '☰' },
          ].map(item => (
            <button key={item.label} className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl ${item.active ? 'text-white bg-[#1a1a27]' : 'text-[#5a5a7a]'}`}>
              <span className="text-[18px]">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      <ErrorToast 
        message={errorMessage} 
        isVisible={errorVisible} 
        onClose={() => setErrorVisible(false)} 
      />

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialTab={authTab} />
    </div>
  );
}
