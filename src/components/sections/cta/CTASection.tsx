"use client";

import { memo } from "react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";

const CTASection = memo(function CTASection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="relative rounded-2xl bg-gradient-to-br from-accent-900 to-accent-800 p-8 md:p-14 overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
              <div>
                <h2 className="font-unbounded font-bold text-xl sm:text-2xl md:text-3xl text-text-inverse mb-2 leading-[1.2]">
                  Готовы начать?
                </h2>
                <p className="text-sm md:text-base text-text-inverse/60 font-onest font-light max-w-md">
                  Получите консультацию по продукции и бизнесу. Присоединяйтесь к m-international.kz сегодня.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0">
                <a
                  href="#contacts"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-accent-500 hover:bg-accent-400 text-text-inverse font-unbounded font-bold text-sm rounded-xl transition-all duration-300 group hover:-translate-y-0.5"
                >
                  Связаться
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-text-inverse/10 hover:bg-text-inverse/15 text-text-inverse font-unbounded font-bold text-sm rounded-xl border border-text-inverse/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Каталог
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
});

export default CTASection;
