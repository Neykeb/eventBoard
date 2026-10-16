type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    // NEU: Fehlerzustand - verständliches Feedback mit erneutem Ladeversuch.
    <main
      className="flex min-h-screen items-center justify-center bg-slate-800 px-4"
      role="alert"
    >
      <section className="w-full max-w-md rounded-2xl border border-red-400/40 bg-slate-700 p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-white">
          Daten konnten nicht geladen werden
        </h1>
        <p className="mt-3 text-red-200">{message}</p>
        <button
          type="button"
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={onRetry}
        >
          Erneut versuchen
        </button>
      </section>
    </main>
  );
}
