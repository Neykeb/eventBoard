import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-slate-800 px-4 py-10">
      <section className=" mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-700 p-8 shadow-sm">
        <h1 className="mb-4 text-3xl font-semibold text-slate-100">About us</h1>

        <div className="space-y-4 text-slate-300">
          <p>
            This project was created with React, TypeScript and TanStack Router.
            It is a simple event management application that allows users to
            create, edit and organize events.
          </p>

          <p>
            The application demonstrates common frontend concepts such as
            routing, state management, forms, filtering, sorting and reusable
            components.
          </p>

          <p>
            Users can browse events, view event details, manage attendees and
            update event information through a clean and responsive interface.
          </p>

          <p>
            The main goal of this project is to practice modern React
            development and improve understanding of TypeScript and component
            architecture.
          </p>
        </div>
      </section>
    </main>
  );
}
