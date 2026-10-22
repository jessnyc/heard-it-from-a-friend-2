# Heard It From a Friend — V3

This is the complete replacement **Vite React** project. Upload the **contents** (not the enclosing folder) into a clean GitHub repository. Vercel framework preset: **Vite**, root: `./`. Build command: `npm run build`.

## Changes
- Compact cards, fixed overflowing notes/source labels, responsive map/list layout.
- **Three independent, one-click card controls**: Want to Go (bookmark), My Favorites (heart), Visited (check). Clicking them does *not* open the details.
- Dedicated sidebar filters and nested per-person Friends' Finds.
- NYC and SF demo containing **real businesses**; names and locations are real, but sample friends and comments are fictional and labeled as such. Approximate demo coordinates, not survey-grade geocoding.
- Notes, tags, source labels, imports, map and list views remain.

## Important setup limits
Without Supabase configuration this is a **browser-local demo**, not private multi-user accounts; state persists in that browser only. To enable Supabase, run `supabase/schema.sql` and set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Restrict invitations in Supabase Auth settings. To enable AI extraction, set `OPENAI_API_KEY` on Vercel (server-side only). The direct Google Maps public URL extractor is **not implemented**; CSV import is the fallback.

Existing V2 browser data uses a different localStorage key so the new NYC/SF starter data appears immediately. Production Supabase datasets are not reset by this update.

## Demo locations
Lilia, 567 Union Ave NYC; Devoción Williamsburg, 148 Grand St NYC; Sightglass SoMa, 270 7th St SF; Toronado, 547 Haight St SF. See official establishment websites to reconfirm current details.
