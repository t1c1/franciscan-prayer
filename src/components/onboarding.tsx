"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";
import { trackOnboardingCompleted } from "@/lib/analytics";

const STORAGE_KEY = "fp_onboarding_done";

export function useOnboarding() {
  const [show, setShow] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setShow(localStorage.getItem(STORAGE_KEY) !== "true");
    setChecked(true);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
  };

  return { showOnboarding: show, dismiss, checked };
}

export function Onboarding({ onComplete }: { onComplete: () => void }) {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const finish = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    trackOnboardingCompleted();
    onComplete();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const fn = mode === "signin" ? signInWithEmail : signUpWithEmail;
    const err = await fn(email, password);

    setSubmitting(false);
    if (err) {
      setError(err);
    } else if (mode === "signup") {
      setSuccess(true);
    } else {
      finish();
    }
  };

  const handleGoogle = () => {
    // Mark onboarding done before redirect so user doesn't see it again
    localStorage.setItem(STORAGE_KEY, "true");
    signInWithGoogle();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">☦️</div>
          <h1 className="text-2xl font-bold text-foreground">
            Franciscan Prayer
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to sync your prayers across devices
          </p>
        </div>

        {success ? (
          <div className="text-center py-4">
            <p className="text-sm text-foreground">
              Check your email for a confirmation link.
            </p>
            <button
              onClick={finish}
              className="mt-4 text-sm text-franciscan hover:underline"
            >
              Continue to app
            </button>
          </div>
        ) : (
          <>
            {/* Google sign-in */}
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-2 bg-card border border-border rounded-lg p-3 text-sm font-medium hover:bg-accent transition-colors mb-4"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-muted-foreground">
                  or with email
                </span>
              </div>
            </div>

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full bg-background border border-input rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />

              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className={cn(
                  "w-full bg-franciscan text-franciscan-foreground rounded-lg p-3 text-sm font-semibold hover:opacity-90 transition-opacity",
                  submitting && "opacity-50"
                )}
              >
                {submitting
                  ? "..."
                  : mode === "signin"
                  ? "Sign In"
                  : "Create Account"}
              </button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              {mode === "signin" ? (
                <>
                  No account?{" "}
                  <button
                    onClick={() => setMode("signup")}
                    className="text-franciscan hover:underline"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("signin")}
                    className="text-franciscan hover:underline"
                  >
                    Sign in
                  </button>
                </>
              )}
            </p>

            {/* Skip */}
            <button
              onClick={finish}
              className="w-full text-center text-xs text-muted-foreground hover:text-foreground mt-6 transition-colors"
            >
              Continue without account →
            </button>
          </>
        )}
      </div>
    </div>
  );
}
