# Ignatius Guide Login Rollout (Google OAuth)

Use this checklist to enable and verify Google login from `ignatiusguide.com`.

## Goal

Allow users to click **Sign In with Google** on:

- `https://ignatiusguide.com`
- `https://www.ignatiusguide.com`

and return authenticated to the app.

## 1) Google Cloud Console

Open your OAuth client in Google Cloud:

1. Go to `APIs & Services` -> `Credentials`.
2. Open the OAuth client used by Supabase Auth.
3. In **Authorized JavaScript origins**, ensure these exist:
   - `https://ignatiusguide.com`
   - `https://www.ignatiusguide.com`
   - `https://franciscan-prayer.pages.dev`
   - `http://localhost:3000`
4. In **Authorized redirect URIs**, ensure this exact value exists:
   - `https://api.franciscanprayer.com/auth/v1/callback`
5. Save.

Important: do not set `ignatiusguide.com` as redirect URI in Google Cloud. The redirect URI remains the Supabase callback above.

## 2) Supabase Dashboard

Open the project in Supabase Dashboard:

1. Go to `Authentication` -> `Providers` -> `Google`.
2. Confirm Google is enabled and client ID/secret are correct.
3. Go to `Authentication` -> `URL Configuration`.
4. In **Redirect URLs**, ensure all of the following exist:
   - `https://ignatiusguide.com`
   - `https://ignatiusguide.com/**`
   - `https://www.ignatiusguide.com`
   - `https://www.ignatiusguide.com/**`
   - `https://franciscan-prayer.pages.dev`
   - `https://franciscan-prayer.pages.dev/**`
   - `http://localhost:3000`
   - `http://localhost:3000/**`
5. Save.

## 3) Repo Verification (already implemented)

The repo enforces these redirect entries in:

- `supabase/config.toml`
- `scripts/verify-auth-config.ts`

Run:

```bash
npm run verify:auth-config
```

Expected: `PASSED` with ignatiusguide redirect checks listed as `ok`.

## 4) Browser Verification

Test each domain directly in production:

1. Visit `https://ignatiusguide.com`.
2. Click **Sign In** -> **Continue with Google**.
3. Complete consent flow.
4. Confirm return to app with active session.
5. Refresh page and confirm session persists.
6. Sign out and confirm logout succeeds.
7. Repeat same flow on `https://www.ignatiusguide.com`.

## 5) Troubleshooting

If login fails:

1. Check Supabase `Authentication` logs for redirect mismatch.
2. Confirm exact URL variants match (with/without `www`, wildcard forms).
3. Confirm browser origin matches one of the Google JS origins.
4. Confirm callback is still `https://api.franciscanprayer.com/auth/v1/callback`.

## Done Criteria

All are true:

- `npm run verify:auth-config` passes.
- Google login succeeds on `ignatiusguide.com`.
- Google login succeeds on `www.ignatiusguide.com`.
- Session restore and sign-out both work on both domains.
