# Shining rental homepage

Source: https://co1141.shiningcorp.com/index.php?device=pc&designkits=1
Local: `/` and `/index.php?device=pc&designkits=1` share the homepage.
Ownership: `src/components/sites/shining/`, `src/app/globals.css`, `public/sites/shining/`.

## Evidence and layout
- Source is PC-only: no viewport meta and min-width 1600px. At narrow browser widths it crops horizontally. Local adds a usable responsive layout below 1000px while retaining desktop measurements.
- Fixed 100px header. White logo asset 154×19; invert to dark after scroll. Four navigation columns expand on pointer/focus with all submenu links.
- Hero: 100vh, center/cover background, 3 supplied JPEGs; fade 1000ms, autoplay 3500ms, previous/next buttons. Copy max-width 1500, left centered, top 27%. Heading 60/81px, subtitle 18px blue, body 15px.
- Counts: 1500px max-width, three columns, padding 70px 60px 43px, animated to 20/1200/102 on entry.
- Business: dark wave backdrop, 1150px height; title padding 160px 60px 110px, 40px heading, 620×550 image, adjacent text and preview of following card. Looping carousel autoplay 2500ms, transition 800ms.
- Product: padding 150px 0 210px. Center title; 50% sticky photo (960px, top100px); four staggered notice cards, 420px tall.
- Rental: top divider, two-column title/body, panoramic team photo, blue 276px square detail link floating above photo.
- Contact: right aligned 40px title, two horizontal bordered rows.
- Footer: #222, logo and policies, company/address data, brochure link, copyright.
- Korean font NanumSquareNeo regular/light/bold/extra; English Outfit. Exact downloaded asset mapping in asset-map.json.

## Scope
Only supplied homepage is cloned. Navigation, detail, notices, policy and brochure links retain original external destinations; no backend is copied. Add reduced-motion handling, keyboard focus and mobile menu.
