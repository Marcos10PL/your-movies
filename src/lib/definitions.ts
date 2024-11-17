export type Movie = {
  adult: boolean; //
  backdrop_path: string; //
  genre_ids: number[]; //
  id: number; //
  original_language: string; //
  original_title: string;
  overview: string; //
  popularity: number; //
  poster_path: string | null; //
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number; //
  vote_count: number; //
};

export type TvSeries = {
  adult: boolean; //
  backdrop_path: string; //
  genre_ids: number[]; //
  id: number; //
  origin_country: string[];
  original_language: string; //
  original_name: string;
  overview: string; //
  popularity: number; //
  poster_path: string | null; //
  first_air_date: string;
  name: string;
  vote_average: number; //
  vote_count: number; //
};

export type TypeOfList = "movie" | "tv";

type SortOption =
  | "first_air_date.asc"
  | "first_air_date.desc"
  | "name.asc"
  | "name.desc"
  | "original_name.asc"
  | "original_name.desc"
  | "popularity.asc"
  | "popularity.desc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "vote_count.asc"
  | "vote_count.desc";

export type LanguageOption = "en-US";

export type SearchOptions = {
  include_adult?: boolean;
  include_null_first_air_dates?: boolean;
  include_video?: boolean;
  screened_theatrically?: boolean;
  sort_by?: SortOption;
  page?: number;
  'vote_count.gte'?: number;
  'air_date.lte'?: string;
  'air_date.gte'?: string;
};

export type MAX_RATING = 10;
