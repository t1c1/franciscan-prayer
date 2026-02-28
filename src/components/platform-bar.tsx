"use client";

import Link from "next/link";

export function PlatformBar() {
  return (
    <div className="safe-top sticky top-0 z-40 border-b border-[#1f2937] bg-[#0f172a]/95 text-[11px] backdrop-blur supports-[backdrop-filter]:bg-[#0f172a]/85">
      <div className="max-w-lg mx-auto px-4 flex items-center gap-2 h-6">
        <span className="text-[#f0c674] text-xs" aria-hidden="true">&#10013;</span>
        <a
          href="https://ubimissa.com"
          className="text-[#8ca3c0] no-underline hover:text-white transition-colors"
        >
          Ubi Missa
        </a>
        <span className="text-[#334155]">&middot;</span>
        <Link
          href="/"
          className="text-white font-semibold no-underline"
        >
          Franciscan Prayer
        </Link>
      </div>
    </div>
  );
}
