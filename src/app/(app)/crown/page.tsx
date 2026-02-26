import { createPageMetadata } from "@/lib/og-metadata";
import CrownPage from "./crown-page";

export const metadata = createPageMetadata({
  title: "Franciscan Crown Rosary",
  description: "Pray the Franciscan Crown Rosary — seven decades meditating on the Seven Joys of the Blessed Virgin Mary.",
  path: "/crown",
});

export default function Page() {
  return <CrownPage />;
}
