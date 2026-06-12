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
  if (typeof window === "undefined") return 1000;
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency || 4;

  // Mobile: cap at 500 as per requirements
  if (w < 768) return 500;
  if (cores <= 4) return 700;
  if (w < 1440) return 1200;
  return 1800;
}

export default function ParticlesField({
  count,
  spread = 50,
  color = "#D4A843",
  color2 = "#F5E6A3",
  size = 0.12,
  mouseInfluence = 10,
  connectionDistance = 8,
  showConnections = false,
}: ParticlesFieldProps) {
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef(new THREE.Vector3(0, 0, 0));
  const mouseActiveRef = useRef(0);
  const smoothMouseActive = useRef(0);
  const frameCount = useRef(0);

  const particleCount = getAdaptiveCount(count);

  // ── Shared geometry: small sphere for each particle ──
  // Low poly for perf: 6 segments (icosahedron-like)
  const sphereGeo = useMemo(
    () => new THREE.IcosahedronGeometry(size, 1),
    [size]
  );

  // ── Shared material: warm golden, translucent ──
  const particleMat = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(color2),
      emissiveIntensity: 0.35,
      transparent: true,
      opacity: 0.55,
      roughness: 0.4,
      metalness: 0.1,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
    });
  }, [color, color2]);

  // ── Line material for connections ──
  const lineMaterial = useMemo(() => {
    return new THREE.LineBasicMaterial({
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.06,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [color]);

  // ── Initial particle data ──
  const { basePositions, velocities, phases, scales } = useMemo(() => {
    const basePositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Spherical cloud distribution — denser at center
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = spread * Math.pow(Math.random(), 0.5); // sqrt for uniform volume

      basePositions[i3] = r * Math.sin(phi) * Math.cos(theta);
      basePositions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      basePositions[i3 + 2] = (Math.random() - 0.5) * 30;

      velocities[i3] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.004;

      phases[i] = Math.random() * Math.PI * 2;
      // Varied sizes for depth — smaller on edges
      const distFromCenter = r / spread;
      scales[i] = 0.6 + Math.random() * 0.8 * (1 - distFromCenter * 0.5);
    }

    return { basePositions, velocities, phases, scales };
  }, [particleCount, spread]);

  // ── Connection lines buffer ──
  const connectionPositions = useMemo(() => {
    const maxConnections = Math.min(Math.floor(particleCount * 2), 3000);
    return new Float32Array(maxConnections * 6);
  }, [particleCount]);

  const linesGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(connectionPositions, 3));
    return geo;
  }, [connectionPositions]);

  // ── Temp objects for matrix updates (avoid GC) ──
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempPosition = useMemo(() => new THREE.Vector3(), []);
  const tempQuaternion = useMemo(() => new THREE.Quaternion(), []);
  const tempScale = useMemo(() => new THREE.Vector3(1, 1, 1), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

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
  const { invalidate } = useThree();

  useFrame(() => {
    const elapsed = clock.getElapsedTime();
    frameCount.current++;

    // Force re-render in demand mode
    invalidate();

    // Smooth mouse activation
    smoothMouseActive.current +=
      (mouseActiveRef.current - smoothMouseActive.current) * 0.06;

    if (!instancedRef.current) return;

    const mesh = instancedRef.current;
    const mouse3D = mouseRef.current;
    const influence = mouseInfluence * smoothMouseActive.current;

    // Update each instance matrix
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Base position + organic drift
      let x = basePositions[i3];
      let y = basePositions[i3 + 1];
      let z = basePositions[i3 + 2];

      // Layered organic motion — very gentle
      const phase = phases[i];
      x += Math.sin(elapsed * 0.15 + phase) * 0.6;
      y += Math.cos(elapsed * 0.12 + phase * 1.3) * 0.5;
      z += Math.sin(elapsed * 0.08 + phase * 0.7) * 0.25;

      // Slow orbital drift
      const orbitAngle = elapsed * 0.015 + phase;
      x += Math.sin(orbitAngle) * 0.3;
      y += Math.cos(orbitAngle) * 0.2;

      // Cursor repulsion — particles flee from mouse
      if (influence > 0.01) {
        const mx = mouse3D.x * 50;
        const my = mouse3D.y * 50;
        const dx = x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 15 && dist > 0.01) {
          const force = Math.pow(1 - dist / 15, 2) * influence;
          x += (dx / dist) * force;
          y += (dy / dist) * force;
        }
      }

      // Set position
      tempPosition.set(x, y, z);

      // Scale: base scale + subtle pulse
      const s = scales[i] * (1 + Math.sin(elapsed * 0.3 + phase) * 0.08);
      tempScale.setScalar(s);

      // Build matrix
      tempMatrix.compose(tempPosition, tempQuaternion, tempScale);
      mesh.setMatrixAt(i, tempMatrix);

      // Color variation: shift between warm gold and light cream
      const colorMix = 0.3 + 0.7 * (1 - Math.sqrt(x * x + y * y) / spread);
      tempColor.lerpColors(
        new THREE.Color(color),
        new THREE.Color(color2),
        Math.max(0, Math.min(1, colorMix)) * 0.4
      );
      mesh.setColorAt(i, tempColor);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;

    // Gentle group rotation
    mesh.rotation.y = elapsed * 0.008;
    mesh.rotation.x = Math.sin(elapsed * 0.004) * 0.02;

    // ── Connection lines (throttled, desktop only) ──
    if (showConnections && linesRef.current && frameCount.current % 4 === 0) {
      const lineArray = (linesGeometry.getAttribute("position") as THREE.BufferAttribute)
        .array as Float32Array;

      let lineIdx = 0;
      const maxLines = Math.min(Math.floor(lineArray.length / 6), 1500);
      const connDist2 = connectionDistance * connectionDistance;

      // Adaptive step for perf
      const step = Math.max(1, Math.floor(particleCount / 150));

      outer: for (let i = 0; i < particleCount; i += step) {
        const ix = basePositions[i * 3];
        const iy = basePositions[i * 3 + 1];
        const iz = basePositions[i * 3 + 2];

        for (let j = i + step; j < particleCount; j += step) {
          const jx = basePositions[j * 3];
          const jy = basePositions[j * 3 + 1];
          const jz = basePositions[j * 3 + 2];

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

      const linePosAttr = linesGeometry.getAttribute("position") as THREE.BufferAttribute;
      linePosAttr.needsUpdate = true;
      linesGeometry.setDrawRange(0, lineIdx * 2);

      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = 0.03 + smoothMouseActive.current * 0.04;
    }
  });

  return (
    <group>
      <instancedMesh
        ref={instancedRef}
        args={[sphereGeo, particleMat, particleCount]}
        frustumCulled={false}
      />
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
