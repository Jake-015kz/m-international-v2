# DESIGN.md — M-International Design System

## Дизайн-философия

**Anti-slop.** Каждое решение должно быть намеренным. Если элемент можно заменить на любой другой сайт без потери смысла — это шаблон, а не дизайн.

**Brand register.** Сайт — маркетинговый лендинг. Дизайн И есть продукт. Посетитель должен почувствовать: это премиальная компания с наукой за спиной, а не очередной MLM-сайт.

## Цветовая система

### Стратегия: Restrained + Committed accent

Базовая палитра — тёплые нейтрали с лёгким оттенком к бирюзово-зелёному. Акцент — насыщенный emerald, используется ≤10% поверхности.

### Примитивные токены (OKLCH)

```css
/* Нейтрали — с лёгким tint к emerald hue (~160) */
--neutral-50:  oklch(99% 0.003 160);
--neutral-100: oklch(97% 0.004 160);
--neutral-200: oklch(92% 0.006 160);
--neutral-300: oklch(85% 0.008 160);
--neutral-400: oklch(65% 0.010 160);
--neutral-500: oklch(50% 0.012 160);
--neutral-600: oklch(40% 0.014 160);
--neutral-700: oklch(30% 0.012 160);
--neutral-800: oklch(20% 0.010 160);
--neutral-900: oklch(12% 0.008 160);

/* Акцент — emerald */
--accent-50:  oklch(97% 0.03 160);
--accent-100: oklch(93% 0.06 160);
--accent-200: oklch(85% 0.10 160);
--accent-300: oklch(75% 0.14 160);
--accent-400: oklch(65% 0.16 160);
--accent-500: oklch(55% 0.18 160);  /* Primary */
--accent-600: oklch(48% 0.16 160);
--accent-700: oklch(40% 0.14 160);
--accent-800: oklch(32% 0.10 160);
--accent-900: oklch(22% 0.06 160);

/* Семантика */
--color-success: oklch(65% 0.16 160);
--color-warning: oklch(70% 0.16 80);
--color-error:   oklch(55% 0.20 25);
--color-info:    oklch(65% 0.14 250);
```

### Семантические токены

```css
--surface-base:     var(--neutral-50);
--surface-elevated: oklch(100% 0.002 160);
--surface-sunken:   var(--neutral-100);

--text-primary:   var(--neutral-800);
--text-secondary: var(--neutral-500);
--text-tertiary:  var(--neutral-400);
--text-inverse:   oklch(98% 0.003 160);

--border-subtle:  var(--neutral-200);
--border-default: var(--neutral-300);

--action-primary:   var(--accent-500);
--action-hover:     var(--accent-600);
```

### Абсолютные запреты по цвету

- Чистый `#000` или `#fff` — всегда tint к brand hue
- Серый текст на цветном фоне — использовать затемнённый оттенок фона
- Light gray на white — провяливает contrast ratio
- Цвет как единственный носитель информации

## Типографика

### Шрифты

| Роль | Шрифт | Веса | Назначение |
|------|-------|------|------------|
| Display/Heading | Unbounded | 200, 400, 700, 900 | Заголовки, акценты |
| Body/UI | Onest | 300, 400, 500, 700 | Текст, кнопки, навигация |

### Модульная шкала (ratio 1.25)

| Роль | Размер | Использование |
|------|--------|---------------|
| xs | 0.75rem (12px) | Метки, легенды |
| sm | 0.875rem (14px) | Вторичный текст |
| base | 1rem (16px) | Основной текст |
| lg | 1.25rem (20px) | Подзаголовки |
| xl | 1.5rem (24px) | H3 |
| 2xl | 1.875rem (30px) | H2 |
| 3xl | 2.5rem (40px) | H1 секций |
| display | clamp(2rem, 5vw, 3.5rem) | Hero H1 |

### Правила

- `line-height` заголовков: 1.1
- `line-height` текста: 1.6-1.7
- `letter-spacing`: normal для кириллицы (НЕ negative)
- `max-width: 65ch` для абзацев
- `text-wrap: balance` для заголовков
- `font-optical-sizing: auto` для variable fonts
- `font-kerning: normal` (explicit)

## Пространственная система

### Базовая единица: 4px

| Токен | Значение |
|-------|----------|
| space-1 | 4px |
| space-2 | 8px |
| space-3 | 12px |
| space-4 | 16px |
| space-5 | 24px |
| space-6 | 32px |
| space-7 | 48px |
| space-8 | 64px |
| space-9 | 96px |

### Вертикальный ритм

Базовый line-height тела = 1.5 × 16px = 24px. Все вертикальные отступы — кратны 4px (не строго 24px, но с 4px granularity).

### Секции

- Padding секций: `py-16 md:py-24` (64px / 96px)
- Между секциями: без gap (разделение через цвет фона)
- Container: `max-w-6xl`, padding `px-4 sm:px-6 lg:px-8`

## Layout

### Гриды

- Продукты: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`
- Преимущества: `flex overflow-x-auto` на mobile → `md:grid md:grid-cols-2 lg:grid-cols-3` на desktop
- Значения о компании: вертикальный список с чередованием направления на desktop

### Абсолютные запреты по layout

- **Nested cards** — никогда
- **Identical card grids** — варьировать размеры/позиции
- **Всё по центру** — использовать асимметрию или строгую сетку
- **Cards как default** — spacing и alignment для группировки

## Анимация

### Принципы

- Только transform и opacity для анимаций
- Ease-out кривые (exponential), без bounce/elastic
- `prefers-reduced-motion: reduce` — обязательный сброс
- Одна хорошо оркестрованная page-load анимация > разрозненные micro-interactions

### Инструменты

| Инструмент | Назначение |
|------------|------------|
| Framer Motion | Page-load анимации, hover/tap, layout animations |
| GSAP + ScrollTrigger | Scroll-based parallax, reveal анимации |
| Lenis | Smooth scroll |
| CSS animations | Marquee, floating particles, glow orbs |

### Тайминги

- Page-load stagger: 0.06s между элементами
- Scroll reveal: duration 0.7s, ease power3.out
- Hover transitions: 0.3s
- Hero entrance: 0.8s с 0.2s delay

## Компоненты

### Кнопки

| Вариант | Использование |
|---------|---------------|
| primary | Основной CTA (чёрный фон) |
| ghost | Вторичное действие (прозрачный) |
| secondary | На тёмном фоне (белый/полупрозрачный) |

- Минимальный touch target: 44×44px
- Hover: scale(1.05), Active: scale(0.95)
- На touch-устройствах: без hover-эффектов

### Карточки

- Border: `border-zinc-200/60` (subtle)
- Shadow: `shadow-sm` → `shadow-md` на hover
- Border-radius: `rounded-2xl`
- Без glassmorphism (не использовать backdrop-blur декоративно)

### Бейджи

- `rounded-full`, `px-3 py-1`, `text-xs`
- Варианты: default (чёрный), outline, glass (на тёмном фоне)

## Адаптивность

### Breakpoints

| Имя | Значение |
|-----|----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |

### Правила

- Mobile-first
- Touch targets ≥ 44px
- Горизонтальный скролл на мобильных для карточек (с scrollbar-hide)
- Скрывать декоративные элементы на мобильных (floating cards, particles)
- Safe area insets для notched устройств

## Абсолютные запреты (Anti-Patterns)

1. **Side-stripe borders** — `border-left/right > 1px` как акцент
2. **Gradient text** — `background-clip: text` + gradient
3. **Glassmorphism как default** — blur только с целью
4. **Hero-metric template** — большое число + маленький лейбл + градиент
5. **Identical card grids** — одинаковые карточки icon+heading+text
6. **Modal как первая мысль** — сначала inline/progressive
7. **Em dashes** — использовать запятые, двоеточия, точки
8. **Reflex-reject шрифты** — Inter, DM Sans, Space Grotesk, Fraunces, Cormorant и т.д.
9. **Editorial-magazine как default** — не использовать display serif + italic + drop caps без причины
10. **Zero imagery** — на brand-страницах всегда должно быть визуальное содержание

## AI Slop Test

Если кто-то может посмотреть на интерфейс и сказал "это сделал AI" — провал.

**First-order test:** Если тема + палитра очевидны из катории (health → white + teal) — провал.

**Second-order test:** Если эстетическая семья очевидна из категории + антиреференсов — провал на уровне глубже.
