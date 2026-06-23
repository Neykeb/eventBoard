// Dashboard & Details
import { createFileRoute } from "@tanstack/react-router";
import { EventCard } from "../../../components/eventCard";
import { useState } from "react";
import { useEvents } from "../../../hooks/useEvents";

export const Route = createFileRoute("/_authenticated/events/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { events, deleteEvent } = useEvents();

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setselectedSort] = useState("");

  function changeHandler(e: any) {
    setSearch(e.target.value);
  }
  function changeHandlerStatus(e: any) {
    setSelectedStatus(e.target.value);
  }
  function changeHandlerCategory(e: any) {
    setSelectedCategory(e.target.value);
  }
  function changeHandlerSort(e: any) {
    setselectedSort(e.target.value);
  }

  const initialEventsFilter = events.filter((singleEvent: any) => {
    if (
      search &&
      !singleEvent.title.toLowerCase().includes(search.toLowerCase())
    ) {
      return false;
    }
    if (selectedStatus && singleEvent.status !== selectedStatus) {
      return false;
    }
    if (selectedCategory && singleEvent.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  // Sortieren nach Datum und Alphabet
  const sortedEvents = [...initialEventsFilter].sort((a, b) => {
    if (selectedSort === "alphabet") return a.title.localeCompare(b.title);
    if (selectedSort === "date-descending")
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Dashboard Zahlen
  const sumOfEvents = events.length;
  const sumOfPublishedEvents = events.filter(
    (e: any) => e.status === "published",
  ).length;

  const sumOfDraftEvents = events.filter(
    (e: any) => e.status === "draft",
  ).length;

  const sumOfComplEvents = events.filter(
    (e: any) => e.status === "completed",
  ).length;

  const sumOfCanclldEvents = events.filter(
    (e: any) => e.status === "cancelled",
  ).length;

  const sumOfAttendees = events.filter((e: any) => e.attendees).length;

  // Für Dashboard aufsteigend
  const nextEvent = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  let summeAuslastung = 0;
  events.forEach((event: any) => {
    summeAuslastung += (event.attendees.length / event.maxAttendees) * 100;
  });
  const durchschnittlicheAuslastung = summeAuslastung / events.length;

  return (
    <main className="min-h-screen bg-slate-800 px-4 py-10">
      <section className="mx-auto max-w-6xl space-y-8">
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Total number of events</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {sumOfEvents}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Published events</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {sumOfPublishedEvents}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Drafts</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {sumOfDraftEvents}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Completed events</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {sumOfComplEvents}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Cancelled events</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {sumOfCanclldEvents}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">
              Total number of participants
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {sumOfAttendees}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Next event</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {nextEvent[0].id}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Average capacity</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {durchschnittlicheAuslastung}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-4">
            <input
              className="rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              type="text"
              placeholder="Texteingabe"
              onChange={changeHandler}
              value={search}
            />

            <select
              className="rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              name="status"
              id="event"
              onChange={changeHandlerStatus}
              value={selectedStatus}
            >
              <option value="">All Status</option>
              <option value="draft">draft</option>
              <option value="published">published</option>
              <option value="cancelled">cancelled</option>
              <option value="completed">completed</option>
            </select>

            <select
              className="rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              name="category"
              id="event"
              onChange={changeHandlerCategory}
              value={selectedCategory}
            >
              <option value="">All Categories</option>
              <option value="workshop">Workshop</option>
              <option value="talk">Talk</option>
              <option value="networking">Networking</option>
              <option value="review">Review</option>
              <option value="other">Other</option>
            </select>

            <select
              className="rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
              name="sort"
              id="sort"
              onChange={changeHandlerSort}
              value={selectedSort}
            >
              <option value="date-ascending">datumAufsteigend</option>
              <option value="date-descending">datumAbsteigend</option>
              <option value="alphabet">A-Z</option>
            </select>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {sortedEvents.map((element) => {
            return (
              <div
                key={element.id}
                className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm"
              >
                <EventCard
                  id={element.id}
                  title={element.title}
                  description={element.description}
                  date={element.date}
                  time={element.time}
                  location={element.location}
                  category={element.category}
                  status={element.status}
                  maxAttendees={element.maxAttendees}
                  attendees={element.attendees}
                  createdAt={element.createdAt}
                />

                <button
                  className="mt-10 w-full rounded-md border bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-red-100"
                  onClick={() => deleteEvent(element.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}
        </section>
      </section>
    </main>
  );
}
