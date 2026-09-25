"use client";
import { useState, useMemo } from 'react';
import TallGameCard from './TallGameCard';
import { Game } from '@/data/games';
import ErrorToast from './ErrorToast';
import ProvidersSection from './ProvidersSection';

interface CategoryPageProps {
  title: string;
  games: Game[];
  backHref?: string;
  seoContent?: React.ReactNode;
  showProviders?: boolean;
}

export default function CategoryPage({ title, games, backHref = "/", seoContent, showProviders = true }: CategoryPageProps) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [showSort, setShowSort] = useState(false);
  const [showProvidersDropdown, setShowProvidersDropdown] = useState(false);
  const [showCount, setShowCount] = useState(24);
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  const filteredGames = useMemo(() => {
    if (!search) return games;
    return games.filter(g => g.title.toLowerCase().includes(search.toLowerCase()) || g.provider?.toLowerCase().includes(search.toLowerCase()));
  }, [games, search]);

  const sortedGames = useMemo(() => {
    const copy = [...filteredGames];
    if (sortBy === "Most Popular") {
      return copy.sort(() => 0.5 - Math.random()).slice().sort((a,b) => a.title.localeCompare(b.title));
    }
    if (sortBy === "Random") {
      return copy.sort(() => Math.random() - 0.5);
    }
    if (sortBy === "Recently Added") {
      return [...copy].reverse();
    }
    return copy;
  }, [filteredGames, sortBy]);

  const visibleGames = sortedGames.slice(0, showCount);

  const handleShowMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setShowCount(prev => prev + 24);
      setIsLoadingMore(false);
    }, 600);
  };

  return (
    <div className="LayoutContainer_root w-full">
      {/* BrowsingGames header with back */}
      <div className="BrowsingGames_header flex items-center gap-3 mb-6">
        <a href={backHref} className="w-8 h-8 bg-[#14141f] border border-[#1e1e2e] rounded-[8px] flex items-center justify-center text-[#8b8ba7] hover:text-white hover:border-[#2a2a3e] transition-colors">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
        <h1 className="text-white font-bold text-[22px] tracking-tight">{title}</h1>
      </div>

      {/* GamesToolbar - exact class names */}
      <div className="GamesToolbar_root__p2z4n Flex_root__yC03I Flex_wide__e2p5K Flex_spaced__3mPSv flex flex-col lg:flex-row gap-3 justify-between items-stretch lg:items-center mb-6 w-full">
        <div className="GamesToolbar_searchInputWrapper__v8c9x flex-1 lg:max-w-[360px]">
          <div className="SearchInput_root__qX5pP relative w-full">
            <div className="SearchInput_iconWrapper__a1b2c absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <img src="/icons/search.svg" alt="search" width="16" height="16" className="w-4 h-4 opacity-60" />
            </div>
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="SearchInput_input__d4e5f w-full h-[40px] bg-[#14141f] border border-[#1e1e2e] rounded-[10px] pl-10 pr-4 text-[13px] text-white placeholder-[#5a5a7a] focus:outline-none focus:border-[#2a2a3e] focus:bg-[#1a1a27] transition-colors"
            />
          </div>
        </div>

        <div className="GamesToolbar_filtersWrapper__x3y2z flex gap-3 items-center">
          {/* All Providers dropdown - SelectMultiple */}
          <div className="SelectMultiple_root__m9n8b relative">
            <button onClick={() => setShowProvidersDropdown(!showProvidersDropdown)} className="SelectMultiple_button__k2l3m flex items-center justify-between gap-3 h-[40px] px-4 bg-[#14141f] border border-[#1e1e2e] rounded-[10px] text-[13px] text-[#8b8ba7] hover:text-white hover:border-[#2a2a3e] transition-colors min-w-[160px]">
              <span>All Providers</span>
              <img src="/icons/chevron.svg" alt="chevron" width="16" height="16" className={`w-4 h-4 transition-transform ${showProvidersDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showProvidersDropdown && (
              <div className="SelectMultiple_dropdown__p9q8r absolute top-full mt-2 left-0 w-[220px] bg-[#1e1e2e] border border-[#2a2a3e] rounded-[10px] shadow-xl z-30 overflow-hidden p-2">
                <div className="text-[11px] text-[#5a5a7a] px-2 py-1.5 uppercase tracking-wider">Providers</div>
                <button onClick={() => { setShowProvidersDropdown(false); showError("Providers filter"); }} className="w-full text-left px-3 py-2 text-[13px] text-white bg-[#2a2a3e] rounded-[6px]">All Providers</button>
                <div className="mt-1 space-y-0.5 max-h-[200px] overflow-auto">
                  {["Pragmatic Play","Evolution","Hacksaw","Nolimit City","Shuffle Games","Relax Gaming"].map(p => (
                    <button key={p} onClick={() => { setShowProvidersDropdown(false); showError(p); }} className="w-full text-left px-3 py-2 text-[13px] text-[#8b8ba7] hover:text-white hover:bg-[#2a2a3e] rounded-[6px] transition-colors">{p}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort by - Select */}
          <div className="Select_root__a1s2d relative">
            <div className="Select_formWrapper__b3c4d flex items-center gap-2">
              <span className="text-[13px] text-[#5a5a7a] hidden lg:block">Sort by:</span>
              <button onClick={() => setShowSort(!showSort)} className="Select_button__c5d6e flex items-center gap-2 h-[40px] px-4 bg-[#14141f] border border-[#1e1e2e] rounded-[10px] text-[13px] text-white hover:border-[#2a2a3e] transition-colors min-w-[160px] justify-between">
                <span className="font-medium">{sortBy}</span>
                <img src="/icons/chevron.svg" alt="chevron" width="16" height="16" className={`w-4 h-4 transition-transform ${showSort ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {showSort && (
              <div className="Select_dropdown__e7f8g absolute top-full mt-2 right-0 w-[180px] bg-[#1e1e2e] border border-[#2a2a3e] rounded-[10px] shadow-xl z-30 overflow-hidden">
                {["Featured","Most Popular","Recently Added","Random"].map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setShowSort(false); }}
                    className={`w-full text-left px-4 py-2.5 text-[13px] hover:bg-[#2a2a3e] transition-colors ${sortBy === opt ? 'text-white bg-[#2a2a3e]' : 'text-[#8b8ba7]'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CardGrid - exact class names */}
      <div className="CardGrid_cardGridWrapper__x9y8z w-full">
        <div className="CardGrid_cardGrid__a1b2c grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 lg:gap-4">
          {visibleGames.map((game) => (
            <div key={game.id} className="CardGrid_cardGridElement__p3q4r">
              <TallGameCard game={game} onClick={(g) => showError(g.title)} />
            </div>
          ))}
        </div>

        {/* Displaying count */}
        <div className="mt-6 flex items-center justify-between text-[12px] text-[#5a5a7a]">
          <span>Displaying {visibleGames.length} of {filteredGames.length} games</span>
          {search && <span>Search: &quot;{search}&quot;</span>}
        </div>

        {/* ShowMoreBackground */}
        {filteredGames.length > showCount && (
          <div className="ShowMoreBackground_root__m4n5o relative mt-8">
            <div className="CardGrid_background__z1x2c absolute inset-x-0 -top-20 h-[120px] bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/90 to-transparent pointer-events-none" />
            <div className="flex justify-center relative z-10 pt-2">
              <button
                onClick={handleShowMore}
                disabled={isLoadingMore}
                className="ShowMore_button__a3b4c group flex items-center gap-2.5 h-[44px] px-7 bg-[#14141f] border border-[#1e1e2e] rounded-full text-white text-[13px] font-bold hover:bg-[#1e1e2e] hover:border-[#2a2a3e] transition-all disabled:opacity-60"
              >
                {isLoadingMore ? (
                  <>
                    <span className="CircularLoadingIndicator_root__c1d2e w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Show More</span>
                    <img src="/icons/chevron.svg" alt="chevron" width="16" height="16" className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#5a5a7a] text-[14px]">No games found for &quot;{search}&quot;</p>
          </div>
        )}
      </div>

      {showProviders && (
        <div className="mt-12 border-t border-[#1e1e2e]/60 pt-10">
          <ProvidersSection />
        </div>
      )}

      {seoContent && (
        <div className="mt-12 border-t border-[#1e1e2e]/60 pt-8">
          {seoContent}
        </div>
      )}

      <ErrorToast message={errorMessage} isVisible={errorVisible} onClose={() => setErrorVisible(false)} />
    </div>
  );
}
