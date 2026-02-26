import { createPageMetadata } from "@/lib/og-metadata";
import RulePage from "./rule-page";

export const metadata = createPageMetadata({
  title: "The Rule of St. Francis",
  description: "Daily reading from the Regula Bullata, confirmed by Pope Honorius III in 1223. The way of life Francis gave his brothers.",
  path: "/rule",
});

export default function Page() {
  return <RulePage />;
}
