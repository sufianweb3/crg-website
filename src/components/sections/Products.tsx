"use client";

import { StaggerReveal } from "@/components/ui/StaggerReveal";
import Link from "next/link";

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  itemCount: string;
}

const categories: ProductCategory[] = [
  {
    id: "knit-sportswear",
    name: "Knit Garments & Sportswear",
    description: "Performance-driven knitwear and activewear manufactured to precise technical specifications.",
    itemCount: "[X] styles",
  },
  {
    id: "sweaters-flat-knit",
    name: "Sweaters & Flat Knit",
    description: "Fine-gauge and heavy-gauge flat knit sweaters with complex stitch programming and finishing.",
    itemCount: "[X] styles",
  },
  {
    id: "woven-denim",
    name: "Woven & Denim",
    description: "Structured wovens and authentic denim with advanced wash and finishing capabilities.",
    itemCount: "[X] styles",
  },
  {
    id: "uniforms-protective",
    name: "Uniforms & Protective Wear",
    description: "Workwear, corporate uniforms, and certified protective garments meeting international standards.",
    itemCount: "[X] styles",
  },
];

const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16" role="list">
          {categories.map((category, index) => (
            <StaggerReveal key={category.id} delay={50 + index * 50} duration={300} tag="article" className="group relative hairline-border overflow-hidden" role="listitem">
              <Link
                href={`/products-library?category=${category.id}`}
                className="block p-6 lg:p-8 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-black focus-visible:ring-offset-2 focus-visible:ring-offset-azure-mist"
                style={{ transitionTimingFunction: easeOut }}
              >
                <div className="relative z-10">
                  <p className="section-label mb-2">{category.itemCount}</p>
                  <h3 className="text-[clamp(20px,2.5vw,28px)] font-medium leading-[1.2] text-peach-black mb-4">
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

                <div className="absolute bottom-0 right-0 w-24 h-24 border-l border-b border-hairline opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ transitionTimingFunction: easeOut }} aria-hidden="true" />
              </Link>
            </StaggerReveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <StaggerReveal delay={250} duration={300} tag="div">
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