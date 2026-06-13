# Organic Depth — Design System

> Документ определяет визуальный язык проекта m-international.v2.
> Все токены определены в `src/app/[locale]/tokens.css` (CSS custom properties).
> Все утилитарные классы — в `src/app/[locale]/globals.css` (префикс `.ql-*`).

---

## 1. Философия

**Organic Depth** — Awwwards-палитра 2026. Глубокий тёплый нейтрал, приглушённый бирюзово-голубой акцент, тёплый коралловый как энергия. Не кричащий градиент, а дорогой материал. Не "смотрите, сколько у нас анимаций", а "вы чувствуете качество с первого касания".

Принципы:
- **Меньше, но лучше** — каждый элемент намеренен
- **Тёплые нейтрали** — не холодный белый, а off-white с тёплым оттенком (hue 85)
- **Бирюзовый акцент** — muted cyan-teal (hue 195), ≤10% поверхности
- **Коралловый акцент** — warm coral (hue 25), для CTA и точек внимания
- **Золото как роскошь** — ≤5% поверхности, только в премиальных элементах
- **Много воздуха** — padding секций 96–120px на десктопе
- **1px границы** — тонкие, тёплые, незаметные
- **Шум-текстура** — микрозернистость добавляет "бумажность", убивает цифровую стерильность

---

## 2. Цветовая система

### 2.1 Базовые поверхности (Light theme)

| Токен | Значение (OKLCH) | Применение |
|-------|-------------------|------------|
| `--bg-base` | `oklch(97.5% 0.004 85)` | Фон страницы |
| `--bg-elevated` | `oklch(100% 0.002 85)` | Карточки, модалы |
| `--bg-sunken` | `oklch(95% 0.006 85)` | Инпуты, код |
| `--bg-alt` | `oklch(96% 0.004 85)` | Чередующиеся секции |

### 2.2 Текст (Light theme)

| Токен | Значение | Применение |
|-------|----------|------------|
| `--fg-primary` | `oklch(15% 0.010 85)` | Заголовки, основной текст |
| `--fg-secondary` | `oklch(45% 0.014 85)` | Подписи, описания |
| `--fg-tertiary` | `oklch(58% 0.012 85)` | Плейсхолдеры, hints |
| `--fg-inverse` | `oklch(97% 0.004 85)` | Текст на тёмном фоне |

### 2.3 Cyan-Teal акцент (основной акцент бренда, hue 195)

| Токен | OKLCH | Гекс-апроксимация |
|-------|-------|-------------------|
| `--accent-50` | `oklch(97% 0.02 195)` | #F0FAFC |
| `--accent-300` | `oklch(73% 0.11 195)` | #5BB5C2 |
| `--accent-400` | `oklch(62% 0.13 195)` | #3EA3B3 |
| `--accent-500` | `oklch(50% 0.14 195)` | **#2A7C8A** ← Primary accent |
| `--accent-600` | `oklch(43% 0.12 195)` | #1E6A76 |
| `--accent-700` | `oklch(36% 0.10 195)` | #155861 |

### 2.4 Warm Coral (вторичный акцент, CTA, hue 25)

| Токен | OKLCH | Гекс-апроксимация |
|-------|-------|-------------------|
| `--coral-50` | `oklch(97% 0.03 25)` | #FFF5F0 |
| `--coral-300` | `oklch(78% 0.14 25)` | #E8957A |
| `--coral-400` | `oklch(68% 0.17 25)` | #D47055 |
| `--coral-500` | `oklch(58% 0.19 25)` | **#B8503A** ← Coral accent |
| `--coral-600` | `oklch(50% 0.17 25)` | #9A3E2A |
| `--coral-700` | `oklch(42% 0.14 25)` | #7C3020 |

### 2.5 Золото (третичный, роскошь)

Имеется полная палитра `--gold-50..900` (hue 85). Используется ≤5% поверхности
только в премиальных элементах (иконки, декоративные разделители).

### 2.6 Warm borders

| Токен | Light | Dark | Применение |
|-------|-------|------|------------|
| `--border-warm` | `oklch(88% 0.008 85)` | `oklch(24% 0.008 85)` | 1px рамки карточек |
| `--border-warm-hover` | `oklch(80% 0.010 85)` | `oklch(28% 0.012 85)` | Hover-состояние рамок |

### 2.7 Glow effects

| Токен | Применение |
|-------|------------|
| `--glow-accent-sm/md/lg` | Cyan-teal свечение (hover, active) |
| `--glow-coral-sm/md/lg` | Coral свечение (CTA buttons) |
| `--glow-gold-sm/md/lg` | Золотое свечение (премиум элементы) |

### 2.8 Графит (расширенная палитра текста)

| Токен | Light OKLCH | Dark OKLCH |
|-------|-------------|------------|
| `--graphite-50` | `oklch(96% 0.002 260)` | same |
| `--graphite-800` | `oklch(18% 0.004 260)` | same |
| `--graphite-900` | `oklch(10% 0.002 260)` ≈ #1A1A1A | same |

---

## 3. Типографика

### 3.1 Шрифты

| Роль | Семейство | CSS переменная | Где применять |
|------|-----------|----------------|---------------|
| Display / Headings | Unbounded (200, 400, 700, 900) | `--font-unbounded` | H1–H3, hero, акцентные заголовки |
| Body / UI | Onest (300, 400, 500, 700) | `--font-onest` | Параграфы, кнопки, навигация |

Оба шрифта имеют кириллическую поддержку из коробки.

### 3.2 Типографическая шкала

**Unbounded (Display):**

| Класс | clamp() | Применение |
|-------|---------|------------|
| `.ql-display-sm` | `clamp(1.75rem, 4.5vw, 3.5rem)` | Hero H1 |
| `.ql-display-md` | `clamp(2rem, 5.5vw, 4.5rem)` | Page title |
| `.ql-display-lg` | `clamp(2.5rem, 7vw, 6rem)` | Hero H1 (alt) |

**Unbounded (Headings):**

| Класс | clamp() | Применение |
|-------|---------|------------|
| `.ql-heading-xl` | `clamp(1.5rem, 3.5vw, 2.75rem)` | Section title |
| `.ql-heading-lg` | `clamp(1.25rem, 2.8vw, 2rem)` | H2 |
| `.ql-heading-md` | `clamp(1.1rem, 2vw, 1.5rem)` | H3 |
| `.ql-heading-sm` | `clamp(0.95rem, 1.5vw, 1.15rem)` | H4 |

**Onest (Body):**

| Токен | Размер | Применение |
|-------|--------|------------|
| `.ql-body` | 1rem, line-height 1.6 | Основной текст |
| `--text-sm` | 0.875rem | Вторичный текст |
| `--text-xs` | 0.75rem | Метки, бейджи |

### 3.3 Правила для кириллицы

- `letter-spacing: normal` — **никогда** negative на кириллице
- `line-height` заголовков: ≥ 1.1 (не 0.95)
- `line-height` текста: 1.5–1.7
- `text-wrap: balance` для заголовков
- `text-wrap: pretty` для параграфов
- `max-width: 65ch` для абзацев
- **Запрещено:** `text-transform: uppercase` + `letter-spacing > 0.1em` на кириллице

---

## 4. Пространственная система

### 4.1 Базовая единица: 4px

| Токен | Значение |
|-------|----------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |

### 4.2 Секции

| Контекст | Вертикальный padding |
|----------|---------------------|
| Mobile | `var(--space-24)` = 96px |
| Desktop (md+) | 120px |

Класс `.ql-section` автоматически применяет правильные значения.

### 4.3 Контейнер

Класс `.ql-container`:
- `max-width: 1200px`
- `padding: 24px` → `40px` на desktop
- Центрирован через `margin: auto`

### 4.4 Stack (вертикальный ритм)

| Класс | Gap |
|-------|-----|
| `.ql-stack` | 16px |
| `.ql-stack-sm` | 8px |
| `.ql-stack-lg` | 32px |
| `.ql-stack-xl` | 48px |

Использование: `<div class="ql-stack"><h2>...</h2><p>...</p><button>...</button></div>`

---

## 5. Компоненты (CSS-only)

### 5.1 Карточка `.ql-card`

```html
<div class="ql-card">
  <h3 class="ql-heading-md">Заголовок</h3>
  <p class="ql-body">Описание продукта или услуги.</p>
</div>
```

- 1px тёплая рамка (`--border-warm`)
- `border-radius: 24px`
- Hover: рамка темнеет + `box-shadow: var(--shadow-float)`

### 5.2 CTA кнопки

**Primary** (графит, для основного CTA):
```html
<button class="ql-cta-primary">Оставить заявку</button>
```
- Фон: `--graphite-900` (#1A1A1A)
- Текст: `--graphite-50`
- `border-radius: 9999px` (pill shape)
- Hover: лёгкое золотое свечение

**Ghost** (прозрачная, для вторичного CTA):
```html
<button class="ql-cta-ghost">Подробнее</button>
```
- Прозрачный фон, тёплая рамка
- Hover: рамка → золотая, текст → золотой

**Gold** (золотой градиент, для особых акцентов):
```html
<button class="ql-cta-gold">Связаться</button>
```
- Градиент `--gold-500 → --gold-600`
- Hover: `box-shadow: var(--glow-gold-md)`

### 5.3 Бейдж `.ql-badge`

```html
<span class="ql-badge">Сертифицировано</span>
```

- Фон: `--gold-50`, текст: `--gold-700`
- Рамка: `--gold-200`
- `border-radius: 9999px`

### 5.4 Разделитель `.ql-divider`

```html
<div class="ql-divider"></div>
```

- 1px высота, градиент `transparent → border-warm → transparent`

### 5.5 Текстовые акценты

```html
<span class="ql-text-accent">золотой текст</span>
<span class="ql-text-gradient">градиентный золотой текст</span>
```

---

## 6. Декоративные элементы

### 6.1 Шум-текстура (CSS noise overlay)

Класс `.ql-noise` добавляет псевдо-element `::before` с SVG-шумом:

```html
<section class="ql-section ql-noise">
  <!-- секция с зернистой текстурой -->
</section>
```

- `opacity: 0.03` — едва заметно
- `mix-blend-mode: overlay`
- `pointer-events: none`
- Не влияет на читаемость контента

### 6.2 Dot grid pattern

Класс `.dot-grid` (уже существует в проекте):

```html
<div class="dot-grid">
  <!-- секция с точечной сеткой -->
</div>
```

Токены: `--dot-grid`, `--dot-grid-size` (24px)

### 6.3 Mesh gradient

Класс `.mesh-gradient` (уже существует):

Радиальные градиенты с тёплыми оттенками на фоне `--bg-base`.

---

## 7. Тёмная тема

Все токены автоматически переключаются внутри `.dark` селектора.

Ключевые отличия:
- `--bg-base`: `oklch(7% 0.006 85)` — глубокий тёплый уголь
- `--fg-primary`: `oklch(92% 0.008 85)` — мягкий светлый текст
- `--accent-500` (dark): `oklch(70% 0.13 195)` — яркий teal для контраста
- `--coral-500` (dark): `oklch(65% 0.16 25)` — тёплый coral для CTA
- `--border-warm` (dark): `oklch(24% 0.008 85)`
- Glow-эффекты в тёмной теме на ~30% ярче

---

## 8. Анимация

### 8.1 Длительности

| Токен | Значение |
|-------|----------|
| `--anim-instant` | 75ms |
| `--anim-fast` | 150ms |
| `--anim-normal` | 300ms |
| `--anim-slow` | 500ms |
| `--anim-slower` | 700ms |

### 8.2 Easing

| Токен | Значение |
|-------|----------|
| `--ease-smooth` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` |
| `--ease-spring` | `cubic-bezier(0.16, 1, 0.3, 1)` |

### 8.3 Правила

- Анимировать **только** `transform` и `opacity` (GPU)
- `prefers-reduced-motion: reduce` — обязательный сброс (уже в globals.css)
- Hover-переходы: `--anim-normal` (300ms)
- `will-change` только для элементов в viewport

### 8.4 Scroll-driven animations

CSS `animation-timeline: view()` для параллакс-эффектов (уже существуют):
- `.parallax-text-slow`, `.parallax-text-mid`, `.parallax-text-fast`

---

## 9. Accessibility

### 9.1 Focus visible

```css
:focus-visible {
  outline: 2px solid var(--border-focus); /* --accent-500 */
  outline-offset: 2px;
  border-radius: 4px;
}
```

### 9.2 Skip-to-content link

Класс `.skip-link` — скрытая ссылка "Перейти к контенту",
появляется при Tab.

### 9.3 Screen reader only

Класс `.sr-only` — visually-hidden для screen readers.

### 9.4 Reduced motion

Полный сброс анимаций при `prefers-reduced-motion: reduce`.

### 9.5 Touch targets

Минимальный размер интерактивного элемента: **44×44px**.

---

## 10. Использование в проекете

### 10.1 Подключение шрифтов (layout.tsx)

```tsx
import { Unbounded, Onest } from 'next/font/google'

const unbounded = Unbounded({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-unbounded',
})

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-onest',
})

// В <body>:
// className={`${unbounded.variable} ${onest.variable}`}
```

### 10.2 Пример секции

```tsx
<section className="ql-section ql-noise mesh-gradient">
  <div className="ql-container">
    <div className="ql-stack-lg">
      <span className="ql-badge">M International</span>
      <h2 className="ql-display-sm">
        Здоровье — это<br />
        <span className="ql-text-gradient">инвестиция</span>
      </h2>
      <p className="ql-body" style={{ maxWidth: '65ch' }}>
        Короткое описание — 1–2 строки. Без воды.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="ql-cta-primary">Связаться</button>
        <button className="ql-cta-ghost">Каталог</button>
      </div>
    </div>
  </div>
</section>
```

### 10.3 Пример карточки продукта

```tsx
<div className="ql-card" style={{ padding: '32px' }}>
  <div className="ql-stack">
    <img src="/product.jpg" alt="..." style={{ borderRadius: '16px', width: '100%' }} />
    <h3 className="ql-heading-md">Название продукта</h3>
    <p className="ql-body">Описание в одну-две строки.</p>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span className="ql-text-accent" style={{ fontWeight: 600 }}>₸12,500</span>
      <button className="ql-cta-gold">В корзину</button>
    </div>
  </div>
</div>
```

---

## 11. Интеграция с навыками

| Навык | Что даёт |
|-------|---------|
| **popular-web-designs** | Референсы Stripe, Linear, Vercel — паттерны для hero, features, CTA |
| **premium-web-patterns** | Bento grid, glassmorphism, magnetic buttons, scroll-reveal |
| **motion-nextjs** (Framer Motion) | Spring physics, layout animations, stagger, scroll-linked |
| **nextjs-cis-premium** | App Router, RSC, Tailwind v4 patterns, GSAP, Lenis |

---

## 12. Чек-лист приёмки

- [ ] Шрифты Unbounded + Onest подключены через `next/font/google`
- [ ] Off-white фон (`#FAF9F6`) вместо чистого белого
- [ ] Cyan-teal `#2A7C8A` как основной акцент (≤10% поверхности)
- [ ] Warm coral `#B8503A` как вторичный акцент (CTA buttons)
- [ ] Золото ≤5% поверхности (премиум элементы)
- [ ] 1px тёплые рамки (`#E8E6E1`) на всех карточках
- [ ] Noise overlay на hero и feature-секциях
- [ ] Section padding 96–120px
- [ ] CTA pill-shaped (`border-radius: 9999px`)
- [ ] `letter-spacing: normal` на кириллице
- [ ] `line-height ≥ 1.1` для заголовков
- [ ] `prefers-reduced-motion: reduce` работает
- [ ] Touch targets ≥ 44×44px
- [ ] Focus-visible ring на всех интерактивных элементах

---

*Версия: 2.0.0 — Organic Depth (Awwwards June 2026)*
*Создано: 2026-06-13*
*Для: m-international.v2 (Евгений)*
