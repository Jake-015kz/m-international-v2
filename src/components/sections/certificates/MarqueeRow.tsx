import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeRowProps {
  items: { id: string; icon: ReactNode; label: string }[];
  direction?: "left" | "right";
  duration?: number;
  className?: string;
}

export default function MarqueeRow({
  items,
  direction = "left",
  duration = 30,
  className,
}: MarqueeRowProps) {
  const doubled = [...items, ...items];

  return (
    <div className={cn("overflow-hidden py-1", className)}>
      <div
        className={cn(
          "flex gap-3 md:gap-4 w-max",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        )}
        style={
          {
            "--marquee-duration": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.id}-${i}`}
            className="flex-shrink-0 flex items-center gap-2.5 md:gap-3 px-4 md:px-5 py-2.5 md:py-3 rounded-full border border-black/5 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:border-emerald-500/25 hover:shadow-sm group cursor-default"
          >
            <div className="text-emerald-600 group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <span className="text-[10px] md:text-xs font-medium text-zinc-700 whitespace-nowrap font-onest">
              {item.label}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
