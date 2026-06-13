#!/usr/bin/env python3
"""Inspect the SPA HTML to find routes using urllib."""

import urllib.request
import re

req = urllib.request.Request(
    'https://global.m.international/',
    headers={'User-Agent': 'Mozilla/5.0'}
)
with urllib.request.urlopen(req, timeout=15) as resp:
    html = resp.read().decode('utf-8', errors='replace')

print('Length:', len(html))

scripts = re.findall(r'src="(/[^"]+\.js)"', html)
print('JS scripts:', scripts)

hrefs = re.findall(r'href="([^"]+)"', html)
print('HREFs:', hrefs[:30])

print()
print(html[:3000])
