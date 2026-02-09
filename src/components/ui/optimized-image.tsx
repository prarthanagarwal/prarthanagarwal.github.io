"use client";

import { useState, useRef, useEffect } from 'react';

interface ImageVariant {
  src: string;
  width: number;
}

interface OptimizedImageProps {
  /** Primary image source (largest/default variant) */
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  /**
   * Responsive variants for srcSet generation.
   * Provide smaller versions so mobile users download less data.
   * Example: [{ src: '/img-480w.avif', width: 480 }, { src: '/img-800w.avif', width: 800 }]
   */
  variants?: ImageVariant[];
  /**
   * Sizes attribute for responsive images.
   * Tells the browser how wide the image will be at each breakpoint.
   * Example: "(max-width: 768px) 100vw, 900px"
   */
  sizes?: string;
  /**
   * When true, the container becomes responsive (width: 100%, height: auto)
   * instead of using fixed pixel dimensions.
   */
  responsive?: boolean;
  maxHeight?: string;
  /** Object-fit mode. Defaults to "cover". */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = "",
  containerClassName = "",
  priority = false,
  variants,
  sizes,
  responsive = false,
  maxHeight,
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [lqipSrc, setLqipSrc] = useState<string>('');
  const imgRef = useRef<HTMLDivElement>(null);

  // Generate simple LQIP via canvas (tiny blurred placeholder)
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

    // For LQIP, always load the smallest variant if available
    img.src = variants && variants.length > 0
      ? variants.reduce((a, b) => a.width < b.width ? a : b).src
      : src;
  }, [src, variants]);

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
      { rootMargin: '200px', threshold: 0.01 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Build srcSet from variants + the original src
  const srcSet = variants && variants.length > 0
    ? [...variants, { src, width }]
        .sort((a, b) => a.width - b.width)
        .map(v => `${v.src} ${v.width}w`)
        .join(', ')
    : undefined;

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

      {/* Full image layer — native <img> with srcSet for responsive loading.
          Uses "blur down" technique: starts blurred + scaled (matching LQIP)
          then deblurs + scales back to normal on load. */}
      {isInView && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          className={`absolute inset-0 w-full h-full transition-all ease-out ${className}`}
          style={{
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'scale(1)' : 'scale(1.1)',
            filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
            objectFit,
            transitionDuration: '1200ms',
            transitionDelay: isLoaded ? '0ms' : '500ms',
          }}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
}
