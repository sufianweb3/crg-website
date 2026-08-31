"use client";

import { useEffect, useRef, useState } from "react";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

interface HeroProps {
  videoSrc: string;
  posterSrc: string;
}

export function Hero({ videoSrc, posterSrc = "/assets/hero/poster.svg" }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => setVideoLoaded(true);
    video.addEventListener("canplay", handleCanPlay);
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" aria-labelledby="hero-title">
      {!prefersReducedMotion ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ backgroundImage: `url(${posterSrc})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-peach-black/80 via-transparent to-transparent" aria-hidden="true" />

      <div className="relative z-20 w-full section-container section-padding pt-32 pb-20" role="main">
        <StaggerReveal delay={0} duration={400} tag="div" className="max-w-3xl">
          <h1
            id="hero-title"
            className="text-[clamp(40px,8vw,104px)] font-bold leading-[1.1] text-azure-mist tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Where Fashion Come to Life
          </h1>
        </StaggerReveal>

        <StaggerReveal delay={80} duration={400} tag="div" className="max-w-2xl mt-8">
          <p className="text-[clamp(16px,2vw,24px)] font-normal leading-[1.5] text-azure-mist/90">
            From concept and sampling to premium production and global delivery, we partner with fashion brands worldwide to transform ideas into collections crafted with precision, consistency, and confidence.
          </p>
        </StaggerReveal>

        <StaggerReveal delay={160} duration={400} tag="div" className="mt-12">
          <a
            href="/get-quote"
            className="btn-primary inline-flex items-center justify-center"
          >
            Get Your Quote
          </a>
        </StaggerReveal>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 text-azure-mist/60 font-mono text-xs uppercase tracking-wider">
        <span className="w-24 h-px bg-azure-mist/30" aria-hidden="true" />
        <span>Scroll</span>
        <svg className="w-4 h-4" style={{ animation: "scrollIndicator 2s ease-in-out infinite" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>

      <style jsx>{`
        @keyframes scrollIndicator {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </section>
  );
}