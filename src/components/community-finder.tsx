"use client";

import { useState } from "react";
import { ExternalLink } from "lucide-react";
import {
  FRANCISCAN_FAMILIES,
  ORDER_TYPE_LABELS,
  type FranciscanCommunity,
} from "@/lib/franciscan-communities";
import { cn } from "@/lib/utils";

type FilterType = "all" | "male" | "female" | "secular";

export function CommunityFinder() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered =
    filter === "all"
      ? FRANCISCAN_FAMILIES
      : FRANCISCAN_FAMILIES.filter((c) => c.type === filter);

  const grouped = {
    male: filtered.filter((c) => c.type === "male"),
    female: filtered.filter((c) => c.type === "female"),
    secular: filtered.filter((c) => c.type === "secular"),
  };

  return (
    <div className="space-y-4">
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {(["all", "male", "female", "secular"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-colors",
              filter === f
                ? "bg-franciscan text-franciscan-foreground"
                : "bg-muted text-muted-foreground hover:bg-accent"
            )}
          >
            {f === "all" ? "All Families" : ORDER_TYPE_LABELS[f]}
          </button>
        ))}
      </div>

      {/* Community cards */}
      {(["male", "female", "secular"] as const).map((type) => {
        const communities = grouped[type];
        if (communities.length === 0) return null;

        return (
          <div key={type} className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              {ORDER_TYPE_LABELS[type]}
            </h3>
            {communities.map((community) => (
              <CommunityCard
                key={community.abbreviation}
                community={community}
                expanded={expandedId === community.abbreviation}
                onToggle={() =>
                  setExpandedId(
                    expandedId === community.abbreviation
                      ? null
                      : community.abbreviation
                  )
                }
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function CommunityCard({
  community,
  expanded,
  onToggle,
}: {
  community: FranciscanCommunity;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full text-left bg-card rounded-lg border border-border p-4 hover:border-franciscan/40 transition-colors"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="font-semibold text-foreground text-sm">
            {community.name}
          </p>
          <p className="text-xs text-franciscan font-medium">
            {community.abbreviation}
            {community.foundedYear && (
              <span className="text-muted-foreground font-normal ml-2">
                Est. {community.foundedYear}
              </span>
            )}
          </p>
        </div>
      </div>
      {expanded && (
        <div className="mt-3 space-y-2">
          <p className="text-sm text-foreground/80 leading-relaxed">
            {community.description}
          </p>
          {community.website && (
            <a
              href={community.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-xs text-franciscan hover:underline"
            >
              <ExternalLink className="w-3 h-3" />
              Visit Website
            </a>
          )}
        </div>
      )}
    </button>
  );
}
