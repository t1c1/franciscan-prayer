import { createPageMetadata } from "@/lib/og-metadata";
import DashboardPage from "./dashboard-page";

export const metadata = createPageMetadata({
  title: "Prayer Dashboard",
  description: "Your prayer history and progress. Sync across devices to keep your daily practice wherever you are.",
  path: "/dashboard",
});

export default function Page() {
  return <DashboardPage />;
}
