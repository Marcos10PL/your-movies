//-------------- movie and tv series ----------------//

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TvSeries = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
};

//----------- to the fetchData (url params) -----------------//

export type TypeOfList = "movie" | "tv";

type SortOption =
  | "first_air_date.asc"
  | "first_air_date.desc"
  | "release_date.desc"
  | "release_date.asc"
  | "primary_release_date.desc"
  | "primary_release_date.asc"
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

type SearchOptionsCommon = {
  include_adult?: boolean;
  include_video?: boolean;
  screened_theatrically?: boolean;
  sort_by?: SortOption;
  page?: number;
  "vote_count.gte"?: number;
  "with_genres"?: string;
};

type SearchOptionsMovie = {
  "release_date.lte"?: string;
  "release_date.gte"?: string;
  with_release_type?: "3|2" | "2|3" | 3 | 2;
  "primary_release_year"?: number;
  "primary_release_date.gte"?: string;
  "primary_release_date.lte"?: string;
} & SearchOptionsCommon;

type SearchOptionsTV = {
  include_null_first_air_dates?: boolean;
  "air_date.lte"?: string;
  "air_date.gte"?: string;
} & SearchOptionsCommon;

export type SearchOptions<T extends TypeOfList> = T extends "movie"
  ? SearchOptionsMovie
  : SearchOptionsTV;

//--------------------------- others ------------------------//

export type MAX_RATING = 10;
