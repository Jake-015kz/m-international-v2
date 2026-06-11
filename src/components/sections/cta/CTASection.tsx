"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations, MagneticButton } from "@/components/ui";

/* ── Animated background pattern ── */
function AnimatedPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Rotating gradient orbs */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[60%] h-[60%] rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.08) 0%, transparent 70%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[50%] h-[50%] rounded-full"
        style={{
          background: "radial-gradient(circle, oklch(65% 0.18 85 / 0.06) 0%, transparent 70%)",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      />
      {/* Dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(100% 0 0) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

const CTASection = memo(function CTASection() {
  const t = useTranslations("cta");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-12 md:py-24 overflow-hidden bg-bg-alt">
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background image + overlay */}
            <div className="absolute inset-0">
              <img src="/images/sections/supplements.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-br from-accent-900/95 to-accent-800/90" />
            </div>

            {/* Animated pattern overlay */}
            <AnimatedPattern />

            <div className="relative z-10 p-5 md:p-14">
              <motion.div
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div>
                  <motion.h2
                    className="font-unbounded font-bold text-lg sm:text-2xl md:text-3xl text-white mb-2 md:mb-3 leading-[1.2]"
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    {t("title")}
                  </motion.h2>
                  <motion.p
                    className="text-xs md:text-base text-white/60 font-onest font-light max-w-lg"
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {t("description")}
                  </motion.p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="!bg-[oklch(18%_0.01_160)] hover:!bg-[oklch(25%_0.01_160)] !border-white/[0.08] hover:!border-white/[0.14] !shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]"
                    onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <Phone className="w-4 h-4" />
                    {t("contact")}
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                  <MagneticButton
                    variant="outline"
                    size="lg"
                    className="!bg-white/[0.07] hover:!bg-white/[0.12] !border-white/[0.1] hover:!border-white/[0.18] !text-white"
                    onClick={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t("catalog")}
                  </MagneticButton>
                </div>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
});

export default CTASection;
