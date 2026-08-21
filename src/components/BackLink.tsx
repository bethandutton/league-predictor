import Link from "next/link";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center gap-1.5 rounded-xl pr-3 pl-1 text-sm font-semibold opacity-70 transition-opacity hover:opacity-100"
    >
      <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 4 6.5 10l5.5 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {label}
    </Link>
  );
}
