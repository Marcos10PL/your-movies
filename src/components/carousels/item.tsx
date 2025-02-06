import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import { CarouselItem } from "@/lib/definitions";
import Loading from "./loading";
import Overlay from "./aspect-poster/overlay";

type ItemProps = {
  item: CarouselItem;
  index: number;
  numbers?: true;
  noLink?: true;
  overlayAlwaysVisible?: true;
};

export default function Item({
  item,
  index,
  numbers,
  noLink,
  overlayAlwaysVisible,
}: ItemProps) {
  const [loading, setLoading] = useState(true);

  return (
    <Link
      href={item.href}
      scroll
      key={item.id * Math.random()}
      className={clsx(
        "relative min-w-[calc(50%-1rem)] md:min-w-[calc(33.3%-1rem)] lg:min-w-[calc(25%-1rem)] xl:min-w-[calc(16.66%-1rem)] xxl:min-w-[calc(12.5%-1rem)] aspect-[2/3] overflow-hidden rounded-lg border-2 border-slate-700 duration-300 mx-2",
        noLink ? "cursor-default" : "cursor-pointer group"
      )}
      onClick={e => noLink && e.preventDefault()}
    >
      {item.imageUrl ? (
        <>
          {loading && <Loading />}
          <Image
            src={`https://image.tmdb.org/t/p/w500${item.imageUrl}/`}
            alt={item.title}
            fill
            sizes="1x"
            className="group-hover:scale-105 will-change-transform duration-500 object-cover"
            onLoad={() => setLoading(false)}
          />
        </>
      ) : (
        <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform will-change-transform duration-300 group-hover:scale-105 z-50">
          {item.title}
        </div>
      )}

      <Overlay
        item={item}
        numbers={numbers}
        noLink={noLink}
        overlayAlwaysVisible={overlayAlwaysVisible}
      />

      {numbers && <Index index={index + 1} />}
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