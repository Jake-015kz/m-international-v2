import { Hero } from "@/components/sections/hero";
import { CertificatesSection } from "@/components/sections/certificates";
import { ProductsSection } from "@/components/sections/products";
import { AboutSection } from "@/components/sections/about";
import { BusinessSection } from "@/components/sections/business";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <CertificatesSection />
      <ProductsSection />
      <AboutSection />
      <BusinessSection />
      <Footer />
    </main>
  );
}
