import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { LicenseStrip } from "@/components/sections/LicenseStrip";
import { AboutUs } from "@/components/sections/AboutUs";
import { Services } from "@/components/sections/Services";
import { Products } from "@/components/sections/Products";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Sustainability } from "@/components/sections/Sustainability";
import { ClientsNumbers } from "@/components/sections/ClientsNumbers";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-16 lg:pt-20">
        <Hero
          videoSrc="/assets/hero/hero_vid/A_model_is_walking_confidently_202607100055-BttZLKRM.mp4"
          posterSrc="/assets/hero/poster.jpg"
        />
        <LicenseStrip logos={[]} />
        <AboutUs />
        <Services />
        <Products />
        <HowItWorks />
        <Sustainability />
        <ClientsNumbers clientLogos={[]} />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}