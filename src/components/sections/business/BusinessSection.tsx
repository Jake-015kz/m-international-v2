import { TrendingUp, Users, GraduationCap, Handshake, Gift, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";
import GlassCard from "@/components/ui/GlassCard";

const rewards = [
  {
    icon: <TrendingUp className="w-5 h-5 text-emerald-600" />,
    title: "9 типов бонусов",
    text: "Одна из самых комплексных систем вознаграждений в отрасли.",
  },
  {
    icon: <Users className="w-5 h-5 text-emerald-600" />,
    title: "Равные возможности",
    text: "Вознаграждения по результатам, а не по стажу. Каждый может добиться успеха.",
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-emerald-600" />,
    title: "Бесплатное обучение",
    text: "Программа: продукты, продажи, команда. Поддержка на каждом этапе.",
  },
  {
    icon: <Handshake className="w-5 h-5 text-emerald-600" />,
    title: "Win-Win система",
    text: "Ваш успех = успех вашей команды. Растём вместе.",
  },
  {
    icon: <Gift className="w-5 h-5 text-emerald-600" />,
    title: "Высокий доход с первого дня",
    text: "Начните зарабатывать сразу после регистрации.",
  },
  {
    icon: <Star className="w-5 h-5 text-emerald-600" />,
    title: "Глобальный рынок",
    text: "Бизнес без границ. 50+ стран для развития.",
  },
];

const steps = [
  { num: "01", title: "Регистрация", desc: "Доступ к каталогу и бизнес-инструментам." },
  { num: "02", title: "Обучение", desc: "Бесплатная программа: продукты, продажи, команда." },
  { num: "03", title: "Доход", desc: "Зарабатывайте с первого дня." },
];

export default function BusinessSection() {
  return (
    <section id="business" className="relative py-16 md:py-24 overflow-hidden bg-[#FBFBFB]">
      <BackgroundDecorations variant="section" accentColor="#10b981" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            badge={
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/5 bg-white/60 backdrop-blur-sm">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[9px] md:text-[10px] font-medium uppercase tracking-wider text-emerald-700 font-onest">
                  Business
                </span>
              </span>
            }
            title="Бизнес с M-International"
            description="Гибридная система вознаграждений. Высокий доход с первого дня."
          />
        </ScrollReveal>

        {/* Rewards grid */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {rewards.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.08}>
              <GlassCard className="p-5 md:p-6 h-full hover:border-emerald-200/50 transition-colors duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-3 md:mb-4">
                  {r.icon}
                </div>
                <h3 className="font-unbounded font-bold text-sm md:text-base text-[#1A1A1A] mb-1.5">
                  {r.title}
                </h3>
                <p className="text-xs md:text-sm text-zinc-500 font-onest font-light leading-relaxed">
                  {r.text}
                </p>
              </GlassCard>
            </ScrollReveal>
          ))}
        </div>

        {/* Steps */}
        <div className="mt-12 md:mt-16">
          <ScrollReveal>
            <h3 className="font-unbounded font-bold text-lg md:text-xl text-[#1A1A1A] text-center mb-6 md:mb-8">
              Как начать
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {steps.map((s, i) => (
              <ScrollReveal key={s.num} delay={i * 0.12}>
                <div className="relative text-center p-6 md:p-8 rounded-3xl bg-white/60 backdrop-blur-sm border border-black/5 hover:border-emerald-200/50 transition-colors duration-300">
                  <span className="font-unbounded text-3xl md:text-4xl font-black text-emerald-100">
                    {s.num}
                  </span>
                  <h4 className="font-unbounded font-bold text-base md:text-lg text-[#1A1A1A] mt-2 mb-1.5">
                    {s.title}
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-500 font-onest font-light">
                    {s.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Quote */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 md:mt-14 text-center">
            <blockquote className="font-unbounded text-base md:text-xl font-bold text-[#1A1A1A] max-w-2xl mx-auto leading-[1.3]">
              «M International — ваш шанс стать долларовым миллионером»
            </blockquote>
            <p className="text-xs text-zinc-400 font-onest mt-2">— Топ-лидеры компании</p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
