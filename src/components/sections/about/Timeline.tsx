"use client";

import { useRef, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const Timeline = memo(function Timeline({ items }: TimelineProps) {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // We use a ref-based GSAP approach to avoid hydration issues
  const initialized = useRef(false);

  if (typeof window !== "undefined" && !reducedMotion && !initialized.current) {
    // Defer to next tick to ensure DOM is ready
    requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container || initialized.current) return;
      initialized.current = true;

      const line = container.querySelector(".timeline-line-fill") as HTMLElement;
      const cards = container.querySelectorAll(".timeline-card");
      const dots = container.querySelectorAll(".timeline-dot");

      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "bottom 20%",
              scrub: 0.5,
            },
          }
        );
      }

      cards.forEach((card, i) => {
        gsap.fromTo(
          card as HTMLElement,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card as HTMLElement,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      dots.forEach((dot) => {
        gsap.fromTo(
          dot as HTMLElement,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: dot as HTMLElement,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    });
  }

  return (
    <div ref={containerRef} className="relative max-w-4xl mx-auto">
      {/* Animated center line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-200/30 via-accent-300/20 to-accent-200/30 md:-translate-x-px">
        <div className="timeline-line-fill absolute inset-0 bg-gradient-to-b from-accent-400 via-accent-500 to-accent-400" />
      </div>

      <div className="space-y-6 md:space-y-8">
        {items.map((item, i) => (
          <div
            key={item.year}
            className={`relative flex items-start gap-4 md:gap-0 timeline-card ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
          >
            {/* Dot on line */}
            <div className="absolute left-4 md:left-1/2 z-10 -translate-x-1/2 mt-5">
              <div className="timeline-dot w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent-500 border-[3px] border-bg-base shadow-md shadow-accent-500/20" />
            </div>

            {/* Spacer for mobile */}
            <div className="ml-10 md:hidden" />

            {/* Card — alternating sides on desktop */}
            <div
              className={`ml-10 md:ml-0 md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"}`}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-50 border border-accent-100 mb-2">
                <span className="font-unbounded text-xs font-bold text-accent-600">
                  {item.year}
                </span>
              </div>
              <div className="p-4 md:p-5 rounded-2xl bg-bg-elevated border border-border-subtle hover:border-accent-200 transition-all duration-300 hover:shadow-float">
                <h4 className="font-unbounded font-bold text-sm md:text-base text-fg-primary mb-1">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-fg-secondary font-onest font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>

            {/* Fill other side on desktop */}
            <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
          </div>
        ))}
      </div>
    </div>
  );
});

export default Timeline;
