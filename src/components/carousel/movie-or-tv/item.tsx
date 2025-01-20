import { useEffect, useState } from "react";
import { Movie, TvSeries } from "@/lib/definitions";
import clsx from "clsx";
import AvgRating from "@/components/avg-rating";
import Stars from "@/components/stars";
import Spinner from "@/components/spinner";
import Link from "next/link";
import Image from "next/image";

type ItemProps = {
  item: Movie | TvSeries;
  index: number;
  onClick: () => void;
  mostPopular: boolean;
  chosen: boolean;
};

export default function Item({
  item,
  index,
  onClick,
  mostPopular,
  chosen,
}: ItemProps) {
  const [loading, setLoading] = useState(true);

  const href = `${"title" in item ? "movies" : "series"}/${item.id}`;

  return (
    <Link
      href={href}
      scroll={true}
      key={item.id}
      className={clsx(
        "relative min-w-44 overflow-hidden cursor-pointer first:ml-2 last:mr-2 rounded-lg border-2 border-slate-700 my-1 duration-300 group h-64",
        chosen && "pointer-events-none shadow-primary shadow-emerald-400"
      )}
      onClick={e => {
        if (mostPopular) e.preventDefault();
        onClick();
      }}
    >
      {item.poster_path ? (
        <>
          {loading && <Loading />}
          <Image
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={"title" in item ? item.title : item.name}
            fill
            className={clsx("group-hover:scale-105 duration-500", chosen && "scale-105")}
            onLoad={() => setLoading(false)}
          />
        </>
      ) : (
        <div
          className={clsx(
            "text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform will-change-transform duration-300 group-hover:scale-105",
            loading ? "opacity-0" : "opacity-100"
          )}
        >
          {"title" in item ? item.title : item.name}
        </div>
      )}

      <Overlay item={item} chosen={chosen} />

      {mostPopular && <Index index={index} />}
    </Link>
  );
}

function Loading() {
  return (
    <div className="absolute inset-0 rounded-lg flex items-center justify-center">
      <Spinner />
    </div>
  );
}

function Overlay({
  item,
  chosen,
}: {
  item: Movie | TvSeries;
  chosen: boolean;
}) {
  return (
    <div
      className={clsx(
        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        chosen && "opacity-100"
      )}
    >
      <div className="relative w-full h-full">
        <div className="flex flex-col text-white justify-between items-center *:w-full text-center">
          <div className="absolute top-0 bg-gradient-to-b from-black to-transparent pb-5">
            {"first_air_date" in item && item.first_air_date
              ? item.first_air_date
              : "release_date" in item && item.release_date
                ? item.release_date
                : "Unknown date"}
          </div>
          <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent pt-10">
            {item.vote_count ? (
              <div>
                <AvgRating voteAvg={item.vote_average} />
                <Stars voteAvg={item.vote_average} responsive={false} />
              </div>
            ) : (
              <div className="pb-2">No ratings</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Index({ index }: { index: number }) {
  return (
    <div className="absolute top-6 rounded-tr-full rounded-br-full bg-black px-3 py-1 text-2xl min-w-10 text-center border-2 border-slate-700 border-l-0">
      {index + 1}
    </div>
  );
}
