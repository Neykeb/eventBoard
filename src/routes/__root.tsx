import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";
import type { useAuth } from "@clerk/react";
import { EventsProvider } from "../hooks/useEvents";

type RouterContext = {
  auth: ReturnType<typeof useAuth>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <EventsProvider>
      <Navigation />
      <Outlet />
      <Footer />
    </EventsProvider>
  );
}
