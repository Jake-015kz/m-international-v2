"use client";

import { Droplets, Leaf, Shield, Heart } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProductCard from "./ProductCard";

const PRODUCTS = [
  {
    name: "MiCrystal",
    subtitle: "Здоровье глаз",
    description: "Клеточное питание для глаз. Экстракт бузины, лютеин, астаксантин. Снимает сухость и напряжение.",
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
    description: "Астаксантин — антиоксидант в 6000 раз мощнее витамина С. Замедляет старение.",
    color: "#c85020",
    icon: <Shield className="w-4 h-4" />,
  },
  {
    name: "BluMAX",
    subtitle: "Иммунитет и мозг",
    description: "Сине-зелёные водоросли AFA с нейропептидами. 60+ минералов для иммунитета и памяти.",
    color: "#2e7aa8",
    icon: <Heart className="w-4 h-4" />,
  },
];

export default function ProductsSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-[#F7F7F7]">
      {/* Subtle background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03] pointer-events-none"
        style={{
          background: "radial-gradient(circle, #10b981, transparent 70%)",
          filter: "blur(100px)",
        }}
        aria-hidden="true"
      />

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
            <ScrollReveal key={product.name} delay={i * 0.1}>
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
