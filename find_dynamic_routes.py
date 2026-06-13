#!/usr/bin/env python3
"""Try to find dynamic route patterns like /products/:id"""

import urllib.request
import re

bundle_url = 'https://global.m.international/static/js/main.0661c46c.js'
req = urllib.request.Request(bundle_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req, timeout=30) as resp:
    js = resp.read().decode('utf-8', errors='replace')

# Find route patterns with params (React Router style :param)
param_routes = re.findall(r'''["'](/[a-zA-Z0-9/_\-\.{}:]*(?::[a-zA-Z_]+)[a-zA-Z0-9/_\-\.{}:]*)["']''', js)
print(f'Parametric routes: {len(set(param_routes))}')
for r in sorted(set(param_routes)):
    if not re.search(r'\.(js|css|png|jpg|jpeg|svg|gif|ico|woff|ttf|eot|mp4|webp|json)$', r):
        print(f'  {r}')

# API endpoints
api_calls = re.findall(r'''["']((?:/api/|/v\d+/)[^"']+)["']''', js)
print(f'\nAPI endpoints: {len(set(api_calls))}')
for a in sorted(set(api_calls)):
    print(f'  {a}')

# Product detail patterns
print('\n--- Product detail patterns ---')
detail = re.findall(r'''(?:path|route|to)\s*["']\/products\/([^"']+)["']''', js)
for d in sorted(set(detail)):
    print(f'  /products/{d}')

# Category patterns
print('\n--- Category patterns ---')
cat = re.findall(r'''(?:path|route|to)\s*["']\/(categories|category|catalog|shop)(\/[^"']*)?["']''', js)
for c in sorted(set(cat)):
    print(f'  /{c[0]}{c[1]}')

# Template literals with product paths
print('\n--- Template literal routes ---')
templates = re.findall(r'`([^`]*/products/[^`]*)`', js)
for t in sorted(set(templates))[:20]:
    print(f'  {t}')
