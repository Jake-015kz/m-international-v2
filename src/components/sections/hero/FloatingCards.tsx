"use client";

import { motion } from "framer-motion";
import GlassCard from "@/components/ui/GlassCard";

export default function FloatingCards() {
  return (
    <>
      {/* Left card - Video preview */}
      <motion.div
        className="absolute left-4 lg:left-8 top-[55%] -translate-y-1/2 max-w-[280px] lg:max-w-xs z-20"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ delay: 1.2, duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <GlassCard className="p-4 lg:p-6">
            <div className="relative aspect-video rounded-2xl lg:rounded-3xl overflow-hidden bg-black/10 mb-3">
              <video
                src="/media/hero-bg.mp4"
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="/media/hero-bg.png"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5 text-black ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6.3 2.7l10.7 7.3-10.7 7.3V2.7z" />
                  </svg>
                </div>
              </div>
            </div>
            <p className="text-center text-xs lg:text-sm font-light text-zinc-600">
              Натуральные формулы M-International
            </p>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Right top card - Certified */}
      <motion.div
        className="absolute right-4 lg:right-8 top-[25%] -translate-y-1/2 z-20"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ delay: 1.4, duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <GlassCard className="p-3 lg:p-5 flex items-center gap-2 lg:gap-3">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
              </svg>
            </div>
            <span className="text-xs lg:text-sm font-medium text-zinc-800 whitespace-nowrap">
              GMP · ISO · Halal
            </span>
          </GlassCard>
        </motion.div>
      </motion.div>

      {/* Right bottom card - Global reach */}
      <motion.div
        className="absolute right-4 lg:right-8 bottom-[25%] translate-y-1/2 z-20"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ delay: 1.6, duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <GlassCard className="p-3 lg:p-5 flex items-center gap-2 lg:gap-3">
            <div className="flex -space-x-1.5 lg:-space-x-2">
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-emerald-200 border-2 border-white" />
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-emerald-300 border-2 border-white" />
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-emerald-400 border-2 border-white" />
              <div className="w-6 h-6 lg:w-8 lg:h-8 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-[8px] lg:text-[10px] text-white font-medium">
                +50
              </div>
            </div>
            <span className="text-xs lg:text-sm font-medium text-zinc-800 whitespace-nowrap">
              50+ стран
            </span>
          </GlassCard>
        </motion.div>
      </motion.div>
    </>
  );
}
