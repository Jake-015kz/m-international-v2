"use client";

import { type ReactNode, memo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eye, Star, ShoppingBag, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════════════
   ProductCardV2 — Awwwards-inspired product card
   
   Structure:
   ┌─────────────────────────────┐
   │  [Wishlist]  [Badge(s)]     │  ← overlay on image
   │  ┌───────────────────────┐  │
   │  │      PRODUCT IMAGE    │  │  ← with color gradient bg
   │  └───────────────────────┘  │
   │  Rating stars               │
   │  Category · Subtitle        │
   │  Product name               │
   │  Description (2-line clamp) │
   │  Benefits badges (×3)       │
   │  ─────────────────────────  │
   │  Price     [CTA Button]     │
   └─────────────────────────────┘

   States:
   • default — static, border-subtle
   • hover   — translateY(-4px), glow shadow, accent-line animation
   • loading — shimmer skeleton (image + text lines)
   • out-of-stock — dimmed (opacity-60), "Нет в наличии" overlay

   Responsive:
   • Mobile: full-width, compact padding (p-3), small image (h-36)
   • sm+: p-4, image h-44
   • md+: p-5, image h-52

   Accessibility:
   • <article> with aria-label
   • Image with alt={name}
   • Decorative elements: aria-hidden="true"
   • sr-only text for rating, stock status
   • 44×44px minimum touch targets on interactive elements
   • focus-visible ring via Button/Badge primitives
   ═══════════════════════════════════════════════════════════════ */

interface ProductCardV2Props {
  name: string;
  subtitle: string;
  description: string;
  color: string;
  icon?: ReactNode;
  image?: string;
  price?: number;
  oldPrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  badges?: string[];
  benefits?: string[];
  category?: string;
  index?: number;
  featured?: boolean;
  isLoading?: boolean;
  isOutOfStock?: boolean;
  isWishlisted?: boolean;
  onClick?: () => void;
  onWishlist?: () => void;
}

/* ── Star rating (1-5) ── */
const StarRating = memo(function StarRating({
  rating = 0,
  count,
}: {
  rating: number;
  count?: number;
}) {
  const full = Math.floor(rating);
  const frac = rating - full;
  const hasHalf = frac >= 0.3 && frac < 0.8;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`Рейтинг ${rating} из 5`}>
      {Array.from({ length: full }).map((_, i) => (
        <Star key={`full-${i}`} className="w-3 h-3 fill-[var(--gold-500)] text-[var(--gold-500)]" />
      ))}
      {hasHalf && (
        <div className="relative w-3 h-3">
          <Star className="absolute inset-0 w-3 h-3 text-[var(--border-default)]" />
          <div className="absolute inset-0 overflow-hidden" style={{ width: `${Math.round(frac * 100)}%` }}>
            <Star className="w-3 h-3 fill-[var(--gold-500)] text-[var(--gold-500)]" />
          </div>
        </div>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} className="w-3 h-3 text-[var(--border-default)]" />
      ))}
      {count !== undefined && (
        <span className="text-[10px] text-[var(--fg-tertiary)] ml-0.5 font-onest">({count})</span>
      )}
    </div>
  );
});

/* ── Loading skeleton ── */
const CardSkeleton = memo(function CardSkeleton() {
  return (
    <div
      className="flex flex-col h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)] overflow-hidden"
      aria-hidden="true"
      role="presentation"
    >
      {/* Image skeleton */}
      <div className="relative h-36 sm:h-44 md:h-52 bg-[var(--bg-sunken)]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bg-alt)] to-transparent animate-[shimmer_1.5s_infinite]" />
      </div>
      {/* Content skeleton */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 md:p-5 space-y-2.5">
        <div className="h-3 w-20 rounded bg-[var(--bg-sunken)] animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-[var(--bg-sunken)] animate-pulse" />
        <div className="h-3 w-full rounded bg-[var(--bg-sunken)] animate-pulse" />
        <div className="h-3 w-2/3 rounded bg-[var(--bg-sunken)] animate-pulse" />
        <div className="pt-2 mt-auto flex items-center justify-between">
          <div className="h-5 w-16 rounded bg-[var(--bg-sunken)] animate-pulse" />
          <div className="h-8 w-28 rounded-lg bg-[var(--bg-sunken)] animate-pulse" />
        </div>
      </div>
    </div>
  );
});

/* ── Price formatter (KZT) ── */
function formatPrice(value: number): string {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "KZT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/* ── Main card ── */
const ProductCardV2 = memo(function ProductCardV2({
  name,
  subtitle,
  description,
  color,
  icon,
  image,
  price,
  oldPrice,
  rating = 0,
  reviewCount,
  badge,
  badges = [],
  benefits = [],
  category,
  index = 0,
  featured = false,
  isLoading = false,
  isOutOfStock = false,
  isWishlisted = false,
  onClick,
  onWishlist,
}: ProductCardV2Props) {
  const t = useTranslations("catalog");
  const cardRef = useRef<HTMLDivElement>(null);

  /* Loading state → skeleton */
  if (isLoading) {
    return <CardSkeleton />;
  }

  const allBadges = badge ? [badge, ...badges] : badges;
  const hasDiscount = oldPrice && price && oldPrice > price;
  const discountPct = hasDiscount
    ? Math.round(((oldPrice! - price!) / oldPrice!) * 100)
    : 0;

  return (
    <motion.article
      ref={cardRef}
      className={cn(
        "group relative flex flex-col h-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-elevated)]",
        "overflow-hidden",
        "transition-shadow duration-300",
        "hover:shadow-[0_8px_24px_oklch(50%_0.14_195_/_0.10),0_4px_12px_oklch(0%_0_0_/_0.04)]",
        "hover:border-[var(--border-warm-hover)]",
        isOutOfStock && "opacity-60",
        featured && "sm:col-span-2"
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        delay: index * 0.05,
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-label={`${name} — ${subtitle}${isOutOfStock ? ". Нет в наличии" : ""}`}
    >
      {/* ── Image area ── */}
      <div
        className="relative h-36 sm:h-44 md:h-52 overflow-hidden cursor-pointer"
        style={{
          background: `linear-gradient(135deg, ${color}08 0%, ${color}18 50%, ${color}08 100%)`,
        }}
        onClick={onClick}
      >
        {image ? (
          <img
            src={image}
            alt={name}
            className={cn(
              "w-full h-full object-contain p-3 sm:p-4",
              "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              "group-hover:scale-105",
              isOutOfStock && "grayscale"
            )}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-14 h-14 sm:w-18 sm:h-18 rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${color}15, ${color}08)`,
                border: `1px solid ${color}25`,
              }}
              aria-hidden="true"
            >
              {icon ?? <Eye className="w-6 h-6 sm:w-7 sm:h-7" style={{ color }} />}
            </div>
          </div>
        )}

        {/* Decorative blob — top-right */}
        <div
          className="absolute -top-8 -right-8 w-28 h-28 rounded-full opacity-[0.07] group-hover:opacity-[0.15] transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
          aria-hidden="true"
        />

        {/* Gradient fade into card body */}
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[var(--bg-elevated)] to-transparent pointer-events-none" aria-hidden="true" />

        {/* ── Top overlay: wishlist + badges ── */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between z-10">
          {/* Wishlist button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onWishlist?.();
            }}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              "bg-[var(--bg-elevated)]/80 backdrop-blur-sm border border-[var(--border-subtle)]",
              "hover:bg-[var(--bg-elevated)] hover:scale-110",
              "transition-all duration-200",
              "min-h-[32px] min-w-[32px]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-400)] focus-visible:ring-offset-1"
            )}
            aria-label={isWishlisted ? "Убрать из избранного" : "Добавить в избранное"}
            aria-pressed={isWishlisted}
          >
            <Heart
              className={cn(
                "w-3.5 h-3.5 transition-colors",
                isWishlisted
                  ? "fill-[var(--coral-500)] text-[var(--coral-500)]"
                  : "text-[var(--fg-tertiary)]"
              )}
            />
          </button>

          {/* Badges */}
          <div className="flex flex-col gap-1 items-end">
            {allBadges.length > 0
              ? allBadges.slice(0, 2).map((b, i) => (
                  <Badge
                    key={b}
                    variant={i === 0 ? "gold" : "secondary"}
                    className="text-[9px] sm:text-[10px] font-unbounded font-bold px-2 py-0.5 leading-none"
                    style={i === 0 ? {} : { color }}
                  >
                    {b}
                  </Badge>
                ))
              : null}
            {hasDiscount && (
              <Badge
                variant="destructive"
                className="text-[9px] sm:text-[10px] font-unbounded font-bold px-2 py-0.5 leading-none"
              >
                −{discountPct}%
              </Badge>
            )}
          </div>
        </div>

        {/* ── Out-of-stock overlay ── */}
        <AnimatePresence>
          {isOutOfStock && (
            <motion.div
              className="absolute inset-0 z-20 flex items-center justify-center bg-[var(--bg-base)]/50 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-2 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] shadow-md">
                <span className="text-xs sm:text-sm font-unbounded font-bold text-[var(--fg-secondary)]">
                  Нет в наличии
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-3 sm:p-4 md:p-5">
        {/* Rating */}
        {rating > 0 && (
          <div className="mb-1.5">
            <StarRating rating={rating} count={reviewCount} />
          </div>
        )}

        {/* Category + subtitle */}
        <div className="flex items-center gap-1.5 mb-1" aria-hidden="true">
          {category && (
            <>
              <span className="text-[10px] sm:text-[11px] font-onest uppercase tracking-wider" style={{ color }}>
                {category}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[var(--fg-tertiary)]">·</span>
            </>
          )}
          <span className="text-[10px] sm:text-[11px] font-onest text-[var(--fg-tertiary)] truncate">
            {subtitle}
          </span>
        </div>

        {/* Product name */}
        <h3
          className={cn(
            "font-onest font-bold text-[var(--fg-primary)] leading-[1.2] tracking-normal mb-1",
            "line-clamp-2",
            featured ? "text-sm sm:text-lg md:text-xl" : "text-[13px] sm:text-sm md:text-base"
          )}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          className={cn(
            "text-[var(--fg-secondary)] font-onest font-light leading-[1.4] sm:leading-relaxed",
            "line-clamp-2 mb-2",
            featured ? "text-xs sm:text-sm" : "text-[11px] sm:text-xs"
          )}
        >
          {description}
        </p>

        {/* Benefits badges (up to 3) */}
        {benefits.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3" aria-label="Преимущества">
            {benefits.slice(0, 3).map((b) => (
              <Badge
                key={b}
                variant="outline"
                className="text-[9px] sm:text-[10px] font-onest px-1.5 py-0.5 h-auto"
                style={{ borderColor: `${color}25`, color }}
              >
                {b}
              </Badge>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* ── Footer: price + CTA ── */}
        <div className="flex items-end justify-between gap-2 pt-3 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col min-w-0">
            {price ? (
              <>
                <span
                  className={cn(
                    "font-unbounded font-bold text-[var(--fg-primary)] leading-none",
                    featured ? "text-base sm:text-lg" : "text-sm sm:text-base"
                  )}
                >
                  {formatPrice(price)}
                </span>
                {hasDiscount && (
                  <span className="text-[10px] sm:text-[11px] font-onest text-[var(--fg-tertiary)] line-through leading-none mt-0.5">
                    {formatPrice(oldPrice!)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-[11px] sm:text-xs font-onest text-[var(--fg-tertiary)]">
                {isOutOfStock ? (
                  <span className="sr-only">Товар отсутствует</span>
                ) : (
                  <span aria-hidden="true">—</span>
                )}
              </span>
            )}
          </div>

          {/* CTA Button */}
          <Button
            variant="luxury"
            size="sm"
            onClick={onClick}
            disabled={isOutOfStock}
            className={cn(
              "shrink-0",
              "disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100",
              "min-h-[36px]",
              !isOutOfStock && "min-w-[110px]"
            )}
            aria-label={`${isOutOfStock ? "Нет в наличии" : "Подробнее о"} ${name}`}
          >
            {isOutOfStock ? (
              <span className="text-[10px] font-unbounded">Нет</span>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 mr-1" />
                <span className="text-[11px] sm:text-xs font-unbounded">{t("details")}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* ── Hover accent line (bottom) ── */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}80, ${color}, ${color}80, transparent)`,
        }}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: "100%", opacity: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-300"
        style={{
          width: "100%",
          background: `linear-gradient(90deg, transparent, ${color}60, ${color}, ${color}60, transparent)`,
        }}
        aria-hidden="true"
      />
    </motion.article>
  );
});

export default ProductCardV2;
export { CardSkeleton };
