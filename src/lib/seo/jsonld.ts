interface ProductSchema {
  name: string;
  description: string;
  image: string;
  brand?: string;
  url?: string;
  sku?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}

interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    streetAddress?: string;
    addressLocality: string;
    addressCountry: string;
    postalCode?: string;
  };
  contactPoint: {
    telephone: string;
    contactType: string;
    email?: string;
  };
}

interface WebSiteSchema {
  name: string;
  url: string;
  description: string;
}

/**
 * Generate Product JSON-LD schema.org markup
 */
export function generateProductSchema(product: ProductSchema) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      "@type": "Brand",
      name: product.brand || "M-International",
    },
  };

  if (product.url) {
    schema.url = product.url;
  }
  if (product.sku) {
    schema.sku = product.sku;
  }
  if (product.offers) {
    schema.offers = {
      "@type": "Offer",
      ...product.offers,
      url: product.url || "",
    };
  }
  if (product.aggregateRating) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ...product.aggregateRating,
    };
  }

  return schema;
}

/**
 * Generate Organization JSON-LD schema
 */
export function generateOrganizationSchema(org: OrganizationSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    url: org.url,
    logo: org.logo,
    description: org.description,
    address: {
      "@type": "PostalAddress",
      ...org.address,
    },
    contactPoint: {
      "@type": "ContactPoint",
      ...org.contactPoint,
    },
  };
}

/**
 * Generate WebSite JSON-LD schema
 */
export function generateWebSiteSchema(site: WebSiteSchema) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: {
      "@type": "Organization",
      name: "M-International",
    },
  };
}

/**
 * Generate ItemList JSON-LD for product listings
 */
export function generateProductListSchema(products: Array<{ name: string; url: string; image: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: p.url,
      image: p.image,
    })),
  };
}
