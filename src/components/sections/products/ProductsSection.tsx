"use client";

import { memo, useCallback, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Leaf, Sparkles } from "lucide-react";
import Container from "@/components/ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { BackgroundDecorations } from "@/components/ui";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
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
}

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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
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
  const products: Product[] = [
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
    },
  ];

  return (
    <>
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
                <span className="text-xs font-unbounded font-bold text-accent-600 uppercase tracking-wider">
                  {t("products.features.natural")}
                </span>
              </div>
              <SectionHeader
                title={t("products.title")}
                description={t("products.description")}
              />
            </div>
          </ScrollReveal>

          {/* Slider container */}
          <div className="mt-6 md:mt-12 relative">
            {/* Navigation buttons */}
            <button
              onClick={scrollPrev}
              disabled={!prevEnabled}
              className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-elevated border border-border-subtle shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-surface-sunken hover:border-border-default disabled:opacity-30 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>
            <button
              onClick={scrollNext}
              disabled={!nextEnabled}
              className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-surface-elevated border border-border-subtle shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-surface-sunken hover:border-border-default disabled:opacity-30 disabled:cursor-not-allowed min-h-[44px] min-w-[44px]"
              aria-label="Следующий слайд"
            >
              <ChevronRight className="w-5 h-5 text-text-primary" />
            </button>

            {/* Embla viewport */}
            <div className="overflow-hidden px-2" ref={emblaRef}>
              <div className="flex gap-3 md:gap-5">
                {products.map((product, i) => (
                  <div
                    key={product.name}
                    className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0"
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
                  </div>
                ))}
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex items-center justify-center gap-1.5 mt-4">
              {products.map((_, i) => (
                <button
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-text-tertiary/30 transition-all duration-300 hover:bg-accent-500 min-h-[32px] min-w-[32px] flex items-center justify-center"
                  aria-label={`Перейти к слайду ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                />
              ))}
            </div>
          </div>

          {/* CTA to full catalog */}
          <ScrollReveal delay={0.4}>
            <div className="mt-6 md:mt-12 text-center">
              <a href="/catalog" className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-unbounded font-bold text-sm rounded-2xl transition-all duration-300 hover:-translate-y-0.5 shadow-lg shadow-emerald-900/20 min-h-[44px]">
                {t("hero.cta")}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
              <p className="mt-3 md:mt-4 text-[11px] md:text-sm text-text-tertiary font-onest font-light">
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
