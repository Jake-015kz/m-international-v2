"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { usePrefersReducedMotion } from "@/lib/motion";
import * as THREE from "three";

/* ── Pulsing Grid ── */
function PulsingGrid() {
  const meshRef = useRef<THREE.GridHelper>(null);
  const matRef = useRef<THREE.LineBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current || !matRef.current) return;
    const t = clock.getElapsedTime();
    // Opacity pulse: 0.10 → 0.17
    matRef.current.opacity = 0.10 + (Math.sin(t * 2.2) * 0.5 + 0.5) * 0.07;
    // Subtle scale pulse
    const s = 1 + Math.sin(t * 1.1) * 0.015;
    meshRef.current.scale.setScalar(s);
  });

  return (
    <gridHelper
      ref={meshRef}
      args={[14, 32, "#31F59B", "#0B4D31"]}
      position={[0, 0, 0]}
    >
      <lineBasicMaterial
        ref={matRef}
        transparent
        opacity={0.12}
        depthWrite={false}
      />
    </gridHelper>
  );
}

/* ── Scene ── */
function Scene() {
  return (
    <>
      <color attach="background" args={["#06120D"]} />
      <fog attach="fog" args={["#06120D", 5, 25]} />
      <PulsingGrid />
      <ambientLight intensity={0.3} />
    </>
  );
}

/* ── Exported Component ── */
export default function TechGridBackground() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 2, 8], fov: 45, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
