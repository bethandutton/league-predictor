"use client";

import { useState } from "react";
import { renderShareImage } from "@/lib/share-image";
import type { League, Team } from "@/lib/types";

type ShareActionsProps = {
  league: League;
  order: Team[];
  name: string;
  submittedAt: Date;
};

type Status = "idle" | "copied" | "working" | "failed";

export function ShareActions({ league, order, name, submittedAt }: ShareActionsProps) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("failed");
    }
  }

  async function handleShareImage() {
    setStatus("working");
    const blob = await renderShareImage(league, order, name, submittedAt);
    if (!blob) {
      setStatus("failed");
      return;
    }

    const fileName = `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${league.id}.jpg`;
    const file = new File([blob], fileName, { type: "image/jpeg" });

    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: `${name} — ${league.name} ${league.season}` });
        setStatus("idle");
        return;
      } catch {
        // Falling through to a download covers both a cancelled sheet and an unsupported target.
      }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("idle");
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button
        type="button"
        onClick={handleCopyLink}
        className="h-12 flex-1 rounded-xl border border-white/20 px-5 text-base font-semibold text-[var(--page-ink)] hover:bg-white/10"
      >
        {status === "copied" ? "Link copied" : "Copy link"}
      </button>
      <button
        type="button"
        onClick={handleShareImage}
        disabled={status === "working"}
        className="h-12 flex-1 rounded-xl bg-[var(--accent)] px-5 text-base font-bold text-[var(--accent-ink)] disabled:opacity-60"
      >
        {status === "working" ? "Making image…" : "Share as image"}
      </button>
      {status === "failed" ? (
        <p role="alert" className="text-sm opacity-80">
          That did not work — try again.
        </p>
      ) : null}
    </div>
  );
}
