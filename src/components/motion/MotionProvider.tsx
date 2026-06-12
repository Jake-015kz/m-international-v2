"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { type ReactNode } from "react";

/**
 * MotionProvider — wraps the app with LazyMotion for tree-shaking.
 * Loads only domAnimation feature set (~30% smaller bundle than full).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
