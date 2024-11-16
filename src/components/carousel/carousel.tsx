"use client";

import { Movie, TvSeries } from "@/lib/definitions";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Item from "./item";
import Backdrop from "./backdrop";
import Title from "./title";
import { AsyncCarouselProps } from "./async-carousel";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

type CarouselProps = Omit<AsyncCarouselProps, "promise"> & {
  data: Movie[] | TvSeries[];
};

type scrollFunction = (x: -1 | 1) => void;
export type handleItemChange = (newMovie: Movie | TvSeries | null, idx: number) => void;

export default function Carousel({
  data,
  title,
  icon,
  topRated = false,
  mostPopular = false,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null!);
  const intervalId = useRef<NodeJS.Timeout>(null!);
  const overflowDivRef = useRef<HTMLDivElement>(null!);
  const [index, setIndex] = useState(0);
  const [overflow, setOverflow] = useState(false);
  const [item, setItem] = useState<Movie | TvSeries>(data[index]);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  const scroll: scrollFunction = x => {
    carouselRef.current.scrollBy({
      left: x * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleItemChange: handleItemChange = (newItem, idx) => {
    if (!visible) return;

    if (newItem === null) {
      if (idx < 0) idx = data.length - 1;
      else if (idx >= data.length) idx = 0;
      newItem = data[idx];
    }

    setVisible(false);
    setTimeout(() => {
      setItem(newItem);
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
        handleItemChange(data[nextIndex], nextIndex);
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
  }, [item]);

  useEffect(() => {
    setLoading(false);
  }, [item.poster_path]);

  return (
    <div className="py-2">
      <Title title={title} icon={icon} />

      {/* backdrop container */}
      {(topRated || mostPopular) && (
        <Backdrop
          item={item}
          index={index + 1}
          visible={visible} 
          loading={loading}
          overflow={overflow}
          ref={overflowDivRef}
          topRated={topRated}
          mostPopular={mostPopular}
          handleItemChange={handleItemChange}
          dataLength={data.length}
        />
      )}

      {/* list */}
      {!topRated && (
        <div className="relative">
          <div
            className="flex overflow-x-auto gap-3 scrollbar-none"
            ref={carouselRef}
          >
            {data.map((itm, idx) => (
              <Item
                key={itm.id}
                item={itm}
                index={idx}
                onClick={() => handleItemChange(itm, idx)}
                mostPopular={mostPopular}
                chosen={(idx === index) && mostPopular}
              />
            ))}
          </div>

          <Button position="left" onClick={() => scroll(-1)} />
          <Button position="right" onClick={() => scroll(1)} />
        </div>
      )}
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
