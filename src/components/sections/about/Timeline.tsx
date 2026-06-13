"use client";

import { memo, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { EASE_REVEAL } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/motion";

interface TimelineItem {
  year: string;
  title: string;
  desc: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

/* ── Animated timeline line (scroll-driven progress) ── */
function TimelineLine() {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 20%"],
  });

  const scaleY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { stiffness: 100, damping: 20, mass: 0.5 }
  );

  if (reducedMotion) {
    return (
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-200/30 via-accent-300/20 to-accent-200/30 md:-translate-x-px" />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-200/30 via-accent-300/20 to-accent-200/30 md:-translate-x-px"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-accent-400 via-accent-500 to-accent-400 origin-top"
        style={{ scaleY }}
      />
    </div>
  );
}

/* ── Single timeline card ── */
function TimelineCard({
  item,
  index,
}: {
  item: TimelineItem;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex items-start gap-4 md:gap-0 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: EASE_REVEAL,
      }}
    >
      {/* Dot on line */}
      <motion.div
        className="absolute left-4 md:left-1/2 z-10 -translate-x-1/2 mt-5"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{
          delay: index * 0.08 + 0.2,
          duration: 0.4,
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
      >
        <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent-500 border-[3px] border-bg-base shadow-md shadow-accent-500/20" />
      </motion.div>

      {/* Spacer for mobile */}
      <div className="ml-10 md:hidden" />

      {/* Card — alternating sides on desktop */}
      <div
        className={`ml-10 md:ml-0 md:w-[calc(50%-2.5rem)] ${isEven ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"}`}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-50 border border-accent-100 mb-2">
          <span className="font-unbounded text-xs font-bold text-accent-600">
            {item.year}
          </span>
        </div>
        <div className="p-4 md:p-5 rounded-2xl bg-[#FFFFFF] border border-[var(--border-soft)] shadow-[var(--shadow-soft)] hover:border-accent-200 transition-all duration-300 hover:shadow-float">
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
    </motion.div>
  );
}

/* ── Main Timeline ── */
const Timeline = memo(function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative max-w-4xl mx-auto">
      <TimelineLine />

      <div className="space-y-6 md:space-y-8">
        {items.map((item, i) => (
          <TimelineCard key={item.year} item={item} index={i} />
        ))}
      </div>
    </div>
  );
});

export default Timeline;
