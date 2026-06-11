import { Send } from "lucide-react";
import Container from "@/components/ui/Container";

const footerLinks = {
  company: [
    { label: "О компании", href: "#about" },
    { label: "Продукция", href: "#products" },
    { label: "Бизнес", href: "#business" },
    { label: "Контакты", href: "#contacts" },
  ],
  catalog: [
    { label: "Детокс", href: "#products" },
    { label: "Иммунитет", href: "#products" },
    { label: "Питание", href: "#products" },
    { label: "Уход за кожей", href: "#products" },
  ],
  legal: [
    { label: "Конфиденциальность", href: "#" },
    { label: "Условия", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer id="contacts" className="relative bg-accent-900 text-text-inverse overflow-hidden">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-accent-500/30 to-transparent" />

      <Container className="relative z-10 py-10 md:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-unbounded font-bold text-lg md:text-xl text-text-inverse mb-2">
              M-International
            </h3>
            <p className="text-xs md:text-sm text-text-inverse/40 font-onest font-light leading-relaxed mb-4">
              Натуральные добавки для здоровья и долголетия. 50+ стран мира.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-text-inverse/5 hover:bg-text-inverse/10 border border-text-inverse/10 flex items-center justify-center transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 md:w-4 md:h-4 text-text-inverse/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-text-inverse/5 hover:bg-text-inverse/10 border border-text-inverse/10 flex items-center justify-center transition-colors duration-300"
                aria-label="Telegram"
              >
                <Send className="w-3.5 h-3.5 md:w-4 md:h-4 text-text-inverse/60" />
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <h4 className="font-unbounded font-bold text-xs uppercase tracking-wider text-text-inverse/60 mb-3 md:mb-4">
              Компания
            </h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs md:text-sm text-text-inverse/40 hover:text-text-inverse/70 font-onest font-light transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Catalog links */}
          <div>
            <h4 className="font-unbounded font-bold text-xs uppercase tracking-wider text-text-inverse/60 mb-3 md:mb-4">
              Каталог
            </h4>
            <ul className="space-y-2">
              {footerLinks.catalog.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs md:text-sm text-text-inverse/40 hover:text-text-inverse/70 font-onest font-light transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-unbounded font-bold text-xs uppercase tracking-wider text-text-inverse/60 mb-3 md:mb-4">
              Рассылка
            </h4>
            <p className="text-xs text-text-inverse/40 font-onest font-light mb-3">
              Эксклюзивные предложения и советы
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Ваш email"
                className="flex-1 min-w-0 px-3 py-2 text-xs bg-text-inverse/5 border border-text-inverse/10 rounded-full text-text-inverse placeholder:text-text-inverse/20 font-onest focus:outline-none focus:border-accent-500/50 transition-colors"
              />
              <button className="px-4 py-2 bg-accent-500 hover:bg-accent-400 text-text-inverse text-xs font-unbounded font-bold rounded-lg transition-colors duration-300 shrink-0">
                OK
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 md:mt-14 pt-6 border-t border-text-inverse/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[10px] md:text-xs text-text-inverse/30 font-onest">
            © {new Date().getFullYear()} M-International. Все права защищены.
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[10px] md:text-xs text-text-inverse/30 hover:text-text-inverse/50 font-onest transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
