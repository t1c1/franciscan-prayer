import { createPageMetadata } from "@/lib/og-metadata";
import CommunityPage from "./community-page";

export const metadata = createPageMetadata({
  title: "Find a Community",
  description: "Find a Franciscan community near you — locate Third Order, OFS, and Franciscan parishes worldwide.",
  path: "/community",
});

export default function Page() {
  return <CommunityPage />;
}
