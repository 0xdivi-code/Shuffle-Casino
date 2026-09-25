"use client";
import { Game } from '@/data/games';

interface TallGameCardProps {
  game: Game;
  onClick?: (game: Game) => void;
}

function hexToRgb(hex: string): string {
  const h = hex.replace('#','').trim();
  if (h.length === 3) {
    const r = parseInt(h[0]+h[0],16);
    const g = parseInt(h[1]+h[1],16);
    const b = parseInt(h[2]+h[2],16);
    return `${r},${g},${b}`;
  }
  if (h.length >=6) {
    const r = parseInt(h.substring(0,2),16);
    const g = parseInt(h.substring(2,4),16);
    const b = parseInt(h.substring(4,6),16);
    return `${r},${g},${b}`;
  }
  return "119,23,255";
}

function getImageIdFromGame(game: Game): string | null {
  const primary = game.image.primary || '';
  const match = primary.match(/shuffle-com\.imgix\.net\/([^?]+)/);
  if (match) return match[1];
  return null;
}

function buildSrcSet(imageId: string): string {
  const widths = [32,64,96,128,256,384,640,750,828,1080,1200,1920,2048,3840];
  return widths.map(w => `https://shuffle-com.imgix.net/${imageId}?auto=format&width=${w} ${w}w`).join(', ');
}

export default function TallGameCard({ game, onClick }: TallGameCardProps) {
  const borderHex = game.borderColor || '#7717ff';
  const rgb = hexToRgb(borderHex);
  const imageId = getImageIdFromGame(game);
  const srcSet = imageId ? buildSrcSet(imageId) : undefined;
  const src = imageId ? `https://shuffle-com.imgix.net/${imageId}?auto=format&width=3840` : game.image.fallback;

  return (
    <div className="TallGameCard_root__3v8oD group relative w-full aspect-[3/4] cursor-pointer select-none rounded-[12px] overflow-hidden bg-[#14141f]" data-testid="game-card" style={{ cursor: 'pointer' }} onClick={() => onClick?.(game)}>
      {/* Skeleton wrapper - original structure */}
      <div className="TallGameCard_skeletonWrapper__2h6eU absolute inset-0 z-0">
        <div style={{ ["--skeleton-color" as any]: borderHex } as React.CSSProperties} className="SkeletonPlaceholder_root__XG1OL SkeletonPlaceholder_imageVariant__yB1vX SkeletonPlaceholder_hasColor__m7Xq1 TallGameCard_skeletonClassName__p6b2x absolute inset-0 rounded-[12px] overflow-hidden bg-[#1a1a27]">
          <div className="SkeletonPlaceholder_placeholder__z4z8U w-full h-full animate-pulse" style={{ background: `linear-gradient(90deg, ${borderHex}15 25%, ${borderHex}25 50%, ${borderHex}15 75%)`, backgroundSize: '200% 100%' }}></div>
        </div>
      </div>

      {/* GameCardBorder with colored border 2px solid rgb(...) */}
      <div style={{ border: `2px solid rgb(${rgb})` } as React.CSSProperties} className="GameCardBorder_root__qX5pP absolute inset-0 rounded-[12px] overflow-hidden z-10 transition-all duration-200 group-hover:shadow-[0_0_20px_rgba(var(--tw-shadow-color),0.3)]">
        {/* buttonGroup - game-popup.svg */}
        <div className="GameCardBorder_buttonGroup__r4s2d absolute top-2 right-2 z-20 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button type="button" className="GameCardBorder_button__k7a9m GameCardBorder_showOnHover__m2n4p GameCardBorder_squareButton__x8y3z w-7 h-7 bg-black/70 backdrop-blur-md border border-white/10 rounded-[8px] flex items-center justify-center hover:bg-black/90 hover:border-white/20 transition-colors" onClick={(e) => { e.stopPropagation(); onClick?.(game); }}>
            <img alt="game popup" loading="lazy" width="16" height="16" src="/icons/game-popup.svg" className="w-4 h-4" />
          </button>
        </div>

        {/* Actual game image - fill */}
        <img
          alt={game.title}
          loading="lazy"
          decoding="async"
          data-nimg="fill"
          sizes="180px"
          srcSet={srcSet}
          src={src}
          style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', objectFit: 'cover', color: 'transparent' } as React.CSSProperties}
          className="w-full h-full object-cover"
        />

        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
      </div>
    </div>
  );
}
