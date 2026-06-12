"use client";

import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useTranslations } from "next-intl";

/* ── Spring config ── */
const SPRING = { type: "spring" as const, stiffness: 140, damping: 20, mass: 1.1 };
const BASE_DELAY = 1.7;

/* ── Mini sparkline data ── */
const SPARKLINE_DATA: Record<string, number[]> = {
  revenue: [30, 35, 42, 38, 50, 55, 62, 58, 70, 75, 82, 88],
  countries: [10, 14, 18, 22, 28, 32, 38, 42, 46, 50, 54, 58],
  customers: [1000, 1800, 2600, 3200, 4100, 5000, 6200, 7100, 8000, 8800, 9500, 10200],
  growth: [5, 8, 12, 10, 15, 18, 22, 20, 25, 28, 32, 35],
};

/* ── Animated counter hook ── */
function useCounter(end: number, duration = 1.5, startAt = 0) {
  const reducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(reducedMotion ? end : startAt);
  const started = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      setCount(end);
      return;
    }

    let raf: number;
    const startTime = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startAt + (end - startAt) * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    const timeout = setTimeout(() => {
      started.current = true;
      raf = requestAnimationFrame(tick);
    }, BASE_DELAY * 1000 + 300);
    return () => {
      clearTimeout(timeout);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return count;
}

/* ── Mini sparkline SVG ── monochrome ── */
function MiniSparkline({
  data,
  color = "oklch(75% 0 0)",
  delay = 0,
}: {
  data: number[];
  color?: string;
  delay?: number;
}) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 28;
  const pad = 2;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = pad + (1 - (v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });

  const areaPoints = `${pad},${h - pad} ${points.join(" ")} ${w - pad},${h - pad}`;
  const gradId = `spgrad-${color.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <svg width={w} height={h} className="block mt-2" aria-hidden="true">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.polygon
        points={areaPoints}
        fill={`url(#${gradId})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.4, duration: 0.6 }}
      />
      <motion.polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ delay: delay + 0.2, duration: 0.8, ease: "easeOut" }}
      />
      <motion.circle
        cx={points[points.length - 1].split(",")[0]}
        cy={points[points.length - 1].split(",")[1]}
        r="2.5"
        fill={color}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.9, duration: 0.3 }}
      />
    </svg>
  );
}

/* ── Single stat card — Linear dashboard monochrome style ── */
interface StatCardData {
  id: string;
  value: number;
  suffix: string;
  labelKey: string;
  changeKey: string;
  changePositive: boolean;
  sparkKey: string;
  delay: number;
  floatDur: number;
}

function StatCard({ data }: { data: StatCardData }) {
  const t = useTranslations("hero");
  const counter = useCounter(data.value, 1.8);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="will-change-transform"
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: BASE_DELAY + data.delay,
        ...SPRING,
      }}
    >
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -6, 0] }}
        transition={{
          delay: BASE_DELAY + data.delay + 0.6,
          duration: data.floatDur,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="will-change-transform"
      >
        <div className="relative rounded-2xl border border-[oklch(1_0_0_/_0.12)] bg-white/[0.04] backdrop-blur-md p-4 overflow-hidden mobile-no-backdrop transition-all duration-300 hover:[filter:brightness(120%)]">
          {/* Top row: label + change badge */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-medium text-white/40 uppercase tracking-wider leading-none">
              {t(data.labelKey)}
            </span>
            <span
              className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md leading-none ${
                data.changePositive
                  ? "text-emerald-400/80 bg-emerald-400/[0.08]"
                  : "text-amber-400/80 bg-amber-400/[0.08]"
              }`}
            >
              {t(data.changeKey)}
            </span>
          </div>

          {/* Value row */}
          <div className="flex items-baseline gap-0.5">
            <motion.span
              className="font-unbounded font-bold text-xl sm:text-2xl text-white leading-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: BASE_DELAY + data.delay + 0.3, duration: 0.4 }}
              aria-live="polite"
              aria-atomic="true"
            >
              {counter.toLocaleString("ru-RU")}
            </motion.span>
            {data.suffix && (
              <span className="text-xs text-white/40 font-medium">
                {data.suffix}
              </span>
            )}
          </div>

          {/* Accent dot + divider */}
          <div className="flex items-center gap-1.5 mt-2.5 mb-0.5" aria-hidden="true">
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 bg-white/50"
            />
            <div className="flex-1 h-px bg-gradient-to-r from-white/[0.08] to-transparent" />
          </div>

          {/* Mini sparkline */}
          <MiniSparkline
            data={SPARKLINE_DATA[data.sparkKey]}
            color="oklch(75% 0 0)"
            delay={BASE_DELAY + data.delay}
          />

          {/* Subtle corner glow */}
          <div
            className="absolute -top-10 -right-10 w-20 h-20 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, oklch(100% 0 0 / 0.03) 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
            aria-hidden="true"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Dashboard grid container ── */
const STAT_CARDS: StatCardData[] = [
  {
    id: "revenue",
    value: 285,
    suffix: "M ₸",
    labelKey: "stats.revenue.label" as const,
    changeKey: "stats.revenue.change" as const,
    changePositive: true,
    sparkKey: "revenue",
    delay: 0,
    floatDur: 4.5,
  },
  {
    id: "countries",
    value: 58,
    suffix: "",
    labelKey: "stats.countries.label" as const,
    changeKey: "stats.countries.change" as const,
    changePositive: true,
    sparkKey: "countries",
    delay: 0.12,
    floatDur: 4,
  },
  {
    id: "customers",
    value: 10200,
    suffix: "+",
    labelKey: "stats.customers.label" as const,
    changeKey: "stats.customers.change" as const,
    changePositive: true,
    sparkKey: "customers",
    delay: 0.24,
    floatDur: 5,
  },
  {
    id: "growth",
    value: 35,
    suffix: "%",
    labelKey: "stats.growth.label" as const,
    changeKey: "stats.growth.change" as const,
    changePositive: true,
    sparkKey: "growth",
    delay: 0.36,
    floatDur: 4.2,
  },
];

const FloatingStatCards = memo(function FloatingStatCards() {
  const t = useTranslations("hero");
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: BASE_DELAY - 0.2, duration: 0.5 }}
      className="w-full max-w-sm sm:max-w-lg lg:max-w-xl mx-auto lg:mx-0"
    >
      {/* Section label */}
      <motion.div
        className="flex items-center gap-2 mb-3"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: BASE_DELAY - 0.1, duration: 0.4 }}
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className={`rounded-full h-2 w-2 bg-white/60 ${reducedMotion ? "" : "animate-ping"} absolute inline-flex`} />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white/60" />
        </span>
        <span className="text-[10px] font-medium text-white/30 uppercase tracking-wider">
          {t("stats.title")}
        </span>
        <div className="flex-1 h-px bg-gradient-to-r from-white/[0.06] to-transparent" />
      </motion.div>

      {/* 2x2 grid of stat cards */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.id} data={card} />
        ))}
      </div>
    </motion.div>
  );
});

export default FloatingStatCards;
