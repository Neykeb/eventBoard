import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { Navi } from "../components/navi";
import { Footer } from "../components/footer";
import type { useAuth } from "@clerk/react";

type RouterContext = {
  auth: ReturnType<typeof useAuth>;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Navi />
      <Outlet />
      <Footer />
    </>
  );
}
