import { Movie } from "@/lib/definitions";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Spinner from "../spinner";

type ItemProps = {
  item: Movie;
  index: number;
  onClick: () => void;
  top10?: boolean;
};

export default function Item({ item, index, onClick, top10 }: ItemProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [item.poster_path]);

  return (
    <div
      key={item.id}
      className="relative min-w-44 overflow-hidden cursor-pointer first:ml-2 last:mr-2"
      onClick={onClick}
    >
      {loading && (
        <div className="absolute inset-0 rounded-lg flex items-center justify-center bg-slate-900 border-2 border-black">
          <Spinner />
        </div>
      )}

      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.title}
        className={clsx(
          "object-cover w-full h-full rounded-lg border-2 border-slate-700 transition-opacity duration-500",
          loading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setLoading(false)}
      />

      {/* :hover */}
      <div className="absolute inset-0 bg-emerald-400 bg-opacity-80 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg border-2 border-black">
        <span className="text-black text-xl">{item.release_date}</span>
      </div>

      {/* top10 numbers */}
      {top10 && (
        <div className="absolute top-0 left-0 rounded-br-2xl bg-black px-3 py-1 text-2xl shadow-inner shadow-slate-800 min-w-10 text-center">
          {index + 1}
        </div>
      )}
    </div>
  );
}
