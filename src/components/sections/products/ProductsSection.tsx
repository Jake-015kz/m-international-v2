import { Leaf } from "lucide-react";
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
    icon: <Leaf className="w-4 h-4" />,
    featured: true,
  },
  {
    name: "GreenMAX",
    subtitle: "Детокс",
    description: "Формула 3 в 1: очищение кишечника, восстановление микрофлоры, защита печени.",
    color: "oklch(55% 0.16 140)",
    icon: <Leaf className="w-4 h-4" />,
  },
  {
    name: "MiMAX",
    subtitle: "Антиоксидант",
    description: "Астаксантин — антиоксидант в 6000 раз мощнее витамина С.",
    color: "oklch(55% 0.18 25)",
    icon: <Leaf className="w-4 h-4" />,
  },
  {
    name: "BluMAX",
    subtitle: "Иммунитет и мозг",
    description: "Сине-зелёные водоросли AFA с нейропептидами. 60+ минералов.",
    color: "oklch(55% 0.14 230)",
    icon: <Leaf className="w-4 h-4" />,
  },
  {
    name: "NutriMAX",
    subtitle: "Белковый коктейль",
    description: "Растительный белок со спирулиной и хлореллой. Энергия и восстановление.",
    color: "oklch(60% 0.14 120)",
    icon: <Leaf className="w-4 h-4" />,
  },
  {
    name: "FlexiMAX",
    subtitle: "Здоровье суставов",
    description: "Растительный глюкозамин, куркума, гиалуроновая кислота.",
    color: "oklch(55% 0.12 60)",
    icon: <Leaf className="w-4 h-4" />,
  },
  {
    name: "MachoMAN",
    subtitle: "Мужская сила",
    description: "Мака перуанская, L-аргинин, женьшень. Поддержка тестостерона.",
    color: "oklch(45% 0.16 350)",
    icon: <Leaf className="w-4 h-4" />,
  },
  {
    name: "MiTOWN",
    subtitle: "Кофе с кордицепсом",
    description: "100% арабика с кордицепсом. Энергия и бодрость.",
    color: "oklch(35% 0.08 40)",
    icon: <Leaf className="w-4 h-4" />,
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="relative py-16 md:py-24 overflow-hidden bg-surface-alt">
      <BackgroundDecorations variant="section" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            title="Наша продукция"
            description="Натуральные добавки для здоровья и долголетия"
          />
        </ScrollReveal>

        {/* Product Grid — first card spans 2 cols, varied sizes */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
