# Single-page navigation

- Header, menu overlay, logo, calls to action and footer now use only fragment links with real targets in the current document.
- Kept introduction, collection, family activities, featured artist, museum introduction and contact. Removed unsupported search, language switching, ticket ordering, membership, sponsor/social navigation and newsletter signup.
- Artwork and feature cards are informational rather than links to nonexistent detail pages.
- Contact email can be copied in place; no mailto or external website navigation remains.
- Existing direct `/en` URL remains an alias, but no menu navigates between pages.
- Validation: lint, typecheck and production build pass; browser audit reports zero external/non-fragment/missing-target links; mobile menu closes after choosing Families, with pathname unchanged.
