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
      { error: "TV show ID is required" },
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?api_key=${
      process.env.TMDB_API_KEY
    }&language=en-US`
  );

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch TV show details from TMDB" },
      { status: response.status }
    );
  }

  const tvShow = await response.json();

  return NextResponse.json(tvShow);
}