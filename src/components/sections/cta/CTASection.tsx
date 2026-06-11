"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";

const CTASection = memo(function CTASection() {
  const t = useTranslations("cta");
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
                    {t("title")}
                  </h2>
                  <p className="text-xs md:text-base text-white/60 font-onest font-light max-w-lg">
                    {t("description")}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <a
                    href="#about"
                    className="group relative inline-flex items-center justify-center gap-2 px-7 md:px-9 py-3 md:py-3.5 bg-[oklch(18%_0.01_160)] hover:bg-[oklch(25%_0.01_160)] text-white font-unbounded font-semibold text-sm rounded-xl border border-white/[0.08] hover:border-white/[0.14] transition-all duration-300 hover:-translate-y-0.5 shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_4px_20px_oklch(55%_0.18_160_/_0.15),0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)] min-h-[44px]"
                  >
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" aria-hidden="true" />
                    <Phone className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{t("contact")}</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <a
                    href="#products"
                    className="group relative inline-flex items-center justify-center gap-2 px-7 md:px-9 py-3 md:py-3.5 bg-white/[0.07] hover:bg-white/[0.12] text-white font-unbounded font-semibold text-sm rounded-xl border border-white/[0.1] hover:border-white/[0.18] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 min-h-[44px] mobile-no-backdrop"
                  >
                    <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" aria-hidden="true" />
                    <MessageCircle className="w-4 h-4 relative z-10" />
                    <span className="relative z-10">{t("catalog")}</span>
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
