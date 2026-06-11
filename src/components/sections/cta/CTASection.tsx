"use client";

import { memo } from "react";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";

const CTASection = memo(function CTASection() {
  return (
    <section className="relative py-12 md:py-24 overflow-hidden bg-surface-alt">
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden">
            <div className="absolute inset-0">
              <img src="/images/sections/supplements.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-900/95 to-accent-800/90" />
            </div>
            <div className="relative z-10 p-5 md:p-14">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
                <div>
                  <h2 className="font-unbounded font-bold text-lg sm:text-2xl md:text-3xl text-white mb-2 md:mb-3 leading-[1.2]">
                    Готовы начать свой путь к здоровью и успеху?
                  </h2>
                  <p className="text-xs md:text-base text-white/60 font-onest font-light max-w-lg">
                    Получите консультацию по продукции и бизнесу. Присоединяйтесь к M-International сегодня.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a
                    href="#about"
                    className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-unbounded font-bold text-sm rounded-2xl transition-all duration-300 group hover:-translate-y-0.5 shadow-lg shadow-emerald-900/20 min-h-[44px]"
                  >
                    <Phone className="w-4 h-4" />
                    Связаться
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href="#products"
                    className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-white/10 hover:bg-white/15 text-white font-unbounded font-bold text-sm rounded-2xl border border-white/15 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 min-h-[44px] mobile-no-backdrop"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Каталог
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
});

export default CTASection;
