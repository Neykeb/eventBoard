type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    // NEU: Leerzustand - verhindert eine leere Fläche ohne Erklärung.
    <section className="rounded-2xl border border-dashed border-slate-500 bg-slate-700 p-10 text-center">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-slate-300">{description}</p>

      {actionLabel && onAction ? (
        <button
          type="button"
          className="mt-6 rounded-xl bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
