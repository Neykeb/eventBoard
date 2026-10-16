import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="min-h-screen flex justify-center items-center bg-slate-800 px-4 py-10">
      <section className=" mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-700 p-8 shadow-sm">
        <h1 className="mb-4 text-3xl font-semibold text-slate-100">Über uns</h1>

        <div className="space-y-4 text-slate-300">
          <p>
            Dieses Projekt wurde mit React, TypeScript und TanStack Router
            erstellt. Nutzer können Events erstellen, bearbeiten und verwalten.
          </p>

          <p>
            Die Anwendung zeigt Routing, State-Management, Formulare, Filter,
            Sortierung und wiederverwendbare Komponenten.
          </p>

          <p>
            Nutzer können Eventdetails ansehen, Teilnehmer verwalten und
            Eventinformationen über eine responsive Oberfläche ändern.
          </p>

          <p>
            Das Ziel ist die praktische Anwendung moderner React-Entwicklung,
            TypeScript und einer modularen Komponentenarchitektur.
          </p>
        </div>
      </section>
    </main>
  );
}
