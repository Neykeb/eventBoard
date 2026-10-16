import type { EventCategory, EventStatus, Attendee } from "../data/events";
import { eventCategoryLabels, eventStatusLabels } from "../data/events";
import { Link } from "@tanstack/react-router";
type EventCardProps = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  status: EventStatus;
  attendees: Attendee[];
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
}: EventCardProps) {
  return (
    // NEU: Semantische Eventkarte - article, eine Überschrift und beschreibende Daten.
    <article>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <dl className="mt-4 space-y-2 text-slate-200">
          <div><dt className="inline font-medium">Datum: </dt><dd className="inline">{date}</dd></div>
          <div><dt className="inline font-medium">Uhrzeit: </dt><dd className="inline">{time}</dd></div>
          <div><dt className="inline font-medium">Ort: </dt><dd className="inline">{location}</dd></div>
          <div><dt className="inline font-medium">Kategorie: </dt><dd className="inline">{eventCategoryLabels[category]}</dd></div>
          <div><dt className="inline font-medium">Status: </dt><dd className="inline">{eventStatusLabels[status]}</dd></div>
          <div><dt className="inline font-medium">Teilnehmer: </dt><dd className="inline">{attendees.length}</dd></div>
        </dl>
        <div className="mt-5">
          <Link
            to="/events/$eventId"
            className="bg-[#AF495B] py-1 px-2 rounded-md"
            params={{ eventId: id }}
          >
            Details anzeigen
          </Link>
        </div>
    </article>
  );
}
