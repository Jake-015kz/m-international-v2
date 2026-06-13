"use client";

import { type ReactNode, memo, useCallback, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eye, Star, Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

/* ═══════════════════════════════════════════════════════════════
   ProductCardV2 — Premium Awwwards-inspired product card
   
   Design patterns from design-ux-ui/pro:
   • Noise texture overlay for tactile depth
   • Gradient border reveal on hover (conic-gradient animation)
   • Cursor-following glow spotlight
   • Smooth image zoom with spring physics
   • Entry stagger + scroll-triggered reveal
   • KZT price formatting with discount badge
   • 3 states: default / hover / out-of-stock
   • Loading skeleton with shimmer
   • Responsive: mobile-first, 3 breakpoints (sm/md/lg)
   
   Accessibility: article landmark, aria-label, focus-visible ring,
   44px touch targets, sr-only price/ stock context.
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

/* ── Star rating (1-5 with half-star support) ── */
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
      className="flex flex-col h-full rounded-2xl bg-[var(--bg-elevated)] overflow-hidden shadow-[0_4px_24px_oklch(0%_0_0_/_0.06),0_1px_4px_oklch(0%_0_0_/_0.04)]"
      aria-hidden="true"
      role="presentation"
    >
      <div className="relative h-40 sm:h-48 md:h-56 bg-[var(--bg-sunken)]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--bg-alt)] to-transparent animate-[shimmer_1.5s_infinite]" />
      </div>
      <div className="flex flex-col flex-1 p-3 sm:p-4 md:p-5 space-y-2.5">
        <div className="h-3 w-20 rounded bg-[var(--bg-sunken)] animate-pulse" />
        <div className="h-4 w-3/4 rounded bg-[var(--bg-sunken)] animate-pulse" />
        <div className="h-3 w-full rounded bg-[var(--bg-sunken)] animate-pulse" />
        <div className="h-3 w-2/3 rounded bg-[var(--bg-sunken)] animate-pulse" />
        <div className="pt-2 mt-auto flex items-center justify-between">
          <div className="h-5 w-16 rounded bg-[var(--bg-sunken)] animate-pulse" />
          <div className="h-9 w-28 rounded-lg bg-[var(--bg-sunken)] animate-pulse" />
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
  const [isHovered, setIsHovered] = useState(false);

  /* Cursor tracking for glow spotlight */
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 25 });
  const glowX = useTransform(springX, (v) => `${(v + 0.5) * 100}%`);
  const glowY = useTransform(springY, (v) => `${(v + 0.5) * 100}%`);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cursorX.set((e.clientX - rect.left) / rect.width - 0.5);
    cursorY.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [cursorX, cursorY]);

  const handleMouseLeave = useCallback(() => {
    cursorX.set(0);
    cursorY.set(0);
    setIsHovered(false);
  }, [cursorX, cursorY]);

  /* Loading state */
  if (isLoading) return <CardSkeleton />;

  const allBadges = badge ? [badge, ...badges] : badges;
  const hasDiscount = oldPrice && price && oldPrice > price;
  const discountPct = hasDiscount
    ? Math.round(((oldPrice! - price!) / oldPrice!) * 100)
    : 0;

  return (
    <motion.article
      ref={cardRef}
      className={cn(
        "group relative flex flex-col h-full rounded-2xl overflow-hidden",
        "bg-[var(--bg-elevated)] shadow-[0_4px_24px_oklch(0%_0_0_/_0.06),0_1px_4px_oklch(0%_0_0_/_0.04)]",
        "transition-shadow duration-300",
        "hover:shadow-[0_8px_40px_oklch(0%_0_0_/_0.1),0_2px_8px_oklch(0%_0_0_/_0.05)]",
        isOutOfStock && "opacity-60",
        featured && "sm:col-span-2"
      )}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{
        delay: index * 0.05,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      aria-label={`${name} — ${subtitle}${isOutOfStock ? ". Нет в наличии" : ""}`}
    >
      {/* ── Noise texture overlay (tactile depth) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.015] mix-blend-overlay rounded-2xl"
        style={{ backgroundImage: "var(--noise-url)" }}
        aria-hidden="true"
      />

      {/* ── Cursor-following glow spotlight ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${String(gx)} ${String(gy)}, ${color}12 0%, transparent 55%)`
          ),
        }}
        aria-hidden="true"
      />

      {/* ── Gradient border overlay on hover ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[2] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(var(--bg-elevated), var(--bg-elevated)) padding-box, linear-gradient(135deg, oklch(50% 0.14 195 / 0.15), oklch(65% 0.18 85 / 0.1), transparent 60%) border-box",
          border: "1px solid transparent",
          borderRadius: "inherit",
        }}
        aria-hidden="true"
      />

      {/* ── Top accent line ── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[1.5px] z-[3] pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${color}40 30%, ${color}70 50%, ${color}40 70%, transparent 95%)`,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />

      {/* ── Image area ── */}
      <div
        className="relative h-40 sm:h-48 md:h-56 cursor-pointer"
        style={{
          background: `linear-gradient(160deg, ${color}06 0%, ${color}10 50%, ${color}06 100%)`,
        }}
        onClick={onClick}
      >
        {image ? (
          <motion.img
            src={image}
            alt={name}
            className={cn(
              "w-full h-full object-contain p-4 sm:p-5 md:p-6",
              isOutOfStock && "grayscale"
            )}
            loading="lazy"
            decoding="async"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] rounded-xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${color}12, ${color}06)`,
                border: `1px solid ${color}20`,
              }}
              whileHover={{ scale: 1.12, rotate: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 14 }}
              aria-hidden="true"
            >
              {icon ?? <Eye className="w-6 h-6 sm:w-7 sm:h-7" style={{ color }} />}
            </motion.div>
          </div>
        )}

        {/* Decorative blob */}
        <motion.div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-[0.06] pointer-events-none"
          style={{ background: `radial-gradient(circle, ${color}, transparent)` }}
          animate={isHovered ? { scale: 1.2, opacity: 0.12 } : { scale: 1, opacity: 0.06 }}
          transition={{ duration: 0.6 }}
          aria-hidden="true"
        />

        {/* Gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--bg-elevated)] to-transparent pointer-events-none" aria-hidden="true" />

        {/* ── Top overlay: wishlist + badges ── */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between z-10">
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onWishlist?.();
            }}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center shrink-0",
              "bg-[var(--bg-elevated)]/80 backdrop-blur-sm border border-[var(--border-subtle)]",
              "hover:bg-[var(--bg-elevated)] hover:border-[var(--border-default)]",
              "transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-400)] focus-visible:ring-offset-1"
            )}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.92 }}
            aria-label={isWishlisted ? "Убрать из избранного" : "Добавить в избранное"}
            aria-pressed={isWishlisted}
          >
            <Heart
              className={cn(
                "w-4 h-4 transition-colors duration-200",
                isWishlisted
                  ? "fill-[var(--coral-500)] text-[var(--coral-500)]"
                  : "text-[var(--fg-tertiary)]"
              )}
            />
          </motion.button>

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
      <div className="relative z-10 flex flex-col flex-1 p-3 sm:p-4 md:p-5">
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

        {/* Benefits badges */}
        {benefits.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3" aria-label="Преимущества">
            {benefits.slice(0, 3).map((b) => (
              <Badge
                key={b}
                variant="outline"
                className="text-[9px] sm:text-[10px] font-onest px-1.5 py-0.5 h-auto border-[var(--border-subtle)]"
                style={{ borderColor: `${color}20`, color }}
              >
                {b}
              </Badge>
            ))}
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* ── Footer: price + CTA ── */}
        <div className="flex items-end justify-between gap-2 pt-3 mt-1 border-t border-[var(--border-subtle)]/60">
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

      {/* ── Bottom accent line ── */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] pointer-events-none z-[3]"
        style={{
          background: `linear-gradient(90deg, transparent 5%, ${color}70 30%, ${color} 50%, ${color}70 70%, transparent 95%)`,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />
    </motion.article>
  );
});

export default ProductCardV2;
export { CardSkeleton };
