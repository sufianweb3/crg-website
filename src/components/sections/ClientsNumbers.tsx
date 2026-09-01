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
  { id: "companies", value: "500+", label: "Companies Served" },
  { id: "since", value: "1996", label: "Since" },
  { id: "countries", value: "40+", label: "Countries Served" },
];

const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";

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
          <div className="h-12 mb-16" aria-hidden="true" />
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" role="list">
          {statBlocks.map((stat, index) => (
            <StaggerReveal key={stat.id} delay={index * 60} duration={300} tag="article" className="text-center" role="listitem">
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
          <StaggerReveal delay={200} duration={300} tag="div" className="aspect-square max-w-md mx-auto">
            <div
              id="globe-container"
              className="w-full h-full rounded-full border border-hairline overflow-hidden bg-azure-mist/10"
              style={{ background: "radial-gradient(ellipse at center, rgba(18,16,14,0.1) 0%, transparent 70%)" }}
            >
              {/* 21st.dev globe component will be integrated here */}
            </div>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}