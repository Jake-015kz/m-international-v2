"use client";

import { type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

interface ProductCardProps {
  name: string;
  subtitle: string;
  description: string;
  color: string;
  icon: ReactNode;
  index?: number;
  featured?: boolean;
  href?: string;
}

export default function ProductCard({
  name,
  subtitle,
  description,
  color,
  icon,
  index = 0,
  featured = false,
  href = "#",
}: ProductCardProps) {
  return (
    <div
      className={`group relative flex flex-col h-full overflow-hidden rounded-2xl bg-surface-elevated border border-border-subtle hover:border-border-default hover:shadow-md transition-all duration-300 cursor-pointer ${featured ? "sm:col-span-2" : ""}`}
      onClick={() => {
        if (href !== "#") window.location.href = href;
      }}
    >
      {/* Content */}
      <div className={`flex flex-col flex-1 ${featured ? "p-6 md:p-8" : "p-5 md:p-6"}`}>
        {/* Icon + subtitle */}
        <div className="flex items-center gap-2 mb-3">
          <span style={{ color }}>{icon}</span>
          <span
            className="text-[10px] md:text-xs font-medium font-onest"
            style={{ color }}
          >
            {subtitle}
          </span>
        </div>

        {/* Name */}
        <h3 className={`font-unbounded font-bold leading-[1.2] tracking-normal text-text-primary mb-2 ${featured ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
          {name}
        </h3>

        {/* Description */}
        <p className={`text-text-secondary font-onest font-light leading-relaxed mb-5 line-clamp-3 flex-1 ${featured ? "text-sm md:text-base" : "text-xs md:text-sm"}`}>
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

      {/* Bottom accent line — only for featured */}
      {featured && (
        <div
          className="h-1 w-full opacity-60"
          style={{ background: color }}
        />
      )}
    </div>
  );
}
