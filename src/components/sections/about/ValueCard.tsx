"use client";

import { type ReactNode, useRef, useState, useCallback, memo } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
  className?: string;
}

const ValueCard = memo(function ValueCard({
  icon,
  title,
  description,
  color = "oklch(55% 0.18 160)",
  className,
}: ValueCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const springConfig = { stiffness: 300, damping: 20 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const glowX = useTransform(x, [-0.5, 0.5], ["15%", "85%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["15%", "85%"]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      x.set(relX);
      y.set(relY);
    },
    [x, y]
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={cn(
      "group relative p-4 md:p-5 rounded-2xl bg-[#FFFFFF] border border-[var(--border-soft)] shadow-[var(--shadow-soft)] overflow-hidden cursor-default",
      className
      )}
      role="article"
      aria-label={title}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ z: 8 }}
    >
      {/* Dynamic glow following cursor */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl z-0"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(circle at ${gx} ${gy}, ${color}12 0%, transparent 55%)`
          ),
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      {/* Top accent line on hover */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <motion.div
          className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center mb-3"
          style={{
            background: `${color}10`,
            border: `1px solid ${color}20`,
            color: color,
          }}
          animate={isHovered ? { scale: 1.1, rotate: 3 } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>
        <h3 className="font-unbounded font-bold text-sm text-fg-primary mb-1.5">
          {title}
        </h3>
        <p className="text-xs md:text-sm text-fg-secondary font-onest font-light leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
});

export default ValueCard;
