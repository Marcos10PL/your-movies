"use client";

import { CastMember, Movie, TvSeries } from "@/lib/definitions";
import { useRef } from "react";
import Item from "./item";
import Title, { IconType } from "./title";
import Button from "./button";

type CarouselProps = {
  data: Movie[] | TvSeries[] | CastMember[];
  title?: string;
  icon?: IconType;
  popular?: true;
};

export type scrollFunction = (x: -1 | 1) => void;

export default function Carousel({
  data,
  title,
  icon,
  popular,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null!);

  const scroll: scrollFunction = x => {
    carouselRef.current.scrollBy({
      left: x * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="py-2">
      {title && <Title title={title} icon={icon} />}

      <div className="relative">
        <div
          className="flex overflow-x-auto gap-3 scrollbar-none"
          ref={carouselRef}
        >
          {data.map((itm, idx) => (
            <Item key={itm.id} item={itm} index={idx} popular={popular} />
          ))}
        </div>

        <Button position="left" onClick={() => scroll(-1)} />
        <Button position="right" onClick={() => scroll(1)} />
      </div>
    </div>
  );
}