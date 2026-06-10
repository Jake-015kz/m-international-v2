import { Onest, Unbounded } from "next/font/google";

export const onest = Onest({
  variable: "--font-onest",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});
