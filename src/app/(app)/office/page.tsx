import { createPageMetadata } from "@/lib/og-metadata";
import OfficePage from "./office-page";

export const metadata = createPageMetadata({
  title: "Divine Office",
  description: "Links to the Liturgy of the Hours — pray the Divine Office online with the universal Church.",
  path: "/office",
});

export default function Page() {
  return <OfficePage />;
}
