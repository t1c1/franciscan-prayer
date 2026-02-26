import { createPageMetadata } from "@/lib/og-metadata";
import AboutPageContent from "./about-page-content";

export const metadata = createPageMetadata({
  title: "About",
  description: "How the early Franciscans prayed the Hours, and how this humble tool helps you follow their example.",
  path: "/about",
});

export default function Page() {
  return <AboutPageContent />;
}
