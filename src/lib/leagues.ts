import { GENERATED_LEAGUES } from "./leagues.generated";
import { resolveTheme } from "./theme";
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

/**
 * Per-competition colours are data, so they ride in as custom properties. Both the light and
 * dark values are set here; `globals.css` picks between them for the viewer's colour scheme.
 */
export function leagueThemeStyle(league: League): React.CSSProperties {
  const theme = resolveTheme(league.theme.page, league.theme.accent, league.theme.accentInk);
  return {
    "--page-dark": theme.pageDark,
    "--page-light": theme.pageLight,
    "--accent-base": theme.accent,
    "--accent-ink": theme.accentInk,
    "--accent-on-dark": theme.accentOnDark,
    "--accent-on-light": theme.accentOnLight,
  } as React.CSSProperties;
}
