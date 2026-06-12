"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
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
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const currentLocale = useLocale() || propLocale || "ru";
  const t = useTranslations("nav");

  const NAV_LINKS = [
    { href: "/", label: t("home") },
    { href: "/catalog", label: t("catalog") },
    { href: "/about", label: t("about") },
    { href: "/contacts", label: t("contacts") },
  ];

  /* ── Smart hide/show: hide on scroll down, show on scroll up ── */
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!ticking.current) {
      ticking.current = true;
      requestAnimationFrame(() => {
        const diff = latest - lastScrollY.current;
        /* At top: always show */
        if (latest < 80) {
          setIsVisible(true);
        } else if (diff > 8) {
          /* Scrolling down: hide */
          setIsVisible(false);
        } else if (diff < -4) {
          /* Scrolling up: show */
          setIsVisible(true);
        }
        lastScrollY.current = latest;
        ticking.current = false;
      });
    }
  });

  /* ── Framer Motion scroll-driven background opacity ── */
  const rawBgOpacity = useTransform(scrollY, [0, 80], [0, 0.92]);
  const bgOpacity = useSpring(rawBgOpacity, { stiffness: 120, damping: 25 });

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
      const p = pathname || "/";
      if (href === "/") return p === `/${currentLocale}` || p === "/";
      return p.startsWith(`/${currentLocale}${href}`) || p.startsWith(href);
    },
    [pathname, currentLocale]
  );

  const getLocaleHref = useCallback(
    (targetLocale: string) => {
      const pathWithoutLocale = (pathname || "/").replace(/^\/(ru|en|kk)/, "") || "/";
      if (pathWithoutLocale === "/") return `/${targetLocale}`;
      return `/${targetLocale}${pathWithoutLocale}`;
    },
    [pathname]
  );

  return (
    <>
      <motion.nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{
          y: isVisible ? 0 : -100,
        }}
        transition={{
          duration: 0.4,
          ease: [0.16, 1, 0.3, 1],
        }}
        role="navigation"
        aria-label="Основная навигация"
      >
        {/* ── Background layer — gold-tinted blur ── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: useTransform(
              bgOpacity,
              (v) => `rgba(12, 10, 6, ${v})`
            ),
            backdropFilter: useTransform(
              bgOpacity,
              (v) => v > 0.3 ? "blur(16px) saturate(1.2)" : "blur(0px)"
            ),
            WebkitBackdropFilter: useTransform(
              bgOpacity,
              (v) => v > 0.3 ? "blur(16px) saturate(1.2)" : "blur(0px)"
            ),
          }}
        />

        {/* Border — fades in on scroll */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px bg-[oklch(65%_0.16_85_/_0.08)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <Container>
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link
              href={`/${currentLocale}`}
              className="flex items-center gap-2 font-unbounded font-bold text-base md:text-lg text-text-primary tracking-normal z-50 group"
            >
              <motion.svg
                className="w-6 h-6 md:w-7 md:h-7 text-[oklch(72%_0.16_85)] group-hover:text-[oklch(78%_0.14_85)] transition-colors duration-300"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M10 22V10L16 16L22 10V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.15"/>
              </motion.svg>
              <span className="hidden sm:inline">M-International</span>
              <span className="sm:hidden">M-Int</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={getLocalizedHref(link.href, currentLocale)}
                  className={`text-[13px] font-onest font-light transition-colors duration-200 relative group py-1 ${
                    isActive(link.href)
                      ? "text-[oklch(72%_0.14_85)]"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[oklch(65%_0.16_85)] transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* CTA + Language + Mobile toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language switcher — desktop */}
              <div className="hidden md:flex items-center gap-0.5 mr-1" role="group" aria-label="Выбор языка">
                {LOCALES.map((loc) => (
                  <Link
                    key={loc}
                    href={getLocaleHref(loc)}
                    className={`px-2 py-1 text-[11px] font-onest font-medium rounded-lg transition-colors duration-200 ${
                      loc === currentLocale
                        ? "text-[oklch(72%_0.14_85)] bg-[oklch(65%_0.16_85_/_0.08)]"
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
                className="hidden md:inline-flex items-center px-5 py-2 rounded-xl text-xs font-onest font-semibold bg-[oklch(16%_0.008_85)] text-white hover:bg-[oklch(22%_0.01_85)] border border-[oklch(65%_0.16_85_/_0.12)] hover:border-[oklch(65%_0.16_85_/_0.22)] transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_2px_12px_oklch(65%_0.16_85_/_0.08),0_1px_2px_rgba(0,0,0,0.15)] min-h-[44px]"
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
                <motion.span
                  className="block w-5 h-px bg-text-primary"
                  animate={isMobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-5 h-px bg-text-primary"
                  animate={isMobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </div>
        </Container>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        id="mobile-menu"
        className="fixed inset-0 z-40 bg-surface-base md:hidden"
        role="dialog"
        aria-modal="true"
        aria-hidden={!isMobileOpen}
        aria-label="Мобильное меню"
        initial={false}
        animate={isMobileOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-5 pb-[env(safe-area-inset-bottom)] pt-[env(safe-area-inset-top)]">
          <ul className="flex flex-col items-center gap-5" role="list">
            {NAV_LINKS.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isMobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{
                  delay: isMobileOpen ? i * 0.08 : 0,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href={getLocalizedHref(link.href, currentLocale)}
                  className={`font-onest text-lg font-semibold py-2 min-h-[44px] inline-flex items-center ${
                    isActive(link.href) ? "text-[oklch(72%_0.14_85)]" : "text-text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Language switcher */}
          <motion.div
            className="flex items-center gap-2 mt-1"
            role="group"
            aria-label="Выбор языка"
            initial={{ opacity: 0, y: 20 }}
            animate={isMobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: isMobileOpen ? NAV_LINKS.length * 0.08 : 0, duration: 0.4 }}
          >
            {LOCALES.map((loc) => (
              <Link
                key={loc}
                href={getLocaleHref(loc)}
                className={`px-4 py-2 text-sm font-onest font-medium rounded-xl transition-colors duration-200 min-h-[44px] inline-flex items-center ${
                  loc === currentLocale
                    ? "text-[oklch(72%_0.14_85)] bg-[oklch(65%_0.16_85_/_0.08)]"
                    : "text-text-tertiary hover:text-text-secondary"
                }`}
                aria-label={`Switch to ${LOCALE_LABELS[loc]}`}
                aria-current={loc === currentLocale ? "true" : undefined}
              >
                {LOCALE_LABELS[loc]}
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMobileOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: isMobileOpen ? NAV_LINKS.length * 0.08 + 0.1 : 0, duration: 0.4 }}
          >
            <Link
              href={`/${currentLocale}/contacts`}
              className="inline-flex items-center px-8 py-3.5 rounded-xl text-sm font-onest font-semibold bg-[oklch(16%_0.008_85)] text-white border border-[oklch(65%_0.16_85_/_0.12)] min-h-[44px]"
            >
              {t("contacts")}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
