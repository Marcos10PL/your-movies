"use client";

import { Movie } from "@/lib/definitions";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";

type CarouselProps = {
  data: Movie[];
  title: string;
};

type scrollFunction = (x: -1 | 1) => void;
type handleMovieChange = (newMovie: Movie, idx: number) => void;

const classForButton = `
  absolute top-1/2 transform -translate-y-1/2 
  py-3 px-2 mx-2 
  bg-black bg-opacity-60 rounded-lg
  hover:bg-opacity-100 transition-bg-opacity duration-300
`;

export default function CarouselBox({ data, title }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null!);
  const intervalId = useRef<NodeJS.Timeout>(null!);
  const overflowDivRef = useRef<HTMLDivElement>(null!);
  const [index, setIndex] = useState(0);
  const [overflow, setOverflow] = useState(false);
  const [movie, setMovie] = useState(data[index]);
  const [isVisible, setIsVisible] = useState(true);

  const scroll: scrollFunction = x => {
    carouselRef.current.scrollBy({
      left: x * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleMovieChange: handleMovieChange = (newMovie, idx) => {
    if (!isVisible) return;
    setIsVisible(false);
    setTimeout(() => {
      setMovie(newMovie);
      setIndex(idx);
      setIsVisible(true);
    }, 600);
    resetInterval();
  };

  const resetInterval = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
    }
    intervalId.current = setInterval(() => {
      setIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % data.length;
        handleMovieChange(data[nextIndex], nextIndex);
        return nextIndex;
      });
    }, 7000);
  };

  useEffect(() => {
    resetInterval();
    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, []);

  useLayoutEffect(() => {
    const isOverflowing = (element: HTMLElement) => {
      return (
        element.scrollWidth > element.clientWidth ||
        element.scrollHeight > element.clientHeight
      );
    };

    const handleResize = () => {
      const div = overflowDivRef.current;
      if (div) {
        if (isOverflowing(div)) {
          setOverflow(true);
        } else {
          setOverflow(false);
        }
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [movie]);

  return (
    <div>
      <p className="text-xl py-2 px-2">{title}</p>

      <div className="p-2">
        <div
          className={clsx(
            "w-full h-full mb-3 relative rounded-lg overflow-hidden transition-opacity duration-700 ease-in-out bg-black border-2 border-black",
            isVisible ? "opacity-100" : "opacity-0"
          )}
        >
          <img
            src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full md:w-2/3 h-full"
          />

          <div className="opacity-0 md:opacity-100 absolute inset-0 z-100 w-2/3 bg-gradient-to-l from-black to-transparent" />
          
          <div className="opacity-0 md:opacity-100 absolute top-0 left-2 rounded-br-2xl rounded-bl-2xl bg-black md:py-1 md:text-3xl border-2 border-t-0 border-slate-400 min-w-10 md:min-w-12 text-center z-50">
            {data.indexOf(movie) + 1}
          </div>

          <div className="opacity-0 md:opacity-100 absolute bottom-0 md:left-2 px-2 py-1 z-50 bg-gradient-to-t from-black to-trasparent lg:text-xl">
            Release date: {movie.release_date}
          </div>

          {/* sm start (index, date) */}
          <div className="md:opacity-0 absolute top-[-4px] left-1 rounded-br-2xl rounded-bl-2xl bg-black border border-t-0 border-slate-400 text-center z-50 px-3">
            {data.indexOf(movie) + 1}
          </div>

          <div className="md:opacity-0 absolute top-[-4px] left-12 rounded-br-2xl rounded-bl-2xl bg-black border border-t-0 border-slate-400 text-center z-50 px-3">
            {movie.release_date}
          </div>
          {/* sm end */}

          <div className="absolute inset-0 z-20 text-white grid grid-cols-3">
            <div className="hidden md:block md:col-span-2" />
            <div
              className={clsx(
                "col-span-3 md:col-span-1 h-full *:w-full py-1 px-2 md:px-3 md:py-2 lg:px-6 bg-black bg-opacity-50 md:bg-transparent text-ellipsis lg:text-xl xl:text-2xl xxl:text-3xl overflow-x-auto scrollbar-thin scrollbar-thumb-slate-900 scrollbar-track-slate-600",
                !overflow && "flex flex-col items-center justify-center"
              )}
              ref={overflowDivRef}
            >
              <p className="text-primary self-end text-right md:text-center">
                {movie.title}
              </p>
              <p className="text-right md:text-center">{movie.overview} </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div
          className="flex overflow-x-auto gap-5 scrollbar-none"
          ref={carouselRef}
        >
          {data.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              title={title}
              index={index}
              onClick={() => handleMovieChange(item, index)}
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
      className="relative min-w-44 overflow-hidden cursor-pointer first:ml-2 last:mr-2"
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

      {title === "Top 10 now" && (
        <div className="absolute top-0 left-0 rounded-br-2xl bg-black px-3 py- text-2xl">
          {index + 1}
        </div>
      )}
    </div>
  );
}
