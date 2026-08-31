"use client";

import { useEffect, useRef, useState } from "react";
import { Marquee } from "@/components/ui/Marquee";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

interface ClientLogo {
  src: string;
  alt: string;
}

interface StatBlock {
  id: string;
  value: string;
  label: string;
}

const statBlocks: StatBlock[] = [
  { id: "companies", value: "[X]+", label: "Companies Served" },
  { id: "since", value: "1996", label: "Since" },
  { id: "countries", value: "[X]+", label: "Countries Served" },
];

export function ClientsNumbers({ clientLogos = [] }: { clientLogos?: ClientLogo[] }) {
  const [logos, setLogos] = useState<ClientLogo[]>(clientLogos);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [animatedStats, setAnimatedStats] = useState<Set<string>>(new Set());

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const loadLogos = async () => {
      try {
        const response = await fetch("/api/assets/clients");
        if (response.ok) {
          const data = await response.json();
          setLogos(data.logos);
        }
      } catch {
        // Fallback to passed logos
      }
    };
    loadLogos();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimatedStats(new Set(statBlocks.map((s) => s.id)));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("data-stat-id");
            if (id) {
              setAnimatedStats((prev) => new Set(prev).add(id));
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    statRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const animateCount = (target: number, duration: number = 1200) => {
    if (prefersReducedMotion) return target;
    const start = 0;
    const startTime = performance.now();

    return new Promise<number>((resolve) => {
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          resolve(target);
        }
      };
      requestAnimationFrame(animate);
    });
  };

  const parseStatValue = (value: string): number => {
    const match = value.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const formatStatValue = (value: string, animatedValue: number): string => {
    return value.replace(/\d+/, animatedValue.toString());
  };

  return (
    <section className="section-padding bg-peach-black" aria-labelledby="clients-heading">
      <div className="section-container">
        <div className="flex items-center gap-6 flex-wrap mb-12">
          <h2 id="clients-heading" className="section-label text-azure-mist flex-shrink-0">
            Our Partners
          </h2>
        </div>

        {logos.length > 0 ? (
          <Marquee
            items={logos.map((logo) => ({
              src: logo.src,
              alt: logo.alt,
              height: 50,
            }))}
            speed={35}
            direction="left"
            className="w-full mb-16"
          />
        ) : (
          <div className="w-full py-12 mb-16 text-center text-azure-mist/60 font-mono text-sm">
            Client logos will appear here once uploaded to /assets/clients/
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" role="list">
          {statBlocks.map((stat, index) => (
            <StaggerReveal key={stat.id} delay={index * 150} duration={500} tag="article" className="text-center" role="listitem">
              <div
                ref={(el) => { statRefs.current[index] = el; }}
                data-stat-id={stat.id}
                className="stat-numeral text-azure-mist mb-2"
                style={{ fontSize: "clamp(56px, 8vw, 96px)" }}
              >
                {animatedStats.has(stat.id) && !prefersReducedMotion ? (
                  <span className="stat-counter" data-target={parseStatValue(stat.value)}>
                    {formatStatValue(stat.value, parseStatValue(stat.value))}
                  </span>
                ) : (
                  stat.value
                )}
              </div>
              <p className="section-label text-azure-mist/80">{stat.label}</p>
            </StaggerReveal>
          ))}
        </div>

        <div className="relative" role="region" aria-label="Global presence map">
          <StaggerReveal delay={500} duration={500} tag="div" className="aspect-square max-w-md mx-auto">
            <div
              id="globe-container"
              className="w-full h-full rounded-full border border-hairline overflow-hidden bg-azure-mist/10"
              style={{ background: "radial-gradient(ellipse at center, rgba(18,16,14,0.1) 0%, transparent 70%)" }}
            >
              <div className="w-full h-full flex items-center justify-center text-peach-black-45 font-mono text-sm">
                Interactive Globe (21st.dev component)
              </div>
              {/* 
                The 21st.dev globe component will be integrated here.
                Example integration:
                <GlobeComponent 
                  countries={[{ code: 'US', value: 100 }, ...]} 
                  className="w-full h-full"
                />
              */}
            </div>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}