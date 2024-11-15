import { useEffect, useState } from "react";
import { Movie } from "@/lib/definitions";
import Spinner from "../spinner";
import clsx from "clsx";
import AvgRating from "../avg-rating";
import Stars from "../stars";

type ItemProps = {
  item: Movie;
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

  useEffect(() => {
    setLoading(false);
  }, [item.poster_path]);

  return (
    <div
      key={item.id}
      className={clsx(
        "relative min-w-44 overflow-hidden cursor-pointer first:ml-2 last:mr-2 rounded-lg border-2 border-slate-700 my-1 transition-all duration-200 group",
        chosen && "pointer-events-none shadow-primary shadow-emerald-400"
      )}
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.title}
        className={clsx(
          "object-cover w-full h-full transition-all duration-500 group-hover:scale-105",
          loading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setLoading(false)}
      />

      <Overlay item={item} chosen={chosen}/>

      {loading && <Loading />}

      {mostPopular && <Index index={index} />}
    </div>
  );
}

function Loading() {
  return (
    <div className="absolute inset-0 rounded-lg flex items-center justify-center">
      <Spinner />
    </div>
  );
}

function Overlay({ item, chosen }: { item: Movie, chosen: boolean }) {
  return (
    <div className={clsx('absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300', chosen && 'opacity-100')}>
      <div className="relative w-full h-full">
        <div className="flex flex-col text-white  justify-between items-center *:w-full text-center">
          <div className="absolute top-0 bg-gradient-to-b from-black to-transparent pb-5">
            {item.release_date}
          </div>
          <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent pt-10">
            <AvgRating voteAvg={item.vote_average} />
            <Stars voteAvg={item.vote_average} responsive={false} />
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
