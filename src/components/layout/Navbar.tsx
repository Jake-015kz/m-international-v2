"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Container from "@/components/ui/Container";
import { LOCALES } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const currentLocale = useLocale() || propLocale || "ru";
  const t = useTranslations("nav");

  const NAV_LINKS = [
    { href: "/", label: t("home") },
    { href: "/catalog", label: t("catalog") },
    { href: "/about", label: t("about") },
    { href: "/contacts", label: t("contacts") },
  ];

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      gsap.set(nav, {
        backgroundColor: "oklch(98.5% 0.003 160 / 0)",
        backdropFilter: "blur(0px)",
        boxShadow: "none",
      });

      ScrollTrigger.create({
        start: "top top",
        end: "+=100",
        onUpdate: (self) => {
          const progress = self.progress;
          const bgAlpha = Math.min(progress * 0.85, 0.85);
          const blur = Math.min(progress * 24, 24);

          gsap.set(nav, {
            backgroundColor: `oklch(98.5% 0.003 160 / ${bgAlpha})`,
            backdropFilter: `blur(${blur}px)`,
            boxShadow: progress > 0.5 ? "0 1px 20px oklch(0% 0 0 / 0.04)" : "none",
          });

          setIsScrolled(progress > 0.3);
        },
      });
    }, nav);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    };
  }, [isMobileOpen]);

  const isActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === `/${currentLocale}` || pathname === "/";
      return pathname.startsWith(`/${currentLocale}${href}`) || pathname.startsWith(href);
    },
    [pathname, currentLocale]
  );

  // Build alternate locale URLs for language switcher
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
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
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
                    className={`px-2 py-1 text-xs font-onest font-medium rounded-xl transition-colors duration-200 ${
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
                className="hidden md:inline-flex items-center px-5 py-2 rounded-2xl text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-500 transition-colors duration-200"
              >
                {t("contacts")}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
                aria-label={isMobileOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMobileOpen}
              >
                <span className={`block w-5 h-px bg-text-primary transition-all duration-300 ${isMobileOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
                <span className={`block w-5 h-px bg-text-primary transition-all duration-300 ${isMobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-surface-base/95 backdrop-blur-xl transition-all duration-500 md:hidden mobile-no-backdrop ${
          isMobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={getLocalizedHref(link.href, currentLocale)}
              className={`font-unbounded text-xl font-bold transition-all duration-500 py-2 ${
                isMobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              } ${isActive(link.href) ? "text-accent-600" : "text-text-primary"}`}
              style={{ transitionDelay: isMobileOpen ? `${i * 80}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}

          {/* Language switcher in mobile menu */}
          <div className="flex items-center gap-2 mt-2" role="group" aria-label="Выбор языка">
            {LOCALES.map((loc) => (
              <Link
                key={loc}
                href={getLocaleHref(loc)}
                className={`px-4 py-2 text-sm font-onest font-medium rounded-xl transition-colors duration-200 ${
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
            className={`mt-2 inline-flex items-center px-8 py-3.5 rounded-2xl text-sm font-medium bg-emerald-600 text-white transition-all duration-500 ${
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
