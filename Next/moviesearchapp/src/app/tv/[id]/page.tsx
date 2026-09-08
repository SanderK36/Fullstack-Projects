import Image from "next/image";
import Link from "next/link";

type TVShow = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  last_air_date: string;
  status: string;
  tagline: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: {
    id: number;
    name: string;
  }[];
};

type TVPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TVPage({
  params,
}: TVPageProps) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"}/api/tv/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080814] px-4 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            TV show not found
          </h1>

          <p className="mt-4 text-slate-400">
            We couldn&apos;t find the TV show you&apos;re looking for.
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

  const show: TVShow = await response.json();

  return (
    <main className="min-h-screen bg-[#080814] text-white">
      <section className="relative overflow-hidden">
        {show.backdrop_path && (
          <div className="absolute inset-0">
            <Image
              src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
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
              {show.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.name}
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
                📺 TV Show
              </span>

              <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {show.name}
              </h1>

              {show.tagline && (
                <p className="mt-4 text-lg italic text-slate-400">
                  &quot;{show.tagline}&quot;
                </p>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                   {show.vote_average.toFixed(1)}
                </span>

                {show.first_air_date && (
                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                    {show.first_air_date.slice(0, 4)}
                  </span>
                )}

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  {show.number_of_seasons}{" "}
                  {show.number_of_seasons === 1 ? "Season" : "Seasons"}
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  {show.number_of_episodes} Episodes
                </span>

                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
                  {show.status}
                </span>
              </div>

              {show.genres.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {show.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="text-sm text-slate-400"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-8">
                <h2 className="text-2xl font-bold">
                  Overview
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
                  {show.overview ||
                    "No overview available for this TV show."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}