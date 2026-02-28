"use client";

import Link from "next/link";

export function PlatformBar() {
  return (
    <div className="bg-[#0c1222] h-6 text-[11px] leading-6">
      <div className="max-w-lg mx-auto px-4 flex items-center gap-2 h-full">
        <span className="text-[#f0c674] text-xs" aria-hidden="true">&#10013;</span>
        <a
          href="https://ubimissa.com"
          className="text-[#64748b] no-underline hover:text-white transition-colors"
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
