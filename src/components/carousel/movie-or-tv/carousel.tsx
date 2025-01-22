"use client";

import { Movie, TvSeries } from "@/lib/definitions";
import { useRef } from "react";
import Item from "./item";
import Title, { IconType } from "../title";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

type CarouselProps = {
  data: Movie[] | TvSeries[];
  title?: string;
  icon?: IconType;
  popular?: true;
};

type scrollFunction = (x: -1 | 1) => void;
export type handleItemChange = (
  newMovie: Movie | TvSeries | null,
  idx: number
) => void;

export default function Carousel({ data, title, icon, popular }: CarouselProps) {
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
            <Item key={itm.id} item={itm} index={idx} popular={popular}/>
          ))}
        </div>

        <Button position="left" onClick={() => scroll(-1)} />
        <Button position="right" onClick={() => scroll(1)} />
      </div>
    </div>
  );
}

type ButtonProps = {
  position: "left" | "right";
  onClick: () => void;
};

function Button({ position, onClick }: ButtonProps) {
  return (
    <button
      className={clsx(
        "transition-bg-opacity duration-300 hover:text-primary hover:bg-opacity-100 absolute top-1/2 transform -translate-y-1/2 py-5 px-2 mx-4 bg-black bg-opacity-60 rounded-lg",
        position === "left" ? "left-0" : "right-0"
      )}
      onClick={onClick}
    >
      {position === "left" ? (
        <ChevronDoubleLeftIcon className="w-5" />
      ) : (
        <ChevronDoubleRightIcon className="w-5" />
      )}
    </button>
  );
}
