"use client";
import AppShell from '@/components/AppShell';

export default function SportsPage() {
  return (
    <AppShell>
      <div className="w-full max-w-[800px] mx-auto">
        <div className="bg-[#14141f] border border-[#1e1e2e] rounded-[16px] p-8 lg:p-12 text-center shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
          <div className="w-16 h-16 bg-[#1e1e2e] rounded-full flex items-center justify-center mx-auto mb-5 border border-[#2a2a3e]">
            <span className="text-[28px]">🏈</span>
          </div>
          <h2 className="text-white font-bold text-[22px] mb-3 tracking-tight">Sportsbook </h2>
          <p className="text-[#8b8ba7] text-[14px] leading-[1.6] max-w-[520px] mx-auto mb-2">
            The Sportsbook module is currently disconnected. To integrate live odds, betslip, and wallet connectivity, please message the developer.
          </p>
          <p className="text-[#5a5a7a] text-[12px] mb-8">
            API endpoints for sports, odds feed, and bet placement need to be wired up. Contact below to enable full Sportsbook functionality.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://t.me/vicckr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[44px] px-6 bg-[#7717ff] hover:bg-[#8b3dff] text-white rounded-[10px] text-[13px] font-bold transition-colors shadow-[0_4px_20px_rgba(119,23,255,0.3)]"
            >
              <span>Buy Complete Code</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8L7 12L13 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="/" className="inline-flex h-[44px] px-6 bg-[#1e1e2e] border border-[#2a2a3e] hover:bg-[#2a2a3e] text-white rounded-[10px] items-center font-bold text-[13px] transition-colors">
              Back to Casino
            </a>
          </div>

          <div className="mt-10 pt-6 border-t border-[#1e1e2e]/60 flex flex-col gap-2 text-[11px] text-[#5a5a7a]">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-[#f1323e] rounded-full animate-pulse"></span>
              <span>API not connected - Sportsbook service unreachable</span>
            </div>
            <div className="font-mono">URI mismatched - /api/sportsbook/odds</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
