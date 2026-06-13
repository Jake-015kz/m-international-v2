import { cn } from "@/lib/utils"

function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-xl border border-border/60 bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  )
}

function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      data-slot="card-title"
      className={cn("font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
}

function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-content"
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
}

function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
}

/* ── Luxury Card — warm border, subtle hover, gold accent ── */
function CardLuxury({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-luxury"
      className={cn(
        "rounded-2xl border border-[var(--border-warm)] bg-card text-card-foreground",
        "transition-all duration-300",
        "hover:border-[var(--border-warm-hover)] hover:shadow-[var(--shadow-float)]",
        className
      )}
      {...props}
    />
  )
}

/* ── Glass Card — frosted glass effect ── */
function CardGlass({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-glass"
      className={cn(
        "rounded-xl border border-border/40 bg-card/60 backdrop-blur-xl text-card-foreground",
        "shadow-sm",
        className
      )}
      {...props}
    />
  )
}

/* ── Gradient Border Card — Awwwards style ── */
function CardGradient({
  className,
  variant = "accent",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: "accent" | "gold" | "subtle" }) {
  return (
    <div
      data-slot="card-gradient"
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-card/80 backdrop-blur-xl text-card-foreground",
        variant === "accent" && "[--gb-color:oklch(50%_0.14_195_/_0.3)]",
        variant === "gold" && "[--gb-color:oklch(65%_0.18_85_/_0.25)]",
        variant === "subtle" && "[--gb-color:oklch(50%_0.14_195_/_0.12)]",
        className
      )}
      style={{
        background: "linear-gradient(var(--background), var(--background)) padding-box, linear-gradient(135deg, var(--gb-color), transparent 60%) border-box",
        border: "1px solid transparent",
      }}
      {...props}
    />
  )
}

/* ── Stats Card — centered, bold number ── */
function CardStat({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="card-stat"
      className={cn(
        "text-center p-4 md:p-6 rounded-2xl bg-card border border-border-subtle",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        className
      )}
      {...props}
    />
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardLuxury, CardGlass, CardGradient, CardStat }
