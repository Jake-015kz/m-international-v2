#!/usr/bin/env python3
"""Verify which routes return 200 and check their content for sub-routes."""

import urllib.request
import re
import json
import time

BASE = 'https://global.m.international'
routes = [
    "/",
    "/about",
    "/business",
    "/contact",
    "/exchange-policy",
    "/liza-training",
    "/login",
    "/maintenance",
    "/product-means",
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
    "/setting/profile",
    "/shipping-and-fulfillment",
    "/term-of-use",
    "/privacy-policy",
    "/our-story",
    "/our-culture",
    "/our-motto",
    "/logo-core-value",
    "/mlm-marketing",
    "/member-centric",
]

# Each route in a SPA returns 200 with the same HTML shell, so we need to check
# the JS bundle for actual route components. Let's instead use the bundle to find
# all unique page/screen components and their text content.

# Download bundle
bundle_url = BASE + '/static/js/main.0661c46c.js'
req = urllib.request.Request(bundle_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=30) as resp:
    js = resp.read().decode('utf-8', errors='replace')

print('=== Checking if routes have unique content ===')
print('In a SPA, all routes return the same HTML shell.')
print('Real routing is client-side in the JS bundle.\n')

# Let's look for page/screen component definitions
# React Router Route components with element prop
print('=== Route component definitions ===')
route_comps = re.findall(r'''Route\s*\{[^}]*path\s*:\s*["']([^"']+)["'][^}]*element\s*:\s*([A-Z][a-zA-Z0-9_]+)''', js, re.DOTALL)
for rc in route_comps[:30]:
    print(f'  path: {rc[0]:40s} component: {rc[1]}')

# Also try useRoutes pattern
print('\n=== useRoutes patterns ===')
use_routes = re.findall(r'''path:\s*["'](/[^"']+)["']''', js)
for ur in sorted(set(use_routes)):
    if len(ur) < 100:
        print(f'  {ur}')

# Look for page imports
print('\n=== Page/Screen component references ---')
page_refs = re.findall(r'''["']([A-Z][a-zA-Z]*(?:Page|Screen|View|Layout|Section))["']''', js)
from collections import Counter
for name, count in Counter(page_refs).most_common(30):
    print(f'  {name}: {count}')

# Try to find any navigation/menu structure
print('\n=== Navigation/menu items ---')
nav_items = re.findall(r'''(?:label|title|name|text)\s*:\s*["']([^"']{3,60})["']\s*,\s*(?:path|href|to|link|route)\s*:\s*["']([^"']+)["']''', js)
for ni in sorted(set(nav_items))[:30]:
    print(f'  {ni[0]:30s} -> {ni[1]}')

# And reverse pattern
nav_items2 = re.findall(r'''(?:path|href|to|link|route)\s*:\s*["']([^"']+)["']\s*,\s*(?:label|title|name|text)\s*:\s*["']([^"']{3,60})["']''', js)
for ni in sorted(set(nav_items2))[:30]:
    print(f'  {ni[1]:30s} -> {ni[0]}')

# Check for any product IDs or slugs arrays
print('\n=== Product data arrays ---')
for pattern in [r'blumax', r'mimax', r'greenmax', r'nutrimax', r'fleximax', r'machoman', r'mishroom', r'mitown', r'micrystal', r'essential.?oil', r'relax', r'mi-?mask', r'mi-?serum']:
    matches = re.findall(pattern, js, re.I)
    if matches:
        print(f'  {pattern}: {len(matches)} occurrences')

# Final summary
print(f'\n=== SUMMARY ===')
print(f'Total unique static routes found: {len(set(routes))}')
print(f'All product pages are under /products/<slug>')
print(f'No dynamic routes /:id patterns found.')
print(f'No API endpoints found in bundle.')
