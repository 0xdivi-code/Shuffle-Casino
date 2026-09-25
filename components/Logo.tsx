"use client";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img 
        src="https://shuffle.com/icons/logo.svg" 
        alt="Shuffle" 
        className="h-[24px] w-auto"
        onError={(e) => {
          // fallback to local
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = 'flex';
        }}
      />
      <div className="hidden w-8 h-8 bg-[#7717ff] rounded-lg items-center justify-center">
        <span className="text-white font-black text-sm">S</span>
      </div>
    </div>
  );
}
