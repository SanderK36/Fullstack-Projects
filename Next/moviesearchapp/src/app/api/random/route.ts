import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const genre = searchParams.get("genre");

  if (!genre) {
    return NextResponse.json(
      {
        error: "Genre is required",
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

  const genreId = Number(genre);

  if (!Number.isInteger(genreId)) {
    return NextResponse.json(
      {
        error: "Invalid genre",
      },
      {
        status: 400,
      }
    );
  }

  try {
    /*
     * First request tells us how many pages
     * of movies are available for this genre.
     */
    const firstResponse = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&include_adult=false&language=en-US&sort_by=popularity.desc&page=1`
    );

    if (!firstResponse.ok) {
      return NextResponse.json(
        {
          error:
            "Failed to fetch movies from TMDB",
        },
        {
          status: firstResponse.status,
        }
      );
    }

    const firstData = await firstResponse.json();

    const totalPages = Math.min(
      firstData.total_pages ?? 1,
      500
    );

    /*
     * Pick a random page.
     */
    const randomPage =
      Math.floor(Math.random() * totalPages) + 1;

    /*
     * Fetch that page.
     */
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&include_adult=false&language=en-US&sort_by=popularity.desc&page=${randomPage}`
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            "Failed to fetch random movie from TMDB",
        },
        {
          status: response.status,
        }
      );
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      return NextResponse.json(
        {
          error: "No movies found",
        },
        {
          status: 404,
        }
      );
    }

    /*
     * Pick a random movie from the selected page.
     */
    const randomMovie =
      data.results[
        Math.floor(
          Math.random() * data.results.length
        )
      ];

    return NextResponse.json({
      id: randomMovie.id,
    });
  } catch (error) {
    console.error(
      "Failed to get random movie:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to get random movie",
      },
      {
        status: 500,
      }
    );
  }
}