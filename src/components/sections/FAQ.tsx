"use client";

import { Accordion, AccordionItemProps } from "@/components/ui/Accordion";
import { StaggerReveal } from "@/components/ui/StaggerReveal";

const faqItems: AccordionItemProps[] = [
  {
    id: "faq-1",
    question: "What is your minimum order quantity (MOQ)?",
    answer: <p className="text-peach-black-45 font-mono text-sm">[Answer pending from client]</p>,
  },
  {
    id: "faq-2",
    question: "How long does sampling take?",
    answer: <p className="text-peach-black-45 font-mono text-sm">[Answer pending from client]</p>,
  },
  {
    id: "faq-3",
    question: "What is your typical production lead time?",
    answer: <p className="text-peach-black-45 font-mono text-sm">[Answer pending from client]</p>,
  },
  {
    id: "faq-4",
    question: "Which product categories do you manufacture?",
    answer: <p className="text-peach-black-45 font-mono text-sm">[Answer pending from client]</p>,
  },
  {
    id: "faq-5",
    question: "Do you handle fabric and trim sourcing, or do we need to supply our own?",
    answer: <p className="text-peach-black-45 font-mono text-sm">[Answer pending from client]</p>,
  },
  {
    id: "faq-6",
    question: "What certifications do you hold?",
    answer: <p className="text-peach-black-45 font-mono text-sm">[Answer pending from client]</p>,
  },
  {
    id: "faq-7",
    question: "What Incoterms do you support (FOB, CIF, DDP)?",
    answer: <p className="text-peach-black-45 font-mono text-sm">[Answer pending from client]</p>,
  },
  {
    id: "faq-8",
    question: "Do you offer private label / white label manufacturing?",
    answer: <p className="text-peach-black-45 font-mono text-sm">[Answer pending from client]</p>,
  },
  {
    id: "faq-9",
    question: "How do we get started?",
    answer: <p className="text-peach-black-45 font-mono text-sm">[Answer pending from client]</p>,
  },
];

export function FAQ() {
  return (
    <section className="section-padding bg-azure-mist" aria-labelledby="faq-heading">
      <div className="section-container">
        <StaggerReveal delay={0} duration={500} tag="div" className="max-w-3xl">
          <p className="section-label">FAQ</p>
          <h2 id="faq-heading" className="text-[clamp(32px,5vw,56px)] font-medium leading-[1.15] text-peach-black mt-2">
            Your Questions, Answered Directly
          </h2>
        </StaggerReveal>

        <div className="mt-12 max-w-3xl">
          <StaggerReveal delay={100} duration={500} tag="div">
            <Accordion items={faqItems} singleOpen={true} />
          </StaggerReveal>
        </div>
      </div>
    </section>
  );
}