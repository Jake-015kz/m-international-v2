"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/sections/footer";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Sparkles, Shield, Leaf, Award } from "lucide-react";
import ProductModal from "@/components/sections/products/ProductModal";

type Product = {
  name: string;
  subtitle: string;
  description: string;
  benefits: string[];
  composition: string;
  image: string;
  color: string;
  badge?: string;
  category: string;
};

type Messages = {
  nav: { catalog: string };
  catalog: {
    title: string;
    description: string;
    allCategories: string;
    related: string;
    specifications: string;
    certificates: string;
    backToCatalog: string;
    contact: string;
  };
  products: Record<string, { name: string; subtitle: string; description: string; short: string; benefits: string[]; composition: string }>;
  common: { loading: string };
};

const CATEGORIES = ["detox", "immunity", "nutrition", "vision", "joints", "mens", "skin", "coffee", "aromatherapy", "tea"] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_COLORS: Record<string, string> = {
  detox: "oklch(55% 0.16 140)",
  immunity: "oklch(55% 0.14 230)",
  nutrition: "oklch(60% 0.14 120)",
  vision: "oklch(65% 0.14 75)",
  joints: "oklch(55% 0.12 60)",
  mens: "oklch(45% 0.16 350)",
  skin: "oklch(65% 0.12 300)",
  coffee: "oklch(35% 0.08 40)",
  aromatherapy: "oklch(55% 0.10 270)",
  tea: "oklch(50% 0.10 180)",
};

const PRODUCT_IMAGES: Record<string, string> = {
  micrystal: "/images/products/micrystal.webp",
  greenmax: "/images/products/greenmax.png",
  mimax: "/images/products/mimax.png",
  blumax: "/images/products/blumax.png",
  nutrimax: "/images/products/nutrimax.png",
  fleximax: "/images/products/fleximax.png",
  machoman: "/images/products/machoman.png",
  mitown: "/images/products/mitown2.webp",
};

function getProductsFromMessages(msgs: Messages): Product[] {
  const p = msgs.products;

  return [
    {
      name: p.micrystal.name,
      subtitle: p.micrystal.subtitle,
      description: p.micrystal.description,
      benefits: p.micrystal.benefits,
      composition: p.micrystal.composition,
      image: PRODUCT_IMAGES.micrystal,
      color: CATEGORY_COLORS.vision,
      badge: "Хит",
      category: "vision",
    },
    {
      name: p.greenmax.name,
      subtitle: p.greenmax.subtitle,
      description: p.greenmax.description,
      benefits: p.greenmax.benefits,
      composition: p.greenmax.composition,
      image: PRODUCT_IMAGES.greenmax,
      color: CATEGORY_COLORS.detox,
      badge: "Хит",
      category: "detox",
    },
    {
      name: p.mimax.name,
      subtitle: p.mimax.subtitle,
      description: p.mimax.description,
      benefits: p.mimax.benefits,
      composition: p.mimax.composition,
      image: PRODUCT_IMAGES.mimax,
      color: CATEGORY_COLORS.detox,
      category: "detox",
    },
    {
      name: p.blumax.name,
      subtitle: p.blumax.subtitle,
      description: p.blumax.description,
      benefits: p.blumax.benefits,
      composition: p.blumax.composition,
      image: PRODUCT_IMAGES.blumax,
      color: CATEGORY_COLORS.immunity,
      category: "immunity",
    },
    {
      name: p.nutrimax.name,
      subtitle: p.nutrimax.subtitle,
      description: p.nutrimax.description,
      benefits: p.nutrimax.benefits,
      composition: p.nutrimax.composition,
      image: PRODUCT_IMAGES.nutrimax,
      color: CATEGORY_COLORS.nutrition,
      category: "nutrition",
    },
    {
      name: p.fleximax.name,
      subtitle: p.fleximax.subtitle,
      description: p.fleximax.description,
      benefits: p.fleximax.benefits,
      composition: p.fleximax.composition,
      image: PRODUCT_IMAGES.fleximax,
      color: CATEGORY_COLORS.joints,
      category: "joints",
    },
    {
      name: p.machoman.name,
      subtitle: p.machoman.subtitle,
      description: p.machoman.description,
      benefits: p.machoman.benefits,
      composition: p.machoman.composition,
      image: PRODUCT_IMAGES.machoman,
      color: CATEGORY_COLORS.mens,
      category: "mens",
    },
    {
      name: p.mitown.name,
      subtitle: p.mitown.subtitle,
      description: p.mitown.description,
      benefits: p.mitown.benefits,
      composition: p.mitown.composition,
      image: PRODUCT_IMAGES.mitown,
      color: CATEGORY_COLORS.coffee,
      category: "coffee",
    },
  ];
}

const ALL_CATEGORIES_OPTION = "all" as const;

export default function CatalogPage() {
  const t = useTranslations();
  const tCatalog = useTranslations("catalog");
  const tProducts = useTranslations("products");

  const [activeCategory, setActiveCategory] = useState<string>(ALL_CATEGORIES_OPTION);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const allMessages = {
    nav: { catalog: t("nav.catalog") },
    catalog: {
      title: t("hero.stat.countries"),
      description: t("products.description"),
      allCategories: t("nav.catalog"),
      related: t("catalog.related"),
      specifications: t("catalog.specifications"),
      certificates: t("catalog.certificates"),
      backToCatalog: t("catalog.backToCatalog"),
      contact: t("catalog.contact"),
    },
    products: t.raw("products") as Messages["products"],
    common: { loading: t("common.loading") },
  };

  const products = getProductsFromMessages(allMessages);

  // Filter duplicates by keeping only first occurrence of each product name
  // and sort: hits first
  const deduped = products.filter((p, i, arr) => arr.findIndex((x) => x.name === p.name) === i);
  const sorted = [...deduped].sort((a, b) => {
    if (a.badge && !b.badge) return -1;
    if (!a.badge && b.badge) return 1;
    return 0;
  });
  const filtered = activeCategory === ALL_CATEGORIES_OPTION ? sorted : sorted.filter((p) => p.category === activeCategory);

  // Category label resolver
  const categoryLabels: Record<string, string> = {
    all: "Все",
    detox: "Детокс",
    immunity: "Иммунитет",
    nutrition: "Питание",
    vision: "Зрение",
    joints: "Суставы",
    men: "Мужское",
    skin: "Кожа",
    coffee: "Кофе",
    aromatherapy: "Ароматерапия",
    tea: "Чай",
  };

  // Get available categories from data
  const availableCategories = Array.from(new Set(sorted.map((p) => p.category)));

  return (
    <main className="pt-14 md:pt-16">
      {/* Hero Banner */}
      <section className="relative py-10 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/sections/catalog-hero.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-surface-base" />
        </div>
        <Container className="relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-3 mobile-no-backdrop">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-medium text-white/80">
                  {t("hero.subtitle")}
                </span>
              </div>
              <h1 className="font-unbounded font-bold text-[1.65rem] sm:text-3xl md:text-4xl text-white mb-2">
                {t("products.title")}
              </h1>
              <p className="text-sm md:text-base text-white/60 font-onest">
                {t("products.description")}
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Products Grid */}
      <section className="py-8 md:py-16">
        <Container>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6 md:mb-10 justify-center">
            <button
              onClick={() => setActiveCategory(ALL_CATEGORIES_OPTION)}
              className={`px-4 py-2 rounded-xl text-xs font-onest font-medium transition-all duration-300 border ${
                activeCategory === ALL_CATEGORIES_OPTION
                  ? "bg-accent-600 text-white border-accent-600 shadow-lg shadow-accent-600/20"
                  : "bg-surface-elevated text-text-secondary border-border-subtle hover:border-border-default"
              }`}
            >
              {categoryLabels["all"]}
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-onest font-medium transition-all duration-300 border ${
                  activeCategory === cat
                    ? "bg-accent-600 text-white border-accent-600 shadow-lg shadow-accent-600/20"
                    : "bg-surface-elevated text-text-secondary border-border-subtle hover:border-border-default"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5">
            {filtered.map((product, i) => (
              <ScrollReveal key={product.name} delay={i * 0.05}>
                <div
                  className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-surface-elevated border border-border-subtle hover:border-border-default transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  {/* Image — larger area */}
                  <div
                    className="relative h-44 sm:h-56 overflow-hidden"
                    style={{ background: `linear-gradient(135deg, ${product.color}12 0%, ${product.color}20 100%)` }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    {product.badge && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm shadow-sm">
                        <Sparkles className="w-3 h-3" style={{ color: product.color }} />
                        <span className="text-[10px] font-unbounded font-bold" style={{ color: product.color }}>
                          {product.badge}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-surface-elevated to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col flex-1 p-4 md:p-5">
                    <span
                      className="text-[10px] font-medium font-onest uppercase tracking-wider mb-1"
                      style={{ color: product.color }}
                    >
                      {product.subtitle}
                    </span>
                    <h3 className="font-onest font-bold text-sm md:text-base text-text-primary mb-1.5">
                      {product.name}
                    </h3>
                    <p className="text-[11px] md:text-xs text-text-secondary font-onest font-light leading-relaxed mb-2 line-clamp-2 flex-1">
                      {product.description}
                    </p>

                    {/* Benefits */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.benefits.map((b) => (
                        <span key={b} className="px-2 py-0.5 rounded-lg bg-surface-sunken text-[9px] md:text-[10px] text-text-secondary font-onest">
                          {b}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-medium transition-all duration-300 group-hover:gap-3 min-h-[44px]">
                      <span style={{ color: product.color }} className="font-onest font-bold">
                        {t("catalog.contact")}
                      </span>
                      <svg
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        style={{ color: product.color }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div
                    className="h-0.5 w-0 group-hover:w-full transition-all duration-500 opacity-60"
                    style={{ background: `linear-gradient(90deg, ${product.color}, transparent)` }}
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Features */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { icon: <Leaf className="w-5 h-5" />, title: t("products.features.natural"), desc: t("products.features.natural") },
              { icon: <Shield className="w-5 h-5" />, title: t("products.features.certified"), desc: t("certificates.description") },
              { icon: <Award className="w-5 h-5" />, title: t("products.features.tested"), desc: t("products.features.tested") },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-3 p-3 md:p-4 rounded-2xl bg-surface-elevated border border-border-subtle">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 shrink-0">
                  {f.icon}
                </div>
                <div>
                  <div className="font-onest font-bold text-xs md:text-sm text-text-primary">{f.title}</div>
                  <div className="text-[11px] md:text-xs text-text-secondary font-onest">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Product Modal */}
      <ProductModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />

      <Footer />
    </main>
  );
}
