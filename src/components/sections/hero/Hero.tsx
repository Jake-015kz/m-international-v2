"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { memo } from "react";
import { Globe, Users, Calendar, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { TextReveal, TextRevealWords } from "@/components/ui/TextReveal";
import FloatingStatCards from "./StatCards";
import { usePrefersReducedMotion } from "@/lib/motion";

/* ── Spring entrance config ── */
const SPRING = { type: "spring" as const, stiffness: 160, damping: 20, mass: 1.2 };
const SPRING_DELAY = 0.45;

/* ── CIS Country Flags ── */
const CIS_COUNTRIES = [
  { code: "kz", name: "Казахстан", flag: "🇰🇿" },
  { code: "ru", name: "Россия", flag: "🇷🇺" },
  { code: "by", name: "Беларусь", flag: "🇧🇾" },
  { code: "uz", name: "Узбекистан", flag: "🇺🇿" },
  { code: "kg", name: "Кыргызстан", flag: "🇰🇬" },
  { code: "tj", name: "Таджикистан", flag: "🇹🇯" },
  { code: "am", name: "Армения", flag: "🇦🇲" },
  { code: "az", name: "Азербайджан", flag: "🇦🇿" },
  { code: "md", name: "Молдова", flag: "🇲🇩" },
  { code: "tm", name: "Туркменистан", flag: "🇹🇲" },
];

/* ── Main Hero ── */
const Hero = memo(function Hero() {
  const t = useTranslations("hero");
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="relative mobile-full-height bg-surface-base overflow-hidden" aria-label="Главная секция">
      {/* Video Background */}
      <div className="absolute inset-0" aria-hidden="true">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-bg.webp"
          className="absolute inset-0 w-full h-full object-cover"
          aria-hidden="true"
        >
          <source src="/media/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-base to-transparent" />
      </div>

      {/* Dot grid — Linear-style, white neutral dots */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Noise texture overlay — SVG turbulence, ultra-subtle */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />

      {/* Decorative orbs — CSS-only, contained paint area */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full z-[1] hidden md:block contain-paint"
        style={{ background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.1) 0%, transparent 70%)", filter: "blur(80px)" }}
        aria-hidden="true"
      />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full z-[1] hidden md:block contain-paint"
        style={{ background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.08) 0%, transparent 70%)", filter: "blur(100px)" }}
        aria-hidden="true"
      />

      {/* ── 2-Column Grid Layout ── */}
      <div className="relative z-10 container mx-auto px-4 mobile-full-height flex flex-col justify-center py-16 sm:py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* ── LEFT COLUMN: Text Content ── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">

            {/* Badge — subtle fade-in + CSS parallax */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="parallax-text-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-4 mobile-no-backdrop"
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-emerald-400 ${reducedMotion ? "" : "animate-pulse"}`} aria-hidden="true" />
              <span className="text-[11px] font-onest font-medium text-white/80">{t("label")}</span>
            </motion.div>

            {/* Title — Apple-style word-by-word reveal + CSS parallax */}
            <h1 className="parallax-text-slow font-unbounded text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl leading-[1.1] tracking-normal mb-3 px-2 sm:px-0 lg:px-0">
              <TextRevealWords
                text={t("title")}
                className="text-white font-black justify-center lg:justify-start"
                stagger={0.07}
                initialDelay={0.15}
              />
            </h1>

            {/* Subtitle — line reveal + CSS parallax */}
            <div className="parallax-text-mid mb-5 max-w-xl lg:max-w-none">
              <TextReveal
                className="text-sm sm:text-base md:text-lg text-white/60 font-onest font-light leading-relaxed"
                initialDelay={0.6}
                stagger={0.12}
              >
                <span>{t("lead")}</span>
              </TextReveal>
            </div>

            {/* CTA Buttons — line reveal + CSS parallax */}
            <div className="parallax-text-mid w-full max-w-xs sm:max-w-none sm:w-auto px-4 sm:px-0 lg:px-0 mb-6">
              <TextReveal
                initialDelay={0.85}
                className="flex flex-col sm:flex-row gap-3"
              >
                <span className="contents">
                  <a href="#products" className="group relative inline-flex items-center justify-center px-7 sm:px-9 py-3.5 bg-[oklch(18%_0.01_160)] hover:bg-[oklch(25%_0.01_160)] text-white font-unbounded font-semibold text-sm rounded-xl border border-white/[0.08] hover:border-white/[0.14] transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto whitespace-nowrap min-h-[44px] shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_4px_20px_oklch(55%_0.18_160_/_0.15),0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" aria-hidden="true" />
                    <span className="relative z-10">{t("cta")}</span>
                  </a>
                  <a href="#about" className="group relative inline-flex items-center justify-center px-7 sm:px-9 py-3.5 bg-white/[0.07] hover:bg-white/[0.12] text-white font-unbounded font-semibold text-sm rounded-xl border border-white/[0.1] hover:border-white/[0.18] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto whitespace-nowrap mobile-no-backdrop min-h-[44px]">
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" aria-hidden="true" />
                    <span className="relative z-10">{t("aboutLink")}</span>
                  </a>
                </span>
              </TextReveal>
            </div>

            {/* CIS Countries — CSS parallax (fast) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="parallax-text-fast w-full max-w-md sm:max-w-xl mx-auto lg:mx-0 mb-5"
              role="list"
              aria-label={t("cisLabel")}
            >
              <div className="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 mb-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400/60" aria-hidden="true" />
                <span className="text-[10px] sm:text-xs text-white/40 font-onest uppercase tracking-wider">{t("cisLabel")}</span>
              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 sm:gap-1.5">
                {CIS_COUNTRIES.map((c, i) => (
                  <motion.div
                    key={c.code}
                    role="listitem"
                    aria-label={`${c.name} (${c.code.toUpperCase()})`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + i * 0.05, duration: 0.3 }}
                    className="group relative flex items-center gap-0.5 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                  >
                    <span className="text-xs sm:text-base leading-none" aria-hidden="true">{c.flag}</span>
                    <span className="text-[8px] sm:text-[10px] text-white/50 font-onest font-medium group-hover:text-white/80 transition-colors whitespace-nowrap">
                      {c.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stat Cards — Linear dashboard style, CSS parallax (fast) */}
            <div className="parallax-text-fast w-full max-w-sm sm:max-w-lg lg:max-w-xl mx-auto lg:mx-0 mt-4 mb-4">
              <FloatingStatCards />
            </div>

            {/* Stats — CSS parallax (fast) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="parallax-text-fast w-full max-w-sm sm:max-w-lg mx-auto lg:mx-0"
            >
              <div className="relative flex items-center justify-between px-2 sm:px-6 md:px-8 py-3 sm:py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm mobile-no-backdrop"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)" }}
                role="group"
                aria-label="Статистика компании"
              >
                <div className="flex-1 text-center group min-w-0">
                  <div className="flex items-center justify-center mb-1">
                    <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400/70" aria-hidden="true" />
                  </div>
                  <div className="font-unbounded font-bold text-base sm:text-2xl lg:text-3xl text-white group-hover:text-emerald-300 transition-colors" aria-label={`50+ ${t("stat.countries")}`}>50+</div>
                  <div className="text-[8px] sm:text-xs text-white/40 font-onest mt-0.5">{t("stat.countries")}</div>
                </div>

                <div className="w-px h-6 sm:h-12 bg-gradient-to-b from-transparent via-white/15 to-transparent mx-1 sm:mx-2 md:mx-4" aria-hidden="true" role="separator" />

                <div className="flex-1 text-center group min-w-0">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400/70" aria-hidden="true" />
                  </div>
                  <div className="font-unbounded font-bold text-base sm:text-2xl lg:text-3xl text-white group-hover:text-emerald-300 transition-colors" aria-label={`10K+ ${t("stat.customers")}`}>10K+</div>
                  <div className="text-[8px] sm:text-xs text-white/40 font-onest mt-0.5">{t("stat.customers")}</div>
                </div>

                <div className="w-px h-6 sm:h-12 bg-gradient-to-b from-transparent via-white/15 to-transparent mx-1 sm:mx-2 md:mx-4" aria-hidden="true" role="separator" />

                <div className="flex-1 text-center group min-w-0">
                  <div className="flex items-center justify-center mb-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400/70" aria-hidden="true" />
                  </div>
                  <div className="font-unbounded font-bold text-base sm:text-2xl lg:text-3xl text-white group-hover:text-emerald-300 transition-colors" aria-label={`5 ${t("stat.years")}`}>5</div>
                  <div className="text-[8px] sm:text-xs text-white/40 font-onest mt-0.5">{t("stat.years")}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Product Image — Spring scale entrance ── */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <motion.div
              className="relative"
              style={{ width: "clamp(180px, 25vw, 320px)", height: "clamp(180px, 25vw, 320px)" }}
              initial={{ scale: 0, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{
                delay: SPRING_DELAY,
                ...SPRING,
              }}
            >
              {/* Glow behind product — contained paint */}
              <div
                className="absolute inset-0 rounded-full scale-125 pointer-events-none contain-paint"
                style={{
                  background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.2) 0%, transparent 70%)",
                  filter: "blur(24px)",
                }}
                aria-hidden="true"
              />

              {/* Rotating decorative ring */}
              <motion.div
                className="absolute inset-[-6px] rounded-full border border-white/[0.08]"
                animate={reducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400/50" />
                <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400/30" />
              </motion.div>

              {/* Product image container */}
              <div className="relative w-full h-full rounded-full bg-white/[0.07] backdrop-blur-sm border border-white/[0.12] overflow-hidden mobile-no-backdrop">
                <Image
                  src="/images/products/micrystal.webp"
                  alt="M-International MiCrystal — натуральная добавка"
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 320px"
                  className="object-contain p-3 sm:p-4 drop-shadow-lg"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiTjU7QB0FA=="
                />
              </div>

              {/* Ambient float — starts after spring settles */}
              <motion.div
                className="absolute inset-0 pointer-events-none rounded-full"
                animate={reducedMotion ? {} : { y: [0, -6, 0] }}
                transition={{ delay: SPRING_DELAY + 0.8, duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden="true"
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default Hero;
