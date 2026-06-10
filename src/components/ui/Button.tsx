"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-300 cursor-pointer",
          // Touch target: minimum 44x44px on mobile
          "min-h-[44px]",
          variant === "primary" && "bg-black text-white hover:shadow-lg hover:shadow-black/30 active:scale-[0.98]",
          variant === "secondary" && "bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20",
          variant === "ghost" && "bg-transparent hover:bg-white/5",
          size === "sm" && "px-4 py-2 text-sm rounded-full",
          size === "md" && "px-8 py-3 text-base rounded-full",
          size === "lg" && "px-6 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
