# UI/UX Pro Max Skill — Извлечённые лучшие практики
## Для проекта m-international-v2

**Источник:** https://github.com/nextlevelbuilder/ui-ux-pro-max-skill (90k+ stars)
**Дата анализа:** 2026-06-13

---

## 1. АРХИТЕКТУРА ДИЗАЙН-СИСТЕМЫ (Token Architecture)

### Трёхуровневая система токенов

```
┌─────────────────────────────────────────┐
│  Component Tokens                       │  --button-bg, --card-padding
├─────────────────────────────────────────┤
│  Semantic Tokens                        │  --color-primary, --spacing-section
├─────────────────────────────────────────┤
│  Primitive Tokens                       │  --color-blue-600, --space-4
└─────────────────────────────────────────┘
```

**Primitive → Semantic → Component** — никогда не используйте raw hex в компонентах.

### CSS Variables для Tailwind (shadcn/ui-совместимый формат)

```css
@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222 47% 11%;
    --primary: 217 91% 60%;
    --primary-foreground: 0 0% 100%;
    --secondary: 220 14% 96%;
    --secondary-foreground: 222 47% 11%;
    --muted: 220 14% 96%;
    --muted-foreground: 220 9% 46%;
    --border: 220 13% 91%;
    --ring: 217 91% 60%;
    --radius: 0.5rem;
  }
}
```

**Ключевой инсайт:** space-separated HSL (`217 91% 60%`) вместо `hsl()` — позволяет использовать opacity modifiers: `bg-primary/50`.

### Tailwind Config — анимационные токены

```typescript
transitionDuration: {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
},
```

---

## 2. КОМПОНЕНТ: CARD (Спецификация)

### Варианты
| Variant | Shadow | Border | Use Case |
|---------|--------|--------|----------|
| default | sm | 1px | Standard card |
| elevated | lg | none | Prominent content |
| outline | none | 1px | Subtle container |
| interactive | sm→md | 1px | Clickable card |

### Anatomy & Spacing
```
┌─────────────────────────────────────┐
│ Card Header (24px 24px 0)           │
│   Title                             │
│   Description                       │
├─────────────────────────────────────┤
│ Card Content (24px)                 │
│   Main content area                 │
├─────────────────────────────────────┤
│ Card Footer (0 24px 24px)           │
│   Actions                           │
└─────────────────────────────────────┘
```
**Gap между секциями: 16px**

### Tailwind-реализация карточки товара
```html
<Card class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border-0">
  <CardContent class="p-0">
    <!-- Изображение товара — без отступов -->
  </CardContent>
  <CardFooter class="flex flex-col items-start p-4 gap-2">
    <h3 class="font-semibold text-base">Название</h3>
    <p class="text-sm text-muted-foreground">Описание</p>
  </CardFooter>
</Card>
```

---

## 3. КОМПОНЕНТ: BUTTON (Спецификация)

### Варианты
| Variant | Background | Text | Border |
|---------|------------|------|--------|
| default | primary | white | none |
| secondary | gray-100 | gray-900 | none |
| outline | transparent | foreground | border |
| ghost | transparent | foreground | none |
| destructive | red-600 | white | none |

### Размеры
| Size | Height | Padding X | Font Size |
|------|--------|-----------|-----------|
| sm | 32px | 12px | 14px |
| default | 40px | 16px | 14px |
| lg | 48px | 24px | 16px |

### States
| State | Opacity | Cursor |
|-------|---------|--------|
| default | 1 | pointer |
| hover | 1 | pointer |
| disabled | 0.5 | not-allowed |
| loading | 0.7 | wait |

### @apply-реализация
```css
@layer components {
  .btn {
    @apply inline-flex items-center justify-center rounded-md font-medium transition-colors
           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
           disabled:pointer-events-none disabled:opacity-50;
  }
  .btn-primary { @apply bg-primary text-primary-foreground hover:bg-primary/90; }
  .btn-lg { @apply h-12 px-6 text-base; }
}
```

---

## 4. HERO-СЕКЦИЯ: Паттерны и структура

### Layout Patterns для Hero

```html
<!-- Две колонки: текст + изображение/слайдер -->
<section class="py-12 md:py-20 lg:py-32">
  <div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
    <div class="flex-1 text-center lg:text-left">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">
        Заголовок
      </h1>
      <p class="text-lg md:text-xl text-muted-foreground mt-4">
        Подзаголовок
      </p>
      <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
        <Button size="lg">Основное действие</Button>
        <Button variant="outline" size="lg">Вторичное</Button>
      </div>
    </div>
    <div class="flex-1 w-full">
      <!-- Слайдер / Изображение -->
    </div>
  </div>
</section>
```

### Анимации для Hero-слайдера
```css
/* Типы анимации для слайдов */
.animate-fade-up      /* Появление снизу вверх — для title slide */
.animate-stagger      /* Последовательное появление — для feature grid */
.animate-scale        /* Масштабирование — для product screenshot */
.animate-fade         /* Простое затухание */
```

### Рекомендации по Hero для e-commerce/MLM
- **Hero-Centric + Social Proof** — основной паттерн
- Один слайд = один продукт/оффер
- CTA всегда виден (не скрыт за слайдером)
- Автоплей: 4-6 секунд на слайд
- Навигация: точки (dots) + стрелки

---

## 5. АНИМАЦИИ: Полное руководство (Section 7)

### Тайминги
| Тип | Длительность |
|-----|-------------|
| Микро-взаимодействия | 150–300ms |
| Сложные переходы | ≤400ms |
| Максимум | <500ms |
| Exit (исчезновение) | 60–70% от enter |
| Stagger между элементами | 30–50ms |

### Easing
- **Enter:** ease-out (начало быстрое, конец плавный)
- **Exit:** ease-in (начало плавное, конец быстрый)
- **Никогда:** linear для UI-переходов
- **Предпочтительно:** spring/physics-based curves (Framer Motion)

### Производительность
- **Только transform и opacity** — никогда не анимировать width/height/top/left
- **Не блокировать ввод** — UI должен оставаться интерактивным во время анимации
- **Interruptible** — анимация отменяется по тапу/жесту
- **CLS = 0** — анимации не вызывают layout reflow

### Framer Motion — паттерны

```tsx
// Fade up при появлении
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>

// Stagger для списка карточек
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
    />
  ))}
</motion.div>

// Press feedback (scale)
<motion.button
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.15 }}
>

// Hover lift
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.2 }}
>
```

### Анти-паттерны анимации
- ❌ Декоративная анимация без смысла
- ❌ Анимация width/height (только transform)
- ❌ Без `prefers-reduced-motion`
- ❌ Больше 2 анимированных элементов на экран
- ❌ Анимация блокирует взаимодействие
- ❌ Opacity ниже 0.2 (либо полностью скрыто, либо видимо)

---

## 6. RESPONSIVE: Брейкпоинты и паттерны

### Стандартные брейкпоинты
| Prefix | Width |
|--------|-------|
| sm: | 640px |
| md: | 768px |
| lg: | 1024px |
| xl: | 1280px |
| 2xl: | 1536px |

### Ключевые паттерны

```html
<!-- Карточки товаров: 1 → 2 → 3 → 4 колонки -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">

<!-- Hero: вертикальный → горизонтальный -->
<div class="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

<!-- Типографика -->
<h1 class="text-2xl md:text-4xl lg:text-6xl font-bold">

<!-- Отступы секций -->
<section class="py-12 md:py-20 lg:py-32">

<!-- Контейнер -->
<div class="container mx-auto px-4 sm:px-6 lg:px-8">
```

### Правила
1. **Mobile-first** — базовые стили для мобильных, оверрайды для больших
2. **2-3 брейкпоинта на элемент максимум**
3. **Контент приоритет** — основной контент первым на мобильных
4. **min-h-dvh** вместо `min-h-screen` на мобильных
5. **Тестировать на:** 320px, 375px, 768px, 1024px, 1280px, landscape

---

## 7. ДОСТУПНОСТЬ (Accessibility — Priority 1, CRITICAL)

### Обязательные проверки
- [ ] Контраст текста ≥4.5:1 (крупный текст ≥3:1)
- [ ] Все кликабельные элементы имеют `cursor-pointer`
- [ ] Focus states видимы (2–4px ring)
- [ ] Все формы имеют `<label>` с `for` атрибутом
- [ ] Все осмысленные изображения имеют `alt`
- [ ] Icon-only кнопки имеют `aria-label`
- [ ] Порядок Tab совпадает с визуальным порядком
- [ ] `prefers-reduced-motion` уважается
- [ ] Цвет — не единственный индикатор состояния
- [ ] Touch targets ≥44×44pt

### Для карточек товаров
```html
<article class="group" role="article" aria-label="Название товара">
  <button aria-label="Добавить в избранное" class="rounded-full">
    <!-- Иконка сердца -->
  </button>
</article>
```

---

## 8. НАВИГАЦИЯ (Priority 9, HIGH)

### Правила
- **Bottom nav ≤5 элементов** (мобильные)
- **Текущая страница визуально выделена**
- **Back navigation предсказуем**
- **Deep linking** для всех ключевых экранов
- **State preservation** — возврат сохраняет скролл/фильтры
- **Никогда не смешивать** Tab + Sidebar + Bottom Nav на одном уровне

---

## 9. PRE-DELIVERY CHECKLIST

### Визуальное качество
- [ ] Без emoji как иконок (только SVG)
- [ ] Все иконки из одного набора
- [ ] Press-state не сдвигает layout
- [ ] Семантические токены темы (без hardcoded цветов)

### Адаптивность
- [ ] 375px (маленький телефон)
- [ ] Landscape orientation
- [ ] Touch targets ≥44pt
- [ ] Контент не скрыт за fixed-элементами
- [ ] 4/8dp spacing rhythm

### Анимации
- [ ] Длительность 150–300ms
- [ ] Только transform/opacity
- [ ] `prefers-reduced-motion` поддержан
- [ ] Не больше 2 анимированных элементов на экран
- [ ] Exit быстрее enter (60–70%)

### Производительность
- [ ] Изображения WebP/AVIF
- [ ] Lazy loading для below-fold
- [ ] CLS < 0.1
- [ ] Skeleton/shimmer вместо спиннеров для >1s загрузки

---

## 10. АНТИ-ПАТТЕРНЫ (чего НЕ делать)

| Категория | Анти-паттерн |
|-----------|-------------|
| Иконки | Emoji как иконки, разные наборов иконок |
| Анимация | Декоративная без смысла, >500ms, без reduced-motion |
| Layout | Horizontal scroll, fixed px widths, disable zoom |
| Типографика | <12px body, gray-on-gray, negative letter-spacing на кириллице |
| Карточки | Border вместо тени, овальные кнопки вместо круглых |
| Hero | Snap-scroll, split-screen CTA (для СНГ) |
| Навигация | Overloaded nav, broken back behavior |
| Формы | Placeholder-only label, errors only at top |

---

## 11. СПЕЦИФИКА ДЛЯ СНГ-РЫНКА (из памяти проекта)

- Заголовки компактнее: clamp(2rem, 4vw, 3.5rem) вместо clamp(3.5rem, 8vw, 8rem)
- line-height ≥ 1.1 (не 0.95)
- letter-spacing: normal (не negative)
- Без uppercase + wide tracking на кириллице
- Без snap-scroll и split-screen CTA
- Тексты короткие: 1-3 строки на экран
- Визуал/видео/интерактив вместо длинных текстовых блоков

---

## 12. СТРУКТУРА ФАЙЛОВ ДИЗАЙН-СИСТЕМЫ

```
src/
├── styles/
│   ├── globals.css          # CSS variables + @layer base
│   ├── tokens/
│   │   ├── primitives.css   # Raw values
│   │   ├── semantic.css     # Purpose aliases
│   │   └── components.css   # Component tokens
│   └── components.css       # @layer components
├── components/
│   ├── ui/                  # shadcn/ui компоненты
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── HeroSlider.tsx
│   └── product/
│       ├── ProductCard.tsx
│       └── ProductGrid.tsx
```

---

*Документ подготовлен на основе ui-ux-pro-max-skill v2.0 (44KB SKILL.md, 161 правило, 67 стилей, 57 пар шрифтов)*
