import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: ReactNode;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

export default function SectionHeader({
  badge,
  title,
  description,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        align === "center" && "text-center",
        align === "left" && "text-left",
        className
      )}
    >
      {badge && <div className="mb-4 md:mb-6">{badge}</div>}

      <h2
        className={cn(
          "font-unbounded font-bold text-xl sm:text-2xl md:text-3xl leading-[1.1] tracking-normal text-[#1A1A1A]",
          "mb-2 md:mb-3"
        )}
      >
        {title}
      </h2>

      {description && (
        <p className="text-sm md:text-base text-zinc-500 font-onest font-light leading-relaxed max-w-md mx-auto">
          {description}
        </p>
      )}

      <div className="mt-4 mx-auto h-px w-12 rounded-full bg-gradient-to-r from-transparent via-zinc-300 to-transparent" />
    </div>
  );
}
