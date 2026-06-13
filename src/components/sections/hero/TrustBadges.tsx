"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";

/* ── Badge data ── */
const BADGES = [
  { key: "gmp", icon: "shield" },
  { key: "iso", icon: "badge" },
  { key: "halal", icon: "leaf" },
] as const;

/* ── Inline SVG icons (16×16, 1.5px stroke) ── */
function BadgeIcon({ icon }: { icon: string }) {
  const svgs: Record<string, React.ReactNode> = {
    shield: (
      <svg
        className="w-4 h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    badge: (
      <svg
        className="w-4 h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="7" />
        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
      </svg>
    ),
    leaf: (
      <svg
        className="w-4 h-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  };
  return <>{svgs[icon]}</>;
}

/* ── TrustBadges — minimalist capsule row ── */
const TrustBadges = memo(function TrustBadges() {
  const t = useTranslations("hero");

  return (
    <div
      className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 flex-wrap"
      role="list"
      aria-label="Certifications"
    >
      {BADGES.map((badge) => (
        <div
          key={badge.key}
          role="listitem"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.07] border border-white/[0.12] backdrop-blur-sm"
        >
          <span className="text-white/60 flex items-center" aria-hidden="true">
            <BadgeIcon icon={badge.icon} />
          </span>
          <span className="text-[11px] sm:text-xs text-white/80 font-space-grotesk font-medium tracking-wide whitespace-nowrap leading-none">
            {t(`trust.${badge.key}`)}
          </span>
        </div>
      ))}

      {/* Separator — hidden on mobile */}
      <div className="w-px h-4 bg-white/15 hidden sm:block shrink-0" aria-hidden="true" />

      {/* Countries stat */}
      <span className="text-[11px] sm:text-xs text-white/70 font-space-grotesk whitespace-nowrap leading-none">
        <strong className="text-white/90 font-semibold">50+</strong>{" "}
        {t("stat.countries")}
      </span>
    </div>
  );
});

export default TrustBadges;
