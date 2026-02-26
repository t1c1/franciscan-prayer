import { createPageMetadata } from "@/lib/og-metadata";
import CommunityPage from "./community-page";

export const metadata = createPageMetadata({
  title: "Franciscan Family",
  description: "The three Orders founded by St. Francis — Friars Minor, Poor Clares, and the Secular Franciscan Order. Find a community near you.",
  path: "/community",
});

export default function Page() {
  return <CommunityPage />;
}
