import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { PredictionBoard } from "@/components/PredictionBoard";
import { ZoneKey } from "@/components/ZoneKey";
import { LEAGUES, getLeague, leagueThemeStyle } from "@/lib/leagues";

export function generateStaticParams() {
  return LEAGUES.map((league) => ({ league: league.id }));
}

export default async function LeaguePage({ params }: PageProps<"/[league]">) {
  const { league: leagueId } = await params;
  const league = getLeague(leagueId);
  if (!league) notFound();

  return (
    <main
      style={leagueThemeStyle(league)}
      className="min-h-dvh bg-[var(--page)] text-[var(--page-ink)]"
    >
      <div className="mx-auto w-full max-w-2xl p-4 sm:p-6">
        <BackLink href="/" label="All competitions" />

        <header className="mb-5 flex flex-col items-center space-y-3 text-center">
          {league.logo ? (
            /* Static local artwork — next/image has nothing to optimise here. */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={league.logo} alt="" aria-hidden className="h-14 w-auto object-contain" />
          ) : null}
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
              {league.name}
            </h1>
            <p className="text-sm font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
              {league.season}
            </p>
          </div>
          <p className="text-sm text-pretty opacity-70">
            Drag with the handle, or nudge clubs with the arrows.
          </p>
          <ZoneKey league={league} />
        </header>

        <PredictionBoard league={league} />
      </div>
    </main>
  );
}
