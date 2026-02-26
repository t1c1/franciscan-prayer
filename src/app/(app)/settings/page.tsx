import { createPageMetadata } from "@/lib/og-metadata";
import SettingsPage from "./settings-page";

export const metadata = createPageMetadata({
  title: "Settings",
  description: "Customize your Franciscan Prayer experience — language, theme, notifications, and account settings.",
  path: "/settings",
});

export default function Page() {
  return <SettingsPage />;
}
