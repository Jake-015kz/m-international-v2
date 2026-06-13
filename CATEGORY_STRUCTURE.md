# Структура категорий — M-International v2

## Обзор

Сайт использует **клиентскую фильтрацию** — все продукты загружаются на одну страницу `/catalog`, фильтрация по категориям происходит через JS (useState + useMemo).

**Источник данных:** `src/components/sections/products/ProductsSection.tsx` (строки 67-188)

---

## Иерархия категорий

### Каталог (/catalog) — корневая страница

| # | Категория (filter_key) | RU | EN | Продуктов | Товары |
|---|---|---|---|---|---|
| 1 | **vision** | Зрение | Vision | 1 | MiCrystal |
| 2 | **detox** | Детокс | Detox | 2 | GreenMAX, Mi Town* |
| 3 | **immunity** | Иммунитет | Immunity | 2 | MiMAX, BluMAX |
| 4 | **nutrition** | Питание | Nutrition | 1 | NutriMAX |
| 5 | **joints** | Суставы | Joints | 1 | FleXiMAX |
| 6 | **mens** | Мужское | Men's Health | 1 | Macho Man |

\* Mi Town — в ProductsSection привязан к `category: "nutrition"`, но по смыслу (subtitle "Детокс-кофе") относится к детоксу.

---

## Полная таблица продуктов

| Продукт | Slug | Категория | Цена (₸) | Старая | Рейтинг | Отзывы | Бейдж | Featured |
|---|---|---|---|---|---|---|---|---|
| MiCrystal | micrystal | vision | 8,900 | 12,500 | 4.8 | 124 | Хит | Да |
| GreenMAX | greenmax | detox | 6,500 | — | 4.9 | 256 | Хит | Да |
| MiMAX | mimax | immunity | 7,200 | 8,900 | 4.6 | 89 | — | Нет |
| BluMAX | blumax | immunity | 9,500 | — | 4.7 | 167 | — | Нет |
| NutriMAX | nutrimax | nutrition | 5,400 | 7,200 | 4.5 | 98 | — | Нет |
| FleXiMAX | fleximax | joints | 11,000 | — | 4.4 | 72 | — | Нет |
| Macho Man | machoman | mens | 8,200 | 10,000 | 4.3 | 55 | — | Нет |
| Mi Town | mitown | nutrition* | 4,900 | — | 4.9 | 312 | — | Нет |

---

## Пути категорий (URL)

### Новый сайт (v2)
- Каталог: `/catalog` (или `/{locale}/catalog`)
- Фильтр: `/catalog?filter={category_key}` (клиентский, без серверного роута)
- Модалка продукта: открывается на той же странице через ProductModal

### Старый сайт (crawl_report.json)
- Лендинг: `/products`
- Карточка: `/products/{slug}` (серверный роутинг)

### Навигация (Navbar.tsx)
```
/           → Главная
/catalog    → Каталог
/about      → О компании
/contacts   → Контакты
```

---

## Продукты, отсутствующие в новом коде

6 продуктов со старого сайта **не добавлены** в ProductsSection.tsx:

| Slug | Старый URL | Статус |
|---|---|---|
| essential-oil | /products/essential-oil | ❌ Нет в коде |
| mi-mask | /products/mi-mask | ❌ Нет в коде |
| mi-serum | /products/mi-serum | ❌ Нет в коде |
| mishroom | /products/mishroom | ❌ Нет в коде |
| relax | /products/relax | ❌ Нет в коде |
| ye-katerina | /products/ye-katerina | ❌ Нет в коде |

**Рекомендация:** добавить эти 6 продуктов в массив `allProducts` в ProductsSection.tsx (строки 67-188) с соответствующими категориями, ценами и изображениями.

---

## Источники данных

| Файл | Что содержит |
|---|---|
| `src/components/sections/products/ProductsSection.tsx` | 8 продуктов, 6 категорий-фильтров, цены, рейтинги |
| `src/components/layout/Navbar.tsx` | Навигация: /, /catalog, /about, /contacts |
| `src/messages/ru.json` | i18n названия, описания, составы, benefits |
| `crawl_report.json` | 14 продуктов со старого сайта (global.m.international) |
| `product_images.json` | URL изображений для 8 продуктов на m-international.kz |
