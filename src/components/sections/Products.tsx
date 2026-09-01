"use client";

import { StaggerReveal } from "@/components/ui/StaggerReveal";
import Link from "next/link";

interface ProductCategory {
  id: string;
  index: string;
  name: string;
  description: string;
}

const categories: ProductCategory[] = [
  {
    id: "knit-sportswear",
    index: "01/04",
    name: "Knit Garments & Sportswear",
    description: "Performance-driven knitwear and activewear manufactured to precise technical specifications.",
  },
  {
    id: "sweaters-flat-knit",
    index: "02/04",
    name: "Sweaters & Flat Knit",
    description: "Fine-gauge and heavy-gauge flat knit sweaters with complex stitch programming and finishing.",
  },
  {
    id: "woven-denim",
    index: "03/04",
    name: "Woven & Denim",
    description: "Structured wovens and authentic denim with advanced wash and finishing capabilities.",
  },
  {
    id: "uniforms-protective",
    index: "04/04",
    name: "Uniforms & Protective Wear",
    description: "Workwear, corporate uniforms, and certified protective garments meeting international standards.",
  },
];

const easeOut = "cubic-bezier(0.16, 1, 0.3, 1)";

export function Products() {
  return (
    <section className="section-padding bg-azure-mist" aria-labelledby="products-heading">
      <div className="section-container">
        <StaggerReveal delay={0} duration={300} tag="div" className="max-w-3xl">
          <p className="section-label">What We Make</p>
          <h2 id="products-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black mt-2">
            Four Categories. One Standard of Precision.
          </h2>
          <p className="body-text mt-6">
            Whatever you&apos;re building, it&apos;s manufactured to the same standard. Browse by category to see the full range.
          </p>
        </StaggerReveal>

        <div className="mt-16" role="list">
          <div className="grid gap-6" style={{ gridTemplateColumns: "7fr 5fr" }}>
            {categories.slice(0, 2).map((category, index) => (
              <StaggerReveal key={category.id} delay={index * 60} duration={300} tag="article" className="group relative hairline-border overflow-hidden corner-bracket" role="listitem">
                <Link
                  href={`/products-library?category=${category.id}`}
                  className="block p-6 lg:p-8 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-black focus-visible:ring-offset-2 focus-visible:ring-offset-azure-mist h-full"
                  style={{ transitionTimingFunction: easeOut }}
                >
                  <div className="relative z-10">
                    <span className="font-mono text-sm font-medium text-peach-black-45 block mb-4">{category.index}</span>
                    <h3 className="text-[clamp(24px,3vw,32px)] font-medium leading-[1.2] text-peach-black mb-4">
                      {category.name}
                    </h3>
                    <p className="body-text text-peach-black-70 mb-6">{category.description}</p>

                    <div className="flex items-center gap-2 font-mono text-sm font-medium text-peach-black-45 transition-colors duration-160 underline-draw" style={{ transitionTimingFunction: easeOut }}>
                      View Collection
                      <svg className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ transitionTimingFunction: easeOut }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </StaggerReveal>
            ))}
          </div>

          <div className="grid gap-6 mt-12" style={{ gridTemplateColumns: "5fr 7fr" }}>
            {categories.slice(2, 4).map((category, index) => (
              <StaggerReveal key={category.id} delay={120 + index * 60} duration={300} tag="article" className="group relative hairline-border overflow-hidden corner-bracket" role="listitem">
                <Link
                  href={`/products-library?category=${category.id}`}
                  className="block p-6 lg:p-8 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-black focus-visible:ring-offset-2 focus-visible:ring-offset-azure-mist h-full"
                  style={{ transitionTimingFunction: easeOut }}
                >
                  <div className="relative z-10">
                    <span className="font-mono text-sm font-medium text-peach-black-45 block mb-4">{category.index}</span>
                    <h3 className="text-[clamp(24px,3vw,32px)] font-medium leading-[1.2] text-peach-black mb-4">
                      {category.name}
                    </h3>
                    <p className="body-text text-peach-black-70 mb-6">{category.description}</p>

                    <div className="flex items-center gap-2 font-mono text-sm font-medium text-peach-black-45 transition-colors duration-160 underline-draw" style={{ transitionTimingFunction: easeOut }}>
                      View Collection
                      <svg className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-1" style={{ transitionTimingFunction: easeOut }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </StaggerReveal>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <StaggerReveal delay={300} duration={300} tag="div">
            <Link
              href="/products-library"
              className="inline-flex items-center gap-2 underline-draw text-peach-black font-medium"
            >
              View All Products
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}