import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import Link from "next/link";

export const metadata = {
  title: "Message From Our Team — CRG Attire",
  description: "A word from CRG Attire's CEO and Director on nearly three decades of manufacturing, family leadership, and what comes next.",
};

export default function MessageFromTeamPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-16 lg:pt-20">
        <section className="section-padding bg-azure-mist" aria-labelledby="message-heading">
          <div className="section-container">
            <StaggerReveal delay={0} duration={500} tag="div" className="max-w-3xl">
              <p className="section-label">Message From Team</p>
              <h1 id="message-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black mt-2">
                A Word From Our Leadership
              </h1>
              <p className="body-text mt-6">
                Nearly three decades of manufacturing, family leadership, and what comes next.
              </p>
            </StaggerReveal>
          </div>
        </section>

        <section className="section-padding bg-azure-mist" aria-labelledby="ceo-heading">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="relative">
                <StaggerReveal delay={0} duration={500} tag="div">
                  <div className="aspect-[4/5] bg-peach-black/5 border border-hairline relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-peach-black-45 font-mono text-sm">
                      CEO Headshot (optional)
                    </div>
                    {/*
                      <img
                        src="/assets/team/ceo.jpg"
                        alt="Mahfuz Alam, CEO"
                        className="w-full h-full object-cover"
                      />
                    */}
                  </div>
                </StaggerReveal>
              </div>

              <div className="lg:pl-8">
                <StaggerReveal delay={100} duration={500} tag="div" className="space-y-6">
                  <h2 id="ceo-heading" className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.15] text-peach-black">
                    Mahfuz Alam — CEO
                  </h2>
                  <blockquote className="border-l-2 border-peach-black pl-6 text-peach-black-70 body-text italic">
                    <p className="mb-4">
                      &ldquo;When CRG opened its doors in 1996, we were a small buying house with a simple promise: do right by the people we work with. Nearly three decades later, that promise hasn&apos;t changed, only the scale of what we can deliver has.&rdquo;
                    </p>
                    <p className="mb-4">
                      &ldquo;Today, CRG is a full-fledged apparel manufacturer and exporter based in Bangladesh, handling everything from sourcing and production to final export, for partners around the world. What started as one generation&apos;s ambition is now being carried forward by the next, and that continuity means something to us. It shows up in how we treat our workers, how we manage our factories, and how seriously we take every order that comes through our door, big or small.&rdquo;
                    </p>
                    <p>
                      &ldquo;We&apos;ve grown, but we haven&apos;t forgotten where we started. That&apos;s still the heart of how we do business.&rdquo;
                    </p>
                  </blockquote>
                </StaggerReveal>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-peach-black" aria-labelledby="director-heading">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="lg:pr-8 lg:order-2">
                <StaggerReveal delay={0} duration={500} tag="div">
                  <div className="aspect-[4/5] bg-azure-mist/5 border border-hairline relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-peach-black-45 font-mono text-sm">
                      Director Headshot (optional)
                    </div>
                    {/*
                      <img
                        src="/assets/team/director.jpg"
                        alt="Feroz Alam, Director"
                        className="w-full h-full object-cover"
                      />
                    */}
                  </div>
                </StaggerReveal>
              </div>

              <div className="lg:pl-8 lg:order-1">
                <StaggerReveal delay={100} duration={500} tag="div" className="space-y-6">
                  <h2 id="director-heading" className="text-[clamp(28px,4vw,48px)] font-medium leading-[1.15] text-azure-mist">
                    Feroz Alam — Director
                  </h2>
                  <blockquote className="border-l-2 border-azure-mist pl-6 text-azure-mist/80 body-text italic">
                    <p className="mb-4">
                      &ldquo;Being part of a company that&apos;s older than most trends in this industry gives you a certain perspective. CRG began in 1996 as a buying house, and I&apos;ve watched, and now helped lead, its evolution into a full manufacturing and export operation, all from right here in Bangladesh.&rdquo;
                    </p>
                    <p className="mb-4">
                      &ldquo;What I&apos;m proudest of isn&apos;t just what we&apos;ve built, but how we&apos;ve built it. This is a family legacy, now in its second generation, and that comes with a responsibility to keep our standards high, in quality, in ethics, and in the relationships we maintain with the brands and buyers who trust us with their production.&rdquo;
                    </p>
                    <p>
                      &ldquo;We&apos;re not chasing size for its own sake. We&apos;re focused on being a manufacturing partner people can rely on, season after season, year after year.&rdquo;
                    </p>
                  </blockquote>
                </StaggerReveal>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-azure-mist" aria-labelledby="cta-heading">
          <div className="section-container text-center">
            <StaggerReveal delay={0} duration={500} tag="div" className="max-w-2xl mx-auto">
              <h2 id="cta-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black mb-6">
                Ready to Start a Conversation?
              </h2>
              <p className="body-text mb-8">
                Tell us what you&apos;re building. We&apos;ll show you how we&apos;ll make it happen.
              </p>
              <Link href="/get-quote" className="btn-primary inline-flex">
                Get Your Quote
              </Link>
            </StaggerReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}