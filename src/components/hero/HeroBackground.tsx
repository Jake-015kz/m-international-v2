import Image from "next/image";

export default function HeroBackground() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/media/hero-bg.png"
        alt="Горы на фоне"
        fill
        className="object-cover opacity-40 blur-[1px]"
        priority
      />
      {/* Radial white glow behind center text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-96 h-96 bg-white/30 rounded-full blur-3xl" />
      </div>
      {/* Noise overlay */}
      <div className="absolute inset-0 noise-overlay" />
    </div>
  );
}
