"use client";

import { Footer } from "@/components/sections/footer";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Target, Eye, Gem, Rocket, Users, Globe, Award, TrendingUp, UserPlus, BookOpen, Banknote, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("aboutPage");
  const tAbout = useTranslations("about");
  const tBusiness = useTranslations("business");

  const timeline = [
    { year: "2019", title: tAbout("timeline.2019.title"), desc: tAbout("timeline.2019.description") },
    { year: "2020", title: tAbout("timeline.2020.title"), desc: tAbout("timeline.2020.description") },
    { year: "2021", title: tAbout("timeline.2021.title"), desc: tAbout("timeline.2021.description") },
    { year: "2022", title: tAbout("timeline.2022.title"), desc: tAbout("timeline.2022.description") },
    { year: "2023", title: tAbout("timeline.2023.title"), desc: tAbout("timeline.2023.description") },
    { year: "2024", title: tAbout("timeline.2024.title"), desc: tAbout("timeline.2024.description") },
    { year: "2025", title: tAbout("timeline.2025.title"), desc: tAbout("timeline.2025.description") },
  ];

  const steps = [
    { icon: <UserPlus className="w-6 h-6" />, title: tBusiness("steps.register.title"), desc: tBusiness("steps.register.description"), color: "oklch(55% 0.16 140)", num: "01" },
    { icon: <BookOpen className="w-6 h-6" />, title: tBusiness("steps.training.title"), desc: tBusiness("steps.training.description"), color: "oklch(55% 0.14 230)", num: "02" },
    { icon: <Banknote className="w-6 h-6" />, title: tBusiness("steps.income.title"), desc: tBusiness("steps.income.description"), color: "oklch(55% 0.18 25)", num: "03" },
  ];

  return (
    <main className="pt-14 md:pt-16">
      {/* Hero */}
      <section className="relative py-10 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/sections/about-company.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-surface-base" />
        </div>
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-unbounded font-bold text-[1.65rem] sm:text-3xl md:text-4xl text-white mb-2">{t("title")}</h1>
              <p className="text-sm md:text-base text-white/60 font-onest">{t("description")}</p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Mission / Vision / Values */}
      <section className="py-8 md:py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
            <ScrollReveal>
              <div className="p-4 md:p-6 rounded-2xl bg-surface-elevated border border-border-subtle h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5 md:w-6 md:h-6 text-accent-600" />
                </div>
                <h3 className="font-unbounded font-bold text-base md:text-lg text-text-primary mb-1.5">{t("mission")}</h3>
                <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed">
                  {tAbout("mission")}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="p-4 md:p-6 rounded-2xl bg-surface-elevated border border-border-subtle h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-3">
                  <Eye className="w-5 h-5 md:w-6 md:h-6 text-accent-600" />
                </div>
                <h3 className="font-unbounded font-bold text-base md:text-lg text-text-primary mb-1.5">{t("vision")}</h3>
                <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed">
                  {tAbout("visionText")}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="p-4 md:p-6 rounded-2xl bg-surface-elevated border border-border-subtle h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-3">
                  <Gem className="w-5 h-5 md:w-6 md:h-6 text-accent-600" />
                </div>
                <h3 className="font-unbounded font-bold text-base md:text-lg text-text-primary mb-1.5">{t("values")}</h3>
                <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed">
                  {tAbout("valuesText")}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="p-4 md:p-6 rounded-2xl bg-surface-elevated border border-border-subtle h-full">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mb-3">
                  <Rocket className="w-5 h-5 md:w-6 md:h-6 text-accent-600" />
                </div>
                <h3 className="font-unbounded font-bold text-base md:text-lg text-text-primary mb-1.5">{tAbout("motto")}</h3>
                <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed">
                  {tAbout("mottoText")}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="py-8 md:py-12 bg-surface-alt">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />, value: "50+", label: t("hero.stat.countries") },
              { icon: <Users className="w-5 h-5 md:w-6 md:h-6" />, value: "10K+", label: t("hero.stat.customers") },
              { icon: <Award className="w-5 h-5 md:w-6 md:h-6" />, value: "6", label: t("certificates.title") },
              { icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />, value: "5", label: t("hero.stat.years") },
            ].map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <div className="text-center p-4 md:p-6 rounded-2xl bg-surface-elevated border border-border-subtle">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-accent-50 border border-accent-100 flex items-center justify-center mx-auto mb-2 md:mb-3 text-accent-600">{s.icon}</div>
                  <div className="font-unbounded font-bold text-xl md:text-2xl text-text-primary">{s.value}</div>
                  <div className="text-[11px] md:text-xs text-text-secondary font-onest mt-0.5 md:mt-1">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Timeline */}
      <section className="py-8 md:py-16">
        <Container>
          <ScrollReveal>
            <h2 className="font-unbounded font-bold text-base md:text-2xl text-text-primary text-center mb-6 md:mb-10">{tAbout("team")}</h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-200 via-accent-300 to-transparent md:-translate-x-px" />
            <div className="space-y-4 md:space-y-8">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.08}>
                  <div className="relative flex items-start gap-3 md:gap-8">
                    <div className="absolute left-3 md:left-1/2 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-accent-500 border-2 border-surface-elevated shadow-sm -translate-x-1 md:-translate-x-1.5 mt-1.5 z-10" />
                    <div className="ml-8 md:ml-0 md:w-1/2 md:pl-10">
                      <span className="font-unbounded text-[10px] md:text-xs font-bold text-accent-600 bg-accent-50 px-2 py-0.5 rounded-md">{item.year}</span>
                      <h4 className="font-unbounded font-bold text-xs md:text-base text-text-primary mt-1.5 mb-0.5">{item.title}</h4>
                      <p className="text-[11px] md:text-sm text-text-secondary font-onest font-light">{item.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* How to Start */}
      <section className="py-8 md:py-16 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-10">
              <h2 className="font-unbounded font-bold text-base md:text-2xl text-text-primary">{tBusiness("howToStart")}</h2>
              <p className="text-xs md:text-sm text-text-secondary font-onest mt-1.5 md:mt-2">3 простых шага к вашему успеху</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.12}>
                <div className="group relative p-5 md:p-8 rounded-2xl bg-surface-elevated border border-border-subtle hover:border-border-default transition-all duration-500 hover:shadow-xl hover:-translate-y-2 text-center overflow-hidden">
                  <span className="absolute top-3 right-4 font-unbounded text-4xl md:text-6xl font-black opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 select-none" style={{ color: s.color }}>{s.num}</span>
                  <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: `linear-gradient(135deg, ${s.color}15, ${s.color}08)`, border: `1px solid ${s.color}25`, color: s.color }}>{s.icon}</div>
                  <h4 className="font-unbounded font-bold text-sm md:text-lg text-text-primary mb-1.5 md:mb-2">{s.title}</h4>
                  <p className="text-[11px] md:text-sm text-text-secondary font-onest font-light leading-relaxed mb-3 md:mb-4">{s.desc}</p>
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
