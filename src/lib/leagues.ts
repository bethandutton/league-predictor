import { GENERATED_LEAGUES } from "./leagues.generated";
import type { League, Zone } from "./types";

export const LEAGUES = GENERATED_LEAGUES;

export function getLeague(id: string): League | undefined {
  return LEAGUES.find((league) => league.id === id);
}

export function zoneForPosition(league: League, position: number): Zone | undefined {
  return league.zones.find((zone) => position >= zone.from && position <= zone.to);
}

export function leaguesByCountry(): { country: string; leagues: League[] }[] {
  const grouped = new Map<string, League[]>();
  for (const league of LEAGUES) {
    const bucket = grouped.get(league.country);
    if (bucket) bucket.push(league);
    else grouped.set(league.country, [league]);
  }
  return [...grouped].map(([country, leagues]) => ({ country, leagues }));
}

/** Per-competition colours are data, so they ride in as custom properties. */
export function leagueThemeStyle(league: League): React.CSSProperties {
  return {
    "--page": league.theme.page,
    "--accent": league.theme.accent,
    "--accent-ink": league.theme.accentInk,
  } as React.CSSProperties;
}
