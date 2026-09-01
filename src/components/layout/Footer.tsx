import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-peach-black text-azure-mist" role="contentinfo">
      <div className="section-container">
        <div className="py-12 border-b border-azure-mist/20">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-shrink-0">
              <Link href="/" className="block" aria-label="CRG Attire Home">
                <img
                  src="/assets/logo/logo.png"
                  alt="CRG Attire Logo"
                  className="h-10 w-auto"
                  width="160"
                  height="40"
                />
              </Link>
              <p className="text-azure-mist/60 body-text max-w-xs mt-4">
                Fully integrated apparel manufacturer, designer, and exporter based in Bangladesh since 1996.
              </p>
            </div>

            <nav className="flex flex-wrap gap-8 font-mono text-sm" aria-label="Footer navigation">
              <Link href="/#about" className="text-azure-mist/70 hover:text-azure-mist transition-colors duration-160 underline-draw">About</Link>
              <Link href="/#services" className="text-azure-mist/70 hover:text-azure-mist transition-colors duration-160 underline-draw">Services</Link>
              <Link href="/products-library" className="text-azure-mist/70 hover:text-azure-mist transition-colors duration-160 underline-draw">Products</Link>
              <Link href="/#how-it-works" className="text-azure-mist/70 hover:text-azure-mist transition-colors duration-160 underline-draw">Process</Link>
              <Link href="/#sustainability" className="text-azure-mist/70 hover:text-azure-mist transition-colors duration-160 underline-draw">Sustainability</Link>
              <Link href="/get-quote" className="text-azure-mist/70 hover:text-azure-mist transition-colors duration-160 underline-draw">Contact</Link>
            </nav>

            <div className="flex items-center gap-4 text-azure-mist/45 font-mono text-xs uppercase tracking-wider">
              <span>Accord</span>
              <span className="w-1 h-1 rounded-full bg-azure-mist/30" aria-hidden="true" />
              <span>Alliance</span>
              <span className="w-1 h-1 rounded-full bg-azure-mist/30" aria-hidden="true" />
              <span>Sedex</span>
            </div>
          </div>
        </div>

        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-azure-mist/45 font-mono text-sm">
            &copy; {new Date().getFullYear()} CRG Attire. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-mono text-sm text-azure-mist/45">
            <Link href="/privacy" className="underline-draw hover:text-azure-mist/70 transition-colors">Privacy</Link>
            <Link href="/terms" className="underline-draw hover:text-azure-mist/70 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}