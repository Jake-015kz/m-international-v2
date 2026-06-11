import { memo } from "react";
import { Leaf, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";
import ProductCard from "./ProductCard";

const PRODUCTS = [
  {
    name: "MiCrystal",
    subtitle: "Здоровье глаз",
    description: "Клеточное питание для глаз. Экстракт бузины, лютеин, астаксантин.",
    color: "oklch(65% 0.14 75)",
    icon: <Leaf className="w-5 h-5" />,
    featured: true,
    image: "/images/products/micrystal.webp",
  },
  {
    name: "GreenMAX",
    subtitle: "Детокс",
    description: "Формула 3 в 1: очищение кишечника, восстановление микрофлоры, защита печени.",
    color: "oklch(55% 0.16 140)",
    icon: <Leaf className="w-5 h-5" />,
    featured: true,
    image: "/images/products/greenmax.png",
  },
  {
    name: "MiMAX",
    subtitle: "Антиоксидант",
    description: "Астаксантин — антиоксидант в 6000 раз мощнее витамина С.",
    color: "oklch(55% 0.18 25)",
    icon: <Leaf className="w-5 h-5" />,
    image: "/images/products/mimax.png",
  },
  {
    name: "BluMAX",
    subtitle: "Иммунитет и мозг",
    description: "Сине-зелёные водоросли AFA с нейропептидами. 60+ минералов.",
    color: "oklch(55% 0.14 230)",
    icon: <Leaf className="w-5 h-5" />,
    image: "/images/products/blumax.png",
  },
  {
    name: "NutriMAX",
    subtitle: "Белковый коктейль",
    description: "Растительный белок со спирулиной и хлореллой. Энергия и восстановление.",
    color: "oklch(60% 0.14 120)",
    icon: <Leaf className="w-5 h-5" />,
    image: "/images/products/nutrimax.png",
  },
  {
    name: "FlexiMAX",
    subtitle: "Здоровье суставов",
    description: "Растительный глюкозамин, куркума, гиалуроновая кислота.",
    color: "oklch(55% 0.12 60)",
    icon: <Leaf className="w-5 h-5" />,
    image: "/images/products/fleximax.png",
  },
  {
    name: "MachoMAN",
    subtitle: "Мужская сила",
    description: "Мака перуанская, L-аргинин, женьшень. Поддержка тестостерона.",
    color: "oklch(45% 0.16 350)",
    icon: <Leaf className="w-5 h-5" />,
    image: "/images/products/machoman.png",
  },
  {
    name: "MiTOWN",
    subtitle: "Кофе с кордицепсом",
    description: "100% арабика с кордицепсом. Энергия и бодрость.",
    color: "oklch(35% 0.08 40)",
    icon: <Leaf className="w-5 h-5" />,
    image: "/images/products/mitown2.webp",
  },
];

const ProductsSection = memo(function ProductsSection() {
  return (
    <section id="products" className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src="/images/sections/supplements.webp" alt="" className="w-full h-full object-cover opacity-5" loading="lazy" />
      </div>
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-50 border border-accent-100 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-accent-600" />
              <span className="text-xs font-unbounded font-bold text-accent-600 uppercase tracking-wider">Премиум качество</span>
            </div>
            <SectionHeader
              title="Наша продукция"
              description="Натуральные добавки для здоровья и долголетия"
            />
          </div>
        </ScrollReveal>

        {/* Product Grid */}
        <div className="mt-6 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {PRODUCTS.map((product, i) => (
            <ScrollReveal key={product.name} delay={i * 0.06}>
              <ProductCard
                name={product.name}
                subtitle={product.subtitle}
                description={product.description}
                color={product.color}
                icon={product.icon}
                index={i}
                featured={product.featured}
                image={product.image}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* CTA to full catalog */}
        <ScrollReveal delay={0.4}>
          <div className="mt-6 md:mt-12 text-center">
            <a href="/catalog" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-unbounded font-bold text-sm rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-emerald-900/20 min-h-[44px]">
              Смотреть весь каталог
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <p className="mt-3 md:mt-4 text-[11px] md:text-sm text-text-tertiary font-onest font-light">
              Все продукты сертифицированы • GMP стандарт • 100% натуральные компоненты
            </p>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
});

export default ProductsSection;
