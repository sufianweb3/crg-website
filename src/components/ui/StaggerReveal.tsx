"use client";

import React, { useEffect, useRef, useState } from "react";

interface StaggerRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  tag?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  role?: string;
}

export function StaggerReveal({
  children,
  delay = 0,
  duration = 300,
  className = "",
  tag = "div",
  threshold = 0.1,
  rootMargin = "0px",
  once = true,
  role,
}: StaggerRevealProps) {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay, threshold, rootMargin, once]);

  const ChildTag = tag;
  const childArray = React.Children.toArray(children);

  return (
    // @ts-expect-error - dynamic tag type
    <ChildTag ref={elementRef} className={className} role={role}>
      {childArray.map((child, index) => {
        if (!React.isValidElement(child)) return child;

        const childDelay = delay + index * 50;
        const childDuration = duration;

        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          style: {
            ...((child.props as Record<string, unknown>).style as React.CSSProperties || {}),
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(8px)",
            transition: `opacity ${childDuration}ms cubic-bezier(0.23, 1, 0.32, 1), transform ${childDuration}ms cubic-bezier(0.23, 1, 0.32, 1)`,
            transitionDelay: `${childDelay}ms`,
          },
        });
      })}
    </ChildTag>
  );
}