import Link from "next/link";

interface BackButtonProps {
  label: string;
  href?: string;
}

export function BackButton({ label, href = "/" }: BackButtonProps) {
  return (
    <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
      &larr; {label}
    </Link>
  );
}
