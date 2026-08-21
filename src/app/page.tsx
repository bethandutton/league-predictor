import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { LEAGUES, leagueThemeStyle, leaguesByCountry } from "@/lib/leagues";
import { SITE_DESCRIPTION } from "@/lib/site";

export const metadata: Metadata = {
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
};

export default function CompetitionPicker() {
  const season = LEAGUES[0]?.season;

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <header className="space-y-2 py-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">
          League Predictor
        </h1>
        {season ? (
          <p className="text-sm font-bold tracking-[0.2em] text-[var(--accent-text)] uppercase">
            {season} season
          </p>
        ) : null}
        <p className="text-base text-pretty opacity-70">
          Pick a competition, put the table in the order you reckon it finishes, then share it.
        </p>
      </header>

      <div className="flex flex-col gap-8 pb-16">
        {leaguesByCountry().map(({ country, leagues }) => (
          <section key={country}>
            <h2 className="mb-2.5 text-xs font-bold tracking-[0.18em] uppercase opacity-50">
              {country}
            </h2>
            <ul className="flex flex-col gap-2.5">
              {leagues.map((league) => (
                <li key={league.id}>
                  <Link
                    href={`/${league.id}`}
                    style={leagueThemeStyle(league)}
                    className="flex items-center gap-4 rounded-2xl bg-[var(--page-dark)] p-4 ring-1 ring-white/15 transition-transform hover:-translate-y-0.5"
                  >
                    {league.logo ? (
                      /* Static local artwork — next/image has nothing to optimise here. */
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={league.logo} alt="" aria-hidden className="h-8 w-8 shrink-0 object-contain" />
                    ) : null}
                    <span className="text-base font-bold text-white">{league.name}</span>
                    <span aria-hidden className="ml-auto text-[var(--accent-on-dark)]">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <SiteFooter />
    </main>
  );
}
