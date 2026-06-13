# M-International — Реестр скиллов проекта

> Дата: 2026-06-13
> Стек: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, GSAP, Framer Motion, Three.js
> Рынок: CIS/СНГ (русский/казахский/английский)

## Структура

```
.hermes/
├── skills.yaml          # Полная YAML-конфигурация (25 скиллов, 3 тиера)
├── skills.json          # Компактный JSON-маппинг для кодера
└── skills/
    ├── SKILLS_MAP.md    # Маппинг всех 89 скиллов по категориям
    ├── aliases.json     # Алиасы для быстрого доступа (53  alias -> skill)
    └── shadcn-ui-nextjs/  # Локальный проектный скилл
        └── SKILL.md
SKILLS_ANALYSIS.md       # Детальный анализ и обоснование выбора (25 из 89)
TOOLS-RESEARCH.md        # Анализ библиотек и инструментов стека
```

## Tier 1 — Критические (5)

| # | Скилл | Alias | Когда использовать |
|---|-------|-------|-------------------|
| 1 | `nextjs-cis-premium` | `nextjs` | Архитектура, компоненты, App Router, RSC |
| 2 | `frontend-design` | `custom-ui` | UI-компоненты, страницы, anti-slop |
| 3 | `premium-web-patterns` | `premium`, `scroll`, `glass` | Hero, bento, glassmorphism, scroll-driven |
| 4 | `animation-patterns` | `animations` | Framer Motion, GSAP, CSS anim, performance |
| 5 | `a11y-accessibility` | `a11y` | WCAG 2.2, ARIA, keyboard nav, contrast |

## Tier 2 — Высокие (10)

| # | Скилл | Alias | Когда использовать |
|---|-------|-------|-------------------|
| 6 | `design-taste-frontend` | — | Metric-based UI, GPU acceleration |
| 7 | `motion-nextjs` | `framer-motion` | Сложные Framer Motion анимации |
| 8 | `web-motion` | `wp-motion` | Отладка/ревью анимаций |
| 9 | `humanizer-ru` | `humanize-ru` | Редактура RU текстов |
| 10 | `humanizer` | `humanize-en` | Редактура EN текстов |
| 11 | `react-security` | `security` | OWASP Top 10:2025 аудит |
| 12 | `react-structure` | `structure` | Feature-first архитектура |
| 13 | `shadcn-skills` | `components`, `forms`, `theme` | shadcn/ui компоненты |
| 14 | `requesting-code-review` | — | Pre-commit quality gates |
| 15 | `dogfood` | `qa` | Exploratory QA перед релизом |

## Tier 3 — Специализированные (10)

| # | Скилл | Alias | Когда использовать |
|---|-------|-------|-------------------|
| 16 | `sketch` | `sketch` | HTML mockups 2-3 варианта |
| 17 | `claude-design` | `prototype` | One-off HTML prototypes |
| 18 | `excalidraw` | — | Диаграммы архитектуры |
| 19 | `architecture-diagram` | `diagram` | SVG диаграммы |
| 20 | `systematic-debugging` | `debug` | 4-phase root cause debugging |
| 21 | `simplify-code` | `simplify` | Рефакторинг кода |
| 22 | `spike` | `spike` | Эксперименты перед билдом |
| 23 | `plan` | `plan` | Планирование фич |
| 24 | `test-driven-development` | `test` | TDD для критичных компонентов |
| 25 | `codebase-inspection` | `inspect` | Метрики кодовой базы |

## Быстрый доступ по алиасам (топ-20)

```
ui          -> shadcn-ui-nextjs  (локальный)
animations  -> animation-patterns
premium     -> premium-web-patterns
nextjs      -> nextjs-cis-premium
security    -> react-security
a11y        -> a11y-accessibility
custom-ui   -> frontend-design
components  -> shadcn-ui-nextjs
forms       -> shadcn-ui-nextjs
design      -> ui-ux-pro-max
debug       -> systematic-debugging
qa          -> dogfood
deploy      -> github-pr-workflow
review      -> github-code-review
humanize-ru -> humanizer-ru
humanize-en -> humanizer
framer      -> motion-nextjs
scroll      -> premium-web-patterns
sketch      -> sketch
prototype   -> claude-design
```

## Статистика

- Всего доступно: **89** скиллов
- Выбрано для проекта: **25** (28%)
- Tier 1 (критические): **5**
- Tier 2 (высокие): **10**
- Tier 3 (специализированные): **10**
- Локальных скиллов: **1** (shadcn-ui-nextjs)
- Алиасов: **53**
