"use client";

import { useState, useMemo, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Footer } from "@/components/sections/footer";
import Container from "@/components/ui/Container";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { Shield, Leaf, Award, Eye } from "lucide-react";
import ProductModal from "@/components/sections/products/ProductModal";
import FilterBar from "@/components/sections/products/FilterBar";
import ProductCardV2 from "@/components/sections/products/ProductCardV2";
import { Badge } from "@/components/ui/Badge";

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
  price?: number;
  oldPrice?: number;
  rating?: number;
  reviewCount?: number;
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

const FILTER_OPTIONS = [
  { key: "all", label: "Все" },
  { key: "vision", label: "Зрение" },
  { key: "detox", label: "Детокс" },
  { key: "immunity", label: "Иммунитет" },
  { key: "nutrition", label: "Питание" },
  { key: "joints", label: "Суставы" },
  { key: "mens", label: "Мужское" },
  { key: "coffee", label: "Напитки" },
];

function getProductsFromMessages(msgs: Messages): Product[] {
  const p = msgs.products;

  return [
    {
      name: p.micrystal.name, subtitle: p.micrystal.subtitle, description: p.micrystal.description,
      benefits: p.micrystal.benefits, composition: p.micrystal.composition,
      image: PRODUCT_IMAGES.micrystal, color: CATEGORY_COLORS.vision, badge: "Хит", category: "vision",
      price: 8900, oldPrice: 12500, rating: 4.8, reviewCount: 124,
    },
    {
      name: p.greenmax.name, subtitle: p.greenmax.subtitle, description: p.greenmax.description,
      benefits: p.greenmax.benefits, composition: p.greenmax.composition,
      image: PRODUCT_IMAGES.greenmax, color: CATEGORY_COLORS.detox, badge: "Хит", category: "detox",
      price: 6500, rating: 4.9, reviewCount: 256,
    },
    {
      name: p.mimax.name, subtitle: p.mimax.subtitle, description: p.mimax.description,
      benefits: p.mimax.benefits, composition: p.mimax.composition,
      image: PRODUCT_IMAGES.mimax, color: CATEGORY_COLORS.detox, category: "detox",
      price: 7200, oldPrice: 8900, rating: 4.6, reviewCount: 89,
    },
    {
      name: p.blumax.name, subtitle: p.blumax.subtitle, description: p.blumax.description,
      benefits: p.blumax.benefits, composition: p.blumax.composition,
      image: PRODUCT_IMAGES.blumax, color: CATEGORY_COLORS.immunity, category: "immunity",
      price: 9500, rating: 4.7, reviewCount: 167,
    },
    {
      name: p.nutrimax.name, subtitle: p.nutrimax.subtitle, description: p.nutrimax.description,
      benefits: p.nutrimax.benefits, composition: p.nutrimax.composition,
      image: PRODUCT_IMAGES.nutrimax, color: CATEGORY_COLORS.nutrition, category: "nutrition",
      price: 5400, oldPrice: 7200, rating: 4.5, reviewCount: 98,
    },
    {
      name: p.fleximax.name, subtitle: p.fleximax.subtitle, description: p.fleximax.description,
      benefits: p.fleximax.benefits, composition: p.fleximax.composition,
      image: PRODUCT_IMAGES.fleximax, color: CATEGORY_COLORS.joints, category: "joints",
      price: 11000, rating: 4.4, reviewCount: 72,
    },
    {
      name: p.machoman.name, subtitle: p.machoman.subtitle, description: p.machoman.description,
      benefits: p.machoman.benefits, composition: p.machoman.composition,
      image: PRODUCT_IMAGES.machoman, color: CATEGORY_COLORS.mens, category: "mens",
      price: 8200, oldPrice: 10000, rating: 4.3, reviewCount: 55,
    },
    {
      name: p.mitown.name, subtitle: p.mitown.subtitle, description: p.mitown.description,
      benefits: p.mitown.benefits, composition: p.mitown.composition,
      image: PRODUCT_IMAGES.mitown, color: CATEGORY_COLORS.coffee, category: "coffee",
      price: 4900, rating: 4.9, reviewCount: 312,
    },
  ];
}

const ALL_CATEGORIES_OPTION = "all" as const;

/* ── Parallax hero banner ── */
function HeroBanner({ title, description, t }: { title: string; description: string; t: (key: string) => string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} className="relative py-10 md:py-24 overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y }}>
        <img src="/images/sections/catalog-hero.webp" alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-bg-base" />
      </motion.div>

      {/* Animated mesh overlay */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: "var(--gradient-mesh)" }}
      />

      <Container className="relative z-10">
        <motion.div style={{ opacity }} className="text-center max-w-2xl mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-3 mobile-no-backdrop">
              <span className="text-[11px] font-medium text-white/80">{t("hero.subtitle")}</span>
            </div>
            <h1 className="font-unbounded font-bold text-[1.65rem] sm:text-3xl md:text-4xl text-white mb-2">
              {title}
            </h1>
            <p className="text-sm md:text-base text-white/60 font-onest">{description}</p>
          </ScrollReveal>
        </motion.div>
      </Container>
    </section>
  );
}

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

  const deduped = products.filter((p, i, arr) => arr.findIndex((x) => x.name === p.name) === i);
  const sorted = [...deduped].sort((a, b) => {
    if (a.badge && !b.badge) return -1;
    if (!a.badge && b.badge) return 1;
    return 0;
  });

  const filtered = useMemo(
    () => (activeCategory === ALL_CATEGORIES_OPTION ? sorted : sorted.filter((p) => p.category === activeCategory)),
    [activeCategory, sorted]
  );

  const availableCategories = useMemo(() => Array.from(new Set(sorted.map((p) => p.category))), [sorted]);

  const filterOptions = useMemo(
    () => [
      { key: "all", label: "Все" },
      ...availableCategories.map((cat) => ({
        key: cat,
        label: cat === "vision" ? "Зрение" : cat === "detox" ? "Детокс" : cat === "immunity" ? "Иммунитет" : cat === "nutrition" ? "Питание" : cat === "joints" ? "Суставы" : cat === "mens" ? "Мужское" : cat === "coffee" ? "Напитки" : cat,
      })),
    ],
    [availableCategories]
  );

  return (
    <main className="pt-14 md:pt-16">
      {/* Parallax Hero Banner */}
      <HeroBanner
        title={t("products.title")}
        description={t("products.description")}
        t={t}
      />

      {/* Products Grid */}
      <section className="py-8 md:py-16">
        <Container>
          {/* Filter bar — instant, animated */}
          <div className="mb-6 md:mb-10">
            <FilterBar
              options={filterOptions}
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>

          {/* Product grid with animated filtering */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-5"
          >
            {filtered.map((product, i) => (
              <motion.div
                key={product.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04, duration: 0.35 }}
                onClick={() => setSelectedProduct(product)}
              >
                <ProductCardV2
                  name={product.name}
                  subtitle={product.subtitle}
                  description={product.description}
                  color={product.color}
                  image={product.image}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  badge={product.badge}
                  benefits={product.benefits}
                  category={product.category}
                  index={i}
                  onClick={() => setSelectedProduct(product)}
                />
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <p className="text-fg-tertiary font-onest text-sm">В этой категории пока нет продуктов</p>
            </motion.div>
          )}

          {/* Features */}
          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { icon: <Leaf className="w-5 h-5" />, title: t("products.features.natural"), desc: t("products.features.natural") },
              { icon: <Shield className="w-5 h-5" />, title: t("products.features.certified"), desc: t("certificates.description") },
              { icon: <Award className="w-5 h-5" />, title: t("products.features.tested"), desc: t("products.features.tested") },
            ].map((f) => (
              <div key={f.title} className="flex items-center gap-3 p-3 md:p-4 rounded-2xl bg-bg-elevated border border-border-subtle">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-accent-50 border border-accent-100 flex items-center justify-center text-accent-600 shrink-0">
                  {f.icon}
                </div>
                <div>
                  <div className="font-onest font-bold text-xs md:text-sm text-fg-primary">{f.title}</div>
                  <div className="text-[11px] md:text-xs text-fg-secondary font-onest">{f.desc}</div>
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
