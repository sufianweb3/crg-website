import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-peach-black text-azure-mist section-padding pt-16" role="contentinfo">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-1">
            <Link href="/" className="block mb-6" aria-label="CRG Attire Home">
              <img
                src="/assets/logo/logo.png"
                alt="CRG Attire Logo"
                className="h-10 w-auto"
                width="160"
                height="40"
              />
            </Link>
            <p className="text-azure-mist/60 body-text max-w-xs">
              Fully integrated apparel manufacturer, designer, and exporter based in Bangladesh since 1996.
            </p>
          </div>

          <nav aria-label="Company links">
            <h3 className="section-label text-azure-mist mb-4">Company</h3>
            <ul className="space-y-3 font-mono text-sm">
              <li><Link href="/#about" className="text-azure-mist/70 hover:text-azure-mist transition-colors underline-draw">About Us</Link></li>
              <li><Link href="/message-from-team" className="text-azure-mist/70 hover:text-azure-mist transition-colors underline-draw">Message From Team</Link></li>
              <li><Link href="/#services" className="text-azure-mist/70 hover:text-azure-mist transition-colors underline-draw">Services</Link></li>
              <li><Link href="/#sustainability" className="text-azure-mist/70 hover:text-azure-mist transition-colors underline-draw">Sustainability</Link></li>
            </ul>
          </nav>

          <nav aria-label="Products links">
            <h3 className="section-label text-azure-mist mb-4">Products</h3>
            <ul className="space-y-3 font-mono text-sm">
              <li><Link href="/products-library?category=knit-sportswear" className="text-azure-mist/70 hover:text-azure-mist transition-colors underline-draw">Knit Garments & Sportswear</Link></li>
              <li><Link href="/products-library?category=sweaters-flat-knit" className="text-azure-mist/70 hover:text-azure-mist transition-colors underline-draw">Sweaters & Flat Knit</Link></li>
              <li><Link href="/products-library?category=woven-denim" className="text-azure-mist/70 hover:text-azure-mist transition-colors underline-draw">Woven & Denim</Link></li>
              <li><Link href="/products-library?category=uniforms-protective" className="text-azure-mist/70 hover:text-azure-mist transition-colors underline-draw">Uniforms & Protective Wear</Link></li>
              <li><Link href="/products-library" className="text-azure-mist/70 hover:text-azure-mist transition-colors underline-draw">All Products</Link></li>
            </ul>
          </nav>

          <div>
            <h3 className="section-label text-azure-mist mb-4">Contact</h3>
            <address className="not-italic body-text text-azure-mist/70 space-y-2 font-mono text-sm">
              <p>Bangladesh</p>
              <p>Email: <a href="mailto:info@crgattire.com" className="underline-draw hover:text-azure-mist">info@crgattire.com</a></p>
              <p>Phone: <a href="tel:+880XXXXXXXXXX" className="underline-draw hover:text-azure-mist">+880 XXXX XXXXXX</a></p>
            </address>
            <div className="mt-8 flex gap-6">
              <a href="/get-quote" className="btn-primary text-sm px-6 py-3">Get Your Quote</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-hairline flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-azure-mist/45 font-mono text-sm">
            &copy; {new Date().getFullYear()} CRG Attire. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-mono text-sm text-azure-mist/45">
            <Link href="/privacy" className="underline-draw hover:text-azure-mist/70 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="underline-draw hover:text-azure-mist/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}