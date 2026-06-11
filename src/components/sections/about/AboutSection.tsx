"use client";

import { memo, useState, useCallback } from "react";
import { Target, Eye, Gem, Rocket, CheckCircle2, UserPlus, BookOpen, Banknote, ArrowRight, Phone, Mail, User } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";
import { useTranslations } from "next-intl";

const timeline = [
  { year: "2019", title: "Открытие в Монголии", desc: "Начало глобального пути компании." },
  { year: "2021", title: "Triple Diamond", desc: "Triple Diamond Director в Монголии." },
  { year: "2022", title: "Выход на рынок Казахстана", desc: "Crown Diamond в Казахстане." },
  { year: "2023", title: "Глобальная экспансия", desc: "Запуск в Турции. Тур лидеров по 30 странам." },
  { year: "2025", title: "Саммит топ-лидеров", desc: "10 мероприятий за 6 месяцев. Саммит в Алматы." },
];

const steps = [
  { icon: <UserPlus className="w-6 h-6" />, title: "Регистрация", desc: "Заполните форму и получите доступ к каталогу и бизнес-инструментам.", color: "oklch(55% 0.16 140)", num: "01" },
  { icon: <BookOpen className="w-6 h-6" />, title: "Обучение", desc: "Бесплатная программа: продукты, продажи, построение команды.", color: "oklch(55% 0.14 230)", num: "02" },
  { icon: <Banknote className="w-6 h-6" />, title: "Доход", desc: "Зарабатывайте с первого дня. 9 типов бонусов ждут вас.", color: "oklch(55% 0.18 25)", num: "03" },
];

/* ── Registration Form ── */
const RegistrationForm = memo(function RegistrationForm() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = useCallback(() => {
    const errs: Record<string, string> = {};
    if (!formData.firstName.trim()) errs.firstName = "Введите имя";
    if (!formData.lastName.trim()) errs.lastName = "Введите фамилию";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) errs.email = "Введите корректный email";
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 10) errs.phone = "Введите номер телефона";
    return errs;
  }, [formData]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
    console.log("Registration:", formData);
  }, [validate]);

  const handleFirstNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, firstName: e.target.value }));
    setErrors((prev) => ({ ...prev, firstName: "" }));
  }, []);

  const handleLastNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, lastName: e.target.value }));
    setErrors((prev) => ({ ...prev, lastName: "" }));
  }, []);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
    setErrors((prev) => ({ ...prev, email: "" }));
  }, []);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, phone: e.target.value }));
    setErrors((prev) => ({ ...prev, phone: "" }));
  }, []);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="font-unbounded font-bold text-lg text-text-primary mb-2">Спасибо за регистрацию!</h3>
        <p className="text-sm text-text-secondary font-onest">Мы свяжемся с вами в ближайшее время.</p>
      </div>
    );
  }

  const inputClass = "w-full pl-10 pr-4 py-3 text-sm bg-surface-base border rounded-2xl text-text-primary placeholder:text-text-tertiary font-onest focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/20 transition-colors min-h-[44px]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-onest font-medium text-text-secondary mb-1.5">Имя</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input type="text" value={formData.firstName} onChange={handleFirstNameChange} placeholder="Ваше имя" className={`${inputClass} ${errors.firstName ? "border-red-400" : "border-border-subtle"}`} />
          </div>
          {errors.firstName && <p className="text-[11px] text-red-500 mt-1 font-onest">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-xs font-onest font-medium text-text-secondary mb-1.5">Фамилия</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input type="text" value={formData.lastName} onChange={handleLastNameChange} placeholder="Ваша фамилия" className={`${inputClass} ${errors.lastName ? "border-red-400" : "border-border-subtle"}`} />
          </div>
          {errors.lastName && <p className="text-[11px] text-red-500 mt-1 font-onest">{errors.lastName}</p>}
        </div>
      </div>
      <div>
        <label className="block text-xs font-onest font-medium text-text-secondary mb-1.5">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input type="email" value={formData.email} onChange={handleEmailChange} placeholder="email@example.com" className={`${inputClass} ${errors.email ? "border-red-400" : "border-border-subtle"}`} />
        </div>
        {errors.email && <p className="text-[11px] text-red-500 mt-1 font-onest">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-xs font-onest font-medium text-text-secondary mb-1.5">Телефон</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input type="tel" value={formData.phone} onChange={handlePhoneChange} placeholder="+7 (___) ___-__-__" className={`${inputClass} ${errors.phone ? "border-red-400" : "border-border-subtle"}`} />
        </div>
        {errors.phone && <p className="text-[11px] text-red-500 mt-1 font-onest">{errors.phone}</p>}
      </div>
      <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-unbounded font-bold text-sm rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-emerald-900/20">
        Зарегистрироваться
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-[10px] text-text-tertiary font-onest text-center">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
});

const AboutSection = memo(function AboutSection() {
  const t = useTranslations("about");
  const tNav = useTranslations("nav");
  return (
    <section id="about" className="relative py-12 md:py-24 overflow-hidden bg-surface-alt" style={{ contentVisibility: "auto", containIntrinsicSize: "0 800px" }}>
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            badge={
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-100">
                <Target className="w-3.5 h-3.5 text-accent-600" />
                <span className="text-xs font-unbounded font-bold text-accent-600 uppercase tracking-wider">{tNav("about")}</span>
              </div>
            }
            title={t("title")}
            description={t("description")}
          />
        </ScrollReveal>

        {/* About image + text */}
        <div className="mt-6 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 items-center">
          <ScrollReveal>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img src="/images/sections/about-company.webp" alt="О компании M-International" className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="space-y-3 md:space-y-4">
              <div className="p-4 md:p-5 rounded-2xl bg-surface-elevated border border-border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center">
                    <Target className="w-4 h-4 md:w-5 md:h-5 text-accent-600" />
                  </div>
                  <h3 className="font-unbounded font-bold text-sm text-text-primary">{t("mission")}</h3>
                </div>
                <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed">
                  {t("missionText")}
                </p>
              </div>
              <div className="p-4 md:p-5 rounded-2xl bg-surface-elevated border border-border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center">
                    <Eye className="w-4 h-4 md:w-5 md:h-5 text-accent-600" />
                  </div>
                  <h3 className="font-unbounded font-bold text-sm text-text-primary">{t("vision")}</h3>
                </div>
                <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed">
                  {t("visionText")}
                </p>
              </div>
              <div className="p-4 md:p-5 rounded-2xl bg-surface-elevated border border-border-subtle">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center">
                    <Gem className="w-4 h-4 md:w-5 md:h-5 text-accent-600" />
                  </div>
                  <h3 className="font-unbounded font-bold text-sm text-text-primary">{t("coreValue")}</h3>
                </div>
                <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed">
                  {t("valuesText")}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Timeline */}
        <div className="mt-10 md:mt-20">
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-100 mb-3">
                <Rocket className="w-3.5 h-3.5 text-accent-600" />
                <span className="text-xs font-unbounded font-bold text-accent-600 uppercase tracking-wider">{t("team")}</span>
              </div>
              <h3 className="font-unbounded font-bold text-base md:text-xl text-text-primary">Как мы росли и побеждали</h3>
            </div>
          </ScrollReveal>
          <div className="relative max-w-4xl mx-auto">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-200 via-accent-400 to-accent-200 md:-translate-x-px" />
            <div className="space-y-6 md:space-y-8">
              {timeline.map((item, i) => (
                <ScrollReveal key={item.year} delay={i * 0.08}>
                  <div className={`relative flex items-start gap-4 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Dot on line */}
                    <div className="absolute left-4 md:left-1/2 z-10 -translate-x-1/2 mt-5">
                      <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-accent-500 border-[3px] border-surface-base shadow-md shadow-accent-500/20" />
                    </div>
                    {/* Spacer for mobile */}
                    <div className="ml-10 md:hidden" />
                    {/* Card — alternating sides on desktop */}
                    <div className={`ml-10 md:ml-0 md:w-[calc(50%-2.5rem)] ${i % 2 === 0 ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"}`}>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-50 border border-accent-100 mb-2">
                        <span className="font-unbounded text-xs font-bold text-accent-600">{item.year}</span>
                      </div>
                      <div className="p-4 md:p-5 rounded-2xl bg-surface-elevated border border-border-subtle hover:border-accent-200 transition-all duration-300 hover:shadow-lg hover:shadow-accent-500/5">
                        <h4 className="font-unbounded font-bold text-sm md:text-base text-text-primary mb-1">{item.title}</h4>
                        <p className="text-xs md:text-sm text-text-secondary font-onest font-light leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    {/* Fill other side on desktop */}
                    <div className="hidden md:block md:w-[calc(50%-2.5rem)]" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>

        {/* How to Start Steps */}
        <div className="mt-10 md:mt-20">
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-8">
              <h3 className="font-unbounded font-bold text-base md:text-2xl text-text-primary">Как начать</h3>
              <p className="text-xs md:text-sm text-text-secondary font-onest mt-1.5 md:mt-2">3 простых шага к вашему успеху</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto">
            {steps.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.12}>
                <div className="group relative p-5 md:p-8 rounded-2xl bg-surface-elevated border border-border-subtle hover:border-border-default transition-all duration-500 hover:shadow-xl hover:shadow-black/5 hover:-translate-y-2 text-center overflow-hidden">
                  <span className="absolute top-3 right-4 font-unbounded text-4xl md:text-6xl font-black opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 select-none" style={{ color: s.color }}>{s.num}</span>
                  <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3" style={{ background: `linear-gradient(135deg, ${s.color}15, ${s.color}08)`, border: `1px solid ${s.color}25`, color: s.color }}>{s.icon}</div>
                  <h4 className="font-unbounded font-bold text-sm md:text-lg text-text-primary mb-1.5 md:mb-2">{s.title}</h4>
                  <p className="text-[11px] md:text-sm text-text-secondary font-onest font-light leading-relaxed">{s.desc}</p>
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
        </div>

        {/* Registration Form */}
        <div className="mt-10 md:mt-20">
          <ScrollReveal>
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-5 md:mb-6">
                <h3 className="font-unbounded font-bold text-base md:text-2xl text-text-primary">Регистрация</h3>
                <p className="text-xs md:text-sm text-text-secondary font-onest mt-1.5 md:mt-2">Заполните форму и начните свой путь с M-International</p>
              </div>
              <div className="p-5 md:p-8 rounded-2xl bg-surface-elevated border border-border-subtle shadow-sm">
                <RegistrationForm />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
});

export default AboutSection;
