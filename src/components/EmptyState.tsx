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
    <section className="rounded-2xl border border-dashed border-[#56657B] bg-[#344359] p-10 text-center">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-3 max-w-lg text-[#A9B5C7]">{description}</p>

      {actionLabel && onAction ? (
        <button
          type="button"
          className="primary-button mt-6"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </section>
  );
}
