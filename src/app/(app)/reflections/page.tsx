import { createPageMetadata } from "@/lib/og-metadata";
import ReflectionsPage from "./reflections-page";

export const metadata = createPageMetadata({
  title: "Daily Reflection",
  description: "A daily Franciscan reflection connecting prayer to the living tradition — the saints, the Rule of 1223, and the liturgical season.",
  path: "/reflections",
});

export default function Page() {
  return <ReflectionsPage />;
}
