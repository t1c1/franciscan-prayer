import { createPageMetadata } from "@/lib/og-metadata";
import StationsPage from "./stations-page";

export const metadata = createPageMetadata({
  title: "Stations of the Cross",
  description: "Walk the Via Crucis with Our Lord. The 14 Stations with traditional prayers and meditations, a devotion entrusted to the Franciscans.",
  path: "/stations",
});

export default function Page() {
  return <StationsPage />;
}
