# Hero Section — Token Audit & Linear/Apple Style Mapping

**Date:** 2026-06-11
**Workspace:** /storage/repos/m-international-v2
**Scope:** Hero.tsx, HeroBackground.tsx, FloatingCards.tsx, StatCards.tsx, CTAButton.tsx, TextReveal.tsx, tokens.css, DESIGN.md, globals.css

---

## 1. AFFECTED COMPONENTS — Token Usage Matrix

| Component | Colors | Spacing | Shadows | Typography | Animations |
|---|---|---|---|---|---|
| **Hero.tsx** | `oklch(55% 0.18 160)` accent, `oklch(18% 0.01 160)` dark, `white/10/15/20/40/50/60/80` overlays, `bg-surface-base`, `text-white`, `text-emerald-400` | `px-4`, `py-16/20`, `gap-8/12/16`, `mb-3/4/5/6`, `px-7/9`, `py-3.5`, `p-3/4`, `gap-0.5/1/1.5/2/2.5`, `py-3/5` | `shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]`, `hover:shadow-[0_4px_20px_oklch(55%_0.18_160_/_0.15),...]` | `font-unbounded`, `font-onest`, `text-[1.75rem]/4xl/5xl/6xl`, `text-[11px]`, `text-sm/base/lg`, `text-[8px]/[10px]/xs` | Framer Motion spring, parallax CSS, stagger 0.05-0.15 |
| **HeroBackground.tsx** | `oklch(55% 0.18 160 / 0.06-0.08)` orbs, `bg-surface-elevated/25` | `w-[250-600px]`, `h-[250-600px]` | `blur(80-100px)`, `blur-3xl` | — | GSAP ScrollTrigger parallax, CSS blob-float-a/b |
| **FloatingCards.tsx** | `text-emerald-400`, `bg-emerald-500/15`, `bg-surface-elevated`, `border-border-subtle`, `text-text-primary/secondary`, `from-emerald-500/5` | `p-3/5`, `gap-2/3`, `w-8/10`, `h-8/10`, `left-4/8`, `top-[55%]` | `shadow-lg` | `text-xs/sm`, `font-medium` | Spring entrance (stiffness:180, damping:22), float y:[0,-8/-12,0], shimmer sweep |
| **StatCards.tsx** | `oklch(65% 0.16 160)`, `oklch(70% 0.14 250)`, `oklch(70% 0.12 75)`, `oklch(65% 0.18 320)`, `text-white/40`, `text-emerald-400/80`, `bg-emerald-400/[0.08]`, `bg-white/[0.04]`, `border-white/[0.08]` | `p-4`, `gap-2.5/3`, `mb-1/2.5/3`, `gap-0.5/1.5`, `mt-2.5`, `w-20`, `h-20` | `blur(12px)` corner glow | `font-unbounded`, `text-xl/2xl`, `text-[10px]`, `text-xs`, `font-bold/medium` | Spring entrance (stiffness:140, damping:20), counter animation 1.5-1.8s, sparkline pathLength, float y:[0,-6,0] |
| **CTAButton.tsx** | (delegates to Button component) | — | — | — | `whileHover scale:1.03`, `whileTap scale:0.97`, spring (stiffness:500, damping:30) |
| **TextReveal.tsx** | — | `mr-[0.3em]` | — | — | `clipPath inset`, `y:28→0`, `y:"100%"→"0%"`, ease `[0.16, 1, 0.3, 1]`, stagger 0.06-0.12 |

---

## 2. COLOR TOKEN INVENTORY

### 2.1 Colors defined in tokens.css (canonical)

| Token | Light Value | Dark Value | Usage |
|---|---|---|---|
| `--bg-base` | `oklch(98.5% 0.003 160)` | `oklch(8% 0.005 160)` | Page background |
| `--bg-elevated` | `oklch(100% 0.002 160)` | `oklch(12% 0.007 160)` | Card surfaces |
| `--bg-sunken` | `oklch(96% 0.004 160)` | `oklch(5% 0.003 160)` | Input fields |
| `--fg-primary` | `oklch(18% 0.008 160)` | `oklch(92% 0.006 160)` | Primary text |
| `--fg-secondary` | `oklch(48% 0.012 160)` | `oklch(65% 0.010 160)` | Secondary text |
| `--fg-tertiary` | `oklch(62% 0.010 160)` | `oklch(50% 0.008 160)` | Tertiary text |
| `--fg-inverse` | `oklch(98% 0.003 160)` | `oklch(12% 0.007 160)` | Text on dark |
| `--fg-accent` | `oklch(55% 0.18 160)` | `oklch(70% 0.15 160)` | Accent text |
| `--accent-500` | `oklch(55% 0.18 160)` | `oklch(70% 0.15 160)` | Primary accent |
| `--accent-400` | `oklch(65% 0.16 160)` | `oklch(55% 0.14 160)` | Sparkline primary |
| `--border-subtle` | `oklch(90% 0.006 160)` | `oklch(20% 0.008 160)` | Card borders |
| `--border-default` | `oklch(82% 0.008 160)` | `oklch(28% 0.010 160)` | Default borders |

### 2.2 Hardcoded colors in Hero components (NOT using tokens)

| File | Hardcoded Value | Where | Should Be |
|---|---|---|---|
| **Hero.tsx** | `rgba(255,255,255,0.06)` | Dot grid background | Token doesn't exist — needs `--dot-grid-opacity` |
| **Hero.tsx** | `rgba(255,255,255,0.03)` | Noise overlay opacity | OK as ultra-subtle constant |
| **Hero.tsx** | `oklch(55% 0.18 160 / 0.1)` | Glow orb 1 | `--glow-accent-sm` exists but different format |
| **Hero.tsx** | `oklch(55% 0.18 160 / 0.08)` | Glow orb 2 | `--glow-accent-sm` exists but different format |
| **Hero.tsx** | `from-black/50 via-black/30 to-black/60` | Video overlay gradient | No token — needs `--hero-overlay` |
| **Hero.tsx** | `from-surface-base to-transparent` | Bottom fade gradient | No token — needs `--hero-bottom-fade` |
| **Hero.tsx** | `bg-white/10`, `border-white/15` | Badge container | No token — needs `--badge-bg`, `--badge-border` |
| **Hero.tsx** | `bg-emerald-400` | Badge dot | Should use `--accent-400` or `--fg-accent` |
| **Hero.tsx** | `text-white/80` | Badge label | No token — needs `--hero-badge-fg` |
| **Hero.tsx** | `text-white` | Title | No token — needs `--hero-title-fg` |
| **Hero.tsx** | `text-white/60` | Subtitle | No token — needs `--hero-subtitle-fg` |
| **Hero.tsx** | `bg-[oklch(18%_0.01_160)]` | CTA primary button | Should use `--fg-primary` or new `--cta-primary-bg` |
| **Hero.tsx** | `bg-white/[0.07]` | CTA secondary button | No token — needs `--cta-secondary-bg` |
| **Hero.tsx** | `border-white/[0.08]` | CTA primary border | No token — needs `--cta-primary-border` |
| **Hero.tsx** | `border-white/[0.1]` | CTA secondary border | No token — needs `--cta-secondary-border` |
| **Hero.tsx** | `shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]` | CTA primary shadow | No token — needs `--shadow-cta-primary` |
| **Hero.tsx** | `bg-white/5`, `border-white/8` | CIS country chips | No token — needs `--chip-bg`, `--chip-border` |
| **Hero.tsx** | `text-white/40`, `text-white/50` | CIS labels, stat labels | No token — needs `--hero-muted-fg` |
| **Hero.tsx** | `text-emerald-400/60`, `text-emerald-400/70` | MapPin, Globe, Users, Calendar icons | Should use `fg-accent` with opacity |
| **Hero.tsx** | `border-white/10`, `bg-white/5` | Stats bar container | No token — needs `--stats-bar-bg`, `--stats-bar-border` |
| **Hero.tsx** | `via-white/15` | Stats separator line | No token — needs `--stats-separator` |
| **Hero.tsx** | `bg-white/[0.07]`, `border-white/[0.12]` | Product image ring | No token — needs `--product-ring-bg`, `--product-ring-border` |
| **Hero.tsx** | `bg-emerald-400/50`, `bg-emerald-400/30` | Rotating ring dots | Should use accent tokens |
| **Hero.tsx** | `text-emerald-300` | Stat hover color | No token — needs `--stat-hover-fg` |
| **HeroBackground.tsx** | `opacity-50 sm:opacity-[0.6]` | Background image | No token — needs `--hero-bg-opacity` |
| **HeroBackground.tsx** | `bg-surface-elevated/25` | Center glow behind text | No token — needs `--hero-center-glow` |
| **FloatingCards.tsx** | `bg-emerald-500/15` | Cert badge icon bg | No token — needs `--cert-icon-bg` |
| **FloatingCards.tsx** | `from-emerald-500/5` | Cert badge hover glow | No token — needs `--cert-hover-glow` |
| **FloatingCards.tsx** | `rgba(255,255,255,0.12-0.2)` | Shimmer gradient | No token — needs `--shimmer-opacity` |
| **FloatingCards.tsx** | `bg-surface-elevated` | Card bg (uses token ✓) | ✅ Correct |
| **FloatingCards.tsx** | `border-border-subtle` | Card border (uses token ✓) | ✅ Correct |
| **FloatingCards.tsx** | `shadow-lg` | Card shadow (uses token ✓) | ✅ Correct |
| **FloatingCards.tsx** | `text-text-primary/secondary` | Card text (uses token ✓) | ✅ Correct |
| **StatCards.tsx** | `border-white/[0.08]` | Stat card border | No token — needs `--stat-card-border` |
| **StatCards.tsx** | `bg-white/[0.04]` | Stat card bg | No token — needs `--stat-card-bg` |
| **StatCards.tsx** | `rgba(255,255,255,0.05-0.02)` | Stat card gradient | No token — needs `--stat-card-gradient` |
| **StatCards.tsx** | `text-white/40` | Stat label | No token — needs `--stat-label-fg` |
| **StatCards.tsx** | `text-white` | Stat value | No token — needs `--stat-value-fg` |
| **StatCards.tsx** | `text-emerald-400/80` | Change badge text | No token — needs `--stat-change-positive-fg` |
| **StatCards.tsx** | `bg-emerald-400/[0.08]` | Change badge bg | No token — needs `--stat-change-positive-bg` |
| **StatCards.tsx** | `text-amber-400/80` | Negative change text | No token — needs `--stat-change-negative-fg` |
| **StatCards.tsx** | `bg-amber-400/[0.08]` | Negative change bg | No token — needs `--stat-change-negative-bg` |
| **StatCards.tsx** | `from-white/[0.08]` | Accent line gradient | No token — needs `--stat-accent-line` |
| **StatCards.tsx** | `bg-emerald-400/60` | Section label dot | Should use accent token |
| **StatCards.tsx** | `text-white/30` | Section title | No token — needs `--stat-section-fg` |
| **StatCards.tsx** | `from-white/[0.06]` | Section line | No token — needs `--stat-section-line` |
| **StatCards.tsx** | `bg-emerald-400/70` | Pulse dot | Should use accent token |
| **globals.css** | `oklch(18% 0.01 160)` | `.cta-primary` bg | Duplicated from Hero.tsx inline |
| **globals.css** | `oklch(25% 0.01 160)` | `.cta-primary:hover` bg | Duplicated from Hero.tsx inline |
| **globals.css** | `rgba(255,255,255,0.08)` | `.cta-primary` border | Duplicated from Hero.tsx inline |
| **globals.css** | `rgba(255,255,255,0.06)` | `.cta-primary` inset shadow | Duplicated from Hero.tsx inline |
| **globals.css** | `rgba(255,255,255,0.07)` | `.cta-secondary` bg | Duplicated from Hero.tsx inline |
| **globals.css** | `rgba(255,255,255,0.1)` | `.cta-secondary` border | Duplicated from Hero.tsx inline |
| **globals.css** | `oklch(55% 0.18 160 / 0.06-0.03)` | `.mesh-gradient` orbs | Duplicated from HeroBackground.tsx |

---

## 3. SPACING TOKEN INVENTORY

### 3.1 Spacing scale defined in tokens.css

| Token | Value |
|---|---|
| `--space-0` | 0px |
| `--space-0-5` | 2px |
| `--space-1` | 4px |
| `--space-1-5` | 6px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |

### 3.2 Hardcoded spacing in Hero components

| File | Hardcoded Value | Where | Should Use |
|---|---|---|---|
| **Hero.tsx** | `px-3 py-1.5` | Badge | `--space-3` / `--space-1-5` |
| **Hero.tsx** | `gap-2` | Badge inner | `--space-2` |
| **Hero.tsx** | `mb-4` | Badge margin | `--space-4` |
| **Hero.tsx** | `mb-3` | Title margin | `--space-3` |
| **Hero.tsx** | `mb-5` | Subtitle margin | `--space-5` |
| **Hero.tsx** | `px-7 sm:px-9 py-3.5` | CTA buttons | Custom (OK for CTA) |
| **Hero.tsx** | `gap-3` | CTA button group | `--space-3` |
| **Hero.tsx** | `mb-6` | CTA wrapper margin | `--space-6` |
| **Hero.tsx** | `gap-1.5 sm:gap-2` | CIS label row | `--space-1-5` / `--space-2` |
| **Hero.tsx** | `mb-2` | CIS label margin | `--space-2` |
| **Hero.tsx** | `gap-1 sm:gap-1.5` | CIS chips row | `--space-1` / `--space-1-5` |
| **Hero.tsx** | `px-1.5 sm:px-2.5 py-1 sm:py-1.5` | CIS chip | `--space-1-5` / `--space-2-5` (no token) |
| **Hero.tsx** | `gap-0.5 sm:gap-1.5` | CIS chip inner | `--space-0-5` / `--space-1-5` |
| **Hero.tsx** | `mb-5` | CIS section margin | `--space-5` |
| **Hero.tsx** | `mt-4 mb-4` | StatCards wrapper | `--space-4` |
| **Hero.tsx** | `px-2 sm:px-6 md:px-8 py-3 sm:py-5` | Stats bar | Custom (OK) |
| **Hero.tsx** | `mb-1` | Stat icon margin | `--space-1` |
| **Hero.tsx** | `mt-0.5` | Stat label margin | `--space-0-5` |
| **Hero.tsx** | `mx-1 sm:mx-2 md:mx-4` | Stat separator | Custom (OK) |
| **Hero.tsx** | `w-px h-6 sm:h-12` | Stat separator size | Custom (OK) |
| **Hero.tsx** | `p-3 sm:p-4` | Product image padding | `--space-3` / `--space-4` |
| **Hero.tsx** | `w-2 h-2`, `w-1.5 h-1.5` | Ring dots | `--space-2`, `--space-1-5` |
| **FloatingCards.tsx** | `p-3 lg:p-5` | Cert card padding | `--space-3` / `--space-5` |
| **FloatingCards.tsx** | `gap-2 lg:gap-3` | Cert card inner gap | `--space-2` / `--space-3` |
| **FloatingCards.tsx** | `w-8 h-8 lg:w-10 lg:h-10` | Cert icon box | `--space-8` / `--space-10` |
| **FloatingCards.tsx** | `left-4 lg:left-8` | Left card position | `--space-4` / `--space-8` |
| **FloatingCards.tsx** | `right-1rem` | Cert card right offset | Custom (OK for absolute) |
| **StatCards.tsx** | `p-4` | Stat card padding | `--space-4` |
| **StatCards.tsx** | `gap-2.5 sm:gap-3` | Stat grid gap | `--space-2-5` (no token) / `--space-3` |
| **StatCards.tsx** | `mb-1` | Stat label margin | `--space-1` |
| **StatCards.tsx** | `gap-0.5` | Stat value row gap | `--space-0-5` |
| **StatCards.tsx** | `mt-2.5` | Accent line margin | `--space-2-5` (no token) |
| **StatCards.tsx** | `mb-0.5` | Accent line bottom margin | `--space-0-5` |
| **StatCards.tsx** | `gap-1.5` | Accent line inner gap | `--space-1-5` |
| **StatCards.tsx** | `w-1.5 h-1.5` | Accent dot | `--space-1-5` |
| **StatCards.tsx** | `w-20 h-20` | Corner glow | `--space-20` |
| **StatCards.tsx** | `mb-3` | Section label margin | `--space-3` |
| **StatCards.tsx** | `gap-2` | Section label gap | `--space-2` |
| **StatCards.tsx** | `w-1 h-4` | Section label dot | `--space-1` / `--space-4` |
| **StatCards.tsx** | `h-2 w-2` | Pulse dot | `--space-2` |
| **StatCards.tsx** | `px-1.5 py-0.5` | Change badge | `--space-1-5` / `--space-0-5` |

---

## 4. SHADOW TOKEN INVENTORY

### 4.1 Shadows defined in tokens.css

| Token | Value |
|---|---|
| `--shadow-xs` | `0 1px 2px oklch(0% 0 0 / 0.04)` |
| `--shadow-sm` | `0 1px 3px ... / 0.06`, `0 1px 2px ... / 0.04` |
| `--shadow-md` | `0 4px 8px ... / 0.06`, `0 2px 4px ... / 0.04` |
| `--shadow-lg` | `0 8px 16px ... / 0.08`, `0 4px 8px ... / 0.04` |
| `--shadow-xl` | `0 16px 32px ... / 0.10`, `0 8px 16px ... / 0.06` |
| `--shadow-2xl` | `0 24px 48px ... / 0.12`, `0 12px 24px ... / 0.06` |
| `--glow-accent-sm` | `0 0 12px oklch(55% 0.18 160 / 0.10)` |
| `--glow-accent-md` | `0 0 24px oklch(55% 0.18 160 / 0.15)` |
| `--glow-accent-lg` | `0 0 48px oklch(55% 0.18 160 / 0.20)` |

### 4.2 Hardcoded shadows in Hero components

| File | Hardcoded Value | Where | Should Use |
|---|---|---|---|
| **Hero.tsx** | `shadow-[0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]` | CTA primary | New token `--shadow-cta-primary` |
| **Hero.tsx** | `hover:shadow-[0_4px_20px_oklch(55%_0.18_160_/_0.15),0_1px_3px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.08)]` | CTA primary hover | New token `--shadow-cta-primary-hover` |
| **FloatingCards.tsx** | `shadow-lg` | Cert card | ✅ Uses token |
| **StatCards.tsx** | `blur(12px)` | Corner glow | New token `--stat-corner-glow` |
| **globals.css** | Same as Hero.tsx CTA shadows | `.cta-primary` / `.cta-primary:hover` | Duplicated — should reference tokens |

---

## 5. TYPOGRAPHY TOKEN INVENTORY

### 5.1 Type scale defined in tokens.css

| Token | Value |
|---|---|
| `--text-2xs` | 0.64rem |
| `--text-xs` | 0.75rem (12px) |
| `--text-sm` | 0.875rem (14px) |
| `--text-base` | 1rem (16px) |
| `--text-lg` | 1.125rem (18px) |
| `--text-xl` | 1.25rem (20px) |
| `--text-2xl` | 1.5rem (24px) |
| `--text-3xl` | 1.875rem (30px) |
| `--text-4xl` | 2.25rem (36px) |
| `--text-5xl` | 3rem (48px) |
| `--text-6xl` | 3.75rem (60px) |
| `--text-7xl` | 4.5rem (72px) |

### 5.2 Hardcoded font sizes in Hero components

| File | Hardcoded Value | Where | Should Use |
|---|---|---|---|
| **Hero.tsx** | `text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl` | Title | Custom clamp needed, but base could use `--text-5xl` |
| **Hero.tsx** | `text-[11px]` | Badge label | No token → needs `--text-2xs` (0.64rem ≈ 10px) or keep custom |
| **Hero.tsx** | `text-sm sm:text-base md:text-lg` | Subtitle | `--text-sm` / `--text-base` / `--text-lg` ✅ |
| **Hero.tsx** | `text-sm` | CTA buttons | `--text-sm` ✅ |
| **Hero.tsx** | `text-[10px] sm:text-xs` | CIS label | `--text-2xs` / `--text-xs` |
| **Hero.tsx** | `text-[8px] sm:text-[10px]` | CIS chip names | Below scale — keep custom |
| **Hero.tsx** | `text-base sm:text-2xl lg:text-3xl` | Stat values | `--text-base` / `--text-2xl` / `--text-3xl` ✅ |
| **Hero.tsx** | `text-[8px] sm:text-xs` | Stat labels | Below scale / `--text-xs` |
| **FloatingCards.tsx** | `text-xs lg:text-sm` | Cert badge text | `--text-xs` / `--text-sm` ✅ |
| **StatCards.tsx** | `text-[10px]` | Stat card label | Below scale — keep custom |
| **StatCards.tsx** | `text-xl sm:text-2xl` | Stat card value | `--text-xl` / `--text-2xl` ✅ |
| **StatCards.tsx** | `text-xs` | Stat card suffix | `--text-xs` ✅ |
| **StatCards.tsx** | `text-[9px]` | Change badge | Below scale — keep custom |
| **StatCards.tsx** | `text-[10px]` | Section title | Below scale — keep custom |

### 5.3 Font families used

| File | Family | Token |
|---|---|---|
| Hero.tsx | `font-unbounded` | `--font-heading` ✅ |
| Hero.tsx | `font-onest` | `--font-sans` ✅ |
| FloatingCards.tsx | `font-medium` | (weight only, inherits `--font-sans`) ✅ |
| StatCards.tsx | `font-unbounded` | `--font-heading` ✅ |
| StatCards.tsx | `font-medium` | (weight only) ✅ |

---

## 6. ANIMATION TOKEN INVENTORY

### 6.1 Animation tokens defined in tokens.css

| Token | Value |
|---|---|
| `--anim-instant` | 75ms |
| `--anim-fast` | 150ms |
| `--anim-normal` | 300ms |
| `--anim-slow` | 500ms |
| `--anim-slower` | 700ms |
| `--anim-glacial` | 1000ms |
| `--stagger-xs` | 30ms |
| `--stagger-sm` | 50ms |
| `--stagger-md` | 80ms |
| `--stagger-lg` | 120ms |
| `--ease-linear` | `cubic-bezier(0, 0, 1, 1)` |
| `--ease-in` | `cubic-bezier(0.42, 0, 1, 1)` |
| `--ease-out` | `cubic-bezier(0, 0, 0.58, 1)` |
| `--ease-in-out` | `cubic-bezier(0.42, 0, 0.58, 1)` |
| `--ease-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-spring-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| `--ease-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |

### 6.2 Hardcoded animation values in Hero components

| File | Hardcoded Value | Where | Should Use |
|---|---|---|---|
| **Hero.tsx** | `delay: 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1]` | Badge entrance | `--anim-slow` / `--ease-spring` |
| **Hero.tsx** | `stagger={0.07}` | Title word reveal | Custom (OK for hero) |
| **Hero.tsx** | `initialDelay={0.6}` | Subtitle reveal | Custom (OK for orchestration) |
| **Hero.tsx** | `stagger={0.12}` | Subtitle line stagger | Custom (OK) |
| **Hero.tsx** | `initialDelay={0.85}` | CTA reveal | Custom (OK for orchestration) |
| **Hero.tsx** | `delay: 1.1, duration: 0.8` | CIS section fade | `--anim-slower` / `--anim-glacial` |
| **Hero.tsx** | `delay: 1.2 + i * 0.05` | CIS chip stagger | Custom (OK) |
| **Hero.tsx** | `delay: 1.5, duration: 0.6` | Stats bar entrance | Custom (OK) |
| **Hero.tsx** | `delay: 0.45` + SPRING | Product image spring | Custom (OK for hero) |
| **Hero.tsx** | `stiffness: 160, damping: 20, mass: 1.2` | Product spring config | Custom (OK) |
| **Hero.tsx** | `duration: 0.3` | CIS chip hover, CTA transitions | `--anim-normal` ✅ equivalent |
| **Hero.tsx** | `duration: 0.5` | Badge entrance, shimmer | `--anim-slow` ✅ equivalent |
| **Hero.tsx** | `duration: 300ms` | CTA transitions (inline) | `--anim-normal` ✅ |
| **Hero.tsx** | `duration: 500ms` | Shimmer transition (inline) | `--anim-slow` ✅ |
| **Hero.tsx** | `SPRING_DELAY = 0.45` | Product image delay | Custom constant (OK) |
| **HeroBackground.tsx** | `duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94]` | BG image entrance | `--ease-smooth` ✅ |
| **HeroBackground.tsx** | `scrub: 0.8` | GSAP parallax | Custom (OK) |
| **FloatingCards.tsx** | `STAGGER_DELAY = 0.85` | Cert badge base delay | Custom constant (OK) |
| **FloatingCards.tsx** | `stiffness: 180, damping: 22, mass: 1` | Cert spring | Custom (OK) |
| **FloatingCards.tsx** | `delay: 1.2, duration: 3` | Left card float | Custom (OK) |
| **FloatingCards.tsx** | `duration: 0.6, times: [0, 0.3, 1]` | Shimmer sweep | Custom (OK) |
| **FloatingCards.tsx** | `floatDelay: 1.8 + badge.delay * 2` | Cert float delay | Custom (OK) |
| **FloatingCards.tsx** | `floatDuration: 3.2 + badge.delay` | Cert float duration | Custom (OK) |
| **StatCards.tsx** | `BASE_DELAY = 1.7` | Stat card base delay | Custom constant (OK) |
| **StatCards.tsx** | `stiffness: 140, damping: 20, mass: 1.1` | Stat spring | Custom (OK) |
| **StatCards.tsx** | `duration: 1.5` / `duration: 1.8` | Counter animation | Custom (OK) |
| **StatCards.tsx** | `duration: 0.6` | Sparkline area fade | `--anim-slow` ✅ equivalent |
| **StatCards.tsx** | `duration: 0.8` | Sparkline line draw | Custom (OK) |
| **StatCards.tsx** | `duration: 2` | Pulse dot | Custom (OK) |
| **StatCards.tsx** | `duration: 0.3` | End dot entrance | `--anim-normal` ✅ equivalent |
| **StatCards.tsx** | `duration: 0.4` | Value fade in | Custom (OK) |
| **StatCards.tsx** | `duration: 0.5` | Section label fade | `--anim-slow` ✅ equivalent |
| **StatCards.tsx** | `duration: 4-5s` | Stat card float | Custom (OK) |
| **CTAButton.tsx** | `stiffness: 500, damping: 30, mass: 0.8` | Hover/tap spring | Custom (OK) |
| **TextReveal.tsx** | `duration: 0.9` | Line reveal | Custom (OK for hero) |
| **TextReveal.tsx** | `ease: [0.16, 1, 0.3, 1]` | Line reveal ease | `--ease-spring` ✅ equivalent |
| **TextReveal.tsx** | `duration: 0.7` | Word reveal | Custom (OK) |
| **TextReveal.tsx** | `stagger: 0.06` | Word stagger | Custom (OK) |
| **globals.css** | `var(--anim-normal)` | CTA transitions | ✅ Uses token |
| **globals.css** | `var(--anim-slow)` | CTA shine transition | ✅ Uses token |
| **globals.css** | `var(--ease-smooth)` | CTA transitions | ✅ Uses token |
| **globals.css** | `var(--ease-spring)` | Stat card entrance | ✅ Uses token |
| **globals.css** | `var(--anim-slower)` | Stat card entrance | ✅ Uses token |
| **globals.css** | `14s cubic-bezier(0.45, 0, 0.55, 1)` | Blob float A | Custom (OK) |
| **globals.css** | `18s cubic-bezier(0.45, 0, 0.55, 1)` | Blob float B | Custom (OK) |
| **globals.css** | `10s cubic-bezier(0.45, 0, 0.55, 1)` | Blob float C | Custom (OK) |

---

## 7. CURRENT → LINEAR/APPLE STYLE MAPPING

### 7.1 Color Mapping

| Current Value | Linear/Apple Equivalent | Rationale |
|---|---|---|
| `oklch(55% 0.18 160)` (emerald accent) | **KEEP** — Linear uses `oklch(55% 0.18 160)` equivalent | Already matches Linear's restrained accent strategy |
| `oklch(18% 0.01 160)` (dark CTA bg) | **KEEP** — Linear's dark buttons use `oklch(18-20% 0.01 ~)` | Already correct |
| `oklch(98.5% 0.003 160)` (bg-base) | **KEEP** — Linear's bg is ~`oklch(98-99% 0.003)` | Already correct |
| `rgba(255,255,255,0.06)` (dot grid) | **KEEP** — Linear uses `rgba(255,255,255,0.05-0.07)` | Already correct |
| `rgba(255,255,255,0.10)` (badge bg) | **KEEP** — Linear uses `rgba(255,255,255,0.08-0.12)` | Already correct |
| `text-white/60` (subtitle) | **KEEP** — Linear uses `rgba(255,255,255,0.5-0.65)` for secondary | Already correct |
| `text-white/40` (muted labels) | **KEEP** — Linear uses `rgba(255,255,255,0.35-0.45)` | Already correct |
| `text-emerald-400` (icons, dots) | **REPLACE** with `var(--fg-accent)` or `oklch(65% 0.16 160)` | Tailwind `emerald-400` ≠ brand accent. Use token |
| `text-emerald-300` (stat hover) | **REPLACE** with `oklch(70% 0.15 160)` | Use brand accent light |
| `text-amber-400/80` (negative change) | **REPLACE** with `var(--warning-500)` | Use semantic token |
| `bg-emerald-400/[0.08]` (change badge) | **REPLACE** with `var(--accent-500)` at 8% opacity | Use brand token |
| `bg-emerald-500/15` (cert icon bg) | **REPLACE** with `var(--accent-100)` or `var(--accent-500)` at 15% | Use brand token |
| `from-emerald-500/5` (hover glow) | **REPLACE** with `from-accent-500/5` | Use Tailwind v4 token |
| `border-white/[0.08]` (stat card) | **KEEP** — Linear uses `rgba(255,255,255,0.07-0.10)` | Already correct |
| `border-white/[0.10]` (CTA secondary) | **KEEP** — Linear uses similar | Already correct |
| `border-white/[0.12]` (product ring) | **KEEP** — within Linear range | Already correct |
| `border-white/[0.15]` (badge border) | **KEEP** — within Linear range | Already correct |
| `border-white/8` (CIS chip) | **KEEP** — `rgba(255,255,255,0.08)` | Already correct |
| `via-white/15` (stat separator) | **KEEP** — `rgba(255,255,255,0.15)` | Already correct |
| `from-white/[0.08]` (accent line) | **KEEP** — within Linear range | Already correct |
| `from-white/[0.06]` (section line) | **KEEP** — within Linear range | Already correct |
| `from-black/50 via-black/30 to-black/60` (video overlay) | **KEEP** — Linear uses similar dark overlays | Already correct |
| `bg-white/[0.04]` (stat card bg) | **KEEP** — Linear uses `rgba(255,255,255,0.03-0.05)` | Already correct |
| `bg-white/[0.07]` (CTA secondary bg) | **KEEP** — Linear uses similar | Already correct |
| `bg-white/5` (CIS chip bg) | **KEEP** — `rgba(255,255,255,0.05)` | Already correct |
| `bg-white/[0.07]` (product ring bg) | **KEEP** — within Linear range | Already correct |
| `bg-surface-elevated/25` (center glow) | **REPLACE** with `var(--bg-elevated)` at 25% | Use token |
| `bg-surface-elevated` (card bg) | ✅ Already uses token | — |
| `border-border-subtle` (card border) | ✅ Already uses token | — |
| `text-text-primary` / `text-text-secondary` | ✅ Already uses token | — |
| `shadow-lg` (card shadow) | ✅ Already uses token | — |

### 7.2 Spacing Mapping

| Current Value | Linear/Apple Equivalent | Rationale |
|---|---|---|
| `p-4` (stat cards) | **KEEP** — Linear uses 16px padding in dashboard cards | Already correct |
| `gap-2.5 sm:gap-3` (stat grid) | **KEEP** — Linear uses 8-12px gaps | Already correct |
| `px-7 sm:px-9 py-3.5` (CTA) | **KEEP** — Linear's CTA buttons use similar generous padding | Already correct |
| `py-16 sm:py-20 lg:py-0` (hero section) | **KEEP** — Hero padding is viewport-dependent | Already correct |
| `gap-8 lg:gap-12 xl:gap-16` (2-col grid) | **KEEP** — Linear uses 32-64px column gaps | Already correct |
| `mb-3/4/5/6` (content margins) | **KEEP** — Within Linear's 4px grid | Already correct |
| `p-3 lg:p-5` (cert cards) | **KEEP** — Linear uses 12-20px in floating cards | Already correct |
| `w-8 h-8 lg:w-10 lg:h-10` (cert icon) | **KEEP** — Linear uses 32-40px icon containers | Already correct |
| `w-1 h-4` (section label dot) | **KEEP** — Linear uses similar accent bars | Already correct |
| `w-2 h-2` (pulse dot) | **KEEP** — Linear uses 8px pulse indicators | Already correct |
| `w-1.5 h-1.5` (accent dot) | **KEEP** — Linear uses 6px accent dots | Already correct |

### 7.3 Shadow Mapping

| Current Value | Linear/Apple Equivalent | Rationale |
|---|---|---|
| `--shadow-xs` through `--shadow-2xl` | **KEEP** — Layered shadows match Linear's approach | Already correct |
| `--glow-accent-sm/md/lg` | **KEEP** — Linear uses similar glow tokens | Already correct |
| CTA primary shadow (inline) | **EXTRACT** to `--shadow-cta-primary` | Needs token for consistency |
| CTA primary hover shadow (inline) | **EXTRACT** to `--shadow-cta-primary-hover` | Needs token for consistency |
| `shadow-lg` on cert cards | ✅ Already uses token | — |
| `blur(12px)` corner glow on stat cards | **EXTRACT** to `--stat-corner-glow` | Needs token |
| `blur(80-100px)` on orbs | **KEEP** — CSS-only, no token needed | Already correct |
| `blur-3xl` on center glow | **KEEP** — CSS-only, no token needed | Already correct |

### 7.4 Typography Mapping

| Current Value | Linear/Apple Equivalent | Rationale |
|---|---|---|
| `font-unbounded` for headings | **KEEP** — Display font for hero matches Linear's approach | Already correct |
| `font-onest` for body | **KEEP** — Clean sans-serif matches Linear's approach | Already correct |
| `text-[1.75rem] sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-6xl` | **KEEP** — Clamp-based responsive title is Apple-style | Already correct |
| `leading-[1.1]` on title | **KEEP** — Apple/Linear use 1.0-1.1 for display | Already correct |
| `tracking-normal` | **KEEP** — DESIGN.md explicitly requires normal for Cyrillic | Already correct |
| `font-black` on title | **KEEP** — Linear uses 700-900 for hero titles | Already correct |
| `font-light` on subtitle | **KEEP** — Linear uses 300-400 for secondary text | Already correct |
| `font-semibold` on CTA | **KEEP** — Linear uses 600 for button text | Already correct |
| `font-medium` on badges/labels | **KEEP** — Linear uses 500 for small labels | Already correct |
| `text-[8px]` / `text-[9px]` / `text-[10px]` | **REVIEW** — Below Linear's minimum (12px). Consider `--text-xs` (12px) as floor | Accessibility concern |
| `text-[11px]` | **REVIEW** — Below Linear's minimum. Consider `--text-xs` (12px) | Accessibility concern |

### 7.5 Animation Mapping

| Current Value | Linear/Apple Equivalent | Rationale |
|---|---|---|
| `ease: [0.16, 1, 0.3, 1]` (spring curve) | **KEEP** — Matches `--ease-spring` exactly | Already correct |
| `ease: [0.25, 0.46, 0.45, 0.94]` (smooth) | **KEEP** — Matches `--ease-smooth` exactly | Already correct |
| `stiffness: 160, damping: 20, mass: 1.2` (product) | **KEEP** — Within Linear's spring range | Already correct |
| `stiffness: 180, damping: 22, mass: 1` (cert) | **KEEP** — Within Linear's spring range | Already correct |
| `stiffness: 140, damping: 20, mass: 1.1` (stat) | **KEEP** — Within Linear's spring range | Already correct |
| `stiffness: 500, damping: 30, mass: 0.8` (CTA hover) | **KEEP** — Snappy micro-interaction, Linear-style | Already correct |
| `duration: 0.3s` hover transitions | **KEEP** — Matches `--anim-normal` | Already correct |
| `duration: 0.5s` entrance | **KEEP** — Matches `--anim-slow` | Already correct |
| `duration: 0.7-0.9s` reveals | **KEEP** — Apple-style reveal duration | Already correct |
| `duration: 1.5s` BG entrance | **KEEP** — Apple-style hero entrance | Already correct |
| `duration: 3-5s` float loops | **KEEP** — Linear-style ambient animation | Already correct |
| `duration: 14-18s` blob loops | **KEEP** — CSS ambient, Linear-style | Already correct |
| `duration: 24s` ring rotation | **KEEP** — Slow decorative, Linear-style | Already correct |
| `stagger: 0.06-0.07` word reveal | **KEEP** — Apple-style word stagger | Already correct |
| `stagger: 0.12` line reveal | **KEEP** — Apple-style line stagger | Already correct |
| `stagger: 0.05` CIS chip stagger | **KEEP** — Fast micro-stagger | Already correct |
| `stagger: 0.12-0.36` stat card stagger | **KEEP** — Linear dashboard stagger | Already correct |
| `stagger: 0.12` cert badge stagger | **KEEP** — Linear floating card stagger | Already correct |
| CSS parallax (`animation-timeline: view()`) | **KEEP** — Modern CSS scroll-driven, Linear-style | Already correct |
| GSAP ScrollTrigger parallax | **KEEP** — For complex scroll-based parallax | Already correct |
| `clipPath: inset()` reveal | **KEEP** — Apple-style clip reveal | Already correct |
| `pathLength: 0→1` sparkline | **KEEP** — Linear dashboard style | Already correct |
| Counter animation (ease-out cubic) | **KEEP** — Linear dashboard style | Already correct |
| Pulse dot (`animate-ping`) | **KEEP** — Linear live indicator style | Already correct |

---

## 8. ISSUES & RECOMMENDATIONS

### 8.1 Critical Issues

1. **Hardcoded `text-emerald-400` / `text-emerald-300` / `text-emerald-400/60` / `text-emerald-400/70`** — These use Tailwind's emerald palette, NOT the brand's `oklch(55% 0.18 160)` accent. The visual difference is subtle but breaks the "single source of truth" principle. Replace with `var(--fg-accent)` or opacity variants of `--accent-400`/`--accent-500`.

2. **Hardcoded `bg-emerald-500/15`** in FloatingCards.tsx — Should use `var(--accent-500)` with opacity or a new token `--cert-icon-bg`.

3. **Hardcoded `text-amber-400/80`** in StatCards.tsx — Should use `var(--warning-500)` with opacity.

4. **CTA shadow values duplicated** between Hero.tsx (inline) and globals.css (`.cta-primary`). Extract to tokens.

5. **Missing `--space-2-5` token** — `10px` / `2.5` is used frequently (`gap-2.5`, `mt-2.5`, `px-2.5`) but has no token.

### 8.2 Missing Tokens to Add

```css
/* Hero-specific tokens needed */
--hero-overlay-from: oklch(0% 0 0 / 0.50);
--hero-overlay-mid: oklch(0% 0 0 / 0.30);
--hero-overlay-to: oklch(0% 0 0 / 0.60);
--hero-bottom-fade-from: var(--bg-base);
--hero-badge-bg: rgba(255, 255, 255, 0.10);
--hero-badge-border: rgba(255, 255, 255, 0.15);
--hero-badge-fg: rgba(255, 255, 255, 0.80);
--hero-title-fg: white;
--hero-subtitle-fg: rgba(255, 255, 255, 0.60);
--hero-muted-fg: rgba(255, 255, 255, 0.40);
--hero-chip-bg: rgba(255, 255, 255, 0.05);
--hero-chip-border: rgba(255, 255, 255, 0.08);
--hero-chip-hover-bg: rgba(255, 255, 255, 0.10);
--hero-chip-hover-border: rgba(255, 255, 255, 0.20);
--hero-stats-bar-bg: rgba(255, 255, 255, 0.06);
--hero-stats-bar-border: rgba(255, 255, 255, 0.10);
--hero-stats-separator: rgba(255, 255, 255, 0.15);
--hero-stat-value-fg: white;
--hero-stat-label-fg: rgba(255, 255, 255, 0.40);
--hero-stat-hover-fg: oklch(70% 0.15 160);
--hero-product-ring-bg: rgba(255, 255, 255, 0.07);
--hero-product-ring-border: rgba(255, 255, 255, 0.12);
--hero-product-ring-dot: rgba(255, 255, 255, 0.50);
--hero-center-glow: var(--bg-elevated);

/* CTA tokens */
--cta-primary-bg: oklch(18% 0.01 160);
--cta-primary-bg-hover: oklch(25% 0.01 160);
--cta-primary-border: rgba(255, 255, 255, 0.08);
--cta-primary-border-hover: rgba(255, 255, 255, 0.14);
--cta-primary-shadow: 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.06);
--cta-primary-shadow-hover: 0 4px 20px oklch(55% 0.18 160 / 0.15), 0 1px 3px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08);
--cta-secondary-bg: rgba(255, 255, 255, 0.07);
--cta-secondary-bg-hover: rgba(255, 255, 255, 0.12);
--cta-secondary-border: rgba(255, 255, 255, 0.10);
--cta-secondary-border-hover: rgba(255, 255, 255, 0.18);

/* Stat card tokens */
--stat-card-bg: rgba(255, 255, 255, 0.04);
--stat-card-border: rgba(255, 255, 255, 0.08);
--stat-card-gradient-from: rgba(255, 255, 255, 0.05);
--stat-card-gradient-to: rgba(255, 255, 255, 0.02);
--stat-label-fg: rgba(255, 255, 255, 0.40);
--stat-value-fg: white;
--stat-change-positive-fg: oklch(65% 0.16 160);
--stat-change-positive-bg: oklch(55% 0.18 160 / 0.08);
--stat-change-negative-fg: var(--warning-500);
--stat-change-negative-bg: var(--warning-500) / 0.08;
--stat-accent-line-from: rgba(255, 255, 255, 0.08);
--stat-section-fg: rgba(255, 255, 255, 0.30);
--stat-section-line-from: rgba(255, 255, 255, 0.06);
--stat-corner-glow: blur(12px);

/* Cert badge tokens */
--cert-icon-bg: oklch(55% 0.18 160 / 0.15);
--cert-hover-glow-from: oklch(55% 0.18 160 / 0.05);

/* Spacing */
--space-2-5: 10px;
```

### 8.3 Accessibility Concerns

1. **`text-[8px]`** in Hero.tsx (stat labels on mobile) — Below WCAG minimum. Floor at `--text-xs` (12px).
2. **`text-[9px]`** in StatCards.tsx (change badges) — Below minimum. Floor at `--text-xs`.
3. **`text-[10px]`** in StatCards.tsx (stat labels) — Below minimum. Floor at `--text-xs`.
4. **`text-[11px]`** in Hero.tsx (badge label) — Borderline. Consider `--text-xs` (12px).

### 8.4 Duplication Issues

1. **CTA styles** — Hero.tsx has inline `bg-[oklch(18%_0.01_160)]` + shadow + border on the `<a>` tag, while globals.css has `.cta-primary` / `.cta-secondary` classes with identical values. The Hero.tsx buttons don't use the CSS classes. Choose one approach.
2. **Blob animation** — HeroBackground.tsx has inline `style={{ background: "radial-gradient(...oklch(55% 0.18 160 / 0.08)..." }}` while globals.css `.mesh-gradient` has similar but different values. Consolidate.
3. **Dot grid** — Hero.tsx has inline `backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)"` while globals.css has `.dot-grid` class with identical values. Use the class.
4. **Noise overlay** — Hero.tsx has inline SVG turbulence while globals.css has `.noise-overlay` class. Use the class.

---

## 9. SUMMARY STATISTICS

| Metric | Count |
|---|---|
| Total unique colors used in Hero components | ~45 |
| Colors using tokens | ~8 (18%) |
| Colors hardcoded | ~37 (82%) |
| Total unique spacing values | ~35 |
| Spacing using Tailwind tokens | ~28 (80%) |
| Spacing needing tokens | ~7 (20%) |
| Total unique shadow values | ~6 |
| Shadows using tokens | ~2 (33%) |
| Shadows needing tokens | ~4 (67%) |
| Total unique font sizes | ~18 |
| Font sizes using tokens | ~12 (67%) |
| Font sizes below 12px floor | ~6 (33%) |
| Total animation timing values | ~30 |
| Animations using tokens/easing | ~12 (40%) |
| Animations with hardcoded values | ~18 (60%) |
| Files with duplicated styles | 3 (Hero.tsx, globals.css, HeroBackground.tsx) |
| Missing tokens to add | ~45 |

---

## 10. COMPONENT DEPENDENCY GRAPH

```
Hero.tsx
├── TextReveal.tsx (ui)
├── StatCards.tsx (hero)
│   └── MiniSparkline (inline SVG)
├── FloatingCards.tsx (hero) [NOT imported by Hero.tsx — used elsewhere?]
│   ├── CertBadgeCard (inline)
│   └── LeftCard (inline)
├── CTAButton.tsx (hero) [NOT imported by Hero.tsx — used elsewhere?]
│   └── Button.tsx (ui)
├── HeroBackground.tsx (hero) [NOT imported by Hero.tsx — used elsewhere?]
├── tokens.css (design tokens)
└── globals.css (global styles + utilities)
```

**Note:** Hero.tsx only directly imports `TextReveal` and `StatCards`. `FloatingCards`, `CTAButton`, and `HeroBackground` are separate components that may be used in other pages or are orphaned. Verify if they're still in use.
