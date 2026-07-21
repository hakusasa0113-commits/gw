# Groundwork

Volunteering that strengthens your university personal statement — a Next.js
app that recommends volunteering opportunities matched to a student's
intended course, and helps them turn each one into personal statement
material.

This repo is a production-shaped starting point: the folder structure, data
model, API routes, and UI are all real and runnable. **A polished, fully
interactive standalone demo (no install required) is included separately as
`groundwork-demo.html`** — open it directly in a browser to see the full
experience end to end.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS**, with a small design-token system (see `app/globals.css`)
- **Supabase** for auth + Postgres database (schema in `supabase/schema.sql`)
- **Google Maps** (Places / Geocoding / Distance Matrix) for location search
  — not yet wired into the UI; see "Adding location search" below
- **@react-pdf/renderer** for CV PDF export

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in Supabase keys (see below)
npm run dev
```

The app runs immediately using the bundled sample dataset
(`data/sample-opportunities.json`) — you don't need Supabase configured to
click around the Discover and Dashboard pages locally.

## Folder structure

```
app/
  page.tsx                    Discover — course selection, filters, results
  opportunities/[id]/page.tsx Opportunity detail + personal statement assistant
  dashboard/page.tsx          Saved opportunities, CV preview, strength score
  api/opportunities/route.ts  GET — list/filter opportunities (Supabase-backed)
  api/saved/route.ts          GET/POST/PATCH/DELETE — a user's saved items
components/
  OpportunityCard.tsx
  CourseSelector.tsx
  PersonalStatementAssistant.tsx
lib/
  supabase/client.ts           Browser Supabase client
  supabase/server.ts           Server Supabase client (Server Components/routes)
  statement-score.ts           Personal statement strength scoring logic
types/index.ts                 Shared TypeScript types
data/
  courses.json                 Seed list of courses
  sample-opportunities.json    12 sample opportunities across 9 courses
supabase/schema.sql             Full Postgres schema + RLS policies + seed data
```

## Setting up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`. This creates:
   - `profiles`, `courses`, `organisations`, `opportunities`
   - `saved_opportunities` (a user's saved/in-progress/completed items)
   - `completed_volunteering` (a durable history log for the CV/portfolio)
   - Row Level Security policies so users can only read/write their own data
3. Copy your project URL and anon key from **Project Settings → API** into
   `.env.local`.
4. Seed the `organisations` and `opportunities` tables — you can adapt
   `data/sample-opportunities.json` into insert statements, or write a small
   script with `@supabase/supabase-js` and the service role key.
5. Enable email auth (or a provider of your choice) under
   **Authentication → Providers**.

### Connecting real data

`app/page.tsx` and `app/dashboard/page.tsx` currently read from the bundled
sample JSON so the app works before Supabase is configured. Once your
database is seeded, swap those local reads for `fetch("/api/opportunities")`
and `fetch("/api/saved")` respectively.

## Adding location search (Google Maps)

1. Enable the **Places API**, **Geocoding API**, and **Distance Matrix API**
   in Google Cloud Console, and add the key to `.env.local`.
2. Use Geocoding to resolve a postcode/town search into lat/lng.
3. Use the Distance Matrix API (mode: walking / transit) against each
   opportunity's stored `lat`/`lng` to compute walk time and distance for the
   accessibility filters.
4. Cache results per postcode to avoid re-querying on every filter change.

## Integrating external volunteering sources

The `organisations.source` and forthcoming ingestion layer are designed to
support pulling in listings from Do-it, Reach Volunteering, NHS Volunteer
Responders, CharityJob, local council portals, and university volunteering
programmes. The recommended pattern is a scheduled ingestion job (e.g. a
Supabase Edge Function or a cron-triggered API route) that:

1. Fetches/parses each source (API where available, otherwise a structured
   scrape respecting each site's terms of use).
2. Normalises listings into the `opportunities` schema, tagging `course_slugs`
   using a keyword/skill mapping.
3. Upserts into Supabase, keyed by source + external ID, so re-runs update
   rather than duplicate listings.

## CV export

`app/dashboard/page.tsx` renders a CV preview. Wire up `@react-pdf/renderer`
(already in `package.json`) to render the same data as a downloadable PDF —
the standalone HTML demo includes a working PDF export example (via jsPDF)
you can reference for the layout.

## Roadmap / nice-to-have features not yet built

- AI-assisted recommendations based on free-text career goals
- Opportunity ratings & reviews
- Calendar view + email reminders for upcoming sessions
- Badges/achievements for portfolio milestones
- Skill-gap matching against a target course's typical requirements
