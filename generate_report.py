#!/usr/bin/env python3
"""Generate final crawl report."""

import json

BASE = 'https://global.m.international'

all_routes = {
    "products": [
        "/products",
        "/products/blumax",
        "/products/essential-oil",
        "/products/fleximax",
        "/products/greenmax",
        "/products/machoman",
        "/products/mi-mask",
        "/products/mi-serum",
        "/products/micrystal",
        "/products/mimax",
        "/products/mishroom",
        "/products/mitown",
        "/products/nutrimax",
        "/products/relax",
        "/products/ye-katerina",
    ],
    "categories": [
        "/product-means",
    ],
    "info_pages": [
        "/about",
        "/business",
        "/contact",
        "/exchange-policy",
        "/liza-training",
        "/our-story",
        "/our-culture",
        "/our-motto",
        "/logo-core-value",
        "/mlm-marketing",
        "/member-centric",
        "/shipping-and-fulfillment",
        "/privacy-policy",
        "/term-of-use",
    ],
    "utility": [
        "/",
        "/login",
        "/maintenance",
        "/setting/profile",
    ]
}

# Flatten with full URLs
report = {
    "site": BASE,
    "crawl_method": "JS bundle static analysis (SPA - React)",
    "total_unique_routes": 0,
    "routes": []
}

for category, paths in all_routes.items():
    for path in paths:
        report["routes"].append({
            "url": BASE + path,
            "path": path,
            "category": category,
        })
        report["total_unique_routes"] += 1

out = '/storage/repos/m-international-v2/crawl_report.json'
with open(out, 'w') as f:
    json.dump(report, f, indent=2, ensure_ascii=False)

# Also create a simple text list
txt_out = '/storage/repos/m-international-v2/crawl_urls.txt'
with open(txt_out, 'w') as f:
    f.write(f'# Crawl results for {BASE}\n')
    f.write(f'# Total unique routes: {report["total_unique_routes"]}\n')
    f.write(f'# Method: JS bundle static analysis (SPA - React)\n\n')
    for category, paths in all_routes.items():
        f.write(f'\n## {category.upper()} ({len(paths)} pages)\n')
        for path in paths:
            f.write(f'{BASE}{path}\n')

print(f'Total unique routes: {report["total_unique_routes"]}')
print(f'  Products:      {len(all_routes["products"])}')
print(f'  Categories:    {len(all_routes["categories"])}')
print(f'  Info pages:    {len(all_routes["info_pages"])}')
print(f'  Utility:       {len(all_routes["utility"])}')
print(f'\nJSON report: {out}')
print(f'Text list:   {txt_out}')
