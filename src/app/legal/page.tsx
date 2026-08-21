import type { Metadata } from "next";
import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { SiteFooter } from "@/components/SiteFooter";
import { AUTHOR, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal & credits",
  description: `How ${SITE_NAME} uses club badges and competition logos, who runs it, and why it stores nothing about you.`,
  alternates: { canonical: "/legal" },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="space-y-2 text-sm text-pretty opacity-80">{children}</div>
    </section>
  );
}

export default function LegalPage() {
  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <BackLink href="/" label="All competitions" />

      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-balance">Legal &amp; credits</h1>
        <p className="text-sm text-pretty opacity-70">
          The short version: this is a free hobby project, it makes no money, and it keeps none of
          your data.
        </p>
      </header>

      <div className="space-y-7">
        <Section title="Non-profit">
          <p>
            {SITE_NAME} is a non-commercial fan project built and run by {AUTHOR}. It is free to
            use. There is no advertising, no sponsorship, no affiliate links, no paid tiers and no
            money changing hands anywhere on the site.
          </p>
        </Section>

        <Section title="Club badges and competition logos">
          <p>
            All club badges, competition logos and associated names are the property of their
            respective clubs, leagues and governing bodies. They appear here purely so you can
            recognise which team is which, and no ownership is claimed over any of them.
          </p>
          <p>
            Premier League badges and the Premier League logo come from premierleague.com. Badges
            and logos for every other competition come from ESPN&rsquo;s publicly available soccer
            API. Where a club has no badge on file, a plain stand-in showing its abbreviation is
            shown instead.
          </p>
          <p>
            This site is not affiliated with, endorsed by, sponsored by or otherwise connected to
            the Premier League, the EFL, LaLiga, Serie A, the LFP, MLS, ESPN or any club, league or
            governing body featured on it.
          </p>
          <p>
            If you own one of these marks and would prefer it were not used here, get in touch and
            it will be removed.
          </p>
        </Section>

        <Section title="Your data">
          <p>
            Nothing you enter is saved. There is no database, no account and no server-side record
            of any prediction.
          </p>
          <p>
            When you finish a table, your name, your order and the time you made it are encoded
            directly into the share link. That link is the only copy — it exists wherever you choose
            to send it, and nowhere else. Anyone with the link can read what is in it, so treat it
            as public and only put in a name you are happy to share.
          </p>
          <p>
            The site sets no cookies, runs no analytics and does not track you. Share images are
            drawn in your own browser and never uploaded anywhere.
          </p>
        </Section>

        <Section title="Accuracy">
          <p>
            Club lists, competition logos and the promotion, European and relegation bands are
            scraped ahead of each season and may lag behind late transfers, rule changes or
            reorganised competitions. They are a guide for a bit of fun, not an authoritative
            record.
          </p>
        </Section>

        <Section title="Contact">
          <p>Questions, corrections or takedown requests: get in touch with {AUTHOR}.</p>
        </Section>
      </div>

      <p className="mt-10 text-center text-sm">
        <Link href="/" className="font-semibold underline underline-offset-2">
          Back to the competitions
        </Link>
      </p>

      <SiteFooter />
    </main>
  );
}
