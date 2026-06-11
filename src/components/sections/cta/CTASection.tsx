import { memo } from "react";
import { ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";

const CTASection = memo(function CTASection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-surface-alt" style={{ contentVisibility: "auto", containIntrinsicSize: "0 300px" }}>
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="relative rounded-2xl bg-gradient-to-br from-accent-900 to-accent-800 p-8 md:p-14 text-center overflow-hidden">
            {/* Decorative orbs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 hidden md:block" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 hidden md:block" />

            <div className="relative z-10">
              <h2 className="font-unbounded font-bold text-xl sm:text-2xl md:text-3xl text-text-inverse mb-3 md:mb-4 leading-[1.2]">
                Готовы начать?
              </h2>
              <p className="text-sm md:text-base text-text-inverse/60 font-onest font-light max-w-md mx-auto mb-6 md:mb-8">
                Получите консультацию по продукции и бизнесу. Присоединяйтесь к M-International сегодня.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="#contacts"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-accent-500 hover:bg-accent-400 text-text-inverse font-unbounded font-bold text-sm rounded-xl transition-colors duration-300 group will-change-transform"
                >
                  Связаться
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-text-inverse/10 hover:bg-text-inverse/15 text-text-inverse font-unbounded font-bold text-sm rounded-xl border border-text-inverse/10 transition-colors duration-300"
                >
                  Каталог
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
});

export default CTASection;
