#!/usr/bin/env python3
"""Deep search for any sub-routes under products and other sections."""

import urllib.request
import re
import json

bundle_url = 'https://global.m.international/static/js/main.0661c46c.js'
req = urllib.request.Request(bundle_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=30) as resp:
    js = resp.read().decode('utf-8', errors='replace')

# Find ALL string literals starting with /products/ with more segments
all_product_strings = re.findall(r'''["'](\/products\/[a-zA-Z0-9\-]+(?:\/[a-zA-Z0-9\-]+)*)["']''', js)
print(f'All /products/* strings: {len(set(all_product_strings))}')
for s in sorted(set(all_product_strings)):
    print(f'  {s}')

# Find all string literals starting with any known section
for section in ['/about', '/business', '/setting', '/our-', '/member', '/logo', '/mlm', '/liza', '/locales']:
    matches = re.findall(rf'''["']({re.escape(section)}[a-zA-Z0-9\-/]*)["']''', js)
    if matches:
        unique = sorted(set(matches))
        if len(unique) > 1 or not unique[0].endswith('/'):
            print(f'\n--- {section}* ---')
            for m in unique:
                print(f'  {m}')

# Look for any 3+ segment paths
print('\n=== All 3+ segment paths ===')
all_paths = re.findall(r'''["'](\/[a-zA-Z0-9\-]+(?:\/[a-zA-Z0-9\-]+){2,})["']''', js)
filtered = set()
for p in all_paths:
    if not re.search(r'\.(js|css|png|jpg|jpeg|svg|gif|ico|woff|ttf|eot|mp4|webp|json|pdf)$', p):
        if len(p) < 150:
            filtered.add(p)
for p in sorted(filtered):
    print(f'  {p}')

# Check for product sub-pages like benefits, ingredients, how-to-use
print('\n=== Product sub-page keywords ===')
for keyword in ['benefit', 'ingredient', 'how-to', 'usage', 'review', 'faq', 'detail', 'info', 'description', 'composition', 'instruction']:
    pattern = rf'''["'](\/products\/[a-zA-Z0-9\-]+\/{keyword}[a-zA-Z0-9\-]*)["']'''
    matches = re.findall(pattern, js, re.I)
    if matches:
        print(f'  {keyword}: {sorted(set(matches))}')

# Also check the chunk files - there might be lazy-loaded chunks
print('\n=== Checking for chunk files ===')
html_resp = urllib.request.Request('https://global.m.international/', headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(html_resp, timeout=15) as r:
    html = r.read().decode('utf-8', errors='replace')

# Find all script/link references
all_refs = re.findall(r'''(?:src|href)="(/static/[^"]+)"''', html)
print(f'Static references in HTML: {all_refs}')

# Check if there are other JS chunks referenced in the main bundle
chunk_refs = re.findall(r'''["'](\/static\/js\/[^"']+)["']''', js)
print(f'JS chunk references in bundle: {sorted(set(chunk_refs))}')

# Also look for dynamic import patterns
dynamic_imports = re.findall(r'''import\s*\(\s*["']([^"']+)["']\s*\)''', js)
print(f'Dynamic imports: {len(set(dynamic_imports))}')
for di in sorted(set(dynamic_imports))[:20]:
    print(f'  {di}')
