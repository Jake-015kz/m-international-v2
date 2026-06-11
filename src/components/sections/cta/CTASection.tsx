import { ArrowRight, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";

export default function CTASection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#F7F7F7]">
      <BackgroundDecorations variant="section" accentColor="#10b981" />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="relative rounded-2xl bg-gradient-to-br from-[#1a2e1a] to-[#0d1f0d] p-8 md:p-14 text-center overflow-hidden">
            {/* Decorative orbs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10">
              <h2 className="font-unbounded font-bold text-xl sm:text-2xl md:text-3xl text-white mb-3 md:mb-4 leading-[1.2]">
                Готовы начать?
              </h2>
              <p className="text-sm md:text-base text-white/60 font-onest font-light max-w-md mx-auto mb-6 md:mb-8">
                Получите консультацию по продукции и бизнесу. Присоединяйтесь к M-International сегодня.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <a
                  href="#contacts"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-emerald-500 hover:bg-emerald-400 text-white font-unbounded font-bold text-sm rounded-xl transition-colors duration-300 group"
                >
                  Связаться
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#products"
                  className="inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-white/10 hover:bg-white/15 text-white font-unbounded font-bold text-sm rounded-xl border border-white/10 transition-colors duration-300"
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
}
