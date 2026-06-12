import { type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "gradient" | "glow";
  label?: string;
}

const Divider = memo(function Divider({
  className,
  orientation = "horizontal",
  variant = "solid",
  label,
  ...props
}: DividerProps) {
  const isHorizontal = orientation === "horizontal";

  // With label — always horizontal
  if (label) {
    return (
      <div
        className={cn("flex items-center gap-4 w-full", className)}
        role="separator"
        aria-label={label}
      >
        <div
          className={cn(
            "flex-1 h-px",
            variant === "gradient" && "bg-gradient-to-r from-transparent via-border-default to-transparent",
            variant === "glow" && "bg-gradient-to-r from-transparent via-accent-500/30 to-transparent",
            variant === "solid" && "bg-border-subtle"
          )}
        />
        <span className="text-xs text-fg-tertiary font-medium whitespace-nowrap">
          {label}
        </span>
        <div
          className={cn(
            "flex-1 h-px",
            variant === "gradient" && "bg-gradient-to-r from-transparent via-border-default to-transparent",
            variant === "glow" && "bg-gradient-to-r from-transparent via-accent-500/30 to-transparent",
            variant === "solid" && "bg-border-subtle"
          )}
        />
      </div>
    );
  }

  return (
    <hr
      className={cn(
        "border-none",
        isHorizontal
          ? cn("w-full h-px", className)
          : cn("h-full w-px", className),
        variant === "gradient" && isHorizontal &&
          "bg-gradient-to-r from-transparent via-border-default to-transparent",
        variant === "gradient" && !isHorizontal &&
          "bg-gradient-to-b from-transparent via-border-default to-transparent",
        variant === "glow" && isHorizontal &&
          "bg-gradient-to-r from-transparent via-accent-500/30 to-transparent",
        variant === "glow" && !isHorizontal &&
          "bg-gradient-to-b from-transparent via-accent-500/30 to-transparent",
        variant === "solid" && "bg-border-subtle"
      )}
      role="separator"
      {...props}
    />
  );
});

export default Divider;
