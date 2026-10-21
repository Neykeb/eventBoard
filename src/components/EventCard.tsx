import type { EventCategory, EventStatus, Attendee } from "../data/events";
import { eventCategoryLabels, eventStatusLabels } from "../data/events";
import { Link } from "@tanstack/react-router";
import { Icon } from "./Icon";
type EventCardProps = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  status: EventStatus;
  attendees: Attendee[];
  onDelete: () => void;
};

export function EventCard({
  id,
  title,
  date,
  time,
  location,
  category,
  status,
  attendees,
  onDelete,
}: EventCardProps) {
  const statusClasses: Record<EventStatus, string> = {
    published: "bg-[#57C9A5]/15 text-[#8BE0C4]",
    draft: "bg-[#F2B66D]/15 text-[#F2C98F]",
    completed: "bg-[#57C9A5]/15 text-[#8BE0C4]",
    cancelled: "bg-red-400/15 text-red-300",
  };

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-[#44536A] bg-[#344359] p-5 shadow-[0_16px_35px_rgba(12,19,31,0.16)] transition duration-200 hover:-translate-y-0.5 hover:border-[#5C6C84] motion-reduce:transform-none">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-lg bg-[#F45277]/12 px-2.5 py-1.5 text-xs font-medium text-[#FF91AA]">
          <Icon name="calendar" className="h-4 w-4" />
          {eventCategoryLabels[category]}
        </span>
        <div className="flex items-center gap-2">
          <span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${statusClasses[status]}`}>
            {eventStatusLabels[status]}
          </span>
          <details className="relative">
            <summary className="flex h-8 w-8 cursor-pointer list-none items-center justify-center rounded-lg text-[#CBD5E1] transition hover:bg-[#44536A] hover:text-white" aria-label={`Aktionen für ${title}`}>
              <Icon name="more" className="h-5 w-5" />
            </summary>
            <div className="absolute right-0 z-20 mt-2 w-40 overflow-hidden rounded-xl border border-[#56657B] bg-[#29374A] p-1.5 shadow-xl">
              <Link to="/events/$eventId" params={{ eventId: id }} className="block rounded-lg px-3 py-2 text-sm text-[#CBD5E1] hover:bg-[#3B4B61] hover:text-white">Details anzeigen</Link>
              <Link to="/events/$eventId/edit" params={{ eventId: id }} className="block rounded-lg px-3 py-2 text-sm text-[#CBD5E1] hover:bg-[#3B4B61] hover:text-white">Bearbeiten</Link>
              <button type="button" onClick={onDelete} className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-300 hover:bg-red-400/10">Löschen</button>
            </div>
          </details>
        </div>
      </div>

      <h2 className="mt-5 text-xl font-semibold tracking-tight text-white">{title}</h2>
      <dl className="mt-5 grid gap-3 text-sm text-[#CBD5E1]">
        <div className="flex items-center gap-3"><Icon name="calendar" className="h-4 w-4 text-[#8FA8FF]"/><dt className="sr-only">Datum</dt><dd>{date}</dd></div>
        <div className="flex items-center gap-3"><Icon name="clock" className="h-4 w-4 text-[#8FA8FF]"/><dt className="sr-only">Uhrzeit</dt><dd>{time} Uhr</dd></div>
        <div className="flex items-center gap-3"><Icon name="location" className="h-4 w-4 text-[#8FA8FF]"/><dt className="sr-only">Ort</dt><dd>{location || "Ort noch offen"}</dd></div>
        <div className="flex items-center gap-3"><Icon name="users" className="h-4 w-4 text-[#8FA8FF]"/><dt className="sr-only">Teilnehmer</dt><dd>{attendees.length} Teilnehmer</dd></div>
      </dl>

      <div className="mt-auto pt-6">
          <Link
            to="/events/$eventId"
            className="inline-flex w-full items-center justify-center rounded-xl bg-[#D92E59] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#CC2752] active:scale-[0.98]"
            params={{ eventId: id }}
          >
            Details anzeigen
          </Link>
      </div>
    </article>
  );
}
