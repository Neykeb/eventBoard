import { SignIn } from "@clerk/react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const search = Route.useSearch() as {
    redirect?: string;
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-800 px-4 py-12">
      <section className="flex w-full max-w-md flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-white">Login</h1>

        <SignIn
          routing="hash"
          forceRedirectUrl={search.redirect || "/events"}
        />
      </section>
    </main>
  );
}
