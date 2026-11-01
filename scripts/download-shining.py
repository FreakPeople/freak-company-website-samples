"""Download publicly observed source assets; keep their origin in a manifest."""
import concurrent.futures,json,pathlib,re,subprocess
ROOT=pathlib.Path(__file__).resolve().parents[1]
base='https://co1108.shiningcorp.com'
html=subprocess.check_output(['curl','-fLsS','--max-time','40',base+'/index.php?device=pc&designkits=1'],text=True)
paths=set(re.findall(r'<img src="([^"]+)"',html))
for css_path in ['/sh_img/index/main_banner/style.css']:
 css=subprocess.check_output(['curl','-fLsS','--max-time','40',base+css_path],text=True)
 paths.update(re.findall(r"url\([\'\"]?(/sh_img/[^)\'\"]+)",css))
urls=[base+p for p in paths]
urls += ['https://cdn.jsdelivr.net/korean-webfonts/1/corps/lottemart/LotteMartDream/LotteMartDream'+weight+'.woff2' for weight in ['Medium','Bold','Light']]
def get(url):
 relative=url.split(base+'/')[-1] if url.startswith(base) else 'fonts/'+url.rsplit('/',1)[1]
 dest=ROOT/'public/sites/shining'/relative
 dest.parent.mkdir(parents=True,exist_ok=True)
 subprocess.run(['curl','-fLsS','--max-time','40',url,'-o',str(dest)],check=True)
 return {'source':url,'local':'/sites/shining/'+relative,'bytes':dest.stat().st_size}
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
 assets=list(pool.map(get,sorted(urls)))
(ROOT/'docs/research/shining/assets.json').write_text(json.dumps(assets,ensure_ascii=False,indent=2)+'\n')
print('Downloaded',len(assets),'assets')
