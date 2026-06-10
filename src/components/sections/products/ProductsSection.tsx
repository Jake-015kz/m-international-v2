import { Droplets, Leaf, Shield, Heart, Brain, Bone, Sparkles, Coffee } from "lucide-react";
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
    color: "#b8942e",
    icon: <Droplets className="w-4 h-4" />,
  },
  {
    name: "GreenMAX",
    subtitle: "Детокс",
    description: "Формула 3 в 1: очищение кишечника, восстановление микрофлоры, защита печени.",
    color: "#4a8e30",
    icon: <Leaf className="w-4 h-4" />,
  },
  {
    name: "MiMAX",
    subtitle: "Антиоксидант",
    description: "Астаксантин — антиоксидант в 6000 раз мощнее витамина С.",
    color: "#c85020",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    name: "BluMAX",
    subtitle: "Иммунитет и мозг",
    description: "Сине-зелёные водоросли AFA с нейропептидами. 60+ минералов.",
    color: "#2e7aa8",
    icon: <Brain className="w-4 h-4" />,
  },
  {
    name: "NutriMAX",
    subtitle: "Белковый коктейль",
    description: "Растительный белок со спирулиной и хлореллой. Энергия и восстановление.",
    color: "#6b8e23",
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    name: "FlexiMAX",
    subtitle: "Здоровье суставов",
    description: "Растительный глюкозамин, куркума, гиалуроновая кислота.",
    color: "#8b6914",
    icon: <Bone className="w-4 h-4" />,
  },
  {
    name: "MachoMAN",
    subtitle: "Мужская сила",
    description: "Мака перуанская, L-аргинин, женьшень. Поддержка тестостерона.",
    color: "#8b2252",
    icon: <Heart className="w-4 h-4" />,
  },
  {
    name: "MiTOWN",
    subtitle: "Кофе с кордицепсом",
    description: "100% арабика с кордицепсом. Энергия и бодрость.",
    color: "#3c2415",
    icon: <Coffee className="w-4 h-4" />,
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="relative py-16 md:py-24 overflow-hidden bg-[#F7F7F7]">
      {/* Background decorations */}
      <BackgroundDecorations variant="section" accentColor="#10b981" />

      <Container className="relative z-10">
        <ScrollReveal>
          <SectionHeader
            badge={
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/5 bg-white/60 backdrop-blur-sm">
                <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[9px] md:text-[10px] font-medium uppercase tracking-wider text-emerald-700 font-onest">
                  Premium Products
                </span>
              </span>
            }
            title="Наша продукция"
            description="Натуральные добавки для здоровья и долголетия"
          />
        </ScrollReveal>

        {/* Product Grid */}
        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PRODUCTS.map((product, i) => (
            <ScrollReveal key={product.name} delay={i * 0.08}>
              <ProductCard
                name={product.name}
                subtitle={product.subtitle}
                description={product.description}
                color={product.color}
                icon={product.icon}
                index={i}
              />
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
