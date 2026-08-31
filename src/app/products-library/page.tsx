"use client";

import { useState, useEffect } from "react";
import { StaggerReveal } from "@/components/ui/StaggerReveal";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  category: string;
  wearerTags: string[];
  description: string;
  image?: string;
}

const categories = [
  { id: "knit-sportswear", name: "Knit Garments & Sportswear" },
  { id: "sweaters-flat-knit", name: "Sweaters & Flat Knit" },
  { id: "woven-denim", name: "Woven & Denim" },
  { id: "uniforms-protective", name: "Uniforms & Protective Wear" },
];

const allProducts: Product[] = [
  {
    id: "p1",
    name: "Performance Polo",
    category: "knit-sportswear",
    wearerTags: ["Men's", "Women's", "Unisex"],
    description: "Moisture-wicking polo with anti-odor treatment, flatlock seams.",
  },
  {
    id: "p2",
    name: "Compression Leggings",
    category: "knit-sportswear",
    wearerTags: ["Women's", "Unisex"],
    description: "High-compression leggings with four-way stretch, hidden waistband pocket.",
  },
  {
    id: "p3",
    name: "Merino Blend Sweater",
    category: "sweaters-flat-knit",
    wearerTags: ["Men's", "Women's"],
    description: "Fine-gauge merino blend, fully fashioned construction.",
  },
  {
    id: "p4",
    name: "Heavyweight Cable Knit",
    category: "sweaters-flat-knit",
    wearerTags: ["Men's", "Women's", "Unisex"],
    description: "Chunky cable knit in recycled wool blend, ribbed trims.",
  },
  {
    id: "p5",
    name: "Selvedge Denim Jacket",
    category: "woven-denim",
    wearerTags: ["Men's", "Women's", "Unisex"],
    description: "14oz Japanese selvedge denim, tonal stitching, antique brass hardware.",
  },
  {
    id: "p6",
    name: "Chambray Work Shirt",
    category: "woven-denim",
    wearerTags: ["Men's", "Unisex"],
    description: "Lightweight chambray, triple-stitched seams, double chest pockets.",
  },
  {
    id: "p7",
    name: "Hi-Vis Safety Vest",
    category: "uniforms-protective",
    wearerTags: ["Unisex"],
    description: "EN ISO 20471 Class 2 certified, breathable mesh, reflective tape.",
  },
  {
    id: "p8",
    name: "Flame-Resistant Coverall",
    category: "uniforms-protective",
    wearerTags: ["Men's", "Women's"],
    description: "Inherent FR fabric, arc-rated, multiple tool pockets, two-way zipper.",
  },
];

export default function ProductsLibraryPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [displayProducts, setDisplayProducts] = useState<Product[]>(allProducts);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    searchParams.then((params) => {
      const category = params.category || "all";
      setActiveCategory(category);
      if (category === "all") {
        setDisplayProducts(allProducts);
      } else {
        setDisplayProducts(allProducts.filter((p) => p.category === category));
      }
    });
  }, []);

  const filteredProducts = displayProducts;

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-16 lg:pt-20">
        <section className="section-padding bg-azure-mist" aria-labelledby="products-library-heading">
          <div className="section-container">
            <StaggerReveal delay={0} duration={500} tag="div" className="max-w-3xl">
              <p className="section-label">Products Library</p>
              <h1 id="products-library-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black mt-2">
                Full Manufacturing Range
              </h1>
              <p className="body-text mt-6">
                Browse our complete catalog. Filter by category to explore specific product types.
              </p>
            </StaggerReveal>

            <StaggerReveal delay={100} duration={400} tag="div" className="mt-8">
              <div className="flex flex-wrap gap-3" role="group" aria-label="Product categories">
                <button
                  type="button"
                  className={`px-4 py-2 font-mono text-sm font-medium uppercase tracking-wider rounded-none transition-all duration-200 ${
                    activeCategory === "all"
                      ? "bg-peach-black text-azure-mist"
                      : "bg-azure-mist text-peach-black-70 border border-hairline hover:border-peach-black hover:text-peach-black"
                  }`}
                  onClick={() => setActiveCategory("all")}
                  aria-pressed={activeCategory === "all"}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`px-4 py-2 font-mono text-sm font-medium uppercase tracking-wider rounded-none transition-all duration-200 ${
                      activeCategory === cat.id
                        ? "bg-peach-black text-azure-mist"
                        : "bg-azure-mist text-peach-black-70 border border-hairline hover:border-peach-black hover:text-peach-black"
                    }`}
                    onClick={() => setActiveCategory(cat.id)}
                    aria-pressed={activeCategory === cat.id}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </StaggerReveal>
          </div>
        </section>

        <section className="section-padding pb-20 bg-azure-mist" aria-labelledby="catalog-heading">
          <div className="section-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list">
              {filteredProducts.map((product, index) => (
                <StaggerReveal
                  key={product.id}
                  delay={prefersReducedMotion ? 0 : index * 80}
                  duration={400}
                  tag="article"
                  className="group hairline-border overflow-hidden bg-azure-mist"
                  role="listitem"
                >
                  <Link
                    href={`/get-quote?product=${product.id}`}
                    className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-black focus-visible:ring-offset-2 focus-visible:ring-offset-azure-mist"
                  >
                    <div className="aspect-[4/5] bg-peach-black/5 relative overflow-hidden">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-peach-black-45 font-mono text-sm">
                          Product Image (placeholder)
                        </div>
                      )}
                      <div className="absolute top-3 right-3 px-2 py-1 bg-peach-black/80 text-azure-mist font-mono text-xs uppercase tracking-wider">
                        {product.category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                    </div>
                    <div className="p-5 space-y-3">
                      <h3 className="text-[clamp(18px,2vw,22px)] font-medium leading-[1.2] text-peach-black group-hover:text-peach-black-70 transition-colors">
                        {product.name}
                      </h3>
                      <p className="body-text text-peach-black-70 line-clamp-2">{product.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {product.wearerTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-[11px] font-mono uppercase tracking-wider bg-peach-black/5 text-peach-black-45 border border-hairline"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </StaggerReveal>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16 text-peach-black-45 font-mono text-sm">
                No products found in this category.
              </div>
            )}
          </div>
        </section>

        <section className="section-padding bg-peach-black" aria-labelledby="cta-heading">
          <div className="section-container text-center">
            <StaggerReveal delay={0} duration={500} tag="div" className="max-w-2xl mx-auto">
              <h2 id="cta-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-azure-mist mb-6">
                Didn&apos;t Find What You Need?
              </h2>
              <p className="text-azure-mist/70 body-text mb-8">
                Custom development is our standard. Tell us your specifications and we&apos;ll build it to order.
              </p>
              <Link href="/get-quote" className="btn-magnetic inline-flex">
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

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";