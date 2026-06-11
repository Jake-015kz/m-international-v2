"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useTranslations } from "next-intl";

/* ── Staggered spring entrance config ── */
const SPRING = { type: "spring" as const, stiffness: 180, damping: 22, mass: 1 };
const STAGGER_DELAY = 0.85;   // base delay after hero content

/* ── Single cert badge data (IDs only — labels from i18n) ── */
const CERT_BADGES = [
  {
    id: "gmp",
    i18nKey: "certBadges.gmpIsoHalal" as const,
    slot: "right-top" as const,
    icon: (
      <svg className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
      </svg>
    ),
    delay: 0,
  },
  {
    id: "reach",
    i18nKey: "certBadges.countries50" as const,
    slot: "right-bottom" as const,
    icon: (
      <svg className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    delay: 0.12,
  },
  {
    id: "clients",
    i18nKey: "certBadges.clients10k" as const,
    slot: "right-mid" as const,
    icon: (
      <svg className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    delay: 0.24,
  },
];

/* ── Single cert badge card with staggered spring entrance ── */
function CertBadgeCard({
  badge,
  floatDelay,
  floatDuration,
}: {
  badge: (typeof CERT_BADGES)[number];
  floatDelay: number;
  floatDuration: number;
}) {
  const t = useTranslations("hero");
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="absolute z-20 will-change-transform"
      style={{
        right: "1rem",
        ...(badge.slot === "right-top" && { top: "18%" }),
        ...(badge.slot === "right-mid" && { top: "45%" }),
        ...(badge.slot === "right-bottom" && { bottom: "22%" }),
      }}
      initial={{ opacity: 0, x: 60, scale: 0.7, rotate: 8 }}
      animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
      transition={{
        delay: STAGGER_DELAY + badge.delay,
        ...SPRING,
      }}
    >
      {/* Shimmer sweep on entrance */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={reducedMotion ? {} : { opacity: [0, 1, 0] }}
        transition={{
          delay: STAGGER_DELAY + badge.delay + 0.15,
          duration: 0.6,
          times: [0, 0.3, 1],
          ease: "easeOut",
        }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.12) 55%, transparent 70%)",
            width: "200%",
          }}
          initial={{ x: "-50%" }}
          animate={reducedMotion ? {} : { x: "50%" }}
          transition={{
            delay: STAGGER_DELAY + badge.delay + 0.15,
            duration: 0.6,
            ease: "easeOut",
          }}
        />
      </motion.div>

      {/* The actual card — floating after entrance */}
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -8, 0] }}
        transition={{ delay: STAGGER_DELAY + badge.delay + floatDelay, duration: floatDuration, repeat: Infinity, ease: "easeInOut" }}
        className="will-change-transform"
      >
        <div className="rounded-2xl bg-surface-elevated border border-border-subtle shadow-lg p-3 lg:p-5 flex items-center gap-2 lg:gap-3 relative overflow-hidden">
          {/* Hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 hover:from-emerald-500/5 hover:to-transparent transition-all duration-500 pointer-events-none" />

          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center shrink-0 relative z-[1] bg-emerald-500/15">
            {badge.icon}
          </div>
          <span className="text-xs lg:text-sm font-medium text-text-primary whitespace-nowrap relative z-[1]">
            {t(badge.i18nKey)}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Left video card (kept as-is with spring upgrade) ── */
const LeftCard = memo(function LeftCard() {
  const t = useTranslations("hero");
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="absolute left-4 lg:left-8 top-[55%] -translate-y-1/2 max-w-[280px] lg:max-w-xs z-20 will-change-transform"
      initial={{ opacity: 0, x: -60, scale: 0.8, rotate: -5 }}
      animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
      transition={{ delay: STAGGER_DELAY - 0.2, ...SPRING }}
    >
      <motion.div
        animate={reducedMotion ? {} : { y: [0, -12, 0] }}
        transition={{ delay: 1.2, duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="will-change-transform"
      >
        <div className="rounded-2xl bg-surface-elevated border border-border-subtle shadow-lg p-4 lg:p-6">
          <div className="relative aspect-video rounded-xl lg:rounded-2xl overflow-hidden bg-black/10 mb-3">
            <video
              src="/media/hero-bg.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-surface-elevated/90 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 lg:w-5 lg:h-5 text-text-primary ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.7l10.7 7.3-10.7 7.3V2.7z" />
                </svg>
              </div>
            </div>
          </div>
          <p className="text-center text-xs lg:text-sm font-light text-text-secondary">
            {t("videoCard")}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
});

const FloatingCards = memo(function FloatingCards() {
  return (
    <>
      <LeftCard />

      {CERT_BADGES.map((badge) => (
        <CertBadgeCard
          key={badge.id}
          badge={badge}
          floatDelay={1.8 + badge.delay * 2}
          floatDuration={3.2 + badge.delay}
        />
      ))}
    </>
  );
});

export default FloatingCards;
