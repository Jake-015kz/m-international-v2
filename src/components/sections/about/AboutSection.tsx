"use client";

import { memo, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Target, Eye, Gem, Rocket, CheckCircle2, UserPlus, BookOpen, Banknote, ArrowRight, Phone, Mail, User } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";
import Timeline from "./Timeline";
import { useTranslations } from "next-intl";
import { EASE_REVEAL, STAGGER_FAST } from "@/lib/motion";

const timeline = [
  { year: "2019", title: "Открытие в Монголии", desc: "Начало глобального пути компании." },
  { year: "2021", title: "Triple Diamond", desc: "Triple Diamond Director в Монголии." },
  { year: "2022", title: "Выход на рынок Казахстана", desc: "Crown Diamond в Казахстане." },
  { year: "2023", title: "Глобальная экспансия", desc: "Запуск в Турции. Тур лидеров по 30 странам." },
  { year: "2025", title: "Саммит топ-лидеров", desc: "10 мероприятий за 6 месяцев. Саммит в Алматы." },
];

const steps = [
  { icon: <UserPlus className="w-6 h-6" />, title: "Регистрация", description: "Заполните форму и получите доступ к каталогу и бизнес-инструментам.", color: "oklch(55% 0.16 140)", num: "01" },
  { icon: <BookOpen className="w-6 h-6" />, title: "Обучение", description: "Бесплатная программа: продукты, продажи, построение команды.", color: "oklch(55% 0.14 230)", num: "02" },
  { icon: <Banknote className="w-6 h-6" />, title: "Доход", description: "Зарабатывайте с первого дня. 9 типов бонусов ждут вас.", color: "oklch(55% 0.18 25)", num: "03" },
];

/* ── Value Card with Framer Motion 3D tilt + glow ── */
const ValueCard = memo(function ValueCard({
  icon,
  title,
  description,
  color = "oklch(55% 0.18 160)",
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  index: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 20 });
  const glowX = useTransform(x, [-0.5, 0.5], ["15%", "85%"]);
  const glowY = useTransform(y, [-0.5, 0.5], ["15%", "85%"]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: EASE_REVEAL }}
    >
      <motion.div
        className="group relative p-4 md:p-5 rounded-2xl bg-[#FFFFFF] border border-[var(--border-soft)] shadow-[var(--shadow-soft)] overflow-hidden cursor-default"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformPerspective: 800,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ z: 8 }}
      >
        {/* Dynamic glow */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl z-0"
          style={{
            background: useTransform(
              [glowX, glowY],
              ([gx, gy]) =>
                `radial-gradient(circle at ${String(gx)} ${String(gy)}, ${color}12 0%, transparent 55%)`
            ),
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${color}60, transparent)` }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10">
          <motion.div
            className="w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center mb-3"
            style={{
              background: `${color}10`,
              border: `1px solid ${color}20`,
              color: color,
            }}
            whileHover={{ scale: 1.1, rotate: 3 }}
            transition={{ duration: 0.3 }}
          >
            {icon}
          </motion.div>
          <h3 className="font-unbounded font-bold text-sm text-fg-primary mb-1.5">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-fg-secondary font-onest font-light leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
});

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
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: EASE_REVEAL }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-accent-50 border border-accent-100 flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 15 }}
        >
          <CheckCircle2 className="w-8 h-8 text-accent-600" />
        </motion.div>
        <h3 className="font-unbounded font-bold text-lg text-fg-primary mb-2">Спасибо за регистрацию!</h3>
        <p className="text-sm text-fg-secondary font-onest">Мы свяжемся с вами в ближайшее время.</p>
      </motion.div>
    );
  }

  const inputClass = "w-full pl-10 pr-4 py-3 text-sm bg-bg-base border rounded-2xl text-fg-primary placeholder:text-fg-tertiary font-onest focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/20 transition-colors min-h-[44px]";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-onest font-medium text-fg-secondary mb-1.5">Имя</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-tertiary" />
            <input type="text" value={formData.firstName} onChange={handleFirstNameChange} placeholder="Ваше имя" className={`${inputClass} ${errors.firstName ? "border-red-400" : "border-border-subtle"}`} />
          </div>
          {errors.firstName && <p className="text-[11px] text-red-500 mt-1 font-onest">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-xs font-onest font-medium text-fg-secondary mb-1.5">Фамилия</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-tertiary" />
            <input type="text" value={formData.lastName} onChange={handleLastNameChange} placeholder="Ваша фамилия" className={`${inputClass} ${errors.lastName ? "border-red-400" : "border-border-subtle"}`} />
          </div>
          {errors.lastName && <p className="text-[11px] text-red-500 mt-1 font-onest">{errors.lastName}</p>}
        </div>
      </div>
      <div>
        <label className="block text-xs font-onest font-medium text-fg-secondary mb-1.5">Email</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-tertiary" />
          <input type="email" value={formData.email} onChange={handleEmailChange} placeholder="email@example.com" className={`${inputClass} ${errors.email ? "border-red-400" : "border-border-subtle"}`} />
        </div>
        {errors.email && <p className="text-[11px] text-red-500 mt-1 font-onest">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-xs font-onest font-medium text-fg-secondary mb-1.5">Телефон</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-fg-tertiary" />
          <input type="tel" value={formData.phone} onChange={handlePhoneChange} placeholder="+7 (___) ___-__-__" className={`${inputClass} ${errors.phone ? "border-red-400" : "border-border-subtle"}`} />
        </div>
        {errors.phone && <p className="text-[11px] text-red-500 mt-1 font-onest">{errors.phone}</p>}
      </div>
      <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-unbounded font-bold text-sm rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-accent-500/20">
        Зарегистрироваться
        <ArrowRight className="w-4 h-4" />
      </button>
      <p className="text-[10px] text-fg-tertiary font-onest text-center">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </form>
  );
});

/* ── Step Card with enhanced animation ── */
function StepCard({
  icon,
  title,
  description,
  color,
  num,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  num: string;
  index: number;
}) {
  return (
    <motion.div
      className="group relative p-5 md:p-8 rounded-2xl bg-[#EEF7E8] border border-[var(--border-soft)] shadow-[var(--shadow-soft)] hover:border-border-default transition-all duration-500 hover:shadow-float hover:-translate-y-2 text-center overflow-hidden"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.12, duration: 0.5, ease: EASE_REVEAL }}
      whileHover={{ y: -8 }}
    >
      <span className="absolute top-3 right-4 font-unbounded text-4xl md:text-6xl font-black opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 select-none" style={{ color }}>{num}</span>
      <motion.div
        className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
        style={{ background: `linear-gradient(135deg, ${color}15, ${color}08)`, border: `1px solid ${color}25`, color }}
        whileHover={{ scale: 1.15, rotate: 5 }}
      >
        {icon}
      </motion.div>
      <h4 className="font-unbounded font-bold text-sm md:text-lg text-fg-primary mb-1.5 md:mb-2">{title}</h4>
      <p className="text-[11px] md:text-sm text-fg-secondary font-onest font-light leading-relaxed">{description}</p>
      {index < steps.length - 1 && (
        <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20">
          <ArrowRight className="w-6 h-6 text-border-default" />
        </div>
      )}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

/* ── Main About Section ── */
const AboutSection = memo(function AboutSection() {
  const t = useTranslations("about");
  const tNav = useTranslations("nav");
  return (
    <section id="about" className="relative py-12 md:py-24 overflow-hidden bg-bg-alt cv-auto">
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            badge={
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-100">
                <Target className="w-3.5 h-3.5 text-accent-600" />
                <span className="text-xs font-onest font-semibold text-accent-600">{tNav("about")}</span>
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
          <div className="space-y-3 md:space-y-4">
            <ValueCard
              icon={<Target className="w-4 h-4 md:w-5 md:h-5" />}
              title={t("mission")}
              description={t("missionText")}
              color="oklch(55% 0.18 160)"
              index={0}
            />
            <ValueCard
              icon={<Eye className="w-4 h-4 md:w-5 md:h-5" />}
              title={t("vision")}
              description={t("visionText")}
              color="oklch(55% 0.14 230)"
              index={1}
            />
            <ValueCard
              icon={<Gem className="w-4 h-4 md:w-5 md:h-5" />}
              title={t("coreValue")}
              description={t("valuesText")}
              color="oklch(65% 0.18 85)"
              index={2}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-10 md:mt-20">
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-100 mb-3">
                <Rocket className="w-3.5 h-3.5 text-accent-600" />
                <span className="text-xs font-unbounded font-bold text-accent-600 uppercase tracking-wider">{t("team")}</span>
              </div>
              <h3 className="font-unbounded font-bold text-base md:text-xl text-fg-primary">Как мы росли и побеждали</h3>
            </div>
          </ScrollReveal>
          <Timeline items={timeline} />
        </div>

        {/* How to Start Steps */}
        <div className="mt-10 md:mt-20">
          <ScrollReveal>
            <div className="text-center mb-6 md:mb-8">
              <h3 className="font-unbounded font-bold text-base md:text-2xl text-fg-primary">Как начать</h3>
              <p className="text-xs md:text-sm text-fg-secondary font-onest mt-1.5 md:mt-2">3 простых шага к вашему успеху</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto entrance-stagger">
            {steps.map((s, i) => (
              <StepCard key={s.title} {...s} index={i} />
            ))}
          </div>
        </div>

        {/* Registration Form */}
        <div className="mt-10 md:mt-20">
          <ScrollReveal>
            <div className="max-w-lg mx-auto">
              <div className="text-center mb-5 md:mb-6">
                <h3 className="font-unbounded font-bold text-base md:text-2xl text-fg-primary">Регистрация</h3>
                <p className="text-xs md:text-sm text-fg-secondary font-onest mt-1.5 md:mt-2">Заполните форму и начните свой путь с M-International</p>
              </div>
              <motion.div
                className="p-5 md:p-8 rounded-2xl bg-[#FFFFFF] border border-[var(--border-soft)] shadow-[var(--shadow-soft)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: EASE_REVEAL }}
              >
                <RegistrationForm />
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
});

export default AboutSection;
