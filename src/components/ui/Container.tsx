import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow";
}

export default function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        size === "narrow" && "max-w-4xl",
        className
      )}
    >
      {children}
    </div>
  );
}
