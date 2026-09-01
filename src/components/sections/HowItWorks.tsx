"use client";

import { useEffect, useRef, useState } from "react";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

interface Step {
  number: string;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Inquiry",
    description: "Share your designs, target quantities, and timeline. We respond within 24-48 hours.",
  },
  {
    number: "02",
    title: "Design & Sampling",
    description: "Your designs become production-ready specs and physical samples for review.",
  },
  {
    number: "03",
    title: "Approval",
    description: "Once you approve fit, fabric, and finish, we move to bulk production planning.",
  },
  {
    number: "04",
    title: "Production",
    description: "Your order enters full-scale manufacturing, with progress updates at key milestones.",
  },
  {
    number: "05",
    title: "Quality Control",
    description: "Every batch is inspected against agreed standards before packing.",
  },
  {
    number: "06",
    title: "Shipping",
    description: "Goods are packed, documented, and shipped per your preferred Incoterm, tracked until delivery.",
  },
];

const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const progress = Math.max(0, Math.min(1, entry.intersectionRatio));
            const index = Math.floor(progress * (steps.length - 1));
            setActiveIndex(Math.max(0, Math.min(index, steps.length - 1)));
          }
        });
      },
      { threshold: Array.from({ length: 20 }, (_, i) => i / 20), rootMargin: "0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isMobile, prefersReducedMotion]);

  if (isMobile || prefersReducedMotion) {
    return (
      <section className="section-padding bg-azure-mist" aria-labelledby="how-it-works-heading">
        <div className="section-container">
          <StaggerReveal delay={0} duration={300} tag="div" className="max-w-3xl">
            <p className="section-label">How It Works</p>
            <h2 id="how-it-works-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black mt-2">
              A Clear Process, From First Inquiry to Final Shipment
            </h2>
            <p className="body-text mt-6">
              Working with a new manufacturing partner shouldn&apos;t feel uncertain. Here&apos;s exactly what to expect.
            </p>
          </StaggerReveal>

          <div className="mt-16 space-y-0" role="list">
            {steps.map((step, index) => (
              <StaggerReveal key={step.number} delay={index * 60} duration={300} tag="article" className="border-b border-hairline last:border-b-0 py-8" role="listitem">
                <div className="flex items-start gap-6 lg:gap-12">
                  <span
                    className={`font-mono font-medium text-[clamp(48px,6vw,80px)] leading-none transition-all duration-200 flex-shrink-0 ${
                      activeIndex === index ? "text-peach-black" : "text-peach-black-45"
                    }`}
                    style={{ transitionTimingFunction: easeOut }}
                  >
                    {step.number}
                  </span>
                  <div className="pt-2">
                    <h3 className="text-[clamp(20px,2.5vw,28px)] font-medium leading-[1.2] text-peach-black mb-2">
                      {step.title}
                    </h3>
                    <p className="body-text text-peach-black-70">{step.description}</p>
                  </div>
                </div>
              </StaggerReveal>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-azure-mist" aria-labelledby="how-it-works-heading">
      <div className="section-container">
        <StaggerReveal delay={0} duration={300} tag="div" className="max-w-3xl">
          <p className="section-label">How It Works</p>
          <h2 id="how-it-works-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black mt-2">
            A Clear Process, From First Inquiry to Final Shipment
          </h2>
          <p className="body-text mt-6">
            Working with a new manufacturing partner shouldn&apos;t feel uncertain. Here&apos;s exactly what to expect.
          </p>
        </StaggerReveal>

        <div
          ref={containerRef}
          className="mt-16"
          role="list"
          aria-label="Process steps"
        >
          {steps.map((step, index) => (
            <StaggerReveal key={step.number} delay={index * 60} duration={300} tag="article" className="border-b border-hairline last:border-b-0 py-8 lg:py-10" role="listitem">
              <div className="flex items-start gap-6 lg:gap-12">
                <span
                  className={`font-mono font-medium text-[clamp(48px,6vw,80px)] leading-none transition-all duration-200 flex-shrink-0 ${
                    activeIndex === index ? "text-peach-black stamp-enter" : "text-peach-black-45"
                  }`}
                  style={{ transitionTimingFunction: easeOut }}
                >
                  {step.number}
                </span>
                <div className="pt-2">
                  <h3 className={`text-[clamp(20px,2.5vw,28px)] font-medium leading-[1.2] transition-colors duration-200 ${
                    activeIndex === index ? "text-peach-black" : "text-peach-black-45"
                  }`} style={{ transitionTimingFunction: easeOut }}>
                    {step.title}
                  </h3>
                  <p className={`body-text mt-2 transition-colors duration-200 ${
                    activeIndex === index ? "text-peach-black-70" : "text-peach-black-45"
                  }`} style={{ transitionTimingFunction: easeOut }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </StaggerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}