import localFont from "next/font/local";

/* ── Primary fonts ── */

export const onest = localFont({
  variable: "--font-onest",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
  src: [
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPhqx-Zsg.ttf", weight: "300" },
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-Zsg.ttf", weight: "400" },
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPhxx-Zsg.ttf", weight: "500" },
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPhKxiZsg.ttf", weight: "600" },
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPhEhiZsg.ttf", weight: "700" },
  ],
});

export const unbounded = localFont({
  variable: "--font-unbounded",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Arial", "sans-serif"],
  src: [
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6xjx040.ttf", weight: "400" },
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6yrx040.ttf", weight: "500" },
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG68b2040.ttf", weight: "600" },
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6__2040.ttf", weight: "700" },
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG65j2040.ttf", weight: "800" },
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG67H2040.ttf", weight: "900" },
  ],
});

/*
  Space Grotesk & Inter — CSS variable infrastructure.
  Currently map to Onest as fallback. To use actual Space Grotesk / Inter:
  1. Download woff2 files to ../fonts/space-grotesk/ and ../fonts/inter/
  2. Update the src paths below.
  The CSS classes font-space-grotesk and font-inter are already wired up
  in tokens.css and used across components.
*/
export const spaceGrotesk = localFont({
  variable: "--font-space-grotesk",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
  src: [
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-Zsg.ttf", weight: "400" },
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPhxx-Zsg.ttf", weight: "500" },
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPhKxiZsg.ttf", weight: "600" },
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPhEhiZsg.ttf", weight: "700" },
  ],
});

export const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
  src: [
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPhqx-Zsg.ttf", weight: "300" },
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPh9R-Zsg.ttf", weight: "400" },
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPhxx-Zsg.ttf", weight: "500" },
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPhKxiZsg.ttf", weight: "600" },
    { path: "../fonts/onest/gNMZW3F-SZuj7zOT0IfSjTS16cPhEhiZsg.ttf", weight: "700" },
  ],
});
