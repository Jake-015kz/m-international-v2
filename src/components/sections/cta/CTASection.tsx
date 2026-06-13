"use client";

import { memo, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import Container from "@/components/ui/Container";
import { MagneticButton } from "@/components/ui";
import { StaggerContainer } from "@/components/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const CTASection = memo(function CTASection() {
  const t = useTranslations("cta");
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  /* Parallax for background pattern */
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const patternY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative py-16 md:py-28 overflow-hidden bg-bg-alt">
      <Container className="relative z-10">
        <motion.div
          className="relative rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          {/* Gradient border top accent */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] z-20"
            style={{
              background: "linear-gradient(90deg, transparent, oklch(50%_0.14_195_/_0.4), oklch(58%_0.19_25_/_0.3), transparent)",
            }}
            aria-hidden="true"
          />

          {/* Background — soft natural with dot pattern */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, var(--primary-soft) 0%, oklch(97% 0.003 160) 100%)",
            }}
          />

          {/* Dot pattern — parallax */}
          <motion.div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, oklch(100% 0 0) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              y: patternY,
            }}
          />

          {/* Subtle gradient orbs — animated */}
          <motion.div
            className="absolute top-[-20%] left-[-5%] w-[300px] h-[300px] rounded-full opacity-[0.06] pointer-events-none"
            style={{
              background: "radial-gradient(circle, oklch(55% 0.18 160), transparent 70%)",
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-15%] right-[-5%] w-[250px] h-[250px] rounded-full opacity-[0.04] pointer-events-none"
            style={{
              background: "radial-gradient(circle, oklch(55% 0.14 230), transparent 70%)",
            }}
            animate={{
              x: [0, -20, 0],
              y: [0, 15, 0],
              scale: [1, 1.15, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 p-8 md:p-16">
            <motion.div
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Text — left-aligned (asymmetric) */}
              <div className="max-w-xl">
                <motion.h2
                  className="font-unbounded font-bold text-xl sm:text-2xl md:text-3xl text-fg-primary mb-3 md:mb-4 leading-[1.1] tracking-normal"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  {t("title")}
                </motion.h2>
                <motion.p
                  className="text-sm md:text-base text-fg-secondary font-inter font-light"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  {t("description")}
                </motion.p>
              </div>

              {/* Buttons — right side on desktop, stacked on mobile */}
              <StaggerContainer className="flex flex-col sm:flex-row gap-3 shrink-0" staggerDelay={0.1}>
                <MagneticButton
                  variant="primary"
                  size="lg"
                  className="font-space-grotesk font-semibold"
                  onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Phone className="w-4 h-4" />
                  {t("contact")}
                  <ArrowRight className="w-4 h-4" />
                </MagneticButton>
                <MagneticButton
                  variant="outline"
                  size="lg"
                  className="font-space-grotesk font-medium"
                  onClick={() => document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("catalog")}
                </MagneticButton>
              </StaggerContainer>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
});

export default CTASection;
