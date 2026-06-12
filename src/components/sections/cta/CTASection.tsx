"use client";

import { memo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MagneticButton } from "@/components/ui";

const CTASection = memo(function CTASection() {
  const t = useTranslations("cta");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-12 md:py-24 overflow-hidden bg-bg-alt">
      <Container className="relative z-10">
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden">
            {/* Background — solid dark with dot pattern, NO orbs */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, oklch(10% 0.005 160) 0%, oklch(15% 0.008 160) 100%)",
              }}
            />

            {/* Dot pattern only — no floating orbs */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, oklch(100% 0 0) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />

            <div className="relative z-10 p-6 md:p-14">
              <motion.div
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Text — left-aligned (asymmetric) */}
                <div className="max-w-xl">
                  <motion.h2
                    className="font-unbounded font-bold text-lg sm:text-2xl md:text-3xl text-white mb-2 md:mb-3 leading-[1.1] tracking-normal"
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    {t("title")}
                  </motion.h2>
                  <motion.p
                    className="text-xs md:text-base text-white/50 font-onest font-light"
                    initial={{ opacity: 0, y: 12 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    {t("description")}
                  </motion.p>
                </div>

                {/* Buttons — right side on desktop, stacked on mobile */}
                <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                  <MagneticButton
                    variant="primary"
                    size="lg"
                    className="!bg-white hover:!bg-white/90 !text-[oklch(18%_0.01_160)] !border-white/20 hover:!border-white/30 !shadow-[0_4px_24px_rgba(255,255,255,0.15)] hover:!shadow-[0_4px_32px_rgba(255,255,255,0.25)]"
                    onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <Phone className="w-4 h-4" />
                    {t("contact")}
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>
                  <MagneticButton
                    variant="outline"
                    size="lg"
                    className="!bg-white/[0.06] hover:!bg-white/[0.12] !border-white/[0.1] hover:!border-white/[0.18] !text-white"
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
