import {
  Hero,
  ProductsSection,
  CertificatesSection,
  AboutSection,
  BusinessSection,
  CTASection,
  Footer,
} from "@/components/sections";

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
