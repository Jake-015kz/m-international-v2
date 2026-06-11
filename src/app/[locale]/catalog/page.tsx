import { Footer } from "@/components/sections/footer";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Sparkles, Shield, Leaf, Award } from "lucide-react";

const PRODUCTS = [
  {
    name: "MiCrystal",
    subtitle: "Здоровье глаз",
    description: "Клеточное питание для глаз. Экстракт бузины, лютеин, астаксантин. Снимает сухость и напряжение при работе за экраном.",
    benefits: ["Острота зрения", "Защита от сухости", "Снижение глазного давления"],
    composition: "Бузина, FloraGLO, лютеин, астаксантин.",
    image: "/images/products/micrystal.webp",
    color: "oklch(65% 0.14 75)",
    badge: "Хит",
  },
  {
    name: "GreenMAX",
    subtitle: "Детокс и очищение",
    description: "Формула 3 в 1: очищение кишечника, восстановление микрофлоры, защита печени. Пребиотики, клетчатка, антиоксиданты.",
    benefits: ["Очищает кишечник", "Восстанавливает микрофлору", "Защищает печень"],
    composition: "Корень лопуха, хлорофилл, расторопша, пробиотик.",
    image: "/images/products/greenmax.png",
    color: "oklch(55% 0.16 140)",
    badge: "Хит",
  },
  {
    name: "MiMAX",
    subtitle: "Антиоксидант",
    description: "Астаксантин — антиоксидант в 6000 раз мощнее витамина С. Замедляет старение, укрепляет сердце и сосуды.",
    benefits: ["Антиоксидантная защита", "Укрепление сердца", "Омоложение кожи"],
    composition: "Астаксантин, облепиха, черника, экстракт сосны.",
    image: "/images/products/mimax.png",
    color: "oklch(55% 0.18 25)",
  },
  {
    name: "BluMAX",
    subtitle: "Иммунитет и мозг",
    description: "Сине-зелёные водоросли AFA с нейропептидами. 60+ минералов для иммунитета, памяти и концентрации.",
    benefits: ["Укрепление иммунитета", "Улучшение памяти", "Очищение сосудов"],
    composition: "Водоросли AFA, шампиньоны, витамин С.",
    image: "/images/products/blumax.png",
    color: "oklch(55% 0.14 230)",
  },
  {
    name: "NutriMAX",
    subtitle: "Белковый коктейль",
    description: "Растительный белок со спирулиной и хлореллой. Энергия, восстановление, управление весом.",
    benefits: ["Восстановление после нагрузок", "Управление весом", "Укрепление костей"],
    composition: "Соевый протеин, спирулина, хлорелла, моринга.",
    image: "/images/products/nutrimax.png",
    color: "oklch(60% 0.14 120)",
  },
  {
    name: "FlexiMAX",
    subtitle: "Здоровье суставов",
    description: "Растительный глюкозамин, куркума, гиалуроновая кислота. Снимает боль, восстанавливает хрящи.",
    benefits: ["Снимает боль и воспаление", "Восстанавливает хрящи", "Возвращает подвижность"],
    composition: "Куркума, глюкозамин, гиалуроновая кислота, хондроитин.",
    image: "/images/products/fleximax.png",
    color: "oklch(55% 0.12 60)",
  },
  {
    name: "MachoMAN",
    subtitle: "Мужская сила",
    description: "Мака перуанская, L-аргинин, женьшень. Поддержка тестостерона, либидо и выносливости.",
    benefits: ["Повышение тестостерона", "Улучшение либидо", "Энергия и выносливость"],
    composition: "Мака перуанская, L-аргинин, женьшень, грейпфрут.",
    image: "/images/products/machoman.png",
    color: "oklch(45% 0.16 350)",
  },
  {
    name: "MiTOWN",
    subtitle: "Кофе с кордицепсом",
    description: "100% арабика с кордицепсом. Энергия и бодрость без побочных эффектов.",
    benefits: ["Энергия и бодрость", "Поддержка иммунитета", "Антиоксиданты"],
    composition: "100% арабика, экстракт кордицепса.",
    image: "/images/products/mitown2.webp",
    color: "oklch(35% 0.08 40)",
  },
];

export default function CatalogPage() {
  return (
    <main className="pt-14 md:pt-16">
      {/* Hero Banner */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/sections/catalog-hero.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-surface-base" />
        </div>
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-medium text-white/80">Премиум качество</span>
              </div>
              <h1 className="font-unbounded font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-3">Каталог продукции</h1>
              <p className="text-sm md:text-base text-white/60 font-onest">Натуральные добавки для здоровья и долголетия. Сертифицированная продукция.</p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Products Grid */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {PRODUCTS.map((product, i) => (
              <ScrollReveal key={product.name} delay={i * 0.05}>
                <div className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-surface-elevated border border-border-subtle hover:border-border-default transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  {/* Image */}
                  <div
                    className="relative h-44 sm:h-48 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${product.color}12 0%, ${product.color}20 100%)` }}
                  >
                    <img src={product.image} alt={product.name} className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    {product.badge && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                        <Sparkles className="w-3 h-3" style={{ color: product.color }} />
                        <span className="text-[10px] font-unbounded font-bold" style={{ color: product.color }}>{product.badge}</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-surface-elevated to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-5">
                    <span className="text-[10px] font-medium font-onest uppercase tracking-wider mb-1" style={{ color: product.color }}>{product.subtitle}</span>
                    <h3 className="font-onest font-bold text-base text-text-primary mb-2">{product.name}</h3>
                    <p className="text-xs text-text-secondary font-onest font-light leading-relaxed mb-3 line-clamp-2 flex-1">{product.description}</p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {product.benefits.map((b) => (
                        <span key={b} className="px-2 py-0.5 rounded-lg bg-surface-sunken text-[10px] text-text-secondary font-onest">{b}</span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-medium transition-all duration-300 group-hover:gap-3">
                      <span style={{ color: product.color }} className="font-onest font-bold">Подробнее</span>
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" style={{ color: product.color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                  </div>

                  <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 opacity-60" style={{ background: `linear-gradient(90deg, ${product.color}, transparent)` }} />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <Leaf className="w-5 h-5" />, title: "100% натурально", desc: "Только натуральные ингредиенты" },
              { icon: <Shield className="w-5 h-5" />, title: "Сертифицировано", desc: "GMP, ISO, Halal, FDA" },
              { icon: <Award className="w-5 h-5" />, title: "Гарантия качества", desc: "Контроль на каждом этапе" },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-3 p-4 rounded-2xl bg-surface-elevated border border-border-subtle">
                <div className="w-10 h-10 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 shrink-0">{f.icon}</div>
                <div>
                  <div className="font-onest font-bold text-sm text-text-primary">{f.title}</div>
                  <div className="text-xs text-text-secondary font-onest">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </main>
  );
}
