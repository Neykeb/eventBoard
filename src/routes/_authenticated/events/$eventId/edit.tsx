import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useEvents } from "../../../../hooks/useEvents";
import type { EventCategory, EventStatus } from "../../../../data/initialEvents";

export const Route = createFileRoute("/_authenticated/events/$eventId/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { events, updateEvent } = useEvents();
  const { eventId } = Route.useParams();
  const navigate = useNavigate();

  const eventFound = events.find((e: any) => e.id === eventId);

  const [title, setTitle] = useState(eventFound?.title ?? "");
  const [description, setDescription] = useState(eventFound?.description ?? "");
  const [date, setDate] = useState(eventFound?.date ?? "");
  const [time, setTime] = useState(eventFound?.time ?? "");
  const [location, setLocation] = useState(eventFound?.location ?? "");
  const [category, setCategory] = useState(eventFound?.category ?? "");
  const [status, setStatus] = useState(eventFound?.status ?? "");
  const [maxAttendees, setMaxAttendees] = useState(
    eventFound?.maxAttendees ?? 0,
  );

  if (eventFound === undefined) {
    return <p>Event nicht gefunden.</p>;
  }

  function changeHandlerTitle(e: any) {
    setTitle(e.target.value);
  }
  function changeHandlerDescription(e: any) {
    setDescription(e.target.value);
  }
  function changeHandlerDate(e: any) {
    setDate(e.target.value);
  }
  function changeHandlerTime(e: any) {
    setTime(e.target.value);
  }
  function changeHandlerLocation(e: any) {
    setLocation(e.target.value);
  }
  function changeHandlerCategory(e: any) {
    setCategory(e.target.value);
  }
  function changeHandlerStatus(e: any) {
    setStatus(e.target.value);
  }
  function changeHandlerMaxAttendees(e: any) {
    setMaxAttendees(e.target.value);
  }

  function handleSave() {
    const updatedEvent = {
      id: eventFound.id,
      title: title,
      description: description,
      date: date,
      time: time,
      location: location,
      category: category as EventCategory,
      status: status as EventStatus,
      maxAttendees: Number(maxAttendees),
      attendees: eventFound.attendees,
      createdAt: eventFound.createdAt,
    };

    if (
      updatedEvent.title === "" ||
      updatedEvent.date === "" ||
      updatedEvent.time === "" ||
      category === "" ||
      status === "" ||
      updatedEvent.maxAttendees === 0
    ) {
      return;
    }

    updateEvent(updatedEvent);
    navigate({ to: "/events" });
  }

  return (
    <main className="min-h-screen bg-slate-800 px-4 py-10">
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-700 p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-100">
            Event bearbeiten
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Ändere die Daten deines Events und speichere sie danach.
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Title
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              type="text"
              value={title}
              onChange={changeHandlerTitle}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Description
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              type="text"
              value={description}
              onChange={changeHandlerDescription}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Date
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                type="date"
                value={date}
                onChange={changeHandlerDate}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Time
              </label>
              <input
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                type="time"
                value={time}
                onChange={changeHandlerTime}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Location
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              type="text"
              value={location}
              onChange={changeHandlerLocation}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Category
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                value={category}
                onChange={changeHandlerCategory}
              >
                <option value="">Select category</option>
                <option value="workshop">workshop</option>
                <option value="talk">talk</option>
                <option value="networking">networking</option>
                <option value="review">review</option>
                <option value="other">other</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Status
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                value={status}
                onChange={changeHandlerStatus}
              >
                <option value="">Select status</option>
                <option value="draft">draft</option>
                <option value="published">published</option>
                <option value="cancelled">cancelled</option>
                <option value="completed">completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">
              Max Attendees
            </label>
            <input
              className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              type="number"
              value={maxAttendees}
              onChange={changeHandlerMaxAttendees}
            />
          </div>

          <button
            className="mt-4 w-full rounded-xl bg-slate-100 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-white"
            onClick={handleSave}
          >
            Speichern
          </button>
        </div>
      </section>
    </main>
  );
}
