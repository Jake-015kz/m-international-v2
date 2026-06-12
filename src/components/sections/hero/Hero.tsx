"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { memo, useRef } from "react";
import { useTranslations } from "next-intl";
import { MagneticButton } from "@/components/ui";
import { TextRevealWords } from "@/components/ui/TextReveal";
import { usePrefersReducedMotion } from "@/lib/motion";
import ParallaxOrbs from "./ParallaxOrbs";

/* ── Three.js Background — dynamic import, ssr:false ── */
const ThreeBackground = dynamic(
  () => import("./ThreeBackground"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[oklch(8%_0.005_160)]" />
    ),
  }
);

/* ── Animation config ── */
const EASE = [0.16, 1, 0.3, 1] as const;

/* ── Trust badge data ── */
const TRUST_ITEMS = [
  { key: "gmp", icon: "shield" },
  { key: "iso", icon: "badge" },
  { key: "halal", icon: "leaf" },
  { key: "countries", icon: "globe" },
] as const;

function TrustIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    shield: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    badge: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    leaf: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    globe: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  };
  return <>{icons[icon]}</>;
}

/* ── Main Hero ── */
const Hero = memo(function Hero() {
  const t = useTranslations("hero");
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  /* Parallax on background */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], [0, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden min-h-[100dvh] min-h-screen flex items-center"
      aria-label="Главная секция"
    >
      {/* ── Three.js Particle Background (desktop) ── */}
      {!reducedMotion && (
        <motion.div
          className="absolute inset-0 z-0"
          style={{
            y: bgY,
            scale: bgScale,
          }}
        >
          <ThreeBackground
            color="#34d399"
            color2="#8b5cf6"
            interactive={true}
            showConnections={true}
            spread={80}
            size={0.18}
          />
        </motion.div>
      )}

      {/* ── CSS Fallback Background (reduced motion or mobile) ── */}
      {reducedMotion && (
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(160deg, oklch(8% 0.005 160) 0%, oklch(12% 0.008 160) 40%, oklch(10% 0.006 160) 100%)",
          }}
        />
      )}

      {/* ── Dot grid overlay ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(100% 0 0) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Noise texture ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />

      {/* ── Decorative floating orbs with parallax ── */}
      {!reducedMotion && <ParallaxOrbs />}

      {/* ── Bottom gradient bleed ── */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-base to-transparent z-[2]" />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 w-full px-5 sm:px-8 lg:px-12 pt-24 pb-12 sm:pt-28 sm:pb-16"
        style={{
          opacity: reducedMotion ? 1 : contentOpacity,
          y: reducedMotion ? 0 : contentY,
        }}
      >
        <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">

          {/* ── Badge ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-sm mb-6 sm:mb-8"
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              animate={reducedMotion ? {} : { opacity: [0.5, 1, 0.5], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
            <span className="text-[11px] sm:text-xs font-onest font-medium text-white/70 tracking-wide">
              {t("label")}
            </span>
          </motion.div>

          {/* ── Headline — two-line split with word reveal ── */}
          <h1 className="font-unbounded font-bold text-[clamp(2rem,5vw,3.5rem)] leading-[1.1] tracking-normal mb-4 sm:mb-5">
            <TextRevealWords
              text={t("title")}
              className="text-white"
              stagger={0.08}
              initialDelay={0.2}
            />
          </h1>

          {/* ── Subtitle — line-reveal with clip-path ── */}
          <motion.div
            className="overflow-hidden mb-8 sm:mb-10"
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={reducedMotion ? {} : { opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            <motion.p
              initial={reducedMotion ? {} : { y: 24, opacity: 0 }}
              animate={reducedMotion ? {} : { y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: EASE }}
              className="text-sm sm:text-base lg:text-lg text-white/50 font-onest font-light leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {t("lead")}
            </motion.p>
          </motion.div>

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, y: 24, scale: 0.96 }}
            animate={reducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.75, duration: 0.8, ease: EASE }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-10 sm:mb-14"
          >
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => {
                document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto cta-primary cta-shine font-onest font-semibold text-sm sm:text-base group"
            >
              <motion.span
                className="inline-block"
                whileHover={reducedMotion ? {} : { x: 2 }}
                transition={{ duration: 0.2 }}
              >
                {t("cta")}
              </motion.span>
              <motion.svg
                className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={reducedMotion ? {} : { x: 0 }}
                whileHover={reducedMotion ? {} : { x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </motion.svg>
            </MagneticButton>
            <MagneticButton
              variant="secondary"
              size="lg"
              onClick={() => {
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto cta-secondary font-onest font-medium text-sm sm:text-base"
            >
              {t("aboutLink")}
            </MagneticButton>
          </motion.div>

          {/* ── Trust bar ── */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0 }}
            animate={reducedMotion ? {} : { opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 flex-wrap"
          >
            {TRUST_ITEMS.map((item, i) => (
              <motion.div
                key={item.key}
                initial={reducedMotion ? {} : { opacity: 0, scale: 0.8 }}
                animate={reducedMotion ? {} : { opacity: 1, scale: 1 }}
                transition={{
                  delay: 1.0 + i * 0.1,
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]"
              >
                <span className="text-emerald-400/70" aria-hidden="true">
                  <TrustIcon icon={item.icon} />
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/40 font-onest font-medium whitespace-nowrap">
                  {t(`trust.${item.key}`)}
                </span>
              </motion.div>
            ))}

            <motion.div
              className="w-px h-5 bg-white/10 hidden sm:block"
              aria-hidden="true"
              initial={reducedMotion ? {} : { scaleY: 0 }}
              animate={reducedMotion ? {} : { scaleY: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            />

            <motion.div
              className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-white/40 font-onest"
              initial={reducedMotion ? {} : { opacity: 0, y: 8 }}
              animate={reducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.5, ease: EASE }}
            >
              <span>
                <strong className="text-white/70 font-semibold">50+</strong> {t("stat.countries")}
              </span>
              <span className="hidden sm:inline">
                <strong className="text-white/70 font-semibold">10K+</strong> {t("stat.customers")}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

export default Hero;
