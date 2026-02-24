"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  UserPlus,
  Activity,
  BookOpen,
  ArrowUpDown,
  RefreshCw,
  ShieldX,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface UserStat {
  user_id: string;
  email: string;
  role: string;
  sign_up_at: string;
  last_active_at: string;
  total_paters: number;
  active_days: number;
}

type SortField = "email" | "sign_up_at" | "last_active_at" | "total_paters" | "active_days";

export function AdminDashboard() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<UserStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>("last_active_at");
  const [sortAsc, setSortAsc] = useState(false);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: rpcError } = await supabase.rpc("get_admin_user_stats");
    if (rpcError) {
      setError(rpcError.message);
      setStats([]);
    } else {
      setStats(data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAdmin) fetchStats();
  }, [isAdmin, fetchStats]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <ShieldX className="w-12 h-12 text-muted-foreground" />
        <h1 className="text-xl font-semibold">Access Denied</h1>
        <p className="text-sm text-muted-foreground">
          You do not have permission to view this page.
        </p>
      </div>
    );
  }

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const totalUsers = stats.length;
  const activeThisWeek = stats.filter(
    (s) => new Date(s.last_active_at) >= weekAgo
  ).length;
  const newThisWeek = stats.filter(
    (s) => new Date(s.sign_up_at) >= weekAgo
  ).length;
  const totalPaters = stats.reduce((sum, s) => sum + s.total_paters, 0);

  const sorted = [...stats].sort((a, b) => {
    let cmp = 0;
    if (sortField === "email") {
      cmp = (a.email ?? "").localeCompare(b.email ?? "");
    } else if (sortField === "sign_up_at" || sortField === "last_active_at") {
      cmp = new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime();
    } else {
      cmp = a[sortField] - b[sortField];
    }
    return sortAsc ? cmp : -cmp;
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const fmtDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const SortHeader = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => toggleSort(field)}
      className="flex items-center gap-1 hover:text-foreground transition-colors"
    >
      {label}
      <ArrowUpDown className="w-3 h-3" />
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={fetchStats}
          disabled={loading}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-1">
              <Users className="w-4 h-4" /> Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-1">
              <Activity className="w-4 h-4" /> Active This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{activeThisWeek}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-1">
              <UserPlus className="w-4 h-4" /> New This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{newThisWeek}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground flex items-center gap-1">
              <BookOpen className="w-4 h-4" /> Total Paters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalPaters.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>

      {/* User Table */}
      {error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : loading ? (
        <div className="flex justify-center py-12">
          <RefreshCw className="w-5 h-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left text-muted-foreground">
                <th className="px-4 py-3"><SortHeader field="email" label="Email" /></th>
                <th className="px-4 py-3"><SortHeader field="sign_up_at" label="Signed Up" /></th>
                <th className="px-4 py-3"><SortHeader field="last_active_at" label="Last Active" /></th>
                <th className="px-4 py-3 text-right"><SortHeader field="total_paters" label="Total Paters" /></th>
                <th className="px-4 py-3 text-right"><SortHeader field="active_days" label="Active Days" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {sorted.map((s) => (
                <tr key={s.user_id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    {s.email}
                    {s.role === "admin" && (
                      <span className="ml-2 text-xs bg-franciscan/10 text-franciscan px-1.5 py-0.5 rounded">
                        admin
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{fmtDate(s.sign_up_at)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{fmtDate(s.last_active_at)}</td>
                  <td className="px-4 py-3 text-right">{s.total_paters.toLocaleString()}</td>
                  <td className="px-4 py-3 text-right">{s.active_days}</td>
                </tr>
              ))}
              {sorted.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
