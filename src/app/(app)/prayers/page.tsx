import { createPageMetadata } from "@/lib/og-metadata";
import PrayersPage from "./prayers-page";

export const metadata = createPageMetadata({
  title: "Prayer Texts",
  description: "Traditional Catholic and Franciscan prayers in Latin and the vernacular. The Our Father, Hail Mary, Canticle of the Sun, and more.",
  path: "/prayers",
});

export default function Page() {
  return <PrayersPage />;
}
