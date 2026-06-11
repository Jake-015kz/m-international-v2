import { Hero } from "@/components/sections/hero";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui";

// Dynamic imports for all sections below the fold (Hero stays SSR for LCP)
const CertificatesSection = dynamic(
  () => import("@/components/sections/certificates").then((m) => ({ default: m.CertificatesSection })),
  {
    loading: () => <Skeleton className="w-full h-48 rounded-2xl" />,
    ssr: true,
  }
);

const ProductsSection = dynamic(
  () => import("@/components/sections/products").then((m) => ({ default: m.default })),
  {
    loading: () => <Skeleton className="w-full h-96 rounded-2xl" />,
    ssr: true,
  }
);

const AboutSection = dynamic(
  () => import("@/components/sections/about").then((m) => ({ default: m.default })),
  {
    loading: () => <Skeleton className="w-full h-96 rounded-2xl" />,
    ssr: true,
  }
);

const BusinessSection = dynamic(
  () => import("@/components/sections/business").then((m) => ({ default: m.default })),
  {
    loading: () => <Skeleton className="w-full h-96 rounded-2xl" />,
    ssr: true,
  }
);

const CTASection = dynamic(
  () => import("@/components/sections/cta").then((m) => ({ default: m.default })),
  {
    loading: () => <Skeleton className="w-full h-64 rounded-2xl" />,
    ssr: true,
  }
);

const Footer = dynamic(
  () => import("@/components/sections/footer").then((m) => ({ default: m.default })),
  {
    loading: () => <Skeleton className="w-full h-48 rounded-2xl" />,
    ssr: true,
  }
);

export default function Home() {
  return (
    <main>
      <Hero />
      <CertificatesSection />
      <ProductsSection />
      <AboutSection />
      <BusinessSection />
      <CTASection />
      <Footer />
    </main>
  );
}
