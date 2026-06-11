import { Hero } from "@/components/sections/hero";
import { ProductsSection } from "@/components/sections/products";
import { CertificatesSection } from "@/components/sections/certificates";
import { AboutSection } from "@/components/sections/about";
import { BusinessSection } from "@/components/sections/business";
import { CTASection } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductsSection />
      <CertificatesSection />
      <AboutSection />
      <BusinessSection />
      <CTASection />
      <Footer />
    </main>
  );
}
