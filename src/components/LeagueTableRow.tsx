import type { Team, Zone } from "@/lib/types";

type LeagueTableRowProps = {
  position: number;
  team: Team;
  zone: Zone | undefined;
};

export function LeagueTableRow({ position, team, zone }: LeagueTableRowProps) {
  return (
    <>
      <span
        aria-hidden
        className="w-1.5 self-stretch rounded-full"
        style={{ backgroundColor: zone?.colour ?? "transparent" }}
      />
      <span className="w-7 text-right text-sm font-bold tabular-nums text-[var(--card-muted)]">
        {position}
      </span>
      {/* Static local SVGs — next/image has nothing to optimise here. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={team.logo} alt="" aria-hidden width={28} height={28} className="size-7 shrink-0" />
      <span className="min-w-0 flex-1 truncate text-[15px] font-semibold text-[var(--card-ink)]">
        {team.name}
      </span>
    </>
  );
}
