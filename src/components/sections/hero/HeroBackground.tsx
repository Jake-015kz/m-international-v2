"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo } from "react";

/* ── Particle data (deterministic via useMemo) ── */
interface Particle {
  id: number;
  x: number; // vw
  y: number; // vh
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
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
      size: 2 + (i % 3), // 2-4px
      duration: 5 + (i % 4) * 1.5, // 5-9.5s
      delay: (i * 0.7) % 5,
      color: i % 3 === 0 ? "green" : "white",
      animType: i % 2 === 0 ? "a" : "b",
    });
  }
  return particles;
}

function Particles() {
  const particles = useMemo(() => generateParticles(24), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${
            p.color === "green" ? "bg-emerald-200" : "bg-white"
          }`}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
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
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      {/* Background image — crisp, higher opacity */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0"
      >
        <Image
          src="/media/hero-bg.png"
          alt="Nature background"
          fill
          className="object-cover opacity-50 sm:opacity-[0.6]"
          priority
        />
      </motion.div>

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.1) 50%, transparent 80%)",
            "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(26,40,30,0.18) 0%, transparent 70%)",
            "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(200,210,200,0.12) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full z-[1]"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
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
      <motion.div
        className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full z-[1]"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)",
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

      {/* Soft white glow behind center text — smaller on mobile */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <div className="w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] bg-white/25 rounded-full blur-3xl" />
      </div>

      {/* Dot grid — very subtle */}
      <div
        className="absolute inset-0 z-[1] opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, #10b981 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Floating particles */}
      <Particles />

      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
