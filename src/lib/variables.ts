import Carousel from "@/components/carousels/aspect-poster/carousel";
import Slider from "@/components/carousels/slider/silder";
import { HomeIcon, FilmIcon, TvIcon } from "@heroicons/react/24/outline";
import { SectionPropsDiscover } from "./definitions";
import { halfYearAgo, nextMonth, today, yearsAgo } from "./utils";

export const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Movies", href: "/movies", icon: FilmIcon },
  { name: "TV Series", href: "/series", icon: TvIcon },
];

export const MAX_API_ITEMS = 20;

// movies and series arrays
export const MOVIES: SectionPropsDiscover<"movie">[] = [
  {
    title: "Top Rated",
    icon: "StarIcon",
    component: Slider,
    query: { sort_by: "vote_average.desc" },
    type: "movie",
  },
  {
    title: "Upcoming",
    component: Carousel,
    query: {
      sort_by: "popularity.desc",
      with_release_type: "2|3",
      "primary_release_date.gte": today,
      "primary_release_date.lte": nextMonth,
      "vote_count.gte": 0,
    },
    type: "movie",
  },
  {
    title: "Recently Released",
    component: Carousel,
    query: {
      sort_by: "primary_release_date.desc",
      with_release_type: "2|3",
      "primary_release_date.gte": halfYearAgo,
      "primary_release_date.lte": today,
      "vote_count.gte": 200,
    },
    type: "movie",
  },
  {
    title: "Most Popular",
    icon: "ArrowTrendingUpIcon",
    component: Carousel,
    query: { sort_by: "popularity.desc" },
    numbers: true,
    type: "movie",
  },
  {
    title: "Top rated old movies",
    component: Carousel,
    query: {
      sort_by: "vote_average.desc",
      "primary_release_date.lte": yearsAgo(15),
      "vote_count.gte": 2000,
    },
    type: "movie",
  },
];

export const SERIES: SectionPropsDiscover<"tv">[] = [
  {
    title: "Top Rated",
    icon: "StarIcon",
    component: Slider,
    query: { sort_by: "vote_average.desc" },
    type: "tv",
  },
  {
    title: "Airing Today",
    component: Carousel,
    query: {
      sort_by: "popularity.desc",
      "air_date.gte": today,
      "air_date.lte": today,
      "vote_count.gte": 50,
    },
    type: "tv",
  },
  {
    title: "On The Air",
    component: Carousel,
    query: { sort_by: "popularity.desc", "air_date.gte": today },
    type: "tv",
  },
  {
    title: "Most Popular",
    icon: "ArrowTrendingUpIcon",
    component: Carousel,
    query: { sort_by: "popularity.desc" },
    numbers: true,
    type: "tv",
  },
  {
    title: "Top rated old series",
    component: Carousel,
    query: {
      sort_by: "vote_average.desc",
      "air_date.lte": yearsAgo(15),
      "vote_count.gte": 2000,
    },
    type: "tv",
  },
];

// local storage keys
export const LS_KEYS = {
  cookiesAccepted: "cookies-accepted",
  cookiesOpen: "cookies-open",
  genresMovie: "genres-movie",
  genresTv: "genres-tv",
} as const;