import type { League, Team } from "./types";

// One character per position, so a 24-club table still fits in a short URL.
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";

export type Prediction = {
  league: League;
  teams: Team[];
  name: string;
  submittedAt: Date | null;
};

export function encodeOrder(league: League, order: Team[]): string {
  return order
    .map((team) => {
      const index = league.teams.findIndex((candidate) => candidate.id === team.id);
      if (index < 0) throw new Error(`${team.name} is not in ${league.name}`);
      return ALPHABET[index];
    })
    .join("");
}

export function decodeOrder(league: League, code: string): Team[] | null {
  if (code.length !== league.teams.length) return null;

  const seen = new Set<number>();
  const teams: Team[] = [];

  for (const character of code) {
    const index = ALPHABET.indexOf(character);
    if (index < 0 || index >= league.teams.length || seen.has(index)) return null;
    seen.add(index);
    teams.push(league.teams[index]);
  }

  return teams;
}

export function encodeTimestamp(date: Date): string {
  return Math.floor(date.getTime() / 1000).toString(36);
}

export function decodeTimestamp(value: string | undefined): Date | null {
  if (!value) return null;
  const seconds = Number.parseInt(value, 36);
  if (!Number.isFinite(seconds) || seconds <= 0) return null;
  const date = new Date(seconds * 1000);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function buildSharePath(league: League, order: Team[], name: string, date: Date): string {
  const params = new URLSearchParams({ by: name, at: encodeTimestamp(date) });
  return `/${league.id}/p/${encodeOrder(league, order)}?${params.toString()}`;
}

export function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
