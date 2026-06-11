"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Users, Calendar, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

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
  const contentRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("hero");

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          yPercent: -10,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: contentRef.current.parentElement,
            start: "top top",
            end: "50% top",
            scrub: 0.5,
          },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative mobile-full-height bg-surface-base overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/media/hero-bg.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/media/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-base to-transparent" />
      </div>

      {/* Decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full z-[1] hidden md:block"
        style={{ background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.1) 0%, transparent 70%)", filter: "blur(80px)" }}
      />
      <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full z-[1] hidden md:block"
        style={{ background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.08) 0%, transparent 70%)", filter: "blur(100px)" }}
      />

      {/* Center content */}
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 mobile-full-height flex flex-col items-center justify-center py-20 sm:py-24 lg:py-0 will-change-transform">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-4 mobile-no-backdrop"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-onest font-medium text-white/80">{t("label")}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-unbounded text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-normal mb-3 px-2 sm:px-0"
          >
            <span className="text-white font-black">{t("title")}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-white/60 font-onest font-light leading-relaxed max-w-md sm:max-w-xl mb-5"
          >
            {t("lead")}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none sm:w-auto px-4 sm:px-0 mb-6"
          >
            <a href="#products" className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-unbounded font-bold text-sm rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-emerald-900/20 w-full sm:w-auto whitespace-nowrap min-h-[44px]">
              {t("cta")}
            </a>
            <a href="#about" className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white font-unbounded font-bold text-sm rounded-2xl border border-white/15 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto whitespace-nowrap mobile-no-backdrop min-h-[44px]">
              {t("aboutLink")}
            </a>
          </motion.div>

          {/* CIS Countries */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="w-full max-w-md sm:max-w-xl mx-auto mb-5"
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400/60" />
              <span className="text-[10px] sm:text-xs text-white/40 font-onest uppercase tracking-wider">Присутствие в СНГ</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
              {CIS_COUNTRIES.map((c, i) => (
                <motion.div
                  key={c.code}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.05, duration: 0.3 }}
                  className="group relative flex items-center gap-0.5 sm:gap-1.5 px-1.5 sm:px-2.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-default"
                >
                  <span className="text-xs sm:text-base leading-none">{c.flag}</span>
                  <span className="text-[8px] sm:text-[10px] text-white/50 font-onest font-medium group-hover:text-white/80 transition-colors whitespace-nowrap">
                    {c.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="w-full max-w-sm sm:max-w-lg mx-auto"
          >
            <div className="relative flex items-center justify-between px-2 sm:px-6 md:px-8 py-3 sm:py-5 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm mobile-no-backdrop"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)" }}
            >
              <div className="flex-1 text-center group min-w-0">
                <div className="flex items-center justify-center mb-1">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400/70" />
                </div>
                <div className="font-unbounded font-bold text-base sm:text-2xl lg:text-3xl text-white group-hover:text-emerald-300 transition-colors">50+</div>
                <div className="text-[8px] sm:text-xs text-white/40 font-onest mt-0.5">{t("stat.countries")}</div>
              </div>

              <div className="w-px h-6 sm:h-12 bg-gradient-to-b from-transparent via-white/15 to-transparent mx-1 sm:mx-2 md:mx-4" />

              <div className="flex-1 text-center group min-w-0">
                <div className="flex items-center justify-center mb-1">
                  <Users className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400/70" />
                </div>
                <div className="font-unbounded font-bold text-base sm:text-2xl lg:text-3xl text-white group-hover:text-emerald-300 transition-colors">10K+</div>
                <div className="text-[8px] sm:text-xs text-white/40 font-onest mt-0.5">{t("stat.customers")}</div>
              </div>

              <div className="w-px h-6 sm:h-12 bg-gradient-to-b from-transparent via-white/15 to-transparent mx-1 sm:mx-2 md:mx-4" />

              <div className="flex-1 text-center group min-w-0">
                <div className="flex items-center justify-center mb-1">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400/70" />
                </div>
                <div className="font-unbounded font-bold text-base sm:text-2xl lg:text-3xl text-white group-hover:text-emerald-300 transition-colors">5</div>
                <div className="text-[8px] sm:text-xs text-white/40 font-onest mt-0.5">{t("stat.years")}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
