import { createPageMetadata } from "@/lib/og-metadata";
import CrownPage from "./crown-page";

export const metadata = createPageMetadata({
  title: "Franciscan Crown Rosary",
  description: "Seven decades meditating on the Seven Joys of the Blessed Virgin Mary, a devotion given to a young Franciscan friar.",
  path: "/crown",
});

export default function Page() {
  return <CrownPage />;
}
