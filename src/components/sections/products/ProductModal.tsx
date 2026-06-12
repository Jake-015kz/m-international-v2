"use client";

import { useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type Variants, type Transition } from "framer-motion";
import { X, Leaf, Shield, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { EASE_REVEAL, EASE_SUBTLE } from "@/lib/motion";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    subtitle: string;
    description: string;
    color: string;
    image?: string;
    benefits?: string[];
    composition?: string;
  } | null;
}

const EASE_OUT_QUAD = [0.4, 0, 1, 1] as const;

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.2 } },
} satisfies Variants;

const modalTransitionEnter: Transition = { duration: 0.4, ease: EASE_REVEAL };
const modalTransitionExit: Transition = { duration: 0.25, ease: EASE_OUT_QUAD };
const fadeTransitionEnter: Transition = { duration: 0.4, ease: EASE_REVEAL };
const fadeTransitionExit: Transition = { duration: 0.2, ease: EASE_OUT_QUAD };

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: modalTransitionEnter,
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.96,
    transition: modalTransitionExit,
  },
} satisfies Variants;

const staggerContent = {
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.15 },
  },
} satisfies Variants;

const fadeItem = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: fadeTransitionEnter,
  },
} satisfies Variants;

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("catalog");

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  return createPortal(
    <AnimatePresence>
      {isOpen && product && (
        <motion.div
          ref={overlayRef}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => {
            if (e.target === overlayRef.current) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Подробнее о ${product.name}`}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-elevated border border-border-subtle shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with image */}
            <div
              className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl"
              style={{
                background: `linear-gradient(135deg, ${product.color}18 0%, ${product.color}30 50%, ${product.color}18 100%)`,
              }}
            >
              {product.image ? (
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                />
              ) : (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: `linear-gradient(135deg, ${product.color}25, ${product.color}10)`,
                      border: `1px solid ${product.color}30`,
                      color: product.color,
                    }}
                  >
                    <Leaf className="w-10 h-10" />
                  </div>
                </motion.div>
              )}

              {/* Solid gradient overlay at top for close button */}
              <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

              {/* Close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 min-h-[44px] min-w-[44px]"
                aria-label="Закрыть"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4 text-white" />
              </motion.button>

              {/* Subtitle badge */}
              <motion.div
                className="absolute bottom-3 left-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
              >
                <span
                  className="inline-block px-3 py-1.5 rounded-full text-xs font-unbounded font-bold text-white shadow-lg"
                  style={{ background: `${product.color}dd` }}
                >
                  {product.subtitle}
                </span>
              </motion.div>
            </div>

            {/* Content — staggered */}
            <motion.div
              className="p-5 sm:p-6"
              variants={staggerContent}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                className="font-unbounded font-bold text-xl sm:text-2xl text-text-primary mb-3 leading-[1.2]"
                variants={fadeItem}
              >
                {product.name}
              </motion.h2>

              <motion.p
                className="text-sm text-text-secondary font-onest font-light leading-relaxed mb-5"
                variants={fadeItem}
              >
                {product.description}
              </motion.p>

              {/* Benefits — staggered list */}
              {product.benefits && product.benefits.length > 0 && (
                <motion.div className="mb-5" variants={fadeItem}>
                  <h3 className="font-unbounded font-bold text-xs uppercase tracking-wider text-text-tertiary mb-3">
                    {t("specifications")}
                  </h3>
                  <div className="space-y-2">
                    {product.benefits.map((benefit, i) => (
                      <motion.div
                        key={benefit}
                        className="flex items-start gap-2.5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                      >
                        <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: product.color }} />
                        <span className="text-sm text-text-secondary font-onest font-light">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Composition */}
              {product.composition && (
                <motion.div
                  className="mb-5 p-3 rounded-xl bg-surface-sunken border border-border-subtle"
                  variants={fadeItem}
                >
                  <h3 className="font-unbounded font-bold text-xs uppercase tracking-wider text-text-tertiary mb-1.5">
                    {t("certificates")}
                  </h3>
                  <p className="text-xs text-text-secondary font-onest font-light leading-relaxed">
                    {product.composition}
                  </p>
                </motion.div>
              )}

              {/* Trust badges */}
              <motion.div className="flex items-center gap-3 mb-5" variants={fadeItem}>
                <div className="flex items-center gap-1.5 text-text-tertiary">
                  <Shield className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-onest uppercase tracking-wider">GMP · ISO · Halal</span>
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div className="flex flex-col sm:flex-row gap-3" variants={fadeItem}>
                <a
                  href="#contacts"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-unbounded font-bold text-sm rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-emerald-900/20 min-h-[44px]"
                >
                  {t("contact")}
                </a>
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center px-6 py-3 bg-surface-sunken hover:bg-surface-base text-text-secondary font-onest font-medium text-sm rounded-2xl border border-border-subtle transition-all duration-300 min-h-[44px]"
                >
                  {t("backToCatalog")}
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
