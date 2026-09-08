export type MediaType = "movie" | "tv";

export type Media = {
  id: number;
  media_type: MediaType;

  title?: string;
  name?: string;

  poster_path: string | null;

  overview: string;

  vote_average: number;

  release_date?: string;
  first_air_date?: string;

  genre_ids: number[];
};

export type SearchResponse = {
  page: number;
  results: Media[];
  total_pages: number;
  total_results: number;
};