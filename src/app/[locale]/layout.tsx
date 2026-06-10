import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { onest, unbounded } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "M-International — Интеллект природы для вашего долголетия",
  description:
    "Сертифицированные натуральные добавки для иммунитета, детокса и долголетия. Продукция представлена в 50+ странах.",
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
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
