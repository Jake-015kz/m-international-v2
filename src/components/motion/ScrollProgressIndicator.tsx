"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgressIndicator — тонкая полоса прогресса скролла вверху страницы.
 * Показывает сколько страницы уже проскроллено.
 *
 * Использование: разместить в layout.tsx внутри body, перед основным контентом.
 */
export default function ScrollProgressIndicator() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent-500/80 origin-left z-[100]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
