# Repository Guidelines

## Project Structure & Module Organization
- `src/app/`: Next.js App Router entrypoints (`layout.tsx`, `page.tsx`, and route folders like `admin/`).
- `src/components/`: Reusable UI and feature components; `src/components/ui/` holds shared primitives.
- `src/lib/`: Business logic, integrations, and utilities (i18n, analytics, Supabase client, prayers/calendar data).
- `public/`: Static assets (icons, manifest, OG image, service worker).
- `supabase/`: Local Supabase config and SQL migrations in `supabase/migrations/`.

## Build, Test, and Development Commands
- `npm run dev`: Start local development server with Turbopack.
- `npm run build`: Create production build.
- `npm run start`: Serve the production build locally.
- `npm run lint`: Run ESLint (`next/core-web-vitals` + TypeScript rules).
- `npm run check:all`: Required pre-merge quality gate (`lint` + i18n + auth config + build).
- `npm run verify:prod -- --url=<url>`: Post-deploy smoke checks against a live URL.

## Coding Style & Naming Conventions
- Language: TypeScript with `strict` mode enabled.
- Indentation: 2 spaces, LF endings (`.editorconfig`).
- Imports: Use alias paths like `@/lib/...` and `@/components/...`.
- Components: File names use kebab-case (for example `prayer-counter.tsx`), exported React components use PascalCase.
- Utilities/data modules: keep focused modules in `src/lib/` with descriptive kebab-case names.

## Testing Guidelines
- No dedicated automated test framework is configured yet.
- Minimum gate for every change: `npm run check:all` and manual smoke testing in `npm run dev`.
- For UI changes, verify core flows (home, prayer counter, onboarding, auth/sync where applicable).
- If you add tests, colocate them as `*.test.ts`/`*.test.tsx` near the feature.

## Commit & Pull Request Guidelines
- Follow existing history style: short, imperative commit subjects (for example `Fix LitCal API v5 integration`, `Add offline PWA`).
- Keep commits scoped to one logical change.
- PRs should include:
  - concise summary of user-visible and technical changes,
  - linked issue/task (if available),
  - screenshots or short screen recordings for UI updates,
  - notes on env/config or migration impacts (`supabase/migrations/*`).

## Security & Configuration Tips
- Keep secrets in `.env.local`; never commit credentials.
- Required public env vars include `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Review `GOOGLE-OAUTH-SETUP.md` when changing auth or OAuth configuration.
