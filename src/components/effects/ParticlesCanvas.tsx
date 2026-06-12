"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState, useMemo } from "react";
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

function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false;
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;
  const dpr = window.devicePixelRatio || 1;
  return w < 768 || cores <= 4 || dpr < 2;
}

export default function ParticlesCanvas({
  count,
  spread = 50,
  color = "#D4A843",
  color2 = "#F5E6A3",
  size = 0.12,
  mouseInfluence = 10,
  connectionDistance = 8,
  showConnections = false,
  dpr,
  cameraFov = 60,
  cameraZ = 60,
}: ParticlesCanvasProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lowEnd = useMemo(() => isLowEndDevice(), []);

  // Adaptive DPR: cap at 1.5 on low-end, 2 on high-end
  const adaptiveDpr: [number, number] = dpr ?? (lowEnd ? [1, 1.5] : [1, 2]);

  // Intersection Observer — only render when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { rootMargin: "100px" } // start loading 100px before visible
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fade-in after mount to avoid flash
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mobile: hard cap at 500 particles
  const effectiveCount = lowEnd ? Math.min(count ?? 500, 500) : count;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 transition-opacity duration-1000"
      style={{
        opacity: isVisible ? 1 : 0,
        willChange: "transform",
        contain: "layout style paint",
      }}
      aria-hidden="true"
    >
      {isInViewport && (
        <Canvas
          dpr={adaptiveDpr}
          camera={{
            position: [0, 0, cameraZ],
            fov: cameraFov,
            near: 0.1,
            far: 500,
          }}
          gl={{
            antialias: !lowEnd,
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
          frameloop="demand"
          flat
        >
          <Suspense fallback={<LoadingFallback />}>
            <ParticlesField
              count={effectiveCount}
              spread={spread}
              color={color}
              color2={color2}
              size={size}
              mouseInfluence={mouseInfluence}
              connectionDistance={connectionDistance}
              showConnections={showConnections && !lowEnd}
            />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
