import { createPageMetadata } from "@/lib/og-metadata";
import SettingsPage from "./settings-page";

export const metadata = createPageMetadata({
  title: "Settings",
  description: "Language, appearance, notifications, and account preferences.",
  path: "/settings",
});

export default function Page() {
  return <SettingsPage />;
}
