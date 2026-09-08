import { NextResponse } from "next/server";

type TMDBResult = Record<string, unknown> & {
  media_type?: "movie" | "tv";
  genre_ids?: number[];
};

function sortResults(
  results: TMDBResult[],
  sort: string
) {
  if (sort === "rating") {
    return [...results].sort(
      (a, b) =>
        Number(b.vote_average ?? 0) -
        Number(a.vote_average ?? 0)
    );
  }

  if (sort === "name") {
    return [...results].sort((a, b) => {
      const nameA = String(
        a.title ?? a.name ?? ""
      ).toLowerCase();

      const nameB = String(
        b.title ?? b.name ?? ""
      ).toLowerCase();

      return nameA.localeCompare(nameB);
    });
  }

  if (sort === "newest") {
    return [...results].sort((a, b) => {
      const dateA = String(
        a.release_date ??
          a.first_air_date ??
          ""
      );

      const dateB = String(
        b.release_date ??
          b.first_air_date ??
          ""
      );

      return dateB.localeCompare(dateA);
    });
  }

  if (sort === "oldest") {
    return [...results].sort((a, b) => {
      const dateA = String(
        a.release_date ??
          a.first_air_date ??
          ""
      );

      const dateB = String(
        b.release_date ??
          b.first_air_date ??
          ""
      );

      return dateA.localeCompare(dateB);
    });
  }

  return results;
}

function addMediaType(
  results: Record<string, unknown>[],
  mediaType: "movie" | "tv"
): TMDBResult[] {
  return results.map((item) => ({
    ...item,
    media_type: mediaType,
  }));
}

async function searchByType(
  apiKey: string,
  query: string,
  type: "movie" | "tv",
  year: string,
  page: number
) {
  const params = new URLSearchParams({
    api_key: apiKey,
    query,
    include_adult: "false",
    language: "en-US",
    page: String(page),
  });

  if (year) {
    if (type === "movie") {
      params.set("primary_release_year", year);
    } else {
      params.set("first_air_date_year", year);
    }
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/${type}?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error(
      `TMDB ${type} search failed with status ${response.status}`
    );
  }

  const data = await response.json();

  return {
    ...data,
    results: addMediaType(
      data.results ?? [],
      type
    ),
  };
}

function filterByGenre(
  results: TMDBResult[],
  genre: string
) {
  if (!genre) {
    return results;
  }

  const genreId = Number(genre);

  return results.filter((item) =>
    item.genre_ids?.includes(genreId)
  );
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const query =
    searchParams.get("query")?.trim() ?? "";

  const type =
    searchParams.get("type") ?? "all";

  const year =
    searchParams.get("year") ?? "";

  const genre =
    searchParams.get("genre") ?? "";

  const sort =
    searchParams.get("sort") ?? "relevance";

  const requestedPage = Number(
    searchParams.get("page") ?? "1"
  );

  const page =
    Number.isInteger(requestedPage) &&
    requestedPage > 0
      ? requestedPage
      : 1;

  if (!query && !year && !genre) {
    return NextResponse.json(
      {
        error:
          "Search query or filter is required",
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
        error:
          "TMDB API key is not configured",
      },
      {
        status: 500,
      }
    );
  }

  try {
    let results: TMDBResult[] = [];
    let totalPages = 1;
    let totalResults = 0;

    if (type === "movie") {
      const data = await searchByType(
        apiKey,
        query,
        "movie",
        year,
        page
      );

      results = data.results;
      totalPages = data.total_pages ?? 1;
      totalResults = data.total_results ?? 0;
    } else if (type === "tv") {
      const data = await searchByType(
        apiKey,
        query,
        "tv",
        year,
        page
      );

      results = data.results;
      totalPages = data.total_pages ?? 1;
      totalResults = data.total_results ?? 0;
    } else {
      if (year) {
        const [movieData, tvData] =
          await Promise.all([
            searchByType(
              apiKey,
              query,
              "movie",
              year,
              page
            ),
            searchByType(
              apiKey,
              query,
              "tv",
              year,
              page
            ),
          ]);

        results = [
          ...movieData.results,
          ...tvData.results,
        ];

        totalPages = Math.max(
          movieData.total_pages ?? 1,
          tvData.total_pages ?? 1
        );

        totalResults =
          (movieData.total_results ?? 0) +
          (tvData.total_results ?? 0);
      } else {
        const params = new URLSearchParams({
          api_key: apiKey,
          query,
          include_adult: "false",
          language: "en-US",
          page: String(page),
        });

        const response = await fetch(
          `https://api.themoviedb.org/3/search/multi?${params.toString()}`
        );

        if (!response.ok) {
          return NextResponse.json(
            {
              error:
                "Failed to fetch data from TMDB",
            },
            {
              status: response.status,
            }
          );
        }

        const data = await response.json();

        results = (data.results ?? []).filter(
          (item: TMDBResult) =>
            item.media_type === "movie" ||
            item.media_type === "tv"
        );

        totalPages = data.total_pages ?? 1;
        totalResults = data.total_results ?? 0;
      }
    }

    /*
     * Genre filtering happens on the current TMDB page.
     */
    results = filterByGenre(results, genre);

    /*
     * Sorting happens on the current page.
     */
    if (sort !== "relevance") {
      results = sortResults(results, sort);
    }

    return NextResponse.json({
      page,
      results,
      total_pages: totalPages,
      total_results: totalResults,
    });
  } catch (error) {
    console.error(
      "TMDB search failed:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Failed to fetch data from TMDB",
      },
      {
        status: 500,
      }
    );
  }
}