"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  particleCount?: number;
  color?: string;
  interactive?: boolean;
}

function isLowEnd(): boolean {
  const memory = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  return (memory && memory <= 4) || (cores && cores <= 4);
}

function getAdaptiveParticleCount(): number {
  if (typeof window === "undefined") return 1500;
  const width = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;
  if (isLowEnd() || width < 768 || dpr < 2) return 800;
  if (width < 1440) return 2000;
  return 3500;
}

export default function ThreeBackground({
  particleCount,
  color = "#34d399",
  interactive = true,
}: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
      mouseRef.current.active = true;
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const count = particleCount ?? getAdaptiveParticleCount();

    // ── Scene Setup ──
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isLowEnd(),
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── Particles — GPGPU-style with custom shaders ──
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles in a wider field for depth
      positions[i3] = (Math.random() - 0.5) * 120;
      positions[i3 + 1] = (Math.random() - 0.5) * 80;
      positions[i3 + 2] = (Math.random() - 0.5) * 60;

      velocities[i3] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.004;

      sizes[i] = Math.random() * 2.5 + 0.3;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("phase", new THREE.BufferAttribute(phases, 1));

    // ── Custom Shader Material — Elite Glow ──
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(color) },
        uColor2: { value: new THREE.Color("#8b5cf6") }, // violet accent
        uMouse: { value: new THREE.Vector2(0, 0) },
        uMouseActive: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: `
        attribute float size;
        attribute float phase;
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uMouseActive;
        uniform float uPixelRatio;
        varying float vAlpha;
        varying float vGlow;

        void main() {
          vec3 pos = position;

          // Organic drift — layered sin/cos for natural motion
          pos.x += sin(uTime * 0.25 + phase) * 0.6;
          pos.y += cos(uTime * 0.18 + phase * 1.3) * 0.4;
          pos.z += sin(uTime * 0.12 + phase * 0.7) * 0.2;

          // Cursor repulsion — premium feel (particles flee from cursor)
          float mouseInfluence = uMouseActive * 8.0;
          float dx = pos.x - uMouse.x * 30.0;
          float dy = pos.y - uMouse.y * 20.0;
          float dist = length(vec2(dx, dy));
          if (dist < 15.0 && dist > 0.01) {
            float force = (1.0 - dist / 15.0) * mouseInfluence;
            pos.x += (dx / dist) * force;
            pos.y += (dy / dist) * force;
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

          // Size attenuation with depth
          float depthFactor = 60.0 / -mvPosition.z;
          gl_PointSize = size * uPixelRatio * depthFactor * 1.5;
          gl_Position = projectionMatrix * mvPosition;

          // Alpha: soft depth falloff + proximity glow
          vAlpha = smoothstep(80.0, 5.0, -mvPosition.z) * 0.7;
          vGlow = smoothstep(15.0, 0.0, dist) * uMouseActive;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform vec3 uColor2;
        varying float vAlpha;
        varying float vGlow;

        void main() {
          // Soft circular particle
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          // Core + glow
          float core = smoothstep(0.5, 0.15, dist);
          float glow = smoothstep(0.5, 0.0, dist) * 0.4;

          // Blend base color with violet glow near cursor
          vec3 finalColor = mix(uColor, uColor2, vGlow * 0.6);
          float alpha = (core + glow) * vAlpha;

          // Additive blending for bloom effect
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // ── Subtle grid floor (Linear-style) ──
    const gridHelper = new THREE.GridHelper(120, 48, 0x34d399, 0x0a0a1a);
    gridHelper.position.y = -25;
    (gridHelper.material as THREE.Material).opacity = 0.06;
    (gridHelper.material as THREE.Material).transparent = true;
    scene.add(gridHelper);

    // ── Mouse Tracking ──
    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    // ── Animation Loop ──
    let animationId: number;
    const clock = new THREE.Clock();
    let mouseActiveSmooth = 0;

    function animate() {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse activation
      const targetActive = mouseRef.current.active ? 1 : 0;
      mouseActiveSmooth += (targetActive - mouseActiveSmooth) * 0.05;

      material.uniforms.uTime.value = elapsed;
      material.uniforms.uMouse.value.set(
        mouseRef.current.x,
        mouseRef.current.y
      );
      material.uniforms.uMouseActive.value = mouseActiveSmooth;

      // Gentle rotation for organic feel
      particles.rotation.y = elapsed * 0.015;
      particles.rotation.x = Math.sin(elapsed * 0.008) * 0.03;

      renderer.render(scene, camera);
    }
    animate();

    // ── Resize Handler ──
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener("resize", handleResize);

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [particleCount, color, interactive, handleMouseMove, handleMouseLeave]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
