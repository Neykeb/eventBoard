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
    <main className="flex min-h-screen items-center justify-center bg-[#222D3F] px-4 py-12">
      <section className="flex w-full max-w-md flex-col items-center gap-6">
        <div className="text-center"><p className="mb-2 text-sm font-medium text-[#FF6B89]">Willkommen zurück</p><h1 className="text-3xl font-semibold tracking-tight text-white">Bei Event Board anmelden</h1></div>

        <SignIn
          routing="hash"
          forceRedirectUrl={search.redirect || "/events"}
        />
      </section>
    </main>
  );
}
