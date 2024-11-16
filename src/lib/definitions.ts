export type Movie = {
  adult: boolean;               // 
  backdrop_path: string;        //
  genre_ids: number[];          //
  id: number;                   //
  original_language: string;    //
  original_title: string;
  overview: string;             //
  popularity: number;           //
  poster_path: string | null;   //
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;         //
  vote_count: number;           //
};

export type TvSeries = {
  adult: boolean;               //
  backdrop_path: string;        //
  genre_ids: number[];          //
  id: number;                   //
  origin_country: string[]; 
  original_language: string;    //
  original_name: string;  
  overview: string;             //
  popularity: number;           //
  poster_path: string | null;   //
  first_air_date: string;  
  name: string;  
  vote_average: number;         //
  vote_count: number;           //
};

export type TypeOfMovieLists =
  | "now_playing"
  | "popular"
  | "upcoming"
  | "top_rated";

export type TypeOfTvSeriesLists =
  | "airing_today"
  | "on_the_air"
  | "popular"
  | "top_rated";

export type MAX_RATING = 10;
