import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { LeagueTablePreview } from "@/components/LeagueTablePreview";
import { ShareActions } from "@/components/ShareActions";
import { ZoneKey } from "@/components/ZoneKey";
import { getLeague, leagueThemeStyle } from "@/lib/leagues";
import { decodeOrder, decodeTimestamp, formatSubmittedAt } from "@/lib/prediction-code";

export default async function SharedPredictionPage({
  params,
  searchParams,
}: PageProps<"/[league]/p/[order]">) {
  const { league: leagueId, order: orderCode } = await params;
  const { by, at } = await searchParams;

  const league = getLeague(leagueId);
  if (!league) notFound();

  const order = decodeOrder(league, orderCode);
  if (!order) notFound();

  const name = typeof by === "string" && by.trim() ? by.trim() : "Anonymous";
  const submittedAt = decodeTimestamp(typeof at === "string" ? at : undefined);

  return (
    <main
      style={leagueThemeStyle(league)}
      className="min-h-dvh bg-[var(--page)] text-[var(--page-ink)]"
    >
      <div className="mx-auto w-full max-w-2xl p-4 sm:p-6">
        <BackLink href={`/${league.id}`} label="Make your own" />

        <header className="mb-5 flex flex-col items-center space-y-2 text-center">
          {league.logo ? (
            /* Static local artwork — next/image has nothing to optimise here. */
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={league.logo} alt="" aria-hidden className="h-12 w-auto object-contain" />
          ) : null}
          <h1 className="text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">
            {name}&rsquo;s prediction
          </h1>
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--accent)] uppercase">
            {league.name} {league.season}
          </p>
          {submittedAt ? (
            <p className="text-sm text-pretty opacity-70">Locked in {formatSubmittedAt(submittedAt)}</p>
          ) : null}
          <ZoneKey league={league} />
        </header>

        <LeagueTablePreview league={league} order={order} />

        <div className="mt-6 space-y-4 pb-10">
          <ShareActions
            league={league}
            order={order}
            name={name}
            submittedAt={submittedAt ?? new Date()}
          />
          <Link
            href="/"
            className="block text-center text-sm font-semibold opacity-70 hover:opacity-100"
          >
            All competitions
          </Link>
        </div>
      </div>
    </main>
  );
}
