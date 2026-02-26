import { createPageMetadata } from "@/lib/og-metadata";
import PrayersPage from "./prayers-page";

export const metadata = createPageMetadata({
  title: "Prayer Texts",
  description: "Read traditional Catholic prayers in Latin, English, Spanish, Italian, French, and Chinese.",
  path: "/prayers",
});

export default function Page() {
  return <PrayersPage />;
}
