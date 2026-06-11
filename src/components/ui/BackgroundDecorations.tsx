"use client";

import { motion } from "framer-motion";

interface BackgroundDecorationsProps {
  variant?: "hero" | "section" | "subtle";
  accentColor?: string;
  className?: string;
}

export function BackgroundDecorations({
  variant = "section",
  className = "",
}: BackgroundDecorationsProps) {
  const isHero = variant === "hero";
  const isSection = variant === "section";
  const isSubtle = variant === "subtle";

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Mesh gradient base */}
      {!isSubtle && (
        <div
          className="absolute inset-0"
          style={{
            background: isHero
              ? [
                  "radial-gradient(ellipse 60% 50% at 30% 40%, oklch(55% 0.18 160 / 0.05) 0%, transparent 60%)",
                  "radial-gradient(ellipse 50% 40% at 70% 60%, oklch(55% 0.18 160 / 0.04) 0%, transparent 55%)",
                  "radial-gradient(ellipse 80% 80% at 50% 50%, oklch(100% 0.002 160 / 0.03) 0%, transparent 70%)",
                ].join(", ")
              : [
                  "radial-gradient(ellipse 50% 40% at 20% 50%, oklch(55% 0.18 160 / 0.03) 0%, transparent 60%)",
                  "radial-gradient(ellipse 40% 30% at 80% 40%, oklch(55% 0.18 160 / 0.02) 0%, transparent 55%)",
                ].join(", "),
          }}
        />
      )}

      {/* Glow orbs */}
      {isHero && (
        <>
          <motion.div
            className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.08) 0%, transparent 70%)",
              left: "10%",
              top: "20%",
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 15, 0],
              scale: [1, 1.05, 0.98, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.06) 0%, transparent 70%)",
              right: "5%",
              bottom: "15%",
              filter: "blur(100px)",
            }}
            animate={{
              x: [0, -25, 15, 0],
              y: [0, 20, -10, 0],
              scale: [1, 1.08, 0.95, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(100% 0.002 160 / 0.06) 0%, transparent 70%)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              filter: "blur(60px)",
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      {isSection && (
        <>
          <motion.div
            className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.05) 0%, transparent 70%)",
              left: "5%",
              top: "30%",
              filter: "blur(80px)",
            }}
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -15, 10, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(55% 0.18 160 / 0.04) 0%, transparent 70%)",
              right: "10%",
              bottom: "20%",
              filter: "blur(90px)",
            }}
            animate={{
              x: [0, -15, 10, 0],
              y: [0, 15, -8, 0],
            }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      )}

      {/* Dot grid pattern */}
      {!isSubtle && (
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(circle, oklch(55% 0.18 160) 1px, transparent 1px)",
            backgroundSize: isHero ? "32px 32px" : "24px 24px",
          }}
        />
      )}

      {/* Floating particles — hero only */}
      {isHero && <FloatingParticles count={16} />}
    </div>
  );
}

/* ── Floating Particles ── */

function FloatingParticles({ count }: { count: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (i * 37 + 13) % 100,
    y: (i * 53 + 7) % 100,
    size: 2 + (i % 3),
    duration: 6 + (i % 4) * 2,
    delay: (i * 0.5) % 4,
    opacity: [0.15, 0.3, 0.15] as number[],
    isAccent: i % 4 === 0,
  }));

  return (
    <div className="absolute inset-0 z-[1]">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.isAccent ? "oklch(55% 0.18 160)" : "oklch(100% 0.002 160)",
          }}
          animate={{
            y: [-10, 15, -10],
            x: [0, 5, 0],
            opacity: p.opacity,
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

export default BackgroundDecorations;
