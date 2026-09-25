"use client";
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PromotionBanner from './PromotionBanner';
import { promotions } from '@/data/promotions';

export default function Hero() {
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
      const scrollAmount = 520;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="w-full mb-6 lg:mb-8">
      <div className="relative group/hero">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-3 lg:gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2 -mx-1 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {promotions.map((promo) => (
            <PromotionBanner key={promo.id} promotion={promo} size="large" />
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll('left')}
          className={`absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0e0e15]/80 backdrop-blur-xl border border-[#23233a] text-white flex items-center justify-center shadow-xl opacity-0 group-hover/hero:opacity-100 transition-all hover:bg-[#1a1a27] hover:scale-105 ${!canScrollLeft ? '!hidden' : ''}`}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll('right')}
          className={`absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-[#0e0e15]/80 backdrop-blur-xl border border-[#23233a] text-white flex items-center justify-center shadow-xl opacity-0 group-hover/hero:opacity-100 transition-all hover:bg-[#1a1a27] hover:scale-105 ${!canScrollRight ? '!hidden' : ''}`}
        >
          <ChevronRight size={18} />
        </button>

        {/* Fades */}
        <div className="absolute top-0 left-0 bottom-2 w-6 bg-gradient-to-r from-[#0a0a0f] to-transparent pointer-events-none hidden lg:block" />
        <div className="absolute top-0 right-0 bottom-2 w-12 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none hidden lg:block" />
      </div>
    </section>
  );
}
