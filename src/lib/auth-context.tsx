"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { trackSignIn, trackSignUp } from "./analytics";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithEmail: (email: string, password: string) => Promise<string | null>;
  signUpWithEmail: (email: string, password: string) => Promise<string | null>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  syncToCloud: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

// --- Push: local → cloud ---

async function pushCompletions(userId: string) {
  const today = new Date();
  const entries: { user_id: string; date: string; hour_id: string; pater_count: number }[] = [];

  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const completions: string[] = JSON.parse(
      localStorage.getItem(`fp_completions_${dateStr}`) || "[]"
    );
    for (const hourId of completions) {
      const count = parseInt(localStorage.getItem(`fp_count_${hourId}_${dateStr}`) || "0", 10);
      entries.push({ user_id: userId, date: dateStr, hour_id: hourId, pater_count: count });
    }
  }

  if (entries.length > 0) {
    await supabase
      .from("prayer_completions")
      .upsert(entries, { onConflict: "user_id,date,hour_id" });
  }
}

async function pushIntentions(userId: string) {
  const raw = localStorage.getItem("fp_intentions");
  if (!raw) return;
  const intentions = JSON.parse(raw) as { id: string; text: string; createdAt: string; hourId?: string }[];
  if (intentions.length === 0) return;

  const rows = intentions.map((i) => ({
    id: i.id,
    user_id: userId,
    text: i.text,
    hour_id: i.hourId || null,
    created_at: i.createdAt,
  }));

  await supabase.from("intentions").upsert(rows, { onConflict: "user_id,id" });
}

async function pushPreferences(userId: string) {
  const locale = localStorage.getItem("fp_locale") || "en";
  const soundEnabled = localStorage.getItem("fp_sound_enabled") !== "false";
  const favorites: string[] = JSON.parse(localStorage.getItem("fp_favorite_prayers") || "[]");

  await supabase.from("user_preferences").upsert(
    {
      user_id: userId,
      locale,
      sound_enabled: soundEnabled,
      favorite_prayers: favorites,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );
}

// --- Pull: cloud → local (only fills gaps, doesn't overwrite newer local data) ---

async function pullCompletions(userId: string) {
  const { data } = await supabase
    .from("prayer_completions")
    .select("date, hour_id, pater_count")
    .eq("user_id", userId);

  if (!data || data.length === 0) return;

  // Group by date
  const byDate: Record<string, { hourId: string; count: number }[]> = {};
  for (const row of data) {
    if (!byDate[row.date]) byDate[row.date] = [];
    byDate[row.date].push({ hourId: row.hour_id, count: row.pater_count });
  }

  for (const [dateStr, hours] of Object.entries(byDate)) {
    const key = `fp_completions_${dateStr}`;
    const existing: string[] = JSON.parse(localStorage.getItem(key) || "[]");

    // Merge: add any hours from cloud not already in local
    const merged = [...new Set([...existing, ...hours.map((h) => h.hourId)])];
    localStorage.setItem(key, JSON.stringify(merged));

    // Restore counts if missing locally
    for (const h of hours) {
      const countKey = `fp_count_${h.hourId}_${dateStr}`;
      if (!localStorage.getItem(countKey) && h.count > 0) {
        localStorage.setItem(countKey, String(h.count));
      }
    }
  }
}

async function pullIntentions(userId: string) {
  const { data } = await supabase
    .from("intentions")
    .select("id, text, hour_id, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (!data || data.length === 0) return;

  const existing = JSON.parse(localStorage.getItem("fp_intentions") || "[]") as { id: string; text: string; createdAt: string; hourId?: string }[];
  const existingIds = new Set(existing.map((i) => i.id));

  // Merge cloud intentions into local
  const cloudOnly = data
    .filter((r) => !existingIds.has(r.id))
    .map((r) => ({
      id: r.id,
      text: r.text,
      createdAt: r.created_at,
      hourId: r.hour_id || undefined,
    }));

  if (cloudOnly.length > 0) {
    const merged = [...existing, ...cloudOnly].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    localStorage.setItem("fp_intentions", JSON.stringify(merged));
  }
}

async function pullPreferences(userId: string) {
  const { data } = await supabase
    .from("user_preferences")
    .select("locale, sound_enabled, favorite_prayers, updated_at")
    .eq("user_id", userId)
    .single();

  if (!data) return;

  // Only restore if local has no saved preference (fresh device)
  if (!localStorage.getItem("fp_locale") && data.locale) {
    localStorage.setItem("fp_locale", data.locale);
    window.dispatchEvent(new CustomEvent("fp-locale-sync", { detail: data.locale }));
  }
  if (!localStorage.getItem("fp_sound_enabled") && data.sound_enabled !== null) {
    localStorage.setItem("fp_sound_enabled", String(data.sound_enabled));
  }
  if (!localStorage.getItem("fp_favorite_prayers") && data.favorite_prayers?.length > 0) {
    localStorage.setItem("fp_favorite_prayers", JSON.stringify(data.favorite_prayers));
  }
}

// --- Full sync ---

async function fullSync(userId: string, email?: string) {
  await Promise.all([
    pullCompletions(userId),
    pullIntentions(userId),
    pullPreferences(userId),
  ]);

  await Promise.all([
    pushCompletions(userId),
    pushIntentions(userId),
    pushPreferences(userId),
    supabase.from("profiles").upsert(
      { id: userId, email, last_active_at: new Date().toISOString() },
      { onConflict: "id" }
    ),
  ]);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAdmin = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    setIsAdmin(data?.role === "admin");
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.id);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdmin(session.user.id);
      } else {
        setIsAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAdmin]);

  const signInWithEmail = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return error.message;
      trackSignIn("email");
      return null;
    },
    []
  );

  const signUpWithEmail = useCallback(
    async (email: string, password: string): Promise<string | null> => {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) return error.message;
      trackSignUp("email");
      return null;
    },
    []
  );

  const signInWithGoogle = useCallback(async () => {
    trackSignIn("google");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: typeof window !== "undefined" ? window.location.origin : undefined,
      },
    });
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const syncToCloud = useCallback(async () => {
    if (!user) return;
    await fullSync(user.id, user.email || undefined);
  }, [user]);

  // Auto-sync on sign in
  useEffect(() => {
    if (user) {
      fullSync(user.id, user.email || undefined);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user, session, loading, isAdmin,
        signInWithEmail, signUpWithEmail, signInWithGoogle, signOut, syncToCloud,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
