"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
  sizes
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [lqipSrc, setLqipSrc] = useState<string>('');
  const imgRef = useRef<HTMLDivElement>(null);

  // Generate simple LQIP
  useEffect(() => {
    if (!src) return;
    
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) return;
        
        // Create tiny LQIP
        const size = 20;
        canvas.width = size;
        canvas.height = size;
        
        ctx.drawImage(img, 0, 0, size, size);
        setLqipSrc(canvas.toDataURL('image/jpeg', 0.1));
      } catch (error) {
        console.warn('LQIP generation failed:', error);
      }
    };
    
    img.src = src;
  }, [src]);

  // Lazy loading
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

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* LQIP Layer */}
      {lqipSrc && (
        <div
          className="absolute inset-0 transition-all ease-out"
          style={{
            opacity: isLoaded ? 0 : 1,
            transform: `scale(1.1)`,
            filter: `blur(20px)`,
            backgroundImage: `url(${lqipSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // Delayed fade out - starts after image begins loading
            transitionDelay: isLoaded ? '0ms' : '500ms',
            transitionDuration: '1000ms',
          }}
        />
      )}
      
      {/* Final Image Layer */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="absolute inset-0 transition-all ease-out"
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1)' : 'scale(1.1)',
            filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
            objectFit: 'cover',
            // Slower focus transition - blur takes longer to clear
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