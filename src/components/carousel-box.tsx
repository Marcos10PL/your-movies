"use client";

import { Movie } from "@/lib/definitions";
import clsx from "clsx";
import { useRef, useState } from "react";
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

export default function CarouselBox({ data, title }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null!);
  const [movie, setMovie] = useState(data[0]);

  const scroll: scrollFunction = x =>
    carouselRef.current.scrollBy({
      left: x * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });

  return (
    <div className="p-2">
      <p className="text-xl py-2">{title}</p>
      <div className="w-full h-full mb-5 relative rounded-lg overflow-hidden shadow-2xl">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full md:w-2/3 h-full"
        />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/20 to-black/70"></div>
        <div className="absolute top-0 right-0 z-20 flex flex-col items-center text-white px-3 py-1 text-right *:w-full *:text-2xl">
          <p>{movie.title}</p>
          <p>{movie.release_date}</p>
          <p>{movie.vote_count}</p>
          <p>{movie.vote_average}</p>
        </div>
      </div>
      <div className="relative">
        <div className="flex overflow-x-hidden gap-5" ref={carouselRef}>
          {data.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              title={title}
              index={index}
              onClick={() => setMovie(data[index])}
            />
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
  title: string;
  index: number;
  onClick: () => void;
};

function Item({ item, title, index, onClick }: ItemProps) {
  return (
    <div
      key={item.id}
      className="relative min-w-44 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.title}
        className="object-cover w-full h-full rounded-lg border-2 border-black"
      />

      <div className="absolute inset-0 bg-emerald-400 bg-opacity-80 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg border-2 border-black">
        <span className="text-black text-xl">{item.release_date}</span>
      </div>

      {title === "Top 10" && (
        <div className="absolute top-0 left-0 rounded-br-2xl bg-black px-3 py- text-2xl">
          {index + 1}
        </div>
      )}
    </div>
  );
}
