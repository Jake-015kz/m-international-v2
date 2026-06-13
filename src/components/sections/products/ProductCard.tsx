"use client";

import { type ReactNode, memo, useCallback, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import { useTranslations } from "next-intl";
import { MagneticButton } from "@/components/ui";

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
      className="relative z-10 h-40 sm:h-48 md:h-56"
      style={{
        background: `linear-gradient(135deg, ${color}18 0%, ${color}30 50%, ${color}18 100%)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-contain p-4 sm:p-5 md:p-6"
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

/* ── 3D Tilt wrapper ── */
function TiltCard({
  children,
  color,
  onClick,
}: {
  children: ReactNode;
  color: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const springRX = useSpring(rx, { stiffness: 200, damping: 20 });
  const springRY = useSpring(ry, { stiffness: 200, damping: 20 });

  const glowX = useTransform(ry, [-0.5, 0.5], ["20%", "80%"]);
  const glowY = useTransform(rx, [-0.5, 0.5], ["20%", "80%"]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    ry.set((e.clientX - rect.left) / rect.width - 0.5);
    rx.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [rx, ry]);

  const handleMouseLeave = useCallback(() => {
    rx.set(0);
    ry.set(0);
    setIsHovered(false);
  }, [rx, ry]);

  return (
    <motion.div
      ref={ref}
      className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-bg-elevated/80 backdrop-blur-xl shadow-[0_4px_24px_oklch(0%_0_0_/_0.06),0_1px_4px_oklch(0%_0_0_/_0.04)] hover:shadow-[0_8px_40px_oklch(0%_0_0_/_0.1),0_2px_8px_oklch(0%_0_0_/_0.05)] transition-shadow duration-300"
      style={{
        rotateX: springRX,
        rotateY: springRY,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 12 }}
      onClick={onClick}
    >
      {/* Dynamic glow following cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${String(gx)} ${String(gy)}, ${color}15 0%, transparent 60%)`
          ),
        }}
        aria-hidden="true"
      />

      {/* Top accent line on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] z-20"
        style={{ background: `linear-gradient(90deg, transparent, ${color}50, transparent)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      {children}

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 z-20"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}60, ${color}, ${color}60, transparent)`,
        }}
        initial={{ width: 0 }}
        animate={{ width: isHovered ? "100%" : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      />
    </motion.div>
  );
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
  const t = useTranslations("catalog");

  return (
    <motion.article
      className={cn("h-full", featured && "sm:col-span-2")}
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        delay: (index ?? 0) * 0.06,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      aria-label={`${name} — ${subtitle}`}
    >
      <TiltCard color={color} onClick={onClick}>
        {/* Product image area — with parallax */}
        {image ? (
          <ParallaxImage src={image} alt={name} color={color} />
        ) : (
          <div
            className="relative z-10 h-40 sm:h-48 md:h-56"
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
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${color}25, ${color}10)`,
                  border: `1px solid ${color}30`,
                  color: color,
                }}
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10" style={{ color }}>
                  {icon}
                </div>
              </motion.div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-bg-elevated to-transparent" />
          </div>
        )}

        {/* Featured badge */}
        {featured && (
          <motion.div
            className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm"
            initial={{ opacity: 0, scale: 0.5, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 400, damping: 15 }}
          >
            <span className="text-[10px] font-unbounded font-bold" style={{ color }}>
              Хит
            </span>
          </motion.div>
        )}

        {/* Content */}
        <div className={`relative z-10 flex flex-col flex-1 ${featured ? "p-5 md:p-8" : "p-4 md:p-6"} bg-bg-elevated/40 backdrop-blur-sm rounded-b-2xl`}>
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

          {/* Premium CTA button — magnetic + glow */}
          <MagneticButton
            variant="primary"
            size="sm"
            magneticStrength={0.15}
            className="mt-4 w-full anim-glow-pulse"
            onClick={() => onClick?.()}
          >
            <Eye className="w-3.5 h-3.5" />
            {t("details")}
            <motion.span
              className="inline-block ml-1 opacity-50"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </MagneticButton>
        </div>
      </TiltCard>
    </motion.article>
  );
});

export default ProductCard;
