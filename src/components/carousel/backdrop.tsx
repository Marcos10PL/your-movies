import { Movie } from "@/lib/definitions";
import clsx from "clsx";
import { forwardRef } from "react";
import Spinner from "../spinner";
import StarIcons from "./star-icons";
import Button from "./button";
import Dots from "./dots";
import Panel from "./panel";

type BackdropProps = {
  movie: Movie;
  index: number;
  visible: boolean;
  loading: boolean;
  overflow: boolean;
  topRated: boolean;
  mostPopular: boolean;
  dataLength: number;
  handleMovieChange: (newMovie: Movie | null, idx: number) => void;
} & React.ComponentProps<"div">;

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  (
    {
      movie,
      index,
      visible,
      loading,
      overflow,
      topRated,
      mostPopular,
      handleMovieChange,
      dataLength,
    },
    ref
  ) => {
    return (
      <div className={clsx("px-2", !topRated && "pb-3")}>
        <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-slate-700 bg-black">
          <div
            className={clsx(
              "w-full h-full relative rounded-lg transition-opacity duration-500 ease-in-out",
              visible ? "opacity-100" : "opacity-0"
            )}
          >
            <img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt={movie.title}
              className={clsx(
                "w-full md:w-2/3 h-full transition-opacity duration-700 ease-in-out",
                loading ? "opacity-0" : "opacity-100"
              )}
            />

            {/* gradient */}
            <div className="opacity-0 md:opacity-100 absolute inset-0 z-100 w-2/3 bg-gradient-to-l from-black to-transparent" />

            {loading && <Loading />}

            {mostPopular && (
              <>
                <Index index={index} />
                <Date date={movie.release_date} />
              </>
            )}

            {/* overview */}
            <div className="absolute inset-0 z-20 text-white grid grid-cols-3">
              <div className="hidden md:block md:col-span-2" />
              <div
                className={clsx(
                  "col-span-3 md:col-span-1 h-full *:w-full py-1 px-2 md:px-3 md:py-2 lg:px-6 bg-black md:bg-opacity-100 bg-opacity-50 text-ellipsis lg:text-xl xl:text-2xl xxl:text-3xl overflow-x-auto scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-600",
                  !overflow && "flex flex-col items-center justify-center"
                )}
                ref={ref}
              >
                <Overview
                  title={movie.title}
                  description={movie.overview}
                  date={movie.release_date}
                  voteAvg={movie.vote_average}
                  topRated={topRated}
                  mostPopular={mostPopular}
                />
              </div>
            </div>
          </div>

          {topRated && (
            <Panel
              handleMovieChange={handleMovieChange}
              dataLength={dataLength}
              index={index}
            />
          )}
        </div>
      </div>
    );
  }
);

type OverviewProps = {
  title: string;
  description: string;
  topRated: boolean;
  mostPopular: boolean;
  date: string;
  voteAvg: number;
};

function Overview({
  title,
  description,
  topRated,
  voteAvg,
  mostPopular,
  date,
}: OverviewProps) {
  if (mostPopular) {
    return (
      <>
        <p className="text-primary self-end text-right md:text-center">
          {title}
        </p>
        <p className="text-right md:text-center">{description}</p>
      </>
    );
  }

  if (topRated) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 md:gap-6 xl:gap-12 xxl:gap-16">
        <div className="text-white block">{date}</div>
        <div className="text-primary text-center">{title}</div>
        <div className="w-full flex flex-col items-center justify-center">
          <div className="relative h-5 lg:h-6 xl:h-8 2xl:h-10 w-fit">
            <div className="flex justify-center w-full">
              <StarIcons name="StarIconOutline" />
            </div>
            <div
              className="absolute left-0 top-0 flex justify-start overflow-hidden"
              style={{
                width: `${Math.round(voteAvg * 100) / 10}%`,
              }}
            >
              <StarIcons name="StarIconSolid" />
            </div>
          </div>
          <div className="text-center mt-2">
            {Math.round(voteAvg * 100) / 100} / 10
          </div>
        </div>
      </div>
    );
  }
}

function Loading() {
  return (
    <div className="absolute inset-0 rounded-lg flex items-center justify-center">
      <Spinner />
    </div>
  );
}

function Date({ date }: { date: string }) {
  return (
    <>
      {/* md */}
      <div className="opacity-0 md:opacity-100 absolute bottom-0 md:left-2 px-2 py-1 z-50 bg-gradient-to-t from-black to-trasparent lg:text-xl">
        Release date: {date}
      </div>

      {/* sm */}
      <div className="md:opacity-0 absolute top-[-4px] left-12 rounded-br-2xl rounded-bl-2xl bg-black border border-t-0 border-slate-400 text-center z-50 px-3">
        {date}
      </div>
    </>
  );
}

function Index({ index }: { index: number }) {
  return (
    <>
      {/* md */}
      <div className="opacity-0 md:opacity-100 absolute top-0 left-2 rounded-br-2xl rounded-bl-2xl bg-black md:py-1 md:text-3xl border-2 border-t-0 border-slate-400 min-w-10 md:min-w-12 text-center z-50">
        {index}
      </div>

      {/* sm */}
      <div className="md:opacity-0 absolute top-[-4px] left-1 rounded-br-2xl rounded-bl-2xl bg-black border border-t-0 border-slate-400 text-center z-50 px-3">
        {index}
      </div>
    </>
  );
}

export default Backdrop;
