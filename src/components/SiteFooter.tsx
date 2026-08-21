import Link from "next/link";
import { AUTHOR } from "@/lib/site";

export function SiteFooter({ league }: { league?: string }) {
  return (
    <footer className="mt-10 border-t border-[var(--hairline)] pt-6 pb-10 text-center text-xs leading-relaxed opacity-70">
      <p>
        Made by {AUTHOR}. A non-profit fan project — free to use, with no ads, no tracking and
        nothing stored.
      </p>
      <p className="mt-2 text-pretty">
        {league ? `${league} club badges` : "Club badges"} and competition logos are the property of
        their respective clubs and competitions, and are used here for identification only. This
        site is not affiliated with, endorsed by or connected to any club, league or governing body.
      </p>
      <p className="mt-3">
        <Link href="/legal" className="font-semibold underline underline-offset-2 hover:opacity-100">
          Legal &amp; credits
        </Link>
      </p>
    </footer>
  );
}
