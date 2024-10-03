"use client";

import { Movie } from "@/lib/definitions";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Item from "./item";
import Button from "./button";
import Backdrop from "./backdrop";

type CarouselProps = {
  data: Movie[];
  title: string;
  top10?: boolean;
};

type scrollFunction = (x: -1 | 1) => void;
type handleMovieChange = (newMovie: Movie, idx: number) => void;

export default function Carousel({
  data,
  title,
  top10 = false,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null!);
  const intervalId = useRef<NodeJS.Timeout>(null!);
  const overflowDivRef = useRef<HTMLDivElement>(null!);
  const [index, setIndex] = useState(0);
  const [overflow, setOverflow] = useState(false);
  const [movie, setMovie] = useState(data[index]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  const scroll: scrollFunction = x => {
    carouselRef.current.scrollBy({
      left: x * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleMovieChange: handleMovieChange = (newMovie, idx) => {
    if (!visible) return;
    setVisible(false);
    setTimeout(() => {
      setMovie(newMovie);
      setIndex(idx);
      setVisible(true);
    }, 400);
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

  useEffect(() => {
    setLoading(false);
  }, [movie.poster_path]);

  return (
    <div className="py-2">
      <p className="text-xl px-2 py-1">{title}</p>

      {/* backdrop container */}
      {top10 && (
        <Backdrop
          movie={movie}
          index={data.indexOf(movie) + 1}
          visible={visible}
          loading={loading}
          overflow={overflow}
          ref={overflowDivRef}
        />
      )}

      {/* list */}
      <div className="relative">
        <div
          className="flex overflow-x-auto gap-3 scrollbar-none"
          ref={carouselRef}
        >
          {data.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              index={index}
              onClick={() => handleMovieChange(item, index)}
              top10={top10}
            />
          ))}
        </div>

        <Button position="left" onClick={() => scroll(-1)} />
        <Button position="right" onClick={() => scroll(1)} />
      </div>
    </div>
  );
}
