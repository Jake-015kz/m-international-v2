# M-International — Полезные инструменты и библиотеки

> Дата: 2026-06-13
> Стек проекта: Next.js 16.2.9, React 19.2.4, TypeScript 5, Tailwind CSS 4, GSAP 3.15, Framer Motion 12.40, Three.js 0.184, Embla Carousel 8.6, Swiper 12.2, Zustand 5, Zod 4, React Hook Form 7, next-intl 4, Lenis 1.3

---

## 1. Анимации (уже в проекте: Framer Motion, GSAP, Lenis)

### Рекомендации по использованию

| Библиотека | Когда использовать | Bundle (gzip) |
|---|---|---|
| **Framer Motion** (есть) | UI-анимации, page transitions, layout animations, gesture handling, exit animations через AnimatePresence | ~30KB |
| **GSAP** (есть) | Сложные timeline-анимации, scroll-triggered sequences, SVG morphing, высокоточный контроль | ~25KB |
| **Lenis** (есть) | Smooth scroll, параллакс-эффекты | ~5KB |

### Дополнительные инструменты (НЕ добавлять без необходимости)

- **React Spring** — физика-базированные анимации. Только если нужны spring-physics вместо easing. Steeper learning curve.
- **Motion One** — уже вmerged в Motion (Framer Motion). Не нужен отдельно.
- **AutoAnimate** — drop-in анимации для списков. Может быть полезен для каталога товаров.

### Практические советы для M-International

1. **Hero-слайдер**: использовать Framer Motion `AnimatePresence` для переходов между слайдами
2. **Scroll-анимации**: GSAP ScrollTrigger + Lenis для параллакса
3. **3D-презентация**: Three.js + @react-three/fiber + @react-three/drei (уже есть)
4. **Микроинтеракции**: Framer Motion `whileHover`, `whileTap` для кнопок и карточек

---

## 2. UI компоненты (уже в проекте: shadcn/ui, Radix UI через shadcn)

### Текущий стек

- **shadcn/ui** 4.11.0 — copy-paste компоненты на Radix UI + Tailwind CSS
- **Radix UI** (через shadcn) — доступные примитивы (Dialog, Dropdown, Tabs, Tooltip)
- **class-variance-authority** 0.7.1 — варианты компонентов
- **clsx** 2.1.1 + **tailwind-merge** 3.6.0 — утилиты для классов

### Рекомендации

| Задача | Решение |
|---|---|
| Модальные окна | shadcn Dialog (Radix) |
| Выпадающие меню | shadcn DropdownMenu (Radix) |
| Табы | shadcn Tabs (Radix) |
| Тултипы | shadcn Tooltip (Radix) |
| Аккордеон | shadcn Accordion (Radix) |
| Карусель | Embla Carousel (есть) или Swiper (есть) |
| Формы | React Hook Form + Zod (есть) |

### НЕ добавлять

- **Material UI (MUI)** — большой bundle, конфликтует с Tailwind
- **Ant Design** — слишком enterprise-тяжёлый
- **Chakra UI** — дублирует функциональность shadcn

---

## 3. State Management (уже в проекте: Zustand)

### Текущий стек

- **Zustand** 5.0.14 — лёгкий state manager

### Рекомендации

Zustand — оптимальный выбор для M-International. Не нужно Redux/MobX.

Для серверного состояния (данные с API) рассмотреть:
- **TanStack Query (React Query)** — кэширование, refetching, optimistic updates. Полезен если будет много API-запросов (каталог, фильтры, поиск)
- **SWR** (от Vercel) — легче TanStack Query, хорош для Next.js

---

## 4. Формы (уже в проекте: React Hook Form, Zod)

### Текущий стек

- **React Hook Form** 7.78.0 — управление формами
- **Zod** 4.4.3 — валидация схем
- **@hookform/resolvers** 5.4.0 — мост Zod ↔ React Hook Form

Это оптимальный стек. Не менять.

---

## 5. Интернационализация (уже в проекте: next-intl)

### Текущий стек

- **next-intl** 4.13.0 — i18n для Next.js App Router

Поддерживает: русский, казахский, английский и др. для рынков СНГ.

---

## 6. Изображения и медиа

### Встроенные возможности Next.js (использовать в первую очередь)

- **next/image** — автоматическая оптимизация, lazy loading, WebP/AVIF, responsive sizes
- **next/font** — self-hosting шрифтов, нулевой layout shift

### Рекомендации по оптимизации

1. Использовать `next/image` с `priority={true}` для hero-изображений (LCP)
2. `loading="lazy"` для изображений ниже fold
3. `sizes` атрибут для responsive images
4. Формат WebP/AVIF через `next/image` (автоматически)
5. Для фоновых изображений — CSS `background-image` с `image-set()` для WebP fallback

### Дополнительные инструменты (если понадобится)

- **Uploadcare** или **ImageKit** — CDN с on-the-fly трансформацией изображений
- **sharp** — серверная обработка изображений (уже встроен в Next.js)

---

## 7. SEO (Next.js 16 App Router)

### Встроенные возможности (использовать)

- **Metadata API** — `metadata` и `generateMetadata` в layout/page
- **sitemap.ts** — автоматическая генерация /sitemap.xml
- **robots.ts** — автоматическая генерация /robots.txt
- **JSON-LD** — структурированные данные через `<script type="application/ld+json">`
- **Open Graph** — через Metadata API или `opengraph-image.tsx`
- **Canonical URLs** — через `metadata.alternates.canonical`

### Чек-лист SEO для M-International

1. `metadataBase` в root layout
2. `title.template` для единообразия
3. Уникальные title + description на каждой странице
4. Open Graph + Twitter Card теги
5. JSON-LD: Organization, Product, BreadcrumbList
6. `next-sitemap` НЕ нужен — Next.js 16 генерирует сам
7. `next-intl` для hreflang тегов (мультиязычность)

---

## 8. Тестирование

### Рекомендуемый стек (добавить при необходимости)

| Инструмент | Назначение |
|---|---|
| **Vitest** | Unit-тесты (быстрее Jest, нативный Vite-совместимый) |
| **React Testing Library** | Тесты компонентов |
| **Playwright** | E2E тесты |
| **@testing-library/user-event** | Симуляция действий пользователя |

---

## 9. Качество кода (уже в проекте: ESLint)

### Текущий стек

- **ESLint** 9 + **eslint-config-next** 16.2.9

### Рекомендации по добавлению

- **Prettier** — форматирование кода (если ещё не настроен)
- **Husky** + **lint-staged** — pre-commit хуки
- **@typescript-eslint** — строгая типизация (уже в eslint-config-next)

---

## 10. 3D и WebGL (уже в проекте)

### Текущий стек

- **Three.js** 0.184
- **@react-three/fiber** 9.6.1 — React-рендерер для Three.js
- **@react-three/drei** 10.7.7 — полезные хелперы (OrbitControls, Environment, ContactShadows)
- **@react-three/postprocessing** 3.0.4 — постобработка (Bloom, DepthOfField)

Это полный стек для 3D-презентации продукта. Не требует дополнений.

---

## 11. Карусели и слайдеры (уже в проекте)

### Текущий стек

- **Embla Carousel** 8.6.0 — лёгкий, гибкий, доступный
- **Swiper** 12.2.0 — полнофункциональный слайдер

### Рекомендации

- **Embla Carousel** — для простых каруселей (товары, отзывы)
- **Swiper** — для сложных слайдеров (hero-секция с autoplay, pagination, effects)

---

## 12. Полезные утилиты (уже в проекте)

| Пакет | Назначение |
|---|---|
| **clsx** | Условные CSS-классы |
| **tailwind-merge** | Слияние Tailwind-классов без конфликтов |
| **class-variance-authority** | Варианты компонентов (size, variant) |
| **tailwind-merge** 3.6.0 | Deduplication классов |
| **tw-animate-css** 1.4.0 | Tailwind CSS анимации |
| **lucide-react** 1.18.0 | Иконки |
| **flag-icons** 7.5.0 | Флаги стран (для мультиязычности) |

---

## 13. Что НЕ добавлять (антипаттерны)

| Пакет | Причина |
|---|---|
| Redux / MobX | Zustand достаточно |
| Material UI | Конфликт с Tailwind, большой bundle |
| Ant Design | Тяжёлый, enterprise-ориентированный |
| Styled Components | Конфликт с Tailwind CSS |
| jQuery | Антипаттерн для React |
| Moment.js | Заменить на date-fns или dayjs (если нужна работа с датами) |
| Lodash | Использовать нативные методы или lodash.es |

---

## 14. Потенциальные дополнения (по мере роста)

| Пакет | Когда добавить |
|---|---|
| **TanStack Query** | При появлении API для каталога/фильтров |
| **sharp** | Для серверной обработки изображений (уже в Next.js) |
| **resend** или **nodemailer** | Для форм обратной связи |
| **@vercel/analytics** | Аналитика (бесплатно на Vercel) |
| **@sentry/nextjs** | Мониторинг ошибок в продакшене |
| **next-auth** | Если нужна авторизация пользователей |
| **stripe** | Если нужна оплата |

---

## Итог

Текущий стек M-International — **современный, сбалансированный и достаточный** для лендинга с 3D-презентацией. Основные библиотеки уже установлены. Добавлять новые пакеты только при появлении конкретных требований.

Приоритеты:
1. Всё необходимое УЖЕ установлено
2. Для SEO — использовать встроенные механизмы Next.js 16
3. Для состояния — Zustand достаточно
4. Для форм — React Hook Form + Zod оптимален
5. Для анимаций — Framer Motion + GSAP + Lenis покрывают все сценарии
