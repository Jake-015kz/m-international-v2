#!/usr/bin/env python3
"""Download JS bundle and extract all routes/paths from it."""

import urllib.request
import re
import json

# Download the main JS bundle
bundle_url = 'https://global.m.international/static/js/main.0661c46c.js'
req = urllib.request.Request(bundle_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=30) as resp:
    js = resp.read().decode('utf-8', errors='replace')

print(f'Bundle size: {len(js)} chars')

# Extract string literals that look like routes (start with /)
# Match single and double quoted strings
route_patterns = re.findall(r'''["'](/[a-zA-Z0-9/_\-\.{}:]+)["']''', js)
print(f'Raw route-like strings found: {len(route_patterns)}')

# Deduplicate and filter
routes = set()
for r in route_patterns:
    # Skip static assets
    if re.search(r'\.(js|css|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf|eot|mp4|webp|json)$', r):
        continue
    # Skip very short or very long
    if len(r) < 2 or len(r) > 200:
        continue
    routes.add(r)

routes = sorted(routes)
print(f'Filtered unique routes: {len(routes)}')

# Categorize
products = [r for r in routes if re.search(r'/product', r, re.I)]
categories = [r for r in routes if re.search(r'/categor|/catalog|/collection|/shop|/brand', r, re.I)]
other_routes = [r for r in routes if r not in products and r not in categories]

print(f'\nProduct routes ({len(products)}):')
for r in products:
    print(f'  {r}')

print(f'\nCategory routes ({len(categories)}):')
for r in categories:
    print(f'  {r}')

print(f'\nOther routes ({len(other_routes)}):')
for r in other_routes:
    print(f'  {r}')

# Also try to find route definitions with patterns like path: "..." or route: "..."
print('\n--- Route definitions (path:/route: patterns) ---')
defs = re.findall(r'(?:path|route|href|to|from)\s*:\s*["\'](/[^"\']+)["\']', js)
for d in sorted(set(defs)):
    print(f'  {d}')

# Save all results
result = {
    "product_routes": products,
    "category_routes": categories,
    "other_routes": other_routes,
    "route_definitions": sorted(set(defs)),
    "all_routes": routes
}

out = '/storage/repos/m-international-v2/routes_from_bundle.json'
with open(out, 'w') as f:
    json.dump(result, f, indent=2)
print(f'\nSaved to {out}')
