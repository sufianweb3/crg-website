"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

type FormStatus = "idle" | "submitting" | "success" | "error";

interface FormDataFields {
  name: string;
  email: string;
  phone: string;
  country: string;
  orderQuantity: string;
  product: string[];
  message: string;
  file: File | null;
}

type FormData = FormDataFields;

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  country: "",
  orderQuantity: "",
  product: [],
  message: "",
  file: null,
};

const productOptions = [
  { value: "knit-sportswear", label: "Knit Garments & Sportswear" },
  { value: "sweaters-flat-knit", label: "Sweaters & Flat Knit" },
  { value: "woven-denim", label: "Woven & Denim" },
  { value: "uniforms-protective", label: "Uniforms & Protective Wear" },
  { value: "custom", label: "Custom / Other" },
];

const countryOptions = [
  { value: "", label: "Select Country" },
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "IT", label: "Italy" },
  { value: "ES", label: "Spain" },
  { value: "NL", label: "Netherlands" },
  { value: "BE", label: "Belgium" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "OTHER", label: "Other" },
];

const quantityOptions = [
  { value: "", label: "Select Quantity" },
  { value: "1-500", label: "1 - 500 units" },
  { value: "501-1000", label: "501 - 1,000 units" },
  { value: "1001-5000", label: "1,001 - 5,000 units" },
  { value: "5001-10000", label: "5,001 - 10,000 units" },
  { value: "10000+", label: "10,000+ units" },
];

export default function GetQuotePage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const validateField = (name: keyof FormData, value: string | string[] | File | null): string => {
    switch (name) {
      case "name":
        return typeof value === "string" && value.trim().length >= 2 ? "" : "Name must be at least 2 characters";
      case "email":
        return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Please enter a valid email address";
      case "phone":
        return typeof value === "string" && value.trim().length >= 8 ? "" : "Please enter a valid phone number";
      case "country":
        return value ? "" : "Please select a country";
      case "orderQuantity":
        return value ? "" : "Please select an order quantity";
      case "product":
        return Array.isArray(value) && value.length > 0 ? "" : "Please select at least one product category";
      case "message":
        return typeof value === "string" && value.trim().length >= 10 ? "" : "Message must be at least 10 characters";
      case "file":
        if (value instanceof File) {
          const maxSize = 10 * 1024 * 1024; // 10MB
          const allowedTypes = ["application/pdf", "image/jpeg", "image/png", "application/illustrator"];
          if (value.size > maxSize) return "File size must be less than 10MB";
          if (!allowedTypes.includes(value.type)) return "Allowed formats: PDF, JPG, PNG, AI";
        }
        return "";
      default:
        return "";
    }
  };

  const handleChange = (name: keyof FormData, value: string | string[] | File | null) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    (Object.keys(initialFormData) as Array<keyof FormData>).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    setTouched(
      Object.keys(initialFormData).reduce((acc, key) => ({ ...acc, [key]: true }), {}) as Partial<Record<keyof FormData, boolean>>
    );
    setErrors(newErrors);

    if (hasErrors) return;

    setStatus("submitting");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("orderQuantity", formData.orderQuantity);
      formData.product.forEach((p) => formDataToSend.append("product", p));
      formDataToSend.append("message", formData.message);
      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      // TODO: Replace with actual submission endpoint
      // const response = await fetch("/api/submit-quote", {
      //   method: "POST",
      //   body: formDataToSend,
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("success");
      setFormData(initialFormData);
      setTouched({});
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleChange("file", file);
  };

  const handleProductChange = (value: string) => {
    const current = formData.product;
    const newProducts = current.includes(value)
      ? current.filter((p) => p !== value)
      : [...current, value];
    handleChange("product", newProducts);
  };

  if (status === "success") {
    return (
      <>
        <Header />
        <main id="main-content" className="flex-1 pt-16 lg:pt-20">
          <section className="section-padding bg-azure-mist" aria-labelledby="success-heading">
            <div className="section-container">
              <div className="max-w-xl mx-auto text-center">
                <StaggerReveal delay={0} duration={600} tag="div" className="space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-peach-black flex items-center justify-center">
                    <svg className="w-10 h-10 text-azure-mist" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h1 id="success-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black">
                    Thanks. Your inquiry is in.
                  </h1>
                  <p className="body-text text-peach-black-70">
                    Our team will respond within [24] hours.
                  </p>
                  <a href="/" className="btn-primary inline-flex mt-4">
                    Back to Home
                  </a>
                </StaggerReveal>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main id="main-content" className="flex-1 pt-16 lg:pt-20">
        <section className="section-padding bg-azure-mist" aria-labelledby="quote-heading">
          <div className="section-container">
            <StaggerReveal delay={0} duration={500} tag="div" className="max-w-3xl">
              <p className="section-label">Get a Quote</p>
              <h1 id="quote-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black mt-2">
                Tell Us What You&apos;re Building
              </h1>
              <p className="body-text mt-6">
                Fill in the details below. We&apos;ll review and get back to you with a clear proposal.
              </p>
            </StaggerReveal>

            <StaggerReveal delay={100} duration={500} tag="form" className="mt-12 max-w-2xl">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-mono text-sm font-medium text-peach-black mb-2">
                      Name <span className="text-peach-black-45" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      className={`w-full px-4 py-3 bg-azure-mist border-2 transition-colors duration-200 font-mono text-sm ${
                        errors.name || (touched.name && formData.name)
                          ? "border-peach-black"
                          : "border-hairline focus:border-peach-black"
                      } focus:outline-none focus:ring-0`}
                      aria-invalid={errors.name ? "true" : "false"}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      disabled={status === "submitting"}
                    />
                    {errors.name && (
                      <p id="name-error" className="mt-1 text-sm text-peach-black" role="alert">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-mono text-sm font-medium text-peach-black mb-2">
                      Email <span className="text-peach-black-45" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      onBlur={() => handleBlur("email")}
                      className={`w-full px-4 py-3 bg-azure-mist border-2 transition-colors duration-200 font-mono text-sm ${
                        errors.email || (touched.email && formData.email)
                          ? "border-peach-black"
                          : "border-hairline focus:border-peach-black"
                      } focus:outline-none focus:ring-0`}
                      aria-invalid={errors.email ? "true" : "false"}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      disabled={status === "submitting"}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1 text-sm text-peach-black" role="alert">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block font-mono text-sm font-medium text-peach-black mb-2">
                      Phone <span className="text-peach-black-45" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      onBlur={() => handleBlur("phone")}
                      className={`w-full px-4 py-3 bg-azure-mist border-2 transition-colors duration-200 font-mono text-sm ${
                        errors.phone || (touched.phone && formData.phone)
                          ? "border-peach-black"
                          : "border-hairline focus:border-peach-black"
                      } focus:outline-none focus:ring-0`}
                      aria-invalid={errors.phone ? "true" : "false"}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                      disabled={status === "submitting"}
                    />
                    {errors.phone && (
                      <p id="phone-error" className="mt-1 text-sm text-peach-black" role="alert">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="country" className="block font-mono text-sm font-medium text-peach-black mb-2">
                      Country <span className="text-peach-black-45" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={(e) => handleChange("country", e.target.value)}
                      onBlur={() => handleBlur("country")}
                      className={`w-full px-4 py-3 bg-azure-mist border-2 transition-colors duration-200 font-mono text-sm appearance-none ${
                        errors.country || (touched.country && formData.country)
                          ? "border-peach-black"
                          : "border-hairline focus:border-peach-black"
                      } focus:outline-none focus:ring-0`}
                      aria-invalid={errors.country ? "true" : "false"}
                      aria-describedby={errors.country ? "country-error" : undefined}
                      disabled={status === "submitting"}
                    >
                      {countryOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {errors.country && (
                      <p id="country-error" className="mt-1 text-sm text-peach-black" role="alert">{errors.country}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="orderQuantity" className="block font-mono text-sm font-medium text-peach-black mb-2">
                      Order Quantity <span className="text-peach-black-45" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="orderQuantity"
                      name="orderQuantity"
                      value={formData.orderQuantity}
                      onChange={(e) => handleChange("orderQuantity", e.target.value)}
                      onBlur={() => handleBlur("orderQuantity")}
                      className={`w-full px-4 py-3 bg-azure-mist border-2 transition-colors duration-200 font-mono text-sm appearance-none ${
                        errors.orderQuantity || (touched.orderQuantity && formData.orderQuantity)
                          ? "border-peach-black"
                          : "border-hairline focus:border-peach-black"
                      } focus:outline-none focus:ring-0`}
                      aria-invalid={errors.orderQuantity ? "true" : "false"}
                      aria-describedby={errors.orderQuantity ? "orderQuantity-error" : undefined}
                      disabled={status === "submitting"}
                    >
                      {quantityOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {errors.orderQuantity && (
                      <p id="orderQuantity-error" className="mt-1 text-sm text-peach-black" role="alert">{errors.orderQuantity}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="product" className="block font-mono text-sm font-medium text-peach-black mb-2">
                      Product Category <span className="text-peach-black-45" aria-hidden="true">*</span>
                    </label>
                    <div className="relative">
                      <div
                        id="product-select-trigger"
                        className={`w-full px-4 py-3 bg-azure-mist border-2 transition-colors duration-200 font-mono text-sm ${
                          errors.product || (touched.product && formData.product.length > 0)
                            ? "border-peach-black"
                            : "border-hairline focus:border-peach-black"
                          }`}
                        role="combobox"
                        aria-expanded="false"
                        aria-controls="product-options"
                        aria-describedby={errors.product ? "product-error" : undefined}
                        onClick={() => document.getElementById("product-options")?.focus()}
                      >
                        {formData.product.length > 0 ? (
                          formData.product.map((p) => {
                            const opt = productOptions.find((o) => o.value === p);
                            return opt ? opt.label : p;
                          }).join(", ")
                        ) : (
                          <span className="text-peach-black-45">Select categories</span>
                        )}
                      </div>
                      <div
                        id="product-options"
                        role="listbox"
                        className="absolute z-10 w-full mt-1 bg-azure-mist border-2 border-hairline max-h-60 overflow-y-auto hidden"
                      >
                        {productOptions.map((opt) => (
                          <label
                            key={opt.value}
                            className="block px-4 py-3 cursor-pointer hover:bg-peach-black/5 transition-colors"
                            role="option"
                            aria-selected={formData.product.includes(opt.value)}
                          >
                            <input
                              type="checkbox"
                              checked={formData.product.includes(opt.value)}
                              onChange={() => handleProductChange(opt.value)}
                              className="sr-only"
                              disabled={status === "submitting"}
                            />
                            <span className="font-mono text-sm">{opt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    {errors.product && (
                      <p id="product-error" className="mt-1 text-sm text-peach-black" role="alert">{errors.product}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block font-mono text-sm font-medium text-peach-black mb-2">
                    Message <span className="text-peach-black-45" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    rows={5}
                    className={`w-full px-4 py-3 bg-azure-mist border-2 transition-colors duration-200 font-mono text-sm resize-y min-h-[120px] ${
                      errors.message || (touched.message && formData.message)
                        ? "border-peach-black"
                        : "border-hairline focus:border-peach-black"
                    } focus:outline-none focus:ring-0`}
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    disabled={status === "submitting"}
                    placeholder="Describe your project: styles, materials, timeline, special requirements..."
                  />
                  {errors.message && (
                    <p id="message-error" className="mt-1 text-sm text-peach-black" role="alert">{errors.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="file" className="block font-mono text-sm font-medium text-peach-black mb-2">
                    Upload File (optional)
                  </label>
                  <div className={`relative border-2 transition-colors duration-200 ${
                    errors.file ? "border-peach-black" : "border-hairline"
                  }`}>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleFileChange}
                      onBlur={() => handleBlur("file")}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      accept=".pdf,.jpg,.jpeg,.png,.ai"
                      disabled={status === "submitting"}
                      aria-describedby="file-hint"
                    />
                    <div className="p-4 text-center">
                      <svg className="w-8 h-8 mx-auto text-peach-black-45 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M17 10V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v6" />
                      </svg>
                      <p className="font-mono text-sm text-peach-black-70">Drag & drop or click to upload</p>
                      <p id="file-hint" className="font-mono text-xs text-peach-black-45 mt-1">
                        Tech packs, references, or spec sheets welcome. Max 10MB. PDF, JPG, PNG, AI.
                      </p>
                      {formData.file && (
                        <p className="font-mono text-sm text-peach-black mt-2">{formData.file.name}</p>
                      )}
                    </div>
                  </div>
                  {errors.file && (
                    <p className="mt-1 text-sm text-peach-black" role="alert">{errors.file}</p>
                  )}
                </div>

                {status === "error" && (
                  <div className="p-4 bg-peach-black/5 border border-peach-black text-peach-black font-mono text-sm" role="alert">
                    Something went wrong. Please try again or email us directly at info@crgattire.com
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className={`btn-primary w-full md:w-auto py-4 px-8 text-lg ${status === "submitting" ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {status === "submitting" ? "Sending..." : "Send Inquiry"}
                </button>
              </form>
            </StaggerReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}