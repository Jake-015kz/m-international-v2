"use client";

import { type ReactNode, useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  name: string;
  subtitle: string;
  description: string;
  color: string;
  icon: ReactNode;
  index?: number;
  href?: string;
}

export default function ProductCard({
  name,
  subtitle,
  description,
  color,
  icon,
  index = 0,
  href = "#",
}: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative flex flex-col h-full overflow-hidden rounded-3xl transition-all duration-500 cursor-pointer"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s, box-shadow 0.4s ease, border-color 0.4s ease`,
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        boxShadow: isHovered
          ? `0 20px 60px rgba(0,0,0,0.08), 0 0 40px ${color}15`
          : "inset 0 0 30px rgba(255,255,255,0.01)",
        ...(isHovered ? { borderColor: `${color}30`, transform: "translateY(-6px)" } : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (href !== "#") window.location.href = href;
      }}
    >
      {/* Top accent line */}
      <div
        className="h-[2px] w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          opacity: 0.5,
        }}
        aria-hidden="true"
      />

      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-3xl"
        style={{
          background: `radial-gradient(ellipse at 50% 30%, ${color}10 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 md:p-7 relative z-10">
        {/* Icon + subtitle */}
        <div className="flex items-center gap-1.5 mb-3">
          <span style={{ color }}>{icon}</span>
          <span
            className="text-[9px] md:text-[10px] font-medium uppercase tracking-wider font-onest"
            style={{ color }}
          >
            {subtitle}
          </span>
        </div>

        {/* Name */}
        <h3 className="font-unbounded font-bold text-lg md:text-xl leading-[1.2] tracking-normal text-[#1A1A1A] mb-2">
          {name}
        </h3>

        {/* Description */}
        <p className="text-xs md:text-sm text-zinc-500 font-onest font-light leading-relaxed mb-5 line-clamp-3 flex-1">
          {description}
        </p>

        {/* Link */}
        <div className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium transition-all duration-300 group-hover:gap-2.5">
          <span style={{ color }}>Подробнее</span>
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            style={{ color }}
          />
        </div>
      </div>
    </div>
  );
}
