# ACTION_PLAN — M-International V2

Последовательный план действий с атомарными шагами.
Статусы: `[ ]` pending | `[x]` done | `[~]` in progress

---

## ФАЗА 0: Пред-деплой проверка

### 0.1 Сборка
- [ ] `cd /storage/repos/m-international-v2 && npm run build` — без ошибок
- [ ] Нет TypeScript ошибок (`tsc --noEmit`)
- [ ] Нет ESLint warnings (`npm run lint`)

### 0.2 Критическая функциональность
- [ ] Главная страница рендерится (Hero, Products, About, Business, CTA, Footer)
- [ ] Навигация работает (все ссылки ведут на правильные роуты)
- [ ] Мультиязычность: `/ru`, `/en`, `/kk` — все страницы доступны
- [ ] Страницы `/about`, `/catalog`, `/contacts` рендерятся без ошибок
- [ ] Все изображения загружаются (нет битых src)

### 0.3 Ассеты
- [ ] Favicon на месте (`/public/favicon.ico`)
- [ ] OG-изображения сгенерированы (`/public/og-image.png`, 1200×630)
- [ ] Шрифты Unbounded + Onest подключены (self-hosted или Google Fonts)
- [ ] Все продуктовые фото в `/public/products/`

---

## ФАЗА 1: Деплой на Vercel

### 1.1 Подготовка
- [ ] Убедиться, что `main` ветка актуальна (`git push origin main`)
- [ ] `vercel.json` или настройки проекта в Vercel dashboard корректны
- [ ] Environment variables заданы в Vercel:
  - `NEXT_PUBLIC_SITE_URL` = `https://m-international.kz`
  - Прочие API ключи (если есть)

### 1.2 Деплой
- [ ] `vercel --prod` или push → auto-deploy через GitHub integration
- [ ] Build прошёл успешно в Vercel (логи без ошибок)
- [ ] Preview URL открывается

### 1.3 DNS
- [ ] Домен `m-international.kz` привязан к Vercel
- [ ] SSL сертификат активен (https работает)
- [ ] `www.m-international.kz` → редирект на `m-international.kz` (или наоборот)

---

## ФАЗА 2: Пост-деплой верификация

### 2.1 Smoke test (5 минут)
- [ ] `curl -I https://m-international.kz` → 200 OK
- [ ] Главная загружается в браузере (визуально корректно)
- [ ] Лого отображается
- [ ] Hero-секция видна без скролла
- [ ] CTA кнопки кликабельны

### 2.2 Кросс-браузер
- [ ] Chrome (desktop + mobile)
- [ ] Safari (desktop + iOS)
- [ ] Firefox
- [ ] Samsung Internet (Android)

### 2.3 Мобильная адаптивность
- [ ] iPhone (375px) — нет горизонтального скролла
- [ ] iPad (768px) — layout корректен
- [ ] Touch targets ≥ 44px
- [ ] Навигация на мобильном работает

### 2.4 Производительность
- [ ] Lighthouse Performance ≥ 80
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Largest Contentful Paint (LCP) < 2.5s
- [ ] Cumulative Layout Shift (CLS) < 0.1
- [ ] Изображения оптимизированы (WebP/AVIF, lazy loading)

### 2.5 SEO
- [ ] `<title>` и `<meta description>` заполнены на всех страницах
- [ ] `sitemap.xml` генерируется (`/sitemap.xml`)
- [ ] `robots.txt` корректен
- [ ] Open Graph теги работают (проверка через Facebook Debugger)
- [ ] JSON-LD структурированные данные валидны (Google Rich Results Test)

---

## ФАЗА 3: Контент и тексты

### 3.1 Тексты
- [ ] Все тексты проверены humanizer-ru (нет AI-следов)
- [ ] Заголовки компактные (1-3 строки на экран)
- [ ] Нет negative letter-spacing на кириллице
- [ ] Тексты на 3 языках (ru, en, kk) — полное покрытие

### 3.2 Медиа
- [ ] Hero видео/изображение загружается быстро (< 1MB для первого экрана)
- [ ] Продуктовые фото качественные, единый стиль
- [ ] Сертификаты (GMP, ISO, HALAL) — реальные изображения, не плейсхолдеры

---

## ФАЗА 4: Аналитика и мониторинг

### 4.1 Аналитика
- [ ] Google Analytics 4 подключён (Measurement ID в env)
- [ ] Яндекс.Метрика подключена (если нужна)
- [ ] Целевые события настроены:
  - `cta_click` — клик по CTA кнопке
  - `product_view` — просмотр продукта
  - `contact_submit` — отправка формы

### 4.2 Мониторинг
- [ ] Vercel Analytics включён
- [ ] Uptime мониторинг настроен (UptimeRobot или аналог)
- [ ] Error tracking (Sentry или Vercel logs)

---

## ФАЗА 5: Безопасность

- [ ] HTTPS принудительный (HSTS header)
- [ ] Security headers настроены (`next.config.ts`):
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Content-Security-Policy` (минимально необходимая)
- [ ] Нет секретов в клиентском коде (только `NEXT_PUBLIC_*` префиксы)
- [ ] Rate limiting на API routes (если есть)

---

## ФАЗА 6: Финальная полировка

### 6.1 Анимации
- [ ] `prefers-reduced-motion` — анимации отключаются
- [ ] Page-load анимация плавная (stagger 0.06s)
- [ ] Scroll reveal работает корректно
- [ ] Hover-эффекты только на non-touch устройствах
- [ ] Lenis smooth scroll работает без рывков

### 6.2 Доступность
- [ ] Все изображения имеют `alt` текст
- [ ] Формы имеют `label` и `aria-` атрибуты
- [ ] Контрастность текста ≥ 4.5:1 (WCAG AA)
- [ ] Навигация с клавиатуры работает (Tab, Enter, Escape)

### 6.3 Наполнение
- [ ] Все плейсхолдеры заменены реальным контентом
- [ ] Контактные данные актуальны
- [ ] Социальные ссылки работают
- [ ] Форма обратной связи отправляет данные

---

## Порядок выполнения

```
ФАЗА 0 (пред-деплой)  →  ФАЗА 1 (деплой)  →  ФАЗА 2 (верификация)
       ↓                        ↓                      ↓
  блокирующий              блокирующий             блокирующий
       ↓                        ↓                      ↓
  ФАЗА 3 (контент)  →  ФАЗА 4 (аналитика)  →  ФАЗА 5 (безопасность)
       ↓                        ↓                      ↓
  параллельно с           после деплоя            после деплоя
  ФАЗА 1                  ↓                        ↓
                        ФАЗА 6 (полировка)  ←  ФАЗА 6
                              ↓
                         ✅ LAUNCH
```

---

## Контрольные точки

| # | Чекпоинт | Критерий готовности |
|---|----------|-------------------|
| 1 | Build проходит | `npm run build` → exit 0 |
| 2 | Деплой успешен | Vercel URL возвращает 200 |
| 3 | Домен работает | `https://m-international.kz` открывается |
| 4 | Контент заполнен | Нет плейсхолдеров |
| 5 | Аналитика живой | События поступают в GA4 |
| 6 | Безопасность | Security headers A+ (securityheaders.com) |
| 7 | ✅ LAUNCH | Все чекпоинты пройдены |
