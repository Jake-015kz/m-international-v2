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
  themeColor: "#FBFBFB",
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
      className={`${onest.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <SmoothScrollProvider>
            <Navbar locale={locale} />
            {children}
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
