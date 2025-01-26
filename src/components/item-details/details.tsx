import { CrewMember, Language, Movie, TvSeries } from "@/lib/definitions";
import Stars from "../stars";
import AvgRating from "../avg-rating";

type DetailsProps = {
  item: Movie | TvSeries;
  directors: CrewMember[];
  writers: CrewMember[];
  screenwriters: CrewMember[];
  novel: CrewMember[];
  language: Language | undefined;
};

export function Details({
  item,
  directors,
  writers,
  screenwriters,
  novel,
  language,
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

      <Crew array={directors} header1="Director: " header2="Directors: " />
      <Crew array={writers} header1="Writer: " header2="Writers: " />
      <Crew array={novel} header1="Novel: " />
      <Crew
        array={screenwriters}
        header1="Screenwriter: "
        header2="Screenwriters: "
      />
      {language?.name && <p>Orginal language: {language.name}</p>}
    </div>
  );
}

type CrewProps = {
  array: CrewMember[];
  header1: string;
  header2?: string;
};

function Crew({ array, header1, header2 }: CrewProps) {
  if (array.length === 0) return;

  if (!header2) header2 = header1;

  return (
    <div>
      {array.length == 1 ? header1 : header2}
      {array.map((item, index) => (
        <span key={item.id}>
          {item.name}
          {array.length - 1 !== index && ", "}
        </span>
      ))}
    </div>
  );
}
