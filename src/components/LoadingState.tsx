type LoadingStateProps = {
  message?: string;
};

export function LoadingState({
  message = "Daten werden geladen...",
}: LoadingStateProps) {
  return (
    // NEU: Ladezustand - sichtbarer Spinner mit verständlicher Statusmeldung.
    <main
      className="flex min-h-screen items-center justify-center bg-slate-800 px-4"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4 text-center text-white">
        <span
          className="h-12 w-12 animate-spin rounded-full border-4 border-slate-500 border-t-[#F95F7A] motion-reduce:animate-none"
          aria-hidden="true"
        />
        <p className="text-lg font-medium">{message}</p>
      </div>
    </main>
  );
}
