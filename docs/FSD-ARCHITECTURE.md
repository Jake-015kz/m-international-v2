# FSD Architecture — m-international-v2

Feature-Sliced Design (FSD) архитектура для Next.js 16 + App Router проекта.

## Соглашения

- Все компоненты по умолчанию — **Server Components**
- `'use client'` только где необходимо (Three.js, анимации, браузерные API)
- Импорты идут **только вниз по слоям** (app → pages → widgets → features → entities → shared)
- Каждый слайс публикует **только через `index.ts`** (barrel export)
- Каждый компонент живёт в своей папке с `index.ts` для re-export

## Слои (верх → низ)

```
src/
├── app/            ← Next.js App Router (макеты, провайдеры, стили)
├── pages/          ← Композиция страниц из виджетов
├── widgets/        ← Самостоятельные UI-блоки (header, hero, footer, секции)
├── features/       ← User interactions / бизнес-логика (фильтры, формы, модалки)
├── entities/       ← Бизнес-сущности (Product, Certificate, Stat)
└── shared/         ← Переиспользуемый инфраструктурный код (UI, lib, config, types, hooks, api)
```

---

## 1. app/ — Application layer

**Ответственность:** точки входа App Router, провайдеры, глобальные стили, метаданные.

```
app/
├── [locale]/
│   ├── layout.tsx        ← Root layout (providers, fonts, SEO)
│   ├── page.tsx          ← Делегирует -> pages/index
│   ├── about/page.tsx    ← Делегирует -> pages/about
│   ├── catalog/page.tsx  ← Делегирует -> pages/catalog
│   ├── contacts/page.tsx ← Делегирует -> pages/contacts
│   ├── globals.css
│   ├── animations.css
│   └── tokens.css
├── page.tsx              ← Redirect to /:locale
├── favicon.ico
└── providers/            ← NextIntl, Motion, SmoothScroll wrappers
    ├── intl.tsx
    ├── motion.tsx
    └── scroll.tsx
```

**Правило:** `app/[locale]/page.tsx` содержит ТОЛКО композицию виджетов через dynamic import.
Никогда не размещайте бизнес-логику или UI здесь.

---

## 2. pages/ — Page layer

**Ответственность:** сборка страниц из виджетов. Никакой логики, только layout composition.

```
pages/
├── index/
│   ├── index.tsx         ← Home page: Hero + Certificates + Products + About + Business + CTA + Footer
│   └── HeroOutro.tsx     ← Межсекционный transition (Hero → Certificates)
├── about/
│   ├── index.tsx         ← About page layout
│   └── TeamSection.tsx   ← Опциональная секция
├── catalog/
│   ├── index.tsx         ← FilterBar + ProductGrid
│   └── CategoryNav.tsx
└── contacts/
    ├── index.tsx         ← ContactForm + Map + Info
    └── ContactInfo.tsx
```

**Правило:** Страницы импортируют ТОЛКО из `widgets/` и `features/`. Страницы НИКОГДА не импортируют из `shared/` напрямую — только через виджеты/фичи/энтити.

---

## 3. widgets/ — Widget layer

**Ответственность:** самостоятельные UI-блоки, получающие данные через props.

```
widgets/
├── header/
│   ├── index.tsx         ← Navbar + LocaleSwitch
│   └── MenuDrawer.tsx    ← Mobile drawer
├── hero/
│   ├── index.tsx         ← Hero composition (background + content + CTA)
│   ├── CTAButton.tsx
│   ├── FloatingCards.tsx
│   ├── HeroBackground.tsx
│   ├── ParallaxOrbs.tsx
│   ├── StatCards.tsx
│   └── ThreeBackground.tsx   ← 'use client' (Three.js)
├── certificates/
│   ├── index.tsx         ← MarqueeRow x2
│   └── MarqueeRow.tsx
├── products-section/
│   ├── index.tsx         ← ProductsList + FilterBar
│   └── ProductGrid.tsx
├── about-section/
│   ├── index.tsx         ← Timeline + ValueCards
│   ├── Timeline.tsx
│   └── ValueCard.tsx
├── business-section/
│   └── index.tsx
├── cta-section/
│   └── index.tsx
└── footer/
    └── index.tsx
```

**Правило:** Виджеты могут импортировать из `features/`, `entities/`, `shared/`. Могут содержать собственные подкомпоненты.

---

## 4. features/ — Feature layer

**Ответственность:** интерактивное поведение, формы, фильтры, переключатели.

```
features/
├── locale-switch/
│   ├── index.tsx         ← Locale dropdown/button group
│   └── LocaleFlag.tsx
├── product-filter/
│   ├── index.tsx         ← Category + search filter bar
│   └── FilterTag.tsx
├── product-modal/
│   ├── index.tsx         ← Product detail modal (dynamic import recommended)
│   └── ModalBackdrop.tsx
├── contact-form/
│   ├── index.tsx         ← Form + Zod validation + submission
│   ├── schema.ts         ← Zod schema
│   └── useContactSubmit.ts
└── scroll-progress/
    └── index.tsx         ← Scroll progress indicator 'use client'
```

**Правило:** Фичи могут импортировать из `entities/` и `shared/`. Фичи содержат хуки, обработчики, локальный state.

---

## 5. entities/ — Entity layer

**Ответственность:** бизнес-сущности с UI-представлением и типизацией.

```
entities/
├── product/
│   ├── index.ts
│   ├── types.ts          ← ProductData interface
│   ├── ProductCard.tsx   ← Product card component
│   └── ProductJsonLd.tsx ← JSON-LD structured data
├── stat/
│   ├── index.ts
│   ├── types.ts          ← StatData interface
│   └── StatCard.tsx
└── certificate/
    ├── index.ts
    ├── types.ts
    └── CertificateBadge.tsx
```

**Правило:** Энтити НЕ импортируют из `features/` или `widgets/`. Только из `shared/`.

---

## 6. shared/ — Shared layer

**Ответственность:** переиспользуемый инфраструктурный код без привязки к бизнес-логике.

```
shared/
├── ui/                   ← Атомарные UI-примитивы
│   ├── index.ts
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   ├── Container.tsx
│   ├── GlassCard.tsx
│   ├── Skeleton.tsx
│   ├── Spinner.tsx
│   ├── Divider.tsx
│   ├── SectionHeader.tsx
│   ├── AnimatedBadge.tsx
│   ├── AnimatedGrid.tsx
│   ├── BackgroundDecorations.tsx
│   ├── MagneticButton.tsx
│   ├── ScrollReveal.tsx
│   └── TextReveal.tsx
├── lib/                  ← Утилиты
│   ├── index.ts
│   ├── cn.ts             ← clsx + tailwind-merge wrapper (существующий utils.ts)
│   ├── fonts.ts
│   ├── i18n.ts
│   ├── motion.ts
│   └── constants/
│       ├── index.ts      ← SITE_CONFIG, LOCALES, DEFAULT_LOCALE
│       └── social.ts
├── config/               ← Конфигурация приложения
│   ├── site.ts
│   └── routing.ts
├── types/                ← Глобальные типы
│   └── index.ts          ← Locale, NavItem и т.д.
├── hooks/                ← Кастомные хуки
│   ├── useMediaQuery.ts
│   └── useScrollPosition.ts
├── api/                  ← API клиенты и серверные функции
│   └── products.ts
├── assets/
│   └── fonts/
│       ├── onest/
│       └── unbounded/
```

---

## Миграционная карта (откуда → куда)

| Было (src/) | Стало (FSD) | Слой | `'use client'` |
|---|---|---|---|
| `src/components/layout/Navbar.tsx` | `widgets/header/index.tsx` | widgets | ✅ (mobile drawer) |
| `src/components/layout/SmoothScrollProvider.tsx` | `app/providers/scroll.tsx` | app | ✅ |
| `src/components/sections/hero/Hero.tsx` | `widgets/hero/index.tsx` | widgets | Нет |
| `src/components/sections/hero/ThreeBackground.tsx` | `widgets/hero/ThreeBackground.tsx` | widgets | ✅ |
| `src/components/sections/hero/ParallaxOrbs.tsx` | `widgets/hero/ParallaxOrbs.tsx` | widgets | ✅ |
| `src/components/sections/hero/FloatingCards.tsx` | `widgets/hero/FloatingCards.tsx` | widgets | ✅ |
| `src/components/sections/hero/StatCards.tsx` | `widgets/hero/StatCards.tsx` | widgets | Нет |
| `src/components/sections/hero/CTAButton.tsx` | `widgets/hero/CTAButton.tsx` | widgets | Нет |
| `src/components/sections/hero/HeroBackground.tsx` | `widgets/hero/HeroBackground.tsx` | widgets | ✅ |
| `src/components/sections/certificates/*` | `widgets/certificates/*` | widgets | ✅ (marquee) |
| `src/components/sections/products/ProductsSection.tsx` | `widgets/products-section/index.tsx` | widgets | Нет |
| `src/components/sections/products/ProductCard.tsx` | `entities/product/ProductCard.tsx` | entities | Нет |
| `src/components/sections/products/ProductModal.tsx` | `features/product-modal/index.tsx` | features | ✅ |
| `src/components/sections/products/FilterBar.tsx` | `features/product-filter/index.tsx` | features | ✅ |
| `src/components/sections/products/ProductJsonLd.tsx` | `entities/product/ProductJsonLd.tsx` | entities | Нет |
| `src/components/sections/about/*` | `widgets/about-section/*` | widgets | ✅ (animations) |
| `src/components/sections/business/*` | `widgets/business-section/*` | widgets | ✅ |
| `src/components/sections/cta/*` | `widgets/cta-section/*` | widgets | Нет |
| `src/components/sections/footer/*` | `widgets/footer/*` | widgets | Нет |
| `src/components/ui/Button.tsx` | `shared/ui/Button.tsx` | shared | Нет |
| `src/components/ui/Badge.tsx` | `shared/ui/Badge.tsx` | shared | Нет |
| `src/components/ui/Input.tsx` | `shared/ui/Input.tsx` | shared | Нет |
| `src/components/ui/Container.tsx` | `shared/ui/Container.tsx` | shared | Нет |
| `src/components/ui/GlassCard.tsx` | `shared/ui/GlassCard.tsx` | shared | Нет |
| `src/components/ui/Skeleton.tsx` | `shared/ui/Skeleton.tsx` | shared | Нет |
| `src/components/ui/Spinner.tsx` | `shared/ui/Spinner.tsx` | shared | Нет |
| `src/components/ui/Divider.tsx` | `shared/ui/Divider.tsx` | shared | Нет |
| `src/components/ui/SectionHeader.tsx` | `shared/ui/SectionHeader.tsx` | shared | Нет |
| `src/components/ui/AnimatedBadge.tsx` | `shared/ui/AnimatedBadge.tsx` | shared | ✅ |
| `src/components/ui/AnimatedGrid.tsx` | `shared/ui/AnimatedGrid.tsx` | shared | ✅ |
| `src/components/ui/BackgroundDecorations.tsx` | `shared/ui/BackgroundDecorations.tsx` | shared | Нет |
| `src/components/ui/MagneticButton.tsx` | `shared/ui/MagneticButton.tsx` | shared | ✅ |
| `src/components/ui/ScrollReveal.tsx` | `shared/ui/ScrollReveal.tsx` | shared | ✅ |
| `src/components/ui/TextReveal.tsx` | `shared/ui/TextReveal.tsx` | shared | ✅ |
| `src/components/motion/FadeIn.tsx` | `shared/ui/FadeIn.tsx` | shared | Нет (wrapper) |
| `src/components/motion/SlideIn.tsx` | `shared/ui/SlideIn.tsx` | shared | Нет |
| `src/components/motion/RevealOnScroll.tsx` | `shared/ui/RevealOnScroll.tsx` | shared | ✅ |
| `src/components/motion/ParallaxSection.tsx` | `shared/ui/ParallaxSection.tsx` | shared | ✅ |
| `src/components/motion/Marquee.tsx` | `shared/ui/Marquee.tsx` | shared | Нет |
| `src/components/motion/CountUp.tsx` | `shared/ui/CountUp.tsx` | shared | ✅ |
| `src/components/motion/AnimatedNumber.tsx` | `shared/ui/AnimatedNumber.tsx` | shared | ✅ |
| `src/components/motion/StaggerContainer.tsx` | `shared/ui/StaggerContainer.tsx` | shared | Нет |
| `src/components/motion/SectionDivider.tsx` | `shared/ui/SectionDivider.tsx` | shared | Нет |
| `src/components/motion/ScrollProgressIndicator.tsx` | `features/scroll-progress/index.tsx` | features | ✅ |
| `src/components/motion/MotionProvider.tsx` | `app/providers/motion.tsx` | app | ✅ |
| `src/components/motion/AnimateHeight.tsx` | `shared/ui/AnimateHeight.tsx` | shared | ✅ |
| `src/components/motion/ScaleIn.tsx` | `shared/ui/ScaleIn.tsx` | shared | Нет |
| `src/components/effects/ParticlesCanvas.tsx` | `shared/ui/ParticlesCanvas.tsx` | shared | ✅ |
| `src/components/effects/ParticlesField.tsx` | `shared/ui/ParticlesField.tsx` | shared | ✅ |
| `src/lib/constants.ts` | `shared/config/site.ts` + `shared/types/index.ts` | shared | Нет |
| `src/lib/constants/social.ts` | `shared/config/social.ts` | shared | Нет |
| `src/lib/fonts.ts` | `shared/lib/fonts.ts` | shared | Нет |
| `src/lib/i18n.ts` | `shared/lib/i18n.ts` | shared | Нет |
| `src/lib/motion.ts` | `shared/lib/motion.ts` | shared | Нет |
| `src/lib/routing.ts` | `shared/config/routing.ts` | shared | Нет |
| `src/lib/seo/jsonld.ts` | `shared/lib/seo/jsonld.ts` | shared | Нет |
| `src/lib/utils.ts` | `shared/lib/cn.ts` | shared | Нет |
| `src/types/index.ts` | `shared/types/index.ts` | shared | Нет |
| `src/messages/*` | `shared/i18n/messages/*` | shared | Нет |
| `src/fonts/onest/*` | `shared/assets/fonts/onest/*` | shared | — |
| `src/fonts/unbounded/*` | `shared/assets/fonts/unbounded/*` | shared | — |

---

## Правила импортов между слоями

```
app        → pages, widgets, shared, providers
pages      → widgets, features, entities
widgets    → features, entities, shared
features   → entities, shared
entities   → shared
shared     → (ничего из вышестоящих слоёв)
```

**Запрещено:**
- pages → shared (напрямую)
- widgets → pages
- features → widgets, pages
- entities → features, widgets, pages
- shared → любой вышестоящий слой

---

## `'use client'` маркировка

Только эти типы файлов должны иметь `'use client'`:
- Three.js / WebGL компоненты (ThreeBackground, ParticlesCanvas, PartifactsField)
- Framer Motion / GSAP контейнеры с DOM-анимациями
- Интерактивные элементы с useState, useEffect, event handlers
- SmoothScroll, ScrollProgress, ContactForm, LocaleSwitch

Всё остальное — **Server Component** по умолчанию.

---

## Порядок миграции (фазы)

### Фаза 1: Shared (безопасно, нет зависимостей)
1. Перенести `src/components/ui/*` → `shared/ui/`
2. Перенести `src/components/motion/*` → `shared/ui/`
3. Перенести `src/components/effects/*` → `shared/ui/`
4. Перенести `src/lib/*` → `shared/lib/`, `shared/config/`
5. Перенести `src/types/*` → `shared/types/`
6. Перенести `src/fonts/*` → `shared/assets/fonts/`
7. Обновить tsconfig.json paths и импорты

### Фаза 2: Entities
1. Создать `entities/product/`, `entities/stat/`, `entities/certificate/`
2. Вынести ProductCard, ProductJsonLd, StatCard, ValueCard
3. Обновить barrel exports

### Фаза 3: Features
1. Создать `features/locale-switch/`, `features/product-filter/`, `features/product-modal/`, `features/contact-form/`, `features/scroll-progress/`
2. Вынести FilterBar, ProductModal, ScrollProgressIndicator, LocaleSwitch
3. Реализовать product-filter как клиентский компонент с useReducer

### Фаза 4: Widgets
1. Перенести секции `src/components/sections/*` → `widgets/`
2. Обновить импорты от entities/features/shared
3. Каждый виджет получает свой `index.tsx` (barrel)

### Фаза 5: Pages
1. Создать `pages/index/`, `pages/about/`, `pages/catalog/`, `pages/contacts/`
2. `src/app/[locale]/page.tsx` → реэкспорт `pages/index`
3. Остальные pages аналогично

### Фаза 6: App Providers
1. Создать `app/providers/` — intl.tsx, motion.tsx, scroll.tsx
2. Вынести провайдеры из `app/[locale]/layout.tsx`
3. Layout становится чище: только провайдеры + children

---

## tsconfig.json — path aliases

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/entities/*": ["./src/entities/*"],
      "@/features/*": ["./src/features/*"],
      "@/widgets/*": ["./src/widgets/*"],
      "@/pages/*": ["./src/pages/*"],
      "@/app/*": ["./src/app/*"]
    }
  }
}
```

Примечание: `@/*` → `./src/*` остаётся работать для обратной совместимости во время миграции.
Новый код использует специфичные алиасы (`@/shared/ui`, `@/entities/product` и т.д.)
для явного обозначения слоя и автоматической проверки правил импорта.

---

## Проверка правил импорта (eslint-plugin-boundaries)

Рекомендуется добавить в будущем:

```bash
npm install --save-dev eslint-plugin-boundaries
```

Пример конфигурации:

```js
// eslint.config.mjs
import boundaries from 'eslint-plugin-boundaries';

export default [
  {
    plugins: { boundaries },
    rules: {
      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          { from: 'pages', allow: ['widgets', 'features', 'entities'] },
          { from: 'widgets', allow: ['features', 'entities', ['shared']] },
          { from: 'features', allow: ['entities', ['shared']] },
          { from: 'entities', allow: [['shared']] },
        ],
      }],
    },
    settings: {
      'boundaries/elements': [
        { type: 'pages', pattern: 'src/pages/*' },
        { type: 'widgets', pattern: 'src/widgets/*' },
        { type: 'features', pattern: 'src/features/*' },
        { type: 'entities', pattern: 'src/entities/*' },
        { type: 'shared', pattern: 'src/shared/*' },
      ],
    },
  },
];
```
