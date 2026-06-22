import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    const { auth } = context;

    if (!auth.isLoaded) {
      return;
    }

    if (!auth.isSignedIn) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    return {
      userId: auth.userId,
    };
  },

  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
