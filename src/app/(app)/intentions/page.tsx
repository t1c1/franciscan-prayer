import { createPageMetadata } from "@/lib/og-metadata";
import IntentionsPage from "./intentions-page";

export const metadata = createPageMetadata({
  title: "Prayer Intentions",
  description: "Keep a journal of your prayer intentions — record, track, and reflect on your prayer life.",
  path: "/intentions",
});

export default function Page() {
  return <IntentionsPage />;
}
