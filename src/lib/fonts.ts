import localFont from "next/font/local";

/* ── Self-hosted fonts (no Google Fonts API — blocked in Russia) ── */

export const onest = localFont({
  variable: "--font-onest",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
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
  fallback: ["system-ui", "arial"],
  src: [
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6xjx040.ttf", weight: "400" },
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6yrx040.ttf", weight: "500" },
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG68b2040.ttf", weight: "600" },
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6__2040.ttf", weight: "700" },
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG65j2040.ttf", weight: "800" },
    { path: "../fonts/unbounded/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG67H2040.ttf", weight: "900" },
  ],
});
