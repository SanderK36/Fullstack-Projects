import Image from "next/image";
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number | null;
  status: string;
  tagline: string;
  genres?: {
    id: number;
    name: string;
  }[];
};

type MoviePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MoviePage({
  params,
}: MoviePageProps) {
  const { id } = await params;

  const apiKey = process.env.TMDB_API_KEY;

if (!apiKey) {
  throw new Error("TMDB_API_KEY is not configured");
}

const response = await fetch(
  `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
  {
    cache: "no-store",
  }
);

  if (!response.ok) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080814] px-4 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Movie not found
          </h1>

          <p className="mt-4 text-slate-400">
            We couldn&apos;t find the movie you&apos;re looking for.
          </p>

          <Link
            href="/"
            className="mt-8 inline-block rounded-full bg-cyan-400 px-6 py-3 font-semibold text-[#080814] transition hover:bg-cyan-300"
          >
            ← Back to search
          </Link>
        </div>
      </main>
    );
  }

  const movie: Movie = await response.json();

  return (
    <main className="min-h-screen bg-[#080814] text-white">
      <section className="relative min-h-screen overflow-hidden">
        {movie.backdrop_path && (
          <div className="absolute inset-0">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-20"
            />

            <div className="absolute inset-0 bg-[#080814]/80" />
          </div>
        )}

        <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
          <Link
            href="/"
            className="inline-block text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            ← Back to search
          </Link>

          <div className="mt-10 grid gap-8 md:grid-cols-[280px_1fr] md:gap-12">
            <div className="mx-auto w-full max-w-[280px]">
              {movie.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  width={500}
                  height={750}
                  priority
                  className="w-full rounded-2xl shadow-2xl"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center rounded-2xl bg-[#19192d] text-slate-500">
                  No poster available
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <span className="w-fit rounded-full bg-cyan-400/10 px-3 py-1 text-sm font-semibold text-cyan-400">
                🎬 Movie
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="mt-4 text-lg italic text-slate-400">
                  &quot;{movie.tagline}&quot;
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  ⭐ {movie.vote_average.toFixed(1)}
                </span>

                {movie.release_date && (
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                    {movie.release_date.slice(0, 4)}
                  </span>
                )}

                {movie.runtime && (
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                    {movie.runtime} min
                  </span>
                )}

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  {movie.status}
                </span>

                {movie.genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full bg-cyan-400/10 px-4 py-2 text-sm text-cyan-400"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <h2 className="text-2xl font-bold">
                  Overview
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                  {movie.overview ||
                    "No overview available for this movie."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
//hey
