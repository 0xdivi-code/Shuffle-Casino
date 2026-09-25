"use client";
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import AuthModal from './AuthModal';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');

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
            {children}
          </div>
          <Footer />
        </main>
      </div>
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} initialTab={authTab} />
    </div>
  );
}
