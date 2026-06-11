import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { onest, unbounded } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo/jsonld";
import "./globals.css";
import "./animations.css";

export const metadata: Metadata = {
  title: "M-International — Натуральные добавки для здоровья и долголетия",
  description:
    "Сертифицированные натуральные добавки для иммунитета, детокса и долголетия. GMP, ISO, Halal, FDA. Продукция представлена в 50+ странах.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    viewportFit: "cover",
  },
  themeColor: "oklch(98.5% 0.003 160)",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "M-International",
  },
};

const orgSchema = generateOrganizationSchema({
  name: "M-International",
  url: "https://m-international.kz",
  logo: "https://m-international.kz/logo.png",
  description: "Сертифицированные натуральные добавки для иммунитета, детокса и долголетия. Продукция представлена в 50+ странах.",
  address: {
    addressLocality: "Алматы",
    addressCountry: "KZ",
  },
  contactPoint: {
    telephone: "+7-777-123-45-67",
    contactType: "customer service",
    email: "info@m-international.kz",
  },
});

const websiteSchema = generateWebSiteSchema({
  name: "M-International",
  url: "https://m-international.kz",
  description: "Натуральные добавки для здоровья и долголетия",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${onest.variable} ${unbounded.variable} antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Перейти к содержимому
        </a>
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <Navbar locale={locale} />
            <div id="main-content" className="flex-1">{children}</div>
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
