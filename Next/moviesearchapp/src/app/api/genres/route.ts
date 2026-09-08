import { NextResponse } from "next/server";

type Genre = {
  id: number;
  name: string;
};

export async function GET() {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "TMDB API key is not configured",
      },
      {
        status: 500,
      }
    );
  }

  try {
    const [movieResponse, tvResponse] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
      ),
      fetch(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
      ),
    ]);

    if (!movieResponse.ok || !tvResponse.ok) {
      return NextResponse.json(
        {
          error: "Failed to fetch genres from TMDB",
        },
        {
          status: 500,
        }
      );
    }

    const movieData = await movieResponse.json();
    const tvData = await tvResponse.json();

    const genres = new Map<number, Genre>();

    for (const genre of movieData.genres ?? []) {
      genres.set(genre.id, genre);
    }

    for (const genre of tvData.genres ?? []) {
      genres.set(genre.id, genre);
    }

    const sortedGenres = Array.from(genres.values()).sort(
      (a, b) => a.name.localeCompare(b.name)
    );

    return NextResponse.json({
      genres: sortedGenres,
    });
  } catch (error) {
    console.error("Failed to fetch genres:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch genres from TMDB",
      },
      {
        status: 500,
      }
    );
  }
}