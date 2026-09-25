"use client";
import { useState, useEffect, useRef } from 'react';

export interface ImageSource {
  primary: string;
  alternate?: string;
  local?: string;
  fallback: string;
}

interface SafeImageProps {
  image: string | ImageSource;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill';
  lazy?: boolean;
  fallbackType?: 'game' | 'promotion' | 'logo' | 'avatar';
  style?: React.CSSProperties;
  priority?: boolean;
  quality?: 'low' | 'medium' | 'high' | 'original';
}

const fallbackMap = {
  game: "/assets/fallbacks/game.webp",
  promotion: "/assets/fallbacks/promotion.webp",
  logo: "/assets/fallbacks/logo.webp",
  avatar: "/assets/fallbacks/avatar.webp",
};

function buildImgixUrl(url: string, opts: { w?: number; h?: number; q?: number; auto?: string; fm?: string }): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    // Remove existing params we will override
    if (opts.w) u.searchParams.set('w', String(opts.w));
    if (opts.h) u.searchParams.set('h', String(opts.h));
    if (opts.q) u.searchParams.set('q', String(opts.q));
    if (opts.auto) u.searchParams.set('auto', opts.auto);
    if (opts.fm) u.searchParams.set('fm', opts.fm);
    // For game cards, ensure fit crop
    if (opts.w && !u.searchParams.has('fit')) {
      // only set fit if h also set
      if (opts.h) u.searchParams.set('fit', 'crop');
    }
    return u.toString();
  } catch {
    // fallback string manipulation
    return url;
  }
}

function optimizeUrl(url: string, quality: SafeImageProps['quality'] = 'medium'): string {
  if (!url) return url;
  if (quality === 'original') return url;
  
  try {
    if (url.includes('imgix.net')) {
      if (quality === 'high') {
        // Highest quality for banners and important images
        return buildImgixUrl(url, { w: 800, q: 90, auto: 'format,compress', fm: 'webp' });
      } else if (quality === 'medium') {
        // Balanced for game cards - fast but good quality
        return buildImgixUrl(url, { w: 400, h: 540, q: 75, auto: 'format,compress', fm: 'webp' });
      } else {
        // low - smallest
        return buildImgixUrl(url, { w: 300, q: 65, auto: 'format,compress', fm: 'webp' });
      }
    }
    if (url.includes('ctfassets.net')) {
      if (quality === 'high') {
        // Highest quality - original or large webp
        const u = new URL(url);
        u.searchParams.set('w', '1200');
        u.searchParams.set('q', '90');
        u.searchParams.set('fm', 'webp');
        return u.toString();
      } else {
        const u = new URL(url);
        u.searchParams.set('w', quality === 'medium' ? '600' : '400');
        u.searchParams.set('q', quality === 'medium' ? '75' : '65');
        u.searchParams.set('fm', 'webp');
        return u.toString();
      }
    }
    return url;
  } catch {
    return url;
  }
}

export default function SafeImage({
  image,
  alt,
  className = "",
  width,
  height,
  objectFit = 'cover',
  lazy = true,
  fallbackType = 'game',
  style,
  priority = false,
  quality = 'medium'
}: SafeImageProps) {
  const getSources = (): string[] => {
    if (typeof image === 'string') {
      const q = quality === 'high' ? 'high' : quality;
      if (image.includes('ctfassets.net') || image.includes('imgix.net')) {
        return [optimizeUrl(image, q as any), image, fallbackMap[fallbackType]];
      }
      return [image, fallbackMap[fallbackType]];
    }
    
    const sources: string[] = [];
    const q = quality;
    
    // For high quality (banners), use primary high quality first
    if (q === 'high' || q === 'original') {
      if (image.primary) {
        sources.push(q === 'original' ? image.primary : optimizeUrl(image.primary, 'high'));
        // also try alternate high
        if (image.alternate) sources.push(optimizeUrl(image.alternate, 'high'));
      }
      if (image.local) sources.push(image.local);
      sources.push(image.fallback || fallbackMap[fallbackType]);
      return sources.filter(Boolean);
    }
    
    // For game images - fast path: optimized alternate first (640 -> 400), then optimized primary
    if (image.alternate) {
      sources.push(optimizeUrl(image.alternate, 'medium'));
    }
    if (image.primary) {
      sources.push(optimizeUrl(image.primary, 'medium'));
      // Fallback to original primary if optimized fails
      sources.push(image.primary);
    }
    if (image.local) sources.push(image.local);
    sources.push(image.fallback || fallbackMap[fallbackType]);
    
    return sources.filter(Boolean);
  };

  const sources = getSources();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentSrc = sources[currentIndex] || fallbackMap[fallbackType];

  const handleError = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (currentIndex < sources.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsLoading(true);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsLoading(false);
  };

  useEffect(() => {
    setCurrentIndex(0);
    setIsLoading(true);
    setHasError(false);
  }, [typeof image === 'string' ? image : image.primary]);

  // Faster timeout for game images, longer for high quality banners
  useEffect(() => {
    if (isLoading && currentIndex < sources.length) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      const timeout = quality === 'high' || quality === 'original' ? 4000 : 1500;
      timeoutRef.current = setTimeout(() => {
        handleError();
      }, timeout);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, isLoading, quality]);

  if (hasError && currentIndex >= sources.length - 1) {
    return (
      <div
        className={`bg-[#14141f] flex items-center justify-center ${className}`}
        style={{
          width: width ? `${width}px` : '100%',
          height: height ? `${height}px` : '100%',
          aspectRatio: width && height ? `${width}/${height}` : undefined,
          borderRadius: 'inherit',
          ...style
        }}
      >
        <span className="text-[#5a5a7a] text-[10px] font-bold uppercase tracking-wider">
          {alt.slice(0, 12)}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#14141f] animate-pulse" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : lazy ? "lazy" : "eager"}
        decoding={priority ? "sync" : "async"}
        // @ts-ignore
        fetchPriority={priority ? "high" : "auto"}
        onError={handleError}
        onLoad={handleLoad}
        className={`w-full h-full transition-opacity duration-200 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ objectFit }}
      />
    </div>
  );
}
