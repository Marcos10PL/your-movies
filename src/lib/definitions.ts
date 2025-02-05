import { IconType } from "@/components/carousels/title";

//-------------- movie ----------------//

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
  media_type: string;
};

//-------------- tv series ----------------//

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
  created_by: CrewMember[];
  seasons: Season[];
};

export type Season = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type SeasonDetails = {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type Episode = {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
  crew: CrewMember[];
  guest_stars: CastMember[];
  runtime: number;
};

//-------------- credits ----------------//

export type Credits = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

export type CrewMember = {
  id: number;
  name: string;
  job: Job;
  department: string;
  profile_path: string | null;
  adult: false;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
  credit_id: string;
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
  adult: boolean;
  cast_id: number;
  credit_id: number;
  gender: number;
  known_for_department: string;
  original_name: string;
  popularity: number;
};

// ----------------------- videos ---------------------------//

export type Videos = {
  id: number;
  results: Video[];
};

export type Video = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: VideoType;
  official: boolean;
  published_at: string;
  id: string;
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
  with_genres?: string;
};

type SearchOptionsMovie = {
  "release_date.lte"?: string;
  "release_date.gte"?: string;
  with_release_type?: "3|2" | "2|3" | 3 | 2;
  primary_release_year?: number;
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

// ----------------------- searching ---------------------------//

export type SearchResults = {
  page: number;
  results: ( 
    | (Movie & { media_type: "movie" }) 
    | (TvSeries & { media_type: "tv" }) 
    | (CrewMember & { media_type: "person" }) 
    | (CastMember & { media_type: "person" })
  )[];
  total_pages: number;
  total_results: number;
};

//--------------------------- for components ------------------------//

// on home, movie and tv page
type SectionProps = {
  title: string;
  icon?: IconType;
  component: React.ElementType;
  numbers?: true;
};

export type SectionPropsDiscover<T extends TypeOfList> = SectionProps & {
  query: SearchOptions<T>;
  type: T;
};

export type SectionPropsTrending = SectionProps & {
  type: "movie" | "tv" | "all";
  time: "day" | "week";
};

// in a carousel
export type Item = Movie | TvSeries | CastMember | Season;

export type CarouselItem = {
  id: number;
  title: string;
  imageUrl: string | null;
  href: string;
  releaseDate: string | undefined;
  voteCount: number;
  voteAverage: number;
  topOverlayMessage: string | number;
  bottomOverlayMessage: string | number | "RATING";
};

//--------------------------- others ------------------------//

export type MAX_RATING = 10;

export type Job =
  | "Director"
  | "Assistant Director"
  | "Second Unit Director"
  | "Script Supervisor"
  | "Writer"
  | "Screenplay"
  | "Story"
  | "Dialogue"
  | "Novel"
  | "Actor"
  | "Stunt Double"
  | "Voice Actor"
  | "Producer"
  | "Executive Producer"
  | "Co-Producer"
  | "Line Producer"
  | "Production Manager"
  | "Director of Photography"
  | "Camera Operator"
  | "Steadicam Operator"
  | "Editor"
  | "Assistant Editor"
  | "Production Designer"
  | "Art Director"
  | "Set Designer"
  | "Props"
  | "Sound Designer"
  | "Sound Editor"
  | "Composer"
  | "Music Supervisor"
  | "Visual Effects Supervisor"
  | "VFX Artist"
  | "Costume Designer"
  | "Makeup Artist"
  | "Special Effects Supervisor"
  | "Casting Director"
  | "Series Director"
  | "Showrunner"
  | "Head Writer"
  | "Series Writer";

export type VideoType =
  | "Trailer"
  | "Teaser"
  | "Clip"
  | "Featurette"
  | "Behind the Scenes"
  | "Bloopers";

export type Backdrop = {
  aspect_ratio: number;
  height: number;
  iso_639_1: null | string;
  file_path: string;
  vote_average: number;
  vote_count: number;
  width: number;
};

export type Language = {
  iso_639_1: string;
  english_name: string;
  name: string;
};
