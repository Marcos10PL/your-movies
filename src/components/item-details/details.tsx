import { Movie, TvSeries } from "@/lib/definitions";
import Stars from "../stars";
import AvgRating from "../avg-rating";

type DetailsProps = {
  item: Movie | TvSeries;
  children?: Readonly<React.ReactNode>;
};

export function Details({ item, children }: DetailsProps) {
  const title = "title" in item ? item.title : item.name;
  const releaseDate = "title" in item ? item.release_date : item.first_air_date;
  const originalTitle =
    "title" in item ? item.original_title : item.original_name;

  return (
    <div className="z-30 gap-3 *:pb-3">
      <h1 className="text-3xl text-primary">
        {title}{" "}
        <span className="opacity-60 text-2xl">
          ({new Date(releaseDate).getFullYear()})
        </span>
      </h1>

      {originalTitle !== title && <p> Orginal title: {originalTitle}</p>}
      <p className="md:w-3/5 xl:w-2/6">{item.overview}</p>
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

      <p>Orginal language: {item.original_language}</p>
      {children}
    </div>
  );
}
