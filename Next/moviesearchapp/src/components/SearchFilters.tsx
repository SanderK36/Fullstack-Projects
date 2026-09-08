import FilterDropdown from "@/components/FilterDropdown";

type Genre = {
  id: number;
  name: string;
};

type SearchFiltersProps = {
  type: string;
  sort: string;
  year: string;
  genre: string;
  genres: Genre[];
  onTypeChange: (type: string) => void;
  onSortChange: (sort: string) => void;
  onYearChange: (year: string) => void;
  onGenreChange: (genre: string) => void;
};

export default function SearchFilters({
  type,
  sort,
  year,
  genre,
  genres,
  onTypeChange,
  onSortChange,
  onYearChange,
  onGenreChange,
}: SearchFiltersProps) {
  const currentYear = new Date().getFullYear();

  const yearOptions = [
    {
      value: "all",
      label: "Any year",
    },
    ...Array.from(
      { length: currentYear - 1950 + 1 },
      (_, index) => {
        const yearValue = String(currentYear - index);

        return {
          value: yearValue,
          label: yearValue,
        };
      }
    ),
  ];

  const genreOptions = [
    {
      value: "all",
      label: "All genres",
    },
    ...genres.map((item) => ({
      value: String(item.id),
      label: item.name,
    })),
  ];

  return (
    <div className="relative z-40 mx-auto mt-8 max-w-6xl rounded-2xl border border-cyan-400/10 bg-[#111122]/80 p-4 shadow-lg shadow-black/10 backdrop-blur-sm sm:p-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <FilterDropdown
          label="Type"
          value={type}
          onChange={onTypeChange}
          options={[
            {
              value: "all",
              label: "All",
            },
            {
              value: "movie",
              label: "Movies",
            },
            {
              value: "tv",
              label: "TV Shows",
            },
          ]}
        />

        <FilterDropdown
          label="Sort by"
          value={sort}
          onChange={onSortChange}
          options={[
            {
              value: "relevance",
              label: "Relevance",
            },
            {
              value: "rating",
              label: "Rating",
            },
            {
              value: "name",
              label: "Name",
            },
            {
              value: "newest",
              label: "Newest",
            },
            {
              value: "oldest",
              label: "Oldest",
            },
          ]}
        />

        <FilterDropdown
          label="Genre"
          value={genre}
          onChange={onGenreChange}
          options={genreOptions}
        />

        
        <FilterDropdown
          label="Year"
          value={year}
          onChange={onYearChange}
          options={yearOptions}
        />
      </div>
    </div>
  );
}