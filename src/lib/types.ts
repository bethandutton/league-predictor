export type Team = {
  id: string;
  name: string;
  shortName: string;
  abbr: string;
  logo: string;
  logoPng: string;
};

/** A coloured band down the side of the table, e.g. Champions League places or relegation. */
export type Zone = {
  from: number;
  to: number;
  label: string;
  colour: string;
};

export type LeagueTheme = {
  page: string;
  accent: string;
  accentInk: string;
};

export type League = {
  id: string;
  name: string;
  country: string;
  season: string;
  /** The competition's own lockup, shown at the top of its page. */
  logo: string | null;
  theme: LeagueTheme;
  zones: Zone[];
  teams: Team[];
};
