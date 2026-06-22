import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/events/$eventId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
