import { createPageMetadata } from "@/lib/og-metadata";
import CalendarPage from "./calendar-page";

export const metadata = createPageMetadata({
  title: "Franciscan Calendar",
  description: "The feasts, solemnities, and memorials of the Franciscan family. Saints and blesseds who followed in the footsteps of Il Poverello.",
  path: "/calendar",
});

export default function Page() {
  return <CalendarPage />;
}
