# Design Tokens Reference

## Color System

### Surfaces
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--bg-base` | oklch(98.5% 0.003 160) | oklch(8% 0.005 160) | Page background |
| `--bg-elevated` | oklch(100% 0.002 160) | oklch(12% 0.007 160) | Cards, modals |
| `--bg-sunken` | oklch(96% 0.004 160) | oklch(5% 0.003 160) | Inputs, code blocks |
| `--bg-alt` | oklch(97% 0.003 160) | oklch(10% 0.006 160) | Alternating sections |

### Foreground (Text)
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--fg-primary` | oklch(18% 0.008 160) | oklch(92% 0.006 160) | Headings, body |
| `--fg-secondary` | oklch(48% 0.012 160) | oklch(65% 0.010 160) | Descriptions, labels |
| `--fg-tertiary` | oklch(62% 0.010 160) | oklch(50% 0.008 160) | Placeholders, hints |
| `--fg-inverse` | oklch(98% 0.003 160) | oklch(12% 0.007 160) | Text on dark bg |
| `--fg-accent` | oklch(55% 0.18 160) | oklch(70% 0.15 160) | Links, highlights |

### Accent (Emerald)
Full 50–900 scale. Primary brand color: `--accent-500`.

### Semantic
- **Success**: `--success-500` (oklch 60% 0.18 145)
- **Warning**: `--warning-500` (oklch 70% 0.18 85)
- **Danger**: `--danger-500` (oklch 55% 0.20 25)
- **Info**: `--info-500` (oklch 55% 0.16 250)

## Typography

### Families
- `--font-sans`: Onest (body text)
- `--font-heading`: Unbounded (headings)
- `--font-mono`: SF Mono, Fira Code (code)

### Scale (Major Third, 1.25 ratio)
| Token | Size |
|-------|------|
| `--text-2xs` | 0.64rem |
| `--text-xs` | 0.75rem |
| `--text-sm` | 0.875rem |
| `--text-base` | 1rem |
| `--text-lg` | 1.125rem |
| `--text-xl` | 1.25rem |
| `--text-2xl` | 1.5rem |
| `--text-3xl` | 1.875rem |
| `--text-4xl` | 2.25rem |
| `--text-5xl` | 3rem |
| `--text-6xl` | 3.75rem |
| `--text-7xl` | 4.5rem |

## Spacing (4px base)
`--space-0` through `--space-24` (0, 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px)

## Border Radius
| Token | Value |
|-------|-------|
| `--radius-xs` | 4px |
| `--radius-sm` | 8px |
| `--radius-md` | 12px |
| `--radius-lg` | 16px |
| `--radius-xl` | 20px |
| `--radius-2xl` | 24px |
| `--radius-full` | 9999px |

## Shadows
Layered box-shadows: `--shadow-xs` through `--shadow-2xl`.
Glow effects: `--glow-accent-sm/md/lg`.

## Animation

### Durations
| Token | Value |
|-------|-------|
| `--anim-instant` | 75ms |
| `--anim-fast` | 150ms |
| `--anim-normal` | 300ms |
| `--anim-slow` | 500ms |
| `--anim-slower` | 700ms |
| `--anim-glacial` | 1000ms |

### Easing Curves
| Token | Curve |
|-------|-------|
| `--ease-spring` | cubic-bezier(0.16, 1, 0.3, 1) |
| `--ease-spring-bounce` | cubic-bezier(0.34, 1.56, 0.64, 1) |
| `--ease-smooth` | cubic-bezier(0.25, 0.46, 0.45, 0.94) |

### Stagger Delays
`--stagger-xs` (30ms), `--stagger-sm` (50ms), `--stagger-md` (80ms), `--stagger-lg` (120ms)

## Z-Index Scale
`--z-base` (0), `--z-dropdown` (10), `--z-sticky` (20), `--z-overlay` (30), `--z-modal` (40), `--z-toast` (50), `--z-max` (9999)

## Dark Mode
Add `.dark` class to `<html>` or `<body>`. All tokens automatically switch.

## Tailwind Utilities
All tokens are mapped to Tailwind utilities via `@theme inline`:
- `bg-bg-base`, `bg-bg-elevated`, `bg-bg-sunken`
- `text-fg-primary`, `text-fg-secondary`, `text-fg-tertiary`
- `text-accent-500`, `bg-accent-500`
- `shadow-glow-sm`, `shadow-glow-md`, `shadow-glow-lg`
- `rounded-xs`, `rounded-sm`, `rounded-md`, etc.
- `duration-instant`, `duration-fast`, `duration-normal`, etc.
- `z-dropdown`, `z-modal`, `z-toast`
