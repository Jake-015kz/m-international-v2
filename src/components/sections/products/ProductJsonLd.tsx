"use client";

import { memo, useMemo } from "react";
import {
  generateProductSchema,
  generateProductListSchema,
} from "@/lib/seo/jsonld";

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

interface ProductJsonLdProps {
  products: Product[];
  baseUrl?: string;
}

/**
 * Renders JSON-LD Product schemas for a list of products.
 * Uses a client-side <script> tag since products come from i18n.
 */
const ProductJsonLd = memo(function ProductJsonLd({
  products,
  baseUrl = "https://m-international.kz",
}: ProductJsonLdProps) {
  const productSchemas = useMemo(
    () =>
      products.map((p) =>
        generateProductSchema({
          name: p.name,
          description: p.description,
          image: p.image ? `${baseUrl}${p.image}` : `${baseUrl}/images/products/micrystal.webp`,
          url: `${baseUrl}/products/${p.name.toLowerCase().replace(/\s+/g, "-")}`,
          brand: "M-International",
          offers: {
            price: "0",
            priceCurrency: "KZT",
            availability: "https://schema.org/InStock",
          },
        })
      ),
    [products, baseUrl]
  );

  const listSchema = useMemo(
    () =>
      generateProductListSchema(
        products.map((p) => ({
          name: p.name,
          url: `${baseUrl}/products/${p.name.toLowerCase().replace(/\s+/g, "-")}`,
          image: p.image ? `${baseUrl}${p.image}` : `${baseUrl}/images/products/micrystal.webp`,
        }))
      ),
    [products, baseUrl]
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }}
      />
      {productSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
});

export default ProductJsonLd;
