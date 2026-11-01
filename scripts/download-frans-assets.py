"""Download the public media observed on the reference homepage."""
import concurrent.futures,json,pathlib,subprocess
root=pathlib.Path(__file__).resolve().parents[1]
assets=json.loads((root/'docs/research/frans-hals-museum/asset-map.json').read_text())
def download(item):
 name,url=item;dest=root/'public/sites/frans-hals-museum'/name
 result=subprocess.run(['curl','-fL','--retry','2','--max-time','120','-sS',url,'-o',str(dest)],capture_output=True,text=True)
 return name,result.returncode,dest.stat().st_size if dest.exists() else result.stderr
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 for result in pool.map(download,assets.items()):print(*result)
