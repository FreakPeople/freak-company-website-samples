# lea1.imweb.me homepage clone

Inspected 2026-11-01. Implemented as editable React/Next.js components in the existing feature/SP-2 checkout. No publication or third-party writes.

## Route and file ownership

| Source | Local | Owner |
| --- | --- | --- |
| https://lea1.imweb.me/ | / | src/app/page.tsx → src/components/sites/lea1/dental-homepage.tsx |
| Results, medical team, clinic gallery, videos on the homepage | Same / route | src/components/sites/lea1/lower-sections.tsx |

Each component has its own CSS module. Shared reset/font/container: src/app/globals.css. Metadata/language: src/app/layout.tsx. Original image/font/map files: public/sites/lea1/. URL mappings, verified media types and byte sizes: asset-map.json. Re-download helper: scripts/download-lea1-assets.py.

Only the supplied homepage is in scope. /clinic, /about, /doctor, /event and /booking remain links to the source site. External social links retain remaintemp2.imweb.me. Home links return to local /. Telephone link remains tel:023454562. Source's empty inquiry/blog destinations resolve to the homepage. Mobile login links to the source login state.

## Observed design and behavior

- Pretendard font, locally served variable font, SIL OFL license retained.
- White sticky header: 82px desktop, 49px mobile. Mobile drawer 300px wide with backdrop, close button and Escape dismissal.
- Three-slide hero: 800px desktop, 380px mobile; 5s auto advance, 600ms horizontal slide; original controls hidden. Drag/swipe and left/right keys supported. White rounded base 50px / 30px.
- Max content width1260px; 15px mobile gutters. Services use horizontal expanding cards above1100px container width; vertical accordion below. 4s auto advance, hover/focus pause, click expansion.
- Strengths: text left / image right; stacked mobile with 4:3 image.
- Signature section: original dark pattern asset, 4 treatment steps, 3.5s auto advance and600ms fade. Buttons desktop, dots mobile; swipe supported. Prices wrap on tablet, native horizontal scroll with snap on mobile.
- Six before/after cases, two desktop columns and one mobile column; original result note and typography preserved.
- Two medical team cards; desktop photo/info rows and mobile photo/info columns.
- Five-image clinic gallery: 3s auto advance, hover/focus pause, arrows, thumbnails, keyboard and touch swipe. Mobile thumbnail strip and hidden arrows.
- Three video covers: source provides no media playback URLs and disables play buttons. Local preserves that state.
- Original map raster and visit/time cards; fixed side shortcuts become a56px mobile bottom bar.
- Footer preserves the source's narrow mobile AI-image notice caused by150px inner gutters. The hidden platform placeholder footer is not displayed.
- Entry reveals use IntersectionObserver and CSS; reduced-motion preferences respected by reveal styling.

## Validation

- npm run check passes (ESLint, TypeScript, production webpack build).
- Host default Node18 cannot run Next16; used /opt/homebrew/bin/node v25.6.1, satisfying package engines>=24. Run with Node24+.
- Removed stale generated .next/types references to an absent /en route before regenerating types; no authored route removed.
- Browser compared source and local at1440px desktop and390px mobile; also checked1920px maximum-width behavior.
- Main mobile section boundaries through Visit Us match source within0.01px in DOM measurements. Screenshots show different auto-carousel phases where capture timing differs; they are not synchronized animation frames.
- Confirmed mobile menu open/close, service expansion, treatment next button, gallery thumbnail selection. No horizontal document overflow at390px/1920px and no broken images after lazy-media scroll sweep.
- No local-origin runtime error observed in browser logs.

## Evidence and limits

Screenshots in docs/design-references/lea1/: source/local desktop full-page and top views, source/local mobile top views, local mobile full-page, and comparison montages. Full-page screenshots can include the sticky header at the capture scroll position.

No backend, bookings, login, video media, or subpages were invented. The source's placeholder business details, prices and claims are reproduced for reference and must be reviewed before real use. This implementation does not establish commercial reuse rights; previous rights review remains applicable. Asset owners and external component licenses beyond the bundled Pretendard OFL are not independently certified.
