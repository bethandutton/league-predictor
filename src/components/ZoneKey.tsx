import type { League } from "@/lib/types";

export function ZoneKey({ league }: { league: League }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
      {league.zones.map((zone) => (
        <li key={zone.label} className="flex items-center gap-2 text-xs font-medium opacity-80">
          <span
            aria-hidden
            className="size-2.5 rounded-full"
            style={{ backgroundColor: zone.colour }}
          />
          {zone.label}
        </li>
      ))}
    </ul>
  );
}
