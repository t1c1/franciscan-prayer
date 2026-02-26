import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface NavTileProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href: string;
}

export function NavTile({ icon, title, subtitle, href }: NavTileProps) {
  return (
    <Link href={href} className="bg-card rounded-xl border border-border p-4 text-left hover:border-franciscan/40 transition-colors flex items-center gap-4">
      <div className="w-10 h-10 rounded-lg bg-franciscan-light flex items-center justify-center">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" />
    </Link>
  );
}
