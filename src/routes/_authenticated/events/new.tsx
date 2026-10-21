import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent } from "react";
import { useEvents } from "../../../hooks/useEvents";
import type { EventCategory, EventStatus } from "../../../data/events";

export const Route = createFileRoute("/_authenticated/events/new")({
  component: CreateEventPage,
});

function CreateEventPage() {
  const { createEvent } = useEvents();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<EventCategory>("workshop");
  const [status, setStatus] = useState<EventStatus>("draft");
  const [maxAttendees, setMaxAttendees] = useState("1");
  const [error, setError] = useState("");

  // NEU: Event erstellen - validiert die Pflichtfelder und speichert zentral.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const maximum = Number(maxAttendees);

    if (!title.trim() || !date || !time || !Number.isInteger(maximum) || maximum < 1) {
      setError("Bitte fülle alle Pflichtfelder korrekt aus.");
      return;
    }

    createEvent({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      date,
      time,
      location: location.trim(),
      category,
      status,
      maxAttendees: maximum,
      attendees: [],
      createdAt: new Date().toISOString().slice(0, 10),
    });
    void navigate({ to: "/events" });
  }

  const fieldClass =
    "premium-field";

  return (
    <main className="app-page">
      <section className="premium-panel mx-auto max-w-2xl p-6 sm:p-8">
        <p className="mb-2 text-sm font-medium text-[#FF6B89]">Neues Event</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Event erstellen</h1>
        <p className="mt-2 text-[#A9B5C7]">Felder mit * sind Pflichtfelder.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="new-event-title" className="field-label">Titel *</label>
            <input id="new-event-title" name="title" className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div>
            <label htmlFor="new-event-description" className="field-label">Beschreibung</label>
            <textarea id="new-event-description" name="description" className={fieldClass} value={description} onChange={(event) => setDescription(event.target.value)} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="new-event-date" className="field-label">Datum *</label>
              <input id="new-event-date" name="date" type="date" className={fieldClass} value={date} onChange={(event) => setDate(event.target.value)} />
            </div>
            <div>
              <label htmlFor="new-event-time" className="field-label">Uhrzeit *</label>
              <input id="new-event-time" name="time" type="time" className={fieldClass} value={time} onChange={(event) => setTime(event.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="new-event-location" className="field-label">Ort</label>
            <input id="new-event-location" name="location" className={fieldClass} value={location} onChange={(event) => setLocation(event.target.value)} />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="new-event-category" className="field-label">Kategorie</label>
              <select id="new-event-category" name="category" className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value as EventCategory)}>
                <option value="workshop">Workshop</option><option value="talk">Vortrag</option><option value="networking">Netzwerken</option><option value="review">Feedback</option><option value="other">Sonstiges</option>
              </select>
            </div>
            <div>
              <label htmlFor="new-event-status" className="field-label">Status</label>
              <select id="new-event-status" name="status" className={fieldClass} value={status} onChange={(event) => setStatus(event.target.value as EventStatus)}>
                <option value="draft">Entwurf</option><option value="published">Veröffentlicht</option><option value="cancelled">Abgesagt</option><option value="completed">Abgeschlossen</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="new-event-maximum" className="field-label">Maximale Teilnehmerzahl *</label>
            <input id="new-event-maximum" name="maxAttendees" type="number" min="1" step="1" className={fieldClass} value={maxAttendees} onChange={(event) => setMaxAttendees(event.target.value)} />
          </div>
          <p role="alert" className="min-h-5 text-sm text-red-300">{error}</p>
          <button type="submit" className="primary-button w-full">Event erstellen</button>
        </form>
      </section>
    </main>
  );
}
