"use client";

import { useState } from "react";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

interface Certification {
  id: string;
  name: string;
  description: string;
}

const certifications: Certification[] = [
  {
    id: "accord",
    name: "Accord",
    description: "Legally binding agreement ensuring fire, electrical, and structural safety in garment factories.",
  },
  {
    id: "alliance",
    name: "Alliance",
    description: "Comprehensive worker safety program covering building integrity, fire safety, and worker empowerment.",
  },
  {
    id: "sedex",
    name: "Sedex",
    description: "Global membership organization for ethical trade, enabling supply chain transparency and responsible sourcing.",
  },
  {
    id: "additional",
    name: "Additional Certifications",
    description: "Further certifications as confirmed by the client, including environmental and social compliance standards.",
  },
];

const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";

export function Sustainability() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section className="section-padding bg-azure-mist" aria-labelledby="sustainability-heading">
      <div className="section-container">
        <StaggerReveal delay={0} duration={300} tag="div" className="max-w-3xl">
          <p className="section-label">Sustainability</p>
          <h2 id="sustainability-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black mt-2">
            People and Planet, Built Into Every Stitch
          </h2>
        </StaggerReveal>

        <StaggerReveal delay={50} duration={300} tag="div" className="max-w-3xl mt-8 body-text">
          <p>
            At CRG, we care about people and the planet. From ethical labor practices to eco-friendly fashion, we use responsibly sourced fabrics, cut down on waste, and make sure every piece reflects our promise to protect the environment while delivering quality you can trust.
          </p>
        </StaggerReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {certifications.map((cert, index) => (
            <StaggerReveal key={cert.id} delay={100 + index * 50} duration={300} tag="article" className="group hairline-border relative overflow-hidden" role="listitem">
              <button
                type="button"
                className="w-full p-6 lg:p-8 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-black focus-visible:ring-offset-2 focus-visible:ring-offset-azure-mist"
                onClick={() => setExpandedId(expandedId === cert.id ? null : cert.id)}
                aria-expanded={expandedId === cert.id}
                aria-controls={`${cert.id}-desc`}
              >
                <h3 className="text-[clamp(20px,2.5vw,28px)] font-medium leading-[1.2] text-peach-black mb-4">
                  {cert.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-peach-black-45 transition-colors duration-160" style={{ transitionTimingFunction: easeOut }}>
                    View Details
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 ml-4 text-peach-black-45 transition-transform duration-200 ${expandedId === cert.id ? "rotate-180" : ""}`}
                    style={{ transitionTimingFunction: easeOut }}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>

              <div
                id={`${cert.id}-desc`}
                role="region"
                aria-labelledby={`${cert.id}-trigger`}
                className="overflow-hidden bg-peach-black/5"
                style={{
                  maxHeight: expandedId === cert.id ? "200px" : "0",
                  opacity: expandedId === cert.id ? 1 : 0,
                  transition: `max-height 200ms ${easeOut}, opacity 200ms ${easeOut}`,
                }}
              >
                <p className="px-6 pb-6 body-text text-peach-black-70">
                  {cert.description}
                </p>
              </div>
            </StaggerReveal>
          ))}
        </div>

        <div className="mt-16 p-8 border border-hairline">
          <StaggerReveal delay={300} duration={300} tag="div" className="max-w-3xl">
            <p className="section-label mb-4">Impact Metrics</p>
            <p className="body-text text-peach-black-70">
              Specific waste, water, and energy reduction figures will be published here once verified. [Placeholder for measurable sustainability data]
            </p>
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}