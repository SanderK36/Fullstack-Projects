type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        className="w-full rounded-xl border border-white/10 bg-[#111122] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
      >
        ← Previous
      </button>

      <div className="rounded-xl border border-cyan-400/10 bg-[#111122] px-5 py-3 text-sm text-slate-400">
        Page{" "}
        <span className="font-semibold text-white">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-white">
          {totalPages}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="w-full rounded-xl border border-white/10 bg-[#111122] px-5 py-3 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/30 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto"
      >
        Next →
      </button>
    </div>
  );
}