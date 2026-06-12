"use client";

import { type ReactNode, memo, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Eye } from "lucide-react";
import { useTranslations } from "next-intl";

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

/* ── Parallax image wrapper ── */
const ParallaxImage = memo(function ParallaxImage({
  src,
  alt,
  color,
}: {
  src: string;
  alt: string;
  color: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const y = useMotionValue(0);
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const delta = (e.clientY - centerY) * 0.08;
      y.set(-delta);
    },
    [y]
  );

  const handleMouseLeave = useCallback(() => {
    y.set(0);
  }, [y]);

  return (
    <div
      ref={ref}
      className="relative z-10 h-36 sm:h-48 md:h-52 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}18 0%, ${color}30 50%, ${color}18 100%)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-contain p-3"
        style={{ y: springY }}
        loading="lazy"
      />

      {/* Decorative blobs */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}60, transparent)` }}
      />
      <div
        className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${color}40, transparent)` }}
      />

      {/* Bottom fade into card */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-bg-elevated to-transparent" />
    </div>
  );
});

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
  const t = useTranslations("catalog");

  return (
    <article
      className={cn(
        "group relative flex flex-col h-full overflow-hidden rounded-2xl bg-bg-elevated border border-border-subtle card-premium-v2",
        featured && "sm:col-span-2"
      )}
      style={{ "--card-glow-color": `${color}25` } as React.CSSProperties}
      aria-label={`${name} — ${subtitle}`}
    >
      {/* Product image area — with parallax */}
      {image ? (
        <ParallaxImage src={image} alt={name} color={color} />
      ) : (
        <div
          className="relative z-10 h-36 sm:h-48 md:h-52 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${color}18 0%, ${color}30 50%, ${color}18 100%)`,
          }}
        >
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
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-bg-elevated to-transparent" />
        </div>
      )}

      {/* Featured badge */}
      {featured && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
          <Sparkles className="w-3 h-3" style={{ color }} />
          <span className="text-[10px] font-unbounded font-bold" style={{ color }}>
            Хит
          </span>
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 flex flex-col flex-1 ${featured ? "p-5 md:p-8" : "p-4 md:p-6"}`}>
        <span
          className="text-[10px] md:text-xs font-medium font-onest uppercase tracking-wider mb-1.5"
          style={{ color }}
        >
          {subtitle}
        </span>
        <h3 className={`font-onest font-bold leading-[1.2] tracking-normal text-fg-primary mb-1.5 ${featured ? "text-lg md:text-2xl" : "text-sm md:text-lg"}`}>
          {name}
        </h3>
        <p className={`text-fg-secondary font-onest font-light leading-relaxed line-clamp-2 ${featured ? "text-sm md:text-base" : "text-[11px] md:text-sm"}`}>
          {description}
        </p>
        <div className="flex-1" />

        {/* Premium CTA button */}
        <button
          type="button"
          className="btn-premium-glow mt-4 w-full"
          style={
            {
              "--btn-glow-color": `${color}40`,
              background: `linear-gradient(135deg, ${color}, ${color})`,
              color: "#fff",
            } as React.CSSProperties
          }
          onClick={() => onClick?.()}
        >
          <Eye className="w-3.5 h-3.5" />
          {t("details")}
        </button>
      </div>

      {/* Bottom accent line */}
      <div
        className="h-0.5 w-0 group-hover:w-full transition-all duration-500 opacity-60"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
        aria-hidden="true"
      />
    </article>
  );
});

export default ProductCard;
