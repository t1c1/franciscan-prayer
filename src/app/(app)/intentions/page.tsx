import { createPageMetadata } from "@/lib/og-metadata";
import IntentionsPage from "./intentions-page";

export const metadata = createPageMetadata({
  title: "Prayer Intentions",
  description: "Bring your intentions before the Lord. A quiet place to record the people and needs you hold in prayer.",
  path: "/intentions",
});

export default function Page() {
  return <IntentionsPage />;
}
