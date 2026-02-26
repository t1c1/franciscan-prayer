import { createPageMetadata } from "@/lib/og-metadata";
import AboutPageContent from "./about-page-content";

export const metadata = createPageMetadata({
  title: "About",
  description: "About Franciscan Prayer — a free app for praying the Franciscan Liturgy of the Hours and living the Rule of St. Francis.",
  path: "/about",
});

export default function Page() {
  return <AboutPageContent />;
}
