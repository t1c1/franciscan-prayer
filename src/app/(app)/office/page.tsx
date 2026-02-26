import { createPageMetadata } from "@/lib/og-metadata";
import OfficePage from "./office-page";

export const metadata = createPageMetadata({
  title: "Divine Office",
  description: "Pray the full Liturgy of the Hours with the universal Church. Links to the complete texts of the Divine Office.",
  path: "/office",
});

export default function Page() {
  return <OfficePage />;
}
