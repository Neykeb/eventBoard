import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useEvents } from "../../../../hooks/useEvents";
import type {
  Event,
  EventCategory,
  EventStatus,
} from "../../../../data/events";
import { LoadingState } from "../../../../components/LoadingState";
import { ErrorState } from "../../../../components/ErrorState";

export const Route = createFileRoute("/_authenticated/events/$eventId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  // NEU: Asynchroner Datenfluss - Bearbeitung erst nach dem Laden anzeigen.
  const { events, isLoading, error, retry, updateEvent } = useEvents();
  const { eventId } = Route.useParams();

  const eventFound = events.find((event) => event.id === eventId);

  if (isLoading) {
    // NEU: Ladezustand - das Formular wartet auf die Eventdaten.
    return <LoadingState message="Event wird geladen..." />;
  }

  if (error) {
    // NEU: Fehlerzustand - Retry startet fetch erneut.
    return <ErrorState message={error} onRetry={() => void retry()} />;
  }

  if (eventFound === undefined) {
    return <main className="app-page"><p className="mx-auto max-w-2xl text-[#CBD5E1]">Event nicht gefunden.</p></main>;
  }

  // NEU: Das Formular wird erst erstellt, wenn die Eventdaten geladen sind.
  return <EditEventForm eventFound={eventFound} updateEvent={updateEvent} />;
}

type EditEventFormProps = {
  eventFound: Event;
  updateEvent: (updatedEvent: Event) => void;
};

function EditEventForm({ eventFound, updateEvent }: EditEventFormProps) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(eventFound.title);
  const [description, setDescription] = useState(eventFound.description);
  const [date, setDate] = useState(eventFound.date);
  const [time, setTime] = useState(eventFound.time);
  const [location, setLocation] = useState(eventFound.location);
  const [category, setCategory] = useState<EventCategory | "">(
    eventFound.category,
  );
  const [status, setStatus] = useState<EventStatus | "">(eventFound.status);
  const [maxAttendees, setMaxAttendees] = useState(String(eventFound.maxAttendees));
  const [formErrors, setFormErrors] = useState({
    title: "",
    date: "",
    time: "",
    category: "",
    status: "",
    maxAttendees: "",
  });
  const titleInputRef = useRef<HTMLInputElement>(null);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);
  const statusInputRef = useRef<HTMLSelectElement>(null);
  const maxAttendeesInputRef = useRef<HTMLInputElement>(null);

  function changeHandlerTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function changeHandlerDescription(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }
  function changeHandlerDate(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
  }
  function changeHandlerTime(e: ChangeEvent<HTMLInputElement>) {
    setTime(e.target.value);
  }
  function changeHandlerLocation(e: ChangeEvent<HTMLInputElement>) {
    setLocation(e.target.value);
  }
  function changeHandlerCategory(e: ChangeEvent<HTMLSelectElement>) {
    setCategory(e.target.value as EventCategory | "");
  }
  function changeHandlerStatus(e: ChangeEvent<HTMLSelectElement>) {
    setStatus(e.target.value as EventStatus | "");
  }
  function changeHandlerMaxAttendees(e: ChangeEvent<HTMLInputElement>) {
    setMaxAttendees(e.target.value);
  }

  // NEU: Bearbeitungs-Validierung - zeigt Feldfehler und fokussiert den ersten Fehler.
  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const maxAttendeesNumber = Number(maxAttendees);
    const nextErrors = {
      title: title.trim() ? "" : "Bitte gib einen Titel ein.",
      date: date ? "" : "Bitte wähle ein Datum.",
      time: time ? "" : "Bitte wähle eine Uhrzeit.",
      category: category ? "" : "Bitte wähle eine Kategorie.",
      status: status ? "" : "Bitte wähle einen Status.",
      maxAttendees: "",
    };

    if (!Number.isInteger(maxAttendeesNumber) || maxAttendeesNumber < 1) {
      nextErrors.maxAttendees = "Die maximale Teilnehmerzahl muss mindestens 1 sein.";
    } else if (maxAttendeesNumber < eventFound.attendees.length) {
      nextErrors.maxAttendees = `Mindestens ${eventFound.attendees.length}, da bereits so viele Teilnehmer angemeldet sind.`;
    }

    setFormErrors(nextErrors);

    const firstInvalidField = [
      [nextErrors.title, titleInputRef],
      [nextErrors.date, dateInputRef],
      [nextErrors.time, timeInputRef],
      [nextErrors.category, categoryInputRef],
      [nextErrors.status, statusInputRef],
      [nextErrors.maxAttendees, maxAttendeesInputRef],
    ].find(([message]) => Boolean(message));

    if (firstInvalidField) {
      const fieldRef = firstInvalidField[1];
      if (typeof fieldRef !== "string") fieldRef.current?.focus();
      return;
    }

    const updatedEvent = {
      id: eventFound.id,
      title: title,
      description: description,
      date: date,
      time: time,
      location: location,
      category: category as EventCategory,
      status: status as EventStatus,
      maxAttendees: maxAttendeesNumber,
      attendees: eventFound.attendees,
      createdAt: eventFound.createdAt,
    };

    updateEvent(updatedEvent);
    navigate({ to: "/events" });
  }

  return (
    <main className="app-page">
      <section className="premium-panel mx-auto max-w-2xl p-6 sm:p-8">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-[#FF6B89]">Eventverwaltung</p>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Event bearbeiten
          </h1>
          <p className="mt-2 text-sm text-[#A9B5C7]">
            Ändere die Daten deines Events und speichere sie danach.
          </p>
        </div>

        {/* NEU: Bearbeitungsformular - native Form mit verbundenen Labels. */}
        <form className="premium-form space-y-5" onSubmit={handleSave} noValidate>
          <div>
            <label htmlFor="event-title" className="mb-2 block text-sm font-medium text-slate-200">
              Titel
            </label>
            <input
              ref={titleInputRef}
              id="event-title"
              name="title"
              className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              type="text"
              value={title}
              aria-invalid={Boolean(formErrors.title)}
              aria-describedby={formErrors.title ? "event-title-error" : undefined}
              onChange={changeHandlerTitle}
            />
            {formErrors.title ? <p id="event-title-error" className="mt-2 text-sm text-red-300">{formErrors.title}</p> : null}
          </div>

          <div>
            <label htmlFor="event-description" className="mb-2 block text-sm font-medium text-slate-200">
              Beschreibung
            </label>
            <input
              id="event-description"
              name="description"
              className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              type="text"
              value={description}
              onChange={changeHandlerDescription}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="event-date" className="mb-2 block text-sm font-medium text-slate-200">
                Datum
              </label>
              <input
                ref={dateInputRef}
                id="event-date"
                name="date"
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                type="date"
                value={date}
                aria-invalid={Boolean(formErrors.date)}
                aria-describedby={formErrors.date ? "event-date-error" : undefined}
                onChange={changeHandlerDate}
              />
              {formErrors.date ? <p id="event-date-error" className="mt-2 text-sm text-red-300">{formErrors.date}</p> : null}
            </div>

            <div>
              <label htmlFor="event-time" className="mb-2 block text-sm font-medium text-slate-200">
                Uhrzeit
              </label>
              <input
                ref={timeInputRef}
                id="event-time"
                name="time"
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                type="time"
                value={time}
                aria-invalid={Boolean(formErrors.time)}
                aria-describedby={formErrors.time ? "event-time-error" : undefined}
                onChange={changeHandlerTime}
              />
              {formErrors.time ? <p id="event-time-error" className="mt-2 text-sm text-red-300">{formErrors.time}</p> : null}
            </div>
          </div>

          <div>
            <label htmlFor="event-location" className="mb-2 block text-sm font-medium text-slate-200">
              Ort
            </label>
            <input
              id="event-location"
              name="location"
              className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              type="text"
              value={location}
              onChange={changeHandlerLocation}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="event-category" className="mb-2 block text-sm font-medium text-slate-200">
                Kategorie
              </label>
              <select
                ref={categoryInputRef}
                id="event-category"
                name="category"
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                value={category}
                aria-invalid={Boolean(formErrors.category)}
                aria-describedby={formErrors.category ? "event-category-error" : undefined}
                onChange={changeHandlerCategory}
              >
                <option value="">Kategorie wählen</option>
                <option value="workshop">Workshop</option>
                <option value="talk">Vortrag</option>
                <option value="networking">Netzwerken</option>
                <option value="review">Feedback</option>
                <option value="other">Sonstiges</option>
              </select>
              {formErrors.category ? <p id="event-category-error" className="mt-2 text-sm text-red-300">{formErrors.category}</p> : null}
            </div>

            <div>
              <label htmlFor="event-status" className="mb-2 block text-sm font-medium text-slate-200">
                Status
              </label>
              <select
                ref={statusInputRef}
                id="event-status"
                name="status"
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                value={status}
                aria-invalid={Boolean(formErrors.status)}
                aria-describedby={formErrors.status ? "event-status-error" : undefined}
                onChange={changeHandlerStatus}
              >
                <option value="">Status wählen</option>
                <option value="draft">Entwurf</option>
                <option value="published">Veröffentlicht</option>
                <option value="cancelled">Abgesagt</option>
                <option value="completed">Abgeschlossen</option>
              </select>
              {formErrors.status ? <p id="event-status-error" className="mt-2 text-sm text-red-300">{formErrors.status}</p> : null}
            </div>
          </div>

          <div>
            <label htmlFor="event-max-attendees" className="mb-2 block text-sm font-medium text-slate-200">
              Maximale Teilnehmerzahl
            </label>
            <input
              ref={maxAttendeesInputRef}
              id="event-max-attendees"
              name="maxAttendees"
              className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              type="number"
              min={1}
              step={1}
              value={maxAttendees}
              aria-invalid={Boolean(formErrors.maxAttendees)}
              aria-describedby={formErrors.maxAttendees ? "event-max-attendees-error" : undefined}
              onChange={changeHandlerMaxAttendees}
            />
            {formErrors.maxAttendees ? <p id="event-max-attendees-error" className="mt-2 text-sm text-red-300">{formErrors.maxAttendees}</p> : null}
          </div>

          <button
            type="submit"
            className="primary-button mt-4 w-full"
          >
            Speichern
          </button>
        </form>
      </section>
    </main>
  );
}
