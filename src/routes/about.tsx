import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="app-page flex items-center justify-center">
      <section className="premium-panel mx-auto max-w-3xl p-8 sm:p-10">
        <p className="mb-2 text-sm font-medium text-[#FF6B89]">Über das Projekt</p>
        <h1 className="mb-5 text-3xl font-semibold tracking-tight text-white">Event Board</h1>

        <div className="space-y-4 leading-7 text-[#CBD5E1]">
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
