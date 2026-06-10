import HeroBackground from "./HeroBackground";
import FloatingCards from "./FloatingCards";
import CTAButton from "./CTAButton";

export default function Hero() {
  return (
    <div className="relative min-h-screen bg-[#FBFBFB] overflow-hidden">
      <HeroBackground />

      {/* Floating glass cards */}
      <div className="relative z-10 container mx-auto px-4 h-screen flex flex-col justify-center">
        <FloatingCards />

        {/* Center content */}
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-onest mb-6 leading-tight tracking-tighter"
            style={{ letterSpacing: "-0.02em" }}
          >
            <span className="font-extrabold text-[#1A1A1A]">
              Интеллект природы
            </span>{" "}
            <span className="font-light text-zinc-500">
              для вашего долголетия
            </span>
          </h1>

          {/* CTA Button */}
          <CTAButton>Начать трансформацию</CTAButton>
        </div>
      </div>

      {/* Bottom statistics panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/15 backdrop-blur-sm py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-8 text-white">
            <div className="text-center">
              <div className="text-sm font-bold tracking-widest uppercase">
                10 000+
              </div>
              <div className="text-xs opacity-70 tracking-wider">клиентов</div>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="text-center">
              <div className="text-sm font-bold tracking-widest uppercase">
                50+
              </div>
              <div className="text-xs opacity-70 tracking-wider">стран</div>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="text-center">
              <div className="text-sm font-bold tracking-widest uppercase">
                15 лет
              </div>
              <div className="text-xs opacity-70 tracking-wider">опыта</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
