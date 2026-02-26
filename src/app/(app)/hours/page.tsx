import { createPageMetadata } from "@/lib/og-metadata";
import HoursPage from "./hours-page";

export const metadata = createPageMetadata({
  title: "Pray the Hours",
  description: "Pray the nine canonical hours of the Franciscan Liturgy of the Hours — 83 Pater Nosters daily, from Matins to Compline.",
  path: "/hours",
});

export default function Page() {
  return <HoursPage />;
}
