# GitHub Open-Source Utilities & Solutions for m-international-v2

**Стек проекта:** Next.js 16 + React 19 + Tailwind CSS 4 + Framer Motion + GSAP + Three.js/React Three Fiber + Embla Carousel + Swiper + Zustand + next-intl + Zod

---

## 1. Анимации и UI-компоненты

### 1.1 Motion Primitives (155+ free animated components)
- **URL:** https://github.com/itsjwill/motion-primitives-website
- **Stars:** новые, быстро растут
- **Что дает:** 155+ copy-paste анимированных компонентов — Dock, Spotlight Cards, Glassmorphism, Scroll Animations, 3D Effects. Framer Motion + GSAP + Three.js + Tailwind CSS.
- **Лицензия:** MIT
- **Применимо для:** hero-секции, scroll-triggered анимации, 3D-презентация продукции
- **Установка:** копипейст компонентов напрямую, CLI не требуется

### 1.2 Aceternity UI (200+ premium + free компоненты)
- **URL:** https://ui.aceternity.com
- **GitHub:** https://github.com/AshutoshRajGupta/Aceternity-UI-React
- **Что дает:** 200+ анимированных компонентов (hero sections, bento grids, parallax, 3D cards, text effects). Tailwind CSS + Framer Motion.
- **Лицензия:** MIT (базовые), Pro ($49-149/yr) для шаблонов
- **Применимо для:** hero-секции, карточки товаров, CTA-блоки
- **Установка:** `npx aceternity-ui add [component]`

### 1.3 Magic UI (150+ бесплатных компонентов)
- **URL:** https://magicui.design
- **GitHub:** https://github.com/magicuidesign/magicui
- **Stars:** 21k+
- **Что дает:** 150+ анимированных компонентов и шаблонов для SaaS/marketing сайтов. React + TypeScript + Tailwind + Motion.
- **Лицензия:** MIT
- **Применимо для:** landing page секций, shimmer effects, animated icons
- **Установка:** копипейст через shadcn registry (`npx shadcn@latest add @magicui/[component]`)

### 1.4 GSAP + Three.js + Framer Motion integration examples
- **URL:** https://github.com/JuniorVln/gsap-threejs-framer
- **Что дает:** пример интеграции всех трех библиотек анимации в одном Next.js проекте. GSAP ScrollTrigger + Three.js 3D + Framer Motion page transitions.
- **Лицензия:** MIT
- **Применимо для:** правильная архитектура анимаций в проекте

### 1.5 Lenis Smooth Scroll (10.7k ★)
- **URL:** https://github.com/darkroomengineering/lenis
- **Stars:** 10,739
- **Что дает:** ~3KB библиотека плавного скролла. Native scrollbar сохраняется. GSAP ScrollTrigger интеграция из коробки. React wrapper + `lenis/react`. Infinite scroll, anchor links, touch momentum.
- **Лицензия:** MIT
- **Применимо для:** плавный скролл на всей странице (проект уже использует lenis — убедиться что интеграция оптимальна)
- **Установка:** `npm i lenis`
- **React:** `import { ReactLenis } from 'lenis/react'`

---

## 2. Слайдеры и карусели

### 2.1 Embla Carousel (8.2k ★) — уже в проекте
- **URL:** https://github.com/davidjerleke/embla-carousel
- **Stars:** 8.2k
- **Что дает:** dependency-free, framework-agnostic карусель. Используется в проекте.
- **Полезные плагины:** `embla-carousel-autoplay`, `embla-carousel-wheel-gestures`
- **Расширенный React wrapper:** https://github.com/vuxuanhungg/embla-carousel-react-component (thumbs, parallax, scroll progress)
- **Применимо для:** hero-слайдер, галерея продукции

### 2.2 Swiper (12k+ на npm) — уже в проекте
- **Что дает:** полнофункциональный слайдер. Используется в проекте.
- **Модули:** EffectFade, EffectCoverflow, Mousewheel, Autoplay, Thumbs — проверить что нужные модули импортированы

---

## 3. 3D и WebGL

### 3.1 React Three Fiber (31.1k ★) — уже в проекте
- **URL:** https://github.com/pmndrs/react-three-fiber
- **Stars:** 31.1k
- **React 19:** `@react-three/fiber@9` (совместим с React 19)
- **Сообщество:** Discord 7400+ участников

### 3.2 Drei (9k+ ★) — уже в проекте
- **URL:** https://github.com/pmndrs/drei
- **Что дает:** 70+ хелперов для R3F — OrbitControls, Environment, ContactShadows, Float, MeshReflectorMaterial и др.
- **Для 3D-презентации продукции:** `<Environment>` для освещения, `<Float>` для парения, `<MeshReflectorMaterial>` для отражений

### 3.3 React Three Next Starter (create-r3f-app)
- **URL:** https://github.com/diegonicita/nextjs-3d (на базе react-three-next)
- **Что дает:** готовый стартер R3F + Next.js с SSR, навигацией между страницами без пересоздания canvas. Lighthouse 100.
- **Применимо для:** референс архитектуры 3D-страниц

---

## 4. i18n и Локализации (next-intl — уже в проекте)

### 4.1 Next.js 16 + Next-Intl Boilerplate
- **URL:** https://github.com/AmuraDesign/Next.js-16-Next-Intl-Boilerplate
- **Что дает:** production-ready boilerplate с 13 локалями, per-page hreflang, мультиязычный sitemap/robots, dynamic OG images, RTL поддержка (арабский), theme system
- **Лицензия:** MIT
- **Применимо для:** референс правильной настройки next-intl v4 в Next.js 16

### 4.2 Next.js i18n + Zustand + TS Template
- **URL:** https://github.com/Anrsgrl/next-intl-zustand-ts
- **Что дает:** минимальный шаблон с next-intl + Zustand — клиентские переводы + серверные переводы
- **Применимо для:** архитектура i18n с Zustand (проект уже использует Zustand)

---

## 5. State Management (Zustand — уже в проекте)

### 5.1 Zustand паттерны и утилиты
- **Zustand persist middleware** — уже встроен, для сохранения корзины/избранного в localStorage
- **Zustand devtools** → `middleware: (f) => devtools(f, { name: 'app-store' })`
- **Пример оптимального store для e-commerce:**
  ```ts
  // Разделение на мелкие stores вместо одного большого
  // /src/entities/cart/model/cart-store.ts
  // /src/entities/products/model/products-store.ts
  // Соответствует FSD архитектуре проекта
  ```

---

## 6. SEO и производительность

### 6.1 SEO для Next.js App Router (вшит в Next.js)
- **Built-in:** Metadata API, `generateMetadata()`, file-based `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`
- **Гайд:** https://github.com/codinginflow/nextjs-seo (82 stars) — практические примеры

### 6.2 Рекомендуемые паттерны для проекта:
```ts
// app/sitemap.ts — динамический сайтмап для товаров
// app/robots.ts — robots.txt
// app/[locale]/opengraph-image.tsx — OG изображения
// metadata alternates + hreflang для мультиязычности
```

### 6.3 next-sitemap (если нужен legacy-подход)
- **URL:** https://github.com/iamvishnusankar/next-sitemap
- **Примечание:** для Next.js 16 + App Router предпочтительнее нативный `sitemap.ts`

---

## 7. Сборка и шаблоны

### 7.1 Next Elite (94 stars)
- **URL:** https://www.reactlibraries.com/starter-kits/next-elite-4ac2vl
- **Стек:** Next.js 16 + React 19 + better-auth + RBAC + next-intl + shadcn + Tailwind v4 + ESLint + Prettier + Vitest + Playwright + SEO + PWA
- **Применимо для:** референс production-ready архитектуры

### 7.2 Next.js 16 Boilerplate
- **URL:** https://github.com/AnwarHossainSR/nextjs-16-template
- **Что дает:** production-ready starter — Tailwind, shadcn/ui, Zod, form handling
- **Применимо для:** проверка best practices конфигурации

---

## 8. Утилиты и хуки

### 8.1 Полезные npm-пакеты для стека проекта (не в проекте, рекомендуются):

| Пакет | Зачем | Установка |
|-------|-------|-----------|
| `usehooks-ts` | 30+ type-safe React hooks (useMediaQuery, useLocalStorage, useDebounce) | `npm i usehooks-ts` |
| `nuqs` | Type-safe URL search params для Zustand-совместимого стора (фильтры каталога) | `npm i nuqs` |
| `react-intersection-observer` | useInView хук для lazy animations (если Framer Motion недостаточно) | `npm i react-intersection-observer` |
| `next-themes` | Если понадобится dark mode | `npm i next-themes` |
| `@vercel/og` | OG image generation (если динамические OG нужны без file-based подхода) | `npm i @vercel/og` |
| `sonner` | Toast notifications (для "добавлено в корзину") | `npm i sonner` |
| `vaul` | Drawer component (для мобильного фильтра каталога) | `npm i vaul` |

---

## 9. Архитектурные рекомендации на основе найденного

### 9.1 FSD (Feature-Sliced Design) — проект уже использует!
Структура `src/{app,components,entities,features,hooks,lib,pages,services,shared,types,widgets}` соответствует FSD. Это правильно.

### 9.2 Рендеринг-стратегия для Next.js 16:
- Каталог товаров → SSG + ISR (`generateStaticParams` + `revalidation`)
- Карточка товара → SSG + dynamic metadata
- Корзина/избранное → CSR через Zustand (клиентский store)
- 3D hero-секция → Client Component с динамическим импортом (`next/dynamic`, `ssr: false`)

### 9.3 3D-архитектура:
- React Three Fiber canvas должен быть отдельным Client Component
- Использовать `next/dynamic` с `ssr: false` для 3D-сцены
- GSAP ScrollTrigger для scroll-based 3D анимаций

---

## 10. Чек-лист интеграции (что проверить/добавить)

- [ ] **Lenis smooth scroll** — проверить интеграцию с GSAP ScrollTrigger
- [ ] **Embla Carousel** — проверить авто-play плагин для hero-слайдера
- [ ] **next-intl** — проверить `[locale]` роутинг + `generateStaticParams`
- [ ] **SEO** — `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, hreflang
- [ ] **Drei** — использовать `<Environment>`, `<Float>`, `<ContactShadows>` для 3D
- [ ] **R3F** — динамический импорт с `ssr: false`
- [ ] **Zustand** — persist middleware для корзины/избранного
- [ ] **usehooks-ts** — useMediaQuery для адаптивного переключения Embla/Swiper
- [ ] **Motion Primitives / Aceternity UI** — cherry-pick компоненты для hero
- [ ] **sonner** — тосты для действий пользователя
- [ ] **nuqs** — type-safe URL params для фильтров каталога

---

*Документ подготовлен для передачи кодеру. Дата: 2026-06-13*
