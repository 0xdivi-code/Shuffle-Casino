"use client";
import { useRef, useState } from 'react';
import { providers } from '@/data/providers';

export default function ProvidersSection() {
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
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -400 : 400,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  const buildSrcSet = (imageId: string) => {
    const widths = [256, 384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840];
    return widths.map(w => `https://shuffle-com.imgix.net/${imageId}?auto=format&width=${w} ${w}w`).join(', ');
  };

  return (
    <section className="w-full">
      <div className="Flex_root__yC03I Flex_spaced__3mPSv flex items-center justify-between mb-4">
        <h3 className="Heading_root__Z7xp1 Heading_h3__GvMSB CarouselHeader_heading__9V3Z6">
          <a className="TextLink_root__BkJn5 flex items-center gap-2.5 text-white hover:text-[#8b8ba7] transition-colors group" href="/casino/providers">
            <img alt="provider" className="ProviderCarousel_headingIcon__qC0pj w-5 h-5 opacity-80 group-hover:opacity-100" src="/icons/provider.svg" />
            <span className="font-bold text-[18px] lg:text-[20px] tracking-tight">Providers</span>
          </a>
        </h3>
        <div className="Flex_root__yC03I Flex_sm4__Nmuif Flex_center__D8twJ flex items-center gap-1.5">
          <button disabled={!canScrollLeft} onClick={() => scroll('left')} aria-label="scroll left" className={`CarouselHeader_navButton__abEBj w-8 h-8 rounded-full border flex items-center justify-center transition-all ${canScrollLeft ? 'bg-[#14141f] border-[#1e1e2e] text-white hover:bg-[#1a1a27]' : 'bg-[#0e0e15] border-[#1e1e2e]/50 text-[#5a5a7a] opacity-50 cursor-not-allowed'}`} type="button">
            <img className="CarouselHeader_leftArrow__8nu6Q w-4 h-4 rotate-90" width="16" height="16" alt="arrow left" src="/icons/chevron.svg" />
          </button>
          <button disabled={!canScrollRight} onClick={() => scroll('right')} aria-label="scroll right" className={`CarouselHeader_navButton__abEBj w-8 h-8 rounded-full border flex items-center justify-center transition-all ${canScrollRight ? 'bg-[#14141f] border-[#1e1e2e] text-white hover:bg-[#1a1a27]' : 'bg-[#0e0e15] border-[#1e1e2e]/50 text-[#5a5a7a] opacity-50 cursor-not-allowed'}`} type="button">
            <img className="CarouselHeader_rightArrow__MR197 w-4 h-4 -rotate-90" width="16" height="16" alt="arrow right" src="/icons/chevron.svg" />
          </button>
        </div>
      </div>

      <div className="Carousel_swipeContent__khffe relative group/carousel">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="CarouselSwipeContent_root__fR4aj flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-2 -mx-1 px-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {providers.map((provider) => (
            <div key={provider.id} className="ProviderCard_ProviderCardWrapper__iGp3_ flex-shrink-0" style={{ cursor: 'pointer' }}>
              <a href={provider.href} className="block">
                <div className="ProviderCard_providerCardBlock__Xa7vt w-[148px] lg:w-[160px] h-[88px] lg:h-[92px] bg-[#14141f] border border-[#1e1e2e] rounded-[12px] flex items-center justify-center p-3 hover:bg-[#1a1a27] hover:border-[#2a2a3e] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all">
                  <div className="ProviderCard_providerCardElement__isOHN relative w-full h-full">
                    <img
                      alt={provider.name}
                      loading="lazy"
                      decoding="async"
                      data-nimg="fill"
                      sizes="(max-width: 600px) 30vw, (max-width: 992px) 25vw, 260px"
                      srcSet={buildSrcSet(provider.imageId)}
                      src={`https://shuffle-com.imgix.net/${provider.imageId}?auto=format&width=3840`}
                      style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'contain', color: 'transparent' }}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
        <button type="button" aria-label="Scroll to the right" className="Carousel_carouselFade__sQ5Du absolute top-0 right-0 bottom-2 w-12 bg-gradient-to-l from-[#0a0a0f] to-transparent pointer-events-none hidden lg:block"></button>
      </div>
    </section>
  );
}
