import { createPageMetadata } from "@/lib/og-metadata";
import HomePage from "./home-page";

export const metadata = createPageMetadata({
  title: "The Hours. The Rule. The Gospel.",
  description: "Pray as a Franciscan every day with the Original Pater Count, Franciscan Crown Rosary, Stations of the Cross, and Daily Mass Readings in 5 languages.",
  path: "/",
});

export default function Page() {
  return <HomePage />;
}
