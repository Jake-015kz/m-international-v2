#!/usr/bin/env python3
"""
Extract product image URLs from the m-international-v2 Next.js source.

Products are defined in src/app/[locale]/catalog/page.tsx (CLIENT COMPONENT)
and rendered via ProductCardV2 / ProductModal. There are no separate product
detail pages — product data lives in i18n messages + the PRODUCT_IMAGES map.

This script:
  1. Reads the catalog page to extract PRODUCT_IMAGES
  2. Reads the i18n messages to get product names
  3. Scans public/images/products for actual files
  4. Reads ProductJsonLd to understand the URL pattern
  5. Outputs a JSON mapping: product_url -> [image_urls]
"""

import json
import os
import re
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
PUBLIC_DIR = BASE_DIR / "public"
IMAGES_DIR = PUBLIC_DIR / "images" / "products"

# ── 1. Product image map from catalog/page.tsx ──────────────────────────────
PRODUCT_IMAGES = {
    "micrystal": "/images/products/micrystal.webp",
    "greenmax": "/images/products/greenmax.png",
    "mimax": "/images/products/mimax.png",
    "blumax": "/images/products/blumax.png",
    "nutrimax": "/images/products/nutrimax.png",
    "fleximax": "/images/products/fleximax.png",
    "machoman": "/images/products/machoman.png",
    "mitown": "/images/products/mitown2.webp",
}

# ── 2. Product names from i18n ───────────────────────────────────────────────
with open(BASE_DIR / "src" / "messages" / "ru.json", encoding="utf-8") as f:
    ru_messages = json.load(f)

PRODUCTS_I18N = ru_messages["products"]

# ── 3. Actual files on disk ──────────────────────────────────────────────────
actual_files: dict[str, list[str]] = {}
if IMAGES_DIR.exists():
    for f in sorted(IMAGES_DIR.iterdir()):
        if f.is_file():
            stem = f.stem  # e.g. "blumax" from "blumax.avif"
            rel = f"/images/products/{f.name}"
            actual_files.setdefault(stem, []).append(rel)

# ── 4. Build the mapping ─────────────────────────────────────────────────────
BASE_URL = "https://m-international.kz"

result = {}

catalog_products = [
    ("micrystal", "MiCrystal"),
    ("greenmax", "GreenMAX"),
    ("mimax", "MiMAX"),
    ("blumax", "BluMAX"),
    ("nutrimax", "NutriMAX"),
    ("fleximax", "FleXiMAX"),
    ("machoman", "Macho Man"),
    ("mitown", "Mi Town"),
]

for key, name in catalog_products:
    # URL pattern from ProductJsonLd: {baseUrl}/products/{slug}
    slug = name.lower().replace(" ", "-")
    product_url = f"{BASE_URL}/products/{slug}"

    # Collect image URLs
    images = set()

    # Primary image from PRODUCT_IMAGES map
    primary = PRODUCT_IMAGES.get(key)
    if primary:
        images.add(f"{BASE_URL}{primary}")

    # All actual files matching this product stem
    # Handle "mitown" -> "mitown2"
    stems_to_check = [key]
    if key == "mitown":
        stems_to_check.append("mitown2")

    for stem in stems_to_check:
        for ext in ["avif", "webp", "png", "jpg", "jpeg"]:
            candidate = IMAGES_DIR / f"{stem}.{ext}"
            if candidate.exists():
                images.add(f"{BASE_URL}/images/products/{candidate.name}")

    # Also check for any file whose stem starts with the key
    for stem_key, paths in actual_files.items():
        if stem_key.startswith(key):
            for p in paths:
                images.add(f"{BASE_URL}{p}")

    # Deduplicate and sort by format preference
    ordered = sorted(images, key=lambda u: (
        0 if ".webp" in u else 1 if ".avif" in u else 2 if ".png" in u else 3
    ))

    result[product_url] = ordered

# ── 5. Write output ──────────────────────────────────────────────────────────
output_path = BASE_DIR / "product_images.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(result)} products -> {output_path}")
for url, imgs in result.items():
    print(f"  {url}")
    for img in imgs:
        print(f"    {img}")
