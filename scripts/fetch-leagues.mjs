#!/usr/bin/env node
// Builds the whole competition catalogue: club lists, club badges and competition logos.
// Re-run at the start of a season to pick up promotions and relegations: `pnpm leagues`

import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { optimize } from "svgo";
import { LEAGUE_CONFIG } from "./leagues.config.mjs";

const LOGO_ROOT = path.join(process.cwd(), "public", "logos");
const COMPETITION_ROOT = path.join(process.cwd(), "public", "competitions");
const OUT_FILE = path.join(process.cwd(), "src", "lib", "leagues.generated.ts");

const ESPN = "https://site.api.espn.com/apis/site/v2/sports/soccer";
const PL_API = "https://footballapi.pulselive.com/football";
// The Premier League's API rejects requests without a premierleague.com origin.
const PL_HEADERS = { Origin: "https://www.premierleague.com", Referer: "https://www.premierleague.com/" };

const slugify = (value) =>
  value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function getJson(url, headers = {}) {
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0", ...headers } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText} — ${url}`);
  return response.json();
}

async function download(url, destination) {
  const response = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!response.ok) throw new Error(`${response.status} for ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(destination, buffer);
  return buffer.byteLength;
}

/** Stand-in crest for the handful of lower-league clubs with no badge on file. */
function placeholderBadge(abbr) {
  const initials = (abbr || "?").slice(0, 3).toUpperCase();
  return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#e5e5e5"/><text x="50" y="50" font-family="system-ui, sans-serif" font-size="30" font-weight="700" fill="#595959" text-anchor="middle" dominant-baseline="central">${initials}</text></svg>`;
}

/** White text on dark accents, near-black on bright ones. */
function inkFor(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16) / 255);
  const channel = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  return luminance > 0.45 ? "#0b0b0b" : "#ffffff";
}

async function premierLeagueTeams(directory) {
  const seasons = await getJson(`${PL_API}/competitions/1/compseasons?pageSize=50`, PL_HEADERS);
  const season = [...seasons.content].sort((a, b) => b.id - a.id)[0];
  const { content } = await getJson(
    `${PL_API}/teams?pageSize=100&comps=1&altIds=true&page=0&compSeasons=${season.id}`,
    PL_HEADERS,
  );

  const teams = [];
  for (const club of [...content].sort((a, b) => a.name.localeCompare(b.name))) {
    const optaId = club.altIds?.opta;
    const slug = slugify(club.name);

    const svg = await (await fetch(`https://resources.premierleague.com/premierleague/badges/${optaId}.svg`)).text();
    await writeFile(path.join(directory, `${slug}.svg`), optimize(svg, { multipass: true }).data);
    await download(`https://resources.premierleague.com/premierleague/badges/100/${optaId}.png`, path.join(directory, `${slug}.png`));

    teams.push({
      id: slug,
      name: club.name,
      shortName: club.shortName ?? club.name,
      abbr: club.club?.abbr ?? slug.slice(0, 3).toUpperCase(),
      logo: `/logos/premier-league/${slug}.svg`,
      logoPng: `/logos/premier-league/${slug}.png`,
    });
  }

  const label = season.label.match(/(\d{4})\/(\d{2,4})/);
  return { teams, season: label ? `${label[1]}/${label[2].slice(-2)}` : season.label };
}

async function espnTeams(config, directory) {
  const data = await getJson(`${ESPN}/${config.espn}/teams`);
  const entry = data.sports[0].leagues[0];

  const teams = [];
  for (const { team } of entry.teams) {
    const slug = team.slug ?? slugify(team.displayName);
    const abbr = team.abbreviation ?? slug.slice(0, 3).toUpperCase();
    const source = team.logos?.[0]?.href;

    let file = `${slug}.png`;
    let downloaded = false;
    if (source) {
      try {
        // The combiner endpoint is the only one that actually resizes; 120px covers
        // both the table row and the share image without shipping 40MB of badges.
        const resized = `https://a.espncdn.com/combiner/i?img=${new URL(source).pathname}&w=120&h=120`;
        await download(resized, path.join(directory, file));
        downloaded = true;
      } catch {
        downloaded = false;
      }
    }
    if (!downloaded) {
      file = `${slug}.svg`;
      await writeFile(path.join(directory, file), placeholderBadge(abbr));
      console.log(`    placeholder badge for ${team.displayName}`);
    }

    teams.push({
      id: slug,
      name: team.displayName,
      shortName: team.shortDisplayName ?? team.displayName,
      abbr,
      logo: `/logos/${config.id}/${file}`,
      logoPng: `/logos/${config.id}/${file}`,
    });
  }

  teams.sort((a, b) => a.name.localeCompare(b.name));
  const year = entry.season?.year ?? new Date().getFullYear();
  return { teams, season: `${year}/${String((year + 1) % 100).padStart(2, "0")}` };
}

async function competitionLogo(config) {
  await mkdir(COMPETITION_ROOT, { recursive: true });

  if (config.source === "premierleague") {
    const svg = await (
      await fetch("https://www.premierleague.com/resources/v1.51.4/i/svg-files/elements/pl-logo-dark.svg")
    ).text();
    const file = path.join(COMPETITION_ROOT, `${config.id}.svg`);
    await writeFile(file, optimize(svg, { multipass: true }).data);
    return `/competitions/${config.id}.svg`;
  }

  const board = await getJson(`${ESPN}/${config.espn}/scoreboard`);
  const logos = board.leagues?.[0]?.logos ?? [];
  // The dark variant is drawn for dark backgrounds, which is what every league page uses.
  const chosen = logos.find((logo) => logo.rel?.includes("dark")) ?? logos[0];
  if (!chosen) return null;

  await download(chosen.href, path.join(COMPETITION_ROOT, `${config.id}.png`));
  return `/competitions/${config.id}.png`;
}

const built = [];

for (const config of LEAGUE_CONFIG) {
  const directory = path.join(LOGO_ROOT, config.id);
  await rm(directory, { recursive: true, force: true });
  await mkdir(directory, { recursive: true });

  const { teams, season } =
    config.source === "premierleague"
      ? await premierLeagueTeams(directory)
      : await espnTeams(config, directory);

  const logo = await competitionLogo(config);

  built.push({
    id: config.id,
    name: config.name,
    country: config.country,
    season,
    logo,
    theme: { page: config.theme.page, accent: config.theme.accent, accentInk: inkFor(config.theme.accent) },
    zones: config.zones.map(([from, to, label, colour]) => ({ from, to, label, colour })),
    teams,
  });

  console.log(`${config.name.padEnd(24)} ${String(teams.length).padStart(2)} clubs  ${season}${logo ? "" : "  (no logo)"}`);
}

const lines = built
  .map((league) => {
    const teams = league.teams.map((team) => `      ${JSON.stringify(team)},`).join("\n");
    const zones = league.zones.map((zone) => `      ${JSON.stringify(zone)},`).join("\n");
    return `  {
    id: ${JSON.stringify(league.id)},
    name: ${JSON.stringify(league.name)},
    country: ${JSON.stringify(league.country)},
    season: ${JSON.stringify(league.season)},
    logo: ${JSON.stringify(league.logo)},
    theme: ${JSON.stringify(league.theme)},
    zones: [
${zones}
    ],
    teams: [
${teams}
    ],
  },`;
  })
  .join("\n");

await writeFile(
  OUT_FILE,
  `// Generated by scripts/fetch-leagues.mjs — run \`pnpm leagues\` to refresh. Do not edit by hand.
import type { League } from "./types";

export const GENERATED_LEAGUES: League[] = [
${lines}
];
`,
);

console.log(`\nWrote ${built.length} competitions to ${path.relative(process.cwd(), OUT_FILE)}`);
