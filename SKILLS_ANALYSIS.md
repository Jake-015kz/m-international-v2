# M-International — Анализ и фильтрация скиллов

> Дата: 2026-06-13
> Стек: Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, GSAP, Framer Motion, Three.js, Zustand, Zod
> Тип проекта: Премиальный маркетинговый лендинг (MLM/БАДы) для СНГ-рынка

---

## Методология фильтрации

Из 89 доступных скиллов отобраны по 3 критериям:
1. **Непосредственно применим** к текущему стеку и типу проекта
2. **Решает реальную задачу** на текущем этапе разработки
3. **Не дублирует** уже установленные инструменты

Исключены: ML/AI скиллы (mlops, data-science), утилитарные (email, social-media, smart-home, note-taking, productivity), инфраструктурные не относящиеся к фронтенду.

---

## ТIER 1 — КРИТИЧЕСКИ ВАЖНЫЕ (использовать немедленно)

### 1. `nextjs-cis-premium` (frontend)
**Почему:** Заточен под стек проекта (Next.js 16 + React 19 + TS + Tailwind 4) и СНГ-рынок. Содержит паттерны App Router, Server Components, GSAP, Lenis — всё что уже в проекте.
**Применение:** Архитектурные решения, паттерны компонентов, лучшие практики.

### 2. `frontend-design` (frontend)
**Почему:** Создаёт отличительные production-grade интерфейсы, избегая generic AI aesthetics — прямо соответствует философии "Anti-slop" из DESIGN.md.
**Применение:** Разработка уникальных компонентов, визуальных решений.

### 3. `premium-web-patterns` (design)
**Почему:** Паттерны премиального веб-дизайна (bento grids, scroll-driven animations, glassmorphism, marquee, gradient borders). Адаптирован под СНГ-аудиторию (компактная типографика, без negative letter-spacing на кириллице).
**Применение:** Hero-секции, карточки, анимации, интерактивные элементы.

### 4. `animation-patterns` (design)
**Почему:** Покрывает Framer Motion, GSAP, CSS animations, scroll-triggered animations — все инструменты проекта. Содержит performance budgets.
**Применение:** Все анимации на сайте — page transitions, scroll reveal, hover states.

### 5. `a11y-accessibility` (frontend)
**Почему:** WCAG 2.2 AA compliance — критично для продакшена. ARIA, keyboard navigation, screen reader support.
**Применение:** Аудит и исправление доступности всех компонентов.

---

## TIER 2 — ВЫСОКО ПОЛЕЗНЫЕ (использовать на следующих этапах)

### 6. `design-taste-frontend` (design)
**Почему:** Senior UI/UX Engineer подход с metric-based rules, strict component architecture, CSS hardware acceleration. Помогает избежать "AI slop" дизайна.
**Применение:** Архитектура компонентов, оптимизация CSS.

### 7. `motion-nextjs` (design)
**Почему:** Глубокое покрытие Framer Motion для React/Next.js 16 — scroll-анимации, layout-анимации, жесты, page transitions.
**Применение:** Сложные анимационные последовательности.

### 8. `web-motion` (design)
**Почему:** Закрывает "agentic coding loop" для веб-анимаций — запись, анализ кадров, диагностика проблем с timing/easing.
**Применение:** Отладка и полировка анимаций.

### 9. `humanizer-ru` (design)
**Почему:** Редактор русского текста — убирает AI-признаки, канцелярит, воду. 21 паттерн + жёсткие запреты. Критичен для контента на русском.
**Применение:** Редактирование всех текстов сайта.

### 10. `humanizer` (creative)
**Почему:** Аналогично humanizer-ru, но для английского контента.
**Применение:** Редактирование англоязычного контента.

### 11. `react-security` (frontend)
**Почему:** OWASP Top 10:2025 для React 19 + Next.js 16. Безопасность продакшена.
**Применение:** Аудит безопасности перед деплоем.

### 12. `react-structure` (frontend)
**Почему:** Feature-first enterprise-grade React architecture. TypeScript strict, изоляция фич, границы доступа к данным.
**Применение:** Рефакторинг архитектуры при росте проекта.

### 13. `shadcn-skills` (frontend)
**Почему:** Установка, компоненты, блоки, формы, theming для shadcn/ui — уже в проекте (shadcn 4.11.0).
**Применение:** Работа с UI-компонентами shadcn.

### 14. `requesting-code-review` (software-development)
**Почему:** Pre-commit review — security scan, quality gates, auto-fix. Автоматизация проверок.
**Применение:** Настройка CI/CD pipeline.

### 15. `dogfood` (dogfood)
**Почему:** Exploratory QA — поиск багов, доказательства, отчёты. Перед деплоем.
**Применение:** Тестирование перед релизом.

---

## TIER 3 — СПЕЦИАЛИЗИРОВАННЫЕ (использовать при необходимости)

### 16. `sketch` (creative)
**Почему:** Быстрые HTML mockups — 2-3 варианта дизайна для сравнения.
**Применение:** Прототипирование новых секций.

### 17. `claude-design` (creative)
**Почему:** Дизайн one-off HTML artifacts (landing, deck, prototype).
**Применение:** Быстрое прототипирование.

### 18. `excalidraw` (creative)
**Почему:** Hand-drawn диаграммы (arch, flow, seq) для документации.
**Применение:** Документация архитектуры.

### 19. `architecture-diagram` (creative)
**Почему:** Dark-themed SVG диаграммы для презентаций.
**Применение:** Презентационные материалы.

### 20. `systematic-debugging` (software-development)
**Почему:** 4-phase root cause debugging — системный подход к отладке.
**Применение:** Сложные баги.

### 21. `simplify-code` (software-development)
**Почему:** Parallel 3-agent cleanup — рефакторинг кода.
**Применение:** Рефакторинг после активной разработки.

### 22. `spike` (software-development)
**Почему:** Throwaway experiments для валидации идей перед реализацией.
**Применение:** Тестирование новых подходов.

### 23. `plan` (software-development)
**Почему:** Планирование задач с конкретными шагами и кодом.
**Применение:** Планирование крупных фич.

### 24. `test-driven-development` (software-development)
**Почему:** TDD подход — тесты до кода.
**Применение:** Критичные компоненты.

### 25. `codebase-inspection` (github)
**Почему:** Анализ кодовой базы — LOC, языки, соотношения.
**Применение:** Метрики проекта.

---

## ИСКЛЮЧЕННЫЕ СКИЛЛЫ (не релевантны)

### ML/AI (14 скиллов)
`audiocraft-audio-generation`, `evaluating-llms-harness`, `huggingface-hub`, `llama-cpp`, `segment-anything-model`, `serving-llms-vllm`, `weights-and-biases`, `jupyter-live-kernel`, `arxiv`, `llm-wiki`, `polymarket`, `research-paper-writing`, `blogwatcher`
**Причина:** Не относятся к веб-разработке лендинга.

### Утилитарные (12 скиллов)
`himalaya` (email), `xurl` (twitter), `openhue` (smart home), `obsidian` (notes), `airtable`, `google-workspace`, `maps`, `nano-pdf`, `notion`, `ocr-and-documents`, `powerpoint`, `teams-meeting-pipeline`
**Причина:** Не относятся к задачам разработки сайта.

### Инфраструктурные не для фронтента (8 скиллов)
`docker-management`, `github-auth`, `github-code-review`, `github-issues`, `github-pr-workflow`, `github-repo-management`, `watchers`, `hermes-optimizer`
**Причина:** DevOps/Backend задачи, не фронтенд разработка.

### Медиа-генерация (4 скиллов)
`comfyui`, `manim-video`, `p5js`, `ascii-video`
**Причина:** Специализированные инструменты генерации, не для лендинга.

### Дублирующиеся / слишком общие (6 скиллов)
`claude-code`, `codex`, `opencode` — делегирование кода, не скиллы для проекта
`hermes-agent` — конфигурация Hermes, не разработка
`Skill Factory` — мета-скилл, не применим напрямую
`yuanbao` — групповые чаты, не разработка

---

## СВОДНАЯ ТАБЛИЦА

| # | Скилл | Tier | Категория | Приоритет |
|---|-------|------|-----------|-----------|
| 1 | nextjs-cis-premium | 1 | frontend | Критический |
| 2 | frontend-design | 1 | frontend | Критический |
| 3 | premium-web-patterns | 1 | design | Критический |
| 4 | animation-patterns | 1 | design | Критический |
| 5 | a11y-accessibility | 1 | frontend | Критический |
| 6 | design-taste-frontend | 2 | design | Высокий |
| 7 | motion-nextjs | 2 | design | Высокий |
| 8 | web-motion | 2 | design | Высокий |
| 9 | humanizer-ru | 2 | design | Высокий |
| 10 | humanizer | 2 | creative | Высокий |
| 11 | react-security | 2 | frontend | Высокий |
| 12 | react-structure | 2 | frontend | Высокий |
| 13 | shadcn-skills | 2 | frontend | Высокий |
| 14 | requesting-code-review | 2 | dev | Высокий |
| 15 | dogfood | 2 | qa | Высокий |
| 16 | sketch | 3 | creative | Средний |
| 17 | claude-design | 3 | creative | Средний |
| 18 | excalidraw | 3 | creative | Средний |
| 19 | architecture-diagram | 3 | creative | Средний |
| 20 | systematic-debugging | 3 | dev | Средний |
| 21 | simplify-code | 3 | dev | Средний |
| 22 | spike | 3 | dev | Средний |
| 23 | plan | 3 | dev | Средний |
| 24 | test-driven-development | 3 | dev | Средний |
| 25 | codebase-inspection | 3 | github | Средний |

**Итого:** 25 релевантных скиллов из 89 (28%).
Tier 1: 5 | Tier 2: 10 | Tier 3: 10

---

## Файлы конфигурации

| Файл | Формат | Назначение |
|------|--------|------------|
| `.hermes/skills.yaml` | YAML | Полная конфигурация с описаниями и приоритетами |
| `.hermes/skills.json` | JSON | Компактный маппинг для быстрого доступа кодером |
| `SKILLS_ANALYSIS.md` | Markdown | Детальный анализ и обоснование выбора |
| `TOOLS-RESEARCH.md` | Markdown | Анализ библиотек и инструментов стека |
