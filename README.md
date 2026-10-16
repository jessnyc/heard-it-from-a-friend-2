# Heard It From a Friend — Version 2

A private recommendations map for friends, restaurants and other places.

## Updating your existing Vercel project

1. Unzip this package. In your existing GitHub repository (`heard-it-from-a-friend`), upload the **contents** of the `heard-it-from-a-friend` folder, replacing existing files with matching paths. Do not create a second repository.
2. Commit the changes to `main`. Vercel automatically attempts to rebuild your existing project.
3. The site initially uses local demo data until Supabase credentials are configured. Existing locally saved demo recommendations should remain in the same browser (the localStorage key is unchanged).
4. When you set up Supabase for the first time, run `supabase/schema.sql` in the SQL editor. If you already ran an older schema, also run the two `alter table` statements at the bottom of the updated schema. Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel and redeploy.
5. AI imports require OPENAI_API_KEY on Vercel, and proper authentication and testing. Do not publish API keys in GitHub. Public Google Maps saved-list URL importing is **not implemented**; CSV import remains available.

## Version 2 changes

- Bright teal, sage, blue, lavender and mauve with no yellow.
- New brand name and simplified typography.
- Expandable destination → collection filters in the desktop sidebar and mobile collection dropdown.
- People shown as plain text; sources shown as gradient pills (Google Maps green, Instagram/Muse blue, curated lists lilac, personal favorites pink).
- Editable personal favorites, notes, and comma-separated custom tags on place details.
- Search and filtering by tags.
- Original map, list, recommendation attribution, local demo, manual add and import screens retained.

## Limitations

- This update is not fully browser-build tested in the authoring environment. Vercel build logs will confirm success.
- Importing list links directly is not available; use CSV or paste text.
- City names are inherited from existing data (e.g., New York).
- If a place was previously saved in demo mode, the demo data is stored locally in that browser, not shared across users.

## Running locally

`npm install` then `npm run dev`.
