"use client";
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';

interface Tournament {
  id: string;
  title: string;
  countdown: string;
  image: string;
  progress: number; // 0-100
  leaderboard: { rank: string; user: string; prize: string; icon: string }[];
  href: string;
}

const tournaments: Tournament[] = [
  {
    id: "playnetic-race",
    title: "$20,000 - PLAYNETIC RACE!",
    countdown: "4d 10h 43m",
    image: "https://shuffle-com.imgix.net/cdde9392-b44d-40ee-b7ae-e85068c31970?w=1280&auto=format,compress",
    progress: 68,
    leaderboard: [
      { rank: "1st", user: "Hidden", prize: "$493,886.00", icon: "usd" },
      { rank: "2nd", user: "Hidden", prize: "$48,529.49", icon: "usd" },
      { rank: "3rd", user: "Hidden", prize: "$48,448.49", icon: "usd" },
    ],
    href: "/promotions/playnetic-wager-race"
  },
  {
    id: "demonic-dolls",
    title: "$20,000 - DEMONIC DOLLS!",
    countdown: "10d 2h 43m",
    image: "https://shuffle-com.imgix.net/4b6f0c6a-5b09-499b-ba56-0f5af21ce474?w=1280&auto=format,compress",
    progress: 28,
    leaderboard: [
      { rank: "1st", user: "Hidden", prize: "10,000.00x", icon: "multi" },
      { rank: "2nd", user: "Kartenstapel", prize: "3,248.80x", icon: "multi" },
      { rank: "3rd", user: "zabbero", prize: "3,090.80x", icon: "multi" },
    ],
    href: "/promotions/demonic-dolls"
  },
  {
    id: "weekly-race",
    title: "$100K WEEKLY Race",
    countdown: "1d 10h 44m",
    image: "https://shuffle-com.imgix.net/0e39d193-3d14-4a65-b2ee-615179766e83?w=1280&auto=format,compress",
    progress: 0,
    leaderboard: [
      { rank: "1st", user: "Hidden", prize: "$7,204,984.13", icon: "usd" },
      { rank: "2nd", user: "Hidden", prize: "$6,409,304.59", icon: "usd" },
      { rank: "3rd", user: "Hidden", prize: "$5,630,446.30", icon: "usd" },
    ],
    href: "/promotions/100000-weekly-race"
  }
];

export default function TournamentsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const amount = 420;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="w-full mt-2">
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="flex items-center gap-2.5 text-white font-bold text-[20px] tracking-tight">
          <Trophy size={24} className="text-[#8b5cf6]" />
          <span>Tournaments</span>
        </h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
              canScrollLeft ? 'bg-[#14141f] border-[#2a2a3e] text-white hover:bg-[#1e1e2e]' : 'bg-[#0e0e15] border-[#1e1e2e]/50 text-[#3a3a4a] cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all border ${
              canScrollRight ? 'bg-[#14141f] border-[#2a2a3e] text-white hover:bg-[#1e1e2e]' : 'bg-[#0e0e15] border-[#1e1e2e]/50 text-[#3a3a4a] cursor-not-allowed'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {tournaments.map((t) => (
            <div
              key={t.id}
              className="w-[340px] sm:w-[400px] lg:w-[480px] flex-shrink-0 rounded-[12px] overflow-hidden bg-[#14141f] border border-[#1e1e2e] hover:border-[#2a2a3e] transition-all"
            >
              {/* Banner */}
              <div className="relative h-[140px] overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
                
                <div className="relative z-10 flex items-center gap-4 p-4 h-full">
                  {/* Circle progress */}
                  <div className="relative w-[76px] h-[76px] flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                      <circle cx="32" cy="32" r="28" fill="none" stroke="#3a3a4a" strokeWidth="6" className="opacity-60" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        fill="none"
                        stroke="#8b5cf6"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={175.93}
                        strokeDashoffset={175.93 - (175.93 * t.progress) / 100}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-[48px] h-[48px] bg-[#0a0a0f] rounded-full flex items-center justify-center border border-[#2a2a3e]">
                        <img src="https://shuffle.com/icons/logo.svg" alt="S" className="w-6 h-6" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-black text-[18px] leading-[1.1] tracking-tight uppercase truncate">
                      {t.title}
                    </h4>
                    <a href={t.href} className="inline-flex items-center gap-1 text-[#00d26a] text-[14px] font-bold mt-1 hover:underline">
                      {t.countdown} <ChevronRight size={14} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Leaderboard */}
              <div className="bg-[#0e0e15] p-3">
                <div className="grid grid-cols-3 divide-x divide-[#1e1e2e]">
                  {t.leaderboard.map((entry, idx) => (
                    <div key={idx} className="px-3 py-1">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[14px]">{entry.rank === '1st' ? '🏆' : entry.rank === '2nd' ? '🥈' : '🥉'}</span>
                        <span className="text-white text-[13px] font-bold">{entry.rank}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-4 h-4 rounded-full bg-[#1e1e2e] flex items-center justify-center text-[10px]">👤</span>
                        <span className="text-[#8b8ba7] text-[12px] truncate">{entry.user}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#00d26a] text-[13px] font-medium">
                        {entry.icon === 'usd' ? (
                          <span className="w-4 h-4 rounded-full bg-[#00d26a]/20 flex items-center justify-center text-[10px]">$</span>
                        ) : (
                          <span className="w-4 h-4 rounded border border-[#8b5cf6]/50 flex items-center justify-center text-[8px]">📈</span>
                        )}
                        <span className="truncate">{entry.prize}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 h-1.5 w-full bg-[#1e1e2e] rounded-full overflow-hidden">
                  <div className="h-full bg-[#2a2a3e] w-[40%] rounded-full" />
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0f] border-t border-[#1e1e2e]">
                <div className="flex items-center gap-2 text-[#5a5a7a] text-[13px]">
                  <Trophy size={16} className="text-[#8b5cf6]" />
                  <span>-</span>
                </div>
                <a href={t.href} className="text-white text-[13px] font-medium underline hover:text-[#8b8ba7] transition-colors">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute top-0 right-0 bottom-2 w-12 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none hidden lg:block" />
      </div>
    </section>
  );
}
