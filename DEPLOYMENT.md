# Deployment Runbook

## Production flow

1. Validate code and types:
   - `npm run check:all`
2. Deploy to Cloudflare Pages:
   - `npm run deploy:prod`
3. Run live smoke checks:
   - `npm run verify:prod -- --url=https://franciscan-prayer.pages.dev`

## One-command ship

- `npm run ship:prod`

This runs build, deploy, then production health checks.

## Additional safeguards

- Translation coverage check:
  - `npm run verify:i18n`
- Auth/OAuth config check:
  - `npm run verify:auth-config`
