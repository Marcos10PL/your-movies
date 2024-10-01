"use client";

import { Movie } from "@/lib/definitions";
import clsx from "clsx";
import { useRef } from "react";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";

type CarouselProps = {
  data: Movie[];
  title: string;
};

type scrollFunction = (x: -1 | 1) => void;

const classForButton = `
  absolute top-1/2 transform -translate-y-1/2 
  py-3 px-2 mx-2 
  bg-black bg-opacity-60 rounded-lg
  hover:bg-opacity-100 transition-bg-opacity duration-300
`;

export default function Carousel({ data, title }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null!);

  const scroll: scrollFunction = x =>
    carouselRef.current.scrollBy({
      left: x * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });

  return (
    <div className="p-2">
      <p className="text-xl py-2">{title}</p>
      <div className="relative">
        <div className="flex overflow-x-hidden gap-5" ref={carouselRef}>
          {data.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </div>
        <button
          onClick={() => scroll(1)}
          className={clsx("right-0", classForButton)}
        >
          <ChevronDoubleRightIcon className="w-5" />
        </button>
        <button
          onClick={() => scroll(-1)}
          className={clsx("left-0", classForButton)}
        >
          <ChevronDoubleLeftIcon className="w-5" />
        </button>
      </div>
    </div>
  );
}

type ItemProps = {
  item: Movie;
};

function Item({ item }: ItemProps) {
  return (
    <div key={item.id} className="relative min-w-44 overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.original_title}
        className="object-cover w-full h-full rounded-lg border-2 border-black"
      />
      <div className="absolute inset-0 bg-emerald-400 bg-opacity-80 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg border-2 border-black">
        <span className="text-black text-xl">{item.release_date}</span>
      </div>
    </div>
  );
}
