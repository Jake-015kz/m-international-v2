"use client";

import { Suspense, lazy } from "react";

const ParticlesCanvas = lazy(() => import("@/components/effects/ParticlesCanvas"));

function Fallback() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        background:
          "radial-gradient(ellipse at 50% 30%, rgba(212,168,67,0.08) 0%, transparent 70%), #0a0a0a",
      }}
      aria-hidden="true"
    />
  );
}

interface ParticleBackgroundProps {
  count?: number;
  spread?: number;
  color?: string;
  color2?: string;
  size?: number;
  mouseInfluence?: number;
  dpr?: [number, number];
  cameraFov?: number;
  cameraZ?: number;
}

export default function ParticleBackground({
  count = 1200,
  spread = 50,
  color = "#D4A843",
  color2 = "#F5E6A3",
  size = 0.1,
  mouseInfluence = 8,
  dpr,
  cameraFov = 60,
  cameraZ = 60,
}: ParticleBackgroundProps) {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{ width: "100vw", height: "100vh" }}
      aria-hidden="true"
    >
      <Suspense fallback={<Fallback />}>
        <ParticlesCanvas
          count={count}
          spread={spread}
          color={color}
          color2={color2}
          size={size}
          mouseInfluence={mouseInfluence}
          showConnections={false}
          dpr={dpr}
          cameraFov={cameraFov}
          cameraZ={cameraZ}
        />
      </Suspense>
    </div>
  );
}
