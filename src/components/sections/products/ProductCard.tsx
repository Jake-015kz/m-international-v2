"use client";

import { type ReactNode, memo } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";

interface ProductCardProps {
  name: string;
  subtitle: string;
  description: string;
  color: string;
  icon: ReactNode;
  index?: number;
  featured?: boolean;
  image?: string;
  onClick?: () => void;
}

const ProductCard = memo(function ProductCard({
  name,
  subtitle,
  description,
  color,
  icon,
  index = 0,
  featured = false,
  image,
  onClick,
}: ProductCardProps) {
  return (
    <div
      className={`group relative flex flex-col h-full overflow-hidden rounded-2xl bg-surface-elevated border border-border-subtle hover:border-border-default transition-all duration-500 cursor-pointer product-card-hover ${featured ? "sm:col-span-2" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Подробнее о ${name}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Product image area */}
      <div
        className="relative z-10 h-28 sm:h-40 md:h-44 overflow-hidden"
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
            <div
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle, ${color}60, transparent)` }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle, ${color}40, transparent)` }}
            />
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
      <div className={`relative z-10 flex flex-col flex-1 ${featured ? "p-5 md:p-8" : "p-4 md:p-6"}`}>
        {/* Subtitle */}
        <span
          className="text-[10px] md:text-xs font-medium font-onest uppercase tracking-wider mb-1.5"
          style={{ color }}
        >
          {subtitle}
        </span>

        {/* Name */}
        <h3 className={`font-onest font-bold leading-[1.2] tracking-normal text-text-primary mb-1.5 ${featured ? "text-lg md:text-2xl" : "text-sm md:text-lg"}`}>
          {name}
        </h3>

        {/* Description */}
        <p className={`text-text-secondary font-onest font-light leading-relaxed mb-4 line-clamp-3 flex-1 ${featured ? "text-sm md:text-base" : "text-[11px] md:text-sm"}`}>
          {description}
        </p>

        {/* Button instead of link */}
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-unbounded font-bold transition-all duration-300 hover:-translate-y-0.5 min-h-[44px]"
          style={{
            background: `${color}15`,
            color: color,
            border: `1px solid ${color}30`,
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.();
          }}
        >
          Подробнее
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
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
