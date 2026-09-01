"use client";

import { Marquee } from "@/components/ui/Marquee";
import { useEffect, useState } from "react";

interface LicenseStripProps {
  logos: Array<{ src: string; alt: string }>;
}

export function LicenseStrip({ logos }: LicenseStripProps) {
  const [licenseLogos, setLicenseLogos] = useState(logos);

  useEffect(() => {
    const loadLogos = async () => {
      try {
        const response = await fetch("/api/assets/license");
        if (response.ok) {
          const data = await response.json();
          setLicenseLogos(data.logos);
        }
      } catch {
        // Fallback to passed logos
      }
    };
    loadLogos();
  }, []);

  return (
    <section className="py-8 bg-peach-black" aria-labelledby="license-heading">
      <div className="section-container">
        <div className="flex items-center gap-6 flex-wrap mb-6">
          <h2 id="license-heading" className="section-label text-azure-mist flex-shrink-0">
            Licenses:
          </h2>
        </div>
        {licenseLogos.length > 0 ? (
          <Marquee
            items={licenseLogos.map((logo) => ({
              src: logo.src,
              alt: logo.alt,
              height: 60,
            }))}
            speed={40}
            direction="left"
            className="w-full"
          />
        ) : (
          <div className="h-16" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}