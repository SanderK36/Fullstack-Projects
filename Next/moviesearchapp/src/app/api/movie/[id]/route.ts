import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  context: RouteContext
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      {
        error: "Movie ID is required",
      },
      {
        status: 400,
      }
    );
  }

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

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
  );

  if (!response.ok) {
    return NextResponse.json(
      {
        error: "Failed to fetch movie details from TMDB",
      },
      {
        status: response.status,
      }
    );
  }

  const movie = await response.json();

  return NextResponse.json(movie);
}