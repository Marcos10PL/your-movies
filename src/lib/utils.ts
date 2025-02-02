import { addMonths, format, subMonths } from "date-fns";
import {
  CarouselItem,
  CastMember,
  CrewMember,
  Item,
  Video,
} from "./definitions";

// --------------------- date functions --------------------------- //

export const today = format(new Date(), "yyyy-MM-dd");
export const nextMonth = format(addMonths(today, 1), "yyyy-MM-dd");
export const halfYearAgo = format(subMonths(today, 6), "yyyy-MM-dd");

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
  if ("character" in item)
    topOverlayMessage = item.character || "Unkown character";
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
    bottomOverlayMessage = item.character || "Unkown character";

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
