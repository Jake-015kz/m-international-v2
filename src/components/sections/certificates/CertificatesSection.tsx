"use client";

import { memo, useCallback, useEffect, useState } from "react";
import { Shield, Award, Leaf, BadgeCheck, FlaskConical, Heart, Globe, Sprout, ChevronLeft, ChevronRight } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";

const CERTIFICATES = [
  { id: "gmp", icon: <Shield className="w-6 h-6" />, label: "GMP", description: "Надлежащая производственная практика", color: "oklch(55% 0.16 140)" },
  { id: "iso", icon: <Award className="w-6 h-6" />, label: "ISO 9001:2015", description: "Система менеджмента качества", color: "oklch(55% 0.14 230)" },
  { id: "halal", icon: <BadgeCheck className="w-6 h-6" />, label: "Halal", description: "Сертификат Халал", color: "oklch(55% 0.18 160)" },
  { id: "fda", icon: <FlaskConical className="w-6 h-6" />, label: "FDA", description: "Одобрение FDA США", color: "oklch(55% 0.12 60)" },
  { id: "mesti", icon: <Award className="w-6 h-6" />, label: "MESTI", description: "Малайзийский стандарт качества", color: "oklch(45% 0.16 350)" },
  { id: "eac", icon: <Shield className="w-6 h-6" />, label: "EAC", description: "Евразийское соответствие", color: "oklch(55% 0.14 200)" },
  { id: "natural", icon: <Leaf className="w-6 h-6" />, label: "100% Natural", description: "Натуральные ингредиенты", color: "oklch(60% 0.14 120)" },
  { id: "vegan", icon: <Heart className="w-6 h-6" />, label: "Vegan", description: "Vegan Certified", color: "oklch(55% 0.18 25)" },
  { id: "organic", icon: <Sprout className="w-6 h-6" />, label: "Organic", description: "Organic Certified", color: "oklch(50% 0.16 130)" },
  { id: "global", icon: <Globe className="w-6 h-6" />, label: "50+ стран", description: "Международное признание", color: "oklch(55% 0.14 260)" },
];

const CertificatesSection = memo(function CertificatesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, CERTIFICATES.length - itemsPerView);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  return (
    <section id="certificates" className="relative py-16 md:py-24 overflow-hidden bg-surface-base" style={{ contentVisibility: "auto", containIntrinsicSize: "0 500px" }}>
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            title="Международные сертификаты"
            description="Продукция M-International сертифицирована по мировым стандартам качества"
          />
        </ScrollReveal>

        {/* Carousel */}
        <div
          className="mt-8 md:mt-12 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Slides viewport */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  className="flex-shrink-0 px-2"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="p-5 md:p-6 rounded-2xl bg-surface-elevated border border-border-subtle hover:border-border-default transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col items-center text-center group">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${cert.color}12`, border: `1px solid ${cert.color}25`, color: cert.color }}
                    >
                      {cert.icon}
                    </div>
                    <h3 className="font-unbounded font-bold text-sm md:text-base text-text-primary mb-1.5">{cert.label}</h3>
                    <p className="text-xs text-text-secondary font-onest font-light leading-relaxed">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-elevated border border-border-subtle shadow-md flex items-center justify-center text-text-secondary hover:text-text-primary hover:shadow-lg transition-all z-10"
            aria-label="Предыдущий"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-3 md:-right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-elevated border border-border-subtle shadow-md flex items-center justify-center text-text-secondary hover:text-text-primary hover:shadow-lg transition-all z-10"
            aria-label="Следующий"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-accent-500" : "w-1.5 bg-border-default hover:bg-border-subtle"}`}
                aria-label={`Слайд ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <ScrollReveal delay={0.3}>
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-text-tertiary">
              <BadgeCheck className="w-3.5 h-3.5" />
              <p className="text-[10px] uppercase tracking-wider font-onest">
                Проверенное качество · Безопасность · Эффективность
              </p>
              <BadgeCheck className="w-3.5 h-3.5" />
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
});

export default CertificatesSection;
