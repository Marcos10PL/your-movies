import {
  addMonths,
  format,
  isFuture,
  subMonths,
  subWeeks,
  subYears,
} from "date-fns";
import {
  CarouselItem,
  CastMember,
  CrewMember,
  Item,
  Movie,
  SearchResults,
  TvSeries,
  Video,
} from "./definitions";

// --------------------- date functions --------------------------- //
export const today = format(new Date(), "yyyy-MM-dd");

export const yearsAgo = (years: number) =>
  format(subYears(today, years), "yyyy-MM-dd");

export const nextMonth = format(addMonths(today, 1), "yyyy-MM-dd");
export const halfYearAgo = format(subMonths(today, 6), "yyyy-MM-dd");
export const weekAgo = format(subWeeks(today, 1), "yyyy-MM-dd");

export const isFutureDate = (date: string) => isFuture(date);

// --------------------- movie and series ------------------------- //

export const filterCrew = (crew: CrewMember[]) => {
  const directors = crew.filter(
    member => member.job === "Director" || member.job === "Series Director"
  );
  const writers = crew.filter(member => member.job === "Writer");
  const screenwriters = crew.filter(member => member.job === "Screenplay");
  const novel = crew.filter(member => member.job === "Novel");

  return { directors, writers, screenwriters, novel };
};

export const filterVideos = (videos: Video[]) => {
  const trailers = videos.filter(item => item.type === "Trailer");
  const teasers = videos.filter(item => item.type === "Teaser");
  const trailersAndTeasers = [...trailers, ...teasers];

  return { trailersAndTeasers };
};

export const filterCast = (_cast: CastMember[]) => {
  // with profile path
  const cast = _cast.filter(item => item.profile_path);
  // without profile path
  const restOfCast = _cast.filter(item => !item.profile_path);

  return { cast, restOfCast };
};

// -------------------------- carousel ----------------------------- //

// map to one type
export const mapToCarouselItem = (
  item: Item,
  seriesId?: string | string[],
  noLink?: true
): CarouselItem => {
  const id = item.id;
  const title = "title" in item ? item.title : item.name;
  const imageUrl =
    "profile_path" in item ? item.profile_path : item.poster_path;
  const voteCount = "vote_count" in item ? item.vote_count : 0;
  const voteAverage = "vote_average" in item ? item.vote_average : 0;

  let href: string;
  if (noLink) href = "";
  if (seriesId && "season_number" in item) {
    href = generateHref({ seriesId, seasonNr: item.season_number });
  } else {
    href = generateHref({
      itemId: item.id,
      type: "title" in item ? "movies" : "series",
    });
  }

  let releaseDate: string | undefined;
  if ("release_date" in item) {
    releaseDate = item.release_date;
  } else if ("first_air_date" in item) {
    releaseDate = item.first_air_date;
  }

  let topOverlayMessage: string | number = "";
  if ("episode_count" in item)
    topOverlayMessage = `${item.name} (${new Date(item.air_date).getFullYear()})`;
  if ("character" in item) topOverlayMessage = item.name || "Unkown name";
  if ("first_air_date" in item)
    topOverlayMessage = item.first_air_date || "Unkown date";
  if ("release_date" in item)
    topOverlayMessage = item.release_date || "Unkown date";

  let bottomOverlayMessage: string | number | "RATING" = "";
  if ("episode_count" in item)
    bottomOverlayMessage = `${item.episode_count} episodes`;
  if ("vote_count" in item) {
    bottomOverlayMessage = "RATING";
    if (item.vote_count === 0) bottomOverlayMessage = "No ratings yet";
  }
  if ("character" in item)
    bottomOverlayMessage = "as " + item.character || "Unkown character";

  return {
    id,
    title,
    imageUrl,
    href,
    releaseDate,
    voteCount,
    voteAverage,
    topOverlayMessage,
    bottomOverlayMessage,
  };
};

// generate href
type ItemRoute = { type: "movies" | "series"; itemId: number };
type SeasonRoute = { seriesId: string | string[]; seasonNr: number };
type GenerateHrefParams = ItemRoute | SeasonRoute;

function generateHref(params: GenerateHrefParams): string {
  if ("seasonNr" in params && "seriesId" in params)
    return `${params.seriesId}/season/${params.seasonNr}`;

  if ("itemId" in params && "type" in params)
    return `/${params.type}/${params.itemId}`;

  return "";
}

// -------------------------- search ----------------------------- //

export const movieAndSeriesArray = (data: SearchResults["results"]) => {
  return data.filter(item => item.media_type !== "person") as
    | Movie[]
    | TvSeries[];
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage < 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage > totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const generatePaginationMobile = (
  currentPage: number,
  totalPages: number
) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage < 3) {
    return [1, 2, "...", totalPages];
  }

  if (currentPage >= totalPages - 1) {
    return [1, "...", totalPages - 1, totalPages];
  }

  return [1, "...", currentPage, "...", totalPages];
};
