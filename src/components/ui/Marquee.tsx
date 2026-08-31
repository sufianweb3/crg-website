"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  items: Array<{ src: string; alt: string; width?: number; height?: number }>;
  speed?: number;
  paused?: boolean;
  direction?: "left" | "right";
  className?: string;
  itemClassName?: string;
}

export function Marquee({
  items,
  speed = 50,
  paused = false,
  direction = "left",
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const updateDimensions = () => {
      setContainerWidth(container.offsetWidth);
      setTrackWidth(track.scrollWidth);
    };

    updateDimensions();
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(container);
    resizeObserver.observe(track);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (trackWidth === 0 || containerWidth === 0) return;

    const track = trackRef.current;
    if (!track) return;

    const distance = trackWidth;
    const duration = (distance / speed) * 1000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      if (paused || isHovered) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;
      const translateX = direction === "left" ? -progress * distance : progress * distance;

      track.style.transform = `translateX(${translateX}px)`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trackWidth, containerWidth, speed, paused, direction, isHovered]);

  const renderItems = () => {
    if (trackWidth <= containerWidth) return items;

    const repeatCount = Math.ceil(containerWidth / trackWidth) + 2;
    return Array.from({ length: repeatCount }, (_, i) => items).flat();
  };

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
        style={{ minWidth: "fit-content" }}
        role="list"
        aria-label="Marquee"
      >
        {renderItems().map((item, index) => (
          <div key={index} className={`flex-shrink-0 ${itemClassName}`} role="listitem">
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              className="h-auto max-h-[60px] object-contain grayscale opacity-60 transition-opacity duration-200"
              style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
            />
          </div>
        ))}
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-azure-mist to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-azure-mist to-transparent" />
      </div>
    </div>
  );
}