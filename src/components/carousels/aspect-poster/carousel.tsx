"use client";

import { Item as Data } from "@/lib/definitions";
import Title, { IconType } from "../title";
import Button from "../button";
import { useParams } from "next/navigation";
import { mapToCarouselItem } from "@/lib/utils";
import Item from "../item";
import { MAX_API_ITEMS } from "@/lib/variables";
import useCarouselButtons from "@/components/my-hooks/useCarouselBattons";

type CarouselProps = {
  data: Data[];
  title: string;
  icon?: IconType;
  numbers?: true;
  noLink?: true;
  overlayAlwaysVisible?: true;
  moreLink?: true;
  href?: string;
};

export default function Carousel({
  data,
  title,
  icon,
  numbers,
  noLink,
  overlayAlwaysVisible,
  moreLink,
  href,
}: CarouselProps) {
  const { carouselRef, canScrollLeft, canScrollRight, scroll } =
    useCarouselButtons();
  const { id: seriesId } = useParams();

  const items = data.map(itm => mapToCarouselItem(itm, seriesId, noLink));

  if (data.length === 0) return null;

  return (
    <div>
      {title && (
        <Title
          title={title}
          icon={icon}
          type={
            moreLink && data.length === MAX_API_ITEMS
              ? "title" in data[0]
                ? "movie"
                : "tv"
              : undefined
          }
          href={href}
        />
      )}

      <div className="relative pt-2">
        <div className="flex overflow-x-auto scrollbar-none" ref={carouselRef}>
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

        {canScrollLeft && <Button position="left" onClick={() => scroll(-1)} />}
        {canScrollRight && (
          <Button position="right" onClick={() => scroll(1)} />
        )}
      </div>
    </div>
  );
}
