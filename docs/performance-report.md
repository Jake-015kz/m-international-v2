# Performance Report — m-international-v2

**Date:** 2026-06-12  
**Target:** Awwwards SOTD quality — Core Web Vitals passing, Lighthouse ≥90 Performance, ≥95 Accessibility

---

## Performance Budget

| Metric | Target | Budget |
|--------|--------|--------|
| LCP | < 1.5s (ideal), < 2.5s (4G) | 2.5s |
| INP | < 200ms | 200ms |
| CLS | < 0.1 | 0.1 |
| TBT | < 200ms | 200ms |
| FCP | < 1.5s | 1.5s |
| Speed Index | < 3.0s | 3.0s |
| Initial JS | < 200KB gzipped | 200KB |

---

## Optimizations Applied (Task 12)

### 1. next.config.ts
- `optimizePackageImports` for: three, @react-three/fiber, @react-three/drei, @react-three/postprocessing, gsap, framer-motion, lucide-react
- Image formats: AVIF + WebP
- Device sizes: 640, 750, 828, 1080, 1200, 1920, 2048
- Image sizes: 16, 32, 48, 64, 96, 128, 256, 384
- Minimum cache TTL: 30 days for images
- Compression: enabled (brotli/gzip via Vercel)
- CSS optimization: `optimizeCss: true`

### 2. Caching Headers
- Static assets (`/static/*`): `max-age=31536000, immutable`
- Fonts (`/fonts/*`): `max-age=31536000, immutable`
- Images (`*.avif,*.webp,*.png,*.jpg,*.svg,*.gif,*.ico`): `max-age=31536000, immutable`
- JS/CSS chunks: `max-age=31536000, immutable`
- Security headers: HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy

### 3. Font Optimization
- Self-hosted fonts (no Google Fonts API — blocked in Russia)
- `font-display: swap` on both Onest and Unbounded
- `preload: true` on both fonts
- WOFF2 format with multiple weights

### 4. Image Optimization
- All images use `next/image` with automatic WebP/AVIF
- Lazy loading by default
- Explicit width/height to prevent CLS
- Responsive srcset via deviceSizes/imageSizes

### 5. Bundle Optimization
- Tree-shaking for heavy 3D/animation libraries
- Dynamic imports for Three.js components (ssr: false)
- Code splitting via Next.js automatic route-based splitting

---

## Lighthouse CI Configuration

File: `lighthouserc.json`

- 3 runs per URL for statistical significance
- Desktop preset with simulated 4G throttling
- Assertions: Performance ≥ 90, Accessibility ≥ 95
- LCP < 2500ms, CLS < 0.1, TBT < 200ms

---

## Routes Verified

| Route | Status | Notes |
|-------|--------|-------|
| `/ru` | ✅ | Russian homepage |
| `/en` | ✅ | English homepage |
| `/kk` | ✅ | Kazakh homepage |

---

## Pre-Deploy Checklist

- [x] `npm run build` — zero errors
- [x] `npx tsc --noEmit` — zero type errors
- [x] `npm run lint` — zero lint errors
- [x] All images use next/image with explicit dimensions
- [x] Fonts preloaded with font-display: swap
- [x] optimizePackageImports configured for heavy libs
- [x] Cache headers for static assets, fonts, images, JS/CSS
- [x] Security headers (HSTS, X-Frame-Options, etc.)
- [x] Vercel Analytics enabled (post-deploy)
- [x] lighthouserc.json configured for CI

---

## Post-Launch Monitoring Plan

1. **Vercel Analytics** — real-time Core Web Vitals from real users
2. **Lighthouse CI** — run on every PR via GitHub Actions
3. **Vercel Speed Insights** — field data (CrUX) for LCP, INP, CLS
4. **Uptime monitoring** — Vercel built-in + optional external ping

---

## Notes

- Three.js is dynamically imported with `ssr: false` — no server-side rendering overhead
- Reduced-motion fallbacks in place for all animations
- Self-hosted fonts eliminate external DNS lookup (critical for Russia/CIS where Google Fonts may be slow)
- Vercel Edge Network (fra1 region) for European/CIS visitors
