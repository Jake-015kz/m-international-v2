"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { memo, useRef } from "react";
import { useTranslations } from "next-intl";
import { MagneticButton } from "@/components/ui";
import { usePrefersReducedMotion } from "@/lib/motion";

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

  /* Parallax on background image */
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
      {/* ── Background image with parallax ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: reducedMotion ? 0 : bgY,
          scale: reducedMotion ? 1 : bgScale,
        }}
      >
        <Image
          src="/images/sections/hero-nature.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiTjU7QB0FA=="
        />
        {/* Dark scrim for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        {/* Bottom glow bleed into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[var(--surface-base)] to-transparent" />
        {/* Subtle dot overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, oklch(100% 0 0) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </motion.div>

      {/* ── Ambient glow orbs (desktop only) ── */}
      {!reducedMotion && (
        <>
          <div className="absolute top-[20%] left-[15%] w-[500px] h-[500px] rounded-full pointer-events-none opacity-30 mix-blend-screen hidden lg:block"
            style={{
              background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.08) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full pointer-events-none opacity-20 mix-blend-screen hidden lg:block"
            style={{
              background: "radial-gradient(circle, oklch(70% 0.15 85 / 0.06) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </>
      )}

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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-sm mb-6 sm:mb-8 mobile-no-backdrop"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] sm:text-xs font-onest font-medium text-white/70 tracking-wide">
              {t("label")}
            </span>
          </motion.div>

          {/* ── Headline ── */}
          <h1 className="font-unbounded font-bold text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-normal mb-4 sm:mb-5">
            <span className="block text-white">
              {t("title").split(". ")[0]}
              {t("title").includes(".") ? "." : ""}
            </span>
            {t("title").split(". ")[1] && (
              <span className="block mt-1 sm:mt-2 bg-gradient-to-r from-white via-white/90 to-white/50 bg-clip-text text-transparent font-light">
                {t("title").split(". ")[1]}
              </span>
            )}
          </h1>

          {/* ── Subtitle ── */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: EASE }}
            className="text-sm sm:text-base lg:text-lg text-white/50 font-onest font-light leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0"
          >
            {t("lead")}
          </motion.p>

          {/* ── CTA Buttons ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: EASE }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-10 sm:mb-14"
          >
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => {
                document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white text-[oklch(18%_0.01_160)] hover:bg-white/90 font-onest font-semibold text-sm sm:text-base shadow-[0_4px_24px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_32px_rgba(255,255,255,0.25)] border-0"
            >
              {t("cta")}
            </MagneticButton>
            <MagneticButton
              variant="outline"
              size="lg"
              onClick={() => {
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-8 py-4 bg-white/[0.06] hover:bg-white/[0.12] border-white/[0.12] hover:border-white/[0.2] text-white font-onest font-medium text-sm sm:text-base mobile-no-backdrop"
            >
              {t("aboutLink")}
            </MagneticButton>
          </motion.div>

          {/* ── Trust bar ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 flex-wrap"
          >
            {/* Cert badges */}
            {TRUST_ITEMS.map((item, i) => (
              <div
                key={item.key}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] mobile-no-backdrop"
                style={{ animationDelay: `${0.9 + i * 0.08}s` }}
              >
                <span className="text-emerald-400/70" aria-hidden="true">
                  <TrustIcon icon={item.icon} />
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/40 font-onest font-medium whitespace-nowrap">
                  {t(`trust.${item.key}`)}
                </span>
              </div>
            ))}

            {/* Divider */}
            <div className="w-px h-5 bg-white/10 hidden sm:block" aria-hidden="true" />

            {/* Quick stats */}
            <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-white/40 font-onest">
              <span>
                <strong className="text-white/70 font-semibold">50+</strong> {t("stat.countries")}
              </span>
              <span className="hidden sm:inline">
                <strong className="text-white/70 font-semibold">10K+</strong> {t("stat.customers")}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
});

export default Hero;
