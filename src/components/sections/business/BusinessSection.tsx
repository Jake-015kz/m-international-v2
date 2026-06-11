"use client";

import { memo } from "react";
import { TrendingUp, Users, GraduationCap, Handshake, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";

const rewards = [
  { icon: <GraduationCap className="w-5 h-5" />, title: "Бесплатное обучение", text: "Программа: продукты, продажи, команда. Поддержка на каждом этапе.", gradient: "from-emerald-500/15 to-teal-500/15", iconBg: "bg-emerald-500/10 border-emerald-500/20", iconColor: "text-emerald-600" },
  { icon: <Users className="w-5 h-5" />, title: "Сообщество 10 000+", text: "Присоединяйтесь к команде единомышленников в 50+ странах.", gradient: "from-blue-500/15 to-cyan-500/15", iconBg: "bg-blue-500/10 border-blue-500/20", iconColor: "text-blue-600" },
  { icon: <Handshake className="w-5 h-5" />, title: "Win-Win система", text: "Ваш успех = успех вашей команды. Растём вместе.", gradient: "from-violet-500/15 to-purple-500/15", iconBg: "bg-violet-500/10 border-violet-500/20", iconColor: "text-violet-600" },
  { icon: <TrendingUp className="w-5 h-5" />, title: "9 типов бонусов", text: "Комплексная система вознаграждений за результат.", gradient: "from-amber-500/15 to-orange-500/15", iconBg: "bg-amber-500/10 border-amber-500/20", iconColor: "text-amber-600" },
  { icon: <Star className="w-5 h-5" />, title: "Глобальный рынок", text: "Бизнес без границ. 50+ стран для развития.", gradient: "from-sky-500/15 to-indigo-500/15", iconBg: "bg-sky-500/10 border-sky-500/20", iconColor: "text-sky-600" },
];

const BusinessSection = memo(function BusinessSection() {
  return (
    <section id="business" className="relative py-12 md:py-24 overflow-hidden bg-surface-base">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img src="/images/sections/business-team.webp" alt="" className="w-full h-full object-cover opacity-5" loading="lazy" />
      </div>
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            title="Бизнес с M-International"
            description="Гибридная система вознаграждений. Обучение, поддержка, глобальный рынок."
          />
        </ScrollReveal>

        {/* Rewards grid */}
        <div className="mt-6 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {rewards.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.06}>
              <div className={`group relative p-4 md:p-6 rounded-2xl bg-gradient-to-br ${r.gradient} border border-border-subtle hover:border-border-default transition-all duration-500 hover:shadow-lg hover:shadow-black/5 hover:-translate-y-1 overflow-hidden`}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent" />
                <div className="relative z-10">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl ${r.iconBg} border flex items-center justify-center mb-3 md:mb-4 ${r.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    {r.icon}
                  </div>
                  <h3 className="font-onest font-bold text-sm md:text-base text-text-primary mb-1.5">{r.title}</h3>
                  <p className="text-[11px] md:text-sm text-text-secondary font-onest font-light leading-relaxed">{r.text}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
});

export default BusinessSection;
