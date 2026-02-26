import { createPageMetadata } from "@/lib/og-metadata";
import StationsPage from "./stations-page";

export const metadata = createPageMetadata({
  title: "Stations of the Cross",
  description: "Walk the Via Crucis — meditate on the 14 Stations of the Cross with traditional prayers and reflections.",
  path: "/stations",
});

export default function Page() {
  return <StationsPage />;
}
