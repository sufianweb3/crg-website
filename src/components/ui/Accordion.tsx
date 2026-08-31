"use client";

import { useState, useRef, useEffect } from "react";

export interface AccordionItemProps {
  id: string;
  question: string;
  answer: React.ReactNode;
  defaultOpen?: boolean;
}

interface AccordionProps {
  items: AccordionItemProps[];
  singleOpen?: boolean;
  className?: string;
}

export function AccordionItem({ id, question, answer, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen && contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div className="border-t border-hairline first:border-t-0">
      <button
        type="button"
        className="w-full px-4 py-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-peach-black focus-visible:ring-offset-2 focus-visible:ring-offset-azure-mist"
        aria-expanded={isOpen}
        aria-controls={`${id}-content`}
        id={`${id}-trigger`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base font-medium text-peach-black pr-8">
          {question}
        </span>
        <svg
          className={`flex-shrink-0 w-5 h-5 text-peach-black-70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          style={{ transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)" }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <div
        id={`${id}-content`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className="overflow-hidden"
        style={{
          maxHeight: isOpen ? `${contentHeight}px` : "0",
          opacity: isOpen ? 1 : 0,
          transition: `max-height 200ms cubic-bezier(0.23, 1, 0.32, 1), opacity 200ms cubic-bezier(0.23, 1, 0.32, 1)`,
        }}
      >
        <div
          ref={contentRef}
          className="px-4 pb-6 body-text"
          style={{ willChange: "height, opacity" }}
        >
          {answer}
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items, singleOpen = true, className = "" }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>(
    items.filter((item) => item.defaultOpen).map((item) => item.id)
  );

  const toggleItem = (id: string) => {
    setOpenIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((openId) => openId !== id);
      }
      return singleOpen ? [id] : [...prev, id];
    });
  };

  return (
    <div className={`${className} w-full`} role="list">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          id={item.id}
          question={item.question}
          answer={item.answer}
          defaultOpen={openIds.includes(item.id)}
        />
      ))}
    </div>
  );
}