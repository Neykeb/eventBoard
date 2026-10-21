type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    // NEU: Fehlerzustand - verständliches Feedback mit erneutem Ladeversuch.
    <main
      className="flex min-h-screen items-center justify-center bg-[#222D3F] px-4"
      role="alert"
    >
      <section className="w-full max-w-md rounded-2xl border border-red-400/30 bg-[#344359] p-8 text-center shadow-xl">
        <h1 className="text-2xl font-semibold text-white">
          Daten konnten nicht geladen werden
        </h1>
        <p className="mt-3 text-red-200">{message}</p>
        <button
          type="button"
          className="primary-button mt-6"
          onClick={onRetry}
        >
          Erneut versuchen
        </button>
      </section>
    </main>
  );
}
