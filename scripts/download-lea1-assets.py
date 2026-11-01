"""Re-fetch the public reference assets recorded in the research asset map."""
import concurrent.futures
import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def download(item):
  destination = ROOT / 'public' / item['local'].lstrip('/')
  destination.parent.mkdir(parents=True, exist_ok=True)
  request = urllib.request.Request(item['source'], headers={'User-Agent': 'Mozilla/5.0'})
  with urllib.request.urlopen(request, timeout=45) as response:
    destination.write_bytes(response.read())
  return destination.name


if __name__ == '__main__':
  items = json.loads((ROOT / 'docs/research/lea1/asset-map.json').read_text())
  with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    for name in pool.map(download, items):
      print(name)
