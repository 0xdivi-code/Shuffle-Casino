"use client";
import AppShell from '@/components/AppShell';
import { Construction, ArrowLeft } from 'lucide-react';

export default function Page() {
  return (
    <AppShell>
      <div className="w-full">
        <div className="flex items-center gap-3 mb-6">
          <a href="/" className="w-8 h-8 bg-[#14141f] border border-[#1e1e2e] rounded-[8px] flex items-center justify-center text-[#8b8ba7] hover:text-white hover:border-[#2a2a3e] transition-colors">
            <ArrowLeft size={18} />
          </a>
          <h1 className="text-white font-bold text-[22px] tracking-tight">Blog</h1>
        </div>
        <div className="bg-[#14141f] border border-[#1e1e2e] rounded-[16px] p-12 text-center">
          <div className="w-16 h-16 bg-[#1e1e2e] rounded-full flex items-center justify-center mx-auto mb-4">
            <Construction size={28} className="text-[#5a5a7a]" />
          </div>
          <h2 className="text-white font-bold text-[18px] mb-2">Blog</h2>
          <p className="text-[#8b8ba7] text-[14px] max-w-[400px] mx-auto mb-6">Latest news, guides and updates from Snuffle.</p>
          <a href="/" className="inline-flex items-center gap-2 h-[40px] px-5 bg-[#7717ff] hover:bg-[#8b3dff] text-white rounded-[8px] text-[13px] font-bold transition-colors">
            Back to Casino
          </a>
        </div>
      </div>
    </AppShell>
  );
}
