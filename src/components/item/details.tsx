import Stars from "../stars";
import AvgRating from "../avg-rating";
import clsx from "clsx";

type DetailsProps = {
  title: string;
  releaseDate: string;
  overview: string;
  voteAverage: number;
  voteCount?: number;
  adult?: boolean;
  language?: string;
  noWrap?: true;
};

export default function Details({
  title,
  releaseDate,
  overview,
  voteAverage,
  voteCount,
  adult,
  language,
  noWrap,
}: DetailsProps) {
  return (
    <div className="px-2">
      <Title title={title} releaseDate={releaseDate} />
      <div className={clsx("*:py-2 pt-2", !noWrap && "md:w-3/5 xl:w-2/6")}>
        {overview && <p>{overview}</p>}
        {releaseDate && <p>Release date: {releaseDate}</p>}
        <Rating voteAverage={voteAverage} voteCount={voteCount} />
        {adult && <p>Not for children</p>}
        {language && <p>Orginal language: {language}</p>}
      </div>
    </div>
  );
}

type RatingProps = {
  voteAverage: number;
  voteCount?: number;
};

export function Rating({ voteAverage, voteCount }: RatingProps) {
  {
    return voteAverage ? (
      <div className="*:flex *:py-1">
        <div>
          <span className="mr-2">User rating: </span>
          <AvgRating voteAvg={voteAverage} />
        </div>
        <div>
          <Stars voteAvg={voteAverage} responsive={false} />
        </div>
        {voteCount && <p>{voteCount} votes</p>}
      </div>
    ) : null;
  }
}

type TitleProps = {
  title: string;
  releaseDate: string;
  originalTitle?: string;
};

function Title({ title, releaseDate, originalTitle }: TitleProps) {
  return (
    <>
      <h1 className="text-3xl text-primary">
        {title}{" "}
        <span className="opacity-60 text-2xl">
          ({new Date(releaseDate).getFullYear()})
        </span>
      </h1>
      {originalTitle && originalTitle !== title && (
        <p className="py-2"> Orginal title: {originalTitle}</p>
      )}
    </>
  );
}
