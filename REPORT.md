# Отчёт: парсинг сайта global.m.international

**Дата:** 13 июня 2026  
**Источник:** https://global.m.international  
**Метод:** анализ JS-бандла (SPA на React) + копирование фото из локального репозитория

---

## Общая статистика

| Показатель | Значение |
|---|---|
| Найдено маршрутов на сайте | 34 |
| Товарных маршрутов (/products/*) | 15 |
| Информационных страниц | 15 |
| Утилитарных страниц | 4 |
| Категорий товаров | 8 |
| Уникальных товаров (с фото) | 10 |
| Всего файлов в category_structure | 54 |
| Из них изображений | 46 |
| Из них JSON-метаданных | 8 |
| Ошибок при скачивании | 0 |

---

## Структура категорий и товаров

### 1. Detox (Детокс) — 2 товара, 7 фото

```
detox/
├── greenmax/          — GreenMAX (Хит, 6 500 ₸, ★4.9, 256 отзывов)
│   ├── greenmax.avif
│   ├── greenmax.png
│   ├── greenmax.webp
│   └── meta.json
└── mitown/            — Mi Town (4 900 ₸, ★4.9, 312 отзывов)
    ├── mitown2.avif
    ├── mitown2.webp
    └── meta.json
```

### 2. Immunity (Иммунитет) — 2 товара, 8 фото

```
immunity/
├── blumax/            — BluMAX (9 500 ₸, ★4.7, 167 отзывов)
│   ├── blumax.avif
│   ├── blumax.png
│   ├── blumax.webp
│   └── meta.json
└── mimax/             — MiMAX (7 200 ₸, ★4.6, 89 отзывов)
    ├── mimax.avif
    ├── mimax.png
    ├── mimax.webp
    └── meta.json
```

### 3. Joints (Суставы) — 1 товар, 4 фото

```
joints/
└── fleximax/          — FleXiMAX (11 000 ₸, ★4.4, 72 отзыва)
    ├── fleximax.avif
    ├── fleximax.png
    ├── fleximax.webp
    └── meta.json
```

### 4. Nutrition (Питание) — 1 товар, 4 фото

```
nutrition/
└── nutrimax/          — NutriMAX (5 400 ₸, ★4.5, 98 отзывов)
    ├── nutrimax.avif
    ├── nutrimax.png
    ├── nutrimax.webp
    └── meta.json
```

### 5. Vision (Зрение) — 1 товар, 3 фото

```
vision/
└── micrystal/         — MiCrystal (Хит, 8 900 ₸, ★4.8, 124 отзыва)
    ├── micrystal.avif
    ├── micrystal.webp
    └── meta.json
```

### 6. Men's (Мужское здоровье) — 1 товар, 4 фото

```
mens/
└── machoman/          — Macho Man (8 200 ₸, ★4.3, 55 отзывов)
    ├── machoman.avif
    ├── machoman.png
    ├── machoman.webp
    └── meta.json
```

### 7. Плоские дубликаты (без метаданных)

Эти папки содержат только фото, без meta.json — вероятно, дубли товаров из категорий выше:

```
blumax/                — 3 фото (blumax_01.avif, blumax_02.png, blumax_03.webp)
fleximax/              — 3 фото (fleximax_01.avif, fleximax_02.png, fleximax_03.webp)
greenmax/              — 3 фото (greenmax_01.avif, greenmax_02.png, greenmax_03.webp)
macho-man/             — 3 фото (macho-man_01.avif, macho-man_02.png, macho-man_03.webp)
mi-town/               — 2 фото (mi-town_01.avif, mi-town_02.webp)
micrystal/             — 2 фото (micrystal_01.avif, micrystal_02.webp)
mimax/                 — 3 фото (mimax_01.avif, mimax_02.png, mimax_03.webp)
nutrimax/              — 3 фото (nutrimax_01.avif, nutrimax_02.png, nutrimax_03.webp)
```

### 8. Старые товары

```
_old_products/         — MishRoom (снят с производства)
    ├── mishroom.avif
    └── mishroom.webp
```

---

## Полное дерево директорий

```
category_structure/
├── _old_products/
│   ├── mishroom.avif
│   └── mishroom.webp
├── blumax/
│   ├── blumax_01.avif
│   ├── blumax_02.png
│   └── blumax_03.webp
├── detox/
│   ├── greenmax/
│   │   ├── greenmax.avif
│   │   ├── greenmax.png
│   │   ├── greenmax.webp
│   │   └── meta.json
│   └── mitown/
│       ├── mitown2.avif
│       ├── mitown2.webp
│       └── meta.json
├── fleximax/
│   ├── fleximax_01.avif
│   ├── fleximax_02.png
│   └── fleximax_03.webp
├── greenmax/
│   ├── greenmax_01.avif
│   ├── greenmax_02.png
│   └── greenmax_03.webp
├── immunity/
│   ├── blumax/
│   │   ├── blumax.avif
│   │   ├── blumax.png
│   │   ├── blumax.webp
│   │   └── meta.json
│   └── mimax/
│       ├── mimax.avif
│       ├── mimax.png
│       ├── mimax.webp
│       └── meta.json
├── joints/
│   └── fleximax/
│       ├── fleximax.avif
│       ├── fleximax.png
│       ├── fleximax.webp
│       └── meta.json
├── macho-man/
│   ├── macho-man_01.avif
│   ├── macho-man_02.png
│   └── macho-man_03.webp
├── mens/
│   └── machoman/
│       ├── machoman.avif
│       ├── machoman.png
│       ├── machoman.webp
│       └── meta.json
├── mi-town/
│   ├── mi-town_01.avif
│   └── mi-town_02.webp
├── micrystal/
│   ├── micrystal_01.avif
│   └── micrystal_02.webp
├── mimax/
│   ├── mimax_01.avif
│   ├── mimax_02.png
│   └── mimax_03.webp
├── nutrimax/
│   ├── nutrimax_01.avif
│   ├── nutrimax_02.png
│   └── nutrimax_03.webp
├── nutrition/
│   └── nutrimax/
│       ├── nutrimax.avif
│       ├── nutrimax.png
│       ├── nutrimax.webp
│       └── meta.json
└── vision/
    └── micrystal/
        ├── micrystal.avif
        ├── micrystal.webp
        └── meta.json
```

---

## Товары, найденные на сайте, но НЕ скачанные

Следующие маршруты `/products/*` были обнаружены при краулинге, но отсутствуют в `category_structure`:

| Маршрут | Примечание |
|---|---|
| `/products/essential-oil` | Нет фото в public/images/products/ |
| `/products/mi-mask` | Нет фото в public/images/products/ |
| `/products/mi-serum` | Нет фото в public/images/products/ |
| `/products/mishroom` | Есть только в `_old_products/` (2 фото) |
| `/products/relax` | Нет фото в public/images/products/ |
| `/products/ye-katerina` | Нет фото в public/images/products/ |

**Причина:** исходные изображения отсутствовали в папке `public/images/products/` репозитория. Скачано всё, что было доступно.

---

## Ошибки

Ошибок при скачивании и копировании файлов не обнаружено. Все 22 файла успешно скопированы (0 дубликатов, 0 пропущенных источников, 0 ошибок).

---

## Примечания

1. **Дубликаты фото:** Товары blumax, fleximax, greenmax, machoman, micrystal, mimax, nutrimax существуют в двух экземплярах — в папках категорий (с meta.json) и в плоских папках (только фото). Плоские папки, вероятно, являются артефактом предыдущего этапа парсинга.

2. **Форматы изображений:** Большинство товаров имеют 3 формата (avif, png, webp). Некоторые (mitown, micrystal) — только 2 формата.

3. **MishRoom** — единственный товар в `_old_products/`, помечен как старый/снятый с производства.

4. **Валюта цен:** Тенге (₸) — на основании данных из meta.json.
