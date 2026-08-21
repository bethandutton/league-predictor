"use client";

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buildSharePath } from "@/lib/prediction-code";
import { zoneForPosition } from "@/lib/leagues";
import type { League, Team, Zone } from "@/lib/types";
import { LeagueTableRow } from "./LeagueTableRow";

type SortableRowProps = {
  team: Team;
  position: number;
  zone: Zone | undefined;
  isFirst: boolean;
  isLast: boolean;
  onMove: (teamId: string, direction: -1 | 1) => void;
};

function SortableRow({ team, position, zone, isFirst, isLast, onMove }: SortableRowProps) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } =
    useSortable({ id: team.id });

  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={`flex items-center gap-2.5 rounded-xl bg-[var(--card)] py-2 pr-1.5 pl-2 sm:gap-3 sm:pr-2 ${
        isDragging ? "relative z-10 shadow-2xl ring-2 ring-[var(--accent)]" : ""
      }`}
    >
      <LeagueTableRow position={position} team={team} zone={zone} />

      <div className="flex shrink-0 items-center">
        <button
          type="button"
          onClick={() => onMove(team.id, -1)}
          disabled={isFirst}
          aria-label={`Move ${team.name} up to ${position - 1}`}
          className="grid size-9 place-items-center rounded-lg text-[var(--card-muted)] disabled:opacity-25 hover:bg-[var(--row-hover)]"
        >
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12.5 10 7l5 5.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => onMove(team.id, 1)}
          disabled={isLast}
          aria-label={`Move ${team.name} down to ${position + 1}`}
          className="grid size-9 place-items-center rounded-lg text-[var(--card-muted)] disabled:opacity-25 hover:bg-[var(--row-hover)]"
        >
          <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 7.5 10 13l5-5.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          aria-label={`Drag ${team.name} to reorder`}
          className="grid size-10 shrink-0 cursor-grab touch-none place-items-center rounded-lg text-[var(--card-muted)] active:cursor-grabbing hover:bg-[var(--row-hover)]"
        >
          <svg viewBox="0 0 20 20" className="size-5" fill="currentColor">
            <circle cx="7.5" cy="5" r="1.5" />
            <circle cx="12.5" cy="5" r="1.5" />
            <circle cx="7.5" cy="10" r="1.5" />
            <circle cx="12.5" cy="10" r="1.5" />
            <circle cx="7.5" cy="15" r="1.5" />
            <circle cx="12.5" cy="15" r="1.5" />
          </svg>
        </button>
      </div>
    </li>
  );
}

export function PredictionBoard({ league }: { league: League }) {
  const router = useRouter();
  const [order, setOrder] = useState<Team[]>(league.teams);
  const [name, setName] = useState("");
  const [showNameError, setShowNameError] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setOrder((current) => {
      const from = current.findIndex((team) => team.id === active.id);
      const to = current.findIndex((team) => team.id === over.id);
      return arrayMove(current, from, to);
    });
  }

  function handleMove(teamId: string, direction: -1 | 1) {
    setOrder((current) => {
      const from = current.findIndex((team) => team.id === teamId);
      const to = from + direction;
      if (to < 0 || to >= current.length) return current;
      return arrayMove(current, from, to);
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setShowNameError(true);
      return;
    }
    router.push(buildSharePath(league, order, trimmed, new Date()));
  }

  return (
    <form onSubmit={handleSubmit} className="pb-10">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={order.map((team) => team.id)} strategy={verticalListSortingStrategy}>
          <ol className="flex flex-col gap-1.5">
            {order.map((team, index) => (
              <SortableRow
                key={team.id}
                team={team}
                position={index + 1}
                zone={zoneForPosition(league, index + 1)}
                isFirst={index === 0}
                isLast={index === order.length - 1}
                onMove={handleMove}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>

      <div className="mt-6 border-t border-white/10 pt-6">
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="predictor-name" className="mb-1 block text-xs font-semibold opacity-70">
              Your full name
            </label>
            <input
              id="predictor-name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (showNameError) setShowNameError(false);
              }}
              placeholder="e.g. Bethan Dutton"
              autoComplete="name"
              aria-invalid={showNameError}
              aria-describedby={showNameError ? "predictor-name-error" : undefined}
              className="h-12 w-full rounded-xl border border-white/15 bg-white/10 px-3.5 text-base text-[var(--page-ink)] placeholder:opacity-40 focus:border-[var(--focus)] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="h-12 shrink-0 rounded-xl bg-[var(--accent)] px-6 text-base font-bold text-[var(--accent-ink)] transition-opacity hover:opacity-90"
          >
            Lock it in
          </button>
        </div>
        {showNameError ? (
          <p id="predictor-name-error" role="alert" className="mt-2 text-xs font-medium text-[var(--accent)]">
            Pop your name in first so people know whose prediction this is.
          </p>
        ) : null}
      </div>
    </form>
  );
}
