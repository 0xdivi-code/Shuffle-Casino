"use client";
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Gem } from 'lucide-react';
import GameCard from './GameCard';
import { Game } from '@/data/games';

interface GameCarouselProps {
  title: string;
  games: Game[];
  icon?: string;
  href?: string;
  showViewAll?: boolean;
  onGameClick?: (game: Game) => void;
  priority?: boolean;
}

export default function GameCarousel({ title, games, icon, href, showViewAll = true, onGameClick, priority = false }: GameCarouselProps) {
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
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  const handleGameClick = (game: Game) => {
    if (onGameClick) {
      onGameClick(game);
    }
  };

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-6 h-6 rounded-lg bg-[#1e1e2e] flex items-center justify-center">
              <Gem size={14} className="text-[#7717ff]" />
            </div>
          )}
          <h2 className="text-white font-bold text-[18px] sm:text-[20px] tracking-tight" style={{ fontFamily: 'Aeonik' }}>{title}</h2>
        </div>

        <div className="flex items-center gap-2">
          {showViewAll && href && (
            <a href={href} className="text-[#8b8ba7] hover:text-white text-sm font-medium transition-colors px-3 py-1.5 rounded-lg hover:bg-[#1e1e2e]">
              View all
            </a>
          )}
          <div className="flex items-center gap-1">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                canScrollLeft ? 'bg-[#1e1e2e] text-white hover:bg-[#2a2a3e]' : 'bg-[#1a1a27] text-[#5a5a7a] cursor-not-allowed'
              }`}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                canScrollRight ? 'bg-[#1e1e2e] text-white hover:bg-[#2a2a3e]' : 'bg-[#1a1a27] text-[#5a5a7a] cursor-not-allowed'
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {games.map((game, idx) => (
            <GameCard key={game.id} game={game} onClick={handleGameClick} priority={priority && idx < 6} />
          ))}
          
          {showViewAll && (
            <a
              href={href}
              onClick={(e) => {
                e.preventDefault();
                if (onGameClick) {
                  onGameClick({ id: 'view-all', title: title } as Game);
                }
              }}
              className="w-[160px] sm:w-[180px] lg:w-[200px] flex-shrink-0 aspect-[3/4] rounded-[12px] bg-[#1a1a27] border border-[#2a2a3e] border-dashed flex flex-col items-center justify-center gap-3 hover:bg-[#1e1e2e] hover:border-[#7717ff]/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-[#2a2a3e] group-hover:bg-[#7717ff] flex items-center justify-center transition-colors">
                <ChevronRight size={20} className="text-white" />
              </div>
              <span className="text-[#8b8ba7] group-hover:text-white text-sm font-medium transition-colors">View all</span>
              <span className="text-[#5a5a7a] text-xs">{games.length}+ games</span>
            </a>
          )}
        </div>

        <div className="absolute top-0 right-0 bottom-2 w-12 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none hidden sm:block" />
      </div>
    </section>
  );
}
