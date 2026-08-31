"use client";

import { useState } from "react";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

interface ServicePanel {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  isLarge?: boolean;
}

const services: ServicePanel[] = [
  {
    id: "design-development",
    title: "Design & Development",
    tagline: "From Concept to Production-Ready Design",
    description: "Concept development, technical design and tech packs, fit specification and grading, material and trim recommendations, CAD illustrations.",
    features: [
      "Concept development",
      "Technical design and tech packs",
      "Fit specification and grading",
      "Material and trim recommendations",
      "CAD illustrations",
    ],
  },
  {
    id: "sampling",
    title: "Sampling",
    tagline: "Fast, Accurate Samples So You Can Move With Confidence",
    description: "Proto, fit, and pre-production samples, revisions based on fit feedback.",
    features: [
      "Proto, fit, and pre-production samples",
      "Revisions based on fit feedback",
      "[X]-day average sample turnaround",
    ],
  },
  {
    id: "manufacturing",
    title: "Manufacturing & Production",
    tagline: "Reliable Production, At Scale",
    description: "In-house cutting, sewing, and finishing.",
    features: [
      "In-house cutting, sewing, and finishing",
      "[X] production lines, [X] units monthly capacity",
      "Categories: knitwear, wovens, denim, activewear, outerwear, uniforms",
    ],
    isLarge: true,
  },
  {
    id: "sourcing",
    title: "Sourcing",
    tagline: "Sourcing Built In, Not Bolted On",
    description: "Fabric sourcing, trims and accessories, vendor vetting and quality checks, price negotiation.",
    features: [
      "Fabric sourcing",
      "Trims and accessories",
      "Vendor vetting and quality checks",
      "Price negotiation",
    ],
  },
  {
    id: "quality-compliance",
    title: "Quality Assurance & Compliance",
    tagline: "Every Order, Inspected Before It Ships",
    description: "In-line and final inspections, AQL-based sampling checks, compliance with Accord, Alliance, Sedex and additional certifications.",
    features: [
      "In-line and final inspections",
      "AQL-based sampling checks",
      "Compliance with Accord, Alliance, Sedex and additional certifications",
    ],
    isLarge: true,
  },
  {
    id: "logistics-export",
    title: "Logistics & Export",
    tagline: "From Factory Floor to Your Warehouse Door",
    description: "Freight coordination, export documentation, Incoterm flexibility (FOB, CIF, DDP), shipment tracking.",
    features: [
      "Freight coordination",
      "Export documentation",
      "Incoterm flexibility (FOB, CIF, DDP)",
      "Shipment tracking",
    ],
  },
];

const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";

export function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="section-padding bg-azure-mist" aria-labelledby="services-heading">
      <div className="section-container">
        <StaggerReveal delay={0} duration={300} tag="div" className="max-w-3xl">
          <p className="section-label">What We Do</p>
          <h2 id="services-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black mt-2">
            Every Stage of Production, Under One Roof
          </h2>
          <p className="body-text mt-6">
            CRG manages your product from first sketch to final shipment. One accountable team, one point of contact, no coordinating between separate vendors.
          </p>
        </StaggerReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16" role="list">
          {services.map((service, index) => (
            <StaggerReveal key={service.id} delay={index * 50} duration={300} tag="article" className="hairline-border rounded-none relative group" role="listitem">
              <div className="p-6 lg:p-8 relative">
                <div className="absolute top-4 right-4 w-12 h-12 border border-hairline opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ transitionTimingFunction: easeOut }} aria-hidden="true">
                  <svg className="w-full h-full text-peach-black-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16v16H4z" />
                    <path d="M4 4l16 16" />
                  </svg>
                </div>

                <p className="section-label mb-2">{service.tagline}</p>
                <h3 className="text-[clamp(20px,2.5vw,28px)] font-medium leading-[1.2] text-peach-black mb-4">
                  {service.title}
                </h3>
                <p className="body-text text-peach-black-70 mb-6">{service.description}</p>

                <button
                  type="button"
                  className="w-full flex items-center justify-between text-left font-mono text-sm font-medium text-peach-black-45 transition-colors duration-160 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-black focus-visible:ring-offset-2 focus-visible:ring-offset-azure-mist"
                  style={{ transitionTimingFunction: easeOut }}
                  onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                  aria-expanded={expandedId === service.id}
                  aria-controls={`${service.id}-features`}
                >
                  <span>What&apos;s Included</span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 ml-4 transition-transform duration-200 ${expandedId === service.id ? "rotate-180" : ""}`}
                    style={{ transitionTimingFunction: easeOut }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
              </div>

              <div
                id={`${service.id}-features`}
                role="region"
                aria-labelledby={`${service.id}-trigger`}
                className="overflow-hidden bg-peach-black/5"
                style={{
                  maxHeight: expandedId === service.id ? "500px" : "0",
                  opacity: expandedId === service.id ? 1 : 0,
                  transition: `max-height 200ms ${easeOut}, opacity 200ms ${easeOut}`,
                }}
              >
                <ul className="px-6 pb-6 space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3 text-peach-black-70 body-text">
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-peach-black-45 mt-2.5" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerReveal>
          ))}
        </div>
      </div>
    </section>
  );
}