import { createPageMetadata } from "@/lib/og-metadata";
import CalendarPage from "./calendar-page";

export const metadata = createPageMetadata({
  title: "Franciscan Calendar",
  description: "Browse the Franciscan liturgical calendar — 42 feasts, memorials, and solemnities of the Franciscan family.",
  path: "/calendar",
});

export default function Page() {
  return <CalendarPage />;
}
