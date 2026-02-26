import { createPageMetadata } from "@/lib/og-metadata";
import DashboardPage from "./dashboard-page";

export const metadata = createPageMetadata({
  title: "Sync Dashboard",
  description: "View your prayer statistics, sync progress across devices, and track your Franciscan prayer journey.",
  path: "/dashboard",
});

export default function Page() {
  return <DashboardPage />;
}
