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
    <Link href={href} className="bg-card rounded-xl border border-border p-3 text-left hover:border-franciscan/40 transition-colors flex items-center gap-3">
      <div className="w-9 h-9 rounded-lg bg-franciscan-light flex items-center justify-center shrink-0">{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground leading-snug">{subtitle}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
    </Link>
  );
}
