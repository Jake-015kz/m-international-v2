import { type ReactNode, memo } from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: ReactNode;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

const SectionHeader = memo(function SectionHeader({
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
          "font-unbounded font-bold text-xl sm:text-2xl md:text-3xl leading-[1.1] tracking-normal text-text-primary",
          "mb-2 md:mb-3"
        )}
      >
        {title}
      </h2>

      {description && (
        <p className={cn(
          "text-sm md:text-base text-text-secondary font-onest font-light leading-relaxed max-w-md",
          align === "center" && "mx-auto",
          align === "left" && "ml-0"
        )}>
          {description}
        </p>
      )}
    </div>
  );
});

export default SectionHeader;
