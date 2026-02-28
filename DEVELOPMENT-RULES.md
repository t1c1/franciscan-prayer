# Development Rules

These are non-negotiable rules for every change going forward.

## 1) Definition of Done

A change is not done until all of the following are true:

- `npm run check:all` passes locally.
- Auth-impacting changes also pass `npm run verify:auth-config`.
- Production deploy succeeds.
- Post-deploy health check succeeds:
  - `npm run verify:prod -- --url=https://franciscan-prayer.pages.dev`

## 2) Quality Gates (Required)

- Never skip lint/type/build checks.
- Never ship missing translations for any `t("...")` key.
- Never ship incomplete translated content datasets (prayers, reflections, calendar, quotes).
- Never ship known auth errors without telemetry.
- Never deploy with unresolved TODO/FIXME in touched files.

## 3) Auth Safety Rules

- Any auth code change must preserve:
  - email sign in/up,
  - Google OAuth start flow,
  - session restore on reload,
  - sign out.
- Track auth failures with structured event data.
- Treat sync/persistence failures as first-class errors (log + telemetry).

## 4) i18n Rules

- Every new user-facing string must have entries in: `en`, `es`, `it`, `fr`, `zh`.
- Use translation keys, not inline locale conditionals, for UI text.
- Keep prayer and liturgical language reverent and consistent across locales.
- Run both `npm run verify:i18n` and `npm run verify:content-i18n` before merge.

## 5) Deploy Discipline

- Deploy from committed `main` only.
- Production should map to a known commit SHA.
- If post-deploy checks fail, fix-forward immediately.
- `npm run verify:release-state` must pass before `ship:prod`.

## 6) Scope Discipline

- Keep commits focused and reviewable.
- Do not mix unrelated UI experiments into reliability/security commits.
- Document every new script/workflow in `DEPLOYMENT.md`.
