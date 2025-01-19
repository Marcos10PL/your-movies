import { Movie, TvSeries } from "@/lib/definitions";
import clsx from "clsx";
import { forwardRef } from "react";

import { handleItemChange } from "./carousel";
import Panel from "./top-rated/panel";
import Stars from "@/components/stars";
import AvgRating from "@/components/avg-rating";
import Spinner from "@/components/spinner";
import Image from "next/image";

type BackdropProps = {
  item: Movie | TvSeries;
  index: number;
  visible: boolean;
  loading: boolean;
  overflow: boolean;
  topRated: boolean;
  mostPopular: boolean;
  dataLength: number;
  handleItemChange: handleItemChange;
} & React.ComponentProps<"div">;

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>(
  (
    {
      item,
      index,
      visible,
      loading,
      overflow,
      topRated,
      mostPopular,
      handleItemChange,
      dataLength,
    },
    ref
  ) => {
    return (
      <div className={clsx("px-2", !topRated && "pb-2")}>
        <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-slate-700 bg-black">
          <div
            className={clsx(
              "w-full h-full relative rounded-lg transition-opacity duration-500 ease-in-out",
              visible ? "opacity-100" : "opacity-0"
            )}
          >
            {item.backdrop_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`}
                alt={"title" in item ? item.title : item.name}
                fill
                className={clsx(
                  "md:w-2/3 aspect-video transition-opacity duration-700",
                  loading ? "opacity-0" : "opacity-100"
                )}
              />
            ) : (
              <div
                className={clsx(
                  "relative md:w-2/3 aspect-video transition-opacity duration-700 text-center",
                  loading ? "opacity-0" : "opacity-100"
                )}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="opacity-0 md:opacity-100">
                    No image for this one
                  </span>
                </div>
              </div>
            )}

            {/* gradient */}
            {item.backdrop_path && (
              <div className="opacity-0 md:opacity-100 absolute inset-0 z-100 w-2/3 bg-gradient-to-l from-black to-transparent" />
            )}

            {loading && <Loading />}

            {mostPopular && (
              <>
                <Index index={index} />
                <More />
              </>
            )}

            {/* overview */}
            <div className="absolute inset-0 z-20 text-white grid grid-cols-3">
              <div className="hidden md:block md:col-span-2" />
              <div
                className={clsx(
                  "col-span-3 md:col-span-1 *:w-full py-1 px-2 md:px-3 md:py-2 lg:px-6 bg-black md:bg-opacity-100 bg-opacity-50 text-ellipsis lg:text-xl xl:text-2xl xxl:text-3xl overflow-x-auto scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-transparent",
                  !overflow && "flex flex-col items-center justify-center"
                )}
                ref={ref}
              >
                <Overview
                  title={"title" in item ? item.title : item.name}
                  description={item.overview}
                  date={
                    "first_air_date" in item
                      ? item.first_air_date
                      : item.release_date
                  }
                  voteAvg={item.vote_average}
                  topRated={topRated}
                  mostPopular={mostPopular}
                />
              </div>
            </div>
          </div>

          {topRated && (
            <Panel
              handleItemChange={handleItemChange}
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
      <div className="flex flex-col pb-10 md:pb-0 md:justify-center gap-1 md:gap-4 xl:gap-6">
        <div className="text-white text-center">{date}</div>
        <div className="text-primary text-center">{title}</div>
        <Stars voteAvg={voteAvg} responsive={true} />
        <AvgRating voteAvg={voteAvg} />
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

function More() {
  return (
    <>
      {/* md */}
      <div className="opacity-0 md:opacity-100 absolute bottom-0 md:left-2 px-2 py-1 z-50 bg-gradient-to-t from-black to-trasparent lg:text-xl">
        Show more...
      </div>

      {/* sm */}
      <div className="md:opacity-0 absolute top-[-4px] left-14 rounded-br-2xl rounded-bl-2xl bg-black border border-t-0 border-slate-400 text-center z-50 px-3">
        Show more
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

Backdrop.displayName = "Backdrop";
export default Backdrop;
