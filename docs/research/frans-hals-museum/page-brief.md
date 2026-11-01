# Frans Hals Museum homepage reference

Inspected 2026-11-01. Source: https://franshalsmuseum.nl/en

## Route and ownership

| Source | Local | Files |
| --- | --- | --- |
| `/en` | `/en`, `/` | `src/app/en/page.tsx`, `src/app/page.tsx` |
| Homepage interface | Shared component | `src/components/sites/frans-hals-museum/museum.tsx`, `museum.css` |
| Artwork and activity cards | Data | `src/components/sites/frans-hals-museum/content.json` |
| Media and fonts | Local files | `public/sites/frans-hals-museum/` |

Other page, collection detail, search, ticketing, social, and language links retain their actual external destinations. No other museum page is implemented locally.

## Observations

- Full-width, looping muted hero video, rounded lower corners, pause/play control. Separate desktop and portrait mobile sources.
- Header has a 120px desktop / 80px mobile logo. Desktop primary links, search, language switch, ticket button and full-screen menu. Mobile shows language and menu.
- Rubik regular, medium, semibold and bold; downloaded from the observed font URLs.
- Theme: peach `#FECD8C`, near-black `#001317`, sage `#B9C089`, white `#FAFAFA`.
- Desktop: 1120px content at 1440px; hero 660px; 80px section spacing; 36px headings, 18px body at 28px leading. Wider view uses a 1280px container.
- Mobile: 16px outer gutters, 24px headings, 16px body at 24px leading. Hero at 390px measures ~557px on both source and local. Introduction image sits behind the inset text panel.
- Source section order: video, introduction, ten artwork cards, six family activity cards, Frans Hals feature, museum feature, footer/newsletter/partners/socials.
- Carousels use horizontal scrolling, arrows, disabled end states, hover image zoom. Mobile omits arrows and uses touch/native horizontal scrolling.
- Full-screen menu contains main navigation, directly-to panel, address, and additional mobile ticket/search links.
- Initial cookie modal has accept/reject choices. Local choice persists without third-party analytics.

## Assets and attribution

`asset-map.json` records observed public URLs and corresponding local filenames. `scripts/download-frans-assets.py` downloads them. Source design credit: Janneman (Jan Tijssen); implementation: Q42 / Online Museumplatform. Photography credits on source include Stefan Rustenburg, Eric Bosman, Maarten Nauw and Mo Schalkx. Social SVGs were extracted from the rendered HTML. These source assets are reference material, not a grant of a commercial reuse licence.

## Validation and comparison

Source and local were visually inspected through browser screenshots at desktop and mobile sizes. Browser screenshots were displayed in the working session; the available screenshot API did not provide an artifact path for storing captures.

| View/state | Source | Local | Observation |
| --- | --- | --- | --- |
| 1440px desktop | Hero 660px; centered 1120px area | Same measurements | Header and introduction structure closely matched |
| 390px mobile | Hero ~557px; 80px logo; 16px gutter | Same measurements | Portrait video, image and inset copy placement matched |
| Menu | Dark full-screen, main links and outlined direct-links panel | Same structure | Open, close and Escape verified |
| Carousels | Horizontal art/activity cards | Same content, native scroll, arrows | Right-arrow changes position, left state updates |
| 338 / 390 / 768 / 1440 / 1920px | Responsive source inspected at desktop/mobile | No document horizontal overflow in checked widths | Cards intentionally overflow inside scroll rails |

Browser checks: cookie dismissal, video pause changes control to Play, desktop/mobile menu, Escape dismissal, carousel movement, newsletter validation and continuation notice, and zero browser console errors. No broken loaded images at 390px. Build, lint and TypeScript pass.

## Known differences

- This is a homepage reference implementation, not a complete museum CMS or booking service.
- Newsletter has no mailing-list backend; submitting shows a continuation link to the museum, never a false success message.
- Menu easing, subtle hover overlays, some exact crops and spacing may differ. Video frames depend on playback time, so screenshots need not show the same frame.
- Cookie preferences are local preview state and do not load the museum's tracking systems.
