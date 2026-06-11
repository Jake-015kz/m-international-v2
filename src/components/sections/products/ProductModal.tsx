"use client";

import { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { X, Leaf, Shield, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

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

  if (!isOpen || !product) return null;

  const modalContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`Подробнее о ${product.name}`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-elevated border border-border-subtle shadow-2xl animate-modal-in">
        {/* Header with image — taller, with solid overlay for controls */}
        <div
          className="relative h-56 sm:h-64 overflow-hidden rounded-t-2xl"
          style={{
            background: `linear-gradient(135deg, ${product.color}18 0%, ${product.color}30 50%, ${product.color}18 100%)`,
          }}
        >
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
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
            </div>
          )}

          {/* Solid gradient overlay at top for close button visibility */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />

          {/* Close button — always visible on dark overlay */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 min-h-[44px] min-w-[44px]"
            aria-label="Закрыть"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          {/* Subtitle badge — bottom left with solid bg */}
          <div className="absolute bottom-3 left-4">
            <span
              className="inline-block px-3 py-1.5 rounded-full text-xs font-unbounded font-bold text-white shadow-lg"
              style={{ background: `${product.color}dd` }}
            >
              {product.subtitle}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          <h2 className="font-unbounded font-bold text-xl sm:text-2xl text-text-primary mb-3 leading-[1.2]">
            {product.name}
          </h2>

          <p className="text-sm text-text-secondary font-onest font-light leading-relaxed mb-5">
            {product.description}
          </p>

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="mb-5">
              <h3 className="font-unbounded font-bold text-xs uppercase tracking-wider text-text-tertiary mb-3">
                {t("specifications")}
              </h3>
              <div className="space-y-2">
                {product.benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: product.color }} />
                    <span className="text-sm text-text-secondary font-onest font-light">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Composition */}
          {product.composition && (
            <div className="mb-5 p-3 rounded-xl bg-surface-sunken border border-border-subtle">
              <h3 className="font-unbounded font-bold text-xs uppercase tracking-wider text-text-tertiary mb-1.5">
                {t("certificates")}
              </h3>
              <p className="text-xs text-text-secondary font-onest font-light leading-relaxed">
                {product.composition}
              </p>
            </div>
          )}

          {/* Trust badges */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-1.5 text-text-tertiary">
              <Shield className="w-3.5 h-3.5" />
              <span className="text-[10px] font-onest uppercase tracking-wider">GMP · ISO · Halal</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
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
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
