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

This enforces release-state checks, then runs build, deploy, and production health checks.

## Additional safeguards

- Translation coverage check:
  - `npm run verify:i18n`
- Translation content integrity check:
  - `npm run verify:content-i18n`
- Auth/OAuth config check:
  - `npm run verify:auth-config`
- Release-state check:
  - `npm run verify:release-state`
