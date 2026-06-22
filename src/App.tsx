import { useAuth } from "@clerk/react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useEffect } from "react";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = useAuth();

  useEffect(() => {
    void router.invalidate();
  }, [auth.isLoaded, auth.isSignedIn, auth.userId]);

  if (!auth.isLoaded) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-800 text-white">
        Loading...
      </main>
    );
  }

  return <RouterProvider router={router} context={{ auth }} />;
}

export default App;
