import { addMonths, format, subMonths } from "date-fns";
import { CastMember, CrewMember, Video } from "./definitions";

// ------------ date functions ------------ //

export const today = format(new Date(), "yyyy-MM-dd");
export const nextMonth = format(addMonths(today, 1), "yyyy-MM-dd");
export const halfYearAgo = format(subMonths(today, 6), "yyyy-MM-dd");

// ------ movie and series functions ------ //

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