import { useState } from "react";
import clsx from "clsx";
import Spinner from "@/components/spinner";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import type { Item } from "./carousel";
import Overlay from "./overlay";

type ItemProps = {
  item: Item;
  index: number;
  popular?: true;
  noLink?: true;
  overlayAlwaysVisible?: true;
};

export default function Item({
  item,
  index,
  popular,
  noLink,
  overlayAlwaysVisible,
}: ItemProps) {
  const [loading, setLoading] = useState(true);
  const { id: seriesId } = useParams();

  const type = "title" in item ? "movies" : "series";

  let href = `/${type}/${item.id}`;

  if ("episode_count" in item)
    href = `${seriesId}/season/${item.season_number}`;

  const posterPath =
    "profile_path" in item ? item.profile_path : item.poster_path;

  return (
    <Link
      href={href}
      scroll={true}
      key={item.id}
      className={clsx(
        "relative min-w-[calc(50%-1rem)] md:min-w-[calc(33.3%-1rem)] lg:min-w-[calc(25%-1rem)] xl:min-w-[calc(16.66%-1rem)] xxl:min-w-[calc(12.5%-1rem)] aspect-[2/3] overflow-hidden rounded-lg border-2 border-slate-700 duration-300 mx-2",
        noLink ? "cursor-default" : "cursor-pointer group"
      )}
      onClick={e => noLink && e.preventDefault()}
    >
      {posterPath ? (
        <>
          {loading && <Loading />}
          <Image
            src={`https://image.tmdb.org/t/p/w500${posterPath}/`}
            alt={"title" in item ? item.title : item.name}
            fill
            className="group-hover:scale-105 will-change-transform duration-500 object-cover"
            onLoad={() => setLoading(false)}
          />
        </>
      ) : (
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform will-change-transform duration-300 group-hover:scale-105 z-50">
          {"title" in item ? item.title : item.name}
        </div>
      )}

      <Overlay
        item={item}
        popular={popular}
        overlayAlwaysVisible={overlayAlwaysVisible}
      />

      {popular && <Index index={index + 1} />}
    </Link>
  );
}

function Index({ index }: { index: number }) {
  return (
    <div className="absolute top-0 left-0 text-2xl min-w-10 text-center py-1 bg-black border-r-2 border-b-2 rounded-br-lg border-slate-700">
      {index}
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
