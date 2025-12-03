# TODO: Fix Header Megamenu Data Display Issue

## Steps to Complete
- [x] Update Sanity Schema (header.ts): Change megaContent from a single object to an array of objects to support multiple sections per menu item.
- [x] Update Types (types.ts): Align MegaMenuItem to use megaContent (array) instead of megaMenu, and remove unused url field.
- [x] Update Query (layout.tsx): Change the fetch query to target megaContent instead of megaMenu.
- [x] Update Component (Header.tsx): Simplify section handling to use item.megaContent directly as an array, removing the megaMenu fallback.
- [ ] Test: Run the app to verify menus and mega menus display correctly.
