"use client";

import { Movie, TvSeries } from "@/lib/definitions";
import Title, { IconType } from "../title";
import { useParams } from "next/navigation";
import { mapToCarouselItem } from "@/lib/utils";
import Item from "../item";

type CarouselProps = {
  data: Movie[] | TvSeries[];
  title: string;
  icon?: IconType;
  numbers?: true;
  noLink?: true;
  overlayAlwaysVisible?: true;
};

export default function SearchPage({
  data,
  title,
  icon,
  numbers,
  noLink,
  overlayAlwaysVisible,
}: CarouselProps) {
  if (data.length === 0) return null;

  const { id: seriesId } = useParams();
  const items = data.map(itm => mapToCarouselItem(itm, seriesId, noLink));

  return (
    <div>
      {title && <Title title={title} icon={icon} />}

      <div className="relative pt-2">
        <div className="flex flex-wrap gap-y-4 scrollbar-none">
          {items.map((itm, idx) => (
            <Item
              key={itm.id}
              item={itm}
              index={idx}
              numbers={numbers}
              noLink={noLink}
              overlayAlwaysVisible={overlayAlwaysVisible}
            />
          ))}
        </div>
      </div>
    </div>
  );
}