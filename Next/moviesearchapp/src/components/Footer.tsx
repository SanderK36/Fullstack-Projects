import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-cyan-400/10 bg-[#080814]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <div>
            <Link
              href="/"
              className="text-lg font-bold text-white transition hover:text-cyan-400"
            >
              Movie Finder
            </Link>

            <p className="mt-1 text-sm text-slate-500">
              Discover movies and TV shows.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-sm text-slate-400">
            <Link
              href="/"
              className="transition hover:text-cyan-400"
            >
              Home
            </Link>

            <Link
              href="/"
              className="transition hover:text-cyan-400"
            >
              Search
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-cyan-400/10 pt-6 text-center">
          <p className="text-xs leading-5 text-slate-500">
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </p>

          <p className="mt-2 text-xs text-slate-600">
            © {new Date().getFullYear()} Movie Finder. All rights reserved. <br></br>
            made with Next.js, TypeScript, Tailwind CSS, and TMDB API.
          </p>
        </div>
      </div>
    </footer>
  );
}