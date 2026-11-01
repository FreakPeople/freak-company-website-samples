# Validation

- `PATH=/opt/homebrew/bin:$PATH npm run check`: passed ESLint, TypeScript and production build.
- `git diff --check`: passed.
- Existing development server reused at http://127.0.0.1:3000.
- Homepage and `/index.php?device=pc&designkits=1` both rendered in browser.
- Desktop at 1600×900: hero 900px; statistics 360px; business 1150px; product 1759px; rental 1200px; contact 869px. These match the original desktop section measurements within rounding.
- Checked 390×844 mobile, 1600×900 desktop and 1920×1080 wide desktop. No horizontal document overflow at 390, 1600 or 1920; no failed image elements.
- Exercised hero next, business next/previous, mobile menu open/close and desktop keyboard dropdown expansion. Counter final values 20, 1,200, 102 verified.
- Browser console error/warning logs empty during local route check.
- Evidence: `docs/design-references/shining/` contains source/local desktop and mobile references and side-by-side comparison images. Slideshow and reveal capture timing can differ.

## Intentional differences and limits

- The original supplied URL forces a 1600px PC layout and crops on narrow screens. Local provides a responsive layout and mobile menu instead.
- Detail pages, boards, policies and brochure are outside the single-page clone and retain original destinations.
- Reveal behavior uses IntersectionObserver and CSS; business uses a React/CSS looping slider instead of the original jQuery/Swiper stack. Transition easing and English font rasterization may differ slightly.
- Hover pauses autoplay for usability. Reduced-motion preferences disable autoplay and animations.
- Local work only: no deployment or backend changes.
