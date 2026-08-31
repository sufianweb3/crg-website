"use client";

import { StaggerReveal } from "@/components/ui/StaggerReveal";
import Link from "next/link";

export function AboutUs() {
  return (
    <section className="section-padding bg-azure-mist" aria-labelledby="about-heading">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:pr-8">
            <StaggerReveal delay={0} duration={500} tag="div" className="space-y-6">
              <p className="section-label">About Us</p>
              <h2 id="about-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black">
                Since 1996, CRG has grown from a trusted buying house into a fully integrated manufacturer, producing, designing and exporting quality garments for fashion brands worldwide.
              </h2>
            </StaggerReveal>

            <StaggerReveal delay={100} duration={500} tag="div" className="mt-10 pt-10 border-t border-hairline">
              <Link
                href="/message-from-team"
                className="inline-flex items-center gap-2 underline-draw text-peach-black font-medium hover:text-peach-black-70"
              >
                Read Message from Our Team
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </StaggerReveal>
          </div>

          <div className="relative">
            <StaggerReveal delay={200} duration={500} tag="div" className="relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-3/4 bg-hairline hidden lg:block" aria-hidden="true" />
              <div className="pl-8 lg:pl-0">
                <div className="stat-numeral text-peach-black" style={{ fontSize: "clamp(56px, 8vw, 96px)" }}>
                  1996
                </div>
                <p className="section-label mt-2">Established</p>
                <p className="body-text mt-6 max-w-xs">
                  Nearly three decades of continuous operation, now led by the second generation of the founding family.
                </p>
              </div>
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}