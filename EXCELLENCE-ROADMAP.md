# Two-Week Excellence Roadmap

## Mission

Deliver a stable, reverent, multilingual Franciscan prayer app with predictable releases and zero known critical issues.

## Current Baseline

- CI quality gate runs `npm run check:all` on PRs and `main`.
- Release flow enforces clean/synced `main` before production deploy.
- UI-key translation coverage is verified with `npm run verify:i18n`.
- Content translation integrity is verified with `npm run verify:content-i18n`.

## Week 1: Quality and Integrity

1. Audio text quality
   - Ensure call/response markers are normalized for speech and not spoken as abbreviations.
   - Regenerate any affected static audio assets.
   - Acceptance:
     - 0 sampled assets contain spoken `V.`/`R.` abbreviations.
2. Translation QA sweep
   - Run structural verification on every PR.
   - Perform manual review pass for each locale (`es`, `it`, `fr`, `zh`) on high-visibility screens.
   - Acceptance:
     - 100% pass on automated i18n checks.
     - No blocking translation issues in manual QA checklist.
3. Mobile critical flow pass
   - Validate home, prayer counter, reflections, stations, crown, onboarding/auth on small screens.
   - Acceptance:
     - No clipped/overflowing content at 360px width.
     - Tap targets remain usable and audio controls function.

## Week 2: Reliability and Polish

1. Production verification depth
   - Expand live smoke coverage with key route and asset assertions.
   - Acceptance:
     - Post-deploy script validates all core app routes and one audio asset per locale.
2. Error visibility
   - Ensure production telemetry captures auth, sync, and playback failures with actionable context.
   - Acceptance:
     - Every top-level failure path records a structured event.
3. Release discipline
   - Keep deploy-only-from-`main` and fix-forward policy.
   - Acceptance:
     - Every release has known commit SHA + successful smoke check log.

## Non-Negotiable Exit Criteria

- `npm run check:all` passes.
- `npm run ship:prod` passes end-to-end.
- No open Sev-1/Sev-2 bugs.
- Manual mobile + multilingual smoke pass completed.
