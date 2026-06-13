"use client";

import dynamic from "next/dynamic";

const HeroSlider = dynamic(() => import("./HeroSlider"), {
  ssr: false,
  loading: () => (
    <section
      className="relative overflow-hidden flex items-center justify-center md:min-h-[720px]"
      style={{ background: "oklch(6% 0.004 160)" }}
    >
      <div className="animate-pulse text-white/30 font-space-grotesk text-sm">Loading...</div>
    </section>
  ),
});

export default HeroSlider;
