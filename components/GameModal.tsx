"use client";
import { X, Heart, Play, ExternalLink, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeImage from './SafeImage';
import { Game } from '@/data/games';

interface GameModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GameModal({ game, isOpen, onClose }: GameModalProps) {
  if (!game) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div className="bg-[#1a1a27] border border-[#2a2a3e] rounded-2xl max-w-[480px] w-full overflow-hidden shadow-2xl">
              <div className="relative h-[320px]">
                <SafeImage image={game.image} alt={game.title} className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a27] via-[#1a1a27]/50 to-transparent" />
                
                <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/80">
                  <X size={18} />
                </button>

                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-white text-2xl font-bold mb-1">{game.title}</h2>
                  <p className="text-white/70 text-sm">{game.provider}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex gap-3 mb-6">
                  <button className="flex-1 bg-[#7717ff] text-white rounded-xl py-3 font-semibold flex items-center justify-center gap-2 hover:bg-[#8b3dff] transition-colors">
                    <Play size={18} fill="white" />
                    Play Now
                  </button>
                  <button className="w-12 h-12 bg-[#2a2a3e] rounded-xl flex items-center justify-center text-white hover:bg-[#3a3a4e] transition-colors">
                    <Heart size={18} />
                  </button>
                  <button className="w-12 h-12 bg-[#2a2a3e] rounded-xl flex items-center justify-center text-white hover:bg-[#3a3a4e] transition-colors">
                    <Info size={18} />
                  </button>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#8b8ba7]">Provider</span>
                    <span className="text-white font-medium">{game.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b8ba7]">RTP</span>
                    <span className="text-white font-medium">96.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8b8ba7]">Volatility</span>
                    <span className="text-white font-medium">High</span>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-[#7717ff]/10 border border-[#7717ff]/20 rounded-xl">
                  <p className="text-[#b48aff] text-xs leading-relaxed">
                    This is a demo preview. No real gambling functionality. UI recreation only.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
