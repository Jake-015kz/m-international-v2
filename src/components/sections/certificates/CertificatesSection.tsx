"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Shield, BadgeCheck } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";

/* ── Real certificates from old site ── */
const CERTIFICATES = [
  { id: "halal-micrystal", name: "HALAL MiCrystal", description: "Сертификат Халал — MiCrystal 2025", image: "/images/certificates/certificate-halal-micrystal-2025.webp", color: "#c4a035" },
  { id: "halal-greenmax", name: "HALAL GreenMAX", description: "Сертификат Халал — GreenMAX 2025", image: "/images/certificates/certificate-halal-greenmax-2025.webp", color: "#5eb53a" },
  { id: "halal-mitown", name: "HALAL MiTown", description: "Сертификат Халал — MiTown 2025", image: "/images/certificates/certificate-halal-mitown-2025.webp", color: "#4a90d9" },
  { id: "halal-macho", name: "HALAL Macho Flexi", description: "Сертификат Халал — Macho Flexi 2025", image: "/images/certificates/certificate-halal-macho-flexi-2025.webp", color: "#d44a2a" },
  { id: "ajl-license", name: "AJL License", description: "Лицензия AJL 2025-2030", image: "/images/certificates/ajl-license-2025-2030.webp", color: "#6ab04a" },
  { id: "halal-mm-bm-nm", name: "HALAL MM-BM-NM", description: "Сертификат Халал — MM-BM-NM 2026", image: "/images/certificates/certificate-halal-mm-bm-nm-2026.webp", color: "#2a7aaa" },
];

/* ── Marquee Row ── */
function MarqueeRow({ items, direction = "left", duration = 35 }: { items: typeof CERTIFICATES; direction?: "left" | "right"; duration?: number }) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-1">
      <div
        className={`flex gap-3 md:gap-4 w-max ${direction === "right" ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {doubled.map((cert, i) => (
          <div
            key={`${cert.id}-${i}`}
            className="flex-shrink-0 flex items-center gap-1.5 sm:gap-2.5 md:gap-3 px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2.5 md:py-3 rounded-full border border-border-subtle bg-surface-elevated/60 backdrop-blur-sm transition-all duration-300 hover:border-border-default hover:shadow-sm group cursor-default"
          >
            <div className="relative w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 flex-shrink-0">
              <Image
                src={cert.image}
                alt={cert.name}
                width={36}
                height={36}
                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="font-unbounded font-bold text-[8px] sm:text-[10px] md:text-xs whitespace-nowrap text-text-primary truncate">
                {cert.name}
              </span>
              <span className="text-[7px] sm:text-[8px] md:text-[9px] uppercase tracking-wider text-text-tertiary hidden md:block truncate">
                {cert.description}
              </span>
            </div>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300" style={{ background: cert.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}

const CertificatesSection = memo(function CertificatesSection() {
  const t = useTranslations("certificates");
  const mid = Math.ceil(CERTIFICATES.length / 2);
  const row1 = CERTIFICATES.slice(0, mid);
  const row2 = CERTIFICATES.slice(mid);

  return (
    <section id="certificates" className="relative py-12 md:py-24 overflow-hidden bg-surface-base">
      <BackgroundDecorations variant="section" />

      {/* Side fades for marquee */}
      <div className="absolute top-0 left-0 bottom-0 w-4 md:w-24 bg-gradient-to-r from-surface-base to-transparent z-[5] pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 bottom-0 w-4 md:w-24 bg-gradient-to-l from-surface-base to-transparent z-[5] pointer-events-none" aria-hidden="true" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            badge={
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-100">
                <Shield className="w-3.5 h-3.5 text-accent-600" aria-hidden="true" />
                <span className="text-xs font-unbounded font-bold text-accent-600 uppercase tracking-wider">{t("certified")}</span>
              </div>
            }
            title={t("title")}
            description={t("description")}
          />
        </ScrollReveal>

        {/* Marquee rows with real certificate images */}
        <div className="mt-6 md:mt-12 space-y-2 md:space-y-4 overflow-hidden" aria-hidden="true">
          <MarqueeRow items={row1} direction="left" duration={35} />
          {row2.length > 0 && (
            <MarqueeRow items={row2} direction="right" duration={40} />
          )}
        </div>

        {/* Bottom trust line */}
        <ScrollReveal delay={0.3}>
          <div className="mt-6 md:mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-text-tertiary">
              <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
              <p className="text-[9px] md:text-[10px] uppercase tracking-wider font-onest">
                Проверенное качество · Безопасность · Эффективность
              </p>
              <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
});

export default CertificatesSection;
