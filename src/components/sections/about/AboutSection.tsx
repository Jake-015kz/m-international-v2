import { Target, Eye, Gem, Rocket } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";

const values = [
  {
    icon: <Target className="w-5 h-5 text-accent-600" />,
    title: "Миссия",
    text: "Создаём новый стандарт в индустрии — меняем имидж, повышаем доверие и социальную ценность.",
  },
  {
    icon: <Eye className="w-5 h-5 text-accent-600" />,
    title: "Видение",
    text: "Стать компанией №1 в мире через инновационные продукты и систему вознаграждений, ориентированную на людей.",
  },
  {
    icon: <Gem className="w-5 h-5 text-accent-600" />,
    title: "Ценности",
    text: "Время, воспоминания и путь, пройденный вместе — это главное. Качество, честность, инновации.",
  },
  {
    icon: <Rocket className="w-5 h-5 text-accent-600" />,
    title: "Девиз",
    text: "«Мост к вашим мечтам» — мы помогаем людям реализовать свой потенциал и достичь успеха.",
  },
];

const timeline = [
  { year: "2019", title: "Открытие в Монголии", desc: "Начало глобального пути компании." },
  { year: "2021", title: "Triple Diamond", desc: "Triple Diamond Director в Монголии." },
  { year: "2022", title: "Выход на рынок Казахстана", desc: "Crown Diamond в Казахстане." },
  { year: "2023", title: "Глобальная экспансия", desc: "Запуск в Турции. Тур лидеров по 30 странам." },
  { year: "2025", title: "Саммит топ-лидеров", desc: "10 мероприятий за 6 месяцев. Саммит в Алматы." },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            title="О компании M-International"
            description="Международный производитель натуральных БАДов. Наука + природа = здоровье."
          />
        </ScrollReveal>

        {/* Values — alternating layout */}
        <div className="mt-8 md:mt-12 space-y-4 md:space-y-5">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.08}>
              <div className={`flex items-start gap-4 md:gap-6 p-5 md:p-7 rounded-2xl bg-surface-elevated border border-border-subtle shadow-sm ${i % 2 === 1 ? "md:flex-row-reverse md:text-right" : ""}`}>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center shrink-0">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-unbounded font-bold text-sm md:text-base text-text-primary mb-1.5">
                    {v.title}
                  </h3>
                  <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed">
                    {v.text}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-12 md:mt-16">
          <ScrollReveal>
            <h3 className="font-unbounded font-bold text-lg md:text-xl text-text-primary text-center mb-6 md:mb-8">
              Наш путь
            </h3>
          </ScrollReveal>
          <div className="relative">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-200 via-accent-300 to-transparent md:-translate-x-px" />

            <div className="space-y-6 md:space-y-8">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Dot */}
                    <div className="absolute left-4 md:left-1/2 w-2.5 h-2.5 rounded-full bg-accent-500 border-2 border-surface-elevated shadow-sm -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10" />

                    {/* Content */}
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <span className="font-unbounded text-xs font-bold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-md">
                        {item.year}
                      </span>
                      <h4 className="font-unbounded font-bold text-sm md:text-base text-text-primary mt-1.5 mb-0.5">
                        {item.title}
                      </h4>
                      <p className="text-xs md:text-sm text-text-secondary font-onest font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
