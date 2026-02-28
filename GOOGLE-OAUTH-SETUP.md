# Google OAuth Setup for Franciscan Prayer

## Part 1: Google Cloud Console

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Sign in with your Google account
3. Click the project dropdown (top-left, next to "Google Cloud") → **New Project**
   - Name: `Franciscan Prayer`
   - Click **Create**
4. Make sure that new project is selected in the dropdown
5. In the left sidebar: **APIs & Services → OAuth consent screen**
6. Click **Get Started** or **Configure Consent Screen**
   - App name: `Franciscan Prayer`
   - User support email: your email
   - Audience: **External**
   - Contact email: your email
   - Click through and **Save**
7. In the left sidebar: **APIs & Services → Credentials**
8. Click **+ Create Credentials → OAuth client ID**
   - Application type: **Web application**
   - Name: `Franciscan Prayer`
   - **Authorized JavaScript origins** — add these:
     - `https://ignatiusguide.com`
     - `https://www.ignatiusguide.com`
     - `https://franciscan-prayer.pages.dev`
     - `http://localhost:3000`
   - **Authorized redirect URIs** — add this exact URI:
     - `https://api.franciscanprayer.com/auth/v1/callback`
   - Click **Create**
9. Copy your **Client ID** and **Client Secret**

## Part 2: Supabase Dashboard

10. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
11. Open your project (`wiefcvuafvtdvyhvzzyh`)
12. Left sidebar: **Authentication → Providers**
13. Find **Google** and expand it
14. Toggle it **Enabled**
15. Paste in your:
    - **Client ID** (from step 9)
    - **Client Secret** (from step 9)
16. Click **Save**

## Part 3: Verify Redirect URLs

17. Still in Supabase Dashboard: **Authentication → URL Configuration**
18. Make sure these are in **Redirect URLs**:
    - `https://ignatiusguide.com`
    - `https://ignatiusguide.com/**`
    - `https://www.ignatiusguide.com`
    - `https://www.ignatiusguide.com/**`
    - `https://franciscan-prayer.pages.dev`
    - `https://franciscan-prayer.pages.dev/**`
    - `http://localhost:3000`
    - `http://localhost:3000/**`

## Done

The app already calls `supabase.auth.signInWithOAuth({ provider: "google" })` and uses the current origin for `redirectTo`. Once these dashboard URL allowlist entries are present, Google sign-in works from both domains.
