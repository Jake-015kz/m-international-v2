"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useRef, useEffect, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: "white" | "green";
  animType: "a" | "b";
}

function generateParticles(count: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      id: i,
      x: (i * 37 + 13) % 100,
      y: (i * 53 + 7) % 100,
      size: 2 + (i % 3),
      duration: 5 + (i % 4) * 1.5,
      delay: (i * 0.7) % 5,
      color: i % 3 === 0 ? "green" : "white",
      animType: i % 2 === 0 ? "a" : "b",
    });
  }
  return particles;
}

const Particles = memo(function Particles() {
  const particles = useMemo(() => generateParticles(24), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${
            p.color === "green" ? "bg-accent-200" : "bg-surface-elevated"
          }`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            willChange: "transform, opacity",
          }}
          animate={{
            y: p.animType === "a" ? [-10, 10, -10] : [-8, 14, -8],
            x: p.animType === "a" ? [0, 5, 0] : [0, -4, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
});

const HeroBackground = memo(function HeroBackground() {
  const bgRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

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

      if (particlesRef.current) {
        gsap.to(particlesRef.current, {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: particlesRef.current.parentElement,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
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

      {/* Conic glow — desktop only */}
      <div className="hero-conic-glow hidden md:block" style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }} />

      {/* Mesh gradient layer */}
      <div className="absolute inset-0 hero-mesh-gradient opacity-50 z-[1]" />

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

      {/* Floating particles — parallax layer */}
      <div ref={particlesRef} className="will-change-transform">
        <Particles />
      </div>

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
});

export default HeroBackground;
