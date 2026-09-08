"use client";

import { useEffect, useState } from "react";

import type { Media, SearchResponse } from "@/types/media";

type SearchBarProps = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearch: (query?: string) => void;
};

export default function SearchBar({
  searchQuery,
  onSearchQueryChange,
  onSearch,
}: SearchBarProps) {
  const [suggestions, setSuggestions] = useState<Media[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) {
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/search?query=${encodeURIComponent(searchQuery)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }

        const data: SearchResponse = await response.json();

        const mediaResults = data.results.filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );

        setSuggestions(mediaResults.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  function handleInputChange(value: string) {
    onSearchQueryChange(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setShowSuggestions(true);
  }

  function handleSearch(query?: string) {
    setShowSuggestions(false);
    onSearch(query);
  }

  function selectSuggestion(media: Media) {
    const title = media.title ?? media.name ?? "";

    onSearchQueryChange(title);
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch(title);
  }

  return (
    <div className="relative mx-auto mt-10 max-w-2xl">
      <div className="flex gap-3">
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => handleInputChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearch();
            }
          }}
          placeholder="Search for a movie or show..."
          className="min-w-0 flex-1 rounded-full border border-cyan-400/20 bg-[#19192d] px-6 py-4 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
        />

        <button
          type="button"
          onClick={() => handleSearch()}
          className="rounded-full bg-cyan-400 px-6 py-4 font-bold text-[#080814] transition hover:bg-cyan-300"
        >
          Search
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-20 top-full z-10 mt-2 overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#19192d] text-left shadow-xl">
          {suggestions.map((media) => {
            const title = media.title ?? media.name ?? "Unknown title";

            return (
              <button
                key={`${media.media_type}-${media.id}`}
                type="button"
                onClick={() => selectSuggestion(media)}
                className="block w-full px-5 py-3 text-left text-slate-300 transition hover:bg-cyan-400/10 hover:text-cyan-400"
              >
                <span>{title}</span>

                <span className="ml-2 text-xs text-slate-500">
                  {media.media_type === "movie" ? "Movie" : "TV Show"}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}