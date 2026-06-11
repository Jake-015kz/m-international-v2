import { memo } from "react";
import { Send, MapPin, Phone, Mail, Clock } from "lucide-react";
import Container from "@/components/ui/Container";
import { useTranslations } from "next-intl";

const Footer = memo(function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const footerLinks = {
    company: [
      { label: t("company"), href: "#about" },
      { label: tNav("catalog"), href: "#products" },
      { label: tNav("business") || "Бизнес", href: "#business" },
      { label: t("certificates"), href: "#certificates" },
    ],
    catalog: [
      { label: t("detox"), href: "#products" },
      { label: t("immunity"), href: "#products" },
      { label: t("nutrition"), href: "#products" },
      { label: "Уход за кожей", href: "#products" },
    ],
    legal: [
      { label: t("privacy"), href: "#" },
      { label: t("terms"), href: "#" },
    ],
  };

  return (
    <footer id="contacts" className="relative bg-accent-900 text-text-inverse overflow-hidden" style={{ contentVisibility: "auto", containIntrinsicSize: "0 500px" }}>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <Container className="relative z-10 py-8 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {/* Brand + Contacts */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-unbounded font-bold text-base md:text-xl text-white mb-2 md:mb-3">M-International</h3>
            <p className="text-[11px] md:text-sm text-white/40 font-onest font-light leading-relaxed mb-3 md:mb-4">
              {t("subscription.description")}
            </p>
            <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-4">
              <div className="flex items-center gap-2 text-[11px] md:text-xs text-white/40 font-onest">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Казахстан, Алматы</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] md:text-xs text-white/40 font-onest">
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>+7 (777) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] md:text-xs text-white/40 font-onest">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>info@m-international.kz</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] md:text-xs text-white/40 font-onest">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>ПН-ПТ 10:00-18:00</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5 md:gap-3">
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors duration-300" aria-label="Instagram">
                <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors duration-300" aria-label="Telegram">
                <Send className="w-4 h-4 text-white/60" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors duration-300" aria-label="TikTok">
                <svg className="w-4 h-4 text-white/60" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-unbounded font-bold text-[10px] md:text-xs uppercase tracking-wider text-white/60 mb-2 md:mb-4">{t("company")}</h4>
            <ul className="space-y-1.5 md:space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[11px] md:text-sm text-white/40 hover:text-white/70 font-onest font-light transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog links */}
          <div>
            <h4 className="font-unbounded font-bold text-[10px] md:text-xs uppercase tracking-wider text-white/60 mb-2 md:mb-4">{t("catalog")}</h4>
            <ul className="space-y-1.5 md:space-y-2">
              {footerLinks.catalog.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[11px] md:text-sm text-white/40 hover:text-white/70 font-onest font-light transition-colors duration-200">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="font-unbounded font-bold text-[10px] md:text-xs uppercase tracking-wider text-white/60 mb-2 md:mb-4">{t("subscription.title")}</h4>
            <p className="text-[11px] md:text-xs text-white/40 font-onest font-light mb-3">{t("subscription.description")}</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder={t("subscription.placeholder")}
                className="flex-1 min-w-0 px-4 py-2.5 text-xs bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 font-onest focus:outline-none focus:border-emerald-500/50 transition-colors min-h-[44px]"
              />
              <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-unbounded font-bold rounded-2xl transition-colors duration-300 shrink-0 min-h-[44px]">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 md:mt-14 pt-5 md:pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] md:text-xs text-white/30 font-onest">
            {t("copyright").replace("{year}", String(new Date().getFullYear()))}
          </p>
          <div className="flex items-center gap-3 md:gap-4">
            {footerLinks.legal.map((link) => (
              <a key={link.label} href={link.href} className="text-[10px] md:text-xs text-white/30 hover:text-white/50 font-onest transition-colors duration-200">{link.label}</a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
});

export default Footer;
