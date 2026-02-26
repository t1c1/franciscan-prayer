import { HOURS } from "@/lib/prayers";
import { createPageMetadata } from "@/lib/og-metadata";
import HourPrayerPage from "./hour-prayer-page";

export function generateStaticParams() {
  return HOURS.map((hour) => ({ hourId: hour.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ hourId: string }> }) {
  const { hourId } = await params;
  const hour = HOURS.find((h) => h.id === hourId);
  if (!hour) {
    return createPageMetadata({ title: "Hour Not Found", path: "/hours" });
  }
  return createPageMetadata({
    title: `${hour.name} — Pray the Hours`,
    description: `${hour.description} — ${hour.paterCount} Pater Nosters.`,
    path: `/hours/${hour.id}`,
  });
}

export default async function Page({ params }: { params: Promise<{ hourId: string }> }) {
  const { hourId } = await params;
  return <HourPrayerPage hourId={hourId} />;
}
