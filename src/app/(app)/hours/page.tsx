import { createPageMetadata } from "@/lib/og-metadata";
import HoursPage from "./hours-page";

export const metadata = createPageMetadata({
  title: "Pray the Hours",
  description: "The nine canonical hours from Matins to Compline, following the ancient Franciscan practice of praying the Our Father throughout the day.",
  path: "/hours",
});

export default function Page() {
  return <HoursPage />;
}
