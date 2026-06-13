# Design System Analysis: Product Cards

> Source: ui-ux-pro-max skill + current codebase audit  
> Date: 2026-06-13  
> Workspace: /storage/repos/m-international-v2

---

## 1. Current State Audit

### 1.1 Files Involved

| File | Role | Lines |
|------|------|-------|
| `src/components/sections/products/ProductCard.tsx` | Main card component | 294 |
| `src/components/sections/products/ProductModal.tsx` | Detail modal | 283 |
| `src/components/sections/products/ProductsSection.tsx` | Grid layout + filtering | 295 |
| `src/components/sections/products/FilterBar.tsx` | Category filter pills | 60 |
| `src/components/ui/Card.tsx` | Base Card primitives | 165 |
| `src/components/ui/GlassCard.tsx` | Glass effect wrapper | 116 |
| `src/components/ui/Button.tsx` | Button variants | 74 |
| `src/components/ui/Badge.tsx` | Badge variants | 46 |
| `src/components/ui/Skeleton.tsx` | Loading skeleton | 64 |
| `src/app/[locale]/tokens.css` | Design tokens | 773 |
| `src/app/[locale]/globals.css` | Global styles + card utilities | 1947 |
| `src/app/[locale]/animations.css` | Animation keyframes | 502 |
| `src/lib/motion.ts` | Easing/stagger presets | 127 |

### 1.2 Current ProductCard Structure

```
ProductCard
├── TiltCard (3D tilt wrapper — framer-motion)
│   ├── Dynamic glow (cursor-following radial gradient)
│   ├── Top accent line (color-coded, opacity on hover)
│   ├── [children]
│   └── Bottom accent line (width animation on hover)
│
├── Image Area
│   ├── ParallaxImage (mouse-move parallax)
│   │   ├── <img> with spring y-axis
│   │   ├── Decorative blobs (2x radial gradients)
│   │   └── Bottom fade gradient
│   └── Fallback (icon-based, no image)
│       ├── Decorative blobs
│       ├── Icon container (spring hover: scale 1.15, rotate 5deg)
│       └── Bottom fade gradient
│
├── Featured Badge ("Хит") — top-right, spring entrance
│
└── Content Area
    ├── Subtitle (10px, uppercase, tracking-wider, color-coded)
    ├── Title (font-onest, font-bold, leading-[1.2], color)
    ├── Description (font-light, line-clamp-2)
    ├── Spacer (flex-1)
    └── CTA Button (MagneticButton, "Подробнее" + animated arrow)
```

### 1.3 Current Grid Layout

- Desktop: `grid-cols-4` (asymmetric — first 2 cards span `col-span-2`)
- Tablet: `grid-cols-2`
- Mobile: `grid-cols-1`
- Gap: `gap-4 md:gap-6`
- Section padding: `py-16 md:py-24`

---

## 2. Design System Principles (from ui-ux-pro-max)

### 2.1 Applicable Product Type: Beauty/Spa/Wellness Service

**Source:** `products.csv` row — "Beauty/Spa/Wellness Service"

| Property | Recommendation |
|----------|---------------|
| **Primary Style** | Soft UI Evolution + Neumorphism |
| **Secondary Styles** | Glassmorphism, Minimalism |
| **Color Palette** | Soft pastels (Pink #FFB6C1, Sage #90EE90) + Cream + Gold accents |
| **Landing Pattern** | Hero-Centric Design + Social Proof |

### 2.2 Applicable Style: Soft UI Evolution

**Source:** `styles.csv` — "Soft UI Evolution"

- **Best For:** Modern enterprise apps, SaaS platforms, health/wellness, modern business tools
- **Effects:** Improved shadows (softer than flat, clearer than neumorphism), modern (200-300ms), focus visible, WCAG-compliant
- **Primary:** Improved contrast pastels: Soft Blue #87CEEB, Soft Pink #FFB6C1, Soft Green #90EE90
- **Key Insight:** "better contrast, modern aesthetics, subtle depth, accessibility-focused"

### 2.3 Applicable Style: Bento Grids

**Source:** `styles.csv` — "Bento Grids"

- **Best For:** Product features, dashboards, personal sites, marketing summaries, galleries
- **Primary:** Off-white #F5F5F7, Clean White #FFFFFF, Text #1D1D1F
- **Effects:** Hover scale (1.02), soft shadow expansion, smooth layout shifts, content reveal
- **Mobile:** Rounded-xl (16px), subtle shadows

### 2.4 Applicable Style: Organic Biophilic

**Source:** `styles.csv` — "Organic Biophilic"

- **Best For:** Wellness apps, sustainability brands, eco products, health apps, meditation, organic food brands
- **Effects:** Rounded corners (16-24px), organic curves (border-radius variations), natural shadows, flowing SVG shapes

### 2.5 Applicable Style: Glassmorphism

**Source:** `styles.csv` — "Glassmorphism"

- **Best For:** Modern SaaS, financial dashboards, high-end corporate, lifestyle apps, modal overlays
- **Effects:** Backdrop blur (10-20px), subtle border (1px solid rgba white 0.2), light reflection, Z-depth

### 2.6 Typography: Wellness Calm

**Source:** `typography.csv` — "Wellness Calm"

- **Heading:** Lora (serif, organic curves)
- **Body:** Raleway (elegant simplicity)
- **Mood:** calm, wellness, health, relaxing, natural, organic
- **Best For:** Health apps, wellness, spa, meditation, yoga, organic brands

### 2.7 Typography: E-commerce Clean

**Source:** `typography.csv` — "E-commerce Clean"

- **Heading:** Rubik
- **Body:** Nunito Sans
- **Mood:** ecommerce, clean, shopping, product, retail, conversion
- **Best For:** E-commerce, online stores, product pages, retail, shopping

---

## 3. Design Tokens — Applicable to Product Cards

### 3.1 Color Tokens (from `tokens.css`)

#### Surface Backgrounds
| Token | Light Value | Usage |
|-------|-------------|-------|
| `--bg-base` | `oklch(97.5% 0.004 85)` | Page background |
| `--bg-elevated` | `oklch(100% 0.002 85)` | Card background |
| `--bg-sunken` | `oklch(95% 0.006 85)` | Card inner sections |
| `--bg-alt` | `oklch(96% 0.004 85)` | Section alternate bg |

#### Foreground (Text)
| Token | Light Value | Usage |
|-------|-------------|-------|
| `--fg-primary` | `oklch(15% 0.010 85)` | Card title |
| `--fg-secondary` | `oklch(45% 0.014 85)` | Card description |
| `--fg-tertiary` | `oklch(58% 0.012 85)` | Meta text, timestamps |

#### Brand Accent (Cyan-Teal, hue 195)
| Token | Light Value | Usage |
|-------|-------------|-------|
| `--accent-50` | `oklch(97% 0.02 195)` | Badge backgrounds |
| `--accent-100` | `oklch(93% 0.04 195)` | Light tints |
| `--accent-200` | `oklch(84% 0.08 195)` | Icon borders |
| `--accent-300` | `oklch(73% 0.11 195)` | Accent lines |
| `--accent-400` | `oklch(62% 0.13 195)` | CTA hover |
| `--accent-500` | `oklch(50% 0.14 195)` | Primary accent, CTA |
| `--accent-600` | `oklch(43% 0.12 195)` | CTA active |
| `--accent-700` | `oklch(36% 0.10 195)` | Text accent |

#### Warm Coral Secondary (hue 25)
| Token | Light Value | Usage |
|-------|-------------|-------|
| `--coral-500` | `oklch(58% 0.19 25)` | Warm accent |
| `--coral-400` | `oklch(68% 0.17 25)` | Hover states |

#### Gold Tertiary (hue 85)
| Token | Light Value | Usage |
|-------|-------------|-------|
| `--gold-50` | `oklch(97% 0.03 85)` | Light gold bg |
| `--gold-100` | `oklch(94% 0.06 85)` | Badge bg |
| `--gold-200` | `oklch(88% 0.10 85)` | Border |
| `--gold-400` | `oklch(72% 0.16 85)` | Featured badge |
| `--gold-500` | `oklch(65% 0.18 85)` | Star rating, premium |
| `--gold-700` | `oklch(46% 0.13 85)` | Gold text |

#### Borders
| Token | Light Value | Usage |
|-------|-------------|-------|
| `--border-subtle` | `oklch(89% 0.008 85)` | Card border |
| `--border-default` | `oklch(80% 0.010 85)` | Hover border |
| `--border-warm` | `oklch(88% 0.008 85)` | Luxury card border |
| `--border-soft` | `oklch(89% 0.008 85)` | Soft UI border |

#### Product Color Palette (from ProductsSection.tsx)
| Product | Color Token |
|---------|-------------|
| Micrystal (vision) | `oklch(65% 0.14 75)` — gold |
| Greenmax (detox) | `oklch(55% 0.16 140)` — green |
| Mimax (immunity) | `oklch(55% 0.18 25)` — coral-red |
| Blumax (immunity) | `oklch(55% 0.14 230)` — blue |
| Nutrimax (nutrition) | `oklch(60% 0.14 120)` — green |
| Fleximax (joints) | `oklch(55% 0.12 60)` — warm |
| Machoman (mens) | `oklch(45% 0.16 350)` — magenta |
| Mitown (nutrition) | `oklch(35% 0.08 40)` — dark warm |

### 3.2 Shadow Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-xs` | `0 1px 2px oklch(0% 0 0 / 0.04)` | Subtle |
| `--shadow-sm` | `0 1px 3px oklch(0% 0 0 / 0.06), 0 1px 2px ...` | Card default |
| `--shadow-md` | `0 1px 3px oklch(0 0 0 / 0.30), 0 4px 8px ...` | Card hover |
| `--shadow-lg` | `0 1px 3px oklch(0 0 0 / 0.30), 0 8px 16px ...` | Elevated |
| `--shadow-float` | `0 1px 3px oklch(0 0 0 / 0.30), 0 12px 28px ...` | Premium float |
| `--shadow-float-lg` | `0 1px 3px oklch(0 0 0 / 0.30), 0 20px 48px ...` | Hero cards |

### 3.3 Glow Tokens

| Token | Usage |
|-------|-------|
| `--glow-accent-sm` | Subtle card glow |
| `--glow-accent-md` | Hover glow |
| `--glow-accent-lg` | Featured card glow |
| `--glow-gold-sm` | Gold badge glow |
| `--glow-gold-md` | Premium indicator |

### 3.4 Radius Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xl` | 20px | Card container |
| `--radius-2xl` | 24px | Card container (current) |
| `--radius-lg` | 16px | Inner elements |
| `--radius-full` | 9999px | Badges, pills |

### 3.5 Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--space-3` | 12px | Tight padding |
| `--space-4` | 16px | Card padding (mobile) |
| `--space-5` | 20px | Card padding (desktop) |
| `--space-6` | 24px | Featured card padding |
| `--space-8` | 32px | Section padding |

### 3.6 Typography Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--text-2xs` | 0.64rem | Micro labels |
| `--text-xs` | 0.75rem | Subtitle, badge |
| `--text-sm` | 0.875rem | Card description |
| `--text-base` | 1rem | Body |
| `--text-lg` | 1.125rem | Card title (desktop) |
| `--text-xl` | 1.25rem | Featured title |
| `--text-2xl` | 1.5rem | Featured title (desktop) |

### 3.7 Animation Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--anim-fast` | 150ms | Micro-interactions |
| `--anim-normal` | 300ms | Hover transitions |
| `--anim-slow` | 500ms | Card entrance |
| `--anim-slower` | 700ms | Modal entrance |
| `--stagger-md` | 80ms | Grid stagger |

### 3.8 Easing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` | Card reveals |
| `--ease-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Hover states |
| `--ease-spring-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful CTAs |

---

## 4. Component Patterns — Applicable to Product Cards

### 4.1 Card Variants (from `Card.tsx`)

| Variant | Class | Usage |
|---------|-------|-------|
| `Card` | `rounded-xl border-border/60 bg-card` | Base card |
| `CardLuxury` | `rounded-2xl border-[var(--border-warm)]` | Premium products |
| `CardGlass` | `rounded-xl bg-card/60 backdrop-blur-xl` | Glass effect |
| `CardGradient` | `relative rounded-2xl overflow-hidden` | Gradient border |
| `CardStat` | `text-center p-4 rounded-2xl` | Stats/metrics |

### 4.2 Button Variants (from `Button.tsx`)

| Variant | Usage |
|---------|-------|
| `luxury` | Primary CTA — teal accent, shadow |
| `luxury-ghost` | Secondary — transparent, gold border hover |
| `luxury-gold` | Premium CTA — gold gradient |
| `cta-white` | Hero CTA — white bg |
| `cta-outline` | Ghost on dark — translucent |

### 4.3 Badge Variants (from `Badge.tsx`)

| Variant | Usage |
|---------|-------|
| `gold` | Featured/premium badge |
| `emerald` | Eco/natural badge |
| `success` | In-stock, certified |
| `info` | New arrival |

### 4.4 Skeleton Variants (from `Skeleton.tsx`)

| Variant | Usage |
|---------|-------|
| `text` | Title/description placeholder |
| `circular` | Avatar/icon placeholder |
| `rectangular` | Image placeholder |
| `rounded` | Card placeholder |

---

## 5. State Definitions

### 5.1 Card States

| State | Visual Treatment |
|-------|-----------------|
| **Default** | `border-border-subtle/60 bg-bg-elevated/80 backdrop-blur-xl`, shadow-sm |
| **Hover** | `z: 12` (translateZ), glow appears, top accent line fades in, bottom accent line expands, image blobs opacity increases |
| **Active/Press** | `scale(0.98)`, shadow reduces |
| **Focus-visible** | `outline: 2px solid var(--border-focus)`, offset 2px |
| **Disabled** | `opacity-50 pointer-events-none` |
| **Loading** | Skeleton shimmer (`anim-shimmer`) |
| **Featured** | `col-span-2`, larger padding, "Хит" badge, larger title |

### 5.2 Image States

| State | Treatment |
|-------|-----------|
| **Loading** | Gradient background + shimmer |
| **Loaded** | Fade-in (opacity 0→1, scale 0.9→1) |
| **Error** | Fallback icon container |
| **Hover** | Parallax shift (spring y-axis) |

### 5.3 CTA Button States

| State | Treatment |
|-------|-----------|
| **Default** | `bg-accent-500 text-white`, glow pulse |
| **Hover** | `bg-accent-600`, shadow expands, magnetic pull |
| **Active** | `scale(0.97)` |
| **Focus-visible** | Ring `oklch(50% 0.14 195 / 0.2)` |
| **Disabled** | `opacity-50` |

---

## 6. UX Guidelines (from ui-ux-pro-max)

### 6.1 Product Card Best Practices

1. **Image-first hierarchy** — Product image occupies 50-60% of card height (current: `h-36 sm:h-48 md:h-52` ✓)
2. **Clear price/CTA** — CTA always visible without scroll (current: bottom-aligned with `flex-1` spacer ✓)
3. **Hover feedback** — Scale 1.02-1.05, shadow expansion (current: translateZ 12px + glow ✓)
4. **Staggered entrance** — Grid items animate in sequence (current: `delay: i * 0.06` ✓)
5. **Touch targets** — Min 44x44px (current: `min-h-[44px]` on buttons ✓)
6. **Reduced motion** — All animations respect `prefers-reduced-motion` (current: global CSS rule ✓)
7. **Content visibility** — `content-visibility: auto` for off-screen cards (current: `.cv-auto` utility ✓)

### 6.2 Wellness-Specific Patterns

1. **Color coding by benefit** — Each product category has distinct hue (current: 8 color variants ✓)
2. **Trust signals** — Certifications (GMP, ISO, Halal) in modal (current: modal footer ✓)
3. **Natural imagery** — Organic shapes, soft gradients (current: blob decorations ✓)
4. **Calm animations** — No jarring transitions, 200-500ms range (current: `--anim-slow` 500ms ✓)
5. **Breathing space** — Generous padding, not cramped (current: `p-4 md:p-6` ✓)

### 6.3 E-commerce Conversion Patterns

1. **Featured items** — Larger cards for top products (current: `col-span-2` for first 2 ✓)
2. **Quick view** — Modal with full details (current: ProductModal ✓)
3. **Category filtering** — Instant client-side filter (current: FilterBar ✓)
4. **Social proof** — Trust badges, certifications (current: modal badges ✓)
5. **Scarcity/urgency** — "Хит" badge for popular items (current: featured badge ✓)

---

## 7. Recommendations

### 7.1 Already Implemented (Keep ✓)

- ✅ 3D tilt with cursor-following glow
- ✅ Parallax image on hover
- ✅ Staggered grid entrance
- ✅ Featured card variant (col-span-2)
- ✅ Category filter with animated pill
- ✅ Product modal with benefits list
- ✅ Trust badges (GMP, ISO, Halal)
- ✅ Reduced motion support
- ✅ Skeleton loading states
- ✅ OKLCH color space throughout
- ✅ CSS custom properties for all tokens
- ✅ Backdrop blur glass effects
- ✅ Magnetic button on CTA

### 7.2 Recommended Additions

| Priority | Addition | Rationale |
|----------|----------|-----------|
| **P1** | Price display | E-commerce essential — currently missing |
| **P1** | "Add to cart" / "Order" CTA | Conversion-critical |
| **P2** | Star ratings | Social proof, trust |
| **P2** | "New" badge variant | For recently added products |
| **P2** | Card skeleton for loading state | Better UX during data fetch |
| **P3** | Wishlist/favorite toggle | Engagement |
| **P3** | Quick-view on hover (desktop) | Faster browsing |
| **P3** | Color swatch for variants | If products have variants |

### 7.3 Design System Gaps to Fill

| Gap | Suggested Token/Component |
|-----|--------------------------|
| Price text style | `--text-price: var(--text-lg) font-unbounded font-bold` |
| Sale/discount badge | `Badge` variant `sale` — coral bg |
| Star rating component | New `Rating` component, gold fill |
| Card skeleton | `Skeleton` variant `card` — full card placeholder |
| Wishlist button | `Button` variant `icon-wishlist` — heart icon |
| Color swatch | New `Swatch` component — small color circles |

---

## 8. Token Quick Reference for Card Implementation

```css
/* Card container */
.product-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-sm);
  transition: all var(--anim-slow) var(--ease-smooth);
}

.product-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

/* Card title */
.product-card-title {
  font-family: var(--font-heading);
  font-size: var(--text-lg);
  line-height: 1.2;
  letter-spacing: normal;
  color: var(--fg-primary);
}

/* Card description */
.product-card-desc {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: 300;
  color: var(--fg-secondary);
}

/* Featured badge */
.product-card-badge {
  font-family: var(--font-heading);
  font-size: var(--text-xs);
  background: var(--gold-50);
  color: var(--gold-700);
  border: 1px solid var(--gold-200);
  border-radius: var(--radius-full);
  padding: var(--space-1) var(--space-2);
}

/* CTA button */
.product-card-cta {
  background: var(--accent-500);
  color: var(--fg-on-accent);
  border-radius: var(--radius-lg);
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  transition: all var(--anim-normal) var(--ease-spring);
}

.product-card-cta:hover {
  background: var(--accent-600);
  box-shadow: var(--glow-accent-md);
}
```

---

## 9. File Map for Coder

```
src/
├── components/
│   ├── sections/products/
│   │   ├── ProductCard.tsx          ← Main card (MODIFY for new features)
│   │   ├── ProductModal.tsx         ← Detail modal (MODIFY for price/rating)
│   │   ├── ProductsSection.tsx      ← Grid + filter (MODIFY for new badge)
│   │   ├── FilterBar.tsx            ← Category pills (KEEP as-is)
│   │   └── index.ts                 ← Barrel export
│   ├── ui/
│   │   ├── Card.tsx                 ← Base card primitives (ADD variants)
│   │   ├── Button.tsx               ← Button variants (ADD icon-wishlist)
│   │   ├── Badge.tsx                ← Badge variants (ADD sale, new)
│   │   ├── GlassCard.tsx            ← Glass wrapper (KEEP as-is)
│   │   └── Skeleton.tsx             ← Loading states (ADD card variant)
│   └── ...
├── app/[locale]/
│   ├── tokens.css                   ← Design tokens (ADD price, rating tokens)
│   ├── globals.css                  ← Global styles (ADD card utilities)
│   └── animations.css               ← Animations (ADD rating star animation)
├── lib/
│   ├── motion.ts                    ← Easing presets (KEEP as-is)
│   └── utils.ts                     ← cn() utility (KEEP as-is)
└── messages/
    ├── ru.json                      ← Russian i18n (ADD price strings)
    ├── en.json                      ← English i18n
    └── kk.json                      ← Kazakh i18n
```
