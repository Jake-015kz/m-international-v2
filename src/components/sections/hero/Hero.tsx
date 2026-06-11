"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { Shield, Award, BadgeCheck, FlaskConical, Leaf, Globe, ChevronLeft, ChevronRight } from "lucide-react";

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

/* ── Mini Certificate Slider Data ── */
const CERT_SLIDES = [
  { id: "gmp", icon: <Shield className="w-5 h-5" />, label: "GMP", sub: "Надлежащая производственная практика", color: "oklch(55% 0.16 140)" },
  { id: "iso", icon: <Award className="w-5 h-5" />, label: "ISO 9001", sub: "Система менеджмента качества", color: "oklch(55% 0.14 230)" },
  { id: "halal", icon: <BadgeCheck className="w-5 h-5" />, label: "Halal", sub: "Сертификат Халал", color: "oklch(55% 0.18 160)" },
  { id: "fda", icon: <FlaskConical className="w-5 h-5" />, label: "FDA", sub: "Одобрение FDA США", color: "oklch(55% 0.12 60)" },
  { id: "eac", icon: <Shield className="w-5 h-5" />, label: "EAC", sub: "Евразийское соответствие", color: "oklch(45% 0.16 350)" },
  { id: "natural", icon: <Leaf className="w-5 h-5" />, label: "100% Natural", sub: "Натуральные ингредиенты", color: "oklch(60% 0.14 120)" },
];

/* ── Mini Certificate Slider Component ── */
const CertSlider = memo(function CertSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % CERT_SLIDES.length);
    }, 3000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    startTimer();
  };

  const prev = () => goTo((current - 1 + CERT_SLIDES.length) % CERT_SLIDES.length);
  const next = () => goTo((current + 1) % CERT_SLIDES.length);

  const cert = CERT_SLIDES[current];

  return (
    <div
      className="relative w-full max-w-xs mx-auto mt-6 rounded-2xl overflow-hidden border border-white/10"
      style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)" }}
    >
      {/* Main slide */}
      <div className="px-5 py-4 flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${cert.color}20`, border: `1px solid ${cert.color}40`, color: cert.color }}
        >
          {cert.icon}
        </div>
        <div className="min-w-0">
          <div className="text-white font-unbounded font-bold text-sm leading-tight">{cert.label}</div>
          <div className="text-white/50 text-[11px] font-onest leading-tight mt-0.5 truncate">{cert.sub}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-white/5">
        <button onClick={prev} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-1.5">
          {CERT_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${i === current ? "w-5 bg-white/80" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-7 h-7 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

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
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/sections/hero-nature.webp"
        >
          <source src="/media/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
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

          {/* CTA Buttons — uniform rounded-[16px] */}
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

          {/* Mini Certificate Slider */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-full max-w-xs"
          >
            <CertSlider />
          </motion.div>

          {/* CIS Countries */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
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
            transition={{ delay: 1.2, duration: 0.6 }}
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
