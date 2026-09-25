"use client";
import { useState } from 'react';
import { Heart, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import SafeImage from './SafeImage';
import { Game } from '@/data/games';

interface GameCardProps {
  game: Game;
  onClick?: (game: Game) => void;
  size?: 'small' | 'medium' | 'large';
  priority?: boolean;
}

function decodeHtml(str: string): string {
  if (!str) return str;
  return str
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x2F;/g, '/');
}

export default function GameCard({ game, onClick, size = 'medium', priority = false }: GameCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: "w-[132px] sm:w-[148px]",
    medium: "w-[148px] sm:w-[168px] lg:w-[184px]",
    large: "w-[168px] sm:w-[184px] lg:w-[200px]"
  };

  const displayTitle = decodeHtml(game.title);
  const displayProvider = game.provider ? decodeHtml(game.provider) : '';

  return (
    <motion.div
      className={`${sizeClasses[size]} flex-shrink-0 group cursor-pointer select-none`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
      onClick={() => onClick?.(game)}
    >
      <div className="relative aspect-[3/4.2] rounded-[12px] overflow-hidden bg-[#14141f] border border-[#1e1e2e]/50 group-hover:border-[#2a2a3e] transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.2)] group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <div 
          className="absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
          style={{ 
            border: `2px solid ${game.borderColor || '#7717ff'}`,
            boxShadow: `inset 0 0 0 1px ${game.borderColor || '#7717ff'}20, 0 0 20px ${game.borderColor || '#7717ff'}30`
          }}
        />

        <SafeImage
          image={game.image}
          alt={displayTitle}
          className="w-full h-full"
          objectFit="cover"
          fallbackType="game"
          priority={priority}
          lazy={!priority}
          quality={priority ? "medium" : "medium"}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-[0.85] group-hover:opacity-[0.9] transition-opacity" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-20">
          {game.isOriginal ? (
            <div className="bg-[#7717ff] text-white text-[9px] font-black tracking-widest px-2 py-1 rounded-full shadow-lg">
              ORIGINAL
            </div>
          ) : <div />}
          
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFavorite(!isFavorite);
              }}
              className={`w-[28px] h-[28px] rounded-full backdrop-blur-xl flex items-center justify-center transition-all border ${
                isFavorite 
                  ? 'bg-[#ff2e8b] border-[#ff2e8b] text-white shadow-[0_2px_10px_rgba(255,46,139,0.4)]' 
                  : 'bg-black/40 border-white/10 text-white/70 hover:bg-black/60 hover:text-white hover:border-white/20'
              }`}
            >
              <Heart size={13} fill={isFavorite ? "white" : "none"} className={isFavorite ? "text-white" : ""} />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            scale: isHovered ? 1 : 0.8,
            y: isHovered ? 0 : 10
          }}
          transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        >
          <div className="w-[48px] h-[48px] bg-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(0,0,0,0.4)]">
            <Play size={18} className="text-black ml-[2px]" fill="black" />
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 p-2.5 z-20">
          <h3 className="text-white font-bold text-[13px] leading-[1.2] line-clamp-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] tracking-[-0.01em]">
            {displayTitle}
          </h3>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-3 h-3 rounded-full bg-[#2a2a3e] flex items-center justify-center">
              <span className="text-[7px] font-bold text-[#8b8ba7]">{displayProvider?.[0] || 'S'}</span>
            </div>
            <p className="text-white/50 text-[11px] font-medium truncate">
              {displayProvider}
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
      </div>
    </motion.div>
  );
}
