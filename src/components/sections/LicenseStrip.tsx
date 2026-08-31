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

  if (licenseLogos.length === 0) {
    return (
      <section className="section-padding bg-peach-black" aria-labelledby="license-heading">
        <div className="section-container">
          <div className="flex items-center gap-6 flex-wrap">
            <h2 id="license-heading" className="section-label text-azure-mist flex-shrink-0">
              Licenses:
            </h2>
            <p className="text-azure-mist/60 font-mono text-sm">
              Certification logos will appear here once uploaded to /assets/license/
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-peach-black" aria-labelledby="license-heading">
      <div className="section-container">
        <div className="flex items-center gap-6 flex-wrap mb-8">
          <h2 id="license-heading" className="section-label text-azure-mist flex-shrink-0">
            Licenses:
          </h2>
        </div>
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
      </div>
    </section>
  );
}