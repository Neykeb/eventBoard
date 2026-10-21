import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router';
export const Route = createFileRoute('/')({
  component: RouteComponent,
})


function RouteComponent() {
  return (
    <main>
      <section className="flex min-h-screen items-center bg-[#1F2533]">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-[0.9fr_1.1fr] md:gap-8 md:px-8 lg:gap-14">
          <div className="relative z-10 max-w-xl text-left">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Verwalte deine Events einfach und
              <strong className="text-[#F95F7A]"> übersichtlich. </strong>
            </h1>

            <p className="mt-4 text-base text-slate-300 sm:text-lg">
              Erstelle, bearbeite und verwalte Events mit Teilnehmerverwaltung,
              Suche und Filtern.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                to="/events"
                className="rounded-lg bg-slate-100 px-5 py-3 font-medium text-slate-900 transition hover:bg-white"
              >
                Events anzeigen
              </Link>
            </div>
          </div>
          <div className="flex w-full items-center justify-center md:justify-end">
            <img
              src="/event-board-hero.webp"
              alt="Illustration der Eventboard-Oberfläche mit Kalender, Eventkarten und Teilnehmerübersicht"
              width="1448"
              height="1086"
              fetchPriority="high"
              className="h-auto w-full max-w-[680px] object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.28)]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
