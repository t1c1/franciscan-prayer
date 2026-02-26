import { createPageMetadata } from "@/lib/og-metadata";
import RulePage from "./rule-page";

export const metadata = createPageMetadata({
  title: "Daily Rule of St. Francis",
  description: "Read the Rule of St. Francis — one chapter each day from the Regula Bullata and early Franciscan writings.",
  path: "/rule",
});

export default function Page() {
  return <RulePage />;
}
