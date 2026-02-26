import { createPageMetadata } from "@/lib/og-metadata";
import HomePage from "./home-page";

export const metadata = createPageMetadata({
  title: "The Hours. The Rule. The Gospel.",
  description: "A simple companion for daily Franciscan prayer. The Liturgy of the Hours, the Franciscan Crown, Stations of the Cross, and the Rule of St. Francis.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
