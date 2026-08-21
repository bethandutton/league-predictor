import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/BackLink";
import { LeagueTablePreview } from "@/components/LeagueTablePreview";
import { ShareActions } from "@/components/ShareActions";
import { SiteFooter } from "@/components/SiteFooter";
import { ZoneKey } from "@/components/ZoneKey";
import { getLeague, leagueThemeStyle } from "@/lib/leagues";
import { decodeOrder, decodeTimestamp, formatSubmittedAt } from "@/lib/prediction-code";

export async function generateMetadata({
  params,
  searchParams,
}: PageProps<"/[league]/p/[order]">): Promise<Metadata> {
  const { league: leagueId } = await params;
  const { by } = await searchParams;
  const league = getLeague(leagueId);
  if (!league) return {};

  const name = typeof by === "string" && by.trim() ? by.trim() : "Someone";
  const title = `${name}'s ${league.name} ${league.season} prediction`;

  return {
    title,
    description: `${name} reckons this is how the ${league.name} ${league.season} table finishes. Make your own and share it.`,
    // Shared predictions are personal and effectively infinite, so they stay out of search.
    robots: { index: false, follow: true },
  };
}

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
      className="themed min-h-dvh bg-[var(--page)] text-[var(--page-ink)]"
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
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--accent-text)] uppercase">
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

        <SiteFooter league={league.name} />
      </div>
    </main>
  );
}
