"use client";

import { Footer } from "@/components/sections/footer";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Globe } from "lucide-react";

export default function ContactsPage() {
  return (
    <main className="pt-14 md:pt-16">
      {/* Hero */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/sections/contacts-bg.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-surface-base" />
        </div>
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <h1 className="font-unbounded font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-3">Контакты</h1>
              <p className="text-sm md:text-base text-white/60 font-onest">Свяжитесь с нами для консультации по продукции и бизнесу</p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Contact Info + Form */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <ScrollReveal>
              <div>
                <h2 className="font-unbounded font-bold text-xl text-text-primary mb-6">Свяжитесь с нами</h2>
                <div className="space-y-5">
                  {[
                    { icon: <MapPin className="w-5 h-5" />, title: "Адрес", lines: ["Казахстан, Алматы", "Бизнес-центр «M-International»"] },
                    { icon: <Phone className="w-5 h-5" />, title: "Телефон", lines: ["+7 (777) 123-45-67", "+7 (727) 987-65-43"] },
                    { icon: <Mail className="w-5 h-5" />, title: "Email", lines: ["info@m-international.kz", "support@m-international.kz"] },
                    { icon: <Clock className="w-5 h-5" />, title: "Часы работы", lines: ["ПН-ПТ: 10:00 - 18:00", "СБ: 10:00 - 14:00"] },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-surface-elevated border border-border-subtle">
                      <div className="w-10 h-10 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 shrink-0">{item.icon}</div>
                      <div>
                        <div className="font-onest font-bold text-sm text-text-primary mb-1">{item.title}</div>
                        {item.lines.map((line) => (
                          <div key={line} className="text-xs text-text-secondary font-onest">{line}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social */}
                <div className="mt-6">
                  <h3 className="font-onest font-bold text-sm text-text-primary mb-3">Мы в соцсетях</h3>
                  <div className="flex gap-3">
                    {[
                      { label: "Instagram", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg> },
                      { label: "Telegram", icon: <Send className="w-5 h-5" /> },
                      { label: "TikTok", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/></svg> },
                      { label: "WhatsApp", icon: <MessageCircle className="w-5 h-5" /> },
                    ].map((s) => (
                      <a key={s.label} href="#" className="w-10 h-10 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center text-text-secondary hover:text-accent-600 hover:border-accent-200 transition-colors" aria-label={s.label}>
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Global presence */}
                <div className="mt-6 p-4 rounded-2xl bg-surface-elevated border border-border-subtle">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-accent-600" />
                    <span className="font-onest font-bold text-sm text-text-primary">Международное присутствие</span>
                  </div>
                  <p className="text-xs text-text-secondary font-onest">Продукция представлена в 50+ странах мира, включая Казахстан, Россию, Узбекистан, Кыргызстан, Турцию и страны Юго-Восточной Азии.</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Contact Form */}
            <ScrollReveal delay={0.1}>
              <div className="p-6 md:p-8 rounded-2xl bg-surface-elevated border border-border-subtle">
                <h2 className="font-unbounded font-bold text-xl text-text-primary mb-2">Написать нам</h2>
                <p className="text-sm text-text-secondary font-onest mb-6">Заполните форму и мы свяжемся с вами</p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-onest font-medium text-text-secondary mb-1.5">Имя</label>
                      <input type="text" placeholder="Ваше имя" className="w-full px-4 py-3 text-sm bg-surface-base border border-border-subtle rounded-2xl text-text-primary placeholder:text-text-tertiary font-onest focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/20 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-onest font-medium text-text-secondary mb-1.5">Фамилия</label>
                      <input type="text" placeholder="Ваша фамилия" className="w-full px-4 py-3 text-sm bg-surface-base border border-border-subtle rounded-2xl text-text-primary placeholder:text-text-tertiary font-onest focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/20 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-onest font-medium text-text-secondary mb-1.5">Email</label>
                    <input type="email" placeholder="email@example.com" className="w-full px-4 py-3 text-sm bg-surface-base border border-border-subtle rounded-2xl text-text-primary placeholder:text-text-tertiary font-onest focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/20 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-onest font-medium text-text-secondary mb-1.5">Телефон</label>
                    <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full px-4 py-3 text-sm bg-surface-base border border-border-subtle rounded-2xl text-text-primary placeholder:text-text-tertiary font-onest focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/20 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-onest font-medium text-text-secondary mb-1.5">Сообщение</label>
                    <textarea rows={4} placeholder="Ваш вопрос..." className="w-full px-4 py-3 text-sm bg-surface-base border border-border-subtle rounded-2xl text-text-primary placeholder:text-text-tertiary font-onest focus:outline-none focus:border-accent-500 focus:ring-1 focus:ring-accent-500/20 transition-colors resize-none" />
                  </div>
                  <button type="submit" className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-unbounded font-bold text-sm rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-emerald-900/20">
                    <Send className="w-4 h-4" />
                    Отправить
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Map placeholder */}
      <section className="py-12 bg-surface-alt">
        <Container>
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-border-subtle h-64 md:h-80 bg-surface-elevated flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-10 h-10 text-accent-300 mx-auto mb-3" />
                <p className="font-onest text-sm text-text-secondary">Казахстан, Алматы</p>
                <p className="text-xs text-text-tertiary font-onest mt-1">Карта будет добавлена</p>
              </div>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
