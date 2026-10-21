import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { EventCard } from "../../../components/EventCard";
import { Icon } from "../../../components/Icon";
import { useEvents } from "../../../hooks/useEvents";
import { LoadingState } from "../../../components/LoadingState";
import { ErrorState } from "../../../components/ErrorState";
import { EmptyState } from "../../../components/EmptyState";

export const Route = createFileRoute("/_authenticated/events/")({ component: RouteComponent });

type MetricProps = { label: string; value: string | number; icon: "calendar" | "check" | "draft" | "close" | "users" | "clock"; tone: string; children?: React.ReactNode };
function Metric({ label, value, icon, tone, children }: MetricProps) {
  return <article className="rounded-2xl border border-[#44536A] bg-[#344359] p-5 shadow-[0_14px_32px_rgba(12,19,31,0.14)]"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-medium text-[#A9B5C7]">{label}</p><p className="mt-3 text-3xl font-semibold tracking-tight text-white tabular-nums">{value}</p></div><span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}><Icon name={icon}/></span></div>{children}</article>;
}

function RouteComponent() {
  const { events, isLoading, error, retry, deleteEvent } = useEvents();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const navigate = useNavigate();

  function resetFilters() { setSearch(""); setSelectedStatus(""); setSelectedCategory(""); setSelectedSort(""); }
  if (isLoading) return <LoadingState message="Events werden geladen..."/>;
  if (error) return <ErrorState message={error} onRetry={() => void retry()}/>;
  if (!events.length) return <main className="app-page"><div className="mx-auto max-w-3xl"><EmptyState title="Noch keine Events vorhanden" description="Erstelle dein erstes Event, damit es hier angezeigt wird." actionLabel="Event erstellen" onAction={() => void navigate({ to: "/events/new" })}/></div></main>;

  const filtered = events.filter((event) => (!search || event.title.toLowerCase().includes(search.toLowerCase())) && (!selectedStatus || event.status === selectedStatus) && (!selectedCategory || event.category === selectedCategory));
  const sorted = [...filtered].sort((a, b) => selectedSort === "alphabet" ? a.title.localeCompare(b.title) : selectedSort === "date-descending" ? new Date(b.date).getTime() - new Date(a.date).getTime() : new Date(a.date).getTime() - new Date(b.date).getTime());
  const countStatus = (status: string) => events.filter((event) => event.status === status).length;
  const attendees = events.reduce((total, event) => total + event.attendees.length, 0);
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const nextEvent = events.filter((event) => new Date(event.date) >= today).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];
  const capacity = Math.max(0, Math.min(100, Math.round(events.reduce((total, event) => total + (event.attendees.length / event.maxAttendees) * 100, 0) / events.length)));
  const filtersActive = Boolean(search || selectedStatus || selectedCategory || selectedSort);
  const fieldClass = "h-12 w-full rounded-xl border border-[#44536A] bg-[#29374A] px-4 text-sm text-white outline-none transition placeholder:text-[#A9B5C7] hover:border-[#596980] focus:border-[#F45277] focus:ring-2 focus:ring-[#F45277]/20";
  function confirmDelete(id: string, title: string) { if (window.confirm(`Möchtest du „${title}“ wirklich löschen?`)) deleteEvent(id); }

  return <main className="app-page"><section className="mx-auto max-w-7xl space-y-10">
    <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="mb-2 text-sm font-medium text-[#FF6B89]">Event Board</p><h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Dashboard Übersicht</h1><p className="mt-2 text-[#A9B5C7]">Deine Events auf einen Blick</p></div><Link to="/events/new" className="primary-button"><span className="text-xl">+</span> Event erstellen</Link></header>

    <section aria-label="Statistiken" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Metric label="Events insgesamt" value={events.length} icon="calendar" tone="bg-[#F45277]/12 text-[#FF91AA]"/><Metric label="Veröffentlichte Events" value={countStatus("published")} icon="check" tone="bg-[#57C9A5]/12 text-[#7EDABC]"/><Metric label="Entwürfe" value={countStatus("draft")} icon="draft" tone="bg-[#F2B66D]/12 text-[#F2C98F]"/><Metric label="Abgeschlossene Events" value={countStatus("completed")} icon="check" tone="bg-[#57C9A5]/12 text-[#7EDABC]"/><Metric label="Abgesagte Events" value={countStatus("cancelled")} icon="close" tone="bg-red-400/12 text-red-300"/><Metric label="Teilnehmer insgesamt" value={attendees} icon="users" tone="bg-[#8FA8FF]/12 text-[#AFC0FF]"/>
      <Metric label="Nächstes Event" value={nextEvent?.title ?? "Kein Termin"} icon="clock" tone="bg-[#F45277]/12 text-[#FF91AA]">{nextEvent ? <p className="mt-2 text-sm text-[#A9B5C7]">{nextEvent.date} · {nextEvent.time} Uhr</p> : <p className="mt-2 text-sm text-[#A9B5C7]">Kein zukünftiges Event geplant.</p>}</Metric>
      <Metric label="Durchschnittliche Auslastung" value={`${capacity} %`} icon="users" tone="bg-[#8FA8FF]/12 text-[#AFC0FF]"><div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#263447]" role="progressbar" aria-valuenow={capacity} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-[#8FA8FF]" style={{ width: `${capacity}%` }}/></div></Metric>
    </section>

    <section className="premium-panel" aria-labelledby="filter-title"><div className="mb-5 flex items-start justify-between gap-4"><div><h2 id="filter-title" className="font-semibold text-white">Events finden</h2><p className="mt-1 text-sm text-[#A9B5C7]">Suche, filtere und sortiere deine Übersicht.</p></div>{filtersActive && <button type="button" onClick={resetFilters} className="text-sm font-medium text-[#FF91AA] hover:text-white">Filter zurücksetzen</button>}</div><div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <label className="relative"><span className="field-label">Events durchsuchen</span><Icon name="search" className="absolute bottom-3.5 left-3.5 h-5 w-5 text-[#A9B5C7]"/><input className={`${fieldClass} pl-11`} type="search" placeholder="Titel eingeben" value={search} onChange={(e) => setSearch(e.target.value)}/></label>
      <label><span className="field-label">Status</span><select className={fieldClass} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}><option value="">Alle Status</option><option value="draft">Entwurf</option><option value="published">Veröffentlicht</option><option value="cancelled">Abgesagt</option><option value="completed">Abgeschlossen</option></select></label>
      <label><span className="field-label">Kategorie</span><select className={fieldClass} value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}><option value="">Alle Kategorien</option><option value="workshop">Workshop</option><option value="talk">Vortrag</option><option value="networking">Netzwerken</option><option value="review">Feedback</option><option value="other">Sonstiges</option></select></label>
      <label><span className="field-label">Sortierung</span><select className={fieldClass} value={selectedSort} onChange={(e) => setSelectedSort(e.target.value)}><option value="date-ascending">Datum aufsteigend</option><option value="date-descending">Datum absteigend</option><option value="alphabet">A–Z</option></select></label>
    </div></section>

    <section aria-labelledby="event-list-title"><div className="mb-5"><h2 id="event-list-title" className="text-2xl font-semibold tracking-tight text-white">Deine Events</h2><p className="mt-1 text-sm text-[#A9B5C7]">{sorted.length} von {events.length} Events sichtbar</p></div>{!sorted.length ? <EmptyState title="Keine passenden Events gefunden" description="Ändere deine Suche oder setze die Filter zurück." actionLabel="Filter zurücksetzen" onAction={resetFilters}/> : <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">{sorted.map((event) => <EventCard key={event.id} {...event} onDelete={() => confirmDelete(event.id, event.title)}/>)}</div>}</section>
  </section></main>;
}
