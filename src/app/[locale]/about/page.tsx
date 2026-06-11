import { Footer } from "@/components/sections/footer";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Target, Eye, Gem, Rocket, Users, Globe, Award, TrendingUp, UserPlus, BookOpen, Banknote, ArrowRight } from "lucide-react";

const timeline = [
  { year: "2019", title: "Открытие в Монголии", desc: "Начало глобального пути компании." },
  { year: "2020", title: "Рост в Монголии", desc: "Diamond Director и 1-я годовщина в Улан-Баторе." },
  { year: "2021", title: "Triple Diamond", desc: "Triple Diamond Director в Монголии." },
  { year: "2022", title: "Выход на рынок Казахстана", desc: "Crown Diamond в Казахстане." },
  { year: "2023", title: "Глобальная экспансия", desc: "Запуск в Турции. Тур лидеров по 30 странам." },
  { year: "2024", title: "Международные саммиты", desc: "M Travel: саммит директоров." },
  { year: "2025", title: "Саммит топ-лидеров", desc: "10 мероприятий за 6 месяцев. Саммит в Алматы." },
];

const steps = [
  { icon: <UserPlus className="w-6 h-6" />, title: "Регистрация", desc: "Заполните форму и получите доступ к каталогу и бизнес-инструментам.", color: "oklch(55% 0.16 140)", num: "01" },
  { icon: <BookOpen className="w-6 h-6" />, title: "Обучение", desc: "Бесплатная программа: продукты, продажи, построение команды.", color: "oklch(55% 0.14 230)", num: "02" },
  { icon: <Banknote className="w-6 h-6" />, title: "Доход", desc: "Зарабатывайте с первого дня. 9 типов бонусов ждут вас.", color: "oklch(55% 0.18 25)", num: "03" },
];

export default function AboutPage() {
  return (
    <main className="pt-14 md:pt-16">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/sections/about-company.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-surface-base" />
        </div>
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-unbounded font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-3">О компании M-International</h1>
              <p className="text-sm md:text-base text-white/60 font-onest">Международный производитель натуральных БАДов. Наука + природа = здоровье.</p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <ScrollReveal>
              <div className="p-6 rounded-2xl bg-surface-elevated border border-border-subtle h-full">
                <div className="w-12 h-12 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="font-unbounded font-bold text-lg text-text-primary mb-2">Миссия</h3>
                <p className="text-sm text-text-secondary font-onest font-light leading-relaxed">
                  Создаём новый стандарт в индустрии — меняем имидж, повышаем доверие и социальную ценность. Мы помогаем людям реализовать свой потенциал и достичь успеха.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="p-6 rounded-2xl bg-surface-elevated border border-border-subtle h-full">
                <div className="w-12 h-12 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="font-unbounded font-bold text-lg text-text-primary mb-2">Видение</h3>
                <p className="text-sm text-text-secondary font-onest font-light leading-relaxed">
                  Стать компанией №1 в мире через инновационные продукты, передовые технологии и систему вознаграждений, ориентированную на людей.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="p-6 rounded-2xl bg-surface-elevated border border-border-subtle h-full">
                <div className="w-12 h-12 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-4">
                  <Gem className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="font-unbounded font-bold text-lg text-text-primary mb-2">Ценности</h3>
                <p className="text-sm text-text-secondary font-onest font-light leading-relaxed">
                  Время, воспоминания и путь, пройденный вместе — это главное. Качество, честность, инновации и забота о людях.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="p-6 rounded-2xl bg-surface-elevated border border-border-subtle h-full">
                <div className="w-12 h-12 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-4">
                  <Rocket className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="font-unbounded font-bold text-lg text-text-primary mb-2">Девиз</h3>
                <p className="text-sm text-text-secondary font-onest font-light leading-relaxed">
                  «Мост к вашим мечтам» — мы помогаем людям реализовать свой потенциал. Слоган: «УРА!» — энергия счастья, успеха и изобилия.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-12 bg-surface-alt">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Globe className="w-6 h-6" />, value: "50+", label: "Стран присутствия" },
              { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Партнёров" },
              { icon: <Award className="w-6 h-6" />, value: "6", label: "Сертификатов" },
              { icon: <TrendingUp className="w-6 h-6" />, value: "5", label: "Лет на рынке" },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <div className="text-center p-6 rounded-2xl bg-surface-elevated border border-border-subtle">
                  <div className="w-12 h-12 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mx-auto mb-3 text-accent-600">{s.icon}</div>
                  <div className="font-unbounded font-bold text-2xl text-text-primary">{s.value}</div>
                  <div className="text-xs text-text-secondary font-onest mt-1">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-12 md:py-16">
        <Container>
          <ScrollReveal>
            <h2 className="font-unbounded font-bold text-xl md:text-2xl text-text-primary text-center mb-10">Наш путь</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-200 via-accent-300 to-transparent md:-translate-x-px" />
            <div className="space-y-6 md:space-y-8">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-4 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    <div className="absolute left-4 md:left-1/2 w-2.5 h-2.5 rounded-full bg-accent-500 border-2 border-surface-elevated shadow-sm -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10" />
                    <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <span className="font-unbounded text-xs font-bold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-md">{item.year}</span>
                      <h4 className="font-unbounded font-bold text-sm md:text-base text-text-primary mt-1.5 mb-0.5">{item.title}</h4>
                      <p className="text-xs md:text-sm text-text-secondary font-onest font-light">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* How to Start */}
      <section className="py-12 md:py-16 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-10">
              <h2 className="font-unbounded font-bold text-xl md:text-2xl text-text-primary">Как начать</h2>
              <p className="text-sm text-text-secondary font-onest mt-2">3 простых шага к вашему успеху</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.12}>
                <div className="group relative p-6 md:p-8 rounded-2xl bg-surface-elevated border border-border-subtle hover:border-border-default transition-all duration-500 hover:shadow-xl hover:-translate-y-2 text-center overflow-hidden">
                  <span className="absolute top-3 right-4 font-unbounded text-5xl md:text-6xl font-black opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 select-none" style={{ color: s.color }}>{s.num}</span>
                  <div className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: `linear-gradient(135deg, ${s.color}15, ${s.color}08)`, border: `1px solid ${s.color}25`, color: s.color }}>{s.icon}</div>
                  <h4 className="font-unbounded font-bold text-base md:text-lg text-text-primary mb-2">{s.title}</h4>
                  <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed mb-4">{s.desc}</p>
                  {i < steps.length - 1 && (
                    <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                      <ArrowRight className="w-6 h-6 text-border-default" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
