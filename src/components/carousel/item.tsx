import { useState } from "react";
import { CastMember, Movie, TvSeries } from "@/lib/definitions";
import clsx from "clsx";
import AvgRating from "@/components/avg-rating";
import Stars from "@/components/stars";
import Spinner from "@/components/spinner";
import Link from "next/link";
import Image from "next/image";

type ItemProps = {
  item: Movie | TvSeries | CastMember;
  index: number;
  popular?: true;
};

export default function Item({ item, index, popular }: ItemProps) {
  const [loading, setLoading] = useState(true);

  const href = `${"title" in item ? "movies" : "series"}/${item.id}`;
  const isCastMemeber = "character" in item ? true : false;
  const posterPath =
    "profile_path" in item ? item.profile_path : item.poster_path;

  return (
    <Link
      href={href}
      scroll={true}
      key={item.id}
      className={clsx(
        "relative min-w-[calc(50%-1rem)] md:min-w-[calc(33.3%-1rem)] lg:min-w-[calc(25%-1rem)] xl:min-w-[calc(16.66%-1rem)] xxl:min-w-[calc(12.5%-1rem)] aspect-[2/3] overflow-hidden cursor-default rounded-lg border-2 border-slate-700 my-1 duration-300 group mx-2",
        !isCastMemeber && "cursor-pointer"
      )}
      onClick={e => isCastMemeber && e.preventDefault()}
    >
      {posterPath ? (
        <>
          {loading && <Loading />}
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}/`}
            alt={"title" in item ? item.title : item.name}
            fill
            sizes="1x"
            className="group-hover:scale-105 will-change-transform duration-500"
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

      <Overlay item={item} popular={popular} />
      {popular && <Index index={index} />}
    </Link>
  );
}

function Index({ index }: { index: number }) {
  return (
    <div className="absolute top-0 left-0 text-2xl min-w-10 text-center py-1 bg-black border-r-2 border-b-2 rounded-br-lg border-slate-700">
      {index + 1}
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

type OverlayProps = {
  item: Movie | TvSeries | CastMember;
  popular?: true;
};

function Overlay({ item, popular }: OverlayProps) {
  return (
    <div
      className={clsx(
        "absolute inset-0 opacity-0 group-hover:opacity-100 duration-500 text-lg"
      )}
    >
      <div className="relative w-full h-full">
        <div className="*:w-full *:absolute">
          <div
            className={clsx(
              "top-0 bg-gradient-to-b from-black to-transparent pb-5",
              popular ? "text-right pr-6" : "text-center"
            )}
          >
            <Description item={item} />
          </div>
          <div className="bottom-0 bg-gradient-to-t from-black to-transparent pt-20 px-2 pb-1 text-center">
            {"vote_count" in item ? (
              item.vote_count ? (
                <div>
                  <AvgRating voteAvg={item.vote_average} />
                  <Stars voteAvg={item.vote_average} responsive={false} />
                </div>
              ) : (
                <span>No ratings yet</span>
              )
            ) : (
              "character" in item && (
                <span className="text-emerald-200">
                  {item.character ? item.character : "Uknown character"}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Description({ item }: OverlayProps) {
  if ("character" in item) {
    return <span>{item.name ? item.name : "Uknown name"}</span>;
  } else if ("first_air_date" in item && item.first_air_date) {
    return <span>{item.first_air_date}</span>;
  } else if ("release_date" in item && item.release_date) {
    return <span>{item.release_date}</span>;
  } else {
    return <span>Uknown date</span>;
  }
}
