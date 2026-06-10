"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/ui/Container";

gsap.registerPlugin(ScrollTrigger);

interface NavbarProps {
  locale?: string;
}

const NAV_LINKS = [
  { href: "#products", label: "Продукция" },
  { href: "#certificates", label: "Сертификаты" },
  { href: "#about", label: "О компании" },
  { href: "#contact", label: "Контакты" },
];

export default function Navbar({ locale = "ru" }: NavbarProps) {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // GSAP scroll-triggered navbar animation
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const ctx = gsap.context(() => {
      // Initial state — transparent, no shadow
      gsap.set(nav, {
        backgroundColor: "rgba(251, 251, 251, 0)",
        backdropFilter: "blur(0px)",
        boxShadow: "none",
      });

      // Animate on scroll
      ScrollTrigger.create({
        start: "top top",
        end: "+=100",
        onUpdate: (self) => {
          const progress = self.progress;
          const bgAlpha = Math.min(progress * 0.85, 0.85);
          const blur = Math.min(progress * 24, 24);

          gsap.set(nav, {
            backgroundColor: `rgba(251, 251, 251, ${bgAlpha})`,
            backdropFilter: `blur(${blur}px)`,
            boxShadow:
              progress > 0.5
                ? "0 1px 20px rgba(0,0,0,0.04)"
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

  // Close mobile menu on route change
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
              className="font-unbounded font-bold text-base md:text-lg text-[#1A1A1A] tracking-normal z-50"
            >
              M-International
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-onest font-light text-zinc-600 hover:text-[#1A1A1A] transition-colors duration-200 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#1A1A1A] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* CTA + Mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="#contact"
                className="hidden md:inline-flex items-center px-4 py-2 rounded-full text-xs font-medium bg-[#1A1A1A] text-white hover:bg-zinc-800 transition-colors duration-200"
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
                  className={`block w-5 h-px bg-[#1A1A1A] transition-all duration-300 ${
                    isMobileOpen ? "rotate-45 translate-y-[3.5px]" : ""
                  }`}
                />
                <span
                  className={`block w-5 h-px bg-[#1A1A1A] transition-all duration-300 ${
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
        className={`fixed inset-0 z-40 bg-[#FBFBFB]/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
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
              className={`font-unbounded text-2xl font-bold text-[#1A1A1A] transition-all duration-500 ${
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
            href="#contact"
            className={`mt-4 inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-[#1A1A1A] text-white transition-all duration-500 ${
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
