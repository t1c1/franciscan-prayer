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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
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

  // Sync localStorage prayer data to Supabase
  const syncToCloud = useCallback(async () => {
    if (!user) return;

    const today = new Date();
    const entries: { user_id: string; date: string; hour_id: string; pater_count: number }[] = [];

    // Gather last 30 days of local data
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const completionsKey = `fp_completions_${dateStr}`;
      const completions: string[] = JSON.parse(
        localStorage.getItem(completionsKey) || "[]"
      );

      for (const hourId of completions) {
        const countKey = `fp_count_${hourId}_${dateStr}`;
        const count = parseInt(localStorage.getItem(countKey) || "0", 10);
        entries.push({
          user_id: user.id,
          date: dateStr,
          hour_id: hourId,
          pater_count: count,
        });
      }
    }

    if (entries.length > 0) {
      await supabase
        .from("prayer_completions")
        .upsert(entries, { onConflict: "user_id,date,hour_id" });
    }

    // Ensure profile row exists and update last_active_at
    await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: user.email,
        last_active_at: new Date().toISOString(),
      },
      { onConflict: "id" }
    );
  }, [user]);

  // Auto-sync on sign in
  useEffect(() => {
    if (user) {
      syncToCloud();
    }
  }, [user, syncToCloud]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        isAdmin,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        syncToCloud,
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
