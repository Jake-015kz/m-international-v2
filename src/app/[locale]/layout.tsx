import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { onest, unbounded } from "@/lib/fonts";
import Navbar from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

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
