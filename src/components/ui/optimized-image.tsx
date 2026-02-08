"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  /**
   * When true, the container becomes responsive (width: 100%, height: auto)
   * instead of using fixed pixel dimensions.
   */
  responsive?: boolean;
  maxHeight?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  containerClassName = "",
  priority = false,
  sizes,
  responsive = false,
  maxHeight,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [lqipSrc, setLqipSrc] = useState<string>('');
  const imgRef = useRef<HTMLDivElement>(null);

  // Generate simple LQIP via canvas
  useEffect(() => {
    if (!src) return;

    const img = new window.Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        // Tiny LQIP – preserving aspect ratio
        const aspect = img.naturalWidth / img.naturalHeight;
        const lqipW = 20;
        const lqipH = Math.round(lqipW / aspect);
        canvas.width = lqipW;
        canvas.height = lqipH;

        ctx.drawImage(img, 0, 0, lqipW, lqipH);
        setLqipSrc(canvas.toDataURL('image/jpeg', 0.1));
      } catch (error) {
        console.warn('LQIP generation failed:', error);
      }
    };

    img.src = src;
  }, [src]);

  // Intersection-based lazy loading
  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Container style: responsive vs fixed
  const containerStyle: React.CSSProperties = responsive
    ? {
        width: '100%',
        aspectRatio: `${width} / ${height}`,
        ...(maxHeight ? { maxHeight } : {}),
      }
    : { width, height };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${containerClassName}`}
      style={containerStyle}
    >
      {/* LQIP placeholder layer — always blurred */}
      {lqipSrc && (
        <div
          className="absolute inset-0 transition-all ease-out"
          style={{
            opacity: isLoaded ? 0 : 1,
            transform: 'scale(1.1)',
            filter: 'blur(20px)',
            backgroundImage: `url(${lqipSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transitionDelay: isLoaded ? '0ms' : '500ms',
            transitionDuration: '1000ms',
          }}
        />
      )}

      {/* Full image layer — "blur down" technique:
          starts blurred + scaled (matching LQIP) then
          deblurs + scales back to normal on load */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`absolute inset-0 w-full h-full transition-all ease-out ${className}`}
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1)' : 'scale(1.1)',
            filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
            objectFit: 'cover',
            transitionDuration: '1200ms',
            transitionDelay: isLoaded ? '0ms' : '500ms',
          }}
          priority={priority}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
