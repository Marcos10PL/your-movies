import {
  CastMember,
  CrewMember,
  Language,
  Movie,
  TvSeries,
  Video,
} from "@/lib/definitions";
import Stars from "../stars";
import AvgRating from "../avg-rating";
import VideoCarousel from "../carousels/aspect-video/video-carousel";
import Carousel from "../carousels/aspect-poster/carousel";
import { Crew, List } from "./lists";

type DetailsProps = {
  item: Movie | TvSeries;
  directors: CrewMember[];
  writers: CrewMember[];
  screenwriters: CrewMember[];
  novel: CrewMember[];
  language: Language | undefined;
  trailersAndTeasers: Video[];
  cast: CastMember[];
  restOfCast: CastMember[];
  crew: CrewMember[];
};

export function Details({
  item,
  directors,
  writers,
  screenwriters,
  novel,
  language,
  trailersAndTeasers,
  cast,
  restOfCast,
  crew,
}: DetailsProps) {
  const title = "title" in item ? item.title : item.name;
  const releaseDate = "title" in item ? item.release_date : item.first_air_date;
  const originalTitle =
    "title" in item ? item.original_title : item.original_name;

  return (
    <div className="z-30 px-2 *:pb-1">
      <h1 className="text-3xl text-primary">
        {title}{" "}
        <span className="opacity-60 text-2xl">
          ({new Date(releaseDate).getFullYear()})
        </span>
      </h1>

      {originalTitle !== title && (
        <p className="py-2"> Orginal title: {originalTitle}</p>
      )}

      <div className="md:w-3/5 xl:w-2/6 *:py-2">
        <p>{item.overview}</p>
        <p>Release date: {releaseDate}</p>
        {item.vote_average ? (
          <div className="*:flex *:py-1">
            <div>
              <span className="mr-2">User rating: </span>
              <AvgRating voteAvg={item.vote_average} />
            </div>
            <div>
              <Stars voteAvg={item.vote_average} responsive={false} />
            </div>
            <p> {item.vote_count} votes</p>
          </div>
        ) : (
          <p>No ratings yet</p>
        )}

        {item.adult && <p>Not for children</p>}
      </div>

      {language?.name && <p>Orginal language: {language.name}</p>}
      <Crew array={directors} header1="Director: " header2="Directors: " />
      <Crew array={writers} header1="Writer: " header2="Writers: " />
      <Crew array={novel} header1="Novel: " />
      <Crew
        array={screenwriters}
        header1="Screenwriter: "
        header2="Screenwriters: "
      />
      <div className="py-2"></div>

      <div>
        {trailersAndTeasers.length > 0 && (
          <>
            <Hr />
            <h2 className="px-2">Trailers and teasers: </h2>
            <VideoCarousel videos={trailersAndTeasers} />
          </>
        )}
        {cast.length > 0 && (
          <>
            <Hr />
            <h2 className="px-2">Cast: </h2>
            <Carousel data={cast} />
          </>
        )}
        {(restOfCast.length > 0 || crew.length > 0) && (
          <>
            <Hr />
            <List array={restOfCast} title="Rest of the cast" />
            <List array={crew} title="Crew" />
          </>
        )}
      </div>
    </div>
  );
}

function Hr() {
  return <hr className="border-dashed opacity-30 mx-2 my-6" />;
}
