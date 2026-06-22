import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEvents } from "../../../../hooks/useEvents";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/events/$eventId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { events, addAttendee } = useEvents();
  const { eventId } = Route.useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const eventFound = events.find((e: any) => e.id === eventId);

  function handleAddAttendeeBtn(){
     const newAttendee = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
  }
  addAttendee(eventFound.id, newAttendee);
  }

  function handleAddAttendeeName(e: any){
    setName(e.target.value);
  }
  function handleAddAttendeeEmail(e: any){
    setEmail(e.target.value)
  }
 
  if (eventFound === undefined) {
    return (
      <>
        <p>Error! Event not found.</p>
        <Link to="/events">Back to events</Link>
      </>
    );
  }

const details = eventFound.attendees.map((attendees: any) => {
  return (
    <div
      key={attendees.id}
      className="rounded-xl border border-slate-800 bg-slate-800 p-4"
    >
      <p className="text-xs text-slate-400">{attendees.id}</p>
      <p className="mt-1 font-medium text-slate-100">{attendees.name}</p>
      <p className="text-sm text-slate-300">{attendees.email}</p>
    </div>
  );
});



 return (
   <main className="min-h-screen bg-slate-800 px-4 py-10">
     <section className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-700 p-8 shadow-sm">
       <div className="mb-8 flex items-start justify-between gap-4">
         <div>
           <p className="text-sm text-slate-300">Event-ID: {eventId}</p>
           <h1 className="mt-2 text-2xl font-semibold text-slate-100">
             {eventFound.title}
           </h1>
           <p className="mt-2 text-sm text-slate-200">
             {eventFound.description}
           </p>
         </div>

         <button
           className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-white"
           onClick={() =>
             navigate({
               to: "/events/$eventId/edit",
               params: { eventId },
             })
           }
         >
           Edit
         </button>
       </div>

       <div className="grid gap-4 sm:grid-cols-2">
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Date: {eventFound.date}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Time: {eventFound.time}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Location: {eventFound.location}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Category: {eventFound.category}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Status: {eventFound.status}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Max Attendees: {eventFound.maxAttendees}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Attendees: {eventFound.attendees.length}
         </p>
         <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-200">
           Created at: {eventFound.createdAt}
         </p>
       </div>

       <section className="mt-10">
         <h2 className="mb-4 text-lg font-semibold text-slate-100">
           Attendees
         </h2>

         <div className="space-y-3">{details}</div>
       </section>

       <section className="mt-10 rounded-2xl border border-slate-800 bg-slate-800 p-5">
         <h2 className="mb-4 text-lg font-semibold text-slate-100">
           Add attendee
         </h2>

         <div className="grid gap-4 sm:grid-cols-2">
           <input
             className="rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
             type="text"
             placeholder="Name"
             value={name}
             onChange={handleAddAttendeeName}
           />

           <input
             className="rounded-xl border border-slate-300 bg-slate-700 px-4 py-3 text-sm text-slate-100 outline-none focus:border-slate-100 focus:ring-2 focus:ring-slate-800"
             type="text"
             placeholder="E-Mail"
             value={email}
             onChange={handleAddAttendeeEmail}
           />
         </div>

         <button
           className="mt-4 rounded-xl bg-slate-100 px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-white"
           onClick={handleAddAttendeeBtn}
         >
           Add attendee
         </button>
       </section>
     </section>
   </main>
 );
}
