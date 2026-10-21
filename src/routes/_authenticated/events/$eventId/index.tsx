import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEvents } from "../../../../hooks/useEvents";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { LoadingState } from "../../../../components/LoadingState";
import { ErrorState } from "../../../../components/ErrorState";
import { eventCategoryLabels, eventStatusLabels } from "../../../../data/events";

export const Route = createFileRoute("/_authenticated/events/$eventId/")({
  component: RouteComponent,
});

function RouteComponent() {
  // NEU: Asynchroner Datenfluss - Details erst nach dem Laden auswerten.
  const { events, isLoading, error, retry, addAttendee } = useEvents();
  const { eventId } = Route.useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formErrors, setFormErrors] = useState({ name: "", email: "", form: "" });
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const eventFound = events.find((event) => event.id === eventId);

  if (isLoading) {
    // NEU: Ladezustand - verhindert eine verfrühte Detailansicht.
    return <LoadingState message="Event wird geladen..." />;
  }

  if (error) {
    // NEU: Fehlerzustand - Retry startet fetch erneut.
    return <ErrorState message={error} onRetry={() => void retry()} />;
  }

  // NEU: Teilnehmer-Validierung - prüft Pflichtfelder, E-Mail, Duplikate und Kapazität.
  function handleAddAttendee(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!eventFound) return;

    const trimmedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const nextErrors = { name: "", email: "", form: "" };

    if (!trimmedName) nextErrors.name = "Bitte gib einen Namen ein.";
    if (!normalizedEmail) {
      nextErrors.email = "Bitte gib eine E-Mail-Adresse ein.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
    } else if (
      eventFound.attendees.some(
        (attendee) => attendee.email.toLowerCase() === normalizedEmail,
      )
    ) {
      nextErrors.email = "Diese E-Mail-Adresse ist bereits angemeldet.";
    }

    if (eventFound.attendees.length >= eventFound.maxAttendees) {
      nextErrors.form = "Dieses Event hat bereits die maximale Teilnehmerzahl erreicht.";
    }

    setFormErrors(nextErrors);

    if (nextErrors.name) {
      nameInputRef.current?.focus();
      return;
    }
    if (nextErrors.email) {
      emailInputRef.current?.focus();
      return;
    }
    if (nextErrors.form) return;

    addAttendee(eventFound.id, {
      id: crypto.randomUUID(),
      name: trimmedName,
      email: normalizedEmail,
    });
    setName("");
    setEmail("");
  }
 
  if (eventFound === undefined) {
    return (
      <main className="app-page"><section className="premium-panel mx-auto max-w-xl text-center"><h1 className="text-2xl font-semibold text-white">Event nicht gefunden</h1><Link className="primary-button mt-6" to="/events">Zurück zu den Events</Link></section></main>
    );
  }

const details = eventFound.attendees.map((attendees) => {
  return (
    <div
      key={attendees.id}
      className="rounded-xl border border-[#44536A] bg-[#29374A] p-4"
    >
      <p className="text-xs text-[#A9B5C7]">{attendees.id}</p>
      <p className="mt-1 font-medium text-white">{attendees.name}</p>
      <p className="text-sm text-[#A9B5C7]">{attendees.email}</p>
    </div>
  );
});



 return (
   <main className="app-page">
     <section className="detail-page premium-panel mx-auto max-w-4xl p-6 sm:p-8">
       <div className="mb-8 flex items-start justify-between gap-4">
         <div>
           <p className="text-sm font-medium text-[#FF6B89]">Eventdetails</p>
           <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">
             {eventFound.title}
           </h1>
           <p className="mt-3 max-w-2xl text-sm leading-6 text-[#CBD5E1]">
             {eventFound.description}
           </p>
         </div>

         <button
           className="secondary-button"
           onClick={() =>
             navigate({
               to: "/events/$eventId/edit",
               params: { eventId },
             })
           }
         >
           Bearbeiten
         </button>
       </div>

       <div className="grid gap-4 sm:grid-cols-2">
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Datum: {eventFound.date}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Uhrzeit: {eventFound.time}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Ort: {eventFound.location}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Kategorie: {eventCategoryLabels[eventFound.category]}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Status: {eventStatusLabels[eventFound.status]}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Maximale Teilnehmerzahl: {eventFound.maxAttendees}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Teilnehmer: {eventFound.attendees.length}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Erstellt am: {eventFound.createdAt}
         </p>
       </div>

       <section className="mt-10">
         <h2 className="mb-4 text-lg font-semibold text-slate-100">
           Teilnehmer
         </h2>

         <div className="space-y-3">{details}</div>
       </section>

       <section className="mt-10 rounded-2xl border border-[#44536A] bg-[#29374A] p-5 sm:p-6">
         <h2 className="mb-4 text-lg font-semibold text-slate-100">
           Teilnehmer hinzufügen
         </h2>

         {/* NEU: Teilnehmerformular - native Form, Labels und Feldfehler. */}
         <form className="premium-form" onSubmit={handleAddAttendee} noValidate>
           <div className="grid gap-4 sm:grid-cols-2">
             <div>
               <label htmlFor="attendee-name" className="mb-2 block text-sm font-medium text-slate-200">
                 Name
               </label>
               <input
                 ref={nameInputRef}
                 id="attendee-name"
                 name="attendeeName"
                 autoComplete="name"
                 className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                 type="text"
                 value={name}
                 aria-invalid={Boolean(formErrors.name)}
                 aria-describedby={formErrors.name ? "attendee-name-error" : undefined}
                 onChange={(event) => setName(event.target.value)}
               />
               {formErrors.name ? (
                 <p id="attendee-name-error" className="mt-2 text-sm text-red-300">
                   {formErrors.name}
                 </p>
               ) : null}
             </div>

             <div>
               <label htmlFor="attendee-email" className="mb-2 block text-sm font-medium text-slate-200">
                 E-Mail
               </label>
               <input
                 ref={emailInputRef}
                 id="attendee-email"
                 name="attendeeEmail"
                 autoComplete="email"
                 className="w-full rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
                 type="email"
                 value={email}
                 aria-invalid={Boolean(formErrors.email)}
                 aria-describedby={formErrors.email ? "attendee-email-error" : undefined}
                 onChange={(event) => setEmail(event.target.value)}
               />
               {formErrors.email ? (
                 <p id="attendee-email-error" className="mt-2 text-sm text-red-300">
                   {formErrors.email}
                 </p>
               ) : null}
             </div>
           </div>

           <p role="alert" className="mt-3 min-h-5 text-sm text-red-300">
             {formErrors.form}
           </p>

           <button
             type="submit"
             className="primary-button mt-4"
           >
             Teilnehmer hinzufügen
           </button>
         </form>
       </section>
     </section>
   </main>
 );
}
