#!/usr/bin/env python3
"""Recursive crawler for global.m.international — collects all product and category URLs."""

import re
import sys
import time
import json
from urllib.parse import urljoin, urlparse
from collections import deque

try:
    import requests
    from bs4 import BeautifulSoup
except ImportError:
    import subprocess
    subprocess.check_call([sys.executable, "-m", "pip", "install", "requests", "beautifulsoup4", "-q"])
    import requests
    from bs4 import BeautifulSoup

BASE_URL = "https://global.m.international/"
DOMAIN = "global.m.international"
MAX_PAGES = 500
DELAY = 0.3

visited = set()
queue = deque([BASE_URL])
results = {
    "all_urls": [],
    "product_urls": [],
    "category_urls": [],
    "other_urls": [],
    "errors": [],
}

session = requests.Session()
session.headers.update({
    "User-Agent": "Mozilla/5.0 (compatible; HermesCrawler/1.0)"
})

def classify(url):
    p = urlparse(url)
    path = p.path.rstrip("/")
    if re.search(r"/product[s]?/", path, re.I):
        return "product"
    if re.search(r"/categor(y|ies)/", path, re.I):
        return "category"
    if re.search(r"/shop|/catalog|/collection|/item", path, re.I):
        return "category"
    return "other"

count = 0
while queue and count < MAX_PAGES:
    url = queue.popleft()
    normalized = url.split("#")[0].rstrip("/")
    if normalized in visited:
        continue
    if DOMAIN not in urlparse(url).netloc:
        continue

    visited.add(normalized)
    count += 1

    try:
        resp = session.get(url, timeout=15, allow_redirects=True)
        resp.raise_for_status()
    except Exception as e:
        results["errors"].append({"url": url, "error": str(e)})
        continue

    ct = resp.headers.get("Content-Type", "")
    if "html" not in ct:
        continue

    soup = BeautifulSoup(resp.text, "html.parser")
    page_type = classify(url)
    entry = {"url": url, "type": page_type, "title": ""}
    title_tag = soup.find("title")
    if title_tag:
        entry["title"] = title_tag.get_text(strip=True)

    results["all_urls"].append(entry)
    if page_type == "product":
        results["product_urls"].append(entry)
    elif page_type == "category":
        results["category_urls"].append(entry)
    else:
        results["other_urls"].append(entry)

    print(f"[{count}] {page_type:10s} {url}")

    for a in soup.find_all("a", href=True):
        href = a["href"]
        full = urljoin(url, href)
        parsed = urlparse(full)
        if DOMAIN not in parsed.netloc:
            continue
        clean = full.split("#")[0].rstrip("/")
        if clean not in visited:
            queue.append(full)

    time.sleep(DELAY)

# Save results
out_path = "/storage/repos/m-international-v2/crawl_results.json"
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"\n{'='*60}")
print(f"Crawl complete: {count} pages visited")
print(f"  All URLs:     {len(results['all_urls'])}")
print(f"  Products:     {len(results['product_urls'])}")
print(f"  Categories:   {len(results['category_urls'])}")
print(f"  Other:        {len(results['other_urls'])}")
print(f"  Errors:       {len(results['errors'])}")
print(f"Results saved: {out_path}")
