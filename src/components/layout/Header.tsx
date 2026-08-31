"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navSections = [
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "products", label: "Products" },
  { id: "how-it-works", label: "How It Works" },
  { id: "sustainability", label: "Sustainability" },
  { id: "clients", label: "Clients" },
  { id: "faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-azure-mist/95 backdrop-blur-sm border-b border-hairline" : "bg-transparent"
      }`}
      role="banner"
    >
      <nav className="section-container h-16 lg:h-20 flex items-center justify-between" aria-label="Main navigation">
        <Link
          href="/"
          className="flex items-center gap-2 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-black focus-visible:ring-offset-2 focus-visible:ring-offset-azure-mist rounded-sm"
          aria-label="CRG Attire Home"
        >
          <img
            src="/assets/logo/logo.png"
            alt="CRG Attire Logo"
            className="h-8 w-auto"
            width="120"
            height="32"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-6 font-mono text-sm font-medium uppercase tracking-wider" role="menubar">
            {navSections.map((section) => (
              <li key={section.id} role="none">
                <a
                  href={`/#${section.id}`}
                  className="text-peach-black-70 hover:text-peach-black transition-colors duration-200 underline-draw py-2"
                  role="menuitem"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <Link
            href="/get-quote"
            className="btn-primary text-sm px-6 py-3 ml-2"
          >
            Get Your Quote
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <button
            type="button"
            className="p-2 text-peach-black hover:text-peach-black-70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-black focus-visible:ring-offset-2 focus-visible:ring-offset-azure-mist rounded"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-azure-mist border-t border-hairline ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="section-container py-6 space-y-4">
          <ul className="space-y-2 font-mono text-sm font-medium uppercase tracking-wider" role="menubar">
            {navSections.map((section) => (
              <li key={section.id} role="none">
                <a
                  href={`/#${section.id}`}
                  className="block py-3 text-peach-black-70 hover:text-peach-black transition-colors duration-200 border-b border-hairline"
                  role="menuitem"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
          <Link
            href="/get-quote"
            className="btn-primary w-full text-center py-3 mt-4 block"
            onClick={() => setMobileMenuOpen(false)}
          >
            Get Your Quote
          </Link>
        </div>
      </div>
    </header>
  );
}