import { zoneForPosition } from "@/lib/leagues";
import type { League, Team } from "@/lib/types";
import { LeagueTableRow } from "./LeagueTableRow";

export function LeagueTablePreview({ league, order }: { league: League; order: Team[] }) {
  return (
    <ol className="flex flex-col gap-1.5">
      {order.map((team, index) => (
        <li
          key={team.id}
          className="flex items-center gap-3 rounded-xl bg-[var(--card)] py-2.5 pr-4 pl-2 ring-1 ring-[var(--card-ring)]"
        >
          <LeagueTableRow position={index + 1} team={team} zone={zoneForPosition(league, index + 1)} />
        </li>
      ))}
    </ol>
  );
}
