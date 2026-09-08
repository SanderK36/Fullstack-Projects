"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type RandomMovieButtonsProps = {
  onLoadingChange?: (loading: boolean) => void;
};

const randomMovies = [
  {
    genreId: 27,
    label: "Random Horror",
    icon: "",
  },
  {
    genreId: 28,
    label: "Random Action",
    icon: "",
  },
  {
    genreId: 18,
    label: "Random Drama",
    icon: "",
  },
  {
    genreId: 35,
    label: "Random Comedy",
    icon: "",
  },
];

export default function RandomMovieButtons({
  onLoadingChange,
}: RandomMovieButtonsProps) {
  const router = useRouter();

  const [loadingGenre, setLoadingGenre] = useState<number | null>(
    null
  );

  async function getRandomMovie(genreId: number) {
    setLoadingGenre(genreId);
    onLoadingChange?.(true);

    try {
      const response = await fetch(
        `/api/random?genre=${genreId}`
      );

      if (!response.ok) {
        throw new Error("Failed to get random movie");
      }

      const data: {
        id: number;
      } = await response.json();

      router.push(`/movie/${data.id}`);
    } catch (error) {
      console.error(
        "Failed to get random movie:",
        error
      );

      setLoadingGenre(null);
      onLoadingChange?.(false);
    }
  }

  return (
    <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
      {randomMovies.map((movie) => {
        const isLoading = loadingGenre === movie.genreId;

        return (
          <button
            key={movie.genreId}
            type="button"
            onClick={() => getRandomMovie(movie.genreId)}
            disabled={loadingGenre !== null}
            className="group flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#111122] px-3 py-3 text-sm font-semibold text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-cyan-400/5 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4"
          >
            <span className="text-base">
              {movie.icon}
            </span>

            <span>
              {isLoading
                ? "Finding..."
                : movie.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}