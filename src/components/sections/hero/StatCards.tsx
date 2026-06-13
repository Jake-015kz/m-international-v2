"use client";

import { motion } from "framer-motion";
import { memo, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useTranslations } from "next-intl";

/* ── Spring config ── */
const SPRING = { type: "spring" as const, stiffness: 140, damping: 20, mass: 1.1 };
const BASE_DELAY = 1.7;

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

/* ── Single stat card ── */
interface StatCardData {
  id: string;
  value: number;
  suffix: string;
  labelKey: string;
  changeKey: string;
  changePositive: boolean;
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
