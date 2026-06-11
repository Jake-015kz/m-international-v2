"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  locale?: string;
}

const NAV_LINKS = [
  { href: "#products", label: "Продукция" },
  { href: "#certificates", label: "Сертификаты" },
  { href: "#about", label: "О компании" },
  { href: "#contacts", label: "Контакты" },
];

const LOCALE_LABELS: Record<string, string> = {
  ru: "RU",
  en: "EN",
  kk: "KZ",
};

export default function Navbar({ locale = "ru" }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

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
            boxShadow:
              progress > 0.5
                ? "0 1px 20px oklch(0% 0 0 / 0.04)"
                : "none",
          });

          if (progress > 0.3) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        },
      });
    }, nav);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

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
              href={`/${locale}`}
              className="flex items-center gap-2 font-unbounded font-bold text-base md:text-lg text-text-primary tracking-normal z-50 group"
            >
              <svg className="w-6 h-6 md:w-7 md:h-7 text-accent-600 group-hover:text-accent-500 transition-colors duration-300" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M10 22V10L16 16L22 10V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.15"/>
              </svg>
              <span className="hidden sm:inline">m-international.kz</span>
              <span className="sm:hidden">m-int.kz</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-onest font-light text-text-secondary hover:text-text-primary transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-text-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
            {/* Language switcher */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              {LOCALES.map((loc) => (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  className={`px-2 py-1 text-xs font-onest font-medium rounded transition-colors duration-200 ${
                    loc === locale
                      ? "text-text-primary bg-surface-sunken"
                      : "text-text-tertiary hover:text-text-secondary"
                  }`}
                >
                  {LOCALE_LABELS[loc]}
                </Link>
              ))}
            </div>

            <Link
              href="#contacts"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-xs font-medium bg-text-primary text-surface-elevated hover:bg-text-secondary transition-colors duration-200"
            >
              Связаться
            </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5 z-50"
                aria-label={isMobileOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={isMobileOpen}
              >
                <span
                  className={`block w-5 h-px bg-text-primary transition-all duration-300 ${
                    isMobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-px bg-text-primary transition-all duration-300 ${
                    isMobileOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        </Container>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-surface-base/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-unbounded text-2xl font-bold text-text-primary transition-all duration-500 ${
                isMobileOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: isMobileOpen ? `${i * 80}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contacts"
            className={`mt-4 inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-text-primary text-surface-elevated transition-all duration-500 ${
              isMobileOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: isMobileOpen ? `${NAV_LINKS.length * 80}ms` : "0ms",
            }}
          >
            Связаться
          </Link>
        </div>
      </div>
    </>
  );
}
