"use client";

import dynamic from "next/dynamic";
import { memo, ComponentType } from "react";

interface ParticlesCanvasProps {
  count?: number;
  spread?: number;
  color?: string;
  color2?: string;
  size?: number;
  mouseInfluence?: number;
  connectionDistance?: number;
  showConnections?: boolean;
  dpr?: [number, number];
  cameraFov?: number;
  cameraZ?: number;
}

// R3F Particles — полностью на клиенте, без SSR
const ParticlesCanvas = dynamic(
  () => import("@/components/effects/ParticlesCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-[oklch(6%_0.004_160)]" />
    ),
  }
) as ComponentType<ParticlesCanvasProps>;

interface ThreeBackgroundProps {
  particleCount?: number;
  color?: string;
  /** Вторичный цвет для glow-эффекта у курсора (violet) */
  color2?: string;
  /** Интерактивность — реакция на курсор */
  interactive?: boolean;
  /** Показывать связи между частицами */
  showConnections?: boolean;
  /** Распределение частиц */
  spread?: number;
  /** Базовый размер частиц */
  size?: number;
}

/**
 * ThreeBackground — премиальный WebGL фон с частицами.
 *
 * Стек: React Three Fiber + Three.js + кастомные GLSL шейдеры.
 *
 * Фичи:
 * - 3000 частиц с органическим движением (layered sin/cos drift)
 * - Курсор-репульсия: частицы плавно убегают от мыши
 * - Связи между близкими частицами (line segments)
 * - Двойной цвет: базовый emerald + violet glow у курсора
 * - Адаптивное количество частиц (800-3000) по device capability
 * - CSS fallback для reduced-motion
 */
const ThreeBackground = memo(function ThreeBackground({
  particleCount,
  color = "#D4A843",
  color2 = "#F5E6A3",
  interactive = true,
  showConnections = true,
  spread = 80,
  size = 0.18,
}: ThreeBackgroundProps) {
  return (
    <>
      {/* WebGL Particles */}
      <ParticlesCanvas
        key="r3f-particles"
        count={particleCount}
        color={color}
        color2={color2}
        spread={spread}
        size={size}
        showConnections={showConnections}
        mouseInfluence={interactive ? 14 : 0}
        connectionDistance={10}
      />

      {/* Aurora CSS fallback — всегда рендерится под WebGL для глубины */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {/* Emerald glow — top-left */}
        <div
          className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full opacity-[0.06]"
          style={{
            background: `radial-gradient(circle, ${color}33 0%, transparent 65%)`,
            filter: "blur(100px)",
          }}
        />
        {/* Violet glow — top-right */}
        <div
          className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-[0.04]"
          style={{
            background: `radial-gradient(circle, ${color2}22 0%, transparent 65%)`,
            filter: "blur(110px)",
          }}
        />
      </div>
    </>
  );
});

export default ThreeBackground;
