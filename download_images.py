#!/usr/bin/env python3
"""
Verify and organize all product images from product_images.json into category folders.
Copies from public/images/products/ (which has all images) into the right category subfolders.
Handles dedup, logs everything.
"""

import json
import os
import shutil
import hashlib
from pathlib import Path

WORKSPACE = "/storage/repos/m-international-v2"
IMAGES_FILE = os.path.join(WORKSPACE, "product_images.json")
CATEGORY_DIR = os.path.join(WORKSPACE, "category_structure")
LOG_FILE = os.path.join(WORKSPACE, "download_log.json")
PRODUCTS_DIR = os.path.join(WORKSPACE, "public/images/products")

# Map product slug -> category folder
PRODUCT_TO_CATEGORY = {
    "micrystal": "vision",
    "greenmax": "detox",
    "mimax": "immunity",
    "blumax": "immunity",
    "nutrimax": "nutrition",
    "fleximax": "joints",
    "macho-man": "mens",
    "mi-town": "detox",
}

# Filename variants in public/images/products/
FILENAME_MAP = {
    "micrystal": "micrystal",
    "greenmax": "greenmax",
    "mimax": "mimax",
    "blumax": "blumax",
    "nutrimax": "nutrimax",
    "fleximax": "fleximax",
    "macho-man": "machoman",
    "mi-town": "mitown2",
}


def slug_from_url(url):
    return url.rstrip("/").split("/")[-1]


def md5(path):
    with open(path, "rb") as f:
        return hashlib.md5(f.read()).hexdigest()


def find_source_images(slug):
    """Find all source images for a product slug in public/images/products/."""
    fname = FILENAME_MAP.get(slug, slug)
    results = []
    for f in os.listdir(PRODUCTS_DIR):
        if f.startswith(fname + "."):
            results.append(os.path.join(PRODUCTS_DIR, f))
    return sorted(results)


def main():
    with open(IMAGES_FILE) as f:
        data = json.load(f)

    log = {"copied": [], "already_exists": [], "source_missing": [], "errors": []}
    seen_hashes = {}

    for product_url, image_urls in data.items():
        slug = slug_from_url(product_url)
        category = PRODUCT_TO_CATEGORY.get(slug)
        if not category:
            msg = f"No category for slug '{slug}'"
            print(f"  [WARN] {msg}")
            log["errors"].append({"slug": slug, "error": msg})
            continue

        cat_dir = os.path.join(CATEGORY_DIR, slug)
        os.makedirs(cat_dir, exist_ok=True)

        source_images = find_source_images(slug)
        if not source_images:
            msg = f"No source images found for '{slug}' in public/images/products/"
            print(f"  [MISSING] {msg}")
            log["source_missing"].append({"slug": slug, "error": msg})
            continue

        for idx, src_path in enumerate(source_images, start=1):
            ext = src_path.rsplit(".", 1)[-1]
            dest_name = f"{slug}_{idx:02d}.{ext}"
            dest_path = os.path.join(cat_dir, dest_name)

            if os.path.exists(dest_path):
                log["already_exists"].append({"slug": slug, "file": dest_name})
                print(f"  [EXISTS] {category}/{slug}/{dest_name}")
                continue

            shutil.copy2(src_path, dest_path)
            file_hash = md5(dest_path)

            is_dup = file_hash in seen_hashes
            seen_hashes[file_hash] = dest_path

            entry = {
                "slug": slug,
                "category": category,
                "src": src_path,
                "dest": dest_path,
                "size": os.path.getsize(dest_path),
                "duplicate": is_dup,
            }
            log["copied"].append(entry)
            dup_flag = " [DUP CONTENT]" if is_dup else ""
            print(f"  [COPY] {category}/{slug}/{dest_name} ({entry['size']} bytes){dup_flag}")

    with open(LOG_FILE, "w") as f:
        json.dump(log, f, indent=2, ensure_ascii=False)

    total_copied = len(log["copied"])
    total_exists = len(log["already_exists"])
    total_missing = len(log["source_missing"])
    total_errors = len(log["errors"])

    print(f"\n{'='*60}")
    print(f"ORGANIZE COMPLETE")
    print(f"  Copied:        {total_copied}")
    print(f"  Already existed: {total_exists}")
    print(f"  Source missing:  {total_missing}")
    print(f"  Errors:          {total_errors}")
    print(f"  Log: {LOG_FILE}")
    print(f"{'='*60}")

    if log["source_missing"]:
        print("\nMissing source images:")
        for item in log["source_missing"]:
            print(f"  {item['slug']}: {item['error']}")

    # Final inventory
    print("\nFinal inventory:")
    for cat in sorted(os.listdir(CATEGORY_DIR)):
        cat_path = os.path.join(CATEGORY_DIR, cat)
        if not os.path.isdir(cat_path):
            continue
        products = []
        for prod in sorted(os.listdir(cat_path)):
            prod_path = os.path.join(cat_path, prod)
            if os.path.isdir(prod_path):
                files = list(Path(prod_path).glob("*"))
                img_files = [f for f in files if f.suffix in (".webp", ".avif", ".png", ".jpg", ".jpeg")]
                products.append(f"{prod} ({len(img_files)} images)")
        if products:
            print(f"  {cat}/:")
            for p in products:
                print(f"    {p}")


if __name__ == "__main__":
    main()
