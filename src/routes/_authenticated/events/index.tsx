// Dashboard & Details
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { EventCard } from "../../../components/EventCard";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { useEvents } from "../../../hooks/useEvents";
import { LoadingState } from "../../../components/LoadingState";
import { ErrorState } from "../../../components/ErrorState";
import { EmptyState } from "../../../components/EmptyState";

export const Route = createFileRoute("/_authenticated/events/")({
  component: RouteComponent,
});

function RouteComponent() {
  // NEU: Asynchroner Datenfluss - Lade- und Fehlerstatus kommen aus useEvents.
  const { events, isLoading, error, retry, deleteEvent } = useEvents();

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [selectedSort, setSelectedSort] = useState("");

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  function changeHandlerStatus(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedStatus(e.target.value);
  }
  function changeHandlerCategory(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(e.target.value);
  }
  function changeHandlerSort(e: ChangeEvent<HTMLSelectElement>) {
    setSelectedSort(e.target.value);
  }

  // NEU: Leerzustand - setzt alle Such-, Filter- und Sortierwerte zurück.
  function resetFilters() {
    setSearch("");
    setSelectedStatus("");
    setSelectedCategory("");
    setSelectedSort("");
  }

  if (isLoading) {
    // NEU: Ladezustand - wird angezeigt, bis fetch abgeschlossen ist.
    return <LoadingState message="Events werden geladen..." />;
  }

  if (error) {
    // NEU: Fehlerzustand - Retry startet fetch erneut.
    return <ErrorState message={error} onRetry={() => void retry()} />;
  }

  if (events.length === 0) {
    // NEU: Leerzustand - es wurden überhaupt keine Events geladen.
    return (
      <main className="min-h-screen bg-slate-800 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <EmptyState
            title="Noch keine Events vorhanden"
            description="Erstelle dein erstes Event, damit es hier angezeigt wird."
            actionLabel="Event erstellen"
            onAction={() => void navigate({ to: "/events/new" })}
          />
        </div>
      </main>
    );
  }

  const filteredEvents = events.filter((singleEvent) => {
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
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (selectedSort === "alphabet") return a.title.localeCompare(b.title);
    if (selectedSort === "date-descending")
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // Dashboard Zahlen
  const eventCount = events.length;
  const publishedEventCount = events.filter(
    (event) => event.status === "published",
  ).length;

  const draftEventCount = events.filter(
    (event) => event.status === "draft",
  ).length;

  const completedEventCount = events.filter(
    (event) => event.status === "completed",
  ).length;

  const cancelledEventCount = events.filter(
    (event) => event.status === "cancelled",
  ).length;

  // NEU: Teilnehmerzahl - addiert die Teilnehmer aller Events.
  const attendeeCount = events.reduce((total, event) => {
    return total + event.attendees.length;
  }, 0);

  // NEU: Nächstes Event - vergangene Termine werden ausgeschlossen.
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const nextEvent = events.filter((event) => new Date(event.date) >= today).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )[0];

  const totalCapacityPercentage = events.reduce((total, event) => {
    return total + (event.attendees.length / event.maxAttendees) * 100;
  }, 0);
  // NEU: Auslastung - gerundet und als Prozentwert formatiert.
  const averageCapacity = Math.round(totalCapacityPercentage / events.length);

  // NEU: Löschen - verlangt vor dem endgültigen Entfernen eine Bestätigung.
  function confirmDelete(eventId: string, eventTitle: string) {
    if (window.confirm(`Möchtest du „${eventTitle}“ wirklich löschen?`)) {
      deleteEvent(eventId);
    }
  }

  return (
    <main className="min-h-screen bg-slate-800 px-4 py-10">
      <section className="mx-auto max-w-6xl space-y-8">
        {/* NEU: Event erstellen - Einstieg für Nutzer. */}
        <div className="flex justify-end">
          <Link
            to="/events/new"
            className="rounded-xl bg-white px-5 py-3 font-medium text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Event erstellen
          </Link>
        </div>
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Events insgesamt</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {eventCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Veröffentlichte Events</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {publishedEventCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Entwürfe</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {draftEventCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Abgeschlossene Events</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {completedEventCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Abgesagte Events</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {cancelledEventCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">
              Teilnehmer insgesamt
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {attendeeCount}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Nächstes Event</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {nextEvent
                ? `${nextEvent.title} (${nextEvent.date})`
                : "Kein kommendes Event"}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
            <p className="text-sm text-slate-200">Durchschnittliche Auslastung</p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">
              {averageCapacity} %
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-700 p-5 shadow-sm">
          {/* NEU: Formular-Labels - jede Filtereingabe hat eine eindeutige ID. */}
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label htmlFor="event-search" className="mb-2 block text-sm font-medium text-slate-200">
                Events durchsuchen
              </label>
              <input
                id="event-search"
                name="eventSearch"
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                type="search"
                placeholder="Titel eingeben"
                onChange={changeHandler}
                value={search}
              />
            </div>

            <div>
              <label htmlFor="status-filter" className="mb-2 block text-sm font-medium text-slate-200">
                Status
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                name="status"
                id="status-filter"
                onChange={changeHandlerStatus}
                value={selectedStatus}
              >
                <option value="">Alle Status</option>
                <option value="draft">Entwurf</option>
                <option value="published">Veröffentlicht</option>
                <option value="cancelled">Abgesagt</option>
                <option value="completed">Abgeschlossen</option>
              </select>
            </div>

            <div>
              <label htmlFor="category-filter" className="mb-2 block text-sm font-medium text-slate-200">
                Kategorie
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                name="category"
                id="category-filter"
                onChange={changeHandlerCategory}
                value={selectedCategory}
              >
                <option value="">Alle Kategorien</option>
                <option value="workshop">Workshop</option>
                <option value="talk">Vortrag</option>
                <option value="networking">Netzwerken</option>
                <option value="review">Feedback</option>
                <option value="other">Sonstiges</option>
              </select>
            </div>

            <div>
              <label htmlFor="event-sort" className="mb-2 block text-sm font-medium text-slate-200">
                Sortierung
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                name="sort"
                id="event-sort"
                onChange={changeHandlerSort}
                value={selectedSort}
              >
                <option value="date-ascending">Datum aufsteigend</option>
                <option value="date-descending">Datum absteigend</option>
                <option value="alphabet">A-Z</option>
              </select>
            </div>
          </div>
        </section>

        {sortedEvents.length === 0 ? (
          // NEU: Leerzustand - die Daten existieren, aber kein Filtertreffer.
          <EmptyState
            title="Keine passenden Events gefunden"
            description="Ändere deine Suche oder setze die Filter zurück, um wieder Events zu sehen."
            actionLabel="Filter zurücksetzen"
            onAction={resetFilters}
          />
        ) : (
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
                    date={element.date}
                    time={element.time}
                    location={element.location}
                    category={element.category}
                    status={element.status}
                    attendees={element.attendees}
                  />

                  <button
                    className="mt-10 w-full rounded-md border bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-red-100"
                    onClick={() => confirmDelete(element.id, element.title)}
                  >
                    Löschen
                  </button>
                </div>
              );
            })}
          </section>
        )}
      </section>
    </main>
  );
}
