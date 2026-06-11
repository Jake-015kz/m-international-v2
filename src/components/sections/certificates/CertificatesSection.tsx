import { Shield, Award, Leaf, BadgeCheck, FlaskConical, Heart, Globe, Sprout } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";
import MarqueeRow from "./MarqueeRow";

const CERTIFICATES_ROW_1 = [
  { id: "gmp", icon: <Shield className="w-4 h-4 md:w-5 md:h-5" />, label: "GMP — Надлежащая производственная практика" },
  { id: "iso", icon: <Award className="w-4 h-4 md:w-5 md:h-5" />, label: "ISO 9001:2015" },
  { id: "halal", icon: <BadgeCheck className="w-4 h-4 md:w-5 md:h-5" />, label: "Сертификат Халал" },
  { id: "fda", icon: <FlaskConical className="w-4 h-4 md:w-5 md:h-5" />, label: "Одобрение FDA" },
  { id: "mesti", icon: <Award className="w-4 h-4 md:w-5 md:h-5" />, label: "Малайзийский стандарт MESTI" },
];

const CERTIFICATES_ROW_2 = [
  { id: "natural", icon: <Leaf className="w-4 h-4 md:w-5 md:h-5" />, label: "100% натуральные ингредиенты" },
  { id: "eac", icon: <Shield className="w-4 h-4 md:w-5 md:h-5" />, label: "Евразийское соответствие (EAC)" },
  { id: "vegan", icon: <Heart className="w-4 h-4 md:w-5 md:h-5" />, label: "Vegan Certified" },
  { id: "organic", icon: <Sprout className="w-4 h-4 md:w-5 md:h-5" />, label: "Organic Certified" },
  { id: "global", icon: <Globe className="w-4 h-4 md:w-5 md:h-5" />, label: "50+ стран мира" },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" className="relative py-16 md:py-24 overflow-hidden bg-surface-base">
      <BackgroundDecorations variant="section" />

      {/* Side fades for marquee */}
      <div className="absolute top-0 left-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-surface-base to-transparent z-[5] pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-surface-base to-transparent z-[5] pointer-events-none" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            title="Международные сертификаты"
            description="Продукция M-International сертифицирована по мировым стандартам"
          />
        </ScrollReveal>

        <div className="mt-8 md:mt-12 space-y-3 md:space-y-4">
          <ScrollReveal delay={0.1}>
            <MarqueeRow items={CERTIFICATES_ROW_1} direction="left" duration={35} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <MarqueeRow items={CERTIFICATES_ROW_2} direction="right" duration={40} />
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 md:mt-12 text-center">
            <div className="inline-flex items-center gap-2 text-text-tertiary">
              <BadgeCheck className="w-3.5 h-3.5" />
              <p className="text-[9px] md:text-[10px] uppercase tracking-wider font-onest">
                Проверенное качество · Безопасность · Эффективность
              </p>
              <BadgeCheck className="w-3.5 h-3.5" />
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
