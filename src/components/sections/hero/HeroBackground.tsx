"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

const HeroBackground = memo(function HeroBackground() {
  const bgRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Parallax on background image only — not on blobs (CSS handles blob animation)
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: bgRef.current.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0">
      {/* Background image — parallax layer */}
      <motion.div
        ref={bgRef}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 will-change-transform gpu-layer"
      >
        <Image
          src="/media/hero-bg.webp"
          alt="Nature background"
          fill
          sizes="100vw"
          className="object-cover opacity-50 sm:opacity-[0.6]"
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiTjU7QB0FA=="
        />
      </motion.div>

      {/* Mesh gradient layer */}
      <div className="absolute inset-0 mesh-gradient opacity-50 z-[1]" />

      {/* ── CSS-animated glow orbs ── */}
      {/* Replaced Framer Motion infinite loops with GPU-composited CSS keyframes.
          Hidden on mobile (md:block), disabled via prefers-reduced-motion in CSS.
          contain: paint limits blur repaint area. */}
      <div className="blob-container absolute inset-0 z-[1]">
        {/* Orb 1 — primary float */}
        <div
          className="blob blob-a hidden md:block"
          style={{
            width: "clamp(400px, 40vw, 600px)",
            height: "clamp(400px, 40vw, 600px)",
            background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.08) 0%, transparent 70%)",
            left: "15%",
            top: "25%",
            filter: "blur(80px)",
          }}
          aria-hidden="true"
        />

        {/* Orb 2 — secondary float */}
        <div
          className="blob blob-b hidden md:block"
          style={{
            width: "clamp(350px, 35vw, 500px)",
            height: "clamp(350px, 35vw, 500px)",
            background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.06) 0%, transparent 70%)",
            right: "10%",
            bottom: "20%",
            filter: "blur(100px)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Soft white glow behind center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]" aria-hidden="true">
        <div className="w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-surface-elevated/25 rounded-full blur-3xl" />
      </div>

      {/* Dot grid — Linear-style, white neutral dots */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Noise texture overlay — SVG turbulence, ultra-subtle */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          backgroundRepeat: "repeat",
          mixBlendMode: "overlay",
        }}
      />

    </div>
  );
});

export default HeroBackground;
