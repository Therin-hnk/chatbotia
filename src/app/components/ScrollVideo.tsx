'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';

interface TextElement {
  text: string;
  subtitle?: string;
  startProgress: number;
  endProgress: number;
}

export default function PremiumScrollVideo({
  videoUrl = "https://assets.mixkit.co/videos/preview/mixkit-abstract-waves-of-light-31433-large.mp4",
  textElements,
  scrollSpeed = 1
}: { videoUrl?: string, textElements: TextElement[], scrollSpeed?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    let targetTime = 0;
    let animationFrameId: number;

    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const smoothVideoUpdate = () => {
      if (video.duration) {
        // Interpolation fluide pour éviter les saccades de la vidéo
        const diff = targetTime - video.currentTime;
        if (Math.abs(diff) > 0.001) {
          video.currentTime = lerp(video.currentTime, targetTime, 0.1);
        }
      }
      animationFrameId = requestAnimationFrame(smoothVideoUpdate);
    };

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, (currentScroll / totalScrollable) * scrollSpeed));
      
      setScrollProgress(progress);
      if (video.duration) {
        targetTime = progress * video.duration;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrameId = requestAnimationFrame(smoothVideoUpdate);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollSpeed]);

  return (
    <div ref={containerRef} className="relative w-full bg-black" style={{ height: '600vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* Vidéo avec effet de profondeur */}
        <video
          ref={videoRef}
          src={videoUrl}
          className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
          muted
          playsInline
          preload="auto"
        />

        {/* Overlays Cinématiques */}
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-black/40" />

        {/* Layout du texte */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-10 flex flex-col justify-center">
          {textElements.map((el, i) => {
            // Calcul de l'animation locale
            const isVisible = scrollProgress >= el.startProgress && scrollProgress <= el.endProgress;
            const midPoint = (el.startProgress + el.endProgress) / 2;
            const distance = Math.abs(scrollProgress - midPoint);
            const range = (el.endProgress - el.startProgress) / 2;
            
            // Opacité et transformation basées sur la proximité du centre
            const opacity = isVisible ? Math.pow(1 - distance / range, 2) : 0;
            const translateY = isVisible ? (scrollProgress - midPoint) * 100 : 50;
            const blur = isVisible ? Math.abs(scrollProgress - midPoint) * 40 : 20;

            return (
              <div
                key={i}
                className="absolute left-10 right-10 transition-all duration-300 ease-out"
                style={{
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  filter: `blur(${blur}px)`,
                  pointerEvents: isVisible ? 'auto' : 'none'
                }}
              >
                <div className="space-y-6">
                  <h2 className="text-white/60 text-sm font-bold tracking-[0.4em] uppercase">
                    Perspective {i + 1}
                  </h2>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none">
                    {el.text}
                  </h1>
                  {el.subtitle && (
                    <p className="max-w-xl text-xl md:text-2xl text-white/50 font-medium leading-tight">
                      {el.subtitle}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicateur de progression latéral (Style Apple Watch/Health) */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
          {textElements.map((_, i) => (
            <div 
              key={i}
              className={`h-1 w-8 transition-all duration-500 rounded-full ${
                scrollProgress >= _.startProgress && scrollProgress <= _.endProgress 
                ? 'bg-white w-12' 
                : 'bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator discret en bas */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
           <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </div>
    </div>
  );
}