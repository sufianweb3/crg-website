"use client";

import { StaggerReveal } from "@/components/ui/StaggerReveal";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="section-padding bg-peach-black relative overflow-hidden" aria-labelledby="final-cta-heading">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(242,253,255,0.05)_0%,_transparent_70%)]" aria-hidden="true" />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <StaggerReveal delay={0} duration={600} tag="div" className="space-y-6">
            <h2 id="final-cta-heading" className="text-[clamp(40px,7vw,88px)] font-bold leading-[1.1] text-azure-mist tracking-tight">
              Ready to Build Your Next Collection?
            </h2>

            <p className="text-[clamp(18px,2.5vw,24px)] font-normal leading-[1.5] text-azure-mist/80 max-w-2xl mx-auto">
              Tell us what you&apos;re making. We&apos;ll tell you exactly how we&apos;ll build it.
            </p>

            <Link
              href="/get-quote"
              className="btn-magnetic inline-flex items-center justify-center mt-8"
            >
              Get Your Quote
            </Link>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}