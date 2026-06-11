"use client";

import { memo } from "react";
import {
  TrendingUp,
  Users,
  GraduationCap,
  Handshake,
  Star,
  UserPlus,
  BookOpen,
  Banknote,
  ChevronRight,
  Zap,
} from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";

const rewards = [
  {
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Бесплатное обучение",
    text: "Программа: продукты, продажи, команда. Поддержка на каждом этапе.",
    gradient: "from-emerald-500/15 to-teal-500/15",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-600",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Сообщество 10 000+",
    text: "Присоединяйтесь к команде единомышленников в 50+ странах.",
    gradient: "from-blue-500/15 to-cyan-500/15",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-600",
  },
  {
    icon: <Handshake className="w-5 h-5" />,
    title: "Win-Win система",
    text: "Ваш успех = успех вашей команды. Растём вместе.",
    gradient: "from-violet-500/15 to-purple-500/15",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-600",
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "9 типов бонусов",
    text: "Комплексная система вознаграждений за результат.",
    gradient: "from-amber-500/15 to-orange-500/15",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-600",
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: "Глобальный рынок",
    text: "Бизнес без границ. 50+ стран для развития.",
    gradient: "from-sky-500/15 to-indigo-500/15",
    iconBg: "bg-sky-500/10 border-sky-500/20",
    iconColor: "text-sky-600",
  },
];

const steps = [
  {
    icon: <UserPlus className="w-6 h-6" />,
    title: "Регистрация",
    desc: "Заполните форму и получите доступ к каталогу и бизнес-инструментам.",
    color: "oklch(55% 0.16 140)",
    num: "01",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Обучение",
    desc: "Бесплатная программа: продукты, продажи, построение команды.",
    color: "oklch(55% 0.14 230)",
    num: "02",
  },
  {
    icon: <Banknote className="w-6 h-6" />,
    title: "Доход",
    desc: "Зарабатывайте с первого дня. 9 типов бонусов ждут вас.",
    color: "oklch(55% 0.18 25)",
    num: "03",
  },
];

const BusinessSection = memo(function BusinessSection() {
  return (
    <section id="business" className="relative py-16 md:py-24 overflow-hidden bg-surface-base">
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            title="Бизнес с m-international.kz"
            description="Гибридная система вознаграждений. Обучение, поддержка, глобальный рынок."
          />
        </ScrollReveal>

        {/* Rewards grid — colorful cards with hover effects */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {rewards.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.06}>
              <div className={`group relative p-5 md:p-6 rounded-2xl bg-gradient-to-br ${r.gradient} border border-border-subtle hover:border-border-default transition-all duration-500 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 overflow-hidden`}>
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />

                <div className="relative z-10">
                  <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl ${r.iconBg} border flex items-center justify-center mb-3 md:mb-4 ${r.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    {r.icon}
                  </div>
                  <h3 className="font-onest font-bold text-sm md:text-base text-text-primary mb-1.5">
                    {r.title}
                  </h3>
                  <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed">
                    {r.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Steps — redesigned with visual cards */}
        <div className="mt-14 md:mt-20">
          <ScrollReveal>
            <div className="text-center mb-8 md:mb-12">
              <div className="gradient-line w-24 mx-auto mb-6" />
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-100 mb-4">
                <Zap className="w-3.5 h-3.5 text-accent-600" />
                <span className="text-xs font-unbounded font-bold text-accent-600 uppercase tracking-wider">Быстрый старт</span>
              </div>
              <h3 className="font-unbounded font-bold text-xl md:text-2xl lg:text-3xl text-text-primary">
                Как начать
              </h3>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.12}>
                <div className="group relative p-6 md:p-8 rounded-2xl bg-surface-elevated border border-border-subtle hover:border-border-default transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-2 text-center overflow-hidden">
                  {/* Background number */}
                  <span
                    className="absolute top-3 right-4 font-unbounded text-5xl md:text-6xl font-black opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 select-none"
                    style={{ color: s.color }}
                  >
                    {s.num}
                  </span>

                  {/* Icon */}
                  <div
                    className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `linear-gradient(135deg, ${s.color}15, ${s.color}08)`,
                      border: `1px solid ${s.color}25`,
                      color: s.color,
                    }}
                  >
                    {s.icon}
                  </div>

                  {/* Content */}
                  <h4 className="font-unbounded font-bold text-base md:text-lg text-text-primary mb-2">
                    {s.title}
                  </h4>
                  <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed mb-4">
                    {s.desc}
                  </p>

                  {/* Arrow connector (not on last) */}
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <ChevronRight className="w-6 h-6 text-border-default" />
                    </div>
                  )}

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>


      </Container>
    </section>
  );
});

export default BusinessSection;
