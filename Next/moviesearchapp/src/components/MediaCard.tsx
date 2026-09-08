import Image from "next/image";
import Link from "next/link";

import type { Media } from "@/types/media";

type MediaCardProps = {
  media: Media;
};

export default function MediaCard({ media }: MediaCardProps) {
  const title = media.title ?? media.name ?? "Unknown title";
  const releaseDate = media.release_date ?? media.first_air_date;

  const mediaPath =
    media.media_type === "movie"
      ? `/movie/${media.id}`
      : `/tv/${media.id}`;

  return (
    <Link
      href={mediaPath}
      className="group mx-auto block w-full max-w-sm overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#111122] text-left transition hover:-translate-y-1 hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-400/5"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#19192d]">
        {media.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6 text-center text-slate-500">
            No poster available
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="mb-3">
          <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
            {media.media_type === "movie" ? "🎬 Movie" : "📺 TV Show"}
          </span>
        </div>

        <h2 className="line-clamp-2 text-xl font-bold text-white transition group-hover:text-cyan-400">
          {title}
        </h2>

        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-400">
          <span>⭐ {media.vote_average.toFixed(1)}</span>

          {releaseDate && <span>{releaseDate.slice(0, 4)}</span>}
        </div>

        {media.overview && (
          <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-400">
            {media.overview}
          </p>
        )}

        <p className="mt-5 text-sm font-semibold text-cyan-400">
          View details →
        </p>
      </div>
    </Link>
  );
}