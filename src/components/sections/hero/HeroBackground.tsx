"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroBackground = memo(function HeroBackground() {
  const bgRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      if (orb1Ref.current) {
        gsap.to(orb1Ref.current, {
          yPercent: -20,
          xPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: orb1Ref.current.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (orb2Ref.current) {
        gsap.to(orb2Ref.current, {
          yPercent: -30,
          xPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: orb2Ref.current.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0">
      {/* Background image — parallax layer */}
      <motion.div
        ref={bgRef}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
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

      {/* Animated glow orb 1 — hidden on mobile to save GPU */}
      <motion.div
        ref={orb1Ref}
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full z-[1] will-change-transform hidden md:block"
        style={{
          background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.08) 0%, transparent 70%)",
          left: "15%",
          top: "25%",
          filter: "blur(80px)",
        }}
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 15, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated glow orb 2 — hidden on mobile to save GPU */}
      <motion.div
        ref={orb2Ref}
        className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full z-[1] will-change-transform hidden md:block"
        style={{
          background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.06) 0%, transparent 70%)",
          right: "10%",
          bottom: "20%",
          filter: "blur(100px)",
        }}
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 25, -15, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />

      {/* Soft white glow behind center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <div className="w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-surface-elevated/25 rounded-full blur-3xl" />
      </div>

      {/* Dot grid — very subtle */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, oklch(55% 0.18 160) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
});

export default HeroBackground;
