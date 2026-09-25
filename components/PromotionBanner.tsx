"use client";
import { motion } from 'framer-motion';
import { Promotion } from '@/data/promotions';
import SafeImage from './SafeImage';

interface PromotionBannerProps {
  promotion: Promotion;
  size?: 'large' | 'medium' | 'small';
}

export default function PromotionBanner({ promotion, size = 'large' }: PromotionBannerProps) {
  const sizeClasses = {
    large: "h-[180px] sm:h-[200px] lg:h-[240px] w-[320px] sm:w-[380px] lg:w-[460px]",
    medium: "h-[160px] sm:h-[180px] w-[300px] sm:w-[340px]",
    small: "h-[140px] w-[260px] sm:w-[300px]"
  };

  return (
    <motion.a
      href={promotion.href}
      className={`${sizeClasses[size]} flex-shrink-0 relative rounded-[14px] lg:rounded-[16px] overflow-hidden group cursor-pointer block bg-[#14141f] border border-[#1e1e2e]/50 hover:border-[#2a2a3e] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.5)]`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
    >
      <SafeImage
        image={promotion.image}
        alt={promotion.alt}
        className="w-full h-full"
        objectFit="cover"
        priority={true}
        lazy={false}
        quality="original"
        fallbackType="promotion"
      />
      
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      
      {/* Shine */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />

      {/* Border glow on hover */}
      <div className="absolute inset-0 rounded-[14px] lg:rounded-[16px] border border-white/0 group-hover:border-white/10 transition-colors pointer-events-none" />
    </motion.a>
  );
}
