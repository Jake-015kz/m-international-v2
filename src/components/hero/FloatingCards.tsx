export default function FloatingCards() {
  return (
    <>
      {/* Left card - Video preview (slightly above center) */}
      <div className="absolute left-8 top-2/3 -translate-y-1/2 max-w-xs">
        <div className="rounded-[3rem] bg-white/40 backdrop-blur-3xl border border-white/20 shadow-2xl p-6">
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-black/10 mb-4">
            <video
              src="/media/hero-bg.mp4"
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/media/hero-bg.png"
            />
            {/* Play button */}
            <button className="absolute inset-0 m-auto w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5 text-black ml-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.7l10.7 7.3-10.7 7.3V2.7z" />
              </svg>
            </button>
          </div>
          <p className="text-center text-sm font-light text-zinc-600">
            AI-формулы работают на ваше здоровье
          </p>
        </div>
      </div>

      {/* Right top card - Stable result (floating in upper right) */}
      <div className="absolute right-8 top-1/4 -translate-y-1/2">
        <div className="rounded-[3rem] bg-white/40 backdrop-blur-3xl border border-white/20 shadow-2xl p-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
            <svg
              className="w-5 h-5 text-green-600"
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
          <span className="text-sm font-medium text-zinc-800">
            Стабильный результат
          </span>
        </div>
      </div>

      {/* Right bottom card - Service quality with avatars (speech bubble) */}
      <div className="absolute right-8 bottom-1/4 translate-y-1/2">
        <div className="relative rounded-[3rem] bg-white/40 backdrop-blur-3xl border border-white/20 shadow-2xl p-5 flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-zinc-300 border-2 border-white" />
            <div className="w-8 h-8 rounded-full bg-zinc-400 border-2 border-white" />
            <div className="w-8 h-8 rounded-full bg-zinc-500 border-2 border-white" />
            <div className="w-8 h-8 rounded-full bg-zinc-600 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
              +50
            </div>
          </div>
          <span className="text-sm font-medium text-zinc-800">
            Высокое качество сервиса
          </span>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 right-12 w-4 h-4 bg-white/40 border-b border-r border-white/20 rotate-45" />
        </div>
      </div>
    </>
  );
}
