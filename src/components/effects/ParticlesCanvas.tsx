"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useState } from "react";
import ParticlesField from "./ParticlesField";

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

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial color="#0a0a0a" wireframe />
    </mesh>
  );
}

export default function ParticlesCanvas({
  count,
  spread = 60,
  color = "#34d399",
  color2 = "#8b5cf6",
  size = 0.18,
  mouseInfluence = 12,
  connectionDistance = 8,
  showConnections = true,
  dpr = [1, 2],
  cameraFov = 60,
  cameraZ = 60,
}: ParticlesCanvasProps) {
  const [isVisible, setIsVisible] = useState(false);

  // Fade-in after mount to avoid flash
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 transition-opacity duration-1000"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden="true"
    >
      <Canvas
        dpr={dpr}
        camera={{
          position: [0, 0, cameraZ],
          fov: cameraFov,
          near: 0.1,
          far: 500,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ParticlesField
            count={count}
            spread={spread}
            color={color}
            color2={color2}
            size={size}
            mouseInfluence={mouseInfluence}
            connectionDistance={connectionDistance}
            showConnections={showConnections}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
