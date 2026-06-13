"use client";

import { memo, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TrendingUp, Users, GraduationCap, Handshake, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations, AnimatedGrid } from "@/components/ui";
import GlassCard from "@/components/ui/GlassCard";
import { StaggerContainer, CountUp } from "@/components/motion";

/* ── 3D Tilt Card ── */
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

/* ── Reward card with gradient border + 3D tilt ── */
function RewardCard({
  icon,
  title,
  text,
  gradient,
  iconBg,
  iconColor,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  gradient: string;
  iconBg: string;
  iconColor: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <TiltCard className="group relative h-full">
        {/* Gradient border on hover */}
        <motion.div
          className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]`}
        />
        <div className="relative h-full rounded-2xl bg-[#FFFFFF] border border-[var(--border-soft)] shadow-[var(--shadow-soft)] p-4 md:p-6 overflow-hidden">
          <div className="relative z-10">
            <motion.div
              className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${iconBg} border flex items-center justify-center mb-3 md:mb-4 ${iconColor}`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
            <h3 className="font-onest font-bold text-sm md:text-base text-fg-primary mb-1.5">{title}</h3>
            <p className="text-[11px] md:text-sm text-fg-secondary font-onest font-light leading-relaxed">{text}</p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

const BusinessSection = memo(function BusinessSection() {
  const t = useTranslations("business");

  const rewards = [
    { icon: <GraduationCap className="w-5 h-5" />, title: t("steps.register.title"), text: t("steps.register.description"), gradient: "from-accent-400/30 to-accent-600/30", iconBg: "bg-accent-50 border-accent-200", iconColor: "text-accent-600" },
    { icon: <Users className="w-5 h-5" />, title: "Сообщество 10 000+", text: "Присоединяйтесь к команде единомышленников в 50+ странах.", gradient: "from-blue-400/30 to-blue-600/30", iconBg: "bg-info-50 border-info-200", iconColor: "text-info-500" },
    { icon: <Handshake className="w-5 h-5" />, title: t("reward3.title"), text: t("reward3.description"), gradient: "from-violet-400/30 to-violet-600/30", iconBg: "bg-violet-500/10 border-violet-500/20", iconColor: "text-violet-600" },
    { icon: <TrendingUp className="w-5 h-5" />, title: "9 типов бонусов", text: "Комплексная система вознаграждений за результат.", gradient: "from-gold-400/30 to-gold-600/30", iconBg: "bg-gold-50 border-gold-200", iconColor: "text-gold-600" },
    { icon: <Star className="w-5 h-5" />, title: "Глобальный рынок", text: "Бизнес без границ. 50+ стран для развития.", gradient: "from-sky-400/30 to-sky-600/30", iconBg: "bg-info-50 border-info-200", iconColor: "text-info-500" },
  ];

  return (
    <section id="business" className="relative py-12 md:py-24 overflow-hidden bg-bg-base">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src="/images/sections/business-team.webp" alt="" className="w-full h-full object-cover opacity-5" loading="lazy" />
      </div>
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            badge={
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-100">
                <TrendingUp className="w-3.5 h-3.5 text-accent-600" />
                <span className="text-xs font-unbounded font-bold text-accent-600 uppercase tracking-wider">{t("joinTitle")}</span>
              </div>
            }
            title={t("title")}
            description={t("description")}
          />
        </ScrollReveal>

        {/* Rewards grid — enhanced with 3D tilt + hover-lift + gradient borders */}
        <div className="mt-6 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {rewards.map((r, i) => (
            <RewardCard key={r.title} {...r} index={i} />
          ))}
        </div>

        {/* Animated stats row */}
        <div className="mt-10 md:mt-16">
          <ScrollReveal>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5" staggerDelay={0.1}>
              {[
                { value: 50, suffix: "+", label: "Стран" },
                { value: 10000, suffix: "+", label: "Партнёров" },
                { value: 9, suffix: "", label: "Типов бонусов" },
                { value: 5, suffix: "+", label: "Лет на рынке" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  className="text-center p-4 md:p-6 rounded-2xl bg-[#EEF7E8] border border-[var(--border-soft)] shadow-[var(--shadow-soft)]"
                >
                  <div className="font-unbounded font-bold text-xl md:text-3xl text-accent-500 mb-1">
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] md:text-xs text-fg-tertiary font-onest uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </StaggerContainer>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
});

export default BusinessSection;
