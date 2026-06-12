"use client";

import { memo, useCallback, useState, useRef, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Leaf, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import FilterBar from "./FilterBar";
import ProductJsonLd from "./ProductJsonLd";
import { useTranslations } from "next-intl";

interface Product {
  name: string;
  subtitle: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  featured?: boolean;
  image?: string;
  benefits?: string[];
  composition?: string;
  category?: string;
}

const FILTER_OPTIONS = [
  { key: "all", label: "Все" },
  { key: "vision", label: "Зрение" },
  { key: "detox", label: "Детокс" },
  { key: "immunity", label: "Иммунитет" },
  { key: "nutrition", label: "Питание" },
  { key: "joints", label: "Суставы" },
  { key: "mens", label: "Мужское" },
];

const ProductsSection = memo(function ProductsSection() {
  const t = useTranslations();
  const tProducts = useTranslations("products");

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 640px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const openModal = useCallback((product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  }, []);

  // Build products from i18n messages
  const allProducts: Product[] = useMemo(() => [
    {
      name: tProducts("micrystal.name"),
      subtitle: tProducts("micrystal.subtitle"),
      description: tProducts("micrystal.description"),
      color: "oklch(65% 0.14 75)",
      icon: <Leaf className="w-5 h-5" />,
      featured: true,
      image: "/images/products/micrystal.webp",
      benefits: tProducts.raw("micrystal.benefits") as unknown as string[],
      composition: tProducts("micrystal.composition"),
      category: "vision",
    },
    {
      name: tProducts("greenmax.name"),
      subtitle: tProducts("greenmax.subtitle"),
      description: tProducts("greenmax.description"),
      color: "oklch(55% 0.16 140)",
      icon: <Leaf className="w-5 h-5" />,
      featured: true,
      image: "/images/products/greenmax.webp",
      benefits: tProducts.raw("greenmax.benefits") as unknown as string[],
      composition: tProducts("greenmax.composition"),
      category: "detox",
    },
    {
      name: tProducts("mimax.name"),
      subtitle: tProducts("mimax.subtitle"),
      description: tProducts("mimax.description"),
      color: "oklch(55% 0.18 25)",
      icon: <Leaf className="w-5 h-5" />,
      image: "/images/products/mimax.webp",
      benefits: tProducts.raw("mimax.benefits") as unknown as string[],
      composition: tProducts("mimax.composition"),
      category: "immunity",
    },
    {
      name: tProducts("blumax.name"),
      subtitle: tProducts("blumax.subtitle"),
      description: tProducts("blumax.description"),
      color: "oklch(55% 0.14 230)",
      icon: <Leaf className="w-5 h-5" />,
      image: "/images/products/blumax.webp",
      benefits: tProducts.raw("blumax.benefits") as unknown as string[],
      composition: tProducts("blumax.composition"),
      category: "immunity",
    },
    {
      name: tProducts("nutrimax.name"),
      subtitle: tProducts("nutrimax.subtitle"),
      description: tProducts("nutrimax.description"),
      color: "oklch(60% 0.14 120)",
      icon: <Leaf className="w-5 h-5" />,
      image: "/images/products/nutrimax.webp",
      benefits: tProducts.raw("nutrimax.benefits") as unknown as string[],
      composition: tProducts("nutrimax.composition"),
      category: "nutrition",
    },
    {
      name: tProducts("fleximax.name"),
      subtitle: tProducts("fleximax.subtitle"),
      description: tProducts("fleximax.description"),
      color: "oklch(55% 0.12 60)",
      icon: <Leaf className="w-5 h-5" />,
      image: "/images/products/fleximax.webp",
      benefits: tProducts.raw("fleximax.benefits") as unknown as string[],
      composition: tProducts("fleximax.composition"),
      category: "joints",
    },
    {
      name: tProducts("machoman.name"),
      subtitle: tProducts("machoman.subtitle"),
      description: tProducts("machoman.description"),
      color: "oklch(45% 0.16 350)",
      icon: <Leaf className="w-5 h-5" />,
      image: "/images/products/machoman.webp",
      benefits: tProducts.raw("machoman.benefits") as unknown as string[],
      composition: tProducts("machoman.composition"),
      category: "mens",
    },
    {
      name: tProducts("mitown.name"),
      subtitle: tProducts("mitown.subtitle"),
      description: tProducts("mitown.description"),
      color: "oklch(35% 0.08 40)",
      icon: <Leaf className="w-5 h-5" />,
      image: "/images/products/mitown2.webp",
      benefits: tProducts.raw("mitown.benefits") as unknown as string[],
      composition: tProducts("mitown.composition"),
      category: "nutrition",
    },
  ], [tProducts]);

  // Instant client-side filtering
  const filteredProducts = useMemo(() => {
    if (activeFilter === "all") return allProducts;
    return allProducts.filter((p) => p.category === activeFilter);
  }, [allProducts, activeFilter]);

  const handleFilterChange = useCallback((key: string) => {
    setActiveFilter(key);
  }, []);

  return (
    <>
      <section id="products" className="relative py-16 md:py-24 overflow-hidden bg-bg-alt">
        {/* JSON-LD Product markup */}
        <ProductJsonLd products={allProducts} />
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
                <span className="text-xs font-onest font-semibold text-accent-600">
                  {tProducts("features.natural")}
                </span>
              </div>
              <SectionHeader
                title={tProducts("title")}
                description={tProducts("description")}
              />
            </div>
          </ScrollReveal>

          {/* Filter bar — instant, no reload */}
          <ScrollReveal delay={0.1}>
            <div className="mt-6 md:mt-8">
              <FilterBar
                options={FILTER_OPTIONS}
                active={activeFilter}
                onChange={handleFilterChange}
              />
            </div>
          </ScrollReveal>

          {/* Product grid — asymmetric with 2 visual tiers */}
          <div className="mt-6 md:mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className={product.featured && i < 2 ? "sm:col-span-2 lg:col-span-2" : ""}
                  >
                    <ProductCard
                      name={product.name}
                      subtitle={product.subtitle}
                      description={product.description}
                      color={product.color}
                      icon={product.icon}
                      index={i}
                      featured={product.featured}
                      image={product.image}
                      onClick={() => openModal(product)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <p className="text-fg-tertiary font-onest text-sm">В этой категории пока нет продуктов</p>
              </motion.div>
            )}
          </div>

          {/* CTA to full catalog */}
          <ScrollReveal delay={0.4}>
            <div className="mt-6 md:mt-12 text-center">
              <a href="/catalog" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-accent-500 hover:bg-accent-600 text-white font-unbounded font-bold text-sm rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-accent-500/20 min-h-[44px]">
                {tProducts("cta") || "Смотреть весь каталог"}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <p className="mt-3 md:mt-4 text-[11px] md:text-sm text-fg-tertiary font-onest font-light">
                {t("products.features.certified")} · {t("products.features.natural")} · {t("products.features.tested")}
              </p>
            </div>
          </ScrollReveal>
        </Container>
      </section>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
      />
    </>
  );
});

export default ProductsSection;
