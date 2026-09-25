"use client";
import AppShell from '@/components/AppShell';
import { ArrowRight, Code, MessageCircle, ExternalLink, Shield, Zap } from 'lucide-react';

export default function ConnectPage() {
  return (
    <AppShell>
      <div className="max-w-[800px] mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#1e1e2e] border border-[#2a2a3e] rounded-full px-3 py-1 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[#8b8ba7] text-[12px] font-bold tracking-wide">API AVAILABLE</span>
          </div>
          <h1 className="text-[32px] lg:text-[42px] font-black tracking-tight leading-[0.9] mb-4">
            Connect <span className="text-[#7717ff]">API</span>
          </h1>
          <p className="text-[#8b8ba7] text-[16px] leading-[1.5] max-w-[600px]">
            Integrate Shuffle casino frontend with your own backend. Get access to game data, promotions, and UI components. Contact the developer for documentation and keys.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#14141f] border border-[#1e1e2e] rounded-[12px] p-5">
            <div className="w-10 h-10 bg-[#7717ff]/20 rounded-[8px] flex items-center justify-center mb-3">
              <Code size={20} className="text-[#7717ff]" />
            </div>
            <h3 className="text-white font-bold text-[14px] mb-1">REST API</h3>
            <p className="text-[#5a5a7a] text-[12px]">Games, providers, promotions endpoints</p>
          </div>
          <div className="bg-[#14141f] border border-[#1e1e2e] rounded-[12px] p-5">
            <div className="w-10 h-10 bg-[#00d26a]/20 rounded-[8px] flex items-center justify-center mb-3">
              <Zap size={20} className="text-[#00d26a]" />
            </div>
            <h3 className="text-white font-bold text-[14px] mb-1">Real-time</h3>
            <p className="text-[#5a5a7a] text-[12px]">WebSocket for live data</p>
          </div>
          <div className="bg-[#14141f] border border-[#1e1e2e] rounded-[12px] p-5">
            <div className="w-10 h-10 bg-[#c9a86a]/20 rounded-[8px] flex items-center justify-center mb-3">
              <Shield size={20} className="text-[#c9a86a]" />
            </div>
            <h3 className="text-white font-bold text-[14px] mb-1">Secure</h3>
            <p className="text-[#5a5a7a] text-[12px]">Auth & rate limiting included</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#7717ff]/20 via-[#1e1e2e] to-[#0e0e15] border border-[#7717ff]/30 rounded-[16px] p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-[#1e1e2e] border-2 border-[#7717ff] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-black text-[18px]">V</span>
            </div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-[20px] mb-1">Developer Contact</h2>
              <p className="text-[#8b8ba7] text-[14px] mb-1">Full-stack integration support</p>
              <p className="text-[#5a5a7a] text-[13px]">Next.js • API Integration • UI/UX</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          </div>

          <div className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-[12px] p-4 mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#5a5a7a] text-[12px] font-bold uppercase tracking-widest">Telegram</span>
              <span className="text-[#00d26a] text-[11px] bg-[#00d26a]/10 border border-[#00d26a]/20 px-2 py-1 rounded-full">Online</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#229ED9] rounded-full flex items-center justify-center">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-[16px]">Developer</div>
                <div className="text-[#5a5a7a] text-[12px]">Typically replies in minutes</div>
              </div>
            </div>
          </div>

          <a
            href="https://t.me/vicckr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full h-[48px] px-5 bg-[#7717ff] hover:bg-[#8b3dff] text-white rounded-[12px] font-bold text-[15px] transition-all group shadow-[0_0_20px_rgba(119,23,255,0.3)] hover:shadow-[0_0_30px_rgba(119,23,255,0.5)]"
          >
            <span className="flex items-center gap-3">
              <MessageCircle size={20} />
              Contact Developer on Telegram
            </span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="mt-4 flex items-center justify-center gap-2 text-[#5a5a7a] text-[11px]">
            <ExternalLink size={12} />
            <span>Opens in Telegram • https://t.me/vicckr</span>
          </div>
        </div>

        <div className="bg-[#0e0e15] border border-[#1e1e2e] rounded-[12px] p-6">
          <h3 className="text-white font-bold text-[14px] mb-3">What you get:</h3>
          <ul className="space-y-2 text-[13px] text-[#8b8ba7]">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#7717ff] rounded-full" />137 game cards with exact imgix URLs</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#7717ff] rounded-full" />8 promotional banners from Contentful</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#7717ff] rounded-full" />SafeImage with 6-level fallback + proxy</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#7717ff] rounded-full" />Responsive carousels, modals, sidebar</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#7717ff] rounded-full" />Aeonik font + Tailwind + Framer Motion</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
