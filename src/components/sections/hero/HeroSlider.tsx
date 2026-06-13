"use client";

import { memo } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade, Keyboard, A11y } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useRef, useCallback } from "react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import { MagneticButton } from "@/components/ui";
import { TextRevealWords } from "@/components/ui/TextReveal";
import { usePrefersReducedMotion } from "@/lib/motion";
import FloatingStatCards from "./StatCards";

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

/* ── Slide 1: Main Hero ── */
function SlideMain() {
  const t = useTranslations("hero");
  const reducedMotion = usePrefersReducedMotion();
  const EASE = [0.16, 1, 0.3, 1] as const;

  return (
    <div className="relative w-full h-full flex items-center">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/media/hero-bg.webp"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.40) 100%)",
          }}
        />
      </div>

      {/* Radial accents */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 70%, rgba(255,255,255,0.05) 0%, transparent 65%)",
        }}
      />

      {/* Bottom gradient bleed */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-base to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 pt-4 pb-6 sm:pt-8 sm:pb-10 lg:pt-0 lg:pb-0">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: text */}
          <div className="text-center lg:text-left order-1">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-5 sm:mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-space-grotesk font-medium text-white tracking-wide">
                {t("label")}
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-unbounded font-bold leading-[1.1] tracking-normal mb-4 sm:mb-5"
              style={{
                fontSize: "clamp(32px, 7vw, 76px)",
                color: "#FFFFFF",
                textShadow: "0 2px 12px rgba(0,0,0,0.25), 0 1px 3px rgba(0,0,0,0.15)",
              }}
            >
              <TextRevealWords
                text={t("title")}
                className="text-white"
                stagger={0.08}
                initialDelay={0.2}
                reducedMotion={reducedMotion}
              />
            </h1>

            {/* Subtitle */}
            <p
              className="text-sm sm:text-base font-inter font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-10"
              style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 6px rgba(0,0,0,0.2)" }}
            >
              {t("lead")}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-8 sm:mb-12">
              <MagneticButton
                variant="luxury"
                size="lg"
                onClick={() => {
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto ql-cta-primary font-space-grotesk font-semibold text-sm sm:text-base group"
                aria-label={t("cta")}
              >
                <span className="relative inline-block">{t("cta")}</span>
                <svg className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                size="lg"
                onClick={() => {
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto cta-secondary font-space-grotesk font-medium text-sm sm:text-base"
                aria-label={t("aboutLink")}
              >
                {t("aboutLink")}
              </MagneticButton>
            </div>

            {/* Trust bar */}
            <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 flex-wrap">
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item.key}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/15"
                >
                  <span className="text-white/70" aria-hidden="true">
                    <TrustIcon icon={item.icon} />
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-white/80 font-space-grotesk font-medium whitespace-nowrap">
                    {t(`trust.${item.key}`)}
                  </span>
                </div>
              ))}
              <div className="w-px h-4 bg-white/20 hidden sm:block" aria-hidden="true" />
              <div className="flex items-center gap-3 sm:gap-5 text-[10px] sm:text-[11px] text-white/80 font-space-grotesk">
                <span><strong className="text-white font-semibold">50+</strong> {t("stat.countries")}</span>
                <span className="hidden sm:inline"><strong className="text-white font-semibold">10K+</strong> {t("stat.customers")}</span>
              </div>
            </div>
          </div>

          {/* Right: product image */}
          <div className="flex items-center justify-center relative order-2 mt-4 lg:mt-0">
            <div className="relative">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
                  filter: "blur(40px)",
                  transform: "scale(1.3)",
                }}
              />
              <Image
                src="/images/products/greenmax.webp"
                alt="GreenMAX — Детокс и очищение"
                width={420}
                height={420}
                priority
                className="relative z-10 hero-product-image mx-auto"
                style={{
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.2))",
                  objectFit: "contain",
                  maxWidth: "280px",
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 2: Product Focus ── */
function SlideProduct() {
  const t = useTranslations("hero");
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative w-full h-full flex items-center">
      {/* Background — dark gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, oklch(8% 0.02 160) 0%, oklch(12% 0.03 195) 50%, oklch(6% 0.01 160) 100%)",
        }}
      />
      {/* Aurora accents */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 30% 40%, oklch(55% 0.2 160 / 0.1) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 70% 60%, oklch(55% 0.22 290 / 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Bottom gradient bleed */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-base to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: text */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-5 sm:mb-8">
              <span className="text-[11px] sm:text-xs font-space-grotesk font-medium text-white tracking-wide">
                {t("productSlide.label")}
              </span>
            </div>

            <h2
              className="font-unbounded font-bold leading-[1.1] tracking-normal mb-4 sm:mb-5"
              style={{
                fontSize: "clamp(28px, 6vw, 64px)",
                color: "#FFFFFF",
                textShadow: "0 2px 12px rgba(0,0,0,0.25)",
              }}
            >
              {t("productSlide.title")}
            </h2>

            <p
              className="text-sm sm:text-base font-inter font-light leading-relaxed max-w-lg mx-auto lg:mx-0 mb-6 sm:mb-10"
              style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 6px rgba(0,0,0,0.2)" }}
            >
              {t("productSlide.lead")}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <MagneticButton
                variant="luxury"
                size="lg"
                onClick={() => {
                  document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto font-space-grotesk font-semibold text-sm sm:text-base"
                aria-label={t("productSlide.cta")}
              >
                {t("productSlide.cta")}
              </MagneticButton>
            </div>
          </div>

          {/* Right: product image */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, oklch(55% 0.2 160 / 0.15) 0%, transparent 70%)",
                  filter: "blur(50px)",
                  transform: "scale(1.4)",
                }}
              />
              <Image
                src="/images/products/greenmax.webp"
                alt="GreenMAX"
                width={480}
                height={480}
                className="relative z-10 mx-auto"
                style={{
                  filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.25))",
                  objectFit: "contain",
                  maxWidth: "340px",
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 3: Stats / Social Proof ── */
function SlideStats() {
  const t = useTranslations("hero");
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative w-full h-full flex items-center">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(160deg, oklch(6% 0.01 160) 0%, oklch(10% 0.04 195) 50%, oklch(8% 0.02 290) 100%)",
        }}
      />
      {/* Aurora */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, oklch(55% 0.2 160 / 0.08) 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 20% 80%, oklch(65% 0.18 80 / 0.06) 0%, transparent 60%)",
        }}
      />

      {/* Bottom gradient bleed */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface-base to-transparent z-[2]" />

      {/* Content */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-12 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-6 sm:mb-10">
            <span className="text-[11px] sm:text-xs font-space-grotesk font-medium text-white tracking-wide">
              {t("statsSlide.label")}
            </span>
          </div>

          <h2
            className="font-unbounded font-bold leading-[1.1] tracking-normal mb-4 sm:mb-6"
            style={{
              fontSize: "clamp(28px, 6vw, 56px)",
              color: "#FFFFFF",
              textShadow: "0 2px 12px rgba(0,0,0,0.25)",
            }}
          >
            {t("statsSlide.title")}
          </h2>

          <p
            className="text-sm sm:text-base font-inter font-light leading-relaxed max-w-xl mx-auto mb-8 sm:mb-12"
            style={{ color: "rgba(255,255,255,0.85)", textShadow: "0 1px 6px rgba(0,0,0,0.2)" }}
          >
            {t("statsSlide.lead")}
          </p>

          {/* Stats grid */}
          <FloatingStatCards />

          <div className="mt-8 sm:mt-12">
            <MagneticButton
              variant="luxury"
              size="lg"
              onClick={() => {
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-space-grotesk font-semibold text-sm sm:text-base"
              aria-label={t("statsSlide.cta")}
            >
              {t("statsSlide.cta")}
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Hero Slider ── */
const HeroSlider = memo(function HeroSlider() {
  const reducedMotion = usePrefersReducedMotion();
  const swiperRef = useRef<SwiperType | null>(null);

  const handleSwiper = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper;
  }, []);

  return (
    <section
      className="relative overflow-hidden md:min-h-[720px]"
      role="region"
      aria-label="Hero slider"
      aria-roledescription="carousel"
      style={{ contain: "layout style paint" }}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade, Keyboard, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={600}
        loop={true}
        autoplay={
          reducedMotion
            ? false
            : {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
        }
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet hero-slider-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active hero-slider-bullet-active",
        }}
        navigation={{
          prevEl: ".hero-slider-prev",
          nextEl: ".hero-slider-next",
        }}
        keyboard={{ enabled: true }}
        a11y={{
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
          firstSlideMessage: "This is the first slide",
          lastSlideMessage: "This is the last slide",
          paginationBulletMessage: "Go to slide {{index}}",
        }}
        onSwiper={handleSwiper}
        className="w-full h-full hero-slider"
      >
        <SwiperSlide className="hero-slider-slide">
          <SlideMain />
        </SwiperSlide>
        <SwiperSlide className="hero-slider-slide">
          <SlideProduct />
        </SwiperSlide>
        <SwiperSlide className="hero-slider-slide">
          <SlideStats />
        </SwiperSlide>
      </Swiper>

      {/* Navigation arrows — hidden on mobile */}
      <button
        className="hero-slider-prev absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Previous slide"
        tabIndex={0}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
      </button>
      <button
        className="hero-slider-next absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Next slide"
        tabIndex={0}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </button>
    </section>
  );
});

export default HeroSlider;
