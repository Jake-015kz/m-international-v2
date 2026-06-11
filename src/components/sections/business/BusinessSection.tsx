import { memo } from "react";
import { TrendingUp, Users, GraduationCap, Handshake, Gift, Star } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";

const rewards = [
  {
    icon: <TrendingUp className="w-5 h-5 text-accent-600" />,
    title: "9 типов бонусов",
    text: "Одна из самых комплексных систем вознаграждений в отрасли.",
  },
  {
    icon: <Users className="w-5 h-5 text-accent-600" />,
    title: "Равные возможности",
    text: "Вознаграждения по результатам, а не по стажу. Каждый может добиться успеха.",
  },
  {
    icon: <GraduationCap className="w-5 h-5 text-accent-600" />,
    title: "Бесплатное обучение",
    text: "Программа: продукты, продажи, команда. Поддержка на каждом этапе.",
  },
  {
    icon: <Handshake className="w-5 h-5 text-accent-600" />,
    title: "Win-Win система",
    text: "Ваш успех = успех вашей команды. Растём вместе.",
  },
  {
    icon: <Gift className="w-5 h-5 text-accent-600" />,
    title: "Высокий доход с первого дня",
    text: "Начните зарабатывать сразу после регистрации.",
  },
  {
    icon: <Star className="w-5 h-5 text-accent-600" />,
    title: "Глобальный рынок",
    text: "Бизнес без границ. 50+ стран для развития.",
  },
];

const steps = [
  { title: "Регистрация", desc: "Доступ к каталогу и бизнес-инструментам." },
  { title: "Обучение", desc: "Бесплатная программа: продукты, продажи, команда." },
  { title: "Доход", desc: "Зарабатывайте с первого дня." },
];

const BusinessSection = memo(function BusinessSection() {
  return (
    <section id="business" className="relative py-16 md:py-24 overflow-hidden bg-surface-base" style={{ contentVisibility: "auto", containIntrinsicSize: "0 600px" }}>
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            title="Бизнес с M-International"
            description="Гибридная система вознаграждений. Высокий доход с первого дня."
          />
        </ScrollReveal>

        {/* Rewards — horizontal scroll on mobile, grid on desktop */}
        <div className="mt-8 md:mt-12 flex gap-4 md:gap-5 overflow-x-auto pb-4 md:pb-0 md:grid md:grid-cols-2 lg:grid-cols-3 scrollbar-hide">
          {rewards.map((r, i) => (
            <ScrollReveal key={r.title} delay={i * 0.06}>
              <div className="flex-shrink-0 w-[280px] md:w-auto p-5 md:p-6 rounded-2xl bg-surface-elevated border border-border-subtle shadow-sm hover:border-border-default transition-colors duration-300">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-3 md:mb-4">
                  {r.icon}
                </div>
                <h3 className="font-unbounded font-bold text-sm md:text-base text-text-primary mb-1.5">
                  {r.title}
                </h3>
                <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed">
                  {r.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Steps — clean list */}
        <div className="mt-12 md:mt-16">
          <ScrollReveal>
            <h3 className="font-unbounded font-bold text-lg md:text-xl text-text-primary text-center mb-6 md:mb-8">
              Как начать
            </h3>
          </ScrollReveal>
          <div className="max-w-xl mx-auto">
            {steps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.1}>
                <div className="flex items-start gap-4 mb-6 last:mb-0">
                  <div className="w-8 h-8 rounded-lg bg-accent-50 border border-accent-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-unbounded text-xs font-bold text-accent-600">{i + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-unbounded font-bold text-sm md:text-base text-text-primary mb-0.5">
                      {s.title}
                    </h4>
                    <p className="text-xs md:text-sm text-text-secondary font-onest font-light">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Quote — toned down */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 md:mt-14 text-center">
            <blockquote className="font-unbounded text-base md:text-xl font-bold text-text-primary max-w-2xl mx-auto leading-[1.3]">
              «M International — ваш мост к финансовой свободе»
            </blockquote>
            <p className="text-xs text-text-tertiary font-onest mt-2">— Топ-лидеры компании</p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
});

export default BusinessSection;
