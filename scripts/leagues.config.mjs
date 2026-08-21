// One entry per competition. `espn` is the slug on ESPN's public soccer API;
// the Premier League is scraped from premierleague.com instead so its badges are the official files.
// Zones are the colour bands down the side of the table — tweak freely, they are only a guide.

const UCL = "#102de6";
const UEL = "#ff6900";
const UECL = "#00be14";
const DOWN = "#fe1313";
const UP = "#00be14";
const PLAYOFF = "#953bff";

export const LEAGUE_CONFIG = [
  { id: "premier-league", espn: "eng.1", source: "premierleague", name: "Premier League", country: "England",
    theme: { page: "#37003c", accent: "#00a651" },
    zones: [[1, 4, "Champions League", UCL], [5, 5, "Europa League", UEL], [6, 6, "Conference League", UECL], [18, 20, "Relegation", DOWN]] },

  { id: "championship", espn: "eng.2", name: "Championship", country: "England",
    theme: { page: "#14161a", accent: "#b39c51" },
    zones: [[1, 2, "Promoted", UP], [3, 6, "Play-offs", PLAYOFF], [22, 24, "Relegation", DOWN]] },

  { id: "league-one", espn: "eng.3", name: "League One", country: "England",
    theme: { page: "#14161a", accent: "#4ac1e0" },
    zones: [[1, 2, "Promoted", UP], [3, 6, "Play-offs", PLAYOFF], [21, 24, "Relegation", DOWN]] },

  { id: "league-two", espn: "eng.4", name: "League Two", country: "England",
    theme: { page: "#14161a", accent: "#ff1b48" },
    zones: [[1, 3, "Promoted", UP], [4, 7, "Play-offs", PLAYOFF], [23, 24, "Relegation", DOWN]] },

  { id: "national-league", espn: "eng.5", name: "National League", country: "England",
    theme: { page: "#1a1a1a", accent: "#d9002b" },
    zones: [[1, 1, "Promoted", UP], [2, 7, "Play-offs", PLAYOFF], [21, 24, "Relegation", DOWN]] },

  { id: "la-liga", espn: "esp.1", name: "LaLiga", country: "Spain",
    theme: { page: "#0e1b33", accent: "#ff4b44" },
    zones: [[1, 4, "Champions League", UCL], [5, 6, "Europa League", UEL], [7, 7, "Conference League", UECL], [18, 20, "Relegation", DOWN]] },

  { id: "la-liga-2", espn: "esp.2", name: "LaLiga Hypermotion", country: "Spain",
    theme: { page: "#0e1b33", accent: "#58c2b2" },
    zones: [[1, 2, "Promoted", UP], [3, 6, "Play-offs", PLAYOFF], [19, 22, "Relegation", DOWN]] },

  { id: "serie-a", espn: "ita.1", name: "Serie A", country: "Italy",
    theme: { page: "#05204a", accent: "#35c1f1" },
    zones: [[1, 4, "Champions League", UCL], [5, 6, "Europa League", UEL], [7, 7, "Conference League", UECL], [18, 20, "Relegation", DOWN]] },

  { id: "serie-b", espn: "ita.2", name: "Serie B", country: "Italy",
    theme: { page: "#14161a", accent: "#e2001a" },
    zones: [[1, 2, "Promoted", UP], [3, 8, "Play-offs", PLAYOFF], [18, 20, "Relegation", DOWN]] },

  { id: "ligue-1", espn: "fra.1", name: "Ligue 1", country: "France",
    theme: { page: "#04153b", accent: "#e4ff1a" },
    zones: [[1, 3, "Champions League", UCL], [4, 5, "Europa League", UEL], [6, 6, "Conference League", UECL], [17, 18, "Relegation", DOWN]] },

  { id: "ligue-2", espn: "fra.2", name: "Ligue 2", country: "France",
    theme: { page: "#04153b", accent: "#ff4d6d" },
    zones: [[1, 2, "Promoted", UP], [3, 5, "Play-offs", PLAYOFF], [17, 18, "Relegation", DOWN]] },

  { id: "bundesliga", espn: "ger.1", name: "Bundesliga", country: "Germany",
    theme: { page: "#12141a", accent: "#d20515" },
    zones: [[1, 4, "Champions League", UCL], [5, 5, "Europa League", UEL], [6, 6, "Conference League", UECL], [16, 16, "Relegation play-off", PLAYOFF], [17, 18, "Relegation", DOWN]] },

  { id: "bundesliga-2", espn: "ger.2", name: "2. Bundesliga", country: "Germany",
    theme: { page: "#12141a", accent: "#e2001a" },
    zones: [[1, 2, "Promoted", UP], [3, 3, "Promotion play-off", PLAYOFF], [17, 18, "Relegation", DOWN]] },

  { id: "eredivisie", espn: "ned.1", name: "Eredivisie", country: "Netherlands",
    theme: { page: "#12141a", accent: "#ff6a13" },
    zones: [[1, 2, "Champions League", UCL], [3, 4, "Europa League", UEL], [5, 5, "Conference League", UECL], [17, 18, "Relegation", DOWN]] },

  { id: "primeira-liga", espn: "por.1", name: "Primeira Liga", country: "Portugal",
    theme: { page: "#0b2545", accent: "#00a54f" },
    zones: [[1, 2, "Champions League", UCL], [3, 4, "Europa League", UEL], [5, 5, "Conference League", UECL], [17, 18, "Relegation", DOWN]] },

  { id: "scottish-premiership", espn: "sco.1", name: "Scottish Premiership", country: "Scotland",
    theme: { page: "#0d1b2a", accent: "#59cbe8" },
    zones: [[1, 1, "Champions League", UCL], [2, 3, "Europe", UEL], [12, 12, "Relegation", DOWN]] },

  { id: "mls", espn: "usa.1", name: "Major League Soccer", country: "USA",
    theme: { page: "#001838", accent: "#ff2e4c" },
    zones: [[1, 1, "Supporters' Shield", UP]] },

  { id: "liga-mx", espn: "mex.1", name: "Liga MX", country: "Mexico",
    theme: { page: "#0f1620", accent: "#00a94f" },
    zones: [[1, 6, "Liguilla", UP], [7, 10, "Play-in", PLAYOFF]] },

  { id: "brasileirao", espn: "bra.1", name: "Brasileirão", country: "Brazil",
    theme: { page: "#0c2b1e", accent: "#f7dd00" },
    zones: [[1, 6, "Libertadores", UCL], [7, 12, "Sudamericana", UEL], [17, 20, "Relegation", DOWN]] },

  { id: "liga-profesional", espn: "arg.1", name: "Liga Profesional", country: "Argentina",
    theme: { page: "#0d1b2a", accent: "#75aadb" },
    zones: [[1, 8, "Play-offs", PLAYOFF]] },

  { id: "belgian-pro-league", espn: "bel.1", name: "Belgian Pro League", country: "Belgium",
    theme: { page: "#10131a", accent: "#ffd200" },
    zones: [[1, 6, "Championship play-offs", UP], [18, 18, "Relegation", DOWN]] },

  { id: "super-lig", espn: "tur.1", name: "Süper Lig", country: "Turkey",
    theme: { page: "#10131a", accent: "#e30a17" },
    zones: [[1, 2, "Champions League", UCL], [3, 4, "Europe", UEL], [16, 18, "Relegation", DOWN]] },

  { id: "super-league-greece", espn: "gre.1", name: "Super League", country: "Greece",
    theme: { page: "#0a1d3a", accent: "#4fb3ff" },
    zones: [[1, 6, "Championship play-offs", UP], [13, 14, "Relegation", DOWN]] },

  { id: "superliga", espn: "den.1", name: "Superliga", country: "Denmark",
    theme: { page: "#10131a", accent: "#c8102e" },
    zones: [[1, 6, "Championship round", UP], [11, 12, "Relegation", DOWN]] },

  { id: "allsvenskan", espn: "swe.1", name: "Allsvenskan", country: "Sweden",
    theme: { page: "#0b1a2e", accent: "#ffcd00" },
    zones: [[1, 1, "Champions League", UCL], [2, 3, "Europe", UEL], [15, 16, "Relegation", DOWN]] },

  { id: "swiss-super-league", espn: "sui.1", name: "Swiss Super League", country: "Switzerland",
    theme: { page: "#10131a", accent: "#ff3b3b" },
    zones: [[1, 1, "Champions League", UCL], [2, 3, "Europe", UEL], [12, 12, "Relegation", DOWN]] },

  { id: "austrian-bundesliga", espn: "aut.1", name: "Austrian Bundesliga", country: "Austria",
    theme: { page: "#10131a", accent: "#ef3340" },
    zones: [[1, 6, "Championship round", UP], [12, 12, "Relegation", DOWN]] },

  { id: "saudi-pro-league", espn: "ksa.1", name: "Saudi Pro League", country: "Saudi Arabia",
    theme: { page: "#0a2a1e", accent: "#00a651" },
    zones: [[1, 3, "Champions League Elite", UCL], [16, 18, "Relegation", DOWN]] },
];
