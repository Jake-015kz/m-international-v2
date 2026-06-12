"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { LOCALES } from "@/lib/constants";

interface NavbarProps {
  locale?: string;
}

const LOCALE_LABELS: Record<string, string> = {
  ru: "RU",
  en: "EN",
  kk: "KZ",
};

function getLocalizedHref(href: string, locale: string): string {
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

export default function Navbar({ locale: propLocale }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const currentLocale = useLocale() || propLocale || "ru";
  const t = useTranslations("nav");

  const NAV_LINKS = [
    { href: "/", label: t("home") },
    { href: "/catalog", label: t("catalog") },
    { href: "/about", label: t("about") },
    { href: "/contacts", label: t("contacts") },
  ];

  // Solid on scroll — transparent on hero
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === `/${currentLocale}` || pathname === "/";
      return pathname.startsWith(`/${currentLocale}${href}`) || pathname.startsWith(href);
    },
    [pathname, currentLocale]
  );

  const getLocaleHref = useCallback(
    (targetLocale: string) => {
      const pathWithoutLocale = pathname.replace(/^\/(ru|en|kk)/, "") || "/";
      if (pathWithoutLocale === "/") return `/${targetLocale}`;
      return `/${targetLocale}${pathWithoutLocale}`;
    },
    [pathname]
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
          isScrolled
            ? "bg-surface-base border-b border-border-subtle/50 shadow-sm"
            : "bg-transparent border-b border-transparent"
        }`}
        role="navigation"
        aria-label="Основная навигация"
      >
        <Container>
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link
              href={`/${currentLocale}`}
              className="flex items-center gap-2 font-unbounded font-bold text-base md:text-lg text-text-primary tracking-normal z-50 group"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7 text-accent-600 group-hover:text-accent-500 transition-colors duration-300" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M10 22V10L16 16L22 10V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.15"/>
              </svg>
              <span className="hidden sm:inline">M-International</span>
              <span className="sm:hidden">M-Int</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={getLocalizedHref(link.href, currentLocale)}
                  className={`text-sm font-onest font-light transition-colors duration-200 relative group ${
                    isActive(link.href) ? "text-accent-600" : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-px bg-accent-500 transition-all duration-300 ${isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              ))}
            </div>

            {/* CTA + Language + Mobile toggle */}
            <div className="flex items-center gap-3">
              {/* Language switcher — desktop */}
              <div className="hidden md:flex items-center gap-1 mr-2" role="group" aria-label="Выбор языка">
                {LOCALES.map((loc) => (
                  <Link
                    key={loc}
                    href={getLocaleHref(loc)}
                    className={`px-2 py-1 text-xs font-onest font-medium rounded-lg transition-colors duration-200 ${
                      loc === currentLocale
                        ? "text-text-primary bg-surface-sunken"
                        : "text-text-tertiary hover:text-text-secondary"
                    }`}
                    aria-label={`Switch to ${LOCALE_LABELS[loc]}`}
                    aria-current={loc === currentLocale ? "true" : undefined}
                  >
                    {LOCALE_LABELS[loc]}
                  </Link>
                ))}
              </div>

              <Link
                href={`/${currentLocale}/contacts`}
                className="hidden md:inline-flex items-center px-5 py-2 rounded-xl text-xs font-onest font-semibold bg-[oklch(18%_0.01_160)] text-white hover:bg-[oklch(25%_0.01_160)] border border-white/[0.08] hover:border-white/[0.14] transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_2px_8px_oklch(55%_0.18_160_/_0.1),0_1px_2px_rgba(0,0,0,0.15)] min-h-[44px]"
              >
                {t("contacts")}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50 p-1"
                aria-label={isMobileOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
              >
                <span className={`block w-5 h-px transition-all duration-300 ${isMobileOpen ? "rotate-45 translate-y-[3.5px] bg-text-primary" : "bg-text-primary"}`} />
                <span className={`block w-5 h-px transition-all duration-300 ${isMobileOpen ? "-rotate-45 -translate-y-[3.5px] bg-text-primary" : "bg-text-primary"}`} />
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-surface-base transition-all duration-500 md:hidden ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMobileOpen}
        aria-label="Мобильное меню"
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
          <ul className="flex flex-col items-center gap-6" role="list">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href}>
                <Link
                  href={getLocalizedHref(link.href, currentLocale)}
                  className={`font-onest text-lg font-semibold transition-all duration-500 py-2 min-h-[44px] inline-flex items-center ${
                    isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  } ${isActive(link.href) ? "text-accent-600" : "text-text-primary"}`}
                  style={{ transitionDelay: isMobileOpen ? `${i * 80}ms` : "0ms" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Language switcher */}
          <div className="flex items-center gap-2 mt-2" role="group" aria-label="Выбор языка">
            {LOCALES.map((loc) => (
              <Link
                key={loc}
                href={getLocaleHref(loc)}
                className={`px-4 py-2 text-sm font-onest font-medium rounded-xl transition-colors duration-200 min-h-[44px] inline-flex items-center ${
                  loc === currentLocale
                    ? "text-text-primary bg-surface-sunken"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
                aria-label={`Switch to ${LOCALE_LABELS[loc]}`}
                aria-current={loc === currentLocale ? "true" : undefined}
              >
                {LOCALE_LABELS[loc]}
              </Link>
            ))}
          </div>

          <Link
            href={`/${currentLocale}/contacts`}
            className={`mt-2 inline-flex items-center px-8 py-3.5 rounded-xl text-sm font-onest font-semibold bg-[oklch(18%_0.01_160)] text-white border border-white/[0.08] transition-all duration-500 min-h-[44px] ${
              isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: isMobileOpen ? `${NAV_LINKS.length * 80}ms` : "0ms" }}
          >
            {t("contacts")}
          </Link>
        </div>
      </div>
    </>
  );
}
