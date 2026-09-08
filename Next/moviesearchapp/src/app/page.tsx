"use client";

import { useEffect, useState } from "react";

import MediaCard from "@/components/MediaCard";
import Pagination from "@/components/Pagination";
import RandomMovieButtons from "@/components/RandomMovieButtons";
import SearchBar from "@/components/SearchBar";
import SearchFilters from "@/components/SearchFilters";
import type { Media, SearchResponse } from "@/types/media";

type Genre = {
  id: number;
  name: string;
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [media, setMedia] = useState<Media[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const [type, setType] = useState("all");
  const [sort, setSort] = useState("relevance");
  const [year, setYear] = useState("all");
  const [genre, setGenre] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function loadGenres() {
      try {
        const response = await fetch("/api/genres");

        if (!response.ok) {
          throw new Error("Failed to fetch genres");
        }

        const data: { genres: Genre[] } =
          await response.json();

        setGenres(data.genres);
      } catch (error) {
        console.error("Failed to load genres:", error);
      }
    }

    loadGenres();
  }, []);

  async function searchMovies(
    query = searchQuery,
    selectedType = type,
    selectedSort = sort,
    selectedYear = year,
    selectedGenre = genre,
    selectedPage = 1
  ) {
    if (!query.trim()) {
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setError("");

    try {
      const params = new URLSearchParams();

      params.set("query", query);
      params.set("page", String(selectedPage));

      if (selectedType !== "all") {
        params.set("type", selectedType);
      }

      if (selectedSort !== "relevance") {
        params.set("sort", selectedSort);
      }

      if (selectedYear !== "all") {
        params.set("year", selectedYear);
      }

      if (selectedGenre !== "all") {
        params.set("genre", selectedGenre);
      }

      const response = await fetch(
        `/api/search?${params.toString()}`
      );

      if (!response.ok) {
        console.error(
          "Search failed with status:",
          response.status
        );

        setError(
          "Something went wrong while searching. Please try again."
        );

        setMedia([]);
        return;
      }

      const data: SearchResponse = await response.json();

      const mediaResults = data.results.filter(
        (item) =>
          item.media_type === "movie" ||
          item.media_type === "tv"
      );

      setMedia(mediaResults);
      setCurrentPage(data.page);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Search failed:", error);

      setError(
        "Something went wrong while searching. Please try again."
      );

      setMedia([]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleTypeChange(newType: string) {
    setType(newType);

    if (hasSearched) {
      searchMovies(
        searchQuery,
        newType,
        sort,
        year,
        genre,
        1
      );
    }
  }

  function handleSortChange(newSort: string) {
    setSort(newSort);

    if (hasSearched) {
      searchMovies(
        searchQuery,
        type,
        newSort,
        year,
        genre,
        1
      );
    }
  }

  function handleYearChange(newYear: string) {
    setYear(newYear);

    if (hasSearched) {
      searchMovies(
        searchQuery,
        type,
        sort,
        newYear,
        genre,
        1
      );
    }
  }

  function handleGenreChange(newGenre: string) {
    setGenre(newGenre);

    if (hasSearched) {
      searchMovies(
        searchQuery,
        type,
        sort,
        year,
        newGenre,
        1
      );
    }
  }

  function handlePageChange(newPage: number) {
    searchMovies(
      searchQuery,
      type,
      sort,
      year,
      genre,
      newPage
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-[#080814] px-4 py-12 text-white sm:px-6 sm:py-16">
      <section className="mx-auto max-w-6xl text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
          Find your next favorite movie or show
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Movie Finder
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-slate-400 sm:text-lg">
          Search for movies and TV shows, discover something new,
          and build your personal watchlist.
        </p>

        <RandomMovieButtons />

        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onSearch={searchMovies}
        />

        {hasSearched && (
          <SearchFilters
            type={type}
            sort={sort}
            year={year}
            genre={genre}
            genres={genres}
            onTypeChange={handleTypeChange}
            onSortChange={handleSortChange}
            onYearChange={handleYearChange}
            onGenreChange={handleGenreChange}
          />
        )}

        {isLoading && (
          <p className="mt-8 text-slate-400">
            Searching...
          </p>
        )}

        {error && !isLoading && (
          <p className="mt-12 text-lg text-red-400">
            {error}
          </p>
        )}

        {hasSearched &&
          !isLoading &&
          !error &&
          media.length === 0 && (
            <p className="mt-12 text-lg text-slate-400">
              No movies or TV shows found for {searchQuery}.
            </p>
          )}

        {media.length > 0 && (
          <>
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {media.map((item) => (
                <MediaCard
                  key={`${item.media_type}-${item.id}`}
                  media={item}
                />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </section>
    </main>
  );
}