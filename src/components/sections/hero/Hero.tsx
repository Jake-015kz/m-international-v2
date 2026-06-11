"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe } from "lucide-react";
import Image from "next/image";

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

/* ── Real Certificate Badges from old site ── */
const CERT_BADGES = [
  { name: "HALAL MiCrystal", image: "/images/certificates/certificate-halal-micrystal-2025.webp", color: "#c4a035" },
  { name: "HALAL GreenMAX", image: "/images/certificates/certificate-halal-greenmax-2025.webp", color: "#5eb53a" },
  { name: "HALAL MiTown", image: "/images/certificates/certificate-halal-mitown-2025.webp", color: "#4a90d9" },
  { name: "HALAL Macho Flexi", image: "/images/certificates/certificate-halal-macho-flexi-2025.webp", color: "#d44a2a" },
  { name: "AJL License", image: "/images/certificates/ajl-license-2025-2030.webp", color: "#6ab04a" },
  { name: "HALAL MM-BM-NM", image: "/images/certificates/certificate-halal-mm-bm-nm-2026.webp", color: "#2a7aaa" },
];

/* ── Main Hero ── */
const Hero = memo(function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);

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
    <section className="relative min-h-[100dvh] bg-surface-base overflow-hidden">
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
        {/* Dark overlay for readability — lighter so video is visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        {/* Bottom fade */}
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
      <div ref={contentRef} className="relative z-10 container mx-auto px-4 min-h-[100dvh] flex flex-col justify-center py-20 sm:py-24 lg:py-0 will-change-transform">
        <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-onest font-medium text-white/80">Натуральные БАДы премиум класса</span>
          </motion.div>

          {/* Title — compact for CIS */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-unbounded text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-normal mb-4"
          >
            <span className="text-white font-black">Интеллект природы</span>{" "}
            <span className="font-extralight text-white/70">для вашего здоровья</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm sm:text-base md:text-lg text-white/60 font-onest font-light leading-relaxed max-w-xl mb-6 px-2"
          >
            Сертифицированные натуральные добавки для иммунитета, детокса и долголетия. 50+ стран.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0 mb-6"
          >
            <a href="#products" className="inline-flex items-center justify-center px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-unbounded font-bold text-sm rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-emerald-900/20 w-full sm:w-auto">
              Смотреть каталог
            </a>
            <a href="#about" className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 hover:bg-white/15 text-white font-unbounded font-bold text-sm rounded-2xl border border-white/15 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto">
              О компании
            </a>
          </motion.div>

          {/* Real Certificate Badges — from old site */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-full"
          >
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {CERT_BADGES.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 hover:border-white/25 transition-all duration-300 cursor-default group"
                  style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)" }}
                >
                  <div className="relative w-6 h-6 flex-shrink-0">
                    <Image
                      src={cert.image}
                      alt={cert.name}
                      width={24}
                      height={24}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-white/60 font-onest font-medium whitespace-nowrap group-hover:text-white/80 transition-colors">
                    {cert.name}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" style={{ background: cert.color }} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CIS Countries */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-2 px-4"
          >
            <Globe className="w-3.5 h-3.5 text-white/30 mr-1" />
            {CIS_COUNTRIES.map((c) => (
              <span
                key={c.code}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-[10px] text-white/50 font-onest hover:bg-white/10 hover:text-white/70 transition-colors cursor-default"
                title={c.name}
              >
                <span className="text-sm">{c.flag}</span>
                <span className="hidden sm:inline">{c.name}</span>
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-8 grid grid-cols-3 gap-4 sm:gap-8"
          >
            {[
              { value: "50+", label: "Стран" },
              { value: "10K+", label: "Партнёров" },
              { value: "5", label: "Лет на рынке" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-unbounded font-bold text-xl sm:text-2xl text-white">{s.value}</div>
                <div className="text-[10px] sm:text-xs text-white/40 font-onest mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
