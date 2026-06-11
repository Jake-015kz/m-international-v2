# ТЕХНИЧЕСКИЙ ОТЧЕТ — Design Audit Fix

**Дата:** 2026-06-11
**Репозиторий:** https://github.com/Jake-015kz/m-international-v2
**Коммит:** `a0e3cd0` — "fix: design audit — remove AI slop patterns, optimize performance"

---

## P0: КРИТИЧЕСКИЕ ИСПРАВЛЕНИЯ (нарушения DESIGN.md)

### 1. Gradient Text — убран
- `Hero.tsx:102` — `hero-gradient-text` → `text-text-primary font-black`
- `globals.css` — удалены `.hero-gradient-text` и `@keyframes gradient-shift`

### 2. Hero-metric template — убран
- `Hero.tsx` — удалён массив `stats` и оба блока статистики (десктоп + мобильный)
- Убраны gsap-анимации для statsRef

### 3. Glassmorphism — убран
- `Hero.tsx:68` — `hero-glass-badge` → `bg-accent-50 border border-accent-100`
- `ProductCard.tsx:32` — `card-premium-v2` → `product-card-hover`
- `CTASection.tsx:41` — убран `btn-premium-glow`
- `globals.css` — удалён весь блок PREMIUM UI V2 (235 строк):
  - `.hero-glass-badge`, `.hero-glass-btn`, `.glass-card-premium`
  - `.card-premium-v2` (inner glow + shine sweep)
  - `.btn-premium-glow`, `.float-premium`, `.pulse-ring`, `.shimmer-premium`, `.hero-stat-card`
  - `@keyframes mesh-float`, `blob-drift-*`, `conic-rotate`, `gradient-shift`, `particle-float*`

### 4. Избыточные анимации — убраны
- `HeroBackground.tsx` — удалён `hero-conic-glow` (вращающийся conic-gradient)
- `HeroBackground.tsx` — удалены Particles (24 анимированных div с Framer Motion)
- `HeroBackground.tsx` — `hero-mesh-gradient` (анимированный) → `mesh-gradient` (статичный)
- Удалён `particlesRef` из gsap контекста

### 5. Изображения — сжаты
- `mishroom.png` 7,744KB → `mishroom.webp` 42KB (99.5% уменьшение)
- `micrystal.png` 824KB → `micrystal.webp` 63KB (92.4% уменьшение)
- `mitown2.png` 626KB → `mitown2.webp` 48KB (92.3% уменьшение)
- ProductsSection.tsx — обновлены ссылки на .webp

---

## P1: СЕРЬЁЗНЫЕ ИСПРАВЛЕНИЯ

### 6. Product Card Grid — вариативность
- `ProductsSection.tsx` — сетка `lg:grid-cols-3` → `lg:grid-cols-4`
- GreenMAX добавлен `featured: true` (теперь 2 featured карточки с `col-span-2`)
- Результат: 2 крупных + 6 стандартных вместо 1 крупного + 7 одинаковых

### 7. MLM-тексты — переработаны
- `BusinessSection.tsx` — убран блок "Высокий доход с первого дня"
- `BusinessSection.tsx` — убрана цитата "мост к финансовой свободе"
- `BusinessSection.tsx` — заголовок: "Высокий доход с первого дня" → "Обучение, поддержка, глобальный рынок"
- "Равные возможности" → "Сообщество 10 000+"
- "Одна из самых комплексных систем" → "Комплексная система вознаграждений за результат"

### 8. About-секция — 2x2 grid
- `AboutSection.tsx` — 4 одинаковых блока с alternating layout → 2x2 grid
- Удалён массив `values`, значения вписаны inline

---

## P2: УЛУЧШЕНИЯ

### 9. Lenis на мобильных — отключён
- `SmoothScrollProvider.tsx` — добавлена проверка `window.matchMedia("(max-width: 767px)")`
- На мобильных Lenis не инициализируется

### 10. CTA-секция — асимметричный layout
- `CTASection.tsx` — центрированный тёмный блок → `flex-row` с текстом слева и кнопками справа
- Убраны decorative orbs и floating particles

### 11. Unbounded только для заголовков ≥20px
- `ProductCard.tsx:107` — `font-unbounded` → `font-onest` для названий продуктов
- `BusinessSection.tsx:122` — `font-unbounded` → `font-onest` для заголовков карточек
- `ProductCard.tsx:118` — "Подробнее" `font-unbounded` → `font-onest`

### 12. Language Switcher — добавлен
- `Navbar.tsx` — переключатель RU/EN/KZ в десктопной навигации
- Активный язык выделен `bg-surface-sunken`
- Использует `LOCALES` из `@/lib/constants`

---

## СТАТИСТИКА

- **Файлов изменено:** 16
- **Строк добавлено:** 128
- **Строк удалено:** 587
- **TypeScript ошибок:** 0
- **Удалено PNG:** 9.2MB → добавлено WebP: 153KB
- **Удалено CSS-анимаций:** 12 (@keyframes)
- **Удалено анимированных React-компонентов:** 1 (Particles, 24 motion.div)

---

## ФАЙЛЫ

| Файл | Изменение |
|------|-----------|
| `src/components/sections/hero/Hero.tsx` | -gradient-text, -stats, -glass-badge |
| `src/components/sections/hero/HeroBackground.tsx` | -conic-glow, -particles, -mesh-animation |
| `src/components/sections/products/ProductCard.tsx` | -card-premium-v2, font-unbounded→onest |
| `src/components/sections/products/ProductsSection.tsx` | 4-col grid, +GreenMAX featured, .webp |
| `src/components/sections/business/BusinessSection.tsx` | -MLM тексты, font-unbounded→onest |
| `src/components/sections/about/AboutSection.tsx` | 2x2 grid |
| `src/components/sections/cta/CTASection.tsx` | Asymmetric layout, -particles |
| `src/components/layout/Navbar.tsx` | +Language switcher |
| `src/components/layout/SmoothScrollProvider.tsx` | Lenis disabled on mobile |
| `src/app/[locale]/globals.css` | -235 lines PREMIUM UI V2 |
| `public/images/products/*.webp` | +3 webp files |
| `public/images/products/*.png` | -3 large PNGs |
