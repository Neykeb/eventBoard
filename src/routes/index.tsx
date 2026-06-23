import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router';
export const Route = createFileRoute('/')({
  component: RouteComponent,
})


function RouteComponent() {
  return (
    <>
      <section className="min-h-screen bg-[#1F2533] flex items-center">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-16 md:flex-row md:justify-between md:px-8">
          <div className="max-w-xl text-left">
            <h1 className="text-4xl font-bold text-white sm:text-5xl">
              Manage your events simply and
              <strong className="text-[#F95F7A]"> clearly. </strong>
            </h1>

            <p className="mt-4 text-base text-slate-300 sm:text-lg">
              Create, edit and manage events — with attendee management, filter
              options and a calendar overview.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                to="/events"
                className="rounded-lg bg-slate-100 px-5 py-3 font-medium text-slate-900 transition hover:bg-white"
              >
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
