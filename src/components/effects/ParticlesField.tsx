"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface ParticlesFieldProps {
  count?: number;
  spread?: number;
  color?: string;
  color2?: string;
  size?: number;
  mouseInfluence?: number;
  connectionDistance?: number;
  showConnections?: boolean;
}

function getAdaptiveCount(count?: number): number {
  if (count) return count;
  if (typeof window === "undefined") return 1500;
  const w = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;
  const cores = navigator.hardwareConcurrency || 4;

  // Mobile: aggressively reduce
  if (w < 768) return 600;
  if (cores <= 4 || dpr < 2) return 800;
  if (w < 1440) return 2000;
  return 3000;
}

export default function ParticlesField({
  count,
  spread = 60,
  color = "#34d399",
  color2 = "#8b5cf6",
  size = 0.18,
  mouseInfluence = 12,
  connectionDistance = 8,
  showConnections = true,
}: ParticlesFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const mouseActiveRef = useRef(0);
  const smoothMouseActive = useRef(0);
  const frameCount = useRef(0);
  const lastLineUpdate = useRef(0);

  const { size: viewportSize, viewport } = useThree();
  const particleCount = getAdaptiveCount(count);

  // ── Generate particle data ──
  const { positions, velocities, phases, baseSizes, connectionPositions } =
    useMemo(() => {
      const positions = new Float32Array(particleCount * 3);
      const velocities = new Float32Array(particleCount * 3);
      const phases = new Float32Array(particleCount);
      const baseSizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = spread * (0.6 + 0.4 * Math.random());

        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = (Math.random() - 0.5) * 40;

        velocities[i3] = (Math.random() - 0.5) * 0.012;
        velocities[i3 + 1] = (Math.random() - 0.5) * 0.012;
        velocities[i3 + 2] = (Math.random() - 0.5) * 0.006;

        phases[i] = Math.random() * Math.PI * 2;
        baseSizes[i] = size * (0.5 + Math.random() * 1.0);
      }

      // Connection lines buffer — cap total connections for perf
      const maxConnections = Math.min(Math.floor(particleCount * 3), 6000);
      const connectionPositions = new Float32Array(maxConnections * 6);

      return {
        positions,
        velocities,
        phases,
        baseSizes,
        connectionPositions,
      };
    }, [particleCount, spread, size]);

  // ── Custom Shader Material for Particles ──
  const particleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uColor2: { value: new THREE.Color(color2) },
        uMouse: { value: new THREE.Vector3(0, 0, 0) },
        uMouseActive: { value: 0 },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      },
      vertexShader: /* glsl */ `
        attribute float phase;
        attribute float baseSize;

        uniform float uTime;
        uniform float uPixelRatio;
        uniform vec3 uMouse;
        uniform float uMouseActive;

        varying float vAlpha;
        varying float vGlow;
        varying float vDistFromCenter;

        void main() {
          vec3 pos = position;

          // Organic layered drift
          pos.x += sin(uTime * 0.2 + phase) * 0.8;
          pos.y += cos(uTime * 0.15 + phase * 1.4) * 0.6;
          pos.z += sin(uTime * 0.1 + phase * 0.6) * 0.3;

          // Slow orbital drift
          float orbitAngle = uTime * 0.02 + phase;
          pos.x += sin(orbitAngle) * 0.4;
          pos.y += cos(orbitAngle) * 0.3;

          // Cursor repulsion
          vec3 mouse3d = uMouse * 50.0;
          mouse3d.z = 0.0;
          vec3 diff = pos - mouse3d;
          float dist = length(diff);
          float influence = uMouseActive * ${mouseInfluence.toFixed(1)};

          if (dist < 18.0 && dist > 0.01) {
            float force = pow(1.0 - dist / 18.0, 2.0) * influence;
            pos += normalize(diff) * force;
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

          float depthFactor = 60.0 / -mvPosition.z;
          gl_PointSize = baseSize * uPixelRatio * depthFactor * 2.0;
          gl_PointSize = clamp(gl_PointSize, 0.5, 6.0);

          gl_Position = projectionMatrix * mvPosition;

          vAlpha = smoothstep(100.0, 8.0, -mvPosition.z) * 0.85;
          vGlow = smoothstep(20.0, 2.0, dist) * uMouseActive;
          vDistFromCenter = length(pos.xy) / 60.0;
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform vec3 uColor2;

        varying float vAlpha;
        varying float vGlow;
        varying float vDistFromCenter;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float core = smoothstep(0.45, 0.08, dist);
          float glow = smoothstep(0.5, 0.0, dist) * 0.35;

          vec3 col = mix(uColor, uColor2, vGlow * 0.7);
          float vignette = 1.0 - smoothstep(0.5, 1.2, vDistFromCenter);

          float alpha = (core + glow) * vAlpha * vignette;
          alpha = clamp(alpha, 0.0, 0.9);

          gl_FragColor = vec4(col, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    });
  }, [color, color2, mouseInfluence]);

  // ── Connection Lines Material ──
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [color]);

  // ── Geometry refs ──
  const pointsGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("phase", new THREE.BufferAttribute(phases, 1));
    geo.setAttribute("baseSize", new THREE.BufferAttribute(baseSizes, 1));
    return geo;
  }, [positions, phases, baseSizes]);

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(connectionPositions, 3)
    );
    return geo;
  }, [connectionPositions]);

  // ── Mouse tracking ──
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      mouseActiveRef.current = 1;
    };
    const handleLeave = () => {
      mouseActiveRef.current = 0;
    };
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.x =
          (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseRef.current.y =
          -(e.touches[0].clientY / window.innerHeight - 0.5) * 2;
        mouseActiveRef.current = 1;
      }
    };
    const handleTouchEnd = () => {
      mouseActiveRef.current = 0;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // ── Animation loop ──
  const clock = useMemo(() => new THREE.Clock(), []);

  useFrame(() => {
    const elapsed = clock.getElapsedTime();
    frameCount.current++;

    // Smooth mouse activation blend
    smoothMouseActive.current +=
      (mouseActiveRef.current - smoothMouseActive.current) * 0.06;

    // Update shader uniforms every frame (cheap)
    particleMaterial.uniforms.uTime.value = elapsed;
    particleMaterial.uniforms.uPixelRatio.value = Math.min(
      window.devicePixelRatio || 1,
      2
    );
    particleMaterial.uniforms.uMouse.value.set(
      mouseRef.current.x,
      mouseRef.current.y,
      0
    );
    particleMaterial.uniforms.uMouseActive.value = smoothMouseActive.current;

    // Gentle container rotation
    if (pointsRef.current) {
      pointsRef.current.rotation.y = elapsed * 0.012;
      pointsRef.current.rotation.x = Math.sin(elapsed * 0.006) * 0.025;
    }

    if (linesRef.current) {
      linesRef.current.rotation.y = elapsed * 0.012;
      linesRef.current.rotation.x = Math.sin(elapsed * 0.006) * 0.025;
    }

    // ── OPTIMIZED: Update connection lines only every 3 frames (~20fps) ──
    if (showConnections && linesRef.current && frameCount.current % 3 === 0) {
      const posAttr = pointsGeometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      const linePosAttr = linesGeometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      const lineArray = linePosAttr.array as Float32Array;

      let lineIdx = 0;
      const maxLines = Math.min(Math.floor(lineArray.length / 6), 2000);
      const connDist2 = connectionDistance * connectionDistance;

      // Adaptive sampling: fewer checks on weaker devices
      const sampleBase = particleCount > 2000 ? 4 : particleCount > 1000 ? 3 : 2;
      const step = Math.max(1, Math.floor(particleCount / (200 * sampleBase)));

      outer: for (let i = 0; i < particleCount; i += step) {
        const ix = posArray[i * 3];
        const iy = posArray[i * 3 + 1];
        const iz = posArray[i * 3 + 2];

        for (let j = i + step; j < particleCount; j += step) {
          const jx = posArray[j * 3];
          const jy = posArray[j * 3 + 1];
          const jz = posArray[j * 3 + 2];

          const dx = ix - jx;
          const dy = iy - jy;
          const dz = iz - jz;
          const d2 = dx * dx + dy * dy + dz * dz;

          if (d2 < connDist2 && lineIdx < maxLines) {
            const base = lineIdx * 6;
            lineArray[base] = ix;
            lineArray[base + 1] = iy;
            lineArray[base + 2] = iz;
            lineArray[base + 3] = jx;
            lineArray[base + 4] = jy;
            lineArray[base + 5] = jz;
            lineIdx++;

            if (lineIdx >= maxLines) break outer;
          }
        }
      }

      // Zero out remaining
      for (let i = lineIdx * 6; i < lineArray.length; i++) {
        lineArray[i] = 0;
      }

      linePosAttr.needsUpdate = true;
      linesGeometry.setDrawRange(0, lineIdx * 2);

      // Update line opacity based on mouse
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.04 + smoothMouseActive.current * 0.06;
    }
  });

  return (
    <group>
      <points ref={pointsRef} geometry={pointsGeometry} material={particleMaterial} />
      {showConnections && (
        <lineSegments
          ref={linesRef}
          geometry={linesGeometry}
          material={lineMaterial}
        />
      )}
    </group>
  );
}
