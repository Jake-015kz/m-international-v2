"use client";

import { type ReactNode, memo } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

interface ProductCardProps {
  name: string;
  subtitle: string;
  description: string;
  color: string;
  icon: ReactNode;
  index?: number;
  featured?: boolean;
  href?: string;
  image?: string;
}

const ProductCard = memo(function ProductCard({
  name,
  subtitle,
  description,
  color,
  icon,
  index = 0,
  featured = false,
  href = "#",
  image,
}: ProductCardProps) {
  return (
    <div
      className={`group relative flex flex-col h-full overflow-hidden rounded-2xl bg-surface-elevated border border-border-subtle hover:border-border-default transition-all duration-500 cursor-pointer product-card-hover ${featured ? "sm:col-span-2" : ""}`}
      onClick={() => {
        if (href !== "#") window.location.href = href;
      }}
    >
      {/* Product image area */}
      <div
        className="relative z-10 h-32 sm:h-40 md:h-44 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${color}18 0%, ${color}30 50%, ${color}18 100%)`,
        }}
      >
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <>
            {/* Decorative circles fallback */}
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle, ${color}60, transparent)` }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle, ${color}40, transparent)` }}
            />

            {/* Product icon centered, large */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{
                  background: `linear-gradient(135deg, ${color}25, ${color}10)`,
                  border: `1px solid ${color}30`,
                  color: color,
                }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10" style={{ color }}>
                  {icon}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
            <Sparkles className="w-3 h-3" style={{ color }} />
            <span className="text-[10px] font-unbounded font-bold" style={{ color }}>
              Хит
            </span>
          </div>
        )}

        {/* Bottom fade into card */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-surface-elevated to-transparent" />
      </div>

      {/* Content */}
      <div className={`relative z-10 flex flex-col flex-1 ${featured ? "p-6 md:p-8" : "p-5 md:p-6"}`}>
        {/* Subtitle */}
        <span
          className="text-[10px] md:text-xs font-medium font-onest uppercase tracking-wider mb-2"
          style={{ color }}
        >
          {subtitle}
        </span>

        {/* Name */}
        <h3 className={`font-onest font-bold leading-[1.2] tracking-normal text-text-primary mb-2 ${featured ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}>
          {name}
        </h3>

        {/* Description */}
        <p className={`text-text-secondary font-onest font-light leading-relaxed mb-5 line-clamp-3 flex-1 ${featured ? "text-sm md:text-base" : "text-xs md:text-sm"}`}>
          {description}
        </p>

        {/* Link */}
        <div className="inline-flex items-center gap-1.5 text-xs md:text-sm font-medium transition-all duration-300 group-hover:gap-3">
          <span style={{ color }} className="font-onest font-bold">Подробнее</span>
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
            style={{ color }}
          />
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-500 opacity-60"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />
    </div>
  );
});

export default ProductCard;
